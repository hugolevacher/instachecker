import { tv } from 'tailwind-variants'

export const heroPanelTheme = tv({
    slots: {
        root: 'flex flex-col gap-4 p-5 sm:gap-6 sm:p-8 lg:sticky lg:top-6',
        header: 'space-y-4',
        title: 'max-w-xl',
        description: 'max-w-xl',
        body: 'space-y-4 sm:space-y-6',
        actions: 'flex flex-col gap-3',
        guideButton: 'w-full sm:px-6',
        browseButton: 'w-full sm:px-6 md:hidden bg-transparent! shadow-none!',
        desktopUpload: 'hidden md:block',
        parsingNotice: 'rounded-3xl border border-[#e1306c]/20 bg-[#e1306c]/5 px-4 py-3 text-sm text-[#b11f54]',
        errorNotice: 'rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700',
        footer: 'border-t border-slate-200/80 pt-4',
        footerGroup: 'flex flex-col gap-3',
        supportButton: 'inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#14a5ff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14a5ff] focus-visible:ring-offset-2 sm:w-auto sm:self-start',
        supportCup: 'h-5 w-auto',
        footerText: 'leading-5 text-slate-500 sm:text-sm',
        footerLink: 'font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-950 hover:decoration-slate-500',
    },
})