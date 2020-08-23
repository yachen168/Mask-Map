module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Task-Map/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/main.scss";
          `
      }
    }
  }
};
