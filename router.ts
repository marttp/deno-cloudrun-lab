import { Router } from 'https://deno.land/x/oak/mod.ts';

import {
  getBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById,
} from './books/controller.ts';

const router = new Router();

router.get('/api/v1/books', getBooks);
router.get('/api/v1/books/:id', getBookById);
router.post('/api/v1/books', addBook);
router.put('/api/v1/books/:id', updateBookById);
router.delete('/api/v1/books/:id', deleteBookById);

export default router;
