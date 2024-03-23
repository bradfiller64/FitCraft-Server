import { Sequelize } from "sequelize";

const dbName = 'fitcraft';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

export const db = sequelize;
