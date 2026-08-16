# Guess the Imposter — Desi Party Game 🕵️

A snappy, mobile-first party word game inspired by [imposter.app](https://imposter.app/).
Pass one phone around, everyone secretly sees the same word — except one **Imposter**.
Take turns giving one-word clues, then vote to expose the faker.

Built with **Vite + React + Tailwind CSS v4 + Framer Motion**. No backend. 100% free to host.

## Features

- 🎂 Full setup: players (3–16), 1–2 imposters, category picker, custom words
- ⏰ **Optional timer** — toggle it off and play at your own pace
- 👀 Imposter hint setting (None / Category name)
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

## Adding a "telugu" flavour later

A flavour just needs the same shape — English UI stays, words/terms swap:

```js
{
  id: 'telugu',
  label: 'తెలుగు',
  emoji: '🇮🇳',
  terms: { ...englishTerms, title: 'దొంగను పట్టేయండి', imposter: 'Donga' },
  categories: [ { id: 'food', name: 'వంటకాలు', emoji: '🍛', words: ['బిర్యాని', 'దోస', ...] } ],
}
```

Add it to the `FLAVOURS` array and the flavour picker appears automatically.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build → dist/
npm run lint    # oxlint
npm run preview # serve the production build
```