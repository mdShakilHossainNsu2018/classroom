const { VueLoaderPlugin } = require('vue-loader')

module.exports = {



  "transpileDependencies": [
    "vuetify"
  ],
  "devServer": {
    "disableHostCheck": true
  },

  // chainWebpack: config => {
  //   config.module
  //       .rule('vue')
  //       .use('vue-loader')
  //       .tap(options => {
  //         // modify the options...
  //         return options
  //       })
  // },

  configureWebpack: {
    devServer: {
      port: 8080,
      // https://github.com/vuejs-templates/webpack/issues/378
      watchOptions: {
        poll: true,
      },
    },

    plugins: [
      // make sure to include the plugin for the magic
      new VueLoaderPlugin()
    ],
  }
}
