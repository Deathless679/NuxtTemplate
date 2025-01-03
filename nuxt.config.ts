export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: true },
  css: ['~/assets/scss/base.scss'],
  modules: ['nuxt-viewport', '@pinia/nuxt', '@nuxt/eslint', '@nuxtjs/seo'],
  runtimeConfig: {
    app: {
      baseUrl: process.env.API_URL
    },
  },

  app: {
    head: {
      title: 'NuxtTemplate',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

  site: {
    url: process.env.API_URL,
    name: 'Name',
    description: 'description',
    defaultLocale: 'ru',
    trailingSlash: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          additionalData: `
                        @use "~/assets/scss/mixins.scss" as *;
                        @use "~/assets/scss/var.scss" as *;
                    `,
        },
      },
    },
  },

  eslint: {
    checker: false,
  },

  viewport: {
    breakpoints: {
      desktop: 1200,
      mobile: 576,
      from: 0,
      tabletSmall: 768,
      tablet: 1024,
    },
  },

  devServer: {
    port: 679,
  },

  imports: {
    dirs: [
      'composables',
    ],
  },

  compatibilityDate: '2025-01-03',
});