import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
  ],

  runtimeConfig: {
    DATA_STORAGE_API: process.env.DATA_STORAGE_API,
    JWT_SECRET_KET: process.env.JWT_SECRET_KET,
  },

  primevue: {
    importTheme: { from: "@/mytheme.ts" },
  },
});
