module.exports = {
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
    database: {
        name: 'vue-express'
    }
}