module.exports = {
  lintOnSave: 'warning',
  assetsDir: 'static',
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  chainWebpack: config => {
    config.module.rule('vue').exclude.add(/snippets\/.*$/)

    config.module
      .rule('snippets')
      .test(/snippets\/.*$/)
      .use('snippet')
        .loader('./snippet-loader')
        .end()
  }
}
