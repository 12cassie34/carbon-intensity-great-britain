<script lang="ts" setup>
import { format, sub } from 'date-fns';

import { FULL_DATE_FORMAT, fetchData, formatBarChartData, type IntensityData } from '~/utlis';

const dateRangeRef = ref(null)
const dateRange = computed(() => dateRangeRef.value?.['dateRange'])
const startTime = computed(() => dateRange.value ? dateRange?.value['start'] : sub(new Date(), { days: 14 }))
const endTime = computed(() => dateRange.value ? dateRange?.value['end'] : new Date())

const initialDateRangeData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${startTime.value.toISOString()}/${endTime.value.toISOString()}`)
const dateRangeData = ref<{ data: IntensityData[] } | null>(initialDateRangeData)

watchEffect(async () => {
    dateRangeData.value = null
    dateRangeData.value = await fetchData(`https://api.carbonintensity.org.uk/intensity/${startTime.value.toISOString()}/${endTime.value.toISOString()}`)
})
</script>

<template>
    <DateRangePicker ref="dateRangeRef" class='mb-4' />
    <Card :title='`Carbon Intensity in ${format(startTime, FULL_DATE_FORMAT)} - ${format(endTime, FULL_DATE_FORMAT)}`' :key="startTime.valueOf()"
        v-if="!!dateRangeData">
        <template #content>
            <BarChart :svg-id="'date-range-svg'" :chart-data='formatBarChartData(dateRangeData.data)' />
        </template>
    </Card>
</template>
