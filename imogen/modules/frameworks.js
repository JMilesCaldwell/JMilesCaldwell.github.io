/**
 * Framework Engine Module
 *
 * Provides pluggable framework architecture for switching between
 * different symbolic/metaphysical systems.
 *
 * Each framework exports:
 * - getSymbol(name, seed)
 * - getColorPalette(date, seed, rand)
 * - getAudioProfile(seed, date, elementData, rand)
 * - getGuidingPhrase(seed, elementData)
 * - getGeometryProfile(seed, elementData) [optional]
 */

import {
  TIBETAN_MAPPING, TIBETAN_SYMBOLS, DHYANI_BUDDHAS,
  convertToTibetan, getDhyaniBuddhaForElement, getTibetanPalette,
  getSeedSyllableForElement
} from './symbols_tibetan.js';

import {
  ELEMENTS, getElementsFromDate, getBlendedPalette, getWuxingPhrase,
  analyzeElementRelationships, SHENG_CYCLE
} from './elements_wuxing.js';

import {
  computeAudioFromElements, getPlanetaryAudio, getArchetypeAudio,
  PLANETARY_FREQUENCIES, ELEMENT_FREQUENCIES, BEAT_PRESETS
} from './audio_logic.js';

import {
  MANDALA_ARCHETYPES, PLANETARY_SHAPES, ARCHETYPE_SYMBOLS,
  PLATONIC_SOLIDS, PHI
} from './geometry.js';

// ============================================================================
// TIBETAN MANDALA FRAMEWORK
// ============================================================================
export const TibetanFramework = {
  id: 'tibetan',
  name: 'Tibetan Mandala',
  description: 'Based on Vajrayana Buddhist cosmology with Five Dhyani Buddhas.',

  scriptMapping: TIBETAN_MAPPING,
  symbols: TIBETAN_SYMBOLS,

  convertText(text) {
    return convertToTibetan(text);
  },

  getSymbol(seed, elementData) {
    // Map to Dhyani Buddha based on primary element
    const buddha = getDhyaniBuddhaForElement(elementData?.year?.key || 'EARTH');
    const syllable = getSeedSyllableForElement(elementData?.year?.key || 'EARTH');

    return {
      char: syllable.char,
      desc: `${buddha.name} Seed Syllable`,
      meaning: `${syllable.meaning} Associated with ${buddha.name}, Buddha of ${buddha.wisdom}.`
    };
  },

  getColorPalette(date, seed, rand) {
    const elementData = getElementsFromDate(date);
    const buddha = getDhyaniBuddhaForElement(elementData.year.key);

    // Use Buddha's color family as primary
    const primaryColors = getTibetanPalette(elementData.year.key);
    const secondaryColors = getTibetanPalette(elementData.month.key);

    return [
      primaryColors[0],
      secondaryColors[1],
      buddha.color,  // Buddha's primary color as accent
      primaryColors[2],
      secondaryColors[3]
    ];
  },

  getAudioProfile(seed, date, elementData, rand) {
    const buddha = getDhyaniBuddhaForElement(elementData.year.key);
    const baseAudio = computeAudioFromElements(seed, date, elementData, rand);

    // Tibetan mode prefers theta for meditation
    const beat = BEAT_PRESETS.CENTERING.beat + (rand() - 0.5) * 2;

    return {
      ...baseAudio,
      beat,
      waveform: 'sine', // Pure tones for meditation
      note: baseAudio.selectedNote,
      explanation: `Tuned for ${buddha.name} meditation. ${buddha.wisdom}.`
    };
  },

  getGuidingPhrase(seed, elementData) {
    const buddha = getDhyaniBuddhaForElement(elementData.year.key);
    const phrases = [
      'Let form arise within clarity.',
      `${buddha.seedSyllable} — the seed of ${buddha.wisdom.toLowerCase()}.`,
      'Rest in the nature of mind.',
      'All phenomena are empty and luminous.',
      `${buddha.name} dispels ${buddha.poison.toLowerCase()}.`
    ];
    return phrases[seed % phrases.length];
  },

  getGeometryProfile(seed, elementData) {
    return {
      archetype: MANDALA_ARCHETYPES[0], // Lotus pattern
      polyhedronTypes: [3, 6], // Tetrahedron, Merkaba
      preferredRingStyles: [0, 1, 3], // Circles, dots, symbols
      complexity: 0.6 + (seed % 100) / 250
    };
  }
};

