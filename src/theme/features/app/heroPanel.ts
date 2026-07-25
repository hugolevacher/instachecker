import { tv } from 'tailwind-variants'

export const heroPanelTheme = tv({
    slots: {
        root: 'flex flex-col gap-4 p-4 sm:gap-6 sm:p-8 lg:sticky lg:top-6',
        header: 'space-y-2 sm:space-y-3',
        title: 'max-w-xl text-balance',
        description: 'max-w-xl text-sm leading-6 text-[#6b6474] sm:text-base',
        body: 'space-y-4 sm:space-y-5',
        actions: 'flex flex-col gap-3',
        guideButton: 'w-full sm:px-6',
        browseButton: 'w-full md:hidden',
        desktopUpload: 'hidden md:block',
        parsingNotice:
            'flex items-center gap-2 rounded-xl border border-[#e1306c]/20 bg-[#e1306c]/5 px-3 py-2.5 text-sm text-[#b11f54]',
        errorNotice: 'rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm leading-6 text-rose-700',
        footer: 'border-t border-[#efedf1] pt-4',
        footerGroup: 'flex flex-col gap-3',
        // Intentionally loud — this is the donation ask, not a footnote.
        supportButton:
            'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#14a5ff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(26,22,32,0.10)] transition hover:bg-[#0d93e8] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14a5ff] focus-visible:ring-offset-2 sm:w-auto sm:self-start',
        supportCup: 'h-5 w-auto',
        footerText: 'leading-5 text-[#8b8394] sm:text-sm',
        footerLink: 'font-semibold text-[#6b6474] underline decoration-[#ddd8e2] underline-offset-2 transition hover:text-[#1a1620] hover:decoration-[#8b8394]',
    },
    variants: {
        // After analysis the intro is dead weight on a phone; desktop shows both columns at once.
        collapsed: {
            true: { header: 'hidden lg:block lg:space-y-3' },
            false: {},
        },
    },
    defaultVariants: {
        collapsed: false,
    },
})