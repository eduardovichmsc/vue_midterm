<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import starBlue from "@/assets/icons/star-blue.svg";
import starGray from "@/assets/icons/star-gray.svg";
import starWhite from "@/assets/icons/star-white.svg";

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

    <div
      class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-start"
    >
      <div class="col-span-2 lg:col-span-8 flex flex-col gap-5">
        <div
          v-for="review in reviews"
          :key="review.id"
          class="border border-gray-300 rounded-[24px] p-5 sm:p-6 bg-white flex flex-col sm:flex-row gap-4 items-start"
        >
          <div
            class="w-12 h-12 rounded-full bg-[#EFEFEF] flex items-center justify-center shrink-0"
          >
            <img
              src="@/assets/icons/user.svg"
              alt="Пользователь"
              class="w-7 h-7"
            />
          </div>

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

              <div
                class="border border-gray-300 rounded-lg px-2.5 py-1 flex items-center gap-1"
              >
                <img
                  v-for="star in 5"
                  :key="star"
                  :src="star <= review.rating ? starBlue : starGray"
                  alt="Звезда"
                  class="w-3.5 h-3.5"
                />
              </div>
            </div>

            <p class="text-xs sm:text-sm text-gray-800 leading-relaxed">
              {{ review.text }}
            </p>
          </div>
        </div>

        <div class="text-center mt-2">
          <button
            class="text-xs sm:text-sm text-gray-400 hover:text-[#0D47A1] underline underline-offset-4 transition-colors"
          >
            Смотреть больше отзывов
          </button>
        </div>
      </div>

      <div class="col-span-2 lg:col-span-4 flex flex-col gap-6">
        <div
          class="bg-[#EFEFEF] rounded-[24px] p-5 sm:p-6 flex flex-col gap-3 text-xs"
        >
          <div
            v-for="spec in specs"
            :key="spec.label"
            class="flex items-baseline justify-between gap-1"
          >
            <span class="text-gray-500 shrink-0">{{ spec.label }}</span>
            <span
              class="flex-1 border-b border-dotted border-gray-400 mx-1"
            ></span>
            <span class="text-black font-semibold text-right shrink-0">{{
              spec.value
            }}</span>
          </div>
        </div>

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
              <img
                :src="star <= userRating ? starBlue : starWhite"
                alt="Оценка"
                class="w-5 h-5 transition-transform"
              />
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
