<script setup lang="ts">
import { fetchData, formatBarChartData, type IntensityData } from '~/utlis'

const currentHalfHourData: { data: IntensityData[] } = await fetchData("https://api.carbonintensity.org.uk/intensity")
const past24HoursData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${new Date().toISOString()}/pt24h`)

const currentHalfHour = currentHalfHourData.data[0]
</script>

<template>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ConditionCard title="Past Half Hour" :cardData="currentHalfHour" />
        <Card title="Past 24 Hours">
            <template #content>
                <BarChart :chartData="formatBarChartData(past24HoursData.data)"/>
            </template>
        </Card>
    </div>

</template>