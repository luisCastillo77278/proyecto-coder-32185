import KnexConfig from 'knex'
import { Configure } from './config.js'

export const clientSql = new KnexConfig(Configure.mysql)