// ============================================================================
// CHINESE WUXING FRAMEWORK
// ============================================================================
export const WuxingFramework = {
  id: 'wuxing',
  name: 'Chinese Wuxing (五行)',
  description: 'Five Elements system with Sheng (generative) and Ke (controlling) cycles.',

  scriptMapping: null, // Uses standard Chinese characters
  symbols: Object.values(ELEMENTS).map(e => ({
    char: e.name.split(' ')[0],
    desc: e.englishName,
    meaning: e.meaning
  })),

  convertText(text) {
    // No conversion for Wuxing - uses Latin or Chinese as-is
    return text;
  },

  getSymbol(seed, elementData) {
    const element = elementData?.year || ELEMENTS.EARTH;
    return {
      char: element.name.split(' ')[0], // Chinese character
      desc: element.englishName,
      meaning: element.meaning
    };
  },

  getColorPalette(date, seed, rand) {
    const elementData = getElementsFromDate(date);
    return getBlendedPalette(elementData, rand);
  },

  getAudioProfile(seed, date, elementData, rand) {
    const audio = computeAudioFromElements(seed, date, elementData, rand);
    const elementFreq = ELEMENT_FREQUENCIES[elementData.year.key];

    return {
      ...audio,
      waveform: elementFreq.waveform,
      explanation: elementFreq.explanation
    };
  },

  getGuidingPhrase(seed, elementData) {
    return getWuxingPhrase(elementData, seed);
  },

  getGeometryProfile(seed, elementData) {
    // Map elements to geometry
    const elementGeometry = {
      WOOD: { archetype: 3, shapes: [3] },     // Spiral, triangle
      FIRE: { archetype: 1, shapes: [3, 6] },  // Sri Yantra, tetrahedron
      EARTH: { archetype: 0, shapes: [2] },    // Lotus, cube
      METAL: { archetype: 2, shapes: [4, 5] }, // Crystal grid, octahedron
      WATER: { archetype: 3, shapes: [0] }     // Spiral, icosahedron
    };

    const geo = elementGeometry[elementData.year.key] || elementGeometry.EARTH;

    return {
      archetype: MANDALA_ARCHETYPES[geo.archetype],
      polyhedronTypes: geo.shapes,
      preferredRingStyles: [0, 2, 4, 5],
      complexity: 0.5 + (seed % 100) / 200,
      // Enable Sheng cycle animation
      shengCycleAnimation: true,
      cycleElements: [
        elementData.year.key,
        SHENG_CYCLE[elementData.year.key],
        SHENG_CYCLE[SHENG_CYCLE[elementData.year.key]]
      ]
    };
  }
};

// ============================================================================
// HERMETIC PLANETARY FRAMEWORK
// ============================================================================
export const HermeticFramework = {
  id: 'hermetic',
  name: 'Hermetic Planetary',
  description: 'Seven classical planets with alchemical and astrological correspondences.',

  scriptMapping: null,
  symbols: Object.entries(PLANETARY_FREQUENCIES).map(([planet, data]) => ({
    char: getPlanetaryGlyph(planet),
    desc: planet,
    meaning: data.meaning
  })),

  convertText(text) {
    return text;
  },

  getSymbol(seed, elementData) {
    const planets = Object.keys(PLANETARY_FREQUENCIES);
    const planet = planets[seed % planets.length];
    const data = PLANETARY_FREQUENCIES[planet];

    return {
      char: getPlanetaryGlyph(planet),
      desc: planet,
      meaning: data.meaning
    };
  },

  getColorPalette(date, seed, rand) {
    // Planetary colors
    const planetColors = {
      SUN:     ['#FFD700', '#FFA500', '#FF8C00', '#FFE4B5', '#FFFACD'],
      MOON:    ['#C0C0C0', '#E8E8E8', '#F5F5F5', '#DCDCDC', '#FFFFFF'],
      MERCURY: ['#9370DB', '#8A2BE2', '#9400D3', '#BA55D3', '#DDA0DD'],
      VENUS:   ['#98FB98', '#90EE90', '#00FA9A', '#7CFC00', '#ADFF2F'],
      MARS:    ['#DC143C', '#FF0000', '#B22222', '#CD5C5C', '#F08080'],
      JUPITER: ['#4169E1', '#0000CD', '#00008B', '#6495ED', '#87CEEB'],
      SATURN:  ['#2F4F4F', '#696969', '#708090', '#778899', '#A9A9A9']
    };

    const planets = Object.keys(PLANETARY_FREQUENCIES);
    const planet = planets[seed % planets.length];
    const colors = planetColors[planet] || planetColors.SUN;

    return [
      colors[0],
      colors[1],
      '#C8AA6E', // Alchemical gold accent
      colors[2],
      colors[3]
    ];
  },

  getAudioProfile(seed, date, elementData, rand) {
    const planets = Object.keys(PLANETARY_FREQUENCIES);
    const planet = planets[seed % planets.length];

    return getPlanetaryAudio(planet, seed);
  },

  getGuidingPhrase(seed, elementData) {
    const phrases = [
      'As above, so below; as within, so without.',
      'Bind the wandering light to your centre.',
      'The seven metals transmute in the athanor of the soul.',
      'What is scattered, gather. What is gathered, scatter.',
      'The philosopher\'s stone is hidden in plain sight.',
      'Solve et coagula — dissolve and coagulate.'
    ];
    return phrases[seed % phrases.length];
  },

  getGeometryProfile(seed, elementData) {
    const planets = Object.keys(PLANETARY_FREQUENCIES);
    const planet = planets[seed % planets.length];
    const shape = PLANETARY_SHAPES[planet];

    return {
      archetype: MANDALA_ARCHETYPES[1], // Sri Yantra style
      polyhedronTypes: shape.sides === 3 ? [3] : shape.sides === 4 ? [2] : [0, 4],
      preferredRingStyles: [0, 1, 2],
      complexity: 0.7 + (seed % 100) / 300,
      planetaryGlyph: getPlanetaryGlyph(planet),
      planetSides: shape.sides
    };
  }
};

