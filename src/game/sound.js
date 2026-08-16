let ctx = null

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, dur, type = 'sine', vol = 0.12, when = 0) {
  try {
    const a = ac()
    const t = a.currentTime + when
    const o = a.createOscillator()
    const g = a.createGain()
    o.type = type
    o.frequency.value = freq
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(vol, t + 0.015)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(a.destination)
    o.start(t)
    o.stop(t + dur + 0.03)
  } catch {
    /* audio unavailable */
  }
}

export const sfx = {
  pop() {
    tone(660, 0.07, 'triangle')
  },
  reveal() {
    tone(392, 0.1, 'triangle')
    tone(523, 0.1, 'triangle', 0.12, 0.08)
    tone(659, 0.16, 'triangle', 0.12, 0.16)
  },
  imposter() {
    tone(320, 0.16, 'sawtooth', 0.09)
    tone(242, 0.26, 'sawtooth', 0.09, 0.12)
    tone(180, 0.4, 'sine', 0.12, 0.24)
  },
  tick() {
    tone(880, 0.045, 'square', 0.05)
  },
  fanfare() {
    ;[523, 659, 784, 1047].forEach((f, i) => tone(f, 0.2, 'triangle', 0.14, i * 0.09))
  },
  dud() {
    tone(300, 0.2, 'sawtooth', 0.09)
    tone(220, 0.3, 'sawtooth', 0.09, 0.12)
  },
}