<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import Container from "@/components/layout/container.vue";
import Breadcrumbs from "@/components/common/breadcrumbs.vue";
import BookDetailsCard from "@/components/common/book-details.vue";
import BookReviewsSection from "./reviews.vue";
import BookCard from "@/components/common/book-card.vue";

// 1. Хлебные крошки со скрина
const breadcrumbs = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Джон П. Стрелеки", href: "#" },
  { label: "Кафе на краю земли" },
];

// 2. Данные текущей книги
const bookData = {
  author: "Джон П. Стрелеки",
  title: "Кафе на краю земли",
  rating: 4.9,
  reviewsCount: 349,
  tags: ["поиск себя", "бестселлер", "философская проза", "работа над собой"],
  description:
    "Эта книга – мировой бестселлер, переведенный на 30 языков – вдохновит вас на перемены, о которых сегодня вы можете только мечтать. Автор рассказывает историю Джона, обычного офисного работника, который случайно забрел в загадочное кафе «Почему» – и это изменило всю его жизнь, позволило по-другому взглянуть на вещи и осознать действительно важные цели и желания. Простые и мудрые ответы на главные философские вопросы изложены в форме увлекательного романа.",
  gallery: [
    { bgColor: "bg-[#CCFBF1]" },
    { bgColor: "bg-[#E0F2FE]" },
    { bgColor: "bg-[#FEF3C7]" },
  ],
};

// 3. Характеристики справа
const bookSpecs = [
  { label: "Жанр", value: "Литература по саморазвитию" },
  { label: "Издательство", value: "Эксмо" },
  { label: "Год издания", value: "2018" },
  { label: "Год написания", value: "2011" },
  { label: "Переводчик", value: "Элеонора Мельник" },
  { label: "Возрастное ограничение", value: "16+" },
];

// 4. Отзывы со скрина
const initialReviews = [
  {
    id: 1,
    author: "Евгений Кочанов",
    date: "15 октября 2022",
    rating: 3,
    text: "Меня увлекает литература подобного рода, но здесь нет никакой глубины. Я бы сказала, что эта книга для лёгкого чтения, чтобы расслабиться и ни о чём не думать, а не «чтобы задуматься над смыслом существования». Возможно, это действительно подростковый вариант, упрощенный. Я не считаю, что книга плоха, но для меня она бессмысленна. Просто приятное чтиво.",
  },
  {
    id: 2,
    author: "Марина Степанова",
    date: "09 октября 2022",
    rating: 5,
    text: "Книга, как глоток свежего воздуха! Меня захватила сразу с первых строк. Все мы однажды задаём себе этот главный вопрос: неужели так, как мы живём, это и есть всё? неужели мы не достойны большего? Но одни задаются и живут, как прежде, ничего не меняя. Как будто временно переболели гриппом. Другие понимают, что это перекрёсток. Возможно самый поворотный. И шагают в новую жизнь. Читать всем обязательно!!!!",
  },
  {
    id: 3,
    author: "Ангелина Иванова",
    date: "02 октября 2022",
    rating: 5,
    text: "Одна из тех книг, которые читаются на одном дыхании. Заставляет о многом задуматься и многое переосмыслить. Пожалуй, эту книгу я перечитаю еще не один раз. Рекомендую к прочтению всем!",
  },
];

// 5. Книги этого автора для нижней карусели
const authorBooks = [
  {
    id: 101,
    author: "Джон П. Стрелеки",
    title: "Возвращение в кафе",
    rating: 4.7,
    reviews: 473,
    bgColor: "bg-[#E0F2FE]",
    textColor: "text-sky-950",
  },
  {
    id: 102,
    author: "Джон П. Стрелеки",
    title: "Неожиданная остановка",
    rating: 4.1,
    reviews: 120,
    bgColor: "bg-[#FEF3C7]",
    textColor: "text-amber-950",
  },
  {
    id: 103,
    author: "Джон П. Стрелеки",
    title: "Большая пятерка для жизни",
    rating: 5.0,
    reviews: 784,
    bgColor: "bg-[#DCFCE7]",
    textColor: "text-emerald-950",
  },
  {
    id: 104,
    author: "Джон П. Стрелеки",
    title: "Сафари для жизни",
    rating: 4.1,
    reviews: 456,
    bgColor: "bg-[#FFEDD5]",
    textColor: "text-orange-950",
  },
  {
    id: 105,
    author: "Джон П. Стрелеки",
    title: "Большая пятерка для жизни. Приключения...",
    rating: 4.7,
    reviews: 312,
    bgColor: "bg-[#F3E8FF]",
    textColor: "text-purple-950",
  },
];

// Управление нижней каруселью Swiper
const authorSwiper = ref(null);
const onAuthorSwiper = (swiper) => {
  authorSwiper.value = swiper;
};
</script>

<template>
  <div class="w-full pb-12 overflow-hidden">
    <Container>
      <!-- Хлебные крошки -->
      <Breadcrumbs :items="breadcrumbs" class="mb-2" />

      <!-- Карточка книги с вертикальной галереей -->
      <BookDetailsCard :book="bookData" />

      <!-- Блок отзывов, характеристик и формы -->
      <BookReviewsSection :specs="bookSpecs" :initialReviews="initialReviews" />

      <!-- Нижний слайдер: Книги этого автора -->
      <section class="mt-16">
        <div class="flex items-end justify-between mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-black leading-none">
            Книги этого автора:
          </h2>

          <div class="flex items-center gap-6 sm:gap-8">
            <a
              href="#"
              class="text-sm sm:text-base text-gray-400 hover:text-[#0D47A1] underline underline-offset-4 transition-colors"
            >
              Смотреть все
            </a>

            <div class="hidden sm:flex items-center gap-4">
              <button
                @click="authorSwiper?.slidePrev()"
                class="text-gray-600 hover:text-[#0D47A1] transition-colors p-1"
              >
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                  <path
                    d="M27 7H1M1 7L7 1M1 7L7 13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button
                @click="authorSwiper?.slideNext()"
                class="text-gray-600 hover:text-[#0D47A1] transition-colors p-1"
              >
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
                  <path
                    d="M1 7H27M27 7L21 1M27 7L21 13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <Swiper
          @swiper="onAuthorSwiper"
          :spaceBetween="25"
          :slidesPerView="1.8"
          :breakpoints="{
            480: { slidesPerView: 2.3, spaceBetween: 25 },
            768: { slidesPerView: 3.3, spaceBetween: 30 },
            1024: { slidesPerView: 4.25, spaceBetween: 30 },
          }"
          class="!overflow-visible"
        >
          <SwiperSlide v-for="book in authorBooks" :key="book.id">
            <BookCard :book="book" />
          </SwiperSlide>
        </Swiper>
      </section>
    </Container>
  </div>
</template>
