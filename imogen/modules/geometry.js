/**
 * Geometry Module
 *
 * Contains sacred geometry definitions, shape generators, and
 * geometric utility functions for mandala rendering.
 */

// Platonic solid vertex/edge definitions
export const PLATONIC_SOLIDS = {
  TETRAHEDRON: {
    name: 'Tetrahedron',
    faces: 4,
    vertices: (() => {
      const h = 1 / Math.sqrt(3);
      return [
        [0, 0, 1.5],
        [1, 0, -h],
        [-0.5, Math.sqrt(3)/2, -h],
        [-0.5, -Math.sqrt(3)/2, -h]
      ];
    })(),
    edges: [[0,1],[0,2],[0,3],[1,2],[2,3],[3,1]],
    element: 'FIRE',
    meaning: 'Transformation, aspiration, the upward flame'
  },

  CUBE: {
    name: 'Hexahedron (Cube)',
    faces: 6,
    vertices: [
      [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
      [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
    ],
    edges: [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ],
    element: 'EARTH',
    meaning: 'Stability, foundation, the material world'
  },

  OCTAHEDRON: {
    name: 'Octahedron',
    faces: 8,
    vertices: [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ],
    edges: [
      [0,2],[0,3],[0,4],[0,5],
      [1,2],[1,3],[1,4],[1,5],
      [2,4],[2,5],[3,4],[3,5]
    ],
    element: 'AIR',
    meaning: 'Balance, intellect, mediation between realms'
  },

  DODECAHEDRON: {
    name: 'Dodecahedron',
    faces: 12,
    vertices: (() => {
      const phi = (1 + Math.sqrt(5)) / 2;
      const invPhi = 1 / phi;
      return [
        [1,1,1], [1,1,-1], [1,-1,1], [1,-1,-1],
        [-1,1,1], [-1,1,-1], [-1,-1,1], [-1,-1,-1],
        [0,phi,invPhi], [0,phi,-invPhi], [0,-phi,invPhi], [0,-phi,-invPhi],
        [invPhi,0,phi], [invPhi,0,-phi], [-invPhi,0,phi], [-invPhi,0,-phi],
        [phi,invPhi,0], [phi,-invPhi,0], [-phi,invPhi,0], [-phi,-invPhi,0]
      ];
    })(),
    edges: [
      [0,8],[0,12],[0,16],[1,9],[1,13],[1,16],[2,10],[2,12],[2,17],
      [3,11],[3,13],[3,17],[4,8],[4,14],[4,18],[5,9],[5,15],[5,18],
      [6,10],[6,14],[6,19],[7,11],[7,15],[7,19],[8,9],[10,11],[12,14],
      [13,15],[16,17],[18,19]
    ],
    element: 'ETHER',
    meaning: 'The cosmos, divine proportion, universal pattern'
  },

  ICOSAHEDRON: {
    name: 'Icosahedron',
    faces: 20,
    vertices: (() => {
      const phi = (1 + Math.sqrt(5)) / 2;
      const s = 1.0;
      return [
        [0, s, phi*s], [0, -s, phi*s], [0, s, -phi*s], [0, -s, -phi*s],
        [s, phi*s, 0], [-s, phi*s, 0], [s, -phi*s, 0], [-s, -phi*s, 0],
        [phi*s, 0, s], [-phi*s, 0, s], [phi*s, 0, -s], [-phi*s, 0, -s]
      ];
    })(),
    edges: [], // Generated dynamically based on distance
    element: 'WATER',
    meaning: 'Flow, emotion, the primordial waters'
  }
};

// Generate icosahedron edges based on vertex distances
(function generateIcosaEdges() {
  const verts = PLATONIC_SOLIDS.ICOSAHEDRON.vertices;
  const edges = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const p1 = verts[i], p2 = verts[j];
      const distSq = (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2 + (p1[2]-p2[2])**2;
      if (distSq < 4.1) edges.push([i, j]);
    }
  }
  PLATONIC_SOLIDS.ICOSAHEDRON.edges = edges;
})();

// Star Tetrahedron (Merkaba)
export const MERKABA = {
  name: 'Star Tetrahedron (Merkaba)',
  meaning: 'Light-spirit-body vehicle, ascension, interdimensional travel',
  vertices: (() => {
    const h = 1 / Math.sqrt(3);
    const tetra1 = [
      [0, 0, 1.2], [1, 0, -h], [-0.5, Math.sqrt(3)/2, -h], [-0.5, -Math.sqrt(3)/2, -h]
    ];
    const tetra2 = [
      [0, 0, -1.2], [-1, 0, h], [0.5, -Math.sqrt(3)/2, h], [0.5, Math.sqrt(3)/2, h]
    ];
    return [...tetra1, ...tetra2];
  })(),
  edges: [
    [0,1],[0,2],[0,3],[1,2],[2,3],[3,1],
    [4,5],[4,6],[4,7],[5,6],[6,7],[7,5]
  ]
};

// Hermetic planetary shapes
export const PLANETARY_SHAPES = {
  SUN:     { type: 'circle',   sides: 0,  meaning: 'Unity, wholeness, the divine center' },
  MOON:    { type: 'crescent', sides: 0,  meaning: 'Receptivity, reflection, cycles' },
  MERCURY: { type: 'polygon',  sides: 8,  meaning: 'Communication, duality, quicksilver' },
  VENUS:   { type: 'polygon',  sides: 5,  meaning: 'Harmony, beauty, the golden ratio' },
  MARS:    { type: 'polygon',  sides: 3,  meaning: 'Action, force, the ascending flame' },
  JUPITER: { type: 'polygon',  sides: 4,  meaning: 'Order, expansion, the four directions' },
  SATURN:  { type: 'polygon',  sides: 6,  meaning: 'Structure, limitation, crystallization' }
};

// Jungian archetype symbols
export const ARCHETYPE_SYMBOLS = {
  SELF:    { shape: 'circle',    meaning: 'Wholeness, integration of opposites' },
  SHADOW:  { shape: 'serpent',   meaning: 'Hidden aspects, repressed content' },
  ANIMA:   { shape: 'moon',      meaning: 'Feminine inner aspect (in men)' },
  ANIMUS:  { shape: 'sun',       meaning: 'Masculine inner aspect (in women)' },
  PERSONA: { shape: 'mask',      meaning: 'Social identity, outward presentation' },
  WISE_OLD_MAN: { shape: 'staff', meaning: 'Wisdom, guidance, spiritual authority' },
  GREAT_MOTHER: { shape: 'vessel', meaning: 'Nurturing, containing, transforming' }
};

// Mandala archetype patterns
export const MANDALA_ARCHETYPES = [
  {
    name: 'Lotus Petal Array',
    index: 0,
    meaning: 'Radially symmetric lotus pattern, representing emergence, purity, and unfolding consciousness.',
    drawFunction: 'drawLotusPetals'
  },
  {
    name: 'Triad Intersection Matrix',
    index: 1,
    meaning: 'Intersecting triangles (Sri Yantra style), symbolizing convergence of cosmic principles.',
    drawFunction: 'drawSriYantra'
  },
  {
    name: 'Crystalline Flow Net',
    index: 2,
    meaning: 'High-density vertex projection, representing interconnected data flow and structural complexity.',
    drawFunction: 'drawIcosahedronGrid'
  },
  {
    name: 'Spiral Recursion Field',
    index: 3,
    meaning: 'Logarithmic spiral (golden ratio), reflecting iterative growth and natural expansion.',
    drawFunction: 'drawFibonacciSpiral'
  }
];

// Sacred geometry shape types for polyhedron rendering
export const SACRED_GEOMETRY_TYPES = {
  ICOSAHEDRON: 0,
  STAR: 1,
  CUBE: 2,
  TETRAHEDRON: 3,
  OCTAHEDRON: 4,
  DODECAHEDRON: 5,
  MERKABA: 6,
  METATRONS_CUBE: 7,
  SEED_OF_LIFE: 8,
  FLOWER_OF_LIFE: 9
};

/**
 * Golden ratio constant
 */
export const PHI = (1 + Math.sqrt(5)) / 2;

/**
 * Calculate golden angle in radians
 */
export const GOLDEN_ANGLE = Math.PI * 2 / (PHI * PHI);

/**
 * Generate polygon vertices
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} radius - Radius
 * @param {number} sides - Number of sides
 * @param {number} rotation - Initial rotation in radians
 * @returns {Array} - Array of [x, y] vertices
 */
export function generatePolygonVertices(cx, cy, radius, sides, rotation = 0) {
  const vertices = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + rotation;
    vertices.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius
    ]);
  }
  return vertices;
}

