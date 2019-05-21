module.exports = {
  //spaで動かす
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "pantvoicemaker-web",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: ["nuxt-buefy", "@nuxtjs/toast", "@nuxtjs/google-analytics"],
  css: ["assets/css/buefy.scss"],
  toast: {
    position: "bottom-center",
    register: [
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error"
        }
      }
    ],
    duration: 3000
  },
  "google-analytics": {
    id: "UA-140579929-1"
  }
};
