<script setup lang='ts'>
const links = [
    {
        label: 'Real-time Intensity',
        icon: 'i-heroicons-clock',
        to: '/'
    },
    {
        label: 'Search Historical Data',
        icon: 'i-heroicons-magnifying-glass',
        to: '/search-historical-data'
    }
]

const { customClasses } = defineProps<{
    customClasses?: string
}>()
</script>

<template>
    <UVerticalNavigation :links='links' :class='customClasses'>
        <template #default='{ link }'>
            <span class='group-hover:text-primary relative text-lg lg:text-2xl'>{{ link.label }}</span>
        </template>
    </UVerticalNavigation>
</template>