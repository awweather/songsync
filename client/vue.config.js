module.exports = {
  outputDir: "C:\\Users\\adub\\Documents\\GitHub\\express-vue\\server\\public",
  devServer: {
    // proxy: "http://localhost:5000"
    proxy: {
      "/auth": {
        target: "http://localhost:5000"
      },
      "/oauth": {
        target: "http://localhost:8888"
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
