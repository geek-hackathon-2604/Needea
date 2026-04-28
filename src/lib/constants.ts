export const SORT_LABELS = {
  likes: "共感順",
  newest: "新着順",
  unresolved: "未解決",
} as const;

export type SortKey = keyof typeof SORT_LABELS;
