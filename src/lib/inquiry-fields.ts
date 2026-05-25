export type InquiryFieldKey = "dimensions" | "mounting" | "control" | "location" | "note";

const solutionFields: Record<string, InquiryFieldKey[]> = {
  "venkovni-stineni": ["dimensions", "mounting", "control", "location"],
  "interierove-stineni": ["dimensions", "mounting", "control", "location"],
  "stineni-teras": ["dimensions", "mounting", "control"],
  "samonosne-systemy": ["dimensions", "mounting", "control"],
  "okna-a-dvere": ["dimensions", "note"],
  "site-proti-hmyzu": ["dimensions", "mounting"],
  "garazova-vrata": ["dimensions", "control"],
};

export function fieldsForSolution(solutionSlug: string): InquiryFieldKey[] {
  return solutionFields[solutionSlug] ?? ["dimensions", "note"];
}

export function showField(solutionSlug: string, field: InquiryFieldKey) {
  return fieldsForSolution(solutionSlug).includes(field);
}
