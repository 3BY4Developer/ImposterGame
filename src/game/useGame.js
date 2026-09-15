import { useCallback, useState } from 'react'
import { FLAVOURS, wordHint } from '../data/flavours'
import { loadCustomWords } from './storage'
import { sfx } from './sound'

export const PHASES = {
  setup: 'setup',
  reveal: 'reveal',
  round: 'round',
  vote: 'vote',
  result: 'result',
}

export const AVATARS = ['🦁', '🐯', '🐘', '🦚', '🐫', '🐒', '🦜', '🐅', '🦓', '🐊', '🦥', '🦩', '🐍', '🦢', '🐪', '🦄']

const palette = [
  'bg-amber-400',
  'bg-rose-400',
  'bg-sky-400',
  'bg-emerald-400',
  'bg-fuchsia-400',
  'bg-lime-400',
  'bg-orange-400',
  'bg-teal-400',
  'bg-indigo-400',
  'bg-pink-400',
]

export function avatarFor(index) {
  return AVATARS[index % AVATARS.length]
}

export function colorFor(index) {
  return palette[index % palette.length]
}

let n = 0
const rid = () => ++n

export function useGame() {
  const [phase, setPhase] = useState(PHASES.setup)
  const [players, setPlayers] = useState([{ id: rid(), name: '' }, { id: rid(), name: '' }, { id: rid(), name: '' }])

  const [settings, setSettings] = useState({
    flavourId: 'english',
    gameMode: 'classic', // 'classic' | 'dark'
    imposterCount: 1,
    categoryIds: ['ajay-list'],
    timer: { enabled: true, minutes: 3 },
    imposterHint: 'word',
  })

  const [round, setRound] = useState(null)
  const [revealIndex, setRevealIndex] = useState(0)
  const [accusedId, setAccusedId] = useState(null)

  const flavour = FLAVOURS.find((f) => f.id === settings.flavourId) ?? FLAVOURS[0]
  const terms = flavour.terms

  const addPlayer = useCallback(() => {
    setPlayers((p) => (p.length >= 16 ? p : [...p, { id: rid(), name: '' }]))
  }, [])

  const removePlayer = useCallback((id) => {
    setPlayers((p) => (p.length <= 3 ? p : p.filter((x) => x.id !== id)))
  }, [])

  const renamePlayer = useCallback((id, name) => {
    setPlayers((p) => p.map((x) => (x.id === id ? { ...x, name } : x)))
  }, [])

  const setCategory = useCallback((id, on) => {
    setSettings((s) => {
      // 'random' is mutually exclusive — selecting it clears others, selecting others clears it
      if (id === 'random') {
        if (on) return { ...s, categoryIds: ['random'] }
        const set = new Set(s.categoryIds)
        set.delete(id)
        return { ...s, categoryIds: [...set] }
      }
      const set = new Set(s.categoryIds)
      if (set.has('random')) set.delete('random')
      if (on) set.add(id)
      else set.delete(id)
      return { ...s, categoryIds: [...set] }
    })
  }, [])

  const toggleAllCategories = useCallback((ids, allOn) => {
    setSettings((s) => {
      if (allOn) {
        // Select all real categories, exclude 'random' to avoid redundant state
        const filtered = ids.filter((id) => id !== 'random')
        return { ...s, categoryIds: filtered }
      }
      return { ...s, categoryIds: [] }
    })
  }, [])

  const startGame = useCallback(() => {
    // Players order is kept as entered — used for opening cards & playing sequence (src/screens/RevealScreen.jsx:19, VoteScreen)
    const order = players.map((_, i) => i)

    // Imposter selection is random among players
    const imposterPool = [...order]
    const imposterIds = []
    for (let k = 0; k < settings.imposterCount; k++) {
      const pick = Math.floor(Math.random() * imposterPool.length)
      imposterIds.push(players[imposterPool.splice(pick, 1)[0]].id)
    }

    const customWords = loadCustomWords()
    const playable = [
      ...flavour.categories.filter((c) => c.words.length >= 3),
      ...(customWords.length >= 3 ? [{ id: 'custom', name: 'My Words', emoji: '🌟', words: customWords }] : []),
    ]
    const pool = settings.categoryIds.includes('random') ? playable : playable.filter((c) => settings.categoryIds.includes(c.id))
    const category = pool[Math.floor(Math.random() * pool.length)] ?? playable[0]
    const word = category.words[Math.floor(Math.random() * category.words.length)]
    // Subtle fallback — doesn't reveal the word, just nudges imposter
    const hint = wordHint(word) ?? 'hint'

    let imposterWord = null
    if (settings.gameMode === 'dark') {
      const others = category.words.filter((w) => w !== word)
      imposterWord = others[Math.floor(Math.random() * others.length)]
    }

    setRound({
      word,
      hint,
      imposterWord,
      dark: settings.gameMode === 'dark',
      category,
      imposterIds: new Set(imposterIds),
      order,
    })
    setRevealIndex(0)
    setAccusedId(null)
    sfx.fanfare()
    setPhase(PHASES.reveal)
  }, [players, settings, flavour])

  const finishReveal = useCallback(() => {
    setPhase(PHASES.round)
  }, [])

  const closeRound = useCallback(() => {
    setPhase(PHASES.vote)
  }, [])

  const revealVerdict = useCallback(() => {
    setPhase(PHASES.result)
  }, [])

  const restart = useCallback(() => {
    setRound(null)
    setAccusedId(null)
    setRevealIndex(0)
    setPhase(PHASES.setup)
  }, [])

  return {
    phase,
    players,
    settings,
    round,
    revealIndex,
    accusedId,
    flavour,
    terms,
    addPlayer,
    removePlayer,
    renamePlayer,
    setCategory,
    toggleAllCategories,
    setSettings,
    startGame,
    setRevealIndex,
    finishReveal,
    setAccusedId,
    closeRound,
    revealVerdict,
    restart,
  }
}