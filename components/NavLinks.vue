<script setup lang='ts'>
import { isPageRouteName, type PageRoutes } from '~/utlis';

const { authPages } = useAuthStore()

interface Link {
    label: string,
    icon: string,
    to: string
}

const authenticatedLinks: Record<PageRoutes, Link> = {
    'search-historical-data': {
        label: 'Search Historical Data',
        icon: 'i-heroicons-magnifying-glass',
        to: '/search-historical-data'
    },
    'carbon-generation-from': {
        label: 'Carbon Generation From',
        icon: 'i-carbon-bastion-host',
        to: '/carbon-generation-from'
    }
}

const getAccessibleLinks = () => {
    const links: Link[] = []
    authPages.forEach(page => {
        if (isPageRouteName(page)) {
            if (authenticatedLinks[page]) {
                links.push(authenticatedLinks[page])
            }
        }
    })

    return links
}

const links = [
    {
        label: 'Real-time Intensity',
        icon: 'i-heroicons-clock',
        to: '/'
    },
    ...getAccessibleLinks()
]

const { customClasses } = defineProps<{
    customClasses?: string
}>()
</script>

<template>
    <UVerticalNavigation :links='links' :class='customClasses'>
        <template #default='{ link }'>
            <span class='group-hover:text-primary relative text-lg lg:text-xl'>{{ link.label }}</span>
        </template>
    </UVerticalNavigation>
</template>