<script setup lang="ts">
const { customClasses, textClasses, label, text } = defineProps<{
    customClasses?: string,
    textClasses?: string,
    label: string,
    text: string | number
}>()
</script>

<template>
    <div :class="customClasses">
        <label class="text-green-600 text-sm">{{ label }}</label>
        <div class="flex items-baseline">
            <p :class="textClasses">
                {{ text }}
            </p>
            <slot name="unit"></slot>
        </div>
    </div>
</template>