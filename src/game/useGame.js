import { useCallback, useState } from 'react'
import { FLAVOURS } from '../data/flavours'
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
    imposterCount: 1,
    categoryIds: ['food', 'bollywood', 'street'],
    timer: { enabled: true, minutes: 3 },
    imposterHint: 'none',
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
      const set = new Set(s.categoryIds)
      if (on) set.add(id)
      else set.delete(id)
      return { ...s, categoryIds: [...set] }
    })
  }, [])

  const toggleAllCategories = useCallback((ids, allOn) => {
    setSettings((s) => ({ ...s, categoryIds: allOn ? ids : [] }))
  }, [])

  const startGame = useCallback(() => {
    const order = players.map((_, i) => i)
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[order[i], order[j]] = [order[j], order[i]]
    }

    const imposterPool = [...order]
    const imposterIds = []
    for (let k = 0; k < settings.imposterCount; k++) {
      const pick = Math.floor(Math.random() * imposterPool.length)
      imposterIds.push(players[imposterPool.splice(pick, 1)[0]].id)
    }

    const cat = settings.categoryIds[Math.floor(Math.random() * settings.categoryIds.length)]
    const category = flavour.categories.find((c) => c.id === cat) ?? flavour.categories[0]
    const word = category.words[Math.floor(Math.random() * category.words.length)]

    setRound({ word, category, imposterIds: new Set(imposterIds), order })
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