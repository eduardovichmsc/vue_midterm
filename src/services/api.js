import axios from "axios";
import { initialBooks } from "./mockData.js";

export const MOCKAPI_BASE_URL = "https://6ad67c77f71f154ac486daeb.mockapi.io/api";

export const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const STORAGE_BOOKS_KEY = "chitalna_books_v2";

function getLocalBooks() {
  const saved = localStorage.getItem(STORAGE_BOOKS_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length >= initialBooks.length) {
      return parsed;
    }
    localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  } catch {
    return initialBooks;
  }
}

function saveLocalBooks(books) {
  localStorage.setItem(STORAGE_BOOKS_KEY, JSON.stringify(books));
}

export const bookService = {
  async getBooks(params = {}) {
    let books = [];

    if (MOCKAPI_BASE_URL) {
      try {
        const response = await apiClient.get("/books");
        if (Array.isArray(response.data) && response.data.length > 0) {
          books = response.data;
        }
      } catch (err) {
        console.warn("MockAPI ресурс недоступен, используется локальный источник:", err.message);
      }
    }

    if (!books || books.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      books = getLocalBooks();
    }

    let filtered = [...books];

    if (params.search && params.search.trim()) {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(
        (b) =>
          (b.title && b.title.toLowerCase().includes(q)) ||
          (b.author && b.author.toLowerCase().includes(q)) ||
          (b.category && b.category.toLowerCase().includes(q)) ||
          (b.description && b.description.toLowerCase().includes(q)) ||
          (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    if (params.genres && params.genres.length > 0) {
      const selected = params.genres.map((g) => g.toLowerCase().trim());
      filtered = filtered.filter((b) => {
        const cat = (b.category || "").toLowerCase();
        const tags = Array.isArray(b.tags) ? b.tags.map((t) => t.toLowerCase()) : [];
        const specGenre = (b.specs || []).find((s) => s.label === "Жанр")?.value?.toLowerCase() || "";
        return selected.some(
          (g) => cat.includes(g) || g.includes(cat) || tags.some((t) => t.includes(g)) || specGenre.includes(g)
        );
      });
    }

    if (params.authors && params.authors.length > 0) {
      const selected = params.authors.map((a) => a.toLowerCase().trim());
      filtered = filtered.filter((b) => {
        const author = (b.author || "").toLowerCase();
        return selected.some((a) => {
          if (author.includes(a) || a.includes(author)) return true;
          const aWords = a.split(/\s+/).filter((w) => w.length > 2);
          const bWords = author.split(/\s+/).filter((w) => w.length > 2);
          return aWords.some((w) => bWords.includes(w));
        });
      });
    }

    if (params.rating && Number(params.rating) > 0) {
      const minRating = Number(params.rating);
      filtered = filtered.filter((b) => Number(b.rating) >= minRating);
    }

    if (params.languages && params.languages.length > 0) {
      filtered = filtered.filter((b) => {
        const bookLang = b.language || "Русский";
        return params.languages.includes(bookLang);
      });
    }

    return filtered;
  },

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
      throw new Error(`Книга с ID #${id} не найдена в базе`);
    }
    return book;
  },

  async addReview(bookId, reviewData) {
    const newReview = {
      id: Date.now(),
      author: reviewData.author || "Читатель",
      date: reviewData.date || "Сегодня",
      rating: Number(reviewData.rating) || 5,
      text: reviewData.text,
    };

    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: `Отзыв к книге #${bookId} от ${newReview.author}`,
        body: newReview.text,
        userId: 1,
      });
    } catch (postErr) {
      console.warn("REST POST log:", postErr.message);
    }

    let calculatedRating = Number(reviewData.rating) || 5;
    let totalReviewsCount = 1;

    if (MOCKAPI_BASE_URL) {
      try {
        const getRes = await apiClient.get(`/books/${bookId}`);
        const currentBook = getRes.data;
        const list = Array.isArray(currentBook.reviewsList)
          ? [...currentBook.reviewsList]
          : [];
        list.unshift(newReview);

        const totalScore = list.reduce(
          (sum, r) => sum + (Number(r.rating) || 5),
          0
        );
        calculatedRating = Number((totalScore / list.length).toFixed(1));
        totalReviewsCount = list.length;

        await apiClient.put(`/books/${bookId}`, {
          reviewsList: list,
          reviewsCount: totalReviewsCount,
          reviews: totalReviewsCount,
          rating: calculatedRating,
        });
      } catch (mockApiErr) {
        console.warn("MockAPI update review fallback:", mockApiErr.message);
      }
    }

    const books = getLocalBooks();
    const book = books.find((b) => String(b.id) === String(bookId));
    if (book) {
      if (!book.reviewsList) book.reviewsList = [];
      book.reviewsList.unshift(newReview);
      const totalScore = book.reviewsList.reduce(
        (sum, r) => sum + (Number(r.rating) || 5),
        0
      );
      calculatedRating = Number((totalScore / book.reviewsList.length).toFixed(1));
      totalReviewsCount = book.reviewsList.length;
      book.rating = calculatedRating;
      book.reviews = totalReviewsCount;
      book.reviewsCount = totalReviewsCount;
      saveLocalBooks(books);
    }

    return {
      ...newReview,
      newRating: calculatedRating,
      newReviewsCount: totalReviewsCount,
    };
  },

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