/**
 * Generate star vertices
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} outerRadius - Outer radius
 * @param {number} innerRatio - Inner radius as ratio of outer
 * @param {number} points - Number of points
 * @param {number} rotation - Initial rotation
 * @returns {Array} - Array of [x, y] vertices
 */
export function generateStarVertices(cx, cy, outerRadius, innerRatio, points, rotation = 0) {
  const vertices = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : outerRadius * innerRatio;
    const angle = (i / (points * 2)) * Math.PI * 2 + rotation;
    vertices.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius
    ]);
  }
  return vertices;
}

/**
 * Generate Fibonacci/golden spiral points
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} maxRadius - Maximum radius
 * @param {number} segments - Number of segments
 * @param {number} tightness - Spiral tightness (default 0.12)
 * @returns {Array} - Array of [x, y] points
 */
export function generateGoldenSpiral(cx, cy, maxRadius, segments, tightness = 0.12) {
  const points = [];
  let angle = 0;
  const a = 0.5; // Initial radius

  for (let i = 0; i < segments; i++) {
    const r = a * Math.exp(tightness * angle);
    if (r > maxRadius) break;

    points.push([
      cx + Math.cos(angle) * r,
      cy + Math.sin(angle) * r
    ]);

    angle += GOLDEN_ANGLE;
  }

  return points;
}

