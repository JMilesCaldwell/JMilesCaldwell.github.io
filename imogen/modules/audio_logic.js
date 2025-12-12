/**
 * Audio Logic Module
 *
 * Contains frequency mappings, waveform logic, and audio configuration
 * for binaural beat generation tied to symbolic frameworks.
 */

// A=432Hz tuning note frequencies from C2 to C4
// Formula: freq = 432 * 2^((semitone - 49) / 12) where A4 = 49
export const NOTE_FREQUENCIES_432 = [
  { note: 'C2',  freq: 64.22,  semitone: 0 },
  { note: 'C#2', freq: 68.04,  semitone: 1 },
  { note: 'D2',  freq: 72.08,  semitone: 2 },
  { note: 'D#2', freq: 76.37,  semitone: 3 },
  { note: 'E2',  freq: 80.91,  semitone: 4 },
  { note: 'F2',  freq: 85.72,  semitone: 5 },
  { note: 'F#2', freq: 90.82,  semitone: 6 },
  { note: 'G2',  freq: 96.22,  semitone: 7 },
  { note: 'G#2', freq: 101.94, semitone: 8 },
  { note: 'A2',  freq: 108.00, semitone: 9 },
  { note: 'A#2', freq: 114.42, semitone: 10 },
  { note: 'B2',  freq: 121.23, semitone: 11 },
  { note: 'C3',  freq: 128.43, semitone: 12 },
  { note: 'C#3', freq: 136.07, semitone: 13 },
  { note: 'D3',  freq: 144.16, semitone: 14 },
  { note: 'D#3', freq: 152.74, semitone: 15 },
  { note: 'E3',  freq: 161.82, semitone: 16 },
  { note: 'F3',  freq: 171.44, semitone: 17 },
  { note: 'F#3', freq: 181.63, semitone: 18 },
  { note: 'G3',  freq: 192.43, semitone: 19 },
  { note: 'G#3', freq: 203.88, semitone: 20 },
  { note: 'A3',  freq: 216.00, semitone: 21 },
  { note: 'A#3', freq: 228.84, semitone: 22 },
  { note: 'B3',  freq: 242.45, semitone: 23 },
  { note: 'C4',  freq: 256.87, semitone: 24 }
];

// Solfeggio frequencies (expanded set)
export const SOLFEGGIO_FREQUENCIES = {
  UT:  { freq: 396, meaning: 'Liberation from guilt and fear' },
  RE:  { freq: 417, meaning: 'Facilitating change, undoing situations' },
  MI:  { freq: 528, meaning: 'Transformation, DNA repair, miracles' },
  FA:  { freq: 639, meaning: 'Connecting relationships, harmonizing' },
  SOL: { freq: 741, meaning: 'Expression, solutions, cleaning' },
  LA:  { freq: 852, meaning: 'Awakening intuition, spiritual order' },
  SI:  { freq: 963, meaning: 'Connection to cosmos, enlightenment' }
};

// Element to frequency mapping (Wuxing)
export const ELEMENT_FREQUENCIES = {
  METAL: { freq: 432,    note: 'A4 (432 Hz)', waveform: 'triangle', explanation: 'Clarity and structure. Sharp, clear tones for cognitive precision.' },
  WATER: { freq: 192.43, note: 'G3',          waveform: 'sine',     explanation: 'Flow and depth. Smooth, fluid tones for system dynamics.' },
  WOOD:  { freq: 144.16, note: 'D3',          waveform: 'sawtooth', explanation: 'Growth and forward movement. Rising, organic tones.' },
  FIRE:  { freq: 216.00, note: 'A3',          waveform: 'square',   explanation: 'Energy and transformation. Intense, energetic tones.' },
  EARTH: { freq: 128.43, note: 'C3',          waveform: 'sine',     explanation: 'Stability and grounding. Fundamental, stable tones.' }
};

