import { config } from 'dotenv'

config()

export const Configure = {
  mysql: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE
    }
  }
}
