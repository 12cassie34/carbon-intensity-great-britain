<script lang="ts" setup>
import { format } from 'date-fns'

import { FULL_DATE_FORMAT, fetchData, formatBarChartData, type IntensityData } from '~/utlis'

const specificDate = ref(new Date())
const updateDate = (date: Date) => specificDate.value = date

const initialSpecificDateData = await fetchData(`https://api.carbonintensity.org.uk/intensity/date/${format(specificDate.value, 'yyyy-MMMM-dd')}`)
const specificDateData = ref<{ data: IntensityData[] } | null>(initialSpecificDateData)

watchEffect(async () => {
    specificDateData.value = null
    specificDateData.value = await fetchData(`https://api.carbonintensity.org.uk/intensity/date/${format(specificDate.value, 'yyyy-MMMM-dd')}`)
})
</script>

<template>
    <DatePickerDropdown :date='specificDate' :handle-update-date="updateDate" class="mb-4" />
    <Card :title='`Carbon Intensity in ${format(specificDate, FULL_DATE_FORMAT)}`' :key="specificDate.valueOf()"
        v-if="!!specificDateData">
        <template #content>
            <BarChart :svgId="'specific-date-svg'" :chart-data='formatBarChartData(specificDateData.data)' />
        </template>
    </Card>
</template>
