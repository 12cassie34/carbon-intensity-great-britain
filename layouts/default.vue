<script setup lang='ts'>
import type { PageRoutes } from '~/utlis';

const { logUserOut } = useAuthStore()
const { userName, authPagesWithOrgs } = storeToRefs(useAuthStore())

const route = useRoute()

const handleLogout = async () => {
    logUserOut();
    await navigateTo('/login');
}
</script>

<template>
    <div>
        <div class="bg-emerald-600 h-14 flex items-center justify-between px-4">
            <ULink to="/" class="md:text-3xl font-semibold text-slate-100">
                Carbon Intensity Great Britain
            </ULink>
            <UButton @click.prevent="handleLogout">{{ userName }} | Logout</UButton>
        </div>
        <UPopover overlay class="md:hidden">
            <UButton color="white" label="Jump To" trailing-icon="i-heroicons-chevron-down-20-solid" />
            <template #panel>
                <div class="p-4">
                    <NavLinks />
                </div>
            </template>
        </UPopover>
        <div class="flex justify-center">
            <NavLinks customClasses="w-[15%] border-r-2 min-h-dvh hidden md:block" />
            <div class="w-[85%] md:p-4 my-4">
                <h5 v-if="route.path !== '/' && authPagesWithOrgs[route.name as PageRoutes]?.length" class="text-green-300">Authenticating by: {{ (authPagesWithOrgs[route.name as PageRoutes])?.join(', ') }}</h5>
                <NuxtPage />
            </div>
        </div>
    </div>
</template>
