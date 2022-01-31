// import dotenv from 'dotenv'
// dotenv.config()
require('dotenv').config()
const env = process.env.NODE_ENV || 'development'

const environmnetConfigs = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: process.env.BASE_URL,
  },
}

const config = environmnetConfigs[env]
// export default config
module.exports = config
