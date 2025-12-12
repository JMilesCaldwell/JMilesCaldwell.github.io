/**
 * Tibetan Symbol System Module
 *
 * Contains Tibetan script mappings, sacred syllables, and symbol definitions.
 * Uses proper Wylie transliteration priority ordering for digraph handling.
 */

// Tibetan character mappings with priority-ordered digraphs
// Digraphs are checked first to avoid conflicts (e.g., "sh" before "s")
export const TIBETAN_DIGRAPHS = {
  // Aspirated consonants (must check before unaspirated)
  'kh': 'ཁ',
  'gh': 'གྷ',
  'ch': 'ཆ',
  'jh': 'ཇྷ',
  'th': 'ཐ',  // Note: Tibetan 'th' is aspirated 't', not English 'th'
  'dh': 'དྷ',
  'ph': 'ཕ',
  'bh': 'བྷ',
  'sh': 'ཤ',
  'zh': 'ཞ',
  'ng': 'ང',
  'ny': 'ཉ',
  'ts': 'ཙ',
  'dz': 'ཛ',
  'tsh': 'ཚ',  // Triple - check first
  'dzh': 'ཛྷ',
  // Retroflex (Sanskrit borrowings)
  'Th': 'ཊ',
  'Dh': 'ཌ',
};

// Single character mappings
export const TIBETAN_SINGLES = {
  'a': 'ཨ',
  'b': 'བ',
  'c': 'ཅ',
  'd': 'ད',
  'e': 'ེ',
  'f': 'ཕ',  // No native 'f', use 'ph'
  'g': 'ག',
  'h': 'ཧ',
  'i': 'ི',
  'j': 'ཇ',
  'k': 'ཀ',
  'l': 'ལ',
  'm': 'མ',
  'n': 'ན',
  'o': 'ོ',
  'p': 'པ',
  'q': 'ཀྭ', // No native 'q', approximate
  'r': 'ར',
  's': 'ས',
  't': 'ཏ',
  'u': 'ུ',
  'v': 'ཝ',
  'w': 'ཝ',
  'x': 'ཀྵ', // Sanskrit ksha
  'y': 'ཡ',
  'z': 'ཟ',
  ' ': '་',  // Tibetan tsheg (syllable separator)
};

// Combined mapping for export (digraphs take priority)
export const TIBETAN_MAPPING = {
  ...TIBETAN_SINGLES,
  ...TIBETAN_DIGRAPHS,
  font: "'Noto Sans Tibetan', 'Microsoft Himalaya', 'Tibetan Machine Uni', sans-serif"
};

// Sorted digraphs by length (longest first) for proper matching
export const TIBETAN_DIGRAPH_KEYS = Object.keys(TIBETAN_DIGRAPHS)
  .sort((a, b) => b.length - a.length);

