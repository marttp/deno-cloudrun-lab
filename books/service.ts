import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";
import bookModel from '../models/book.model.ts';
import { Book } from './types.ts';

export const getBooksByCriteria = async (criteria: any) => {
  const books = await bookModel.find(criteria);
  return books;
};

export const getBookById = async (id: string) => {
    const book = await bookModel.findOne({ _id: ObjectId(id) });
    return book;
}

export const addBook = async (book: Book) => {
    return await bookModel.insertOne(book);
}

export const updateBook = async (id: string, book: Book) => {
    return await bookModel.updateOne({ _id: ObjectId(id) }, book);
}

export const deleteBook = async (id: string) => {
    return await bookModel.deleteOne({ _id: ObjectId(id) });
}