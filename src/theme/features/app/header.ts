import { tv } from 'tailwind-variants'

export const appHeaderTheme = tv({
    slots: {
        root: 'flex flex-col gap-3 md:flex-row md:items-center md:justify-between',
        trustBadge: 'self-start text-[11px] normal-case tracking-normal sm:text-xs',
    },
})