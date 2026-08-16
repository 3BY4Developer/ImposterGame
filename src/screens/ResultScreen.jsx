import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { colorFor, avatarFor } from '../game/useGame'
import { Button } from '../components/ui'
import { sfx } from '../game/sound'

export default function ResultScreen({ game }) {
  const { round, players, accusedId, terms, restart } = game
  const accused = players.find((p) => p.id === accusedId)
  const caught = round.imposterIds.has(accusedId)
  const firedRef = useRef(false)

  useEffect(() => {
    if (caught && !firedRef.current) {
      firedRef.current = true
      sfx.fanfare()
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 }, zIndex: 100 })
      const t1 = setTimeout(
        () => confetti({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, zIndex: 100 }),
        350
      )
      const t2 = setTimeout(
        () => confetti({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, zIndex: 100 }),
        650
      )
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
    if (!caught && !firedRef.current) sfx.dud()
  }, [caught])

  const imposters = players.filter((p) => round.imposterIds.has(p.id))

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <div className="text-7xl">{caught ? '🎯' : '😎'}</div>
        <h1 className={`font-display mt-3 text-4xl font-bold ${caught ? 'text-saffron-400' : 'text-rose-400'}`}>
          {caught ? terms.caught + '!' : `${terms.imposter} got away!`}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-white/70">
          {caught ? (
            <>
              Great detective work! <b>{accused?.name}</b> was the {terms.imposter.toLowerCase()}.
            </>
          ) : (
            <>
              <b>{imposters.map((p) => p.name).join(' & ')}</b> fooled everyone — the{' '}
              {terms.imposter.toLowerCase()} wins!
            </>
          )}
        </p>

        <motion.div
          className="glass mx-auto mt-8 w-full rounded-3xl border border-white/10 p-6"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ perspective: 1000 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            The word was
          </p>
          <div className="font-display mt-1 text-5xl font-bold leading-tight text-gold-300">
            {round.category.emoji} {round.word}
          </div>
          <p className="mt-2 text-sm text-white/50">
            Category: {round.category.name} · {players.length} players · {imposters.length}{' '}
            {imposters.length === 1 ? terms.imposter : terms.imposters}
          </p>
        </motion.div>

        <div className="mt-6 flex flex-col gap-2">
          {round.order.map((idx, i) => {
            const p = players[idx]
            const isImp = round.imposterIds.has(p.id)
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.07 }}
                className={`glass flex items-center gap-3 rounded-2xl border p-3 text-left ${
                  isImp ? 'border-rose-400/50 bg-rose-500/10' : 'border-white/10'
                }`}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-xl text-2xl ${colorFor(idx)}`}>
                  {avatarFor(idx)}
                </span>
                <span className="text-lg font-semibold text-white">
                  {p.name.trim() || `Player ${idx + 1}`}
                </span>
                <span className="ml-auto text-sm font-bold">
                  {isImp ? <span className="text-rose-400">👻 {terms.imposter}</span> : <span className="text-emerald-400">✅ innocent</span>}
                </span>
              </motion.div>
            )
          })}
        </div>

        <Button className="mt-8 w-full py-4 text-xl" onClick={restart}>
          🔁 Play again
        </Button>
      </motion.div>
    </div>
  )
}