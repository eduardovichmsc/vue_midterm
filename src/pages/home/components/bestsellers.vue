<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import Container from "@/components/layout/container.vue";

// Принимаем заголовок через пропсы, чтобы компонент можно было переиспользовать (например, для "Новинки")
defineProps({
  title: {
    type: String,
    default: "Бестселлеры",
  },
});

// Ссылка на инстанс Swiper для управления нашими кастомными стрелками
const swiperInstance = ref(null);
const isBeginning = ref(true);
const isEnd = ref(false);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

const onSlideChange = (swiper) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};

const slidePrev = () => swiperInstance.value?.slidePrev();
const slideNext = () => swiperInstance.value?.slideNext();

// Книги прямо с твоего скрина (плюс парочка дополнительных для прокрутки)
// Цвета (bgColor) подобраны под реальные обложки этих книг, пока не вставишь картинки
const books = [
  {
    id: 1,
    author: "Ольга Примаченко",
    title: "К себе нежно",
    cover: null, // Сюда можно вставить путь к картинке, например '/books/book1.jpg'
    bgColor: "bg-[#F9E5E8]",
    textColor: "text-rose-900",
  },
  {
    id: 2,
    author: "Мелоди Битти",
    title: "Спасать или спасаться",
    cover: null,
    bgColor: "bg-[#E11D48]",
    textColor: "text-white",
  },
  {
    id: 3,
    author: "Лия Арден",
    title: "Невеста ноября",
    cover: null,
    bgColor: "bg-[#1E293B]",
    textColor: "text-amber-200",
  },
  {
    id: 4,
    author: "Мишель Обама",
    title: "Becoming. Моя история",
    cover: null,
    bgColor: "bg-[#FEF3C7]",
    textColor: "text-amber-950",
  },
  {
    id: 5,
    author: "Марти Клейн",
    title: "Сексуальный интеллект",
    cover: null,
    bgColor: "bg-[#DBEAFE]",
    textColor: "text-blue-950",
  },
  {
    id: 6,
    author: "Джеймс Клир",
    title: "Атомные привычки",
    cover: null,
    bgColor: "bg-[#F3E8FF]",
    textColor: "text-purple-950",
  },
];
</script>

<template>
  <!-- overflow-hidden нужен, чтобы торчащая справа 5-я книга не вызывала горизонтальный скролл страницы -->
  <section class="w-full py-8 overflow-hidden">
    <Container>
      <!-- ШАПКА БЛОКА: Заголовок + Смотреть все + Стрелки -->
      <div class="flex items-end justify-between mb-8">
        <h2
          class="text-2xl sm:text-3xl lg:text-[36px] font-bold text-black leading-none"
        >
          {{ title }}
        </h2>

        <div class="flex items-center gap-6 sm:gap-8">
          <router-link
            to="/catalog"
            class="text-sm sm:text-base text-gray-500 hover:text-[#0D47A1] underline underline-offset-4 transition-colors"
          >
            Смотреть все
          </router-link>

          <!-- Кастомные стрелки как на макете -->
          <div class="hidden sm:flex items-center gap-4">
            <button
              @click="slidePrev"
              :disabled="isBeginning"
              class="text-gray-600 hover:text-[#0D47A1] disabled:opacity-30 disabled:pointer-events-none transition-all p-1"
              aria-label="Предыдущий слайд"
            >
              <!-- Длинная тонкая стрелка влево -->
              <svg
                width="28"
                height="14"
                viewBox="0 0 28 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              @click="slideNext"
              :disabled="isEnd"
              class="text-gray-600 hover:text-[#0D47A1] disabled:opacity-30 disabled:pointer-events-none transition-all p-1"
              aria-label="Следующий слайд"
            >
              <!-- Длинная тонкая стрелка вправо -->
              <svg
                width="28"
                height="14"
                viewBox="0 0 28 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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

      <!-- КАРУСЕЛЬ SWIPER -->
      <!-- !overflow-visible позволяет 5-й книге красиво выходить за правую границу контейнера, как на скрине -->
      <Swiper
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :spaceBetween="25"
        :slidesPerView="1.8"
        :breakpoints="{
          480: { slidesPerView: 2.3, spaceBetween: 25 },
          768: { slidesPerView: 3.3, spaceBetween: 30 },
          1024: { slidesPerView: 4.25, spaceBetween: 30 },
        }"
        class="!overflow-visible"
      >
        <SwiperSlide
          v-for="book in books"
          :key="book.id"
          @click="$router.push(`/book/${book.id}`)"
          class="group cursor-pointer"
        >
          <!-- КАРТОЧКА КНИГИ -->
          <div class="flex flex-col">
            <!-- Обложка книги с 3D-эффектом переплета и страниц (как в вайрфрейме) -->
            <div
              class="relative aspect-[3/4] w-full mb-4 transition-transform duration-300 group-hover:-translate-y-1.5"
            >
              <!-- Белые "страницы" справа под обложкой -->
              <div
                class="absolute inset-y-1.5 -right-2 w-4 bg-white border border-gray-200 rounded-r-lg shadow-sm z-0"
              ></div>

              <!-- Сама обложка -->
              <div
                :class="[
                  'relative z-10 w-full h-full rounded-r-xl rounded-l-sm overflow-hidden shadow-md flex flex-col justify-between p-5',
                  book.cover ? 'bg-gray-100' : book.bgColor,
                ]"
              >
                <!-- Линия книжного корешка слева (эффект настоящей книги с макета) -->
                <div
                  class="absolute top-0 bottom-0 left-2.5 w-[2px] bg-black/15 z-20 shadow-[1px_0_2px_rgba(255,255,255,0.4)]"
                ></div>

                <!-- Если есть картинка обложки -->
                <img
                  v-if="book.cover"
                  :src="book.cover"
                  :alt="book.title"
                  class="absolute inset-0 w-full h-full object-cover z-10"
                />

                <!-- Стильная типографика-заглушка, если картинки пока нет -->
                <div
                  v-else
                  :class="[
                    'pl-3 flex flex-col h-full justify-between z-10',
                    book.textColor,
                  ]"
                >
                  <span
                    class="text-xs opacity-75 font-medium tracking-wide uppercase"
                    >{{ book.author }}</span
                  >
                  <p class="font-bold text-lg sm:text-xl leading-snug">
                    {{ book.title }}
                  </p>
                  <div class="w-8 h-0.5 bg-current opacity-40"></div>
                </div>
              </div>
            </div>

            <!-- Информация под книгой -->
            <span class="text-xs sm:text-sm text-gray-400 mb-1 truncate">
              {{ book.author }}
            </span>
            <h3
              class="text-sm sm:text-base font-bold text-black group-hover:text-[#0D47A1] transition-colors line-clamp-1"
            >
              {{ book.title }}
            </h3>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>
  </section>
</template>
