// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-icon', '@nuxtjs/supabase'],
  ssr: false,

  nitro: {
    static: true,
    prerender: {
      crawlLinks: true
    }
  },

  supabase: {
    redirect: false
  },

  css: ['@/assets/main.less'],

  build: {
    transpile: [
      'nuxt-icon'
    ]
  },

  app: {
    baseURL: '/agmm/',
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/modern-css-reset/dist/reset.min.css' },
        { rel: 'stylesheet', href: './reset.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap' }
      ]
    }
  },

  compatibilityDate: '2024-07-19'
})