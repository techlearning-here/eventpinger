#!/usr/bin/env python3
"""
List or fetch Eventbrite resources via API v3 using supported endpoints.

The official Event Search "list" API is deprecated — see:
https://www.eventbrite.com/platform/api#/reference/event-search/list-deprecated

Do not call /v3/events/search/ for new code. Use organization, venue, owned_events,
or single-event by id instead.

Env: EVENTBRITE_PRIVATE_TOKEN or EVENTBRITE_TOKEN (Bearer private token from
Eventbrite developer settings).

Examples:
  python scripts/eventbrite_list_events.py me
  python scripts/eventbrite_list_events.py orgs
  python scripts/eventbrite_list_events.py owned --status live
  python scripts/eventbrite_list_events.py org 1234567890
  python scripts/eventbrite_list_events.py venue 1234567890
  python scripts/eventbrite_list_events.py event 1234567890 --expand venue
  python scripts/eventbrite_list_events.py description 1234567890
  python scripts/eventbrite_list_events.py categories
  python scripts/eventbrite_list_events.py categories 110
  python scripts/eventbrite_list_events.py category 110
  python scripts/eventbrite_list_events.py export-categories-csv -o eventbrite_categories.csv
  python scripts/eventbrite_list_events.py export-categories-csv --family -o eventbrite_family_subcategories.csv
"""

from __future__ import annotations

import argparse
import csv
import json
import os
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))
from eventbrite_family_taxonomy import is_family_suitable_subcategory

BASE = "https://www.eventbriteapi.com/v3"


def _parse_env_line(line: str) -> tuple[str, str] | None:
    line = line.strip()
    if not line or line.startswith("#"):
        return None
    if line.startswith("export "):
        line = line[7:].strip()
    if "=" not in line:
        return None
    key, _, val = line.partition("=")
    key = key.strip()
    if not key:
        return None
    val = val.strip()
    if val.startswith('"') and val.endswith('"') and len(val) >= 2:
        val = val[1:-1]
    elif val.startswith("'") and val.endswith("'") and len(val) >= 2:
        val = val[1:-1]
    if " #" in val and not (val.startswith('"') or val.startswith("'")):
        val = val.split(" #", 1)[0].strip()
    return key, val


def _load_backend_dotenv() -> list[Path]:
    """Load backend/.env then cwd .env (utf-8-sig = strip BOM). Later file overrides."""
    backend_root = Path(__file__).resolve().parent.parent
    candidates = [backend_root / ".env", Path.cwd() / ".env"]
    loaded: list[Path] = []
    for path in candidates:
        if not path.is_file():
            continue
        loaded.append(path.resolve())
        text = path.read_text(encoding="utf-8-sig")
        for raw in text.splitlines():
            parsed = _parse_env_line(raw)
            if not parsed:
                continue
            key, val = parsed
            if val:
                os.environ[key] = val
    return loaded


def _token(loaded_files: list[Path]) -> str:
    t = os.environ.get("EVENTBRITE_PRIVATE_TOKEN") or os.environ.get("EVENTBRITE_TOKEN")
    if not t or not str(t).strip():
        backend_root = Path(__file__).resolve().parent.parent
        env_path = backend_root / ".env"
        print(
            "Missing EVENTBRITE_PRIVATE_TOKEN (or EVENTBRITE_TOKEN) after loading .env files.",
            file=sys.stderr,
        )
        print(
            f"  Expected line in {env_path}:\n"
            "    EVENTBRITE_PRIVATE_TOKEN=your_token_here\n"
            "  (no spaces around '='; one line; save the file.)",
            file=sys.stderr,
        )
        print("  Files read:", file=sys.stderr)
        if not loaded_files:
            print(f"    (none found — {env_path} exists: {env_path.is_file()})", file=sys.stderr)
        else:
            for p in loaded_files:
                print(f"    - {p}", file=sys.stderr)
        print(
            "  Or export in the shell: export EVENTBRITE_PRIVATE_TOKEN='…'",
            file=sys.stderr,
        )
        sys.exit(1)
    return str(t).strip()


