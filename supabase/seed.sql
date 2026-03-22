-- ~20 published events for local UX / Eventeny-style grid demos (supabase db reset).
-- Cover URLs: Unsplash (hotlink OK per their guidelines for demos; replace in production).

insert into public.events (
  title, slug, category, start_at, end_of_life_at,
  city, state, venue_name, price_label, registration_url, description,
  organizer_display_name, interest_count, age_range_label, status, cover_image_url
) values
  ('Summer STEM Lab for Kids', 'summer-stem-lab-kids', 'Kids Classes',
   (now() + interval '5 days'), (now() + interval '400 days'),
   'Austin', 'TX', 'Thinkery', 'From $45', 'https://example.com/stem',
   'Hands-on robotics and coding for ages 7–12.', 'Austin STEAM Collective', 128, '7–12', 'published',
   'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop'),

  ('Beginner Telugu Storytime', 'beginner-telugu-storytime', 'Kids Classes',
   (now() + interval '8 days'), (now() + interval '200 days'),
   'Irving', 'TX', 'Public Library — South', 'Free', 'https://example.com/telugu',
   'Stories, songs, and simple vocabulary.', 'DFW Telugu Families', 56, '3–8', 'published',
   'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80&auto=format&fit=crop'),

  ('Overnight Adventure Camp', 'overnight-adventure-camp', 'Camps',
   (now() + interval '21 days'), (now() + interval '500 days'),
   'Marble Falls', 'TX', 'Hill Country Campgrounds', 'From $320', 'https://example.com/camp',
   'Kayaking, climbing wall, and night hikes.', 'Texas Outdoor Youth', 203, '10–15', 'published',
   'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80&auto=format&fit=crop'),

  ('Soccer Skills Mini-Camp', 'soccer-skills-mini-camp', 'Camps',
   (now() + interval '12 days'), (now() + interval '120 days'),
   'Plano', 'TX', 'Russell Creek Park', '$99', 'https://example.com/soccer',
   'Half-day camp with licensed coaches.', 'North Texas Soccer Club', 89, '6–12', 'published',
   'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80&auto=format&fit=crop'),

  ('After-School Chess Club', 'after-school-chess-club', 'After-School',
   (now() + interval '3 days'), (now() + interval '180 days'),
   'Round Rock', 'TX', 'Community Center Room B', '$15/session', 'https://example.com/chess',
   'Rated coaches; boards provided.', 'Checkmate Round Rock', 34, '8–14', 'published',
   'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80&auto=format&fit=crop'),

  ('Homework Help & Snack Hour', 'homework-help-snack-hour', 'After-School',
   (now() + interval '2 days'), (now() + interval '90 days'),
   'San Jose', 'CA', 'Boys & Girls Club', 'Free', 'https://example.com/homework',
   'Quiet space, tutors, and healthy snacks.', 'South Bay Youth Hub', 142, '10–16', 'published',
   'https://images.unsplash.com/photo-1588072432836-1004d9784259?w=600&q=80&auto=format&fit=crop'),

  ('Riverfront Jazz & Food Festival', 'riverfront-jazz-food-festival', 'Festivals',
   (now() + interval '35 days'), (now() + interval '60 days'),
   'San Antonio', 'TX', 'River Walk Plaza', 'From $25', 'https://example.com/jazzfest',
   'Two stages, 30+ vendors, family zone.', 'SATX Events Alliance', 1840, 'All ages', 'published',
   'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80&auto=format&fit=crop'),

  ('Diwali Mela & Cultural Fair', 'diwali-mela-cultural-fair', 'Festivals',
   (now() + interval '40 days'), (now() + interval '45 days'),
   'Frisco', 'TX', 'Frisco Commons', 'Free', 'https://example.com/diwali',
   'Dance performances, crafts bazaar, fireworks show.', 'DFW Indian Cultural Society', 956, 'All ages', 'published',
   'https://images.unsplash.com/photo-1606293926075-69a00a09e474?w=600&q=80&auto=format&fit=crop'),

  ('Indie Folk in the Garden', 'indie-folk-in-the-garden', 'Music',
   (now() + interval '9 days'), (now() + interval '30 days'),
   'Dallas', 'TX', 'Arboretum Amphitheater', 'From $35', 'https://example.com/folk',
   'Acoustic sets, local food trucks, BYO blanket.', 'GreenSound Productions', 412, 'All ages', 'published',
   'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80&auto=format&fit=crop'),

  ('Youth Orchestra Open Rehearsal', 'youth-orchestra-open-rehearsal', 'Music',
   (now() + interval '6 days'), (now() + interval '100 days'),
   'Houston', 'TX', 'Jones Hall', 'Free', 'https://example.com/orchestra',
   'Watch the youth symphony prepare for spring concert.', 'Houston Youth Symphony', 67, '8+', 'published',
   'https://images.unsplash.com/photo-1465847890924-bfd4d29d0fa0?w=600&q=80&auto=format&fit=crop'),

  ('Sunday Temple Community Lunch', 'sunday-temple-community-lunch', 'Religious/Cultural',
   (now() + interval '4 days'), (now() + interval '365 days'),
   'Cary', 'NC', 'Hindu Society Hall', 'Donation', 'https://example.com/lunch',
   'Vegetarian lunch, all welcome after service.', 'Triangle Hindu Society', 210, 'All ages', 'published',
   'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&auto=format&fit=crop'),

  ('Lunar New Year Family Workshop', 'lunar-new-year-family-workshop', 'Religious/Cultural',
   (now() + interval '15 days'), (now() + interval '200 days'),
   'Bellevue', 'WA', 'Crossroads Arts Center', '$12', 'https://example.com/lny',
   'Lantern craft, calligraphy, and lion dance demo.', 'Eastside Asian Heritage', 178, '5+', 'published',
   'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80&auto=format&fit=crop'),

  ('Neighborhood Cleanup & Potluck', 'neighborhood-cleanup-potluck', 'Community Gatherings',
   (now() + interval '7 days'), (now() + interval '90 days'),
   'Denver', 'CO', 'Civic Center Park', 'Free', 'https://example.com/cleanup',
   'Supplies provided; potluck after.', 'Denver Neighbors United', 45, 'All ages', 'published',
   'https://images.unsplash.com/photo-1593113598332-cd288d649413?w=600&q=80&auto=format&fit=crop'),

  ('Farmers Market Live Music Saturday', 'farmers-market-live-music-saturday', 'Community Gatherings',
   (now() + interval '1 days'), (now() + interval '400 days'),
   'Portland', 'OR', 'PSU Farmers Market', 'Free', 'https://example.com/market',
   'Local bands between 10am–2pm.', 'Portland Markets Org', 312, 'All ages', 'published',
   'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80&auto=format&fit=crop'),

  ('Bollywood Dance Fitness', 'bollywood-dance-fitness', 'Music',
   (now() + interval '5 days'), (now() + interval '150 days'),
   'Jersey City', 'NJ', 'Studio 84', '$20 drop-in', 'https://example.com/bollywood',
   'High-energy cardio, no experience needed.', 'Desi Dance NJ', 94, 'Adults', 'published',
   'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop'),

  ('Mandarin Playgroup & Tea', 'mandarin-playgroup-tea', 'Kids Classes',
   (now() + interval '10 days'), (now() + interval '300 days'),
   'Cupertino', 'CA', 'Library Story Room', 'Free', 'https://example.com/mandarin',
   'Songs and simple phrases for toddlers and caregivers.', 'Bay Mandarin Parents', 41, '2–5', 'published',
   'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80&auto=format&fit=crop'),

  ('Teen Robotics League Scrimmage', 'teen-robotics-league-scrimmage', 'After-School',
   (now() + interval '18 days'), (now() + interval '60 days'),
   'Atlanta', 'GA', 'TechWorks Atlanta', '$10', 'https://example.com/robotics',
   'Friendly FIRST-style matches; spectators welcome.', 'ATL STEM League', 156, '12–18', 'published',
   'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop'),

  ('Church Easter Egg Hunt', 'church-easter-egg-hunt', 'Religious/Cultural',
   (now() + interval '14 days'), (now() + interval '20 days'),
   'Nashville', 'TN', 'Grace Community Lawn', 'Free', 'https://example.com/easter',
   'Ages split by zones, photos with bunny.', 'Grace Community Church', 520, '0–10', 'published',
   'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80&auto=format&fit=crop'),

  ('Community Yoga Sunrise', 'community-yoga-sunrise', 'Community Gatherings',
   (now() + interval '2 days'), (now() + interval '120 days'),
   'Miami', 'FL', 'South Pointe Park', 'Donation', 'https://example.com/yoga',
   'BYO mat; instructors rotate weekly.', 'Miami Wellness Circle', 88, 'Adults', 'published',
   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&auto=format&fit=crop'),

  ('Fall Carnival & Raffle', 'fall-carnival-raffle', 'Festivals',
   (now() + interval '60 days'), (now() + interval '75 days'),
   'Phoenix', 'AZ', 'Desert Breeze Park', 'Free entry', 'https://example.com/carnival',
   'Games, rides, school fundraiser raffle.', 'Valley PTA Coalition', 670, 'All ages', 'published',
   'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80&auto=format&fit=crop');
