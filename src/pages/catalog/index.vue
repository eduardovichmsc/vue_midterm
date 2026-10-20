<script setup>
import BookCard from "@/components/common/book-card.vue";
import Breadcrumbs from "@/components/common/breadcrumbs.vue";
import Container from "@/components/layout/container.vue";
import CatalogFilters from "@/pages/catalog/components/filters.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "Каталог" }];
const currentPage = ref(1);

const books = computed(() => store.getters.allBooks);
const loading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.error);

onMounted(() => {
  store.dispatch("fetchBooks");
});

// Watcher по техническому требованию ТЗ
watch(
  () => store.state.searchQuery,
  () => {
    store.dispatch("fetchBooks");
  }
);

const handleApplyFilters = (filters) => {
  store.commit("SET_FILTERS", filters);
  store.dispatch("fetchBooks");
};

const handleResetFilters = () => {
  store.commit("SET_FILTERS", { genres: [], authors: [], rating: 0 });
  store.dispatch("fetchBooks");
};
</script>

<template>
  <div class="w-full pb-12">
    <Container>
      <!-- 1. Хлебные крошки -->
      <Breadcrumbs :items="breadcrumbs" />

      <!-- 2. Основная сетка каталога: 12 колонок на ПК -->
      <div
        class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] mt-4 items-start"
      >
        <!-- ЛЕВАЯ КОЛОНКА: Фильтр (3 колонки на ПК, вся ширина на мобилке) -->
        <div class="col-span-2 lg:col-span-3">
          <CatalogFilters
            @apply="handleApplyFilters"
            @reset="handleResetFilters"
          />
        </div>

        <!-- ПРАВАЯ КОЛОНКА: Все книги (9 колонок на ПК) -->
        <div class="col-span-2 lg:col-span-9">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl sm:text-2xl font-bold text-black">
              Все книги
            </h1>
            <span v-if="!loading" class="text-xs sm:text-sm text-gray-400">
              Найдено: {{ books.length }}
            </span>
          </div>

          <!-- Состояние загрузки (Loading state по ТЗ) -->
          <div
            v-if="loading"
            class="py-16 flex flex-col items-center justify-center gap-3 text-gray-400"
          >
            <div
              class="w-8 h-8 border-3 border-[#0D47A1] border-t-transparent rounded-full animate-spin"
            ></div>
            <span class="text-xs sm:text-sm">Загрузка каталога...</span>
          </div>

          <!-- Состояние ошибки (Error state по ТЗ) -->
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

          <!-- Пустой результат -->
          <div
            v-else-if="books.length === 0"
            class="py-16 text-center text-gray-400 text-sm"
          >
            По выбранным фильтрам ничего не найдено. Попробуйте сбросить фильтры.
          </div>

          <!-- Сетка карточек книг: 2 в ряд на мобилке, 3 в ряд на ПК -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 gap-x-[25px] gap-y-8 lg:gap-x-[30px] lg:gap-y-10"
          >
            <BookCard v-for="book in books" :key="book.id" :book="book" />
          </div>

          <!-- ПАГИНАЦИЯ (внизу по центру, как на скрине) -->
          <div class="mt-14 flex items-center justify-center gap-2">
            <button
              v-for="page in [1, 2, 3, 4]"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center',
                currentPage === page
                  ? 'bg-[#EFEFEF] text-black font-bold'
                  : 'text-gray-500 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>

            <span class="text-gray-400 px-1 select-none">...</span>

            <button
              @click="currentPage = 8"
              :class="[
                'w-8 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center',
                currentPage === 8
                  ? 'bg-[#EFEFEF] text-black font-bold'
                  : 'text-gray-500 hover:bg-gray-100',
              ]"
            >
              8
            </button>

            <button
              @click="currentPage = currentPage < 8 ? currentPage + 1 : 8"
              class="ml-2 bg-[#EFEFEF] hover:bg-[#0D47A1] hover:text-white text-gray-700 text-sm font-medium px-5 py-1.5 rounded-lg transition-colors"
            >
              Дальше
            </button>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
