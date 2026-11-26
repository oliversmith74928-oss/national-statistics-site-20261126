// Country statistics. Figures are approximate 2024 estimates compiled from
// public sources (UN and World Bank estimates). Population in millions,
// GDP in US$ billions, GDP per capita in US$, area in square kilometres.
// popSeries: population (millions) 2015-2024. gdpSeries: GDP (US$ bn) 2019-2024.

export const YEAR = 2024;

export const countries = [
  {
    code: 'CHN', name: 'China', region: 'Asia', capital: 'Beijing',
    population: 1411.8, gdp: 18700, gdpPerCapita: 13250, lifeExp: 78.6,
    literacy: 97.0, area: 9596961, urban: 65, internet: 77,
    popSeries: [1376, 1381, 1386, 1392, 1398, 1411, 1412, 1412, 1412, 1412],
    gdpSeries: [14280, 14690, 17820, 17960, 17790, 18700],
  },
  {
    code: 'IND', name: 'India', region: 'Asia', capital: 'New Delhi',
    population: 1450.9, gdp: 3930, gdpPerCapita: 2710, lifeExp: 68.4,
    literacy: 77.7, area: 3287263, urban: 36, internet: 55,
    popSeries: [1322, 1337, 1352, 1367, 1382, 1396, 1411, 1426, 1439, 1451],
    gdpSeries: [2830, 2670, 3160, 3460, 3570, 3930],
  },
  {
    code: 'USA', name: 'United States', region: 'North America', capital: 'Washington, D.C.',
    population: 340.1, gdp: 29200, gdpPerCapita: 85800, lifeExp: 78.4,
    literacy: 99, area: 9833517, urban: 83, internet: 92,
    popSeries: [321, 323, 325, 327, 328, 331, 332, 334, 337, 340],
    gdpSeries: [21400, 20900, 23300, 25700, 27360, 29200],
  },
  {
    code: 'IDN', name: 'Indonesia', region: 'Asia', capital: 'Jakarta',
    population: 283.5, gdp: 1400, gdpPerCapita: 4940, lifeExp: 71.7,
    literacy: 96.0, area: 1904570, urban: 58, internet: 79,
    popSeries: [258, 261, 264, 267, 270, 274, 277, 280, 282, 284],
    gdpSeries: [1120, 1050, 1190, 1310, 1370, 1400],
  },
  {
    code: 'PAK', name: 'Pakistan', region: 'Asia', capital: 'Islamabad',
    population: 252.4, gdp: 374, gdpPerCapita: 1480, lifeExp: 66.1,
    literacy: 59.0, area: 881913, urban: 37, internet: 36,
    popSeries: [212, 216, 220, 224, 228, 232, 236, 241, 247, 252],
    gdpSeries: [320, 300, 350, 380, 340, 374],
  },
  {
    code: 'NGA', name: 'Nigeria', region: 'Africa', capital: 'Abuja',
    population: 232.7, gdp: 253, gdpPerCapita: 1090, lifeExp: 54.6,
    literacy: 62.0, area: 923768, urban: 54, internet: 42,
    popSeries: [183, 187, 191, 196, 201, 206, 211, 217, 225, 233],
    gdpSeries: [450, 430, 440, 470, 360, 253],
  },
  {
    code: 'BRA', name: 'Brazil', region: 'South America', capital: 'Brasília',
    population: 216.4, gdp: 2170, gdpPerCapita: 10030, lifeExp: 75.9,
    literacy: 93.0, area: 8515767, urban: 88, internet: 84,
    popSeries: [204, 206, 208, 210, 212, 214, 215, 216, 216, 216],
    gdpSeries: [1870, 1480, 1660, 1920, 2180, 2170],
  },
  {
    code: 'BGD', name: 'Bangladesh', region: 'Asia', capital: 'Dhaka',
    population: 173.6, gdp: 460, gdpPerCapita: 2650, lifeExp: 73.8,
    literacy: 75.0, area: 148460, urban: 39, internet: 47,
    popSeries: [157, 159, 161, 163, 165, 167, 169, 171, 172, 174],
    gdpSeries: [310, 330, 370, 420, 440, 460],
  },
  {
    code: 'RUS', name: 'Russia', region: 'Europe', capital: 'Moscow',
    population: 143.8, gdp: 2200, gdpPerCapita: 15300, lifeExp: 73.2,
    literacy: 99.7, area: 17098242, urban: 75, internet: 90,
    popSeries: [144, 144, 144, 144, 144, 144, 144, 144, 144, 144],
    gdpSeries: [1690, 1490, 1780, 2240, 2020, 2200],
  },
  {
    code: 'MEX', name: 'Mexico', region: 'North America', capital: 'Mexico City',
    population: 130.9, gdp: 1850, gdpPerCapita: 14130, lifeExp: 75.4,
    literacy: 95.0, area: 1964375, urban: 81, internet: 82,
    popSeries: [121, 123, 124, 126, 127, 129, 130, 131, 131, 131],
    gdpSeries: [1270, 1090, 1300, 1420, 1790, 1850],
  },
  {
    code: 'ETH', name: 'Ethiopia', region: 'Africa', capital: 'Addis Ababa',
    population: 129.7, gdp: 205, gdpPerCapita: 1580, lifeExp: 66.6,
    literacy: 52.0, area: 1104300, urban: 23, internet: 24,
    popSeries: [101, 104, 107, 110, 113, 116, 119, 122, 126, 130],
    gdpSeries: [96, 110, 130, 160, 190, 205],
  },
  {
    code: 'JPN', name: 'Japan', region: 'Asia', capital: 'Tokyo',
    population: 123.7, gdp: 4026, gdpPerCapita: 32540, lifeExp: 84.0,
    literacy: 99, area: 377975, urban: 92, internet: 93,
    popSeries: [127, 127, 127, 126, 126, 125, 125, 124, 124, 124],
    gdpSeries: [5120, 5040, 5040, 4250, 4220, 4026],
  },
  {
    code: 'EGY', name: 'Egypt', region: 'Africa', capital: 'Cairo',
    population: 114.5, gdp: 380, gdpPerCapita: 3320, lifeExp: 71.0,
    literacy: 73.0, area: 1001450, urban: 43, internet: 57,
    popSeries: [95, 97, 99, 101, 103, 105, 107, 110, 112, 115],
    gdpSeries: [300, 310, 360, 400, 390, 380],
  },
  {
    code: 'DEU', name: 'Germany', region: 'Europe', capital: 'Berlin',
    population: 84.7, gdp: 4650, gdpPerCapita: 54900, lifeExp: 81.2,
    literacy: 99, area: 357588, urban: 78, internet: 94,
    popSeries: [81, 82, 83, 83, 83, 83, 84, 84, 85, 85],
    gdpSeries: [3870, 3810, 4220, 4080, 4460, 4650],
  },
  {
    code: 'GBR', name: 'United Kingdom', region: 'Europe', capital: 'London',
    population: 69.1, gdp: 3580, gdpPerCapita: 51800, lifeExp: 81.3,
    literacy: 99, area: 242495, urban: 84, internet: 96,
    popSeries: [65, 66, 66, 67, 67, 67, 67, 68, 69, 69],
    gdpSeries: [2850, 2700, 3140, 3080, 3330, 3580],
  },
  {
    code: 'FRA', name: 'France', region: 'Europe', capital: 'Paris',
    population: 68.4, gdp: 3030, gdpPerCapita: 44300, lifeExp: 82.9,
    literacy: 99, area: 551695, urban: 81, internet: 94,
    popSeries: [66, 67, 67, 67, 67, 68, 68, 68, 68, 68],
    gdpSeries: [2720, 2620, 2950, 2780, 3030, 3030],
  },
];

export const regions = ['All regions', ...new Set(countries.map((c) => c.region))];

export function byCode(code) {
  return countries.find((c) => c.code === code.toUpperCase());
}

export function sortedBy(key, desc = true) {
  return [...countries].sort((a, b) => (desc ? b[key] - a[key] : a[key] - b[key]));
}

export const fmtPop = (m) => `${m.toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
export const fmtGdp = (b) => `$${b.toLocaleString('en-US')}B`;
export const fmtMoney = (n) => `$${n.toLocaleString('en-US')}`;
export const fmtNum = (n) => n.toLocaleString('en-US');
