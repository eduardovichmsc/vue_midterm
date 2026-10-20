<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const activeImageIndex = ref(0);

// Закладка через Vuex
const isBookmarked = computed(() => store.getters.isBookmarked(props.book.id));
const toggleBookmark = () => {
  store.dispatch("toggleBookmark", props.book.id);
};

// Статусы чтения (Reading status по ТЗ)
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
  activeImageIndex.value =
    (activeImageIndex.value - 1 + props.book.gallery.length) %
    props.book.gallery.length;
};

const nextImage = () => {
  activeImageIndex.value =
    (activeImageIndex.value + 1) % props.book.gallery.length;
};
</script>

<template>
  <div
    class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-stretch"
  >
    <!-- 1. ВЕРТИКАЛЬНАЯ ГАЛЕРЕЯ ПРЕВЬЮ (1 колонка на ПК) -->
    <div
      class="hidden lg:flex lg:col-span-1 flex-col items-center justify-between py-2"
    >
      <!-- Стрелка вверх -->
      <button
        @click="prevImage"
        class="text-gray-500 hover:text-[#0D47A1] transition-colors p-1"
        aria-label="Предыдущее фото"
      >
        <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
          <path
            d="M7 27V1M7 1L1 7M7 1L13 7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <!-- Миниатюры (3 штуки) -->
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

      <!-- Стрелка вниз -->
      <button
        @click="nextImage"
        class="text-gray-500 hover:text-[#0D47A1] transition-colors p-1"
        aria-label="Следующее фото"
      >
        <svg width="14" height="28" viewBox="0 0 14 28" fill="none">
          <path
            d="M7 1V27M7 27L1 21M7 27L13 21"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <!-- 2. ОБЪЕДИНЕННЫЙ БЛОК: БОЛЬШАЯ ОБЛОЖКА + ИНФОРМАЦИЯ В РАМКЕ (11 колонок на ПК) -->
    <div
      class="col-span-2 lg:col-span-11 grid grid-cols-1 md:grid-cols-11 border border-gray-300 rounded-[28px] overflow-hidden bg-white shadow-sm"
    >
      <!-- Большая обложка книги (4 из 11 колонок) -->
      <div
        class="md:col-span-4 relative aspect-[3/4] md:aspect-auto min-h-[320px] p-0 flex"
      >
        <div
          :class="[
            'relative w-full h-full rounded-r-2xl overflow-hidden shadow-md flex flex-col justify-between p-6 transition-colors duration-300',
            book.gallery[activeImageIndex].bgColor,
          ]"
        >
          <!-- Линия корешка слева -->
          <div
            class="absolute top-0 bottom-0 left-3 w-[2px] bg-black/15 z-20 shadow-[1px_0_2px_rgba(255,255,255,0.4)]"
          ></div>

          <!-- Кнопка закладки в правом верхнем углу обложки -->
          <button
            @click="toggleBookmark"
            class="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#0D47A1] transition-transform active:scale-95"
          >
            <svg
              :class="[
                'w-4 h-4',
                isBookmarked
                  ? 'fill-[#0D47A1] text-[#0D47A1]'
                  : 'fill-none stroke-current',
              ]"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>

          <!-- Текст на обложке-заглушке -->
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

      <!-- Правая часть с описанием и кнопками (7 из 11 колонок) -->
      <div
        class="md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between"
      >
        <div>
          <!-- Верхняя строка: Автор + Отзывы и Рейтинг -->
          <div class="flex items-center justify-between gap-4 mb-1">
            <span class="text-sm sm:text-base text-gray-400">
              {{ book.author }}
            </span>

            <div
              class="flex items-center gap-4 text-xs sm:text-sm text-gray-600 font-medium"
            >
              <div class="flex items-center gap-1.5">
                <svg
                  class="w-4 h-4 text-gray-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>{{ book.reviewsCount }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg
                  class="w-4 h-4 text-[#0D47A1] fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
                <span>{{ book.rating }}</span>
              </div>
            </div>
          </div>

          <!-- Название книги -->
          <h1
            class="text-xl sm:text-2xl lg:text-[28px] font-bold text-black mb-3"
          >
            {{ book.title }}
          </h1>

          <!-- Теги книги -->
          <div class="flex flex-wrap gap-2 mb-5">
            <span
              v-for="tag in book.tags"
              :key="tag"
              class="text-xs text-gray-400 border border-gray-300 rounded-md px-2.5 py-0.5"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Аннотация -->
          <p class="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
            {{ book.description }}
          </p>

          <!-- Ссылка "Читать фрагмент" -->
          <a
            href="#"
            class="inline-block text-xs sm:text-sm text-gray-400 hover:text-[#0D47A1] underline underline-offset-4 transition-colors mb-6"
          >
            Читать фрагмент
          </a>
        </div>

        <!-- 3 КНОПКИ ДЕЙСТВИЙ: Читать, Слушать, Саммари + СТАТУС ЧТЕНИЯ -->
        <div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            <!-- Читать (Активная залитая кнопка) -->
            <button
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
                />
              </svg>
              <span>Читать</span>
            </button>

            <!-- Слушать -->
            <button
              class="bg-white hover:bg-blue-50 text-gray-800 hover:text-[#0D47A1] border border-gray-400 hover:border-[#0D47A1] font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 18v-6a9 9 0 0118 0v6"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
                />
              </svg>
              <span>Слушать</span>
            </button>

            <!-- Саммари -->
            <button
              class="bg-white hover:bg-blue-50 text-gray-800 hover:text-[#0D47A1] border border-gray-400 hover:border-[#0D47A1] font-medium text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Саммари</span>
            </button>
          </div>

          <!-- СТАТУС ЧТЕНИЯ (Reading status) -->
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
