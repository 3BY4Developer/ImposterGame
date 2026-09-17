import { useCallback, useState } from 'react'
import { FLAVOURS, wordHint, wordText } from '../data/flavours'
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

function pickWordFromPool(pool, playable, recentWords = [], excludeWord = null) {
  const recentLower = new Set(recentWords.map((w) => String(w).toLowerCase()))
  if (excludeWord) recentLower.add(String(excludeWord).toLowerCase())

  // Find categories that have words not in recent buffer
  const categoriesWithUnused = pool
    .map((cat) => ({
      ...cat,
      availableWords: cat.words.filter((w) => !recentLower.has(wordText(w).toLowerCase())),
    }))
    .filter((c) => c.availableWords.length > 0)

  let category
  let wordEntry
  if (categoriesWithUnused.length > 0) {
    const chosenCat = categoriesWithUnused[Math.floor(Math.random() * categoriesWithUnused.length)]
    category = pool.find((c) => c.id === chosenCat.id) ?? pool[0]
    wordEntry = chosenCat.availableWords[Math.floor(Math.random() * chosenCat.availableWords.length)]
  } else {
    // Fallback: pick any word in pool (excluding current word if possible)
    category = pool[Math.floor(Math.random() * pool.length)] ?? playable[0]
    const candidates = excludeWord
      ? category.words.filter((w) => wordText(w).toLowerCase() !== String(excludeWord).toLowerCase())
      : category.words
    wordEntry =
      candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : category.words[Math.floor(Math.random() * category.words.length)]
  }

  const word = wordText(wordEntry)
  const hint = wordHint(wordEntry) ?? 'hint'
  return { category, word, hint }
}

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
  const [accusedIds, setAccusedIds] = useState([])
  const [scores, setScores] = useState({ innocents: 0, imposters: 0, roundsPlayed: 0 })
  const [recentWords, setRecentWords] = useState([])

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

  const toggleAccusedId = useCallback(
    (id) => {
      setAccusedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter((x) => x !== id)
        }
        if (settings.imposterCount === 1) {
          return [id]
        }
        if (prev.length >= settings.imposterCount) {
          return [...prev.slice(1), id]
        }
        return [...prev, id]
      })
    },
    [settings.imposterCount]
  )

  const startGame = useCallback(() => {
    const order = players.map((_, i) => i)

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
    const { category, word, hint } = pickWordFromPool(pool, playable, recentWords)

    let imposterWord = null
    if (settings.gameMode === 'dark') {
      const others = category.words.filter((w) => wordText(w) !== word)
      imposterWord = others[Math.floor(Math.random() * others.length)]
    }

    const starterPlayerId = players[Math.floor(Math.random() * players.length)].id

    setRecentWords((prev) => [...prev.slice(-19), word])
    setRound({
      word,
      hint,
      imposterWord,
      dark: settings.gameMode === 'dark',
      category,
      imposterIds: new Set(imposterIds),
      starterPlayerId,
      order,
    })
    setRevealIndex(0)
    setAccusedIds([])
    sfx.fanfare()
    setPhase(PHASES.reveal)
  }, [players, settings, flavour, recentWords])

  const nextRound = useCallback(() => {
    const order = players.map((_, i) => i)

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
    const { category, word, hint } = pickWordFromPool(pool, playable, recentWords, round?.word)

    let imposterWord = null
    if (settings.gameMode === 'dark') {
      const others = category.words.filter((w) => wordText(w) !== word)
      imposterWord = others[Math.floor(Math.random() * others.length)]
    }

    const starterPlayerId = players[Math.floor(Math.random() * players.length)].id

    setRecentWords((prev) => [...prev.slice(-19), word])
    setRound({
      word,
      hint,
      imposterWord,
      dark: settings.gameMode === 'dark',
      category,
      imposterIds: new Set(imposterIds),
      starterPlayerId,
      order,
    })
    setRevealIndex(0)
    setAccusedIds([])
    sfx.fanfare()
    setPhase(PHASES.reveal)
  }, [players, settings, flavour, recentWords, round])

  const finishReveal = useCallback(() => {
    setPhase(PHASES.round)
  }, [])

  const skipWord = useCallback(() => {
    if (!round) return
    const customWords = loadCustomWords()
    const playable = [
      ...flavour.categories.filter((c) => c.words.length >= 3),
      ...(customWords.length >= 3 ? [{ id: 'custom', name: 'My Words', emoji: '🌟', words: customWords }] : []),
    ]
    const pool = settings.categoryIds.includes('random') ? playable : playable.filter((c) => settings.categoryIds.includes(c.id))
    const { category, word, hint } = pickWordFromPool(pool, playable, recentWords, round.word)

    let imposterWord = null
    if (settings.gameMode === 'dark') {
      const others = category.words.filter((w) => wordText(w) !== word)
      imposterWord = others[Math.floor(Math.random() * others.length)]
    }

    const starterPlayerId = players[Math.floor(Math.random() * players.length)].id

    setRecentWords((prev) => [...prev.slice(-19), word])
    setRound((prev) => ({ ...prev, word, hint, imposterWord, category, starterPlayerId }))
    setRevealIndex(0)
    setAccusedIds([])
    setPhase(PHASES.reveal)
    sfx.pop()
  }, [round, settings, flavour, recentWords, players])

  const closeRound = useCallback(() => {
    setPhase(PHASES.vote)
  }, [])

  const revealVerdict = useCallback(() => {
    if (!round) return
    const imposters = players.filter((p) => round.imposterIds.has(p.id))
    const caughtCount = imposters.filter((p) => accusedIds.includes(p.id)).length
    const totalImposters = imposters.length

    setScores((prev) => {
      let innocentsWin = false
      let impostersWin = false
      if (totalImposters === 1) {
        if (caughtCount === 1) innocentsWin = true
        else impostersWin = true
      } else {
        if (caughtCount === totalImposters) {
          innocentsWin = true
        } else if (caughtCount === 0) {
          impostersWin = true
        } else {
          // Split / Draw
          return {
            innocents: prev.innocents + 1,
            imposters: prev.imposters + 1,
            roundsPlayed: prev.roundsPlayed + 1,
          }
        }
      }
      return {
        innocents: prev.innocents + (innocentsWin ? 1 : 0),
        imposters: prev.imposters + (impostersWin ? 1 : 0),
        roundsPlayed: prev.roundsPlayed + 1,
      }
    })

    setPhase(PHASES.result)
  }, [round, players, accusedIds])

  const resetScores = useCallback(() => {
    setScores({ innocents: 0, imposters: 0, roundsPlayed: 0 })
  }, [])

  const restart = useCallback(() => {
    setRound(null)
    setAccusedIds([])
    setRevealIndex(0)
    setPhase(PHASES.setup)
  }, [])

  return {
    phase,
    players,
    settings,
    round,
    revealIndex,
    accusedId: accusedIds[0] ?? null,
    accusedIds,
    toggleAccusedId,
    setAccusedIds,
    scores,
    resetScores,
    nextRound,
    flavour,
    terms,
    addPlayer,
    removePlayer,
    renamePlayer,
    setCategory,
    toggleAllCategories,
    setSettings,
    startGame,
    skipWord,
    setRevealIndex,
    finishReveal,
    closeRound,
    revealVerdict,
    restart,
  }
}