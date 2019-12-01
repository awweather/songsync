import * as bcrypt from "bcrypt";

class User {
  public username: string;
  public password: string;
  public email: string;
  public linkedAccounts: object;
  public createdAt: Date;
  
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.linkedAccounts = data.linkedAccounts;
    this.createdAt = data.createdAt;
  }

  async verifyPassword(providedPassword) {
    return await bcrypt.compareSync(providedPassword, this.password);
  }
}

export default User;
