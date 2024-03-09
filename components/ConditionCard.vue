<script setup lang="ts">
import { formatTime, type IntensityData, type IntensityDegree } from '~/utlis'

const { customClasses, cardData } = defineProps<{
    customClasses?: string,
    title: string,
    cardData?: IntensityData
}>()

const intensityMap: Record<IntensityDegree, string> = {
    'low': 'Low 🟢',
    'moderate': 'Moderate 🟡',
    'high': 'High 🔴'
}

let conparisonSymbol = "="
let symbolColour = ""
if (cardData) {
    conparisonSymbol = cardData.intensity.forecast > cardData.intensity.actual ? ">" : "<"
    symbolColour = cardData.intensity.forecast > cardData.intensity.actual ? "text-green-500" : "text-red-600"
}
</script>

<template>
    <UCard :class="customClasses" v-if="!!cardData">
        <template #header>
            <h3 class="text-2xl font-bold text-green-600">{{ title }}</h3>
            <div class="flex justify-between">
                <TextAndLabel label="From" :text="formatTime({ date: cardData.from })" />
                <TextAndLabel label="To" :text="formatTime({ date: cardData.to })" />
            </div>
        </template>

        <div class="border-b pb-4">
            <TextAndLabel label="Intensity" textClasses="text-xl font-bold"
                :text="intensityMap[cardData.intensity.index]" />
        </div>

        <div class="grid grid-col-3 gap-4 grid-flow-col pt-4">
            <TextAndLabel label="Forecast" textClasses="text-2xl font-bold" :text="cardData.intensity.forecast">
                <template #unit>
                    <p class="text-sm font-normal text-slate-400 ml-4">g/kWh</p>
                </template>
            </TextAndLabel>
            <p class="text-2xl font-bold mt-5" :class="symbolColour">{{ conparisonSymbol }}</p>
            <TextAndLabel label="Actual" textClasses="text-2xl font-bold" :text="cardData.intensity.actual">
                <template #unit>
                    <p class="text-sm font-normal text-slate-400 ml-4">g/kWh</p>
                </template>
            </TextAndLabel>
        </div>
    </UCard>
</template>