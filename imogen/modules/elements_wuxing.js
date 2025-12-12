/**
 * Chinese Wuxing (五行) Five Elements Module
 *
 * Contains the Five Elements system with proper correspondences,
 * generative (Sheng) and destructive (Ke) cycle logic.
 */

// True Wuxing color correspondences
// Fire → Red, Wood → Green/Blue-Green, Metal → White, Water → Black/Blue, Earth → Yellow
export const ELEMENTS = {
  METAL: {
    key: 'METAL',
    name: '金 (Jīn)',
    englishName: 'Metal',
    meaning: 'Contraction, inward movement, rigidity, persistence, determination.',
    colors: ['#FFFFFF', '#E8E8E8', '#D0D0D0', '#B8B8B8', '#A0A0A0'], // White family
    planet: 'Venus',
    season: 'Autumn',
    direction: 'West',
    organ: 'Lungs',
    emotion: 'Grief',
    taste: 'Pungent',
    sound: 'Weeping'
  },
  WATER: {
    key: 'WATER',
    name: '水 (Shuǐ)',
    englishName: 'Water',
    meaning: 'Downward movement, stillness, conservation, fear, adaptability.',
    colors: ['#000033', '#1A1A4D', '#333366', '#4D4D80', '#666699'], // Black/Blue family
    planet: 'Mercury',
    season: 'Winter',
    direction: 'North',
    organ: 'Kidneys',
    emotion: 'Fear',
    taste: 'Salty',
    sound: 'Groaning'
  },
  WOOD: {
    key: 'WOOD',
    name: '木 (Mù)',
    englishName: 'Wood',
    meaning: 'Expansion, upward growth, flexibility, kindness, creativity.',
    colors: ['#006400', '#228B22', '#32CD32', '#90EE90', '#98FB98'], // Green family
    planet: 'Jupiter',
    season: 'Spring',
    direction: 'East',
    organ: 'Liver',
    emotion: 'Anger',
    taste: 'Sour',
    sound: 'Shouting'
  },
  FIRE: {
    key: 'FIRE',
    name: '火 (Huǒ)',
    englishName: 'Fire',
    meaning: 'Upward expansion, light, heat, joy, expressiveness.',
    colors: ['#CC0000', '#FF0000', '#FF3333', '#FF6666', '#FF9999'], // Red family
    planet: 'Mars',
    season: 'Summer',
    direction: 'South',
    organ: 'Heart',
    emotion: 'Joy',
    taste: 'Bitter',
    sound: 'Laughing'
  },
  EARTH: {
    key: 'EARTH',
    name: '土 (Tǔ)',
    englishName: 'Earth',
    meaning: 'Balance, neutrality, stability, pensiveness, grounding.',
    colors: ['#B8860B', '#DAA520', '#FFD700', '#F0E68C', '#FFFACD'], // Yellow family
    planet: 'Saturn',
    season: 'Late Summer', // Transition between seasons
    direction: 'Center',
    organ: 'Spleen',
    emotion: 'Worry',
    taste: 'Sweet',
    sound: 'Singing'
  }
};

// Month to element mapping (following traditional Chinese calendar approximation)
// Spring (Feb-Apr): Wood, Summer (May-Jul): Fire, Late Summer (Aug): Earth,
// Autumn (Sep-Nov): Metal, Winter (Dec-Jan): Water
export const MONTH_ELEMENTS = [
  ELEMENTS.WATER,  // January (Dec-Feb: Winter)
  ELEMENTS.WATER,  // February
  ELEMENTS.WOOD,   // March (Feb-Apr: Spring)
  ELEMENTS.WOOD,   // April
  ELEMENTS.FIRE,   // May (May-Jul: Summer)
  ELEMENTS.FIRE,   // June
  ELEMENTS.EARTH,  // July (transitional, late summer)
  ELEMENTS.EARTH,  // August
  ELEMENTS.METAL,  // September (Sep-Nov: Autumn)
  ELEMENTS.METAL,  // October
  ELEMENTS.WATER,  // November (beginning of winter)
  ELEMENTS.WATER   // December
];

