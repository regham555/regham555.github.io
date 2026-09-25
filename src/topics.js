export function collectTopics(items) {
  return [...new Set(items.flatMap((item) => item.topics))].sort()
}
