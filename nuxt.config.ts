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
  ],

  primevue: {
    importTheme: { from: "@/mytheme.ts" },
  },
});
