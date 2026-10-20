import axios from "axios";
import { initialBooks } from "./mockData.js";

// URL проекта на mockapi.io (когда создашь проект на mockapi.io, просто вставь свой URL сюда)
// Например: export const MOCKAPI_BASE_URL = "https://6600abcde.mockapi.io/api/v1";
export const MOCKAPI_BASE_URL = "https://6ad67c77f71f154ac486daeb.mockapi.io/api";

// Создаем инстанс axios по техническому требованию ТЗ
export const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const STORAGE_BOOKS_KEY = "chitalna_books_v1";

function getLocalBooks() {
  const saved = localStorage.getItem(STORAGE_BOOKS_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return initialBooks;
  }
}

function saveLocalBooks(books) {
  localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(books));
}

export const bookService = {
  // GET: Получение всех книг с фильтрацией и поиском
  async getBooks(params = {}) {
    if (MOCKAPI_BASE_URL) {
      try {
        const response = await apiClient.get("/books", { params });
        if (Array.isArray(response.data) && response.data.length > 0) {
          return response.data;
        }
      } catch (err) {
        console.warn("MockAPI ресурс пока не создан или пуст, используется локальный источник:", err.message);
      }
    }

    // Имитация сети с задержкой для отработки состояния loading по ТЗ
    await new Promise((resolve) => setTimeout(resolve, 350));
    let books = getLocalBooks();

    if (params.search) {
      const q = params.search.toLowerCase().trim();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    if (params.genres && params.genres.length > 0) {
      books = books.filter((b) => params.genres.includes(b.category));
    }

    if (params.authors && params.authors.length > 0) {
      books = books.filter((b) => params.authors.includes(b.author));
    }

    if (params.rating) {
      books = books.filter((b) => b.rating >= params.rating);
    }

    return books;
  },

  // GET: Получение книги по ID (динамический роутинг /book/:id)
  async getBookById(id) {
    if (MOCKAPI_BASE_URL) {
      try {
        const response = await apiClient.get(`/books/${id}`);
        if (response.data) return response.data;
      } catch (err) {
        console.warn("MockAPI getBookById fallback:", err.message);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
    const books = getLocalBooks();
    const book = books.find((b) => String(b.id) === String(id));
    if (!book) {
      // Имитируем ошибку сервера (например, 404) по ТЗ
      throw new Error(`Книга с ID #${id} не найдена в базе`);
    }
    return book;
  },

  // POST: Добавление отзыва (операция POST по ТЗ)
  async addReview(bookId, reviewData) {
    if (MOCKAPI_BASE_URL) {
      const response = await apiClient.post(`/books/${bookId}/reviews`, reviewData);
      return response.data;
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const books = getLocalBooks();
    const book = books.find((b) => String(b.id) === String(bookId));
    if (!book) throw new Error("Книга не найдена");

    const newReview = {
      id: Date.now(),
      author: reviewData.author || "Читатель",
      date: reviewData.date || "Сегодня",
      rating: reviewData.rating || 5,
      text: reviewData.text,
    };

    if (!book.reviewsList) book.reviewsList = [];
    book.reviewsList.unshift(newReview);
    book.reviews = (book.reviews || 0) + 1;
    book.reviewsCount = (book.reviewsCount || 0) + 1;

    saveLocalBooks(books);
    return newReview;
  },

  // PUT: Обновление статуса чтения
  async updateReadingStatus(bookId, status) {
    if (MOCKAPI_BASE_URL) {
      const response = await apiClient.put(`/books/${bookId}`, { readingStatus: status });
      return response.data;
    }

    const books = getLocalBooks();
    const book = books.find((b) => String(b.id) === String(bookId));
    if (book) {
      book.readingStatus = status;
      saveLocalBooks(books);
    }
    return book;
  },
};

export default bookService;
