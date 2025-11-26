import { NextFunction, Request, Response } from "express";
import Author from "../../models/Author";

const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find().populate("books");
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = (await Author.findById(req.params.id)).populated("books");
    if (!author) {
      return res.status(404).json("Author not found :(");
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) {
      return res.status(404).json("Author not found :c");
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};
const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json("Author not found");
    }
    res.status(200).json("Author deleted successfully");
  } catch (error) {
    next(error);
  }
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
