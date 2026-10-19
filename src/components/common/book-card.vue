<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

// Интерактивная закладка
const isBookmarked = ref(props.book.bookmarked || false);

const openBook = () => {
  router.push(`/book/${props.book.id || 1}`);
};
</script>

<template>
  <div
    @click="openBook"
    class="group cursor-pointer flex flex-col h-full justify-between"
  >
    <div>
      <!-- Обложка с эффектом переплета и страниц (как в макете) -->
      <div
        class="relative aspect-[3/4] w-full mb-3.5 transition-transform duration-300 group-hover:-translate-y-1.5"
      >
        <!-- Белые страницы справа -->
        <div
          class="absolute inset-y-1.5 -right-1.5 w-3 bg-white border border-gray-200 rounded-r-lg shadow-sm z-0"
        ></div>

        <!-- Сама обложка -->
        <div
          :class="[
            'relative z-10 w-full h-full rounded-r-xl rounded-l-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between p-4 sm:p-5',
            book.cover ? 'bg-gray-100' : book.bgColor || 'bg-[#E5E7EB]',
          ]"
        >
          <!-- Линия корешка слева -->
          <div
            class="absolute top-0 bottom-0 left-2.5 w-[2px] bg-black/15 z-20 shadow-[1px_0_2px_rgba(255,255,255,0.4)]"
          ></div>

          <img
            v-if="book.cover"
            :src="book.cover"
            :alt="book.title"
            class="absolute inset-0 w-full h-full object-cover z-10"
          />

          <!-- Текстовая заглушка на обложке, пока нет картинки -->
          <div
            v-else
            :class="[
              'pl-3 flex flex-col h-full justify-between z-10',
              book.textColor || 'text-gray-800',
            ]"
          >
            <span
              class="text-[10px] sm:text-xs opacity-75 font-medium uppercase line-clamp-1"
            >
              {{ book.author }}
            </span>
            <p class="font-bold text-sm sm:text-base leading-snug line-clamp-3">
              {{ book.title }}
            </p>
            <div class="w-6 h-0.5 bg-current opacity-30"></div>
          </div>
        </div>
      </div>

      <!-- Автор -->
      <p class="text-xs text-gray-400 mb-1 truncate">
        {{ book.author }}
      </p>

      <!-- Название книги -->
      <h3
        class="text-sm sm:text-base font-bold text-black group-hover:text-[#0D47A1] transition-colors line-clamp-2 leading-snug mb-2.5"
      >
        {{ book.title }}
      </h3>
    </div>

    <!-- Нижняя панель: Рейтинг, Отзывы, Закладка -->
    <div class="flex items-center justify-between text-xs text-gray-400 pt-1">
      <div class="flex items-center gap-4">
        <!-- Рейтинг -->
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span>{{ book.rating ? book.rating.toFixed(1) : '—' }}</span>
        </div>

        <!-- Комментарии / Отзывы -->
        <div class="flex items-center gap-1">
          <svg
            class="w-3.5 h-3.5 text-gray-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ book.reviews }}</span>
        </div>
      </div>

      <!-- Кнопка "В закладки" -->
      <button
        @click.stop="isBookmarked = !isBookmarked"
        class="p-1 -mr-1 hover:text-[#0D47A1] transition-colors"
        aria-label="Добавить в закладки"
      >
        <svg
          :class="[
            'w-4 h-4 transition-colors',
            isBookmarked
              ? 'text-[#0D47A1] fill-current'
              : 'text-gray-300 fill-current',
          ]"
          viewBox="0 0 20 20"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      </button>
    </div>
  </div>
</template>
