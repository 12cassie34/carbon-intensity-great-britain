<script setup lang='ts'>
const isOpen = ref(true)

const { authPages } = useAuthStore()

const handleRedirect = async () => {
    await navigateTo(`/${(authPages && authPages.length) ? authPages[0] : ''}`)
}
</script>

<template>
    <UModal v-model="isOpen" prevent-close>
        <div class="grid md:grid-cols-2">
            <NuxtImg src="/dog-too-far.jpg" />
            <div class="p-4 bg-white">
                <h2 class="text-2xl text-green-500 font-bold mb-4">Opps!</h2>
                <p class="text-green-900">It seems that you've gone too far.</p>
                <p class="text-green-900">Let's return to the nearest page!</p>
                <UButton @click.prevent="handleRedirect" class="block mt-8 float-right">Take Me Home</UButton>
            </div>
        </div>
    </UModal>
</template>