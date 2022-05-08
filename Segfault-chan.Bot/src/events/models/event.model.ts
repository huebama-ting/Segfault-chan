export interface Event {
  name: string,
  once: boolean,
  execute: (...args: unknown[]) => void
}
