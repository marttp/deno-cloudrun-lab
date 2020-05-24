import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import * as bookService from './service.ts';
import { Book } from './types.ts';

/**
 * @description Get books by criteria search
 * @route Get /api/v1/books
 */
const getBooks = async (ctx: RouterContext) => {
  const books = await bookService.getBooksByCriteria({});
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: {
      items: books,
      totalItem: books.length,
    },
    message: 'GET books success',
  };
};

/**
 * @description Get book by id
 * @route Get /api/v1/books/:id
 */
const getBookById = async (ctx: RouterContext) => {
  const { id = '' } = ctx.params;
  try {
    const book: Book = await bookService.getBookById(id);
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      data: book,
      message: book ? 'GET book by id success' : 'Book not found',
    };
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      data: null,
      message: 'Id is invalid',
    };
  }
};

/**
 * @description Add book
 * @route POST /api/v1/books
 */
const addBook = async (ctx: RouterContext) => {
  const body = await ctx.request.body();
  if (!ctx.request.hasBody) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      data: null,
      message: 'No data',
    };
  }
  const book: Book = body.value;
  await bookService.addBook(book);
  ctx.response.status = 201;
  ctx.response.body = {
    success: true,
    data: null,
    message: 'Add new book success',
  };
};

/**
 * @description Update single book by id
 * @route PUT /api/v1/books/:id
 */
const updateBookById = async (ctx: RouterContext) => {
  const { id = '' } = ctx.params;
  const body = await ctx.request.body();
  if (!ctx.request.hasBody) {
    ctx.response.status = 404;
    ctx.response.body = {
      success: false,
      data: null,
      message: 'No data',
    };
  }
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        data: null,
        message: 'Book not found',
      };
    }
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      data: null,
      message: 'Id is invalid',
    };
  }
  const updateData: { name?: string; description?: string; price?: number } = body.value;
  await bookService.updateBook(id, updateData);
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: null,
    message: 'Update book success',
  };
};

/**
 * @description Delete single book by id
 * @route DELETE /api/v1/books/:id
 */
const deleteBookById = async (ctx: RouterContext) => {
  const { id = '' } = ctx.params;
  try {
    const book = await bookService.getBookById(id);
    if (!book) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        data: null,
        message: 'Book not found',
      };
    }
  } catch (error) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      data: null,
      message: 'Id is invalid',
    };
  }
  await bookService.deleteBook(id);
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: null,
    message: 'Deleted book success',
  };
};

export { getBooks, getBookById, addBook, updateBookById, deleteBookById };
