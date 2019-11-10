module.exports = {
  outputDir: "C:\\Users\\adub\\Documents\\GitHub\\express-vue\\server\\public",
  devServer: {
    proxy: {
      "/auth/*": {
        target: "http://localhost:8888/"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