// Planetary frequencies (Hermetic correspondences)
export const PLANETARY_FREQUENCIES = {
  SUN:     { freq: 126.22, note: 'B2',  waveform: 'sine',     meaning: 'Vitality, life force, consciousness' },
  MOON:    { freq: 210.42, note: 'G#3', waveform: 'sine',     meaning: 'Intuition, emotions, cycles' },
  MERCURY: { freq: 141.27, note: 'C#3', waveform: 'triangle', meaning: 'Communication, intellect, speed' },
  VENUS:   { freq: 221.23, note: 'A3',  waveform: 'sine',     meaning: 'Love, beauty, harmony' },
  MARS:    { freq: 144.72, note: 'D3',  waveform: 'square',   meaning: 'Action, will, courage' },
  JUPITER: { freq: 183.58, note: 'F#3', waveform: 'sine',     meaning: 'Expansion, wisdom, abundance' },
  SATURN:  { freq: 147.85, note: 'D3',  waveform: 'sawtooth', meaning: 'Structure, discipline, time' }
};

// Brainwave states and their beat frequency ranges
export const BRAINWAVE_STATES = {
  DELTA:     { min: 0.5,  max: 4,   meaning: 'Deep sleep, healing, regeneration' },
  THETA:     { min: 4,    max: 8,   meaning: 'Meditation, creativity, REM sleep' },
  ALPHA:     { min: 8,    max: 13,  meaning: 'Relaxed awareness, calm focus' },
  BETA:      { min: 13,   max: 30,  meaning: 'Active thinking, concentration' },
  GAMMA:     { min: 30,   max: 100, meaning: 'Peak awareness, insight' }
};

// Preset beat configurations
export const BEAT_PRESETS = {
  GROUNDING:     { beat: 2.5,  state: 'DELTA', description: 'Deep grounding and stabilization (1-4 Hz)' },
  CENTERING:     { beat: 6,    state: 'THETA', description: 'Centering and meditation (4-7 Hz)' },
  ALERT_CLARITY: { beat: 10,   state: 'ALPHA', description: 'Alert clarity and calm focus (8-12 Hz)' },
  ACTIVE_FOCUS:  { beat: 18,   state: 'BETA',  description: 'Active concentration (13-20 Hz)' },
  INSIGHT:       { beat: 40,   state: 'GAMMA', description: 'Peak awareness and insight (40 Hz)' }
};

// Archetype audio profiles (Jungian)
export const ARCHETYPE_AUDIO = {
  SELF:   { waveform: 'sine',     beatState: 'ALPHA', carrier: 'low',  meaning: 'Wholeness, integration' },
  SHADOW: { waveform: 'sawtooth', beatState: 'THETA', carrier: 'low',  meaning: 'Hidden aspects, unconscious' },
  ANIMA:  { waveform: 'sine',     beatState: 'THETA', carrier: 'mid',  meaning: 'Feminine aspect, receptivity' },
  ANIMUS: { waveform: 'square',   beatState: 'BETA',  carrier: 'mid',  meaning: 'Masculine aspect, action' },
  PERSONA:{ waveform: 'triangle', beatState: 'ALPHA', carrier: 'high', meaning: 'Social mask, presentation' }
};

/**
 * Get brainwave state from beat frequency
 * @param {number} beatFreq - Beat frequency in Hz
 * @returns {object} - Brainwave state info
 */
export function getBrainwaveState(beatFreq) {
  for (const [state, range] of Object.entries(BRAINWAVE_STATES)) {
    if (beatFreq >= range.min && beatFreq < range.max) {
      return { state, ...range };
    }
  }
  return { state: 'UNKNOWN', min: 0, max: 0, meaning: 'Outside normal ranges' };
}

/**
 * Compute audio parameters from seed and element data
 * @param {number} seed - Numeric seed
 * @param {string} dateStr - Date string
 * @param {object} elementData - { year, month, day } element objects
 * @param {function} seededRandom - Seeded random function
 * @returns {object} - Audio configuration
 */