// ============================================================================
// JUNGIAN ARCHETYPE FRAMEWORK
// ============================================================================
export const JungianFramework = {
  id: 'jungian',
  name: 'Jungian Archetype',
  description: 'Psychological archetypes with emotional color axes and symbolic geometry.',

  scriptMapping: null,
  symbols: Object.entries(ARCHETYPE_SYMBOLS).map(([arch, data]) => ({
    char: getArchetypeGlyph(arch),
    desc: arch,
    meaning: data.meaning
  })),

  convertText(text) {
    return text;
  },

  getSymbol(seed, elementData) {
    const archetypes = Object.keys(ARCHETYPE_SYMBOLS);
    const archetype = archetypes[seed % archetypes.length];
    const data = ARCHETYPE_SYMBOLS[archetype];

    return {
      char: getArchetypeGlyph(archetype),
      desc: archetype.replace(/_/g, ' '),
      meaning: data.meaning
    };
  },

  getColorPalette(date, seed, rand) {
    // Emotional color axes
    const emotionalColors = {
      warmth:    ['#FF6347', '#FF7F50', '#FFA07A', '#FFB6C1', '#FFE4E1'],
      coolness:  ['#4682B4', '#5F9EA0', '#87CEEB', '#B0C4DE', '#E0FFFF'],
      depth:     ['#2F4F4F', '#556B2F', '#6B8E23', '#8FBC8F', '#90EE90'],
      intensity: ['#8B0000', '#A52A2A', '#CD853F', '#DAA520', '#FFD700'],
      shadow:    ['#1A1A2E', '#16213E', '#0F3460', '#533483', '#7B2CBF']
    };

    // Select axis based on seed
    const axes = Object.keys(emotionalColors);
    const axis = axes[seed % axes.length];
    const colors = emotionalColors[axis];

    return [
      colors[0],
      colors[1],
      '#C0C0C0', // Silver (lunar, reflective)
      colors[2],
      colors[3]
    ];
  },

  getAudioProfile(seed, date, elementData, rand) {
    const archetypes = ['SELF', 'SHADOW', 'ANIMA', 'ANIMUS', 'PERSONA'];
    const archetype = archetypes[seed % archetypes.length];

    return getArchetypeAudio(archetype, seed, rand);
  },

  getGuidingPhrase(seed, elementData) {
    const phrases = [
      'Attend to what moves in the periphery.',
      'The shadow contains gold.',
      'What you resist, persists.',
      'The Self is both center and circumference.',
      'Integration requires confrontation.',
      'Dreams are the royal road to the unconscious.'
    ];
    return phrases[seed % phrases.length];
  },

  getGeometryProfile(seed, elementData) {
    const archetypes = Object.keys(ARCHETYPE_SYMBOLS);
    const archetype = archetypes[seed % archetypes.length];

    // Geometry based on archetype
    const archetypeGeometry = {
      SELF:    { archetype: 0, shapes: [7, 8] },    // Lotus, Metatron, Seed
      SHADOW:  { archetype: 3, shapes: [6] },       // Spiral, Merkaba
      ANIMA:   { archetype: 0, shapes: [8, 9] },    // Lotus, Seed, Flower
      ANIMUS:  { archetype: 1, shapes: [3, 6] },    // Sri Yantra, tetrahedra
      PERSONA: { archetype: 2, shapes: [2, 4] },    // Grid, cube
      WISE_OLD_MAN: { archetype: 1, shapes: [5] },  // Dodecahedron
      GREAT_MOTHER: { archetype: 0, shapes: [9] }   // Flower of Life
    };

    const geo = archetypeGeometry[archetype] || archetypeGeometry.SELF;

    return {
      archetype: MANDALA_ARCHETYPES[geo.archetype],
      polyhedronTypes: geo.shapes,
      preferredRingStyles: [0, 1, 3],
      complexity: 0.5 + (seed % 100) / 200
    };
  }
};

