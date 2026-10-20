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
  <footer class="w-full bg-[#EFEFEF] text-gray-900 mt-16">
    <div class="pt-12 pb-10">
      <Container>
        <div class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px]">
          <div
            class="col-span-2 sm:col-span-1 lg:col-span-4 flex flex-col justify-between items-start gap-8"
          >
            <router-link to="/" class="flex flex-col items-center group">
              <img
                src="@/assets/icons/logo.svg"
                alt="Читальня"
                class="w-28 h-12 transition-transform group-hover:scale-105"
              />
              <span class="font-black text-xl tracking-wider text-black mt-1">
                ЧИТАЛЬНЯ
              </span>
            </router-link>

            <div class="flex items-center gap-6 text-gray-600">
              <a
                href="#"
                class="hover:opacity-75 transition-opacity"
                aria-label="Facebook"
              >
                <img src="@/assets/icons/facebook.svg" alt="Facebook" class="w-5 h-5" />
              </a>
              <a
                href="#"
                class="hover:opacity-75 transition-opacity"
                aria-label="YouTube"
              >
                <img src="@/assets/icons/youtube.svg" alt="YouTube" class="w-6 h-6" />
              </a>
              <a
                href="#"
                class="hover:opacity-75 transition-opacity"
                aria-label="Instagram"
              >
                <img src="@/assets/icons/instagram.svg" alt="Instagram" class="w-5 h-5" />
              </a>
            </div>
          </div>

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

          <div
            class="col-span-2 lg:col-span-5 flex flex-col justify-between items-start lg:items-end text-left lg:text-right gap-8 mt-4 lg:mt-0"
          >
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

            <div class="flex flex-col items-start lg:items-end w-full">
              <span class="text-xs sm:text-sm text-gray-600 mb-2.5">
                Скачать приложение
              </span>
              <div class="flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  class="border border-gray-400 hover:border-[#0D47A1] hover:text-[#0D47A1] text-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-colors bg-white/50"
                >
                  <img src="@/assets/icons/apple.svg" alt="App Store" class="w-5 h-5" />
                  <div class="flex flex-col text-left leading-none">
                    <span class="text-[8px] opacity-75">Download on the</span>
                    <span class="text-xs font-semibold">App Store</span>
                  </div>
                </a>

                <a
                  href="#"
                  class="border border-gray-400 hover:border-[#0D47A1] hover:text-[#0D47A1] text-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 transition-colors bg-white/50"
                >
                  <img src="@/assets/icons/google-play.svg" alt="Google Play" class="w-4 h-4" />
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

    <div class="border-t border-gray-300/80 py-6">
      <Container>
        <div
          class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px] items-center text-xs sm:text-sm text-gray-600"
        >
          <div class="col-span-2 sm:col-span-1 lg:col-span-3">
            <a
              href="tel:+375445700057"
              class="hover:text-[#0D47A1] transition-colors"
            >
              +375 44 570-00-57
            </a>
          </div>

          <div class="col-span-2 sm:col-span-1 lg:col-span-4">
            <a
              href="mailto:support@chitalna.by"
              class="hover:text-[#0D47A1] transition-colors"
            >
              support@chitalna.by
            </a>
          </div>

          <div class="col-span-2 lg:col-span-5 lg:text-right">
            220013, Республика Беларусь, г. Минск, ул. Петруся Бровки, 10
          </div>
        </div>
      </Container>
    </div>
  </footer>
</template>
