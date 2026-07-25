import { tv } from 'tailwind-variants'

export const uploadZoneTheme = tv({
    slots: {
        root: 'group cursor-pointer transition hover:border-[#e1306c]/50 hover:bg-[#e1306c]/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e1306c] focus-visible:ring-offset-2',
        body: 'flex flex-col items-center gap-2 px-4 py-6 text-center',
        icon: 'h-7 w-7 text-[#c6bfcf] transition group-hover:text-[#e1306c]',
        header: 'space-y-1',
        title: 'text-base',
        description: 'text-[#8b8394]',
    },
})