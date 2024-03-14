import { isPageRouteName } from "~/utlis"

export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated, authPagesWithOrgs } = storeToRefs(useAuthStore())

    const token = useCookie('token')

    if (token.value) {
        authenticated.value = true
    }

    if (!authenticated.value) {
        return navigateTo('/login')
    }

    const toPageName = to.name
    if (isPageRouteName(toPageName) && to.path !== '/') {
        if (!authPagesWithOrgs.value[toPageName]) {
            return navigateTo('/unauthorised-redirect')
        }
        if (authPagesWithOrgs.value[toPageName] && !authPagesWithOrgs.value[toPageName].length) {
            return navigateTo('/unauthorised-redirect')
        }
    }
})