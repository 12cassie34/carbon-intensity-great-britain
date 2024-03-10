<script setup lang='ts'>
import { fetchData, formatBarChartData, type IntensityData } from '~/utlis'

const todayData = await fetchData('https://api.carbonintensity.org.uk/intensity/date')
const currentHalfHourData: { data: IntensityData[] } = await fetchData('https://api.carbonintensity.org.uk/intensity')
const past24HoursData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${new Date().toISOString()}/pt24h`)
const forecast24HoursData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${new Date().toISOString()}/fw24h`)
</script>

<template>
    <div class='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <ConditionCard title='Past Half Hour' :cardData='currentHalfHourData.data[0]' />
        <Card title='Today Intensity'>
            <template #content>
                <BarChart :svgId="'today-svg'" :chartData='formatBarChartData(todayData.data)'/>
            </template>
        </Card>
        <Card title='Past 24 Hours'>
            <template #content>
                <BarChart :svgId="'past-24-hours-svg'" :chartData='formatBarChartData(past24HoursData.data)'/>
            </template>
        </Card>
        <Card title='Forecast 24 Hours'>
            <template #content>
                <BarChart :svgId="'forecast-24-hours-svg'" :chartData='formatBarChartData(forecast24HoursData.data, true)'/>
            </template>
        </Card>
    </div>

</template>