<script setup lang='ts'>
definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <div class="[&>*+*]:mt-4">
        <SearchSingleDay />
        <SearchDayRange />
    </div>
</template>
