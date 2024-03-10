<script setup lang="ts">
const { customClasses, title } = defineProps<{
    customClasses?: string,
    title: string,
}>()
</script>

<template>
    <UCard :class="customClasses">
        <template #header>
            <h3 class="text-2xl font-bold text-green-600">{{ title }}</h3>
        </template>

        <slot name="content"></slot>
    </UCard>
</template>