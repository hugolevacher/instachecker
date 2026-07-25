import { twMerge } from 'tailwind-merge'

// twMerge (already a dependency) resolves Tailwind conflicts so a caller's
// className reliably wins over a theme default — a plain join silently keeps
// both and lets source order decide.
export const cn = twMerge