export function computeAudioFromElements(seed, dateStr, elementData, seededRandom) {
  const elements = [elementData.year, elementData.month, elementData.day];

  // Find dominant element (highest frequency)
  const primaryElement = elements.reduce((prev, current) => {
    const prevFreq = ELEMENT_FREQUENCIES[prev.key].freq;
    const currentFreq = ELEMENT_FREQUENCIES[current.key].freq;
    return (currentFreq > prevFreq) ? current : prev;
  });

  // Parse date for additional variation
  const date = dateStr ? new Date(dateStr + 'T12:00:00') : new Date();
  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  // Select note from 432Hz scale
  const noteIndex = Math.floor(
    (seed + dayOfMonth * 7 + month * 31 + (year % 100) * 13) % NOTE_FREQUENCIES_432.length
  );
  const selectedNote = NOTE_FREQUENCIES_432[noteIndex];

  // Add microtonal variation
  const microtuneVariation = (seededRandom() - 0.5) * 0.03;
  const carrierFreq = selectedNote.freq * (1 + microtuneVariation);

  // Calculate beat frequency
  const baseBeat = 2.0 + (dayOfMonth / 31) * 6.0;
  const beatVariation = seededRandom() * 4.0;
  const beat = baseBeat + beatVariation;

  // Get waveform from element
  const waveformType = ELEMENT_FREQUENCIES[primaryElement.key].waveform;

  return {
    carrier: carrierFreq,
    beat: beat,
    element: primaryElement,
    elementalBaseFreq: ELEMENT_FREQUENCIES[primaryElement.key].freq,
    waveform: waveformType,
    selectedNote: selectedNote.note,
    brainwaveState: getBrainwaveState(beat)
  };
}

/**
 * Get audio profile for Hermetic/planetary framework
 * @param {string} planet - Planet name (SUN, MOON, etc.)
 * @param {number} seed - Numeric seed
 * @returns {object} - Audio configuration
 */
export function getPlanetaryAudio(planet, seed) {
  const planetData = PLANETARY_FREQUENCIES[planet] || PLANETARY_FREQUENCIES.SUN;

  return {
    carrier: planetData.freq,
    waveform: planetData.waveform,
    note: planetData.note,
    meaning: planetData.meaning
  };
}

/**
 * Get audio profile for Jungian archetype framework
 * @param {string} archetype - Archetype name
 * @param {number} seed - Numeric seed
 * @param {function} seededRandom - Seeded random function
 * @returns {object} - Audio configuration
 */
export function getArchetypeAudio(archetype, seed, seededRandom) {
  const archetypeData = ARCHETYPE_AUDIO[archetype] || ARCHETYPE_AUDIO.SELF;
  const beatState = BRAINWAVE_STATES[archetypeData.beatState];

  // Calculate carrier based on 'low', 'mid', 'high' designation
  let carrierIndex;
  switch (archetypeData.carrier) {
    case 'low':  carrierIndex = Math.floor(seed % 8); break;
    case 'mid':  carrierIndex = 8 + Math.floor(seed % 9); break;
    case 'high': carrierIndex = 17 + Math.floor(seed % 8); break;
    default:     carrierIndex = Math.floor(seed % NOTE_FREQUENCIES_432.length);
  }

  const selectedNote = NOTE_FREQUENCIES_432[carrierIndex];

  // Beat in the archetype's preferred brainwave range
  const beat = beatState.min + seededRandom() * (beatState.max - beatState.min);

  return {
    carrier: selectedNote.freq,
    beat: beat,
    waveform: archetypeData.waveform,
    selectedNote: selectedNote.note,
    meaning: archetypeData.meaning,
    brainwaveState: getBrainwaveState(beat)
  };
}

/**
 * Calculate binaural beat frequencies
 * @param {number} carrier - Center frequency
 * @param {number} beat - Beat frequency
 * @returns {object} - { left, right } frequencies
 */
export function calculateBinauralFrequencies(carrier, beat) {
  return {
    left: Math.max(80, carrier - beat / 2),
    right: Math.max(80, carrier + beat / 2)
  };
}

/**
 * Calculate interval frequency (musical intervals above base)
 * @param {number} carrier - Base frequency
 * @param {number} semitones - Number of semitones above base
 * @returns {number} - Interval frequency
 */
export function calculateIntervalFrequency(carrier, semitones) {
  if (semitones === 0) return carrier;
  return carrier * Math.pow(2, semitones / 12);
}

/**
 * Get harmonic frequencies (overtone series)
 * @param {number} fundamental - Fundamental frequency
 * @param {number[]} multipliers - Array of harmonic multipliers
 * @returns {object[]} - Array of { freq, multiplier, amplitude }
 */
export function getHarmonicSeries(fundamental, multipliers = [2, 3, 5]) {
  return multipliers.map(mult => ({
    freq: fundamental * mult,
    multiplier: mult,
    amplitude: 1 / (mult * 1.5) // Natural harmonic decay
  }));
}
