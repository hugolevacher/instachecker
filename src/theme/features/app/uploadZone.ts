import { tv } from 'tailwind-variants'

export const uploadZoneTheme = tv({
    slots: {
        root: 'group cursor-pointer transition hover:border-[#e1306c]/40 hover:bg-white lg:min-h-[18rem]',
        body: 'flex h-full flex-col justify-between gap-6 p-8',
        header: 'space-y-3',
        title: 'max-w-xl',
        description: 'max-w-xl sm:text-base',
        buttonWrap: 'flex justify-start',
        button: 'sm:px-5',
    },
})