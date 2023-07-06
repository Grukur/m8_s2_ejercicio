import Sequelize from 'sequelize'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let dialectOptions = null

if (process.env.NODE_ENV.includes('development')) {
  dotenv.config({
    path: path.resolve(__dirname, '../../.env')
  })
} else {
  dotenv.config({
    path: path.resolve(__dirname, `../../.env.production`)
  })
  dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

let database = process.env.DB_DATABASE;
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;

console.log(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.NODE_ENV)

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 5000,
    },
    dialectOptions,
    dialectModule: pg,
});

export default sequelize;

