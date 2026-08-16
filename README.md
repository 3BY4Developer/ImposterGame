# Guess the Imposter — Desi Party Game 🕵️

A snappy, mobile-first party word game inspired by [imposter.app](https://imposter.app/).
Pass one phone around, everyone secretly sees the same word — except one **Imposter**.
Take turns giving one-word clues, then vote to expose the faker.

Built with **Vite + React + Tailwind CSS v4 + Framer Motion**. No backend. 100% free to host.

## Features

- 🎂 Full setup: players (3–16), 1–2 imposters, category picker, custom words
- 🗡️ **Dark mode** — everyone gets a word, but the imposter's word is *different* —
  and even they don't know they're the imposter. Spot the mismatch!
- 🕵️ Classic mode with imposter hints (None / Category / word-specific hint)
- ⏰ **Optional timer** — toggle it off and play at your own pace
- 🃏 Flip-card reveal with sounds (WebAudio, no assets needed)
- 🧨 Confetti + verdict screen when the imposter is caught
- 🌟 **Flavour system** — a flavour bundles game terms + word categories.
  Ships with the `english` flavour packed with desi categories
  (Indian food, Bollywood, cricket, festivals, mythology, street life…).
  A `telugu` flavour can be dropped in later (see below).
- 💾 Custom words saved on-device (localStorage)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & deploy to Vercel (free, no credit card)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
   - Framework preset: **Vite** (auto-detected), Build: `npm run build`, Output: `dist`.
3. Deploy. You get a free `your-app.vercel.app` URL in minutes.

Alternatives: **Netlify** (drag the `dist/` folder after `npm run build`) or **Cloudflare Pages**.

## Customise categories & words

All game content lives in `src/data/flavours.js`. Edit freely:

```js
categories: [
  {
    id: 'food',
    name: 'Indian Food',
    emoji: '🍛',
    words: ['Biryani', 'Dosa', 'Vada Pav', ...],
  },
]
```

Players can also add their own words in-app (🌟 *My Words*), no code needed.

## Flavours — select, change, add

The app UI is **English only**. Game words are also in English letters (transliterated) — e.g. "Sankranti", "Vijayawada", "Garelu" — nothing in Telugu script.

Rename categories, tweak words, or add a new flavour: everything lives in `src/data/flavours.js`.

- One flavour shipped: `english`, packed with desi categories (Indian food, Bollywood, **Tollywood**, cricket, festivals, mythology, **Ajay List**, street life, and more).
- The `telugu` flavour ships with the same fun cards (title "Donga ni kanipettu", imposter "Donga", "Abba!!...Nuvve babu ippudu Donga") and Telugu word-packs in English letters — including its own **Ajay List**.
- **Ajay List** is pre-selected as the only default category in both flavours.
- A separate "Telugu" word-pack flavour would be identical in shape (`terms` + `categories`, words transliterated in English) — append it to the `FLAVOURS` array and the picker chip appears automatically.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build → dist/
npm run lint    # oxlint
npm run preview # serve the production build
```