import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FLAVOURS } from '../data/flavours'
import { loadCustomWords, saveCustomWords } from '../game/storage'
import { avatarFor, colorFor } from '../game/useGame'
import { Button, Chip, Section, Segmented, Stepper, Toggle } from '../components/ui'
import { sfx } from '../game/sound'

function ManageWordsModal({ open, onClose, words, setWords }) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const w = draft.trim()
    if (!w || words.includes(w) || words.length >= 60) return
    setWords([...words, w])
    setDraft('')
    sfx.pop()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-3xl border border-white/10 p-5 shadow-card max-h-[80vh] overflow-auto"
          >
            <h2 className="font-display text-xl font-bold text-white mb-1">🌟 My Words</h2>
            <p className="text-sm text-white/60 mb-4">
              Add your own words to make a private category. Needs at least 3 to play. Saved on this
              phone.
            </p>
            <div className="flex gap-2 mb-4">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && add()}
                placeholder="e.g. Kaju Katli, Auto Ride…"
                className="flex-1 rounded-xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-saffron-400/60"
              />
              <Button onClick={add} className="px-4">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {words.length === 0 && (
                <p className="text-sm text-white/50">No words yet. Add a few to get started!</p>
              )}
              {words.map((w) => (
                <span
                  key={w}
                  className="glass flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-white"
                >
                  {w}
                  <button
                    onClick={() => {
                      setWords(words.filter((x) => x !== w))
                      sfx.pop()
                    }}
                    className="text-white/50 hover:text-white cursor-pointer"
                    aria-label={`Remove ${w}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <Button variant="dark" className="mt-5 w-full" onClick={onClose}>
              Done
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function SetupScreen({ game }) {
  const { players, settings, setSettings, addPlayer, removePlayer, renamePlayer, setCategory, toggleAllCategories, terms } =
    game

  const [customWords, setCustomWordsState] = useState(loadCustomWords)
  const setCustomWords = (w) => {
    setCustomWordsState(w)
    saveCustomWords(w)
  }
  const [modalOpen, setModalOpen] = useState(false)

  const flavour = FLAVOURS.find((f) => f.id === settings.flavourId) ?? FLAVOURS[0]

  const switchFlavour = (id) => {
    const f = FLAVOURS.find((x) => x.id === id)
    if (!f || id === settings.flavourId) return
    const cats = f.categories.filter((c) => c.words.length >= 3).map((c) => c.id)
    sfx.pop()
    setSettings((s) => {
      const keep = s.categoryIds.filter((cid) => cats.includes(cid))
      return {
        ...s,
        flavourId: id,
        categoryIds: keep.length ? keep : cats.slice(0, 3),
      }
    })
  }

  const allCategories = useMemo(() => {
    const cats = [{ id: 'random', name: 'Random', emoji: '🎲', words: [] }]
    cats.push(...flavour.categories.filter((c) => c.words.length >= 3))
    if (customWords.length >= 3) cats.push({ id: 'custom', name: 'My Words', emoji: '🌟', words: customWords })
    return cats
  }, [flavour, customWords])

  const selectedCats = allCategories.filter((c) => settings.categoryIds.includes(c.id))
  const allOn = allCategories.length > 0 && selectedCats.length === allCategories.length

  const playerNames = players.map((p, i) => p.name.trim() || `Player ${i + 1}`)
  const valid =
    players.length >= 3 && settings.imposterCount < players.length && selectedCats.length > 0

  return (
    <div className="relative z-10 mx-auto w-full max-w-xl px-4 pb-10 pt-8">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="mb-3 inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
          <span className="text-base">{flavour.emoji}</span> Flavour: {flavour.label}
          {FLAVOURS.length > 1 && (
            <span className="text-white/40">· pick below</span>
          )}
        </div>
        {FLAVOURS.length > 1 && (
          <div className="mb-4 flex justify-center gap-2">
            {FLAVOURS.map((f) => (
              <Chip
                key={f.id}
                active={settings.flavourId === f.id}
                onClick={() => switchFlavour(f.id)}
              >
                {f.emoji} {f.label}
              </Chip>
            ))}
          </div>
        )}
        <h1 className="font-display text-5xl font-bold leading-tight text-white sm:text-6xl">
          {terms.title}
        </h1>
        <p className="mt-2 text-white/60">Pass the phone. Give clues. Catch the {terms.imposter.toLowerCase()}.</p>
        <p className="mt-4 text-sm text-white/40">
          🎲 <span className="text-white/60">How to play:</span> Everyone gets the same word —
          except one {terms.imposter.toLowerCase()}. In turns, say ONE clue word. Blend in or expose
          the faker!
        </p>
      </motion.div>

      <div className="flex flex-col gap-4">
        <Section title={`Players (${players.length})`} aside={<span className="text-xs text-white/40">min 3</span>}>
          <div className="flex flex-col gap-2">
            {players.map((p, i) => (
              <div key={p.id} className="glass flex items-center gap-3 rounded-2xl border border-white/10 p-2">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl ${colorFor(i)}`}
                >
                  {avatarFor(i)}
                </span>
                <input
                  value={p.name}
                  onChange={(e) => renamePlayer(p.id, e.target.value)}
                  placeholder={playerNames[i]}
                  maxLength={14}
                  className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={() => {
                    removePlayer(p.id)
                    sfx.pop()
                  }}
                  disabled={players.length <= 3}
                  className="grid h-9 w-9 place-items-center rounded-xl text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-default"
                  aria-label={`Remove ${playerNames[i]}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Button variant="dark" className="mt-3 w-full" onClick={addPlayer} disabled={players.length >= 16}>
            + Add player
          </Button>
        </Section>

        <Section title={`${terms.imposters} (${settings.imposterCount})`}>
          <Stepper
            label="How many?"
            value={settings.imposterCount}
            min={1}
            max={2}
            onChange={(v) => setSettings((s) => ({ ...s, imposterCount: v }))}
          />
          {settings.imposterCount >= players.length && (
            <p className="mt-2 text-sm text-rose-400">Too many imposters — add more players!</p>
          )}
        </Section>

        <Section
          title="Categories"
          aside={
            <button
              onClick={() => {
                toggleAllCategories(allCategories.map((c) => c.id), !allOn)
                sfx.pop()
              }}
              className="text-xs font-semibold text-saffron-400 hover:text-saffron-500 cursor-pointer"
            >
              {allOn ? 'Select none' : 'Select all'}
            </button>
          }
        >
          <div className="flex flex-wrap gap-2">
            {allCategories.map((c) => (
              <Chip
                key={c.id}
                active={settings.categoryIds.includes(c.id)}
                onClick={() => setCategory(c.id, !settings.categoryIds.includes(c.id))}
              >
                {c.emoji} {c.name}
              </Chip>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/40">
            The secret word is picked from the selected categories. 🎲 <b className="text-white/60">Random</b>{' '}
            ignores the selection and picks from every category.
          </p>
          <button
            onClick={() => {
              setModalOpen(true)
              sfx.pop()
            }}
            className="mt-2 text-sm font-semibold text-saffron-400 hover:text-saffron-500 cursor-pointer"
          >
            🌟 {customWords.length >= 3 ? `Manage my words (${customWords.length})` : 'Add my own words'}
          </button>
        </Section>

        <Section title="⏰ Timer">
          <div className="flex flex-col gap-3">
            <Toggle
              on={settings.timer.enabled}
              onChange={(on) => setSettings((s) => ({ ...s, timer: { ...s.timer, enabled: on } }))}
              label="Enable round timer"
            />
            {settings.timer.enabled && (
              <Stepper
                label="Round length"
                value={settings.timer.minutes}
                min={1}
                max={5}
                onChange={(v) => setSettings((s) => ({ ...s, timer: { ...s.timer, minutes: v } }))}
              />
            )}
          </div>
        </Section>

        <Section title="🎮 Game mode">
          <Segmented
            options={[
              { value: 'classic', label: 'Classic' },
              { value: 'dark', label: 'Dark mode' },
            ]}
            value={settings.gameMode}
            onChange={(v) => setSettings((s) => ({ ...s, gameMode: v }))}
          />
          <p className="mt-2 text-sm text-white/40">
            {settings.gameMode === 'dark' ? (
              <>
                🗡️ <b className="text-white/60">Dark mode:</b> every player gets a word — but the{' '}
                {terms.imposter.toLowerCase()}'s word is <b className="text-white/60">different</b>, and even
                they don't know they're the {terms.imposter.toLowerCase()}. Spot the mismatch!
              </>
            ) : (
              <>
                🕵️ <b className="text-white/60">Classic:</b> everyone shares one secret word, the{' '}
                {terms.imposter.toLowerCase()} gets none — and knows it.
              </>
            )}
          </p>
        </Section>

        {settings.gameMode !== 'dark' && (
        <Section title={`👀 ${terms.hint} for ${terms.imposter}`}>
          <Segmented
            options={[
              { value: 'none', label: 'None' },
              { value: 'category', label: 'Category' },
              { value: 'word', label: 'Word hint' },
            ]}
            value={settings.imposterHint}
            onChange={(v) => setSettings((s) => ({ ...s, imposterHint: v }))}
          />
          <p className="mt-2 text-sm text-white/40">
            <b className="text-white/60">Word hint</b> shows the secret private hint for the word (if one
            exists) — falls back to the category name. Gives the {terms.imposter.toLowerCase()} a
            little extra to work with.
          </p>
        </Section>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!valid}
          onClick={() => game.startGame()}
          className={`no-tap-highlight no-select font-display w-full rounded-3xl py-5 text-2xl font-bold tracking-wide transition-all duration-150 active:scale-95 ${
            valid
              ? 'bg-gradient-to-b from-saffron-400 to-saffron-600 text-night-950 shadow-glow hover:brightness-105 cursor-pointer'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          }`}
        >
          {terms.startGame} 🎲
        </motion.button>
        {!valid && (
          <p className="text-center text-sm text-white/40">
            Need at least 3 players, fewer imposters than players, and one category.
          </p>
        )}
      </div>

      <ManageWordsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        words={customWords}
        setWords={setCustomWords}
      />
    </div>
  )
}