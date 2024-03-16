import { Sequelize } from "sequelize";

const db = new Sequelize("postgres://postgres:admin@localhost:5432/films");

export default db;
