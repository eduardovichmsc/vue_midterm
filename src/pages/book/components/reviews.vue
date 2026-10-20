<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  bookId: {
    type: [String, Number],
    default: "11",
  },
  specs: {
    type: Array,
    required: true,
  },
  initialReviews: {
    type: Array,
    required: true,
  },
});

const reviews = ref([...props.initialReviews]);

watch(
  () => props.initialReviews,
  (newReviews) => {
    if (newReviews) {
      reviews.value = [...newReviews];
    }
  },
  { deep: true }
);

// Состояние формы нового отзыва
const userRating = ref(0);
const userComment = ref("");
const isSubmitting = ref(false);

const submitReview = async () => {
  if (!userComment.value.trim() || isSubmitting.value) return;

  const reviewPayload = {
    author: store.state.user ? store.state.user.name : "Вы (Читатель)",
    date: "Сегодня",
    rating: userRating.value || 5,
    text: userComment.value.trim(),
  };

  isSubmitting.value = true;
  try {
    // Операция POST по техническому требованию ТЗ
    const saved = await store.dispatch("addReview", {
      bookId: props.bookId,
      review: reviewPayload,
    });
    reviews.value.unshift(saved || { id: Date.now(), ...reviewPayload });
    userComment.value = "";
    userRating.value = 0;
  } catch (err) {
    console.error("Ошибка сохранения отзыва:", err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="mt-14">
    <h2 class="text-2xl sm:text-3xl font-bold text-black mb-6">Отзывы</h2>

    <!-- Сетка 12 колонок: 8 колонок под список отзывов, 4 колонки под правый сайдбар -->
    <div
      class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-start"
    >
      <!-- ЛЕВАЯ КОЛОНКА: Карточки отзывов (8 колонок) -->
      <div class="col-span-2 lg:col-span-8 flex flex-col gap-5">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="border border-gray-300 rounded-[24px] p-5 sm:p-6 bg-white flex flex-col sm:flex-row gap-4 items-start"
        >
          <!-- Аватарка пользователя -->
          <div
            class="w-12 h-12 rounded-full bg-[#EFEFEF] text-gray-400 flex items-center justify-center shrink-0"
          >
            <svg class="w-7 h-7 fill-current" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <!-- Контент отзыва -->
          <div class="flex-1 w-full">
            <div
              class="flex flex-wrap items-center justify-between gap-2 mb-2.5"
            >
              <div class="flex items-baseline gap-3">
                <h3 class="font-bold text-sm sm:text-base text-black">
                  {{ review.author }}
                </h3>
                <span class="text-xs text-gray-400">{{ review.date }}</span>
              </div>

              <!-- Плашка со звездами в рамке -->
              <div
                class="border border-gray-300 rounded-lg px-2.5 py-1 flex items-center gap-1"
              >
                <svg
                  v-for="star in 5"
                  :key="star"
                  :class="[
                    'w-3.5 h-3.5 fill-current',
                    star <= review.rating ? 'text-[#0D47A1]' : 'text-gray-300',
                  ]"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>

            <p class="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {{ review.text }}
            </p>
          </div>
        </div>

        <!-- Кнопка "Смотреть больше отзывов" -->
        <div class="text-center mt-2">
          <button
            class="text-xs sm:text-sm text-gray-400 hover:text-[#0D47A1] underline underline-offset-4 transition-colors"
          >
            Смотреть больше отзывов
          </button>
        </div>
      </div>

      <!-- ПРАВАЯ КОЛОНКА: Характеристики книги + Форма отзыва (4 колонки) -->
      <div class="col-span-2 lg:col-span-4 flex flex-col gap-6">
        <!-- Карточка характеристик с точечным разделителем -->
        <div
          class="bg-[#EFEFEF] rounded-[24px] p-5 sm:p-6 flex flex-col gap-3 text-xs"
        >
          <div
            v-for="spec in specs"
            :key="spec.label"
            class="flex items-baseline justify-between gap-1"
          >
            <span class="text-gray-500 shrink-0">{{ spec.label }}</span>
            <!-- Точки между названием и значением -->
            <span
              class="flex-1 border-b border-dotted border-gray-400 mx-1"
            ></span>
            <span class="text-black font-semibold text-right shrink-0">{{
              spec.value
            }}</span>
          </div>
        </div>

        <!-- Карточка "Оставьте отзыв" -->
        <div class="bg-[#EFEFEF] rounded-[24px] p-6 flex flex-col">
          <h3 class="text-lg sm:text-xl font-bold text-black text-center mb-4">
            Оставьте отзыв
          </h3>

          <span class="text-xs text-gray-600 mb-2">Какая ваша оценка?</span>
          <div class="flex items-center gap-1.5 mb-4">
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="userRating = star"
              class="focus:outline-none transition-transform hover:scale-110"
            >
              <svg
                :class="[
                  'w-5 h-5 fill-current transition-colors',
                  star <= userRating ? 'text-[#0D47A1]' : 'text-white',
                ]"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </button>
          </div>

          <label class="text-xs text-gray-600 mb-2">
            Что вы думаете по поводу книги?
          </label>
          <textarea
            v-model="userComment"
            rows="4"
            placeholder="Введите текст..."
            class="w-full bg-white rounded-xl p-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/40 resize-none mb-5"
          ></textarea>

          <button
            @click="submitReview"
            class="self-center bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-xs sm:text-sm py-2.5 px-7 rounded-xl transition-colors"
          >
            Оставить отзыв
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
