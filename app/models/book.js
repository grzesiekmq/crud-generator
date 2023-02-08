import { Sequelize, DataTypes } from "sequelize";

import { db } from "../config/db.js";

const { name, user, password, host, dialect } = db;
const { max, min, acquire, idle } = db.pool;
const sequelize = new Sequelize(name, user, password, {
	host,
	dialect,
	pool: {
		max,
		min,
		acquire,
		idle,
	},
});

sequelize.authenticate().then(() => console.log("connected"));

export const Book = sequelize.define("book", {
	name: {
		type: DataTypes.STRING 
	} 
});

sequelize
	.sync()
	.then(() => console.log("table book created"))
	.catch((err) => console.error(err));
