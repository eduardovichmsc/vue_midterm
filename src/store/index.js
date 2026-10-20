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
    currentBook: null,
    loading: false,
    error: null,
    user: getSavedUser(),
    favorites: getSavedFavorites(),
    searchQuery: "",
    filters: {
      genres: [],
      authors: [],
      rating: 0,
    },
  },

  getters: {
    allBooks: (state) => state.books,
    isBookmarked: (state) => (id) => state.favorites.includes(String(id)),
    favoriteBooks: (state) =>
      state.books.filter((b) => state.favorites.includes(String(b.id))),
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
    error: (state) => state.error,
  },

  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
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
        const params = {
          search: state.searchQuery,
          genres: state.filters.genres,
          authors: state.filters.authors,
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
        const newReview = await bookService.addReview(bookId, review);
        if (state.currentBook && String(state.currentBook.id) === String(bookId)) {
          if (!state.currentBook.reviewsList) state.currentBook.reviewsList = [];
          state.currentBook.reviewsList.unshift(newReview);
          state.currentBook.reviewsCount = (state.currentBook.reviewsCount || 0) + 1;
        }
        return newReview;
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
