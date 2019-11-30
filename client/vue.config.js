module.exports = {
  outputDir: "C:\\Users\\adub\\Documents\\GitHub\\express-vue\\server\\public",
  devServer: {
    proxy: {
      "/auth/*": {
        target: "http://localhost:8888/",
        ws: true,
        changeOrigin: true
      },
      "/search/*": {
        target: "http://localhost:8888/",
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
