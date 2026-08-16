import { motion } from 'framer-motion'
import { sfx } from '../game/sound'

export function Button({ variant = 'primary', className = '', children, onClick, ...props }) {
  const base =
    'no-tap-highlight no-select font-display font-bold tracking-wide rounded-2xl transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer'
  const styles = {
    primary:
      'bg-gradient-to-b from-saffron-400 to-saffron-600 text-night-950 shadow-glow hover:brightness-105',
    dark: 'glass text-white hover:bg-white/10 border border-white/10',
    ghost: 'text-white/80 hover:text-white',
  }
  return (
    <button
      {...props}
      onClick={(e) => {
        sfx.pop()
        onClick?.(e)
      }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={() => {
        sfx.pop()
        onClick?.()
      }}
      className={`no-tap-highlight no-select cursor-pointer rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-150 active:scale-95 border ${
        active
          ? 'bg-gradient-to-b from-saffron-400 to-saffron-600 text-night-950 border-transparent shadow-glow'
          : 'glass text-white/85 hover:bg-white/10 border-white/10'
      }`}
    >
      {children}
    </button>
  )
}

export function Stepper({ value, onChange, min, max, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold text-white/75 min-w-24 text-left">{label}</span>
      <div className="glass flex items-center gap-5 rounded-2xl px-3 py-2 border border-white/10">
        <button
          onClick={() => {
            sfx.pop()
            if (value > min) onChange(value - 1)
          }}
          className="no-tap-highlight cursor-pointer w-9 h-9 grid place-items-center rounded-xl bg-white/10 text-xl font-bold text-white hover:bg-white/20 active:scale-90 transition-all"
        >
          −
        </button>
        <span className="font-display text-2xl font-bold text-white w-8 text-center">{value}</span>
        <button
          onClick={() => {
            sfx.pop()
            if (value < max) onChange(value + 1)
          }}
          className="no-tap-highlight cursor-pointer w-9 h-9 grid place-items-center rounded-xl bg-white/10 text-xl font-bold text-white hover:bg-white/20 active:scale-90 transition-all"
        >
          +
        </button>
      </div>
    </div>
  )
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="glass flex rounded-2xl border border-white/10 p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => {
            sfx.pop()
            onChange(o.value)
          }}
          className={`no-tap-highlight cursor-pointer flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-95 ${
            value === o.value
              ? 'bg-gradient-to-b from-saffron-400 to-saffron-600 text-night-950 shadow-glow'
              : 'text-white/75 hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Section({ title, children, aside }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-5 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold text-white">{title}</h2>
        {aside}
      </div>
      {children}
    </motion.div>
  )
}

export function Toggle({ on, onChange, label }) {
  return (
    <button
      onClick={() => {
        sfx.pop()
        onChange(!on)
      }}
      className="no-tap-highlight no-select flex w-full items-center justify-between cursor-pointer"
    >
      <span className="text-sm font-semibold text-white/75">{label}</span>
      <span
        className={`relative h-8 w-14 rounded-full transition-colors duration-200 ${
          on ? 'bg-gradient-to-b from-saffron-400 to-saffron-600 shadow-glow' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all duration-200 ${
            on ? 'left-7' : 'left-1'
          }`}
        />
      </span>
    </button>
  )
}