
import { Book} from "../models/book.js";

export function create(req, res) {
	const book = {
	};

	Book.create(book)
		.then((data) => res.send(data))
		.catch((err) => console.error(err));
}

export function findAll(req, res) {
	Book.findAll().then((data) => res.send(data));
}

export function findOne(req, res) {
	const id = req.params.id;
	Book.findByPk(id).then((data) => res.send(data));
}

export function update(req, res) {
	const id = req.params.id;

	Book.update(req.body, { where: { id } }).then((data) => res.send(data));
}

export function remove(req, res) {
	const id = req.params.id;
	Book.destroy({ where: { id } }).then(() =>
		res.send({ message: "deleted book" })
	);
}

export function deleteAll(req, res) {
	Book.destroy({ where: {} }).then(() =>
		res.send({ message: "deleted all books" })
	);
}