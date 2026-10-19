<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["apply", "reset"]);

// Состояние открытых/закрытых секций (как на скрине: Жанры и Формат свернуты, остальные открыты)
const openSections = ref({
  genres: false,
  authors: true,
  format: false,
  language: true,
  rating: true,
});

const toggleSection = (key) => {
  openSections.value[key] = !openSections.value[key];
};

// Списки данных со скрина
const genresList = [
  "Психология",
  "Саморазвитие",
  "Художественная",
  "Бизнес",
  "Фэнтези",
  "Биографии",
];
const authorsList = [
  "Аарон Джейсон",
  "Аарсен Зои",
  "Аалто Пекка",
  "Абагинский Архип Григор...",
  "Абалов Александр",
  "Абгарян Наринэ",
  "Абдеева Гульшат",
  "Ольга Примаченко",
  "Фредрик Бакман",
];
const formatsList = ["Текст", "Аудиокнига", "Саммари"];
const languagesList = [
  "Русский",
  "Белорусский",
  "Украинский",
  "Английский",
  "Немецкий",
  "Французский",
  "Польский",
];

// Выбранные значения фильтров
const authorSearch = ref("");
const selectedGenres = ref([]);
const selectedAuthors = ref([]);
const selectedFormats = ref([]);
const selectedLanguages = ref(["Русский", "Белорусский"]); // Отмечены по умолчанию как на скрине
const selectedRating = ref(4); // 4 звезды как на скрине
const onlyFree = ref(false);

// Поиск внутри списка авторов
const filteredAuthors = computed(() => {
  if (!authorSearch.value.trim()) return authorsList;
  return authorsList.filter((a) =>
    a.toLowerCase().includes(authorSearch.value.toLowerCase()),
  );
});

const applyFilters = () => {
  emit("apply", {
    genres: selectedGenres.value,
    authors: selectedAuthors.value,
    formats: selectedFormats.value,
    languages: selectedLanguages.value,
    rating: selectedRating.value,
    onlyFree: onlyFree.value,
  });
};

const resetFilters = () => {
  authorSearch.value = "";
  selectedGenres.value = [];
  selectedAuthors.value = [];
  selectedFormats.value = [];
  selectedLanguages.value = [];
  selectedRating.value = 0;
  onlyFree.value = false;
  emit("reset");
};
</script>

<template>
  <aside class="w-full flex flex-col gap-3.5">
    <h2 class="text-xl sm:text-2xl font-bold text-black mb-2">Фильтр</h2>

    <!-- 1. ЖАНРЫ -->
    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('genres')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Жанры</span>
        <svg
          :class="[
            'w-4 h-4 text-gray-600 transition-transform',
            openSections.genres ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="openSections.genres" class="mt-3 flex flex-col gap-2">
        <label
          v-for="genre in genresList"
          :key="genre"
          class="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer"
        >
          <input
            type="checkbox"
            :value="genre"
            v-model="selectedGenres"
            class="w-4 h-4 rounded border-gray-400 text-[#0D47A1] focus:ring-[#0D47A1]"
          />
          <span>{{ genre }}</span>
        </label>
      </div>
    </div>

    <!-- 2. АВТОР -->
    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('authors')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Автор</span>
        <svg
          :class="[
            'w-4 h-4 text-gray-600 transition-transform',
            openSections.authors ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="openSections.authors" class="mt-3">
        <!-- Поиск автора -->
        <div class="relative mb-3">
          <input
            v-model="authorSearch"
            type="text"
            placeholder="Найти автора..."
            class="w-full bg-transparent border border-gray-400 rounded-lg py-1.5 pl-3 pr-8 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0D47A1]"
          />
          <svg
            class="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
        </div>

        <!-- Список авторов со скроллом -->
        <div
          class="max-h-44 overflow-y-auto pr-1 flex flex-col gap-2 custom-scrollbar"
        >
          <label
            v-for="author in filteredAuthors"
            :key="author"
            class="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer"
          >
            <input
              type="checkbox"
              :value="author"
              v-model="selectedAuthors"
              class="w-4 h-4 rounded border-gray-400 text-[#0D47A1] focus:ring-[#0D47A1] shrink-0"
            />
            <span class="truncate">{{ author }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 3. ФОРМАТ -->
    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('format')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Формат</span>
        <svg
          :class="[
            'w-4 h-4 text-gray-600 transition-transform',
            openSections.format ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="openSections.format" class="mt-3 flex flex-col gap-2">
        <label
          v-for="format in formatsList"
          :key="format"
          class="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer"
        >
          <input
            type="checkbox"
            :value="format"
            v-model="selectedFormats"
            class="w-4 h-4 rounded border-gray-400 text-[#0D47A1] focus:ring-[#0D47A1]"
          />
          <span>{{ format }}</span>
        </label>
      </div>
    </div>

    <!-- 4. ЯЗЫК -->
    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('language')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Язык</span>
        <svg
          :class="[
            'w-4 h-4 text-gray-600 transition-transform',
            openSections.language ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="openSections.language" class="mt-3 flex flex-col gap-2">
        <label
          v-for="lang in languagesList"
          :key="lang"
          class="flex items-center gap-2.5 text-xs text-gray-800 cursor-pointer"
        >
          <input
            type="checkbox"
            :value="lang"
            v-model="selectedLanguages"
            class="w-4 h-4 rounded border-gray-400 text-[#0D47A1] focus:ring-[#0D47A1]"
          />
          <span>{{ lang }}</span>
        </label>
      </div>
    </div>

    <!-- 5. РЕЙТИНГ -->
    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('rating')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Рейтинг</span>
        <svg
          :class="[
            'w-4 h-4 text-gray-600 transition-transform',
            openSections.rating ? 'rotate-180' : '',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div v-if="openSections.rating" class="mt-3 flex items-center gap-1.5">
        <button
          v-for="star in 5"
          :key="star"
          @click="selectedRating = star"
          type="button"
          class="focus:outline-none transition-transform hover:scale-110"
        >
          <svg
            :class="[
              'w-5 h-5 fill-current transition-colors',
              star <= selectedRating ? 'text-[#0D47A1]' : 'text-gray-300',
            ]"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 6. БЕСПЛАТНЫЕ (Switch тумблер) -->
    <div class="bg-[#EFEFEF] rounded-xl p-4 flex items-center justify-between">
      <span class="font-semibold text-sm text-gray-900">Бесплатные</span>
      <button
        type="button"
        @click="onlyFree = !onlyFree"
        :class="[
          'w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300',
          onlyFree ? 'bg-[#0D47A1]' : 'bg-gray-400',
        ]"
      >
        <div
          :class="[
            'bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300',
            onlyFree ? 'translate-x-5' : 'translate-x-0',
          ]"
        ></div>
      </button>
    </div>

    <!-- КНОПКИ ПРИМЕНИТЬ И СБРОСИТЬ -->
    <div class="mt-2 flex flex-col items-center gap-3">
      <button
        @click="applyFilters"
        class="w-4/5 bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm py-2.5 px-6 rounded-xl transition-colors shadow-sm"
      >
        Применить
      </button>

      <button
        @click="resetFilters"
        class="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-4 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  </aside>
</template>