def _eb_get_status(
    path: str, token: str, params: dict[str, str] | None = None
) -> tuple[int, dict]:
    """HTTP GET; return (status_code, json_body)."""
    url = BASE + path
    if params:
        url = url + "?" + urlencode({k: v for k, v in params.items() if v is not None})
    req = Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urlopen(req, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode())
    except HTTPError as e:
        raw = e.read().decode(errors="replace")
        try:
            body = json.loads(raw)
        except json.JSONDecodeError:
            body = {"error": "NON_JSON_BODY", "raw": raw}
        return e.code, body
    except URLError as e:
        print(f"Request failed: {e}", file=sys.stderr)
        sys.exit(1)


def eb_get(path: str, token: str, params: dict[str, str] | None = None) -> dict:
    code, body = _eb_get_status(path, token, params)
    if code >= 400:
        print(f"HTTP {code} {path}\n{json.dumps(body)}", file=sys.stderr)
        sys.exit(1)
    return body


def _owned_events_via_organizations(
    token: str, status: str
) -> dict:
    """List live/draft events under each organization the user belongs to."""
    code, org_body = _eb_get_status("/users/me/organizations/", token, None)
    if code >= 400:
        return {
            "error": "organizations_list_failed",
            "http_status": code,
            "body": org_body,
        }
    orgs = org_body.get("organizations") or []
    events_by_org: list[dict] = []
    params = {"status": status}
    for o in orgs:
        oid = o.get("id")
        if not oid:
            continue
        ec, ep = _eb_get_status(f"/organizations/{oid}/events/", token, params)
        events_by_org.append(
            {
                "organization_id": oid,
                "organization_name": o.get("name"),
                "http_status": ec,
                "events_payload": ep,
            }
        )
    return {
        "source": "organizations",
        "organizations": orgs,
        "events_by_organization": events_by_org,
    }


def _fetch_all_category_pages(token: str) -> list[dict]:
    page = 1
    out: list[dict] = []
    while True:
        body = eb_get("/categories/", token, {"page": str(page)})
        out.extend(body.get("categories") or [])
        pag = body.get("pagination") or {}
        if not pag.get("has_more_items"):
            break
        page += 1
    return out


