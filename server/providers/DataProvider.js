const mongodb = require("mongodb");

module.exports = {
  async getClient() {
    if (process.env.NODE_ENV === "production") {
      return await mongodb.MongoClient.connect(
        "mongodb+srv://awweather:NOuHg9S4fWNYdDbE@cluster0-eqqtu.azure.mongodb.net/test?retryWrites=true&w=majority",
        {
          useNewUrlParser: true
        }
      );
    } else {
      return await mongodb.MongoClient.connect("mongodb://localhost", {
        useNewUrlParser: true
      });
    }
  },
  async getUsers() {
    var client = await this.getClient();
    return client.db(process.env.DB_NAME).collection("users");
  }
};
