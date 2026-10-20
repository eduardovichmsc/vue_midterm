<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "@/components/layout/container.vue";

const slides = [
  {
    id: 1,
    title: "Получите скидку 20%",
    description:
      "Пригласите ваших друзей в Читальню и вы получите скидку 20% на годовую подписку, а ваши друзья - 10%.",
    buttonText: "Получить скидку",
    image: null,
  },
  {
    id: 2,
    title: "Новинки этой осени",
    description:
      "Откройте для себя сотни новых бестселлеров и эксклюзивных переводов в нашем каталоге.",
    buttonText: "Перейти в каталог",
    image: null,
  },
  {
    id: 3,
    title: "Слушайте где угодно",
    description:
      "Оформите подписку на аудиокниги и наслаждайтесь любимыми историями в дороге или на прогулке.",
    buttonText: "Попробовать бесплатно",
    image: null,
  },
  {
    id: 4,
    title: "Книжный клуб Читальни",
    description:
      "Обсуждайте прочитанное с единомышленниками, делитесь рецензиями и находите друзей.",
    buttonText: "Присоединиться",
    image: null,
  },
];

// Управление Swiper и точками пагинации
const swiperInstance = ref(null);
const activeSlide = ref(0);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  // realIndex нужен, чтобы точки правильно подсвечивались при бесконечной прокрутке (loop)
  activeSlide.value = swiper.realIndex;
};

const goToSlide = (index) => {
  swiperInstance.value?.slideToLoop(index);
};
</script>

<template>
  <section class="w-full mt-2 mb-12">
    <Container>
      <!-- Внешняя обертка с градиентом и скруглениями (остается на месте, а слайды ездят внутри!) -->
      <div
        class="relative bg-gradient-to-r from-[#BCE0FD] via-[#92B4FA] to-[#6B8DFA] rounded-[32px] overflow-hidden shadow-sm"
      >
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :speed="600"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          class="w-full cursor-grab active:cursor-grabbing"
        >
          <SwiperSlide v-for="slide in slides" :key="slide.id">
            <!-- Сетка внутри каждого слайда -->
            <div
              class="p-6 pb-14 sm:p-10 sm:pb-16 lg:p-[74px] min-h-[380px] lg:min-h-[440px] grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-center"
            >
              <!-- ЛЕВАЯ ЧАСТЬ: 6 колонок на ПК -->
              <div
                class="col-span-2 lg:col-span-6 z-10 text-left flex flex-col items-start"
              >
                <h1
                  class="text-2xl sm:text-4xl lg:text-[42px] font-bold text-black mb-4 lg:mb-5 leading-tight"
                >
                  {{ slide.title }}
                </h1>

                <p
                  class="text-gray-800 text-sm sm:text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed"
                >
                  {{ slide.description }}
                </p>

                <button
                  class="bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-lg shadow-[#0D47A1]/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {{ slide.buttonText }}
                </button>
              </div>

              <!-- ПРАВАЯ ЧАСТЬ: 6 колонок на ПК -->
              <div
                class="col-span-2 lg:col-span-6 relative z-10 mt-6 lg:mt-0 flex justify-center lg:justify-end items-center"
              >
                <img
                  v-if="slide.image"
                  :src="slide.image"
                  alt="Баннер"
                  class="max-h-[320px] object-contain drop-shadow-xl"
                />

                <!-- Векторная иллюстрация-заглушка -->
                <div
                  v-else
                  class="relative w-64 h-56 sm:w-80 sm:h-64 lg:w-96 lg:h-72 flex items-center justify-center"
                >
                  <div
                    class="absolute -top-10 left-10 flex flex-col items-center animate-pulse"
                  >
                    <div class="w-0.5 h-14 bg-gray-900"></div>
                    <div
                      class="w-9 h-9 rounded-full bg-yellow-400 border-2 border-gray-900 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.8)]"
                    >
                      <span class="text-xs">💡</span>
                    </div>
                  </div>

                  <div class="flex flex-col items-center mt-10 w-full">
                    <div
                      class="w-4/5 h-12 sm:h-14 bg-white border-4 border-gray-900 rounded-l-lg rounded-r-sm shadow-md transform -rotate-3 flex items-center px-4"
                    >
                      <div class="w-full h-1 bg-gray-300"></div>
                    </div>
                    <div
                      class="w-5/6 h-14 sm:h-16 bg-gray-900 rounded-lg shadow-md transform rotate-2 -mt-2 relative flex items-center px-6"
                    >
                      <div
                        class="w-5 h-14 bg-yellow-400 absolute left-8 -bottom-5"
                      ></div>
                      <div class="w-full h-2 bg-gray-700 rounded"></div>
                    </div>
                    <div
                      class="w-full h-16 sm:h-20 bg-[#93C5FD] border-4 border-gray-900 rounded-l-xl rounded-r-md shadow-xl -mt-2 flex flex-col justify-center px-6 gap-2"
                    >
                      <div class="w-3/4 h-1 bg-gray-800"></div>
                      <div class="w-1/2 h-1 bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Точки слайдера (связаны со Swiper) -->
        <div
          class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20"
        >
          <button
            v-for="(slide, index) in slides"
            :key="slide.id"
            @click="goToSlide(index)"
            :class="[
              'h-2.5 rounded-full transition-all duration-300',
              activeSlide === index
                ? 'w-7 bg-white shadow-sm'
                : 'w-2.5 bg-white/60 hover:bg-white/90',
            ]"
            :aria-label="'Перейти к слайду ' + (index + 1)"
          ></button>
        </div>
      </div>
    </Container>
  </section>
</template>
