import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colorFor, avatarFor } from '../game/useGame'
import { wordText } from '../data/flavours'
import { Button } from '../components/ui'
import { sfx } from '../game/sound'

export default function RevealScreen({ game }) {
  const { round, players, revealIndex, settings, terms, finishReveal } = game
  const [revealed, setRevealed] = useState(false)

  const imposterHint =
    settings.imposterHint === 'none'
      ? null
      : settings.imposterHint === 'category'
        ? `${round.category.emoji} ${round.category.name}`
        : round.hint

  const idx = round.order[revealIndex]
  const player = players[idx]
  const isImposter = round.imposterIds.has(player.id)
  const isLast = revealIndex === round.order.length - 1

  const next = () => {
    sfx.pop()
    setRevealed(false)
    if (isLast) finishReveal()
    else game.setRevealIndex((prev) => prev + 1)
  }

  const onFlip = () => {
    if (revealed) return
    setRevealed(true)
    if (isImposter && !round.dark) sfx.imposter()
    else sfx.reveal()
  }

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-10">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="flex w-full flex-col items-center"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron-400 mb-8">
              {terms.passPhone}
            </p>
            <div className="mb-8 text-center">
              <motion.div
                initial={{ scale: 0.6, rotate: -6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className={`mx-auto mb-4 grid h-24 w-24 place-items-center rounded-3xl text-5xl shadow-card ${colorFor(idx)}`}
              >
                {avatarFor(idx)}
              </motion.div>
              <h1 className="font-display text-4xl font-bold text-white">
                {player.name.trim() || `Player ${idx + 1}`}
              </h1>
              <p className="mt-2 text-white/60">Make sure no one else sees the card!</p>
            </div>
            <Button className="w-full py-4 text-xl" onClick={onFlip}>
              🃏 Reveal card
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22 }}
            className="flex w-full flex-col items-center"
          >
            <div style={{ perspective: 1200 }} className="w-full">
              <motion.div
                animate={{ rotateY: revealed ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="no-tap-highlight relative h-[360px] w-full cursor-pointer rounded-3xl"
                onClick={onFlip}
              >
                <div
                  className="absolute inset-0 grid place-items-center rounded-3xl border border-white/15 bg-gradient-to-br from-night-700 via-night-800 to-night-900 shadow-card"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 font-display text-4xl font-bold text-saffron-400">
                      ?
                    </div>
                    <p className="font-display text-2xl font-bold text-white">{terms.tapToReveal}</p>
                  </div>
                </div>

                <div
                  className="absolute inset-0 rounded-3xl border shadow-card"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {isImposter && !round.dark ? (
                    <div className="grid h-full w-full place-items-center rounded-3xl bg-gradient-to-br from-rose-700 via-rose-900 to-night-900 border-rose-400/30 text-center p-6">
                      <div>
                        <div className="mb-3 text-6xl">👻</div>
                        <p className="font-display text-2xl font-bold text-rose-300">
                          {terms.youAreTheImposter}
                        </p>
                        <p className="mt-2 text-white/70">{terms.fakeIt}</p>
                        <p className="mt-1 text-sm text-white/50">{terms.youDontKnow}</p>
                        {settings.imposterHint !== 'none' && imposterHint && (
                          <div className="mt-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-gold-300">
                            🔎 {terms.hint}: {imposterHint}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid h-full w-full place-items-center rounded-3xl bg-gradient-to-br from-saffron-400 via-saffron-500 to-saffron-600 p-6 text-center">
                      <div>
                        <div className="mb-3 text-6xl">{round.category.emoji}</div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-night-900/70">
                          {round.dark ? terms.yourWord : terms.secretWord}
                        </p>
                        <p className="font-display mt-2 break-words text-4xl font-bold leading-tight text-night-950">
                          {wordText(isImposter ? round.imposterWord : round.word)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <Button className="mt-6 w-full py-4 text-xl" onClick={next}>
              {isLast ? '🎯 Start the round' : `➡️ ${terms.nextPlayer}`}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}