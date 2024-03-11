import { defineStore } from 'pinia'

interface UserPayloadInterface {
  username: string,
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userName: '',
    authenticated: false,
    loading: false,
  }),
  actions: {
    async logUserIn({ username, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      })
      this.loading = pending

      if (data.value) {
        const token = useCookie('token')
        const userName = useCookie('userName')
        token.value = data?.value?.token
        userName.value = data?.value?.username

        this.authenticated = true
        this.userName = data?.value?.username
      }
    },
    logUserOut() {
      const token = useCookie('token')
      const userName = useCookie('userName')
      token.value = null
      userName.value = ''

      this.authenticated = false
      this.userName = ''
    },
  },
})