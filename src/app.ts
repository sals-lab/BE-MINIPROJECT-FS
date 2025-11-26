import express from "express";
import connectDB from "./database";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler";
import authorsRouter from "./api/authors/authors.router";
import categoriesRouter from "./api/categories/categories.router";
import booksRouter from "./api/books/books.router";

dotenv.config();

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes will go here
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/categories", categoriesRouter);

app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
