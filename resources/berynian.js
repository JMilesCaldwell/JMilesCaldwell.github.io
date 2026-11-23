/* ==========================================================================
   The Berynian Calendar: the in-world date, the day's weather and whether
   the sea lanes are open. Shared by calendar.html and caldwell-repo.html,
   so both always agree.

   Everything here is DETERMINISTIC: it depends only on the real-world date,
   so every player, page and device sees the same answer all day. Never
   swap the seeded rolls for Math.random() (decided with Joe, 2026-11-23).

   The weather lists below are authored content; edit with care.
   ========================================================================== */
(function () {
  // Constants for the calendar
  const DAYS_PER_YEAR = 250;
  const DAYS_PER_MONTH = 25;
  const NAMED_MONTHS = [
    "Frostmere", "Fellwind", "Vinetide", "Verdant", "Hammerhearth",
    "Duskwane", "Alderen", "Ashveil", "Stonereach", "Starfall"
  ];
  const NAMED_DAYS = ["Sunday", "Moonday", "Talsday", "Midweek", "Ralsday", "Felsday", "Berynsday"];
  const SEASON_MAPPING = [
    { months: ["Frostmere", "Fellwind"], season: "Mist's Rise", seaLanesClosedChance: 95 },
    { months: ["Vinetide", "Verdant"], season: "Sea's Clarity", seaLanesClosedChance: 40 },
    { months: ["Hammerhearth", "Duskwane"], season: "Clear Skies", seaLanesClosedChance: 10 },
    { months: ["Alderen", "Ashveil", "Stonereach", "Starfall"], season: "Mist's Fall", seaLanesClosedChance: 50 }
  ];
  const START_DATE = new Date(2024, 10, 27); // 15th Verdant, 784 Y.S.

  // Weather patterns data
const WEATHER_PATTERNS = {
    "Mist's Rise": [
      { name: "Dense Ground Frost", description: "Thick layers of frost cover everything, glittering under weak sunlight." },
      { name: "Freezing Fog", description: "A mist so cold it crystallizes on trees and clothing, creating a surreal landscape." },
      { name: "Sleet Showers", description: "Intermittent sleet, making roads slippery and dangerous." },
      { name: "Heavy Snowfall", description: "Blankets the highlands, cutting off remote settlements." },
      { name: "Biting Coastal Winds", description: "Whipping gusts along the shore, bringing icy sprays of saltwater." },
      { name: "Overcast with Ice Pellets", description: "Ominous gray skies with sudden bursts of ice rain." },
      { name: "Snow-Clogged Mists", description: "Snow and fog merge into a whiteout, obscuring visibility." },
      { name: "Sudden Freezing Rain", description: "Creates treacherous layers of ice on roads and roofs." },
      { name: "Storm-Driven Tides", description: "Rough seas driven by winter squalls, forcing sailors to dock." },
      { name: "Frost-Covered Drizzle", description: "Persistent light rain that freezes on contact with the ground." },
      { name: "Windless Chill", description: "Still, bone-chilling air; frost thickens on stationary objects." },
      { name: "Dawn Hoarfrost", description: "Crystals cling to branches and grass, glimmering in pale light." },
      { name: "Snow-Dappled Fog", description: "Snowflakes drift in fog that seems to glow faintly." },
      { name: "Thunderous Ice Storms", description: "Rare but terrifying, lightning illuminates snow-heavy clouds." },
      { name: "Starry Winter Nights", description: "Clear, cold nights with stunning star visibility, accompanied by extreme frost." }
    ],
    "Sea's Clarity": [
      { name: "Morning Dew", description: "Heavy dew on fields and grass, promising clear skies ahead." },
      { name: "Light Spring Rain", description: "Gentle showers feed the awakening land, accompanied by a cool breeze." },
      { name: "Warm Coastal Breezes", description: "Fresh winds from the sea, carrying the scent of salt and kelp." },
      { name: "Clear, Mild Days", description: "Perfect planting weather, with temperate conditions and high visibility." },
      { name: "Patches of Fog", description: "Low mists cling to riverbanks and wetlands before burning off by midday." },
      { name: "Short Sunbursts", description: "Sunshine breaks through thin clouds in short, golden bursts." },
      { name: "Gentle Drizzles", description: "Intermittent rain with soft, nurturing droplets." },
      { name: "Crisp Dawn Air", description: "Chilly mornings that warm steadily under bright skies." },
      { name: "Rolling Thunderstorms", description: "Sudden storms roll through the plains, their rain refreshing the soil." },
      { name: "Blooming Rainbows", description: "Frequent rainbows stretch across valleys after spring showers." },
      { name: "Cool, Windy Evenings", description: "Gentle breezes turn brisk as the sun sets over rippling fields." },
      { name: "Occasional Hailstorms", description: "Brief pelts of small hailstones amid cool rain." },
      { name: "Fertile Mists", description: "Mist blankets the fields overnight, leaving moisture for crops." },
      { name: "Scattered Sunlight", description: "Dappled light through thin, high-altitude clouds." },
      { name: "Sprouting Heat", description: "A warm day signals the arrival of full spring as seeds germinate." }
    ],
    "Clear Skies": [
      { name: "Dry, Sunny Days", description: "Bright skies with a hint of heat, ideal for outdoor work." },
      { name: "Distant Thunderheads", description: "Storm clouds loom on the horizon but rarely reach inland." },
      { name: "Golden Sunlight", description: "The sun bathes fields in its glow, with long, productive days." },
      { name: "Warm, Breezy Afternoons", description: "Gentle winds cool the air, keeping laborers comfortable." },
      { name: "Heat Haze", description: "A shimmering mirage-like effect above sunbaked fields." },
      { name: "Light Cloud Cover", description: "Fluffy white clouds drift lazily across azure skies." },
      { name: "Scattered Showers", description: "Rare rainfalls interrupt dry periods, refreshing parched land." },
      { name: "Sudden Summer Storms", description: "Quick, heavy downpours followed by clear skies." },
      { name: "Stagnant Heat", description: "Oppressive stillness with a palpable rise in temperature." },
      { name: "Rolling Meadows Breeze", description: "Pleasant winds carry the scent of ripening grain." },
      { name: "Golden Hour Haze", description: "Dust in the air creates warm, golden evening light." },
      { name: "Sun-Dappled Forests", description: "Perfect hiking weather, with bright but mild sunshine." },
      { name: "Nighttime Heat Lightning", description: "Flickers of lightning illuminate distant clouds on warm nights." },
      { name: "Clear Night Skies", description: "Stars and constellations shine brightly with little atmospheric interference." },
      { name: "Gentle, Cooling Rains", description: "A light, brief rain calms the warm earth in late summer." }
    ],
    "Mist's Fall": [
      { name: "Cold Autumn Winds", description: "Gusts rustle through fallen leaves, carrying the scent of decay." },
      { name: "Heavy Rainstorms", description: "Prolonged downpours turn roads muddy and treacherous." },
      { name: "Thick, Creeping Mists", description: "Dense fog rolls inland, making familiar paths unfamiliar." },
      { name: "Darkening Skies", description: "Low, gray clouds create an oppressive atmosphere." },
      { name: "Misty Drizzle", description: "Fine, persistent rain soaks everything, chilling to the bone." },
      { name: "Turbulent Coastal Storms", description: "Towering waves crash against cliffs as the seas grow angry." },
      { name: "Frosted Mornings", description: "Early signs of winter as frost appears on rooftops and fields." },
      { name: "Scattered Thunderstorms", description: "Unpredictable bursts of rain, lightning, and thunder." },
      { name: "Chill Breezes", description: "Constant winds bite at exposed skin, heralding colder days ahead." },
      { name: "Leaf-Carpeted Paths", description: "Crisp, dry leaves litter roads under a cooling sun." },
      { name: "Twilight Gloom", description: "Overcast skies combine with shorter days to dim the landscape." },
      { name: "Shimmering Mistlight", description: "A rare phenomenon where refracted sunlight turns mists luminous." },
      { name: "Steady, Relentless Rain", description: "Weeks of uninterrupted rain fill rivers and flood lowlands." },
      { name: "Morning Fog Lifting to Sunshine", description: "Brief moments of brightness before the mists return." },
      { name: "Starry Chill Nights", description: "Clear, cold evenings with frost forming as stars blaze brightly overhead." }
    ]
  };

  // A repeatable roll between 0 and 1 for a given key: same key, same roll.
  // Uses the Knuth multiplicative hash, as the Exchange does.
  function seededRoll(key) {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (Math.imul(h, 31) + key.charCodeAt(i)) >>> 0;
    h = Math.imul(h ^ (h >>> 16), 2654435761) >>> 0;
    h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  function seasonOf(month) {
    return SEASON_MAPPING.find(s => s.months.includes(month));
  }

  // The in-world date for a real moment (defaults to now).
  function getDate(now = new Date()) {
    const daysElapsed = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
    const yearsPassed = Math.floor(daysElapsed / DAYS_PER_YEAR);
    const remainingDays = daysElapsed % DAYS_PER_YEAR;
    const monthIndex = Math.floor(remainingDays / DAYS_PER_MONTH);
    const date = {
      year: 784 + yearsPassed,
      month: NAMED_MONTHS[monthIndex],
      dayOfMonth: (remainingDays % DAYS_PER_MONTH) + 1,
      dayOfWeek: NAMED_DAYS[now.getDay()]
    };
    date.season = seasonOf(date.month).season;
    date.label = `${date.dayOfWeek}, ${date.dayOfMonth} ${date.month}, ${date.year} Y.S.`;
    date.key = `${date.year}-${date.month}-${date.dayOfMonth}`;
    return date;
  }

  // The day's weather: the season's fixed rotation, except that one day in
  // ten (chosen by the date, so the same for everyone) brings a freak pattern.
  function getWeather(date) {
    const patterns = WEATHER_PATTERNS[date.season];
    if (seededRoll("freak|" + date.key) < 0.1) {
      return patterns[Math.floor(seededRoll("freak-pick|" + date.key) * patterns.length)];
    }
    const dayOfYear = NAMED_MONTHS.indexOf(date.month) * DAYS_PER_MONTH + (date.dayOfMonth - 1);
    const offset = (date.year * 7) % patterns.length;
    return patterns[(dayOfYear + offset) % patterns.length];
  }

  // Open or closed for the whole in-world day, at the season's odds.
  function seaLanesOpen(date) {
    return seededRoll("lanes|" + date.key) * 100 >= seasonOf(date.month).seaLanesClosedChance;
  }

  window.Berynian = { getDate, getWeather, seaLanesOpen, seededRoll, NAMED_MONTHS, NAMED_DAYS, SEASON_MAPPING };
})();
