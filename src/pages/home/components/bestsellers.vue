<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import Container from "@/components/layout/container.vue";

defineProps({
  title: {
    type: String,
    default: "Бестселлеры",
  },
});

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

const books = [
  {
    id: 1,
    author: "Ольга Примаченко",
    title: "К себе нежно",
    cover: null,
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
  <section class="w-full py-8 overflow-hidden">
    <Container>
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

          <div class="hidden sm:flex items-center gap-4">
            <button
              @click="slidePrev"
              :disabled="isBeginning"
              class="text-gray-600 hover:text-[#0D47A1] disabled:opacity-30 disabled:pointer-events-none transition-all p-1"
              aria-label="Предыдущий слайд"
            >
              <img src="@/assets/icons/arrow-left.svg" alt="Предыдущий слайд" />
            </button>

            <button
              @click="slideNext"
              :disabled="isEnd"
              class="text-gray-600 hover:text-[#0D47A1] disabled:opacity-30 disabled:pointer-events-none transition-all p-1"
              aria-label="Следующий слайд"
            >
              <img src="@/assets/icons/arrow-right.svg" alt="Следующий слайд" />
            </button>
          </div>
        </div>
      </div>

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
          <div class="flex flex-col">
            <div
              class="relative aspect-[3/4] w-full mb-4 transition-transform duration-300 group-hover:-translate-y-1.5"
            >
              <div
                class="absolute inset-y-1.5 -right-2 w-4 bg-white border border-gray-200 rounded-r-lg shadow-sm z-0"
              ></div>

              <div
                :class="[
                  'relative z-10 w-full h-full rounded-r-xl rounded-l-sm overflow-hidden shadow-md flex flex-col justify-between p-5',
                  book.cover ? 'bg-gray-100' : book.bgColor,
                ]"
              >
                <div
                  class="absolute top-0 bottom-0 left-2.5 w-[2px] bg-black/15 z-20 shadow-[1px_0_2px_rgba(255,255,255,0.4)]"
                ></div>

                <img
                  v-if="book.cover"
                  :src="book.cover"
                  :alt="book.title"
                  class="absolute inset-0 w-full h-full object-cover z-10"
                />

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
