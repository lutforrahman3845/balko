/**
 * Error message extraction for mutation handlers.
 *
 * RTK Query rejects with one of two shapes: a `FetchBaseQueryError`, whose
 * server payload sits on `data`, or a `SerializedError` carrying a plain
 * `message`. Handlers used to reach into both with `catch (error: any)` and an
 * optional-chaining ladder, which silently returned `undefined` if the shape
 * ever changed. Narrowing from `unknown` keeps the same behaviour but makes
 * the assumptions explicit and type-checked.
 */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** The `message` of an object-shaped value, when it is a non-empty string. */
function readMessage(value: unknown): string | undefined {
  if (!isRecord(value)) return undefined;
  const { message } = value;
  return typeof message === "string" && message.trim() ? message : undefined;
}

/**
 * The most specific human-readable message available on a caught error,
 * falling back to `fallback` when the error carries nothing usable.
 *
 * Prefers the server's payload message over the transport-level one, since
 * the former describes what actually went wrong for the user.
 */
export function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "string" && error.trim()) return error;

  if (isRecord(error)) {
    const fromPayload = readMessage(error.data);
    if (fromPayload) return fromPayload;
  }

  return readMessage(error) ?? fallback;
}
