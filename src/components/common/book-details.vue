<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import bookmarkBlue from "@/assets/icons/bookmark-blue.svg";
import bookmarkOutline from "@/assets/icons/bookmark.svg";

const store = useStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const activeImageIndex = ref(0);

const isBookmarked = computed(() => store.getters.isBookmarked(props.book.id));
const toggleBookmark = () => {
  store.dispatch("toggleBookmark", props.book.id);
};

const readingStatuses = [
  { id: "planned", label: "В планах" },
  { id: "reading", label: "Читаю" },
  { id: "completed", label: "Прочитано" },
];
const currentStatus = ref(props.book.readingStatus || null);

const toggleStatus = (id) => {
  const newStatus = currentStatus.value === id ? null : id;
  currentStatus.value = newStatus;
  store.dispatch("setReadingStatus", { bookId: props.book.id, status: newStatus });
};

const prevImage = () => {
  const len = props.book?.gallery?.length || 1;
  activeImageIndex.value = (activeImageIndex.value - 1 + len) % len;
};

const nextImage = () => {
  const len = props.book?.gallery?.length || 1;
  activeImageIndex.value = (activeImageIndex.value + 1) % len;
};
</script>

<template>
  <div
    class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-stretch"
  >
    <div
      class="hidden lg:flex lg:col-span-1 flex-col items-center justify-between py-2"
    >
      <button
        @click="prevImage"
        class="text-gray-500 hover:text-[#0D47A1] transition-colors p-1"
        aria-label="Предыдущее фото"
      >
        <img src="@/assets/icons/arrow-up.svg" alt="Предыдущее фото" />
      </button>

      <div class="flex flex-col gap-3 w-full">
        <button
          v-for="(thumb, idx) in book.gallery"
          :key="idx"
          @click="activeImageIndex = idx"
          :class="[
            'w-full aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex items-center justify-center',
            activeImageIndex === idx
              ? 'border-[#0D47A1] shadow-sm scale-105'
              : 'border-transparent opacity-60 hover:opacity-100',
            thumb.bgColor,
          ]"
        >
          <span class="text-[10px] font-bold opacity-50">{{ idx + 1 }}</span>
        </button>
      </div>

      <button
        @click="nextImage"
        class="text-gray-500 hover:text-[#0D47A1] transition-colors p-1"
        aria-label="Следующее фото"
      >
        <img src="@/assets/icons/arrow-down.svg" alt="Следующее фото" />
      </button>
    </div>

    <div
      class="col-span-2 lg:col-span-11 grid grid-cols-1 md:grid-cols-11 border border-gray-300 rounded-[28px] overflow-hidden bg-white shadow-sm"
    >
      <div
        class="md:col-span-4 relative aspect-[3/4] md:aspect-auto min-h-[320px] p-0 flex"
      >
        <div
          :class="[
            'relative w-full h-full rounded-r-2xl overflow-hidden shadow-md flex flex-col justify-between p-6 transition-colors duration-300',
            book.gallery?.[activeImageIndex]?.bgColor || book.bgColor || 'bg-[#CCFBF1]',
          ]"
        >
          <div
            class="absolute top-0 bottom-0 left-3 w-[2px] bg-black/15 z-20 shadow-[1px_0_2px_rgba(255,255,255,0.4)]"
          ></div>

          <button
            @click="toggleBookmark"
            class="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#0D47A1] transition-transform active:scale-95"
          >
            <img
              :src="isBookmarked ? bookmarkBlue : bookmarkOutline"
              alt="Закладка"
              class="w-4 h-4"
            />
          </button>

          <div
            class="pl-4 flex flex-col h-full justify-between z-10 text-teal-950"
          >
            <span
              class="text-xs uppercase tracking-wider opacity-75 font-semibold"
              >{{ book.author }}</span
            >
            <div>
              <p class="font-black text-2xl leading-tight mb-2">
                {{ book.title }}
              </p>
              <span class="text-xs opacity-60"
                >Страница превью #{{ activeImageIndex + 1 }}</span
              >
            </div>
            <div class="w-10 h-1 bg-current opacity-30"></div>
          </div>
        </div>
      </div>

      <div
        class="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-4 mb-1">
            <span class="text-sm sm:text-base text-gray-400">
              {{ book.author }}
            </span>

            <div
              class="flex items-center gap-4 text-xs sm:text-sm text-gray-600 font-medium"
            >
              <div class="flex items-center gap-1.5">
                <img src="@/assets/icons/chat.svg" alt="Отзывы" class="w-4 h-4" />
                <span>{{ book.reviewsCount }}</span>
              </div>
              <div class="flex items-center gap-1">
                <img src="@/assets/icons/star-blue.svg" alt="Рейтинг" class="w-4 h-4" />
                <span>{{ book.rating }}</span>
              </div>
            </div>
          </div>

          <h1
            class="text-xl sm:text-2xl lg:text-[28px] font-bold text-black mb-3"
          >
            {{ book.title }}
          </h1>

          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="text-xs text-gray-400 border border-gray-300 rounded-md px-2.5 py-0.5"
            >
              {{ tag }}
            </span>
          </div>

          <p class="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
            {{ book.description }}
          </p>

          <a
            href="#"
            class="inline-block text-xs sm:text-sm text-gray-400 hover:text-[#0D47A1] underline underline-offset-4 transition-colors mb-6"
          >
            Читать фрагмент
          </a>
        </div>

        <div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            <button
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <img src="@/assets/icons/book-open.svg" alt="Читать" class="w-4 h-4" />
              <span>Читать</span>
            </button>

            <button
              class="bg-white hover:bg-blue-50 text-gray-800 hover:text-[#0D47A1] border border-gray-400 hover:border-[#0D47A1] font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <img src="@/assets/icons/headphones.svg" alt="Слушать" class="w-4 h-4" />
              <span>Слушать</span>
            </button>

            <button
              class="bg-white hover:bg-blue-50 text-gray-800 hover:text-[#0D47A1] border border-gray-400 hover:border-[#0D47A1] font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <img src="@/assets/icons/clock.svg" alt="Саммари" class="w-4 h-4" />
              <span>Саммари</span>
            </button>
          </div>

          <div
            class="mt-4 pt-3.5 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2.5"
          >
            <span class="text-xs text-gray-500 font-medium">Статус чтения:</span>
            <div class="flex items-center gap-2">
              <button
                v-for="status in readingStatuses"
                :key="status.id"
                type="button"
                @click="toggleStatus(status.id)"
                :class="[
                  'text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all',
                  currentStatus === status.id
                    ? 'bg-[#0D47A1] text-white shadow-sm'
                    : 'bg-[#EFEFEF] hover:bg-gray-200 text-gray-700',
                ]"
              >
                {{ status.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
