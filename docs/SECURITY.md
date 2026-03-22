# Security — secrets and incident response

## Where secrets belong

| Secret | Place | Never |
|--------|--------|--------|
| **Eventbrite** private / OAuth tokens | **`backend/.env`** (local only), or CI **encrypted secrets** | Frontend repo files, `NEXT_PUBLIC_*`, docs, commits |
| **Supabase service role** | Server / **`backend/.env`** | Browser, `NEXT_PUBLIC_*` |
| **Supabase anon key** | `frontend/.env.local` (gitignored) — ok as `NEXT_PUBLIC_*` | Committed `.env` files with real values |

Eventbrite integration is **server-only** ([`eventbrite_api_testing.md`](./eventbrite_api_testing.md)). Do not put `EVENTBRITE_*` in the Next.js app directory in any tracked file.

Use **`frontend/.env.local`** for local Next.js vars (copy from [`frontend/env.example`](../frontend/env.example) or `frontend/.env.example`). There is **no** supported tracked file named `frontend/env`.

---

## If a secret was exposed (e.g. GitGuardian alert)

1. **Revoke immediately**  
   - **Eventbrite:** [Account Settings → Developer Links → API keys](https://www.eventbrite.com/account/apps/) (wording may vary) — revoke or delete the compromised **private token** / app key and create a **new** one if you still need API access.

2. **Remove the secret from the repository**  
   - Delete any file that contained it and ensure `.gitignore` blocks that path (see root [`.gitignore`](../.gitignore)).

3. **Remove it from Git history** (required — deleting the file in a new commit does **not** remove old commits from GitHub).  
   - Option A: [GitHub Docs — Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) (`git filter-repo` recommended).  
   - Option B: If the repo is new and you can afford to **replace history**, create a fresh repo or squash to a single clean commit **without** the secret, then **force-push** (coordinate with anyone who cloned).

4. **After history rewrite**  
   - Ask collaborators to **re-clone** or reset to the new history.  
   - Confirm **GitHub Secret scanning** / GitGuardian shows resolved.

5. **Rotate anything adjacent**  
   - If the same commit contained other real keys (Supabase, etc.), rotate those too.

---

## Prevention

- Keep only **placeholders** in `*.example` files.  
- Run **[`gitleaks`](https://github.com/gitleaks/gitleaks)** or **[`trufflehog`](https://github.com/trufflesecurity/trufflehog)** locally before `git push`.  
- Prefer **GitHub encrypted secrets** for CI, never hard-code tokens in workflow YAML.

---

*If you use this doc after an incident, update it with the date and root cause (e.g. “committed `frontend/env`”) so the team does not repeat the mistake.*
