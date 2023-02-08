import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { router } from "./app/routes/book.js";

export const app = express();

app.use(cors({ origin: "http://localhost:8000" }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/books", router);

app.get("/", (req, res) =>
	res.json({ message: "Welcome to backend of books project" })
);

const port = 8000;

app.listen(port, () => console.log("Server is running on port " + port));