// Five Dhyani Buddhas with corresponding elements, colors, and seed syllables
export const DHYANI_BUDDHAS = {
  VAIROCANA: {
    name: 'Vairocana',
    tibetan: 'རྣམ་པར་སྣང་མཛད',
    seedSyllable: 'ཨོཾ',  // OM
    wylie: 'oM',
    element: 'SPACE',     // Ākāśa - space/ether
    wuxingMapping: 'METAL', // Closest Wuxing correspondence
    color: '#FFFFFF',     // White
    direction: 'CENTER',
    aggregate: 'Form',
    wisdom: 'All-encompassing wisdom',
    poison: 'Ignorance'
  },
  AKSHOBHYA: {
    name: 'Akshobhya',
    tibetan: 'མི་བསྐྱོད་པ',
    seedSyllable: 'ཧཱུྃ',  // HUM
    wylie: 'hUM',
    element: 'WATER',
    wuxingMapping: 'WATER',
    color: '#0066CC',     // Blue
    direction: 'EAST',
    aggregate: 'Consciousness',
    wisdom: 'Mirror-like wisdom',
    poison: 'Anger'
  },
  RATNASAMBHAVA: {
    name: 'Ratnasambhava',
    tibetan: 'རིན་ཆེན་འབྱུང་གནས',
    seedSyllable: 'ཏྲཱྃ',  // TRAM
    wylie: 'trAM',
    element: 'EARTH',
    wuxingMapping: 'EARTH',
    color: '#FFD700',     // Yellow/Gold
    direction: 'SOUTH',
    aggregate: 'Feeling',
    wisdom: 'Wisdom of equanimity',
    poison: 'Pride'
  },
  AMITABHA: {
    name: 'Amitabha',
    tibetan: 'འོད་དཔག་མེད',
    seedSyllable: 'ཧྲཱིཿ', // HRIH
    wylie: 'hrIH',
    element: 'FIRE',
    wuxingMapping: 'FIRE',
    color: '#CC0000',     // Red
    direction: 'WEST',
    aggregate: 'Perception',
    wisdom: 'Discriminating wisdom',
    poison: 'Desire'
  },
  AMOGHASIDDHI: {
    name: 'Amoghasiddhi',
    tibetan: 'དོན་ཡོད་གྲུབ་པ',
    seedSyllable: 'ཨཱཿ',   // AH
    wylie: 'AH',
    element: 'AIR',       // Vāyu - wind/air
    wuxingMapping: 'WOOD',
    color: '#00AA00',     // Green
    direction: 'NORTH',
    aggregate: 'Mental formations',
    wisdom: 'All-accomplishing wisdom',
    poison: 'Envy'
  }
};

// Sacred seed syllables (bija mantras)
export const SEED_SYLLABLES = {
  OM:   { char: 'ཨོཾ',  wylie: 'oM',   meaning: 'Universal consciousness, body of all Buddhas' },
  AH:   { char: 'ཨཱཿ',  wylie: 'AH',   meaning: 'Pure speech, communication of truth' },
  HUM:  { char: 'ཧཱུྃ',  wylie: 'hUM',  meaning: 'Indestructible mind, diamond awareness' },
  HRIH: { char: 'ཧྲཱིཿ', wylie: 'hrIH', meaning: 'Compassion, heart essence of Amitabha' },
  TRAM: { char: 'ཏྲཱྃ',  wylie: 'trAM', meaning: 'Generosity, jewel-producing quality' },
  DHIH: { char: 'དྷཱིཿ', wylie: 'dhIH', meaning: 'Wisdom, essence of Manjushri' },
  BAM:  { char: 'བཾ',   wylie: 'baM',  meaning: 'Water element, purification' },
  LAM:  { char: 'ལཾ',   wylie: 'laM',  meaning: 'Earth element, stability' },
  RAM:  { char: 'རཾ',   wylie: 'raM',  meaning: 'Fire element, transformation' },
  YAM:  { char: 'ཡཾ',   wylie: 'yaM',  meaning: 'Air element, movement' },
  KHAM: { char: 'ཁཾ',   wylie: 'khaM', meaning: 'Space element, openness' },
};

// Tibetan script symbol definitions for mandala display
export const TIBETAN_SYMBOLS = [
  { char: 'ཨ', desc: 'A (Primordial)', meaning: 'The source of all sound. Beginning of manifestation and pure awareness.' },
  { char: 'ཨོཾ', desc: 'Om (Sacred)', meaning: 'Universal consciousness. The sound of creation and divine presence.' },
  { char: 'པདྨ', desc: 'Padma (Lotus)', meaning: 'Purity rising from mud. Spiritual awakening and enlightenment.' },
  { char: 'མ', desc: 'Ma (Mother)', meaning: 'Compassion and nurturing. The feminine principle of wisdom.' },
  { char: 'ཧཱུྃ', desc: 'Hum (Wisdom)', meaning: 'Indestructible reality. Diamond mind and transformative power.' },
  { char: 'སྭཱ', desc: 'Soha (Offering)', meaning: 'Dedication and completion. Sealing of intention and practice.' },
  { char: 'བཛྲ', desc: 'Vajra (Diamond)', meaning: 'Indestructible truth. Clarity cutting through illusion.' },
  { char: 'དྷརྨ', desc: 'Dharma (Truth)', meaning: 'Universal law. The path of righteousness and cosmic order.' },
  { char: 'སངྒ', desc: 'Sangha (Community)', meaning: 'Sacred fellowship. Unity in spiritual practice and purpose.' },
  { char: 'བོདྷི', desc: 'Bodhi (Awakening)', meaning: 'Perfect enlightenment. Realization of ultimate truth.' },
  { char: 'ཤཱནྟི', desc: 'Shanti (Peace)', meaning: 'Supreme tranquility. Cessation of suffering and inner calm.' }
];

