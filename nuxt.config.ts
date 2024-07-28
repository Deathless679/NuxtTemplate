// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default defineNuxtConfig({
    devtools: {enabled: true},
    css: ['~/assets/scss/base.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import "~/assets/scss/mixins.scss";
                        @import "~/assets/scss/var.scss";
                    `,
                },
            },
        },
    },
    modules: ['nuxt-viewport', '@pinia/nuxt'],
    viewport: {
        breakpoints: {
            desktop: 1200,
            mobile: 576,
            from: 0,
            tabletSmall: 768,
            tablet: 1024,
        },
    }
})
