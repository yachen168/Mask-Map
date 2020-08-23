module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/Mask-Map/" : "/",
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