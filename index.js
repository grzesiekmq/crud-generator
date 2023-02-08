import fs from "fs";
import process from "process";

const entity = process.argv[2];

fs.mkdirSync("./app");

const ctrls = "./app/controllers/";
const routes = "./app/routes/";
const models = "./app/models/";
const config = "./app/config/";

fs.mkdirSync(ctrls);
fs.mkdirSync(models);
fs.mkdirSync(config);
fs.mkdirSync(routes);

const serverFile = `import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router } from "./app/routes/${entity}.js";

export const app = express();

app.use(cors({ origin: "http://localhost:8000" }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/${entity}s", router);

app.get("/", (req, res) =>
	res.json({ message: "Welcome to backend of ${entity}s project" })
);

const port = 8000;

app.listen(port, () => console.log("Server is running on port " + port));
`;

const entityCtrlFile = `
import { ${
	entity[0].toUpperCase() + entity.slice(1)
}} from "../models/${entity}.js";

export function create(req, res) {
	const ${entity} = {
	};

	${entity[0].toUpperCase() + entity.slice(1)}.create(${entity})
		.then((data) => res.send(data))
		.catch((err) => console.error(err));
}

export function findAll(req, res) {
	${
		entity[0].toUpperCase() + entity.slice(1)
	}.findAll().then((data) => res.send(data));
}

export function findOne(req, res) {
	const id = req.params.id;
	${
		entity[0].toUpperCase() + entity.slice(1)
	}.findByPk(id).then((data) => res.send(data));
}

export function update(req, res) {
	const id = req.params.id;

	${
		entity[0].toUpperCase() + entity.slice(1)
	}.update(req.body, { where: { id } }).then((data) => res.send(data));
}

export function remove(req, res) {
	const id = req.params.id;
	${
		entity[0].toUpperCase() + entity.slice(1)
	}.destroy({ where: { id } }).then(() =>
		res.send({ message: "deleted ${entity}" })
	);
}

export function deleteAll(req, res) {
	${entity[0].toUpperCase() + entity.slice(1)}.destroy({ where: {} }).then(() =>
		res.send({ message: "deleted all ${entity}s" })
	);
}`;

const entityRouteFile = `
import express from "express";

import {
	create,
	findAll,
	findOne,
	update,
	remove,
	deleteAll,
} from "../controllers/${entity}.js";
import { app } from "../../server.js";
export const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.delete("/", deleteAll);
`;

const entityModelFile = `import { Sequelize, DataTypes } from "sequelize";

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

export const ${
	entity[0].toUpperCase() + entity.slice(1)
} = sequelize.define("${entity}", {
	name: {
		type: DataTypes.STRING 
	} 
});

sequelize
	.sync()
	.then(() => console.log("table ${entity} created"))
	.catch((err) => console.error(err));
`;

const dbConfigFile = `export const db = {
	host: "localhost",
	user: "postgres",
	password: "test",
	name: "postgres",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
`;

const arr = [
	{ path: ctrls, file: entityCtrlFile },
	{ path: routes, file: entityRouteFile },
	{ path: models, file: entityModelFile },
];

function generate() {
	arr.forEach((obj) => {
		fs.writeFile(obj.path + entity + ".js", obj.file, (err) => {

		});
	});
}

function generateServer() {
	fs.writeFile("./server.js", serverFile, () => {});
}

function generateDbConfig() {
	fs.writeFile(config + "db.js", dbConfigFile, () => {});
}

generate();
generateServer();
generateDbConfig();

console.log("generated crud successfuly");
