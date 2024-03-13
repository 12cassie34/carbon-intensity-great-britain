<script setup lang='ts'>
import { format } from 'date-fns'

import { FULL_DATE_FORMAT } from '../utlis'

const { customClasses, date } = defineProps<{
    customClasses?: string,
    date: Date,
    handleUpdateDate: (date: Date) => void
}>()
</script>

<template>
    <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon='i-heroicons-calendar-days-20-solid' :label="format(date, FULL_DATE_FORMAT)" />

        <template #panel='{ close }'>
            <DatePicker v-bind='date' @update:model-value='handleUpdateDate' @close='close' />
        </template>
    </UPopover>
</template>