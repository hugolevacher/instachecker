import { tv } from 'tailwind-variants'

export const relationshipSectionTheme = tv({
    slots: {
        root: 'flex min-h-0 flex-col',
        toolbar: 'flex items-center gap-2',
        copyButton: 'shrink-0',
        searchBox: 'min-w-0 flex-1 rounded-xl border border-[#e4e1e8] bg-white px-3 py-2 transition focus-within:border-[#e1306c] focus-within:ring-2 focus-within:ring-[#e1306c]/20',
        searchLabel: 'sr-only',
        searchInput: 'w-full min-w-0 bg-transparent pr-9 text-base text-[#1a1620] outline-none placeholder:text-[#a49dad] sm:text-sm',
        clearButton: 'absolute right-0 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e1e8] bg-white text-[#8b8394] transition active:scale-95 hover:border-[#e1306c]/40 hover:text-[#e1306c]',
        listWrapper: 'mt-2 flex min-h-0 flex-1 flex-col',
        // Cap the list so the page itself never becomes an endless scroll on mobile.
        scrollArea: 'max-h-[60vh] flex-1 overflow-y-auto sm:max-h-[26rem]',
        list: 'divide-y divide-[#f1eff3]',
        item: 'w-full overflow-hidden py-1',
        itemGrid: 'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3',
        username: 'min-w-0 flex-1 truncate text-sm font-medium text-[#1a1620]',
        openButton: 'shrink-0 px-3 text-xs transition-transform duration-150',
        emptyState: 'flex h-full items-center justify-center px-4 py-10 text-center',
    },
    variants: {
        pressed: {
            true: { openButton: 'scale-95' },
            false: {},
        },
    },
    defaultVariants: {
        pressed: false,
    },
})