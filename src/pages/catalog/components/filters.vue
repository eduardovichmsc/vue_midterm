<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import starBlue from "@/assets/icons/star-blue.svg";
import starGray from "@/assets/icons/star-gray.svg";

const store = useStore();
const emit = defineEmits(["apply", "reset"]);

const openSections = ref({
  genres: false,
  authors: true,
  language: true,
  rating: true,
});

const toggleSection = (key) => {
  openSections.value[key] = !openSections.value[key];
};

const genresList = computed(() => store.getters.allGenres || []);
const authorsList = computed(() => store.getters.allAuthors || []);

const languagesList = [
  "Русский",
  "Белорусский",
  "Украинский",
  "Английский",
  "Немецкий",
  "Французский",
  "Польский",
];

const authorSearch = ref("");
const selectedGenres = ref([]);
const selectedAuthors = ref([]);
const selectedLanguages = ref(["Русский", "Белорусский"]);
const selectedRating = ref(4);

const toggleRating = (star) => {
  selectedRating.value = selectedRating.value === star ? 0 : star;
};

const filteredAuthors = computed(() => {
  const list = authorsList.value || [];
  if (!authorSearch.value.trim()) return list;
  return list.filter((a) =>
    a.toLowerCase().includes(authorSearch.value.toLowerCase()),
  );
});

const applyFilters = () => {
  emit("apply", {
    genres: selectedGenres.value,
    authors: selectedAuthors.value,
    languages: selectedLanguages.value,
    rating: selectedRating.value,
  });
};

const resetFilters = () => {
  authorSearch.value = "";
  selectedGenres.value = [];
  selectedAuthors.value = [];
  selectedLanguages.value = [];
  selectedRating.value = 0;
  emit("reset");
};
</script>

<template>
  <aside class="w-full flex flex-col gap-3.5">
    <h2 class="text-xl sm:text-2xl font-bold text-black mb-2">Фильтр</h2>

    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('genres')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Жанры</span>
        <img
          src="@/assets/icons/chevron-down.svg"
          alt=""
          :class="[
            'w-4 h-4 transition-transform',
            openSections.genres ? 'rotate-180' : '',
          ]"
        />
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

    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('authors')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Автор</span>
        <img
          src="@/assets/icons/chevron-down.svg"
          alt=""
          :class="[
            'w-4 h-4 transition-transform',
            openSections.authors ? 'rotate-180' : '',
          ]"
        />
      </button>

      <div v-if="openSections.authors" class="mt-3">
        <div class="relative mb-3">
          <input
            v-model="authorSearch"
            type="text"
            placeholder="Найти автора..."
            class="w-full bg-transparent border border-gray-400 rounded-lg py-1.5 pl-3 pr-8 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0D47A1]"
          />
          <img
            src="@/assets/icons/search.svg"
            alt="Поиск"
            class="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2"
          />
        </div>

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

    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('language')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Язык</span>
        <img
          src="@/assets/icons/chevron-down.svg"
          alt=""
          :class="[
            'w-4 h-4 transition-transform',
            openSections.language ? 'rotate-180' : '',
          ]"
        />
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

    <div class="bg-[#EFEFEF] rounded-xl p-4">
      <button
        @click="toggleSection('rating')"
        class="w-full flex items-center justify-between font-semibold text-sm text-gray-900"
      >
        <span>Рейтинг</span>
        <img
          src="@/assets/icons/chevron-down.svg"
          alt=""
          :class="[
            'w-4 h-4 transition-transform',
            openSections.rating ? 'rotate-180' : '',
          ]"
        />
      </button>

      <div v-if="openSections.rating" class="mt-3 flex items-center gap-1.5">
        <button
          v-for="star in 5"
          :key="star"
          @click="toggleRating(star)"
          type="button"
          class="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
        >
          <img
            :src="star <= selectedRating ? starBlue : starGray"
            alt="Звезда"
            class="w-5 h-5 transition-transform"
          />
        </button>
      </div>
    </div>

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
