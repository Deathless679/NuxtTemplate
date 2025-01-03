export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: true },
  css: ['~/assets/scss/base.scss'],

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

  modules: ['nuxt-viewport', '@pinia/nuxt', '@nuxt/eslint'],

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

  compatibilityDate: '2025-01-03',
});