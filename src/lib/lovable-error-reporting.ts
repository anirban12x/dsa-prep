export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("Local Error caught by boundary:", error, context);
}
