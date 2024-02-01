import type { PageMeta } from "nuxt/app"
import type { NuxtPage } from "nuxt/schema"
import { public_page } from "./constants/public-page.const";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  hooks: {
    'pages:extend'(pages) {


      const inprotected_pages: string[] = [];
      console.log("protecting page...");
      // set middleware on build time to increse speed
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          const meta: PageMeta = page.meta || {};

          if (page.name) {
            if (!public_page.includes(page.name)) {
              meta.middleware = ['auth']
            } else {
              inprotected_pages.push(page.name)
            }
          }

          page.meta = meta;

          if (page.children) setMiddleware(page.children)
        }
      }
      setMiddleware(pages)

      if (inprotected_pages.length > 0)
        console.log("pages protected exclude", inprotected_pages);
    }
  },
  modules: [
    'vuetify-nuxt-module',
    '@pinia/nuxt'
  ],
  vuetify: {
    // default mockup and theme
    vuetifyOptions: {
      defaults: {
        VTextField: {
          variant: 'outlined'
        },
        VTextarea: {
          variant: 'outlined'
        }
      }
    }
  },
  devtools: { enabled: true },
})
