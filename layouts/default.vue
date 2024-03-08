<script setup lang="ts">
</script>

<template>
    <div class="bg-emerald-600 h-14 flex items-center justify-center md:justify-start px-4">
        <ULink to="/" class="md:text-3xl font-semibold text-slate-100">
            Carbon Intensity Great Britain
        </ULink>
    </div>
    <UPopover overlay class="md:hidden">
        <UButton color="white" label="Jump To" trailing-icon="i-heroicons-chevron-down-20-solid" />
        <template #panel>
            <div class="p-4">
                <NavLinks />
            </div>
        </template>
    </UPopover>
    <div class="flex">
        <NavLinks customClasses="w-[15%] border-r-2 min-h-dvh hidden md:block" />
        <NuxtPage class="w-[85%]" />
    </div>
</template>
