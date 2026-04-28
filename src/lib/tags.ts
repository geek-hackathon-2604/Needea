import { mockIdeas } from "./mock-data";

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  mockIdeas.forEach((idea) => idea.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getTagUsageCount(tag: string): number {
  return mockIdeas.filter((idea) => idea.tags.includes(tag)).length;
}
