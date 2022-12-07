import knexConfig from 'knex'
import { Configure } from "./config.js";

export const clientSql = new knexConfig(Configure.mysql)