<script setup>
import BookCard from "@/components/common/book-card.vue";
import Breadcrumbs from "@/components/common/breadcrumbs.vue";
import Container from "@/components/layout/container.vue";
import CatalogFilters from "@/pages/catalog/components/filters.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const activeTab = ref(
  route.query.filter === "favorites" || route.name === "favorites"
    ? "favorites"
    : "all"
);

const breadcrumbs = computed(() => {
  if (activeTab.value === "favorites") {
    return [
      { label: "Главная", href: "/" },
      { label: "Каталог", href: "/catalog" },
      { label: "Избранное" },
    ];
  }
  return [{ label: "Главная", href: "/" }, { label: "Каталог" }];
});

const currentPage = ref(1);
const pageSize = 12;

const displayedBooks = computed(() => {
  if (activeTab.value === "favorites") {
    return store.getters.favoriteBooks;
  }
  return store.getters.allBooks;
});

const loading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.error);

const totalPages = computed(() =>
  Math.ceil((displayedBooks.value || []).length / pageSize) || 1
);

const paginatedBooks = computed(() => {
  const list = displayedBooks.value || [];
  const start = (currentPage.value - 1) * pageSize;
  return list.slice(start, start + pageSize);
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (currentPage.value <= 3) {
    return [1, 2, 3, 4];
  }
  if (currentPage.value >= total - 2) {
    return [total - 3, total - 2, total - 1, total];
  }
  return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
});

const setPage = (p) => {
  if (p < 1 || p > totalPages.value) return;
  currentPage.value = p;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const setTab = (tab) => {
  activeTab.value = tab;
  currentPage.value = 1;
  if (tab === "favorites") {
    router.replace({ path: "/catalog", query: { filter: "favorites" } });
  } else {
    router.replace({ path: "/catalog" });
  }
};

watch(
  () => route.query.filter,
  (newFilter) => {
    activeTab.value = newFilter === "favorites" ? "favorites" : "all";
    currentPage.value = 1;
  }
);

onMounted(() => {
  store.dispatch("fetchBooks");
});

watch(
  () => store.state.searchQuery,
  () => {
    currentPage.value = 1;
    store.dispatch("fetchBooks");
  }
);

const handleApplyFilters = (filters) => {
  currentPage.value = 1;
  if (activeTab.value === "favorites") {
    activeTab.value = "all";
    router.replace({ path: "/catalog" });
  }
  store.commit("SET_FILTERS", filters);
  store.dispatch("fetchBooks");
};

const handleResetFilters = () => {
  currentPage.value = 1;
  store.commit("SET_FILTERS", {
    genres: [],
    authors: [],
    languages: [],
    rating: 0,
  });
  store.dispatch("fetchBooks");
};
</script>

<template>
  <div class="w-full pb-12">
    <Container>
      <Breadcrumbs :items="breadcrumbs" />

      <div
        class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] mt-4 items-start"
      >
        <div class="col-span-2 lg:col-span-3">
          <CatalogFilters
            @apply="handleApplyFilters"
            @reset="handleResetFilters"
          />
        </div>

        <div class="col-span-2 lg:col-span-9">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div class="flex items-center gap-4 border-b border-gray-200 pb-1">
              <button
                @click="setTab('all')"
                :class="[
                  'text-lg sm:text-2xl font-bold transition-colors pb-1 cursor-pointer',
                  activeTab === 'all'
                    ? 'text-black border-b-2 border-[#0D47A1]'
                    : 'text-gray-400 hover:text-gray-700',
                ]"
              >
                Все книги
              </button>
              <button
                @click="setTab('favorites')"
                :class="[
                  'text-lg sm:text-2xl font-bold transition-colors pb-1 cursor-pointer flex items-center gap-2',
                  activeTab === 'favorites'
                    ? 'text-black border-b-2 border-[#0D47A1]'
                    : 'text-gray-400 hover:text-gray-700',
                ]"
              >
                <span>Избранное</span>
                <span
                  v-if="store.state.favorites.length > 0"
                  class="text-xs px-2 py-0.5 rounded-full bg-[#0D47A1] text-white font-medium"
                >
                  {{ store.state.favorites.length }}
                </span>
              </button>
            </div>

            <span v-if="!loading" class="text-xs sm:text-sm text-gray-400">
              Найдено: {{ displayedBooks.length }}
            </span>
          </div>

          <div
            v-if="loading"
            class="py-16 flex flex-col items-center justify-center gap-3 text-gray-400"
          >
            <div
              class="w-8 h-8 border-3 border-[#0D47A1] border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-xs sm:text-sm">Загрузка каталога...</span>
          </div>

          <div
            v-else-if="error"
            class="py-12 px-6 bg-red-50 border border-red-200 rounded-2xl text-center flex flex-col items-center gap-3"
          >
            <p class="text-sm text-red-600 font-medium">{{ error }}</p>
            <button
              @click="store.dispatch('fetchBooks')"
              class="bg-[#0D47A1] text-white text-xs px-4 py-2 rounded-xl hover:bg-[#0a367a] transition-colors"
            >
              Попробовать снова
            </button>
          </div>

          <div
            v-else-if="activeTab === 'favorites' && displayedBooks.length === 0"
            class="py-16 text-center text-gray-500 text-sm flex flex-col items-center gap-3 bg-white border border-gray-200 rounded-2xl p-8"
          >
            <p class="font-bold text-base text-gray-800">
              В избранном пока нет книг
            </p>
            <p class="text-xs text-gray-400 max-w-sm">
              Нажмите на иконку закладки на карточке любой книги, чтобы сохранить её в этот список.
            </p>
            <button
              @click="setTab('all')"
              class="mt-2 bg-[#0D47A1] hover:bg-[#0a367a] text-white text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Перейти в каталог
            </button>
          </div>

          <div
            v-else-if="displayedBooks.length === 0"
            class="py-16 text-center text-gray-400 text-sm"
          >
            По выбранным фильтрам ничего не найдено. Попробуйте сбросить фильтры.
          </div>

          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 gap-x-[25px] gap-y-8 lg:gap-x-[30px] lg:gap-y-10"
          >
            <BookCard v-for="book in paginatedBooks" :key="book.id" :book="book" />
          </div>

          <div
            v-if="totalPages > 1"
            class="mt-14 flex items-center justify-center gap-2"
          >
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="setPage(page)"
              :class="[
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer',
                currentPage === page
                  ? 'bg-[#EFEFEF] text-black font-bold'
                  : 'text-gray-500 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>

            <span
              v-if="totalPages > 5 && !visiblePages.includes(totalPages)"
              class="text-gray-400 px-1 select-none"
            >
              ...
            </span>

            <button
              v-if="totalPages > 5 && !visiblePages.includes(totalPages)"
              @click="setPage(totalPages)"
              :class="[
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center cursor-pointer',
                currentPage === totalPages
                  ? 'bg-[#EFEFEF] text-black font-bold'
                  : 'text-gray-500 hover:bg-gray-100',
              ]"
            >
              {{ totalPages }}
            </button>

            <button
              v-if="currentPage < totalPages"
              @click="setPage(currentPage + 1)"
              class="ml-2 bg-[#EFEFEF] hover:bg-[#0D47A1] hover:text-white text-gray-700 text-sm font-medium px-5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Дальше
            </button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
