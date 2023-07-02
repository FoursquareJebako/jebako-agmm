// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://unpkg.com/modern-css-reset/dist/reset.min.css' }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Noto+Sans': [400, 700],
    }
  }
})
