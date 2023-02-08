export const db = {
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
