class LinkedAccount {
    
    constructor(data) {
        this.profile = data.username;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
    }
}

module.exports = LinkedAccount;