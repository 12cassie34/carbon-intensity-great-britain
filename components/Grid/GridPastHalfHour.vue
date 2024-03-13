<script setup lang='ts'>
import { fetchData, type IntensityData } from '~/utlis';

definePageMeta({
    middleware: 'auth'
})

const pasHalfHourData: { data: IntensityData[] } = await fetchData('https://api.carbonintensity.org.uk/intensity')
</script>

<template>
    <ConditionCard title='Past Half Hour' :card-data='pasHalfHourData.data[0]' />
</template>