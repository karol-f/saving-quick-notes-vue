module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/saving-quick-notes-vue/" : "/",
  outputDir: "docs",
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/styles/_variables.scss";'
      }
    },
    sourceMap: true
  }
};
