<script setup lang="ts">
import { sub, format, isSameDay, type Duration } from 'date-fns'

import { FULL_DATE_FORMAT } from '~/utlis';

const ranges = [
  { label: 'Last 7 days', duration: { days: 7 } },
  { label: 'Last 14 days', duration: { days: 14 } },
]

const dateRange = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })

const isRangeSelected = (duration: Duration) => {
  return isSameDay(dateRange.value.start, sub(new Date(), duration)) && isSameDay(dateRange.value.end, new Date())
}

const selectRange = (duration: Duration) => {
  dateRange.value = { start: sub(new Date(), duration), end: new Date() }
}

defineExpose({
    dateRange
})
</script>

<template>
  <UPopover :popper="{ placement: 'bottom-start' }">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(dateRange.start, FULL_DATE_FORMAT) }} - {{ format(dateRange.end, FULL_DATE_FORMAT) }}
    </UButton>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <div class="hidden sm:flex flex-col py-4">
          <UButton
            v-for="(range, index) in ranges"
            :key="index"
            :label="range.label"
            color="gray"
            variant="ghost"
            class="rounded-none px-6"
            :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
            truncate
            @click="selectRange(range.duration)"
          />
        </div>

        <DatePicker v-model="dateRange" @close="close" />
      </div>
    </template>
  </UPopover>
</template>

