// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-06",
  devtools: { enabled: false },
  modules: ["nuxt-icon"],
  ssr: false,

  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,
    },
  },
  runtimeConfig: {
    public: {
      apikey: process.env.NUXT_APIKEY,
      authdomain: process.env.NUXT_AUTHDOMAIN,
      databaseurl: process.env.NUXT_DATABASEURL,
      projectid: process.env.NUXT_PROJECTID,
      storagebucket: process.env.NUXT_STORAGEBUCKET,
      messagingsenderid: process.env.NUXT_MESSAGINGSENDERID,
      appid: process.env.NUXT_APPID,
      measurementid: process.env.NUXT_MEASUREMENTID,
    },
  },

  css: ["@/assets/main.less"],

  build: {
    transpile: ["nuxt-icon"],
  },

  app: {
    baseURL: "/agmm/",
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "Foursquare Jebako" },
        { property: "og:title", content: "Jebako AGMM 2025" },
        {
          property: "og:description",
          content: "Members only access. You can vote only once.",
        },
        { property: "og:image", content: "/banner.jpg" },
      ],
      link: [
        { rel: "icon", title: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://unpkg.com/modern-css-reset/dist/reset.min.css",
        },
        { rel: "stylesheet", href: "./reset.css" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap",
        },
      ],
    },
  },
});
