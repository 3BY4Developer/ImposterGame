const KEY = 'desi-imposter/custom-words'

export function loadCustomWords() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCustomWords(words) {
  try {
    localStorage.setItem(KEY, JSON.stringify(words))
  } catch {
    /* storage unavailable */
  }
}