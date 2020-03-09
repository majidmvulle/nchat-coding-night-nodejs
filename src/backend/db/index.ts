import {Sequelize} from 'sequelize';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'database.js'))[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

