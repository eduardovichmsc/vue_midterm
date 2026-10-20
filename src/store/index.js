import { createStore } from "vuex";
import bookService from "../services/api";

const STORAGE_USER_KEY = "chitalna_user";
const STORAGE_FAVS_KEY = "chitalna_favorites";

function getSavedUser() {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getSavedFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_FAVS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default createStore({
  state: {
    books: [],
    allCatalogBooks: [],
    currentBook: null,
    loading: false,
    error: null,
    user: getSavedUser(),
    favorites: getSavedFavorites(),
    searchQuery: "",
    filters: {
      genres: [],
      authors: [],
      languages: [],
      rating: 0,
    },
  },

  getters: {
    allBooks: (state) => state.books,
    allCatalogBooks: (state) => state.allCatalogBooks,
    allGenres: (state) => {
      const source = state.allCatalogBooks.length ? state.allCatalogBooks : state.books;
      const fromBooks = source.map((b) => b.category?.trim()).filter(Boolean);
      return Array.from(new Set(fromBooks)).sort((a, b) => a.localeCompare(b, "ru"));
    },
    allAuthors: (state) => {
      const source = state.allCatalogBooks.length ? state.allCatalogBooks : state.books;
      const fromBooks = source.map((b) => b.author?.trim()).filter(Boolean);
      return Array.from(new Set(fromBooks)).sort((a, b) =>
        a.localeCompare(b, "ru")
      );
    },
    isBookmarked: (state) => (id) => state.favorites.includes(String(id)),
    favoriteBooks: (state) => {
      const source = state.allCatalogBooks.length ? state.allCatalogBooks : state.books;
      const favIds = state.favorites.map(String);
      return source.filter((b) => favIds.includes(String(b.id)));
    },
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_ALL_CATALOG_BOOKS(state, books) {
      state.allCatalogBooks = books;
    },
    SET_CURRENT_BOOK(state, book) {
      state.currentBook = book;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    TOGGLE_FAVORITE(state, bookId) {
      const id = String(bookId);
      const index = state.favorites.indexOf(id);
      if (index === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(state.favorites));
    },
    SET_USER(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_USER_KEY);
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_FILTERS(state, filters) {
      state.filters = { ...state.filters, ...filters };
    },
  },

  actions: {
    async fetchBooks({ commit, state }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        if (!state.allCatalogBooks.length) {
          const rawAll = await bookService.getBooks({});
          commit("SET_ALL_CATALOG_BOOKS", rawAll);
        }

        const params = {
          search: state.searchQuery,
          genres: state.filters.genres,
          authors: state.filters.authors,
          languages: state.filters.languages,
          rating: state.filters.rating,
        };
        const books = await bookService.getBooks(params);
        commit("SET_BOOKS", books);
      } catch (err) {
        commit("SET_ERROR", err.message || "Ошибка загрузки книг");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchBookById({ commit }, id) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const book = await bookService.getBookById(id);
        commit("SET_CURRENT_BOOK", book);
        return book;
      } catch (err) {
        commit("SET_ERROR", err.message || "Ошибка загрузки книги");
        throw err;
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async addReview({ commit, state }, { bookId, review }) {
      try {
        const result = await bookService.addReview(bookId, review);
        const savedReview = {
          id: result.id,
          author: result.author,
          date: result.date,
          rating: result.rating,
          text: result.text,
        };

        if (state.currentBook && String(state.currentBook.id) === String(bookId)) {
          if (!state.currentBook.reviewsList) state.currentBook.reviewsList = [];
          state.currentBook.reviewsList.unshift(savedReview);
          if (result.newRating !== undefined) {
            state.currentBook.rating = result.newRating;
          }
          if (result.newReviewsCount !== undefined) {
            state.currentBook.reviewsCount = result.newReviewsCount;
            state.currentBook.reviews = result.newReviewsCount;
          }
        }

        const inCatalog = state.books.find((b) => String(b.id) === String(bookId));
        if (inCatalog) {
          if (result.newRating !== undefined) inCatalog.rating = result.newRating;
          if (result.newReviewsCount !== undefined) {
            inCatalog.reviewsCount = result.newReviewsCount;
            inCatalog.reviews = result.newReviewsCount;
          }
        }

        return savedReview;
      } catch (err) {
        commit("SET_ERROR", err.message || "Ошибка отправки отзыва");
        throw err;
      }
    },

    async setReadingStatus({ commit }, { bookId, status }) {
      return await bookService.updateReadingStatus(bookId, status);
    },

    toggleBookmark({ commit }, bookId) {
      commit("TOGGLE_FAVORITE", bookId);
    },

    login({ commit }, userData) {
      commit("SET_USER", userData);
    },

    logout({ commit }) {
      commit("SET_USER", null);
    },
  },
});
