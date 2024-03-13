<script setup lang='ts'>
import { fetchData, formatBarChartData } from '~/utlis';

const past24HoursData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${new Date().toISOString()}/pt24h`)
</script>

<template>
    <Card title='Past 24 Hours'>
        <template #content>
            <BarChart :svgId="'past-24-hours-svg'" :chart-data='formatBarChartData(past24HoursData.data)' />
        </template>
    </Card>
</template>