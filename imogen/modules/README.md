# Imogen Lab 1 - Modular Framework System

A generative mandala visualization tool with pluggable symbolic frameworks, binaural audio synthesis, and sacred geometry rendering.

## Overview

This module system transforms the monolithic mandala generator into a framework-switchable engine. Users can select from multiple symbolic/metaphysical systems, each with its own color palettes, symbols, audio profiles, and guiding phrases.

## Module Structure

```
/modules/
  symbols_tibetan.js    - Tibetan script, Dhyani Buddhas, seed syllables
  elements_wuxing.js    - Chinese Five Elements with Sheng/Ke cycles
  audio_logic.js        - Frequency mappings, brainwave states, audio profiles
  geometry.js           - Sacred geometry, Platonic solids, shape generators
  frameworks.js         - Pluggable framework engine (imports all above)
```

## Available Frameworks

### 1. Chinese Wuxing (五行) - Default
- **Based on:** Five Elements (Wood, Fire, Earth, Metal, Water)
- **Color mapping:** True Wuxing correspondences (Fire→Red, Wood→Green, etc.)
- **Audio:** Element-based frequencies and waveforms
- **Features:** Sheng (generative) and Ke (controlling) cycle logic

### 2. Tibetan Mandala
- **Based on:** Vajrayana Buddhist cosmology
- **Symbols:** Five Dhyani Buddhas (Vairocana, Akshobhya, Ratnasambhava, Amitabha, Amoghasiddhi)
- **Seed syllables:** OM, HUM, TRAM, HRIH, AH (proper Unicode stacks)
- **Audio:** Theta-state meditation frequencies

### 3. Hermetic Planetary
- **Based on:** Seven classical planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn)
- **Symbols:** Planetary glyphs (☉ ☽ ☿ ♀ ♂ ♃ ♄)
- **Geometry:** Planet-specific shapes (Sun→circle, Mars→triangle, etc.)
- **Audio:** Planetary frequency correspondences

### 4. Jungian Archetype
- **Based on:** Carl Jung's archetypal psychology
- **Symbols:** Self, Shadow, Anima/Animus, Persona
- **Colors:** Emotional axes (warmth, coolness, depth, intensity, shadow)
- **Audio:** Archetype-specific brainwave states

### 5. Secular Minimalist
- **Based on:** Pure geometry without symbolic overlay
- **Colors:** Very pale, meditative color fields
- **Symbols:** Basic geometric shapes (○ □ △ ◇ ☆)
- **Audio:** Simple sine waves for focused attention

## Key Features

### Date-Element Mapping (Fixed)
Uses `getDate()` for day of month (1-31), not `getDay()` which returns weekday (0-6).

```javascript
const dayOfMonth = date.getDate(); // Correct
const dayIndex = (dayOfMonth - 1) % 5;
```

### Tibetan Digraph Handling (Fixed)
Priority-ordered digraph matching prevents conflicts:

```javascript
// Check longest digraphs first
const TIBETAN_DIGRAPHS = ['tsh', 'dzh', 'kh', 'gh', 'ch', 'th', 'dh', 'ph', 'sh', 'zh', 'ng', 'ny', 'ts', 'dz'];
```

### Guiding Phrases
Each framework provides contextual wisdom phrases based on seed:

- **Wuxing:** "Wood nourishes Fire; let movement create breath."
- **Tibetan:** "Let form arise within clarity."
- **Hermetic:** "As above, so below; as within, so without."
- **Jungian:** "Attend to what moves in the periphery."
- **Minimalist:** "Notice the shape of attention."

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 1-5 | Switch frameworks (Wuxing, Tibetan, Hermetic, Jungian, Minimalist) |
| R | Toggle Ritual Mode |
| ESC | Exit Ritual Mode / Fullscreen |
| F11 | Toggle Fullscreen |
| ↑/↓ | Adjust bloom intensity |
| ←/→ | Adjust animation speed |
| +/- | Adjust audio volume |

## Export Options

- **Standard click:** 650px PNG
- **Ctrl+Click:** 2048px (2K) PNG
- **Shift+Click:** 4096px (4K) PNG

## Ritual Mode

A contemplative state that:
- Fades all UI elements
- Slows animation to 0.3x
- Deepens binaural beat to theta (4.5 Hz)
- Enables bloom effect
- Auto-starts animation and audio

## Audio System

### Binaural Beat Frequencies
- **Delta (0.5-4 Hz):** Deep sleep, healing
- **Theta (4-8 Hz):** Meditation, creativity
- **Alpha (8-13 Hz):** Relaxed awareness
- **Beta (13-30 Hz):** Active thinking
- **Gamma (30+ Hz):** Peak awareness

### Waveform Mapping
- **Metal:** Triangle (sharp, structural)
- **Water:** Sine (smooth, fluid)
- **Wood:** Sawtooth (growing, forward)
- **Fire:** Square (intense, energetic)
- **Earth:** Sine (stable, fundamental)

## Adding New Frameworks

Each framework must export:

```javascript
export const NewFramework = {
  id: 'newframework',
  name: 'Display Name',
  description: 'Brief description',

  getSymbol(seed, elementData) { /* return {char, desc, meaning} */ },
  getColorPalette(date, seed, rand) { /* return [5 colors] */ },
  getAudioProfile(seed, date, elementData, rand) { /* return audio config */ },
  getGuidingPhrase(seed, elementData) { /* return string */ },
  getGeometryProfile(seed, elementData) { /* return geometry config */ }
};
```

Then add to the `frameworks` object in `frameworks.js`.

## Browser Requirements

- Modern browser with ES6+ support
- WebAudio API for binaural beats
- Canvas 2D context for rendering
- Recommended fonts: Noto Sans Tibetan, Noto Sans Runic

## Known Limitations

- High-resolution exports (4K) may be slow on older devices
- WebAudio suspends when tab is inactive (auto-resumes on visibility)
- Some Tibetan Unicode stacks may not render on all systems

## License

Part of Caldwell's Repository - See main project license.
