import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui'
import { avatarFor, colorFor } from '../game/useGame'
import { sfx } from '../game/sound'

export default function RoundScreen({ game }) {
  const { round, players, settings, terms, closeRound, skipWord, restart, scores } = game
  const timer = settings.timer
  const total = timer.enabled ? timer.minutes * 60 : 0
  const [left, setLeft] = useState(total)
  const [isPaused, setIsPaused] = useState(false)
  const finishedRef = useRef(false)

  const starterPlayer = players.find((p) => p.id === round.starterPlayerId) ?? players[0]
  const starterIdx = players.indexOf(starterPlayer)

  useEffect(() => {
    if (!timer.enabled || isPaused) return
    const id = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          if (!finishedRef.current) {
            finishedRef.current = true
            clearInterval(id)
            sfx.buzzer()
            closeRound()
          }
          return 0
        }
        const next = prev - 1
        if (next <= 5 && next > 0) sfx.tick()
        return next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timer.enabled, isPaused, closeRound])

  const low = timer.enabled && left <= 30
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  const addTime = () => {
    sfx.pop()
    setLeft((prev) => prev + 30)
    finishedRef.current = false
  }

  const togglePause = () => {
    sfx.pop()
    setIsPaused((p) => !p)
  }

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        {scores.roundsPlayed > 0 && (
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3 py-1 text-xs font-semibold text-white/70">
            <span>🏆 R{scores.roundsPlayed + 1}</span>
            <span className="text-emerald-400">😇 {scores.innocents}</span>
            <span className="text-white/30">:</span>
            <span className="text-rose-400">😈 {scores.imposters}</span>
          </div>
        )}

        <div className="mb-4 inline-flex items-center gap-2 rounded-full glass border border-white/10 px-4 py-2 text-sm font-semibold text-white/80">
          <span className="text-lg">{round.category.emoji}</span> {round.category.name}
        </div>

        <h1 className="font-display text-4xl font-bold text-white">🤫 Keep it a secret!</h1>
        <p className="mx-auto mt-2 max-w-xs text-white/70 text-sm">
          {round.dark ? (
            <>
              Everyone got a word — but <span className="font-semibold text-gold-300">one player's word is different</span>.
              Take turns saying <span className="font-semibold text-gold-300">ONE clue word</span> about yours:
            </>
          ) : (
            <>
              Take turns — each player says <span className="font-semibold text-gold-300">ONE clue word</span>{' '}
              about the secret word. The {terms.imposter.toLowerCase()} fakes it:
            </>
          )}
        </p>

        {/* First Clue Giver Badge */}
        <div className="mx-auto mt-4 w-full rounded-3xl glass border border-saffron-400/40 p-4 text-center shadow-card">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-bold text-saffron-300 uppercase tracking-wider mb-2">
            🗣️ First Clue Speaker
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className={`grid h-11 w-11 place-items-center rounded-xl text-2xl ${colorFor(starterIdx)}`}>
              {avatarFor(starterIdx)}
            </span>
            <span className="font-display text-2xl font-bold text-white">
              {starterPlayer.name.trim() || `Player ${starterIdx + 1}`}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-white/50">
            Speaks first, then take turns clockwise around the room ↻
          </p>
        </div>

        <div
          className={`glass mx-auto mt-4 w-full rounded-3xl border border-white/10 p-5 ${
            low && !isPaused ? 'shake' : ''
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {terms.imposter} status
          </p>
          <p className="font-display mt-0.5 text-xl font-bold text-white">
            {players.length} players · {settings.imposterCount}{' '}
            {settings.imposterCount === 1 ? terms.imposter : terms.imposters}
          </p>
          {timer.enabled ? (
            <div className="mt-2">
              <p
                className={`font-display text-5xl font-bold tabular-nums ${
                  isPaused ? 'text-white/40' : low ? 'text-rose-400' : 'text-saffron-400'
                }`}
              >
                {mm}:{ss}
              </p>
              {low && !isPaused && <p className="mt-1 text-xs font-semibold text-rose-400">Hurry up!! ⏰</p>}
              {isPaused && <p className="mt-1 text-xs font-semibold text-amber-300">Timer Paused ⏸️</p>}
              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={togglePause}
                  className="rounded-xl glass border border-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 cursor-pointer"
                >
                  {isPaused ? '▶️ Resume' : '⏸️ Pause'}
                </button>
                <button
                  onClick={addTime}
                  className="rounded-xl glass border border-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 cursor-pointer"
                >
                  +30s
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-sm text-white/50">No timer — take your own sweet time. 😌</p>
          )}
        </div>

        <p className="mt-5 text-sm text-white/50">
          {round.dark
            ? "Spotted a clue that didn't fit? Close the round and vote on who had the different word."
            : `Think you've found the ${terms.imposter.toLowerCase()}? Close the round and vote.`}
        </p>

        <Button className="mt-4 w-full py-4 text-xl" onClick={closeRound}>
          🛑 Close round & vote
        </Button>
        <div className="mt-3 flex gap-3 w-full">
          <Button variant="dark" className="flex-1 py-3 text-base" onClick={skipWord}>
            🔄 Skip word
          </Button>
          <Button variant="dark" className="flex-1 py-3 text-base" onClick={restart}>
            ✕ Close game
          </Button>
        </div>
        <p className="mt-2 text-xs text-white/30 text-center">
          Skip picks a new word if you got a wrong one — same players & imposters.
        </p>
      </motion.div>
    </div>
  )
}