// Generative Cycle (相生 Xiāngshēng) - creation/nourishing
// Wood feeds Fire → Fire creates Earth (ash) → Earth bears Metal →
// Metal collects Water → Water nourishes Wood
export const SHENG_CYCLE = {
  WOOD: 'FIRE',
  FIRE: 'EARTH',
  EARTH: 'METAL',
  METAL: 'WATER',
  WATER: 'WOOD'
};

// Destructive/Controlling Cycle (相剋 Xiāngkè) - control/restraint
// Wood parts Earth → Earth absorbs Water → Water quenches Fire →
// Fire melts Metal → Metal chops Wood
export const KE_CYCLE = {
  WOOD: 'EARTH',
  EARTH: 'WATER',
  WATER: 'FIRE',
  FIRE: 'METAL',
  METAL: 'WOOD'
};

// Weakening Cycle (inverse of Sheng)
export const WEAKENING_CYCLE = {
  FIRE: 'WOOD',
  EARTH: 'FIRE',
  METAL: 'EARTH',
  WATER: 'METAL',
  WOOD: 'WATER'
};

// Year element calculation based on Heavenly Stems (天干)
// Uses the last digit of the year
const YEAR_ELEMENT_MAP = {
  0: 'METAL', 1: 'METAL',   // 庚 Geng, 辛 Xin
  2: 'WATER', 3: 'WATER',   // 壬 Ren, 癸 Gui
  4: 'WOOD',  5: 'WOOD',    // 甲 Jia, 乙 Yi
  6: 'FIRE',  7: 'FIRE',    // 丙 Bing, 丁 Ding
  8: 'EARTH', 9: 'EARTH'    // 戊 Wu, 己 Ji
};

// Day element based on 60-day cycle (simplified to date of month % 5)
const DAY_ELEMENT_ORDER = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];

/**
 * Get element from year using Heavenly Stems
 * @param {number} year - Full year (e.g., 2024)
 * @returns {object} - Element object
 */
export function getYearElement(year) {
  const digit = year % 10;
  return ELEMENTS[YEAR_ELEMENT_MAP[digit]];
}

/**
 * Get element from month
 * @param {number} month - Month index (0-11)
 * @returns {object} - Element object
 */
export function getMonthElement(month) {
  return MONTH_ELEMENTS[month];
}

/**
 * Get element from day of month
 * Using simplified 5-day cycle based on date of month
 * @param {number} dayOfMonth - Day of month (1-31)
 * @returns {object} - Element object
 */
export function getDayElement(dayOfMonth) {
  const index = (dayOfMonth - 1) % 5;
  return ELEMENTS[DAY_ELEMENT_ORDER[index]];
}

/**
 * Get all three elements from a date
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {object} - { year, month, day } element objects
 */
export function getElementsFromDate(dateInput) {
  const date = typeof dateInput === 'string'
    ? new Date(dateInput + 'T12:00:00')
    : dateInput || new Date();

  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate(); // Fixed: use getDate() not getDay()

  return {
    year: getYearElement(year),
    month: getMonthElement(month),
    day: getDayElement(dayOfMonth)
  };
}

/**
 * Get the element that generates (nourishes) the given element
 * @param {string} elementKey - Element key
 * @returns {object} - Parent element
 */
export function getGeneratingElement(elementKey) {
  for (const [parent, child] of Object.entries(SHENG_CYCLE)) {
    if (child === elementKey) {
      return ELEMENTS[parent];
    }
  }
  return null;
}

/**
 * Get the element that is generated (nourished) by the given element
 * @param {string} elementKey - Element key
 * @returns {object} - Child element
 */
export function getGeneratedElement(elementKey) {
  return ELEMENTS[SHENG_CYCLE[elementKey]];
}

