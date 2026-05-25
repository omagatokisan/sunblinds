export type SolutionBentoCellPlacement = {
  gridColumn: string;
  gridRow: string;
};

export const BENTO_CANVAS = {
  columns: "repeat(12, minmax(0, 1fr))",
  rows: "repeat(4, minmax(0, 1fr))",
} as const;

/** Homepage: hlavní skupina vlevo, produkty vpravo. */
const HOME_GROUP_LEFT_7: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 10", gridRow: "2 / 3" },
  { gridColumn: "10 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const HOME_GROUP_LEFT_6: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const HOME_GROUP_LEFT_5: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const HOME_GROUP_LEFT_4: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 13", gridRow: "3 / 5" },
];

function homeCellsForCount(cellCount: number): SolutionBentoCellPlacement[] {
  if (cellCount <= 4) return HOME_GROUP_LEFT_4.slice(0, cellCount);
  if (cellCount === 5) return HOME_GROUP_LEFT_5;
  if (cellCount === 6) return HOME_GROUP_LEFT_6;
  return HOME_GROUP_LEFT_7;
}

/** Hero vlevo, produkty vpravo — 2×3 mřížka. */
const TILE_7_A: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 10", gridRow: "2 / 3" },
  { gridColumn: "10 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const TILE_7_B: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 13", gridRow: "1 / 3" },
  { gridColumn: "1 / 4", gridRow: "3 / 4" },
  { gridColumn: "4 / 7", gridRow: "3 / 4" },
  { gridColumn: "7 / 10", gridRow: "3 / 4" },
  { gridColumn: "10 / 13", gridRow: "3 / 4" },
  { gridColumn: "1 / 7", gridRow: "4 / 5" },
  { gridColumn: "7 / 13", gridRow: "4 / 5" },
];

const TILE_7_C: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 5", gridRow: "1 / 5" },
  { gridColumn: "5 / 8", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "1 / 2" },
  { gridColumn: "5 / 13", gridRow: "2 / 3" },
  { gridColumn: "5 / 8", gridRow: "3 / 5" },
  { gridColumn: "8 / 11", gridRow: "3 / 5" },
  { gridColumn: "11 / 13", gridRow: "3 / 5" },
];

const TILE_7_D: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 9", gridRow: "1 / 3" },
  { gridColumn: "9 / 11", gridRow: "1 / 2" },
  { gridColumn: "11 / 13", gridRow: "1 / 2" },
  { gridColumn: "9 / 13", gridRow: "2 / 3" },
  { gridColumn: "1 / 4", gridRow: "3 / 5" },
  { gridColumn: "4 / 8", gridRow: "3 / 5" },
  { gridColumn: "8 / 13", gridRow: "3 / 5" },
];

const TILE_7_E: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 7", gridRow: "1 / 5" },
  { gridColumn: "7 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 2" },
  { gridColumn: "7 / 13", gridRow: "2 / 3" },
  { gridColumn: "7 / 9", gridRow: "3 / 5" },
  { gridColumn: "9 / 11", gridRow: "3 / 5" },
  { gridColumn: "11 / 13", gridRow: "3 / 5" },
];

const TILE_7_F: SolutionBentoCellPlacement[] = [
  { gridColumn: "6 / 13", gridRow: "1 / 5" },
  { gridColumn: "1 / 3", gridRow: "1 / 2" },
  { gridColumn: "3 / 6", gridRow: "1 / 2" },
  { gridColumn: "1 / 3", gridRow: "2 / 3" },
  { gridColumn: "3 / 6", gridRow: "2 / 3" },
  { gridColumn: "1 / 3", gridRow: "3 / 5" },
  { gridColumn: "3 / 6", gridRow: "3 / 5" },
];

const TILE_7_BY_SLUG: Record<string, SolutionBentoCellPlacement[]> = {
  "samonosne-systemy": TILE_7_D,
  "venkovni-stineni": TILE_7_A,
  "interierove-stineni": TILE_7_B,
  "stineni-teras": TILE_7_C,
  "garazova-vrata": TILE_7_E,
  "okna-a-dvere": TILE_7_D,
  "site-proti-hmyzu": TILE_7_F,
};

const TILE_6: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const TILE_5: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 8", gridRow: "1 / 5" },
  { gridColumn: "8 / 13", gridRow: "1 / 2" },
  { gridColumn: "8 / 13", gridRow: "2 / 3" },
  { gridColumn: "8 / 10", gridRow: "3 / 5" },
  { gridColumn: "10 / 13", gridRow: "3 / 5" },
];

const TILE_4: SolutionBentoCellPlacement[] = [
  { gridColumn: "1 / 9", gridRow: "1 / 5" },
  { gridColumn: "9 / 13", gridRow: "1 / 2" },
  { gridColumn: "9 / 13", gridRow: "2 / 3" },
  { gridColumn: "9 / 13", gridRow: "3 / 5" },
];

function legacyCellsForCount(slug: string, cellCount: number): SolutionBentoCellPlacement[] {
  if (cellCount <= 4) return TILE_4.slice(0, cellCount);
  if (cellCount === 5) return TILE_5;
  if (cellCount === 6) return TILE_6;
  return TILE_7_BY_SLUG[slug] ?? TILE_7_A;
}

export function getSolutionBentoLayout(
  slug: string,
  cellCount: number,
  mode: "home" | "legacy" = "home"
) {
  return {
    ...BENTO_CANVAS,
    cells:
      mode === "home"
        ? homeCellsForCount(cellCount)
        : legacyCellsForCount(slug, cellCount),
  };
}