def export_eventbrite_categories_csv(
    output_path: str,
    token: str,
    *,
    top_only: bool,
    family_subcategories_only: bool = False,
) -> int:
    """Write top-level categories; unless top_only, append subcategories from each GET /categories/{id}/.

    If family_subcategories_only, output **only** subcategory rows that pass
    `eventbrite_family_taxonomy.is_family_suitable_subcategory` (requires full fetch).
    """
    tops = _fetch_all_category_pages(token)
    fieldnames = [
        "kind",
        "id",
        "name",
        "name_localized",
        "short_name",
        "short_name_localized",
        "main_category_id",
        "main_category_name",
        "parent_category_id",
        "parent_category_name",
        "resource_uri",
    ]
    rows: list[dict[str, str]] = []
    for c in tops:
        cid = str(c.get("id", ""))
        cname = str(c.get("name", "") or "")
        rows.append(
            {
                "kind": "category",
                "id": cid,
                "name": cname,
                "name_localized": str(c.get("name_localized", "") or ""),
                "short_name": str(c.get("short_name", "") or ""),
                "short_name_localized": str(c.get("short_name_localized", "") or ""),
                "main_category_id": cid,
                "main_category_name": cname,
                "parent_category_id": "",
                "parent_category_name": "",
                "resource_uri": str(c.get("resource_uri", "") or ""),
            }
        )
        if top_only:
            continue
        detail = eb_get(f"/categories/{cid}/", token, None)
        for s in detail.get("subcategories") or []:
            rows.append(
                {
                    "kind": "subcategory",
                    "id": str(s.get("id", "") or ""),
                    "name": str(s.get("name", "") or ""),
                    "name_localized": str(s.get("name_localized", "") or ""),
                    "short_name": "",
                    "short_name_localized": "",
                    "main_category_id": cid,
                    "main_category_name": cname,
                    "parent_category_id": cid,
                    "parent_category_name": cname,
                    "resource_uri": str(s.get("resource_uri", "") or ""),
                }
            )

    if family_subcategories_only:
        rows = [
            r
            for r in rows
            if r["kind"] == "subcategory"
            and is_family_suitable_subcategory(
                r["parent_category_id"],
                r["id"],
            )
        ]

    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    with out.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    return len(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description="Eventbrite v3 helper (no deprecated search).")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("me", help="GET /users/me/")

    sub.add_parser("orgs", help="GET /users/me/organizations/")

    p_owned = sub.add_parser(
        "owned",
        help="List your events: try /users/{id}/owned_events/, else organizations→events",
    )
    p_owned.add_argument("--status", default="live", help="e.g. live, draft, ended")

    p_org = sub.add_parser("org", help="GET /organizations/{id}/events/")
    p_org.add_argument("organization_id")
    p_org.add_argument("--status", default=None)

    p_venue = sub.add_parser("venue", help="GET /venues/{id}/events/")
    p_venue.add_argument("venue_id")
    p_venue.add_argument("--status", default=None)

    p_event = sub.add_parser("event", help="GET /events/{id}/")
    p_event.add_argument("event_id")
    p_event.add_argument("--expand", default=None, help="e.g. venue,organizer")

    p_desc = sub.add_parser(
        "description",
        help="GET /events/{id}/description/ (full HTML body; see Eventbrite docs)",
    )
    p_desc.add_argument("event_id")

    p_categories = sub.add_parser(
        "categories",
        help="GET /categories/ (all); optional id → GET /categories/{id}/",
    )
    p_categories.add_argument(
        "category_id",
        nargs="?",
        default=None,
        metavar="ID",
        help="optional category id (same as: category ID)",
    )

    p_category = sub.add_parser("category", help="GET /categories/{id}/ (detail + subcategories)")
    p_category.add_argument("category_id")

    p_csv = sub.add_parser(
        "export-categories-csv",
        help="Fetch all categories (+ subcategories) and write UTF-8 CSV",
    )
    p_csv.add_argument(
        "-o",
        "--output",
        default="eventbrite_categories.csv",
        help="output path (default: ./eventbrite_categories.csv)",
    )
    p_csv.add_argument(
        "--top-only",
        action="store_true",
        help="only top-level categories (no per-category API calls for subcategories)",
    )
    p_csv.add_argument(
        "--family",
        action="store_true",
        help="only subcategories curated for family/community discovery (see eventbrite_family_taxonomy.py)",
    )

    args = parser.parse_args()
    loaded = _load_backend_dotenv()
    token = _token(loaded)

    if args.cmd == "me":
        data = eb_get("/users/me/", token)
    elif args.cmd == "orgs":
        data = eb_get("/users/me/organizations/", token)
    elif args.cmd == "owned":
        me = eb_get("/users/me/", token)
        uid = str(me["id"])
        params = {"status": args.status}
        code, owned_body = _eb_get_status(f"/users/{uid}/owned_events/", token, params)
        if code == 200:
            data = owned_body
        else:
            print(
                f"Note: GET /users/{uid}/owned_events/ returned HTTP {code} "
                "(common with private tokens; trying /users/me/organizations/ → "
                "/organizations/{{id}}/events/).",
                file=sys.stderr,
            )
            data = _owned_events_via_organizations(token, args.status)
    elif args.cmd == "org":
        params = {}
        if args.status:
            params["status"] = args.status
        data = eb_get(f"/organizations/{args.organization_id}/events/", token, params or None)
    elif args.cmd == "venue":
        params = {}
        if args.status:
            params["status"] = args.status
        data = eb_get(f"/venues/{args.venue_id}/events/", token, params or None)
    elif args.cmd == "description":
        data = eb_get(f"/events/{args.event_id}/description/", token, None)
    elif args.cmd == "categories":
        cid = getattr(args, "category_id", None)
        if cid:
            data = eb_get(f"/categories/{cid}/", token, None)
        else:
            data = eb_get("/categories/", token, None)
    elif args.cmd == "category":
        data = eb_get(f"/categories/{args.category_id}/", token, None)
    elif args.cmd == "event":
        params = {}
        if args.expand:
            params["expand"] = args.expand
        data = eb_get(f"/events/{args.event_id}/", token, params or None)
    elif args.cmd == "export-categories-csv":
        if args.top_only and args.family:
            print("Choose either --top-only or --family, not both.", file=sys.stderr)
            sys.exit(2)
        n = export_eventbrite_categories_csv(
            args.output,
            token,
            top_only=args.top_only,
            family_subcategories_only=args.family,
        )
        print(f"Wrote {args.output} ({n} rows plus header).", file=sys.stderr)
        return
    else:
        parser.error(f"unknown command: {args.cmd}")

    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    main()