/**
 * Get the element that controls/overcomes the given element
 * @param {string} elementKey - Element key
 * @returns {object} - Controller element
 */
export function getControllingElement(elementKey) {
  for (const [controller, controlled] of Object.entries(KE_CYCLE)) {
    if (controlled === elementKey) {
      return ELEMENTS[controller];
    }
  }
  return null;
}

/**
 * Get the element that is controlled by the given element
 * @param {string} elementKey - Element key
 * @returns {object} - Controlled element
 */
export function getControlledElement(elementKey) {
  return ELEMENTS[KE_CYCLE[elementKey]];
}

/**
 * Calculate element balance/interaction between multiple elements
 * @param {object} elements - { year, month, day } element objects
 * @returns {object} - Analysis of element relationships
 */
export function analyzeElementRelationships(elements) {
  const keys = [elements.year.key, elements.month.key, elements.day.key];
  const unique = [...new Set(keys)];

  const analysis = {
    dominant: null,
    harmony: 0,
    tension: 0,
    relationships: []
  };

  // Count occurrences
  const counts = {};
  keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  analysis.dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

  // Analyze relationships
  for (let i = 0; i < unique.length; i++) {
    for (let j = i + 1; j < unique.length; j++) {
      const a = unique[i];
      const b = unique[j];

      if (SHENG_CYCLE[a] === b || SHENG_CYCLE[b] === a) {
        analysis.harmony++;
        analysis.relationships.push({
          type: 'generates',
          from: SHENG_CYCLE[a] === b ? a : b,
          to: SHENG_CYCLE[a] === b ? b : a
        });
      }
      if (KE_CYCLE[a] === b || KE_CYCLE[b] === a) {
        analysis.tension++;
        analysis.relationships.push({
          type: 'controls',
          from: KE_CYCLE[a] === b ? a : b,
          to: KE_CYCLE[a] === b ? b : a
        });
      }
    }
  }

  return analysis;
}

/**
 * Get blended color palette from element combination
 * @param {object} elements - { year, month, day } element objects
 * @param {function} rand - Seeded random function
 * @returns {string[]} - Array of 5 blended colors
 */
export function getBlendedPalette(elements, rand) {
  const yearColors = [...elements.year.colors];
  const monthColors = [...elements.month.colors];
  const dayColors = [...elements.day.colors];

  // Pool and shuffle
  const pool = [...yearColors, ...monthColors, ...dayColors];
  pool.sort(() => rand() - 0.5);

  return [
    pool[0] || yearColors[0],
    pool[1] || monthColors[0],
    '#C8AA6E', // Accent color (brass)
    pool[3] || yearColors[1],
    pool[4] || monthColors[1]
  ];
}

/**
 * Get guiding phrase for Wuxing framework
 * @param {object} elements - Element data
 * @param {number} seed - Numeric seed for variety
 * @returns {string} - Guiding phrase
 */
export function getWuxingPhrase(elements, seed) {
  const phrases = {
    WOOD: [
      'Let growth arise naturally, as branches reach for light.',
      'Wood nourishes Fire; let movement create breath.',
      'Flexibility overcomes rigidity.'
    ],
    FIRE: [
      'Transform through illumination.',
      'The flame reveals what darkness conceals.',
      'Joy expands outward like light.'
    ],
    EARTH: [
      'Return to center. Stability grounds intention.',
      'Earth receives all and transforms all.',
      'Balance is the axis of change.'
    ],
    METAL: [
      'Refine through contraction. Let go of excess.',
      'Metal cuts through illusion to essence.',
      'Persistence shapes the formless.'
    ],
    WATER: [
      'Flow around obstacles. Stillness contains depth.',
      'Water seeks its level without effort.',
      'In darkness, potential accumulates.'
    ]
  };

  const dominant = elements.year.key;
  const options = phrases[dominant] || phrases.EARTH;
  return options[seed % options.length];
}
