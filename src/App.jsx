import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGame, PHASES } from './game/useGame'
import { isMuted, toggleMute } from './game/sound'
import SetupScreen from './screens/SetupScreen'
import RevealScreen from './screens/RevealScreen'
import RoundScreen from './screens/RoundScreen'
import VoteScreen from './screens/VoteScreen'
import ResultScreen from './screens/ResultScreen'

function Aurora() {
  return (
    <div className="aurora" aria-hidden>
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
    </div>
  )
}

export default function App() {
  const game = useGame()
  const [muted, setMutedState] = useState(isMuted)

  return (
    <div className="no-select relative min-h-dvh overflow-hidden">
      <Aurora />

      <header className="relative z-20 mx-auto flex w-full max-w-xl items-center justify-between px-4 pt-3 text-xs font-semibold">
        {game.scores.roundsPlayed > 0 ? (
          <div className="glass flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-white/80 shadow-card">
            <span className="text-saffron-400">🏆 R{game.scores.roundsPlayed}</span>
            <span className="text-white/40">|</span>
            <span>😇 {game.scores.innocents}</span>
            <span className="text-white/40">:</span>
            <span>😈 {game.scores.imposters}</span>
          </div>
        ) : (
          <div />
        )}
        <button
          onClick={() => {
            const next = toggleMute()
            setMutedState(next)
          }}
          className="glass no-tap-highlight cursor-pointer rounded-full border border-white/10 p-2 text-base text-white/75 hover:bg-white/10 hover:text-white transition-all active:scale-90"
          aria-label={muted ? 'Unmute audio' : 'Mute audio'}
          title={muted ? 'Unmute audio' : 'Mute audio'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={game.phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {game.phase === PHASES.setup && <SetupScreen game={game} />}
          {game.phase === PHASES.reveal && <RevealScreen game={game} />}
          {game.phase === PHASES.round && <RoundScreen game={game} />}
          {game.phase === PHASES.vote && <VoteScreen game={game} />}
          {game.phase === PHASES.result && <ResultScreen game={game} />}
        </motion.div>
      </AnimatePresence>

      <footer className="no-select relative z-10 pb-5 pt-2 text-center text-sm text-white/40">
        Made with <span className="inline-block animate-pulse">❤️</span> by{' '}
        <span className="font-semibold text-white/60">bitbyter</span>
      </footer>
    </div>
  )
}