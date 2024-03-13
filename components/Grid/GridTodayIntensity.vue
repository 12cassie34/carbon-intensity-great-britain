<script setup lang='ts'>
import { fetchData, formatBarChartData } from '~/utlis';

const todayData = await fetchData('https://api.carbonintensity.org.uk/intensity/date')
</script>

<template>
    <Card title='Today Intensity'>
        <template #content>
            <BarChart :svgId="'today-svg'" :chart-data='formatBarChartData(todayData.data)' />
        </template>
    </Card>
</template>