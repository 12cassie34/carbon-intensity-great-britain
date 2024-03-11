<script setup lang='ts'>
definePageMeta({
    layout: 'login'
})

const { logUserIn } = useAuthStore()
const { authenticated } = storeToRefs(useAuthStore())

const userName = ref('')
const password = ref('')

if (authenticated.value) {
    await navigateTo('/')
}

const handleLogin = async () => {
    await logUserIn({ username: userName.value, password: password.value })

    if (authenticated.value) {
        await navigateTo('/')
    }
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen w-full">
        <UCard class="md:w-1/3">
            <div class="[&>*+*]:mt-4">
                <div>
                    <h1 class="font-bold text-green-600 text-3xl">Carbon Intensity in <br />Great Britain</h1>
                    <h2 class="text-green-400 text-2xl font-semibold">Login</h2>
                </div>
                <form>
                    <div>
                        <label class="text-green-600 text-sm">Account Name</label>
                        <UInput v-model="userName" />
                    </div>
                    <div>
                        <label class="text-green-600 text-sm">Password</label>
                        <UInput v-model="password" type="password" />
                    </div>
                </form>
                <UButton @click.prevent="handleLogin" class="w-full flex justify-center">Start Your Discovery</UButton>
            </div>
        </UCard>
    </div>
</template>