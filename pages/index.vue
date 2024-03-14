<script setup lang='ts'>
import { type GridItemProps } from '~/utlis'

import GridPastHalfHour from '~/components/Grid/GridPastHalfHour.vue'
import GridTodayIntensity from '~/components/Grid/GridTodayIntensity.vue'
import GridPast24Hours from '~/components/Grid/GridPast24Hours.vue'
import GridForecast24Hours from '~/components/Grid/GridForecast24Hours.vue'
import GridPastHalfHoursGeneration from '~/components/Grid/GridPastHalfHoursGeneration.vue'

definePageMeta({
    middleware: 'auth'
})

const componentMap: Record<string, Component> = {
    'GridPastHalfHour': GridPastHalfHour,
    'GridTodayIntensity': GridTodayIntensity,
    'GridPast24Hours': GridPast24Hours,
    'GridForecast24Hours': GridForecast24Hours,
    'GridPastHalfHoursGeneration': GridPastHalfHoursGeneration,
}

const gridContent = ref<GridItemProps[]>([
    { 'x': 0, 'y': 0, 'w': 4, 'h': 14, 'i': 'GridPastHalfHour' },
    { 'x': 0, 'y': 14, 'w': 8, 'h': 17, 'i': 'GridTodayIntensity' },
    { 'x': 0, 'y': 31, 'w': 6, 'h': 17, 'i': 'GridPast24Hours' },
    { 'x': 6, 'y': 31, 'w': 6, 'h': 17, 'i': 'GridForecast24Hours' },
    { 'x': 4, 'y': 0, 'w': 8, 'h': 25, 'i': 'GridPastHalfHoursGeneration' },
])
</script>

<template>
    <div>
        <client-only>
            <grid-layout 
                :layout.sync="gridContent" 
                :col-num="12" 
                :row-height="10" 
                :is-draggable="true"
                :is-resizable="false" 
                :responsive="true" 
                :vertical-compact="true" 
                :use-css-transforms="true"
                :margin="[16, 16]">
                <grid-item v-for="item in gridContent" :static="item.static" :x="item.x" :y="item.y" :w="item.w"
                    :h="item.h" :i="item.i">
                    <component :is="componentMap[item.i] || ''" />
                </grid-item>
            </grid-layout>
        </client-only>
    </div>
</template>