// Color families mapped to Five Dhyani Buddhas
export const TIBETAN_COLOR_FAMILIES = {
  VAIROCANA: ['#FFFFFF', '#F5F5F5', '#E8E8E8', '#D4D4D4', '#C0C0C0'],
  AKSHOBHYA: ['#0066CC', '#3380D6', '#5C99E0', '#85B3EA', '#ADCCF4'],
  RATNASAMBHAVA: ['#FFD700', '#FFE033', '#FFE866', '#FFF099', '#FFF8CC'],
  AMITABHA: ['#CC0000', '#D93333', '#E66666', '#F29999', '#FFCCCC'],
  AMOGHASIDDHI: ['#00AA00', '#33BB33', '#66CC66', '#99DD99', '#CCEECC']
};

/**
 * Convert text to Tibetan script with proper digraph handling
 * @param {string} text - Input text to convert
 * @returns {string} - Tibetan script output
 */
export function convertToTibetan(text) {
  if (!text) return '';

  let lower = text.toLowerCase();
  let result = '';
  let i = 0;

  while (i < lower.length) {
    let matched = false;

    // Check digraphs in order of length (longest first)
    for (const digraph of TIBETAN_DIGRAPH_KEYS) {
      if (lower.slice(i, i + digraph.length) === digraph) {
        result += TIBETAN_DIGRAPHS[digraph];
        i += digraph.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Check single character
      const char = lower[i];
      result += TIBETAN_SINGLES[char] || '';
      i++;
    }
  }

  return result;
}

/**
 * Get the Dhyani Buddha corresponding to a Wuxing element
 * @param {string} wuxingElement - METAL, WATER, WOOD, FIRE, or EARTH
 * @returns {object} - Dhyani Buddha data
 */
export function getDhyaniBuddhaForElement(wuxingElement) {
  for (const [key, buddha] of Object.entries(DHYANI_BUDDHAS)) {
    if (buddha.wuxingMapping === wuxingElement) {
      return buddha;
    }
  }
  return DHYANI_BUDDHAS.VAIROCANA; // Default to center
}

/**
 * Get seed syllable for element
 * @param {string} wuxingElement - Element key
 * @returns {object} - Seed syllable data
 */
export function getSeedSyllableForElement(wuxingElement) {
  const buddha = getDhyaniBuddhaForElement(wuxingElement);
  const syllableKey = buddha.seedSyllable === 'ཨོཾ' ? 'OM' :
                      buddha.seedSyllable === 'ཧཱུྃ' ? 'HUM' :
                      buddha.seedSyllable === 'ཏྲཱྃ' ? 'TRAM' :
                      buddha.seedSyllable === 'ཧྲཱིཿ' ? 'HRIH' : 'AH';
  return SEED_SYLLABLES[syllableKey];
}

/**
 * Get color palette for Tibetan mode based on primary element
 * @param {string} wuxingElement - Primary element
 * @returns {string[]} - Array of 5 colors
 */
export function getTibetanPalette(wuxingElement) {
  const buddha = getDhyaniBuddhaForElement(wuxingElement);
  for (const [key, colors] of Object.entries(TIBETAN_COLOR_FAMILIES)) {
    if (key === Object.keys(DHYANI_BUDDHAS).find(k => DHYANI_BUDDHAS[k] === buddha)) {
      return colors;
    }
  }
  return TIBETAN_COLOR_FAMILIES.VAIROCANA;
}
