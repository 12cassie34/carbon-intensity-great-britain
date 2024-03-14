<script lang="ts" setup>
import { fetchData, formatBarChartData } from '~/utlis';

const forecast24HoursData = await fetchData(`https://api.carbonintensity.org.uk/intensity/${new Date().toISOString()}/fw24h`)

</script>

<template>
    <Card title='Forecast 24 Hours'>
        <template #content>
            <BarChart :svg-id="'forecast-24-hours-svg'"
                :chart-data='formatBarChartData(forecast24HoursData.data, true)' />
        </template>
    </Card>
</template>
