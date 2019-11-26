const bcrypt = require("bcrypt");

class User {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.linkedAccounts = data.linkedAccounts;
    this.createdAt = data.createdAt;
    this.accessToken = data.accessToken;
  }

  async verifyPassword(providedPassword) {
    return await bcrypt.compareSync(providedPassword, this.password);
  }
}

module.exports = User;