/**
 * Generate Seed of Life pattern (7 circles)
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} circleRadius - Radius of each circle
 * @returns {Array} - Array of { x, y, r } circles
 */
export function generateSeedOfLife(cx, cy, circleRadius) {
  const circles = [{ x: cx, y: cy, r: circleRadius }];

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    circles.push({
      x: cx + Math.cos(angle) * circleRadius,
      y: cy + Math.sin(angle) * circleRadius,
      r: circleRadius
    });
  }

  return circles;
}

/**
 * Generate Flower of Life pattern
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} circleRadius - Radius of each circle
 * @param {number} maxRadius - Maximum boundary radius
 * @returns {Array} - Array of { x, y, r } circles
 */
export function generateFlowerOfLife(cx, cy, circleRadius, maxRadius) {
  const circles = [];
  const drawn = new Set();

  const addCircle = (x, y) => {
    const key = `${Math.round(x*100)},${Math.round(y*100)}`;
    if (drawn.has(key)) return;
    if (Math.sqrt((x-cx)**2 + (y-cy)**2) > maxRadius) return;
    drawn.add(key);
    circles.push({ x, y, r: circleRadius });
  };

  // Center
  addCircle(cx, cy);

  // Rings
  for (let ring = 1; ring <= 3; ring++) {
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;

      // Points along the ring
      addCircle(
        cx + Math.cos(angle) * circleRadius * ring,
        cy + Math.sin(angle) * circleRadius * ring
      );

      // Intermediate points
      if (ring > 1) {
        const angle2 = angle + Math.PI / 6;
        addCircle(
          cx + Math.cos(angle2) * circleRadius * Math.sqrt(3) * (ring - 0.5),
          cy + Math.sin(angle2) * circleRadius * Math.sqrt(3) * (ring - 0.5)
        );
      }
    }
  }

  return circles;
}

/**
 * Generate Metatron's Cube (13 circles + connecting lines)
 * @param {number} cx - Center x
 * @param {number} cy - Center y
 * @param {number} radius - Overall radius
 * @returns {object} - { circles, lines }
 */
export function generateMetatronsCube(cx, cy, radius) {
  const innerRadius = radius * 0.3;
  const outerRadius = radius * 0.6;
  const circleSize = radius * 0.18;

  const circles = [{ x: cx, y: cy, r: circleSize }];
  const points = [{ x: cx, y: cy }];

  // Inner 6 circles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = cx + Math.cos(angle) * innerRadius;
    const y = cy + Math.sin(angle) * innerRadius;
    circles.push({ x, y, r: circleSize });
    points.push({ x, y });
  }

  // Outer 6 circles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = cx + Math.cos(angle) * outerRadius;
    const y = cy + Math.sin(angle) * outerRadius;
    circles.push({ x, y, r: circleSize });
    points.push({ x, y });
  }

  // Generate all connecting lines
  const lines = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      lines.push([points[i], points[j]]);
    }
  }

  return { circles, lines };
}

/**
 * Rotate 3D point around X axis
 * @param {Array} point - [x, y, z]
 * @param {number} angle - Rotation angle in radians
 * @returns {Array} - Rotated [x, y, z]
 */
export function rotateX(point, angle) {
  const [x, y, z] = point;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

/**
 * Rotate 3D point around Y axis
 * @param {Array} point - [x, y, z]
 * @param {number} angle - Rotation angle in radians
 * @returns {Array} - Rotated [x, y, z]
 */
export function rotateY(point, angle) {
  const [x, y, z] = point;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - z * sin, y, x * sin + z * cos];
}

/**
 * Rotate 3D point around Z axis
 * @param {Array} point - [x, y, z]
 * @param {number} angle - Rotation angle in radians
 * @returns {Array} - Rotated [x, y, z]
 */
export function rotateZ(point, angle) {
  const [x, y, z] = point;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - y * sin, x * sin + y * cos, z];
}

/**
 * Project 3D point to 2D (simple orthographic)
 * @param {Array} point - [x, y, z]
 * @param {number} scale - Scale factor
 * @returns {object} - { x, y, z }
 */
export function project3D(point, scale = 1) {
  return {
    x: point[0] * scale,
    y: point[1] * scale,
    z: point[2] * scale
  };
}
