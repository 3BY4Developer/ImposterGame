import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { colorFor, avatarFor } from '../game/useGame'
import { wordText } from '../data/flavours'
import { Button } from '../components/ui'
import { sfx } from '../game/sound'

export default function ResultScreen({ game }) {
  const { round, players, accusedIds, terms, restart, nextRound, scores, resetScores } = game
  const firedRef = useRef(false)

  const displayName = (p) => p?.name?.trim() || `Player ${players.indexOf(p) + 1}`
  const imposters = players.filter((p) => round.imposterIds.has(p.id))
  const caughtImposters = imposters.filter((p) => accusedIds.includes(p.id))
  const escapedImposters = imposters.filter((p) => !accusedIds.includes(p.id))

  const totalImposters = imposters.length
  const allCaught = caughtImposters.length === totalImposters
  const isSplit = totalImposters > 1 && caughtImposters.length > 0 && !allCaught

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true

    if (allCaught) {
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
    } else if (isSplit) {
      sfx.pop()
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, zIndex: 100 })
    } else {
      sfx.dud()
    }
  }, [allCaught, isSplit])

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <div className="text-7xl">{allCaught ? '🎯' : isSplit ? '🤝' : '😎'}</div>
        <h1
          className={`font-display mt-3 text-4xl font-bold ${
            allCaught ? 'text-saffron-400' : isSplit ? 'text-amber-300' : 'text-rose-400'
          }`}
        >
          {allCaught ? terms.caughtTitle : isSplit ? 'Split Round!' : terms.gotAwayTitle}
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-white/70 text-sm">
          {allCaught ? (
            <>
              Great detective work! <b>{caughtImposters.map(displayName).join(' & ')}</b>{' '}
              {caughtImposters.length > 1 ? 'were the imposters' : `was the ${terms.imposter.toLowerCase()}`}.
            </>
          ) : isSplit ? (
            <>
              Close call! You caught <b>{caughtImposters.map(displayName).join(', ')}</b>, but{' '}
              <b>{escapedImposters.map(displayName).join(', ')}</b> got away!
            </>
          ) : (
            <>
              <b>{imposters.map(displayName).join(' & ')}</b> fooled everyone — the{' '}
              {terms.imposter.toLowerCase()} wins!
            </>
          )}
        </p>

        {/* Tournament Scoreboard Summary */}
        <div className="glass mx-auto mt-6 flex w-full items-center justify-around rounded-3xl border border-white/10 p-4 text-center shadow-card">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">😇 Innocents</p>
            <p className="font-display text-3xl font-bold text-emerald-400">{scores.innocents}</p>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">Round</p>
            <p className="font-display text-3xl font-bold text-saffron-400">{scores.roundsPlayed}</p>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">😈 Imposters</p>
            <p className="font-display text-3xl font-bold text-rose-400">{scores.imposters}</p>
          </div>
        </div>

        {/* Word Reveal Card */}
        <motion.div
          className="glass mx-auto mt-6 w-full rounded-3xl border border-white/10 p-5"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ perspective: 1000 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            {round.dark ? "Everyone's word was" : 'The word was'}
          </p>
          <div className="font-display mt-1 text-4xl font-bold leading-tight text-gold-300">
            {round.category.emoji} {wordText(round.word)}
          </div>
          {round.dark && (
            <div className="mt-3 inline-block rounded-full bg-rose-500/15 border border-rose-400/40 px-4 py-2 text-sm font-semibold text-rose-300">
              😈 but {imposters.map(displayName).join(' & ')} saw&nbsp;
              <b className="text-white">{wordText(round.imposterWord)}</b>
            </div>
          )}
          {!round.dark && (
            <p className="mt-2 text-xs text-white/50">
              Category: {round.category.name} · {players.length} players · {imposters.length}{' '}
              {imposters.length === 1 ? terms.imposter : terms.imposters}
            </p>
          )}
        </motion.div>

        {/* Player Roster Outcome */}
        <div className="mt-5 flex flex-col gap-2">
          {round.order.map((idx, i) => {
            const p = players[idx]
            const isImp = round.imposterIds.has(p.id)
            const wasAccused = accusedIds.includes(p.id)
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`glass flex items-center gap-3 rounded-2xl border p-3 text-left ${
                  isImp
                    ? 'border-rose-400/50 bg-rose-500/10'
                    : wasAccused
                    ? 'border-amber-400/40 bg-amber-500/10'
                    : 'border-white/10'
                }`}
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-xl ${colorFor(idx)}`}>
                  {avatarFor(idx)}
                </span>
                <span className="text-base font-semibold text-white">
                  {p.name.trim() || `Player ${idx + 1}`}
                  {wasAccused && (
                    <span className="ml-2 text-xs font-normal text-amber-300">(accused)</span>
                  )}
                </span>
                <span className="ml-auto text-xs font-bold">
                  {isImp ? (
                    wasAccused ? (
                      <span className="text-rose-400">👻 Caught!</span>
                    ) : (
                      <span className="text-rose-300">👻 Escaped</span>
                    )
                  ) : (
                    <span className="text-emerald-400">✅ Innocent</span>
                  )}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <Button className="mt-6 w-full py-4 text-xl" onClick={nextRound}>
          ➡️ Next Round
        </Button>
        <div className="mt-3 flex gap-3 w-full">
          <Button variant="dark" className="flex-1 py-3 text-sm" onClick={restart}>
            ⚙️ Setup & Rules
          </Button>
          <Button
            variant="dark"
            className="flex-1 py-3 text-sm text-rose-300/80 hover:text-rose-200"
            onClick={() => {
              sfx.pop()
              resetScores()
            }}
          >
            ↺ Reset Scores
          </Button>
        </div>
      </motion.div>
    </div>
  )
}