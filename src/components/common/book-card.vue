<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import bookmarkBlue from "@/assets/icons/bookmark-blue.svg";
import bookmarkGray from "@/assets/icons/bookmark-gray.svg";

const router = useRouter();
const store = useStore();

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const isBookmarked = computed(() => store.getters.isBookmarked(props.book.id));

const toggleBookmark = () => {
  store.dispatch("toggleBookmark", props.book.id);
};

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
      <div
        class="relative aspect-[3/4] w-full mb-3.5 transition-transform duration-300 group-hover:-translate-y-1.5"
      >
        <div
          class="absolute inset-y-1.5 -right-1.5 w-3 bg-white border border-gray-200 rounded-r-lg shadow-sm z-0"
        ></div>

        <div
          :class="[
            'relative z-10 w-full h-full rounded-r-xl rounded-l-sm overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between p-4 sm:p-5',
            book.cover ? 'bg-gray-100' : book.bgColor || 'bg-[#E5E7EB]',
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

      <p class="text-xs text-gray-400 mb-1 truncate">
        {{ book.author }}
      </p>

      <h3
        class="text-sm sm:text-base font-bold text-black group-hover:text-[#0D47A1] transition-colors line-clamp-2 leading-snug mb-2.5"
      >
        {{ book.title }}
      </h3>
    </div>

    <div class="flex items-center justify-between text-xs text-gray-400 pt-1">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1">
          <img src="@/assets/icons/star.svg" alt="Рейтинг" class="w-4 h-4" />
          <span>{{ book.rating ? book.rating.toFixed(1) : '—' }}</span>
        </div>

        <div class="flex items-center gap-1">
          <img src="@/assets/icons/chat.svg" alt="Отзывы" class="w-3.5 h-3.5" />
          <span>{{ book.reviews }}</span>
        </div>
      </div>

      <button
        @click.stop="toggleBookmark"
        class="p-1 -mr-1 hover:opacity-80 transition-opacity"
        aria-label="Добавить в закладки"
      >
        <img
          :src="isBookmarked ? bookmarkBlue : bookmarkGray"
          alt="В закладки"
          class="w-4 h-4 transition-transform active:scale-95"
        />
      </button>
    </div>
  </div>
</template>
