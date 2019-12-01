import * as mongodb from "mongodb";

class DataProvider {
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
  }

  async getUsers() {
      const client = await this.getClient();
      return client.db(process.env.DB_NAME).collection("users");
  }
}

export default new DataProvider();
