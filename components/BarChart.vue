<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

import { INTENSITY_UNIT, formatTime, type BarChartData, type IntensityDegree } from '../utlis'

const barColourMap: Record<IntensityDegree, string> = {
    'low': 'rgb(74 222 128)',
    'moderate': 'rgb(250 204 21)',
    'high': 'rgb(248 113 113)'
}
const barColourHoverMap: Record<IntensityDegree, string> = {
    'low': 'rgb(21 128 61)',
    'moderate': 'rgb(161 98 7)',
    'high': 'rgb(185 28 28)'
}

const isIntensityType = (value: unknown): value is IntensityDegree => typeof value === 'string'

const props = defineProps<{
    customClasses?: string,
    barColours?: Record<IntensityDegree, string>,
    barHoverColours?: Record<IntensityDegree, string>,
    svgId: string,
    chartData: BarChartData[]
}>()

const containerRef: Ref<HTMLElement | null> = ref(null)

const buildChart = () => {
    const width = '100%'
    const widthNumber = containerRef.value!.clientWidth
    const height = 300
    const marginTop = 20
    const marginRight = 0
    const marginBottom = 30
    const marginLeft = 20

    const svg = d3.select(`svg#${props.svgId}`).attr('width', width).attr('height', height)

    const x = d3.scaleBand()
        .domain(props.chartData.map(d => d.time))
        .range([marginLeft, widthNumber - marginRight])
        .padding(0.1)
    const xAxis = d3.axisBottom(x)
        .tickSizeOuter(0)
        .tickValues(x.domain().filter((_, i) => {
            return !(i % 4);
        }))
        .tickFormat((d, i) => {
            return formatTime({
                date: d,
                timeStyle: 'short'
            })
        })

    const y = d3.scaleLinear()
        .domain([0, d3.max(props.chartData, d => d.value) || 0]).nice()
        .range([height - marginBottom, marginTop])
    const yAxis = d3.axisLeft(y).tickSize(0)

    const tooltip = d3.select(`#svg-container-${props.svgId}`)
        .append('div')
        .style('position', 'absolute')
        .style('z-index', '10')
        .style('visibility', 'hidden')
        .style('background', '#fff')
        .style('padding', '8px')
        .style('border-radius', '6px')

    const bar = svg.append('g')
        .selectAll('rect')
        .data(props.chartData)
        .join('rect')
        .attr('fill', d => props.barColours ? props.barColours[d.degree] : barColourMap[d.degree])
        .attr('x', d => x(d.time) || 0)
        .attr('y', d => y(d.value))
        .attr('height', d => y(0) - y(d.value))
        .attr('width', x.bandwidth())
        .on('mouseover', d => {
            tooltip.text(`${formatTime({ date: d.srcElement.__data__.time, dateStyle: 'short' })} ${d.srcElement.__data__.value} ${INTENSITY_UNIT}`)
            tooltip.style('visibility', 'visible')
        })
        .on('mousemove', function (d) {
            tooltip
                .style('top', `${d.offsetY - 10}px`)
                .style('left', `${d.offsetX + 10}px`)
            const degree = d.srcElement.__data__.degree
            if (isIntensityType(degree)) {
                d3.select(this).attr('fill', props.barHoverColours ? props.barHoverColours[degree] : barColourHoverMap[degree])
            }
        })
        .on('mouseout', function (d) {
            tooltip.style('visibility', 'hidden')
            const degree = d.srcElement.__data__.degree
            if (isIntensityType(degree)) {
                d3.select(this).attr('fill', props.barColours ? props.barColours[degree] : barColourMap[degree])
            }
        })

    const gx = svg.append('g')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.select('.domain').remove())

    const gy = svg.append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => y.toString()))
        .call(yAxis)
        .call(g => g.select('.domain').remove())
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