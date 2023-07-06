import Sequelize from 'sequelize'
import * as path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import pg from 'pg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let dialectOptions = null

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(__dirname, '../../.env')
  })
} else {
  dotenv.config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`)
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

const sequelize = new Sequelize(database, username, password, {
    host: host,
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

