import { defineStore } from 'pinia'

import { isPageRouteName, type PageRoutes } from '~/utlis'

interface UserPayloadInterface {
  username: string,
  password: string
}

type AuthPageOrg = Record<PageRoutes, string[]>

const dummyPageAuth: Record<string, AuthPageOrg> = {
    'atuny0': {
        'search-historical-data': ['Capitol University', 'Stavropol State Technical University'],
        'carbon-generation-from': ['Capitol University']
    },
    'hbingley1': {
        'search-historical-data': ['Stavropol State Technical University'],
        'carbon-generation-from': []
    },
    'rshawe2': {
        'search-historical-data': [],
        'carbon-generation-from': []
    }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userName: '',
    authenticated: false,
    loading: false,
    authPagesWithOrgs: {} as AuthPageOrg
  }),
  persist: true,
  getters: {
    authPages: (state) => {
        return Object.keys(state.authPagesWithOrgs).filter(page => {
            if (isPageRouteName(page)) {
                return state.authPagesWithOrgs[page].length
            }
        }) || []
    }
  },
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
        token.value = data?.value?.token

        this.authenticated = true
        this.userName = data.value.username
        this.authPagesWithOrgs = dummyPageAuth[data.value.username] || {}

        await navigateTo('/')
      }
    },
    logUserOut() {
      const token = useCookie('token')
      token.value = null

      this.authenticated = false
      this.userName = ''
      this.authPagesWithOrgs = {} as AuthPageOrg
    },
  },
})