/**
 * Places travelled to (beyond the surf and dive spots). Shared by the Personal
 * World logbook and the 3D globe so the two can never disagree.
 * Coordinates are representative points for the city or region.
 */
export interface TravelSpot {
  label: string;
  country: string;
  lat: number;
  lng: number;
}

export const TRAVEL_SPOTS: TravelSpot[] = [
  { label: "Antalya", country: "Turkey", lat: 36.897, lng: 30.713 },
  { label: "Netherlands", country: "Netherlands", lat: 52.37, lng: 4.9 },
  { label: "Belgium", country: "Belgium", lat: 50.85, lng: 4.35 },
  { label: "Paris", country: "France", lat: 48.857, lng: 2.352 },
  { label: "Alsace", country: "France", lat: 48.32, lng: 7.44 },
  { label: "Barcelona", country: "Spain", lat: 41.385, lng: 2.173 },
  { label: "Madrid", country: "Spain", lat: 40.417, lng: -3.704 },
  { label: "Palma de Mallorca", country: "Spain", lat: 39.57, lng: 2.65 },
  { label: "Switzerland", country: "Switzerland", lat: 46.8, lng: 8.23 },
  { label: "Black Forest", country: "Germany", lat: 48.0, lng: 8.2 },
  { label: "Austria", country: "Austria", lat: 47.5, lng: 14.5 },
  { label: "Prague", country: "Czechia", lat: 50.075, lng: 14.438 },
  { label: "Poland", country: "Poland", lat: 52.0, lng: 19.4 },
  { label: "Budapest", country: "Hungary", lat: 47.498, lng: 19.04 },
  { label: "Serbia", country: "Serbia", lat: 44.79, lng: 20.45 },
  { label: "Timișoara", country: "Romania", lat: 45.76, lng: 21.23 },
  { label: "Sweden", country: "Sweden", lat: 59.33, lng: 18.07 },
  { label: "Athens", country: "Greece", lat: 37.98, lng: 23.73 },
  { label: "Crete", country: "Greece", lat: 35.24, lng: 24.81 },
  { label: "Northern Greece", country: "Greece", lat: 40.64, lng: 22.94 },
  { label: "Sinai", country: "Egypt", lat: 28.5, lng: 34.5 },
  { label: "United States", country: "United States", lat: 39.8, lng: -98.6 },
  { label: "Guatemala", country: "Guatemala", lat: 15.78, lng: -90.23 },
  { label: "Argentina", country: "Argentina", lat: -38.4, lng: -63.6 },
  { label: "Chile", country: "Chile", lat: -35.7, lng: -71.5 },
];
