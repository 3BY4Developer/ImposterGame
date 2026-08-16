import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui'
import { sfx } from '../game/sound'

export default function RoundScreen({ game }) {
  const { round, players, settings, terms, closeRound } = game
  const timer = settings.timer
  const total = timer.enabled ? timer.minutes * 60 : 0
  const [left, setLeft] = useState(total)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (!timer.enabled) return
    const endAt = Date.now() + timer.minutes * 60 * 1000
    const id = setInterval(() => {
      const rem = Math.max(0, Math.round((endAt - Date.now()) / 1000))
      setLeft((prev) => {
        if (!finishedRef.current && rem <= 5 && rem > 0 && rem < prev) sfx.tick()
        return rem
      })
      if (rem === 0 && !finishedRef.current) {
        finishedRef.current = true
        clearInterval(id)
        closeRound()
      }
    }, 250)
    return () => clearInterval(id)
  }, [timer.enabled, timer.minutes, closeRound])

  const low = timer.enabled && left <= 30
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass border border-white/10 px-4 py-2 text-sm font-semibold text-white/80">
          <span className="text-lg">{round.category.emoji}</span> {round.category.name}
        </div>

        <h1 className="font-display text-4xl font-bold text-white">🤫 Keep it a secret!</h1>
        <p className="mx-auto mt-3 max-w-xs text-white/70">
          {round.dark ? (
            <>
              Everyone got a word — but <span className="font-semibold text-gold-300">one player's word is different</span>.
              Take turns saying <span className="font-semibold text-gold-300">ONE clue word</span> about yours,
              and spot the odd one out:
            </>
          ) : (
            <>
              Take turns — each player says <span className="font-semibold text-gold-300">ONE clue word</span>{' '}
              about the secret word. The {terms.imposter.toLowerCase()} fakes it:
            </>
          )}
        </p>

        <div
          className={`glass mx-auto mt-8 w-full rounded-3xl border border-white/10 p-6 ${
            low ? 'shake' : ''
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            {terms.imposter} status
          </p>
          <p className="font-display mt-1 text-2xl font-bold text-white">
            {players.length} players · {settings.imposterCount}{' '}
            {settings.imposterCount === 1 ? terms.imposter : terms.imposters}
          </p>
          {timer.enabled ? (
            <div className="mt-3">
              <p
                className={`font-display text-6xl font-bold tabular-nums ${
                  low ? 'text-rose-400' : 'text-saffron-400'
                }`}
              >
                {mm}:{ss}
              </p>
              {low && <p className="mt-1 text-sm font-semibold text-rose-400">Hurry up!! ⏰</p>}
            </div>
          ) : (
            <p className="mt-2 text-sm text-white/50">No timer — take your own sweet time. 😌</p>
          )}
        </div>

        <p className="mt-6 text-sm text-white/50">
          {round.dark
            ? "Spotted a clue that didn't fit? Close the round and vote on who had the different word."
            : `Think you've found the ${terms.imposter.toLowerCase()}? Close the round and vote.`}
        </p>

        <Button className="mt-4 w-full py-4 text-xl" onClick={closeRound}>
          🛑 Close round & vote
        </Button>
      </motion.div>
    </div>
  )
}