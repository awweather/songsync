class User {
    
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.email = data.email;
        this.linkedAccounts = data.linkedAccounts;
        this.createdAt = data.createdAt; 
    }
}

module.exports = User;