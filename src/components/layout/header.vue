<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Container from "./container.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const searchQuery = ref("");
const isAuthModalOpen = ref(false);
const loginForm = ref({ name: "", email: "" });

const user = computed(() => store.getters.currentUser);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
const favoritesCount = computed(() => store.state.favorites.length);

const navLinks = [
  { name: "Главная", to: "/" },
  { name: "Каталог", to: "/catalog" },
  { name: "Что выбрать", to: "#" },
  { name: "О нас", to: "#" },
  { name: "Контакты", to: "#" },
];

const handleSearch = () => {
  store.commit("SET_SEARCH_QUERY", searchQuery.value);
  if (route.path !== "/catalog") {
    router.push("/catalog");
  }
};

const handleLogin = () => {
  if (!loginForm.value.name.trim()) return;
  store.dispatch("login", {
    name: loginForm.value.name.trim(),
    email: loginForm.value.email.trim(),
  });
  isAuthModalOpen.value = false;
};

const handleLogout = () => {
  store.dispatch("logout");
};

const openFavorites = () => {
  router.push({ path: "/catalog", query: { filter: "favorites" } });
};
</script>

<template>
  <header class="w-full bg-white py-6">
    <Container>
      <div
        class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-center"
      >
        <router-link
          to="/"
          class="col-span-2 lg:col-span-2 flex flex-col items-center lg:items-start group"
        >
          <div class="flex flex-col items-center">
            <img
              src="@/assets/icons/logo.svg"
              alt="Читальня"
              class="w-28 h-12 transition-transform group-hover:scale-105"
            />
            <span class="font-black text-xl tracking-wider text-black mt-1">
              ЧИТАЛЬНЯ
            </span>
          </div>
        </router-link>

        <div
          class="col-span-2 lg:col-span-8 flex flex-col justify-between gap-5"
        >
          <nav class="flex flex-wrap items-center justify-between gap-3 px-1">
            <template v-for="link in navLinks" :key="link.name">
              <router-link
                v-if="link.to.startsWith('/')"
                :to="link.to"
                :class="[
                  'text-sm sm:text-base transition-colors hover:text-[#0D47A1]',
                  (link.to === '/' ? route.path === '/' : route.path.startsWith(link.to))
                    ? 'font-bold text-black'
                    : 'font-normal text-gray-800',
                ]"
              >
                {{ link.name }}
              </router-link>
              <a
                v-else
                :href="link.to"
                class="text-sm sm:text-base transition-colors hover:text-[#0D47A1] font-normal text-gray-800"
              >
                {{ link.name }}
              </a>
            </template>
          </nav>

          <div class="relative flex items-center w-full">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Введите автора или название книги..."
              class="w-full bg-[#EFEFEF] text-gray-800 placeholder-gray-400 text-sm rounded-xl py-3 pl-4 pr-14 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50 transition-all"
            />
            <button
              @click="handleSearch"
              class="absolute right-0 top-0 bottom-0 bg-[#0D47A1] hover:bg-[#0a367a] text-white px-4 rounded-xl flex items-center justify-center transition-colors"
            >
              <img src="@/assets/icons/search-white.svg" alt="Поиск" class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          class="col-span-2 lg:col-span-2 grid grid-cols-2 lg:flex lg:flex-col gap-[25px] lg:gap-3"
        >
          <button
            v-if="!isAuthenticated"
            @click="isAuthModalOpen = true"
            class="w-full bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Войти
          </button>
          <button
            v-else
            @click="handleLogout"
            class="w-full bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-colors truncate cursor-pointer"
            :title="'Выйти (' + user.name + ')'"
          >
            {{ user.name }} (Выйти)
          </button>

          <button
            @click="openFavorites"
            class="w-full bg-white hover:bg-blue-50 text-[#0D47A1] border border-[#0D47A1] font-medium text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Мои книги</span>
            <span
              v-if="favoritesCount > 0"
              class="w-5 h-5 rounded-full bg-[#0D47A1] text-white text-[10px] font-bold flex items-center justify-center shrink-0"
            >
              {{ favoritesCount }}
            </span>
          </button>
        </div>
      </div>
    </Container>

    <div
      v-if="isAuthModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
      @click.self="isAuthModalOpen = false"
    >
      <div
        class="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl flex flex-col gap-5 border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-black">Вход в Читальню</h3>
          <button
            @click="isAuthModalOpen = false"
            class="text-gray-400 hover:text-gray-700 text-lg leading-none cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs text-gray-500 mb-1.5 font-medium">Ваше имя</label>
            <input
              v-model="loginForm.name"
              type="text"
              required
              placeholder="Например, Эдуард"
              class="w-full bg-[#EFEFEF] rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50"
            />
          </div>

          <div>
            <label class="block text-xs text-gray-500 mb-1.5 font-medium">Email</label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              placeholder="name@example.com"
              class="w-full bg-[#EFEFEF] rounded-xl p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/50"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm py-3 px-4 rounded-xl transition-colors mt-2 cursor-pointer shadow-md"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
