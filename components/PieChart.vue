<script lang='ts' setup>
import * as d3 from 'd3'

import type { PieChartData } from '~/utlis'

const props = defineProps<{
    customClasses?: string,
    svgId: string,
    chartData: PieChartData[]
}>()

const containerRef: Ref<HTMLElement | null> = ref(null)

const buildChart = () => {
    const width = containerRef.value!.clientWidth 
    const height = 500
    const radius = Math.min(width, height) / 2

    const arc = d3.arc()
        .innerRadius(radius * 0.1)
        .outerRadius(radius - 1)

    const pie = d3.pie()
        .padAngle(1 / radius)
        .sort(null)
        // @ts-ignore
        .value(d => d.value)

    const colour = d3.scaleOrdinal()
        .domain(props.chartData.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), props.chartData.length).reverse())

    const svg = d3.select(`svg#${props.svgId}`)
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;')

    svg.append('g')
        .selectAll()
        // @ts-ignore
        .data(pie(props.chartData))
        .join('path')
        // @ts-ignore
        .attr('fill', d => colour(d.data.name))
        // @ts-ignore
        .attr('d', arc)
        .append('title')
        // @ts-ignore
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`)

    svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .selectAll()
        // @ts-ignore
        .data(pie(props.chartData))
        .join('text')
        // @ts-ignore
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .call(text => text.append('tspan')
            .attr('y', '-0.4em')
            .attr('font-weight', 'bold')
            .text(d => {
                // @ts-ignore
                const type = d.data.name
                return type.charAt(0).toUpperCase() + type.slice(1)
            }))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
            .attr('x', 0)
            .attr('y', '0.7em')
            .attr('fill-opacity', 0.7)
            // @ts-ignore
            .text(d => d.data.value.toLocaleString('en-GB')))

    svg.node()
}

onMounted(() => {
    buildChart()
})
</script>

<template>
    <div class='w-full relative' :class='customClasses' ref='containerRef' :id='`svg-container-${svgId}`'>
        <svg :id='svgId'></svg>
    </div>
</template>
