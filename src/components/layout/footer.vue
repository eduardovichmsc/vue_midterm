<script setup>
import Container from "./container.vue";

const footerLinks = [
  { name: "Главная", to: "/" },
  { name: "Каталог", to: "/catalog" },
  { name: "Моя библиотека", to: "#" },
  { name: "О нас", to: "#" },
  { name: "Контакты", to: "#" },
];
</script>

<template>
  <!-- Без скруглений снизу, приятный светло-серый/голубоватый фон на всю ширину -->
  <footer class="w-full bg-[#EFEFEF] text-gray-900 mt-16">
    <!-- ВЕРХНЯЯ ЧАСТЬ ФУТЕРА -->
    <div class="pt-12 pb-10">
      <Container>
        <div class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px]">
          <!-- 1. ЛЕВАЯ КОЛОНКА: Логотип и соцсети (4 колонки) -->
          <div
            class="col-span-2 sm:col-span-1 lg:col-span-4 flex flex-col justify-between items-start gap-8"
          >
            <!-- Логотип -->
            <router-link to="/" class="flex flex-col items-center group">
              <svg
                class="w-28 h-12 text-[#0D47A1] transition-transform group-hover:scale-105"
                viewBox="0 0 120 50"
                fill="currentColor"
              >
                <path
                  d="M55 42 C35 35, 15 35, 5 40 L8 32 C20 28, 38 28, 56 38 Z"
                />
                <path
                  d="M56 35 C38 24, 20 22, 10 26 L14 19 C26 16, 42 18, 57 31 Z"
                />
                <path
                  d="M58 28 C42 15, 26 12, 16 14 L20 8 C32 6, 46 10, 59 24 Z"
                />
                <path
                  d="M65 42 C85 35, 105 35, 115 40 L112 32 C100 28, 82 28, 64 38 Z"
                />
                <path
                  d="M64 35 C82 24, 100 22, 110 26 L106 19 C94 16, 78 18, 63 31 Z"
                />
                <path
                  d="M62 28 C78 15, 94 12, 104 14 L100 8 C88 6, 74 10, 61 24 Z"
                />
                <path d="M53 40 Q60 48 67 40 L64 35 Q60 41 56 35 Z" />
              </svg>
              <span class="font-black text-xl tracking-wider text-black mt-1">
                ЧИТАЛЬНЯ
              </span>
            </router-link>

            <!-- Иконки соцсетей (Facebook, YouTube, Instagram) -->
            <div class="flex items-center gap-6 text-gray-600">
              <!-- Facebook -->
              <a
                href="#"
                class="hover:text-[#0D47A1] transition-colors"
                aria-label="Facebook"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"
                  />
                </svg>
              </a>
              <!-- YouTube -->
              <a
                href="#"
                class="hover:text-[#0D47A1] transition-colors"
                aria-label="YouTube"
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z"
                  />
                </svg>
              </a>
              <!-- Instagram -->
              <a
                href="#"
                class="hover:text-[#0D47A1] transition-colors"
                aria-label="Instagram"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <!-- 2. ЦЕНТРАЛЬНАЯ КОЛОНКА: Навигация (3 колонки) -->
          <div
            class="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col justify-between gap-3"
          >
            <template v-for="link in footerLinks" :key="link.name">
              <router-link
                v-if="link.to.startsWith('/')"
                :to="link.to"
                class="text-base text-gray-800 hover:text-[#0D47A1] font-medium transition-colors w-fit"
              >
                {{ link.name }}
              </router-link>
              <a
                v-else
                :href="link.to"
                class="text-base text-gray-800 hover:text-[#0D47A1] font-medium transition-colors w-fit"
              >
                {{ link.name }}
              </a>
            </template>
          </div>

          <!-- 3. ПРАВАЯ КОЛОНКА: Регистрация и Приложения (5 колонок) -->
          <div
            class="col-span-2 lg:col-span-5 flex flex-col justify-between items-start lg:items-end text-left lg:text-right gap-8 mt-4 lg:mt-0"
          >
            <!-- Блок призыва к регистрации -->
            <div class="flex flex-col items-start lg:items-end w-full">
              <p
                class="text-sm sm:text-base text-gray-800 mb-4 max-w-xs leading-snug"
              >
                Откройте для себя мир комфортного чтения вместе с Читальней
              </p>
              <button
                class="bg-[#0D47A1] hover:bg-[#0a367a] text-white font-medium text-sm sm:text-base py-3 px-8 rounded-xl transition-colors"
              >
                Зарегистрироваться
              </button>
            </div>

            <!-- Блок скачивания приложения -->
            <div class="flex flex-col items-start lg:items-end w-full">
              <span class="text-xs sm:text-sm text-gray-600 mb-2.5">
                Скачать приложение
              </span>
              <div class="flex flex-wrap items-center gap-3">
                <!-- App Store (светлая кнопка с рамкой, как на макете футера) -->
                <a
                  href="#"
                  class="border border-gray-400 hover:border-[#0D47A1] hover:text-[#0D47A1] text-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-colors bg-white/50"
                >
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3z"
                    />
                  </svg>
                  <div class="flex flex-col text-left leading-none">
                    <span class="text-[8px] opacity-75">Download on the</span>
                    <span class="text-xs font-semibold">App Store</span>
                  </div>
                </a>

                <!-- Google Play -->
                <a
                  href="#"
                  class="border border-gray-400 hover:border-[#0D47A1] hover:text-[#0D47A1] text-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-colors bg-white/50"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"
                    />
                  </svg>
                  <div class="flex flex-col text-left leading-none">
                    <span class="text-[8px] opacity-75 uppercase"
                      >Get it on</span
                    >
                    <span class="text-xs font-semibold">Google Play</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <!-- РАЗДЕЛИТЕЛЬНАЯ ЛИНИЯ И НИЖНЯЯ ЧАСТЬ С КОНТАКТАМИ -->
    <div class="border-t border-gray-300/80 py-6">
      <Container>
        <div
          class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-center text-xs sm:text-sm text-gray-600"
        >
          <!-- Телефон (под первой колонкой) -->
          <div class="col-span-2 sm:col-span-1 lg:col-span-3">
            <a
              href="tel:+375445700057"
              class="hover:text-[#0D47A1] transition-colors"
            >
              +375 44 570-00-57
            </a>
          </div>

          <!-- Email (смещен ближе к телефону, как на макете) -->
          <div class="col-span-2 sm:col-span-1 lg:col-span-4">
            <a
              href="mailto:support@chitalna.by"
              class="hover:text-[#0D47A1] transition-colors"
            >
              support@chitalna.by
            </a>
          </div>

          <!-- Адрес (выровнен по правому краю) -->
          <div class="col-span-2 lg:col-span-5 lg:text-right">
            220013, Республика Беларусь, г. Минск, ул. Петруся Бровки, 10
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>
