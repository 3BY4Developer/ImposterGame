import { AnimatePresence, motion } from 'framer-motion'
import { useGame, PHASES } from './game/useGame'
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

  return (
    <div className="no-select relative min-h-dvh overflow-hidden">
      <Aurora />
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
    </div>
  )
}