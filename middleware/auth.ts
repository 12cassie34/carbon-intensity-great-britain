export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated, userName: stateUserName } = storeToRefs(useAuthStore())

    const token = useCookie('token')
    const userName = useCookie('userName')

    if (token.value && userName.value) {
        authenticated.value = true
        stateUserName.value = userName.value
    }

    if (!authenticated.value) {
        return navigateTo('/login')
    }
})