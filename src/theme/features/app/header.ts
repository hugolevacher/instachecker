import { tv } from 'tailwind-variants'

export const appHeaderTheme = tv({
    slots: {
        root: 'flex flex-wrap items-center justify-between gap-x-4 gap-y-2',
        brand: 'text-[#1a1620]',
        trustBadge: 'self-start text-[0.68rem] normal-case tracking-normal sm:text-[0.7rem]',
        trustIcon: 'h-3.5 w-3.5 shrink-0 text-[#e1306c]',
    },
})