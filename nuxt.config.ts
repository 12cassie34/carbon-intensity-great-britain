// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/image"
  ],
  devtools: { enabled: true },
  ui: {
    icons: ['carbon', 'heroicons']
  }
})