import { NextFunction, Request, Response } from "express";
import Author from "../../models/Author";
import Category from "../../models/Category";
import Book from "../../models/Book";

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.find().populate("author").populate("categories");
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("categories");
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, categories } = req.body;
    const image = req.file ? req.file.path : undefined;

    const book = await Book.create({ title, author, categories });

    const foundAuthor = await Author.findById(author);
    if (!foundAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }
    foundAuthor.books.push(book._id);
    await foundAuthor.save();

    if (categories && categories.length > 0) {
      for (const categoryId of categories) {
        const foundCategory = await Category.findById(categoryId);
        if (foundCategory) {
          foundCategory.books.push(book._id);
          await foundCategory.save();
        }
      }
    }

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
