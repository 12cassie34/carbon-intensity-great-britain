<script lang="ts" setup>
import { fetchData, formatPieChartData } from '~/utlis';

const pastHalfHourData = await fetchData('https://api.carbonintensity.org.uk/generation')
</script>

<template>
    <Card title='Past Half Hour Generation'>
        <template #content>
            <PieChart :svg-id="'pie-chart-past-half-hour'" :chart-data='formatPieChartData(pastHalfHourData.data.generationmix)' />
        </template>
    </Card>
</template>