// ============================================================================
// SECULAR MINIMALIST FRAMEWORK
// ============================================================================
export const MinimalistFramework = {
  id: 'minimalist',
  name: 'Secular Minimalist',
  description: 'Pure geometry without symbolic overlay. Meditative color fields.',

  scriptMapping: null,
  symbols: [
    { char: '○', desc: 'Circle', meaning: 'Unity, completeness, infinite return.' },
    { char: '□', desc: 'Square', meaning: 'Order, stability, four directions.' },
    { char: '△', desc: 'Triangle', meaning: 'Direction, change, dynamic balance.' },
    { char: '◇', desc: 'Diamond', meaning: 'Clarity, focus, intersection of axes.' },
    { char: '☆', desc: 'Star', meaning: 'Aspiration, radiance, emergence.' }
  ],

  convertText(text) {
    return text;
  },

  getSymbol(seed, elementData) {
    const symbols = this.symbols;
    return symbols[seed % symbols.length];
  },

  getColorPalette(date, seed, rand) {
    // Very pale, meditative color fields
    const palettes = [
      ['#F5F5F5', '#E8E8E8', '#DCDCDC', '#D3D3D3', '#C0C0C0'], // Grey
      ['#FFF8F0', '#FAF0E6', '#FAEBD7', '#FFE4C4', '#FFDEAD'], // Warm white
      ['#F0F8FF', '#E6F0F5', '#E0E8F0', '#D6E0E8', '#CCd8E0'], // Cool white
      ['#F5F5DC', '#F0EAD6', '#EAE0C8', '#E6D8B8', '#DED0A8'], // Ivory
      ['#F0FFF0', '#E8F5E8', '#E0F0E0', '#D8EBD8', '#D0E6D0']  // Pale green
    ];

    return palettes[seed % palettes.length];
  },

  getAudioProfile(seed, date, elementData, rand) {
    // Simple, pure tones
    const baseAudio = computeAudioFromElements(seed, date, elementData, rand);

    return {
      ...baseAudio,
      waveform: 'sine',
      beat: BEAT_PRESETS.CENTERING.beat,
      explanation: 'Pure sine wave for focused attention.'
    };
  },

  getGuidingPhrase(seed, elementData) {
    const phrases = [
      'Notice the shape of attention.',
      'Form follows function.',
      'Less is more.',
      'In stillness, clarity.',
      'The space between defines the form.'
    ];
    return phrases[seed % phrases.length];
  },

  getGeometryProfile(seed, elementData) {
    return {
      archetype: MANDALA_ARCHETYPES[seed % MANDALA_ARCHETYPES.length],
      polyhedronTypes: [],  // No polyhedrons in minimalist mode
      preferredRingStyles: [0, 2, 4], // Circles, double circles, dashes
      complexity: 0.3 + (seed % 100) / 400, // Lower complexity
      hideSymbols: true
    };
  }
};

// ============================================================================
// FRAMEWORK REGISTRY
// ============================================================================
export const frameworks = {
  tibetan: TibetanFramework,
  wuxing: WuxingFramework,
  hermetic: HermeticFramework,
  jungian: JungianFramework,
  minimalist: MinimalistFramework
};

export const frameworkList = [
  { id: 'tibetan',    name: 'Tibetan Mandala' },
  { id: 'wuxing',     name: 'Chinese Wuxing (五行)' },
  { id: 'hermetic',   name: 'Hermetic Planetary' },
  { id: 'jungian',    name: 'Jungian Archetype' },
  { id: 'minimalist', name: 'Secular Minimalist' }
];

/**
 * Get framework by ID
 * @param {string} id - Framework ID
 * @returns {object} - Framework object
 */
export function getFramework(id) {
  return frameworks[id] || frameworks.wuxing;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get planetary glyph
 * @param {string} planet - Planet name
 * @returns {string} - Unicode glyph
 */
function getPlanetaryGlyph(planet) {
  const glyphs = {
    SUN: '☉',
    MOON: '☽',
    MERCURY: '☿',
    VENUS: '♀',
    MARS: '♂',
    JUPITER: '♃',
    SATURN: '♄'
  };
  return glyphs[planet] || '✧';
}

/**
 * Get archetype glyph
 * @param {string} archetype - Archetype name
 * @returns {string} - Unicode glyph
 */
function getArchetypeGlyph(archetype) {
  const glyphs = {
    SELF: '◉',
    SHADOW: '◐',
    ANIMA: '☽',
    ANIMUS: '☉',
    PERSONA: '☯',
    WISE_OLD_MAN: '☥',
    GREAT_MOTHER: '♀'
  };
  return glyphs[archetype] || '○';
}
