<script setup>
import BookCard from "@/components/common/book-card.vue";
import Breadcrumbs from "@/components/common/breadcrumbs.vue";
import Container from "@/components/layout/container.vue";
import CatalogFilters from "@/pages/catalog/components/filters.vue";
import { ref } from "vue";

const breadcrumbs = [{ label: "Главная", href: "/" }, { label: "Каталог" }];

const currentPage = ref(1);

// Все 12 книг с твоего скрина
const books = ref([
  {
    id: 1,
    author: "Ольга Примаченко",
    title: "К себе нежно",
    rating: 4.6,
    reviews: 342,
    bgColor: "bg-[#F9E5E8]",
    textColor: "text-rose-950",
  },
  {
    id: 2,
    author: "Ольга Примаченко",
    title: "С тобой я дома",
    rating: 4.9,
    reviews: 385,
    bgColor: "bg-[#FCE7F3]",
    textColor: "text-pink-950",
  },
  {
    id: 3,
    author: "Марк Уолинн",
    title: "Это началось не с тебя. Как мы наследуем...",
    rating: 4.3,
    reviews: 456,
    bgColor: "bg-[#E0F2FE]",
    textColor: "text-sky-950",
  },
  {
    id: 4,
    author: "Джен Синсеро",
    title: "НИ СЫ. Будь уверен в своих силах и не ...",
    rating: 4.0,
    reviews: 786,
    bgColor: "bg-[#FEF08A]",
    textColor: "text-yellow-950",
  },
  {
    id: 5,
    author: "Марк Мэнсон, Уилл Смит",
    title: "Will. Чему может научить нас простой парень ...",
    rating: 5.0,
    reviews: 293,
    bgColor: "bg-[#FFEDD5]",
    textColor: "text-orange-950",
  },
  {
    id: 6,
    author: "Мэттью МакКонахи",
    title: "Зеленый свет",
    rating: 4.1,
    reviews: 120,
    bgColor: "bg-[#DCFCE7]",
    textColor: "text-emerald-950",
  },
  {
    id: 7,
    author: "Фредрик Бакман",
    title: "Вторая жизнь Уве",
    rating: 4.0,
    reviews: 670,
    bgColor: "bg-[#DBEAFE]",
    textColor: "text-blue-950",
  },
  {
    id: 8,
    author: "Айн Рэнд",
    title: "Атлант расправил плечи",
    rating: 5.0,
    reviews: 784,
    bgColor: "bg-[#F3E8FF]",
    textColor: "text-purple-950",
  },
  {
    id: 9,
    author: "Хезер Моррис",
    title: "Татуировщик из Освенцима",
    rating: 4.8,
    reviews: 584,
    bgColor: "bg-[#E2E8F0]",
    textColor: "text-slate-900",
  },
  {
    id: 10,
    author: "Габриэль Гарсиа Маркес",
    title: "Сто лет одиночества",
    rating: 4.6,
    reviews: 394,
    bgColor: "bg-[#FEF3C7]",
    textColor: "text-amber-950",
  },
  {
    id: 11,
    author: "Джон П. Стрелеки",
    title: "Кафе на краю земли",
    rating: 4.9,
    reviews: 349,
    bgColor: "bg-[#CCFBF1]",
    textColor: "text-teal-950",
  },
  {
    id: 12,
    author: "Лола А. Экерстрем",
    title: "Lagom. Секрет шведского благополучия",
    rating: 4.7,
    reviews: 473,
    bgColor: "bg-[#F1F5F9]",
    textColor: "text-slate-800",
  },
]);

const handleApplyFilters = (filters) => {
  console.log("Применены фильтры:", filters);
};

const handleResetFilters = () => {
  console.log("Фильтры сброшены");
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
          <h1 class="text-xl sm:text-2xl font-bold text-black mb-6">
            Все книги
          </h1>

          <!-- Сетка карточек книг: 2 в ряд на мобилке, 3 в ряд на ПК -->
          <div
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
