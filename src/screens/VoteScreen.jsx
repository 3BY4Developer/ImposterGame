import { motion } from 'framer-motion'
import { colorFor, avatarFor } from '../game/useGame'
import { Button } from '../components/ui'
import { sfx } from '../game/sound'

export default function VoteScreen({ game }) {
  const { round, players, accusedId, setAccusedId, revealVerdict, terms } = game

  const pick = (id) => {
    sfx.pop()
    setAccusedId(id)
  }

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-4 pb-10 pt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full text-center"
      >
        <h1 className="font-display text-4xl font-bold text-white">🕵️ Who is it?</h1>
        <p className="mx-auto mt-2 max-w-xs text-white/70">
          Discuss the clues, then accuse who you think is the {terms.imposter.toLowerCase()}.
        </p>

        <div className="mt-8 flex flex-col gap-2">
          {round.order.map((idx) => {
            const p = players[idx]
            const selected = accusedId === p.id
            return (
              <motion.button
                key={p.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => pick(p.id)}
                className={`no-tap-highlight no-select glass flex cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-150 ${
                  selected
                    ? 'border-saffron-400/70 bg-saffron-500/15 shadow-glow'
                    : 'border-white/10 hover:bg-white/10'
                }`}
              >
                <span className={`grid h-11 w-11 place-items-center rounded-xl text-2xl ${colorFor(idx)}`}>
                  {avatarFor(idx)}
                </span>
                <span className="text-lg font-semibold text-white">
                  {p.name.trim() || `Player ${idx + 1}`}
                </span>
                <span className="ml-auto grid h-7 w-7 place-items-center rounded-full border border-white/20 text-sm">
                  {selected ? '✅' : ''}
                </span>
              </motion.button>
            )
          })}
        </div>

        <Button
          className="mt-6 w-full py-4 text-xl"
          disabled={!accusedId}
          onClick={revealVerdict}
        >
          🔍 Reveal the {terms.imposter}
        </Button>
      </motion.div>
    </div>
  )
}