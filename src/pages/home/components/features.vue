<script setup>
import Container from "@/components/layout/container.vue";
</script>

<template>
  <section class="w-full py-10 lg:py-14">
    <Container>
      <!-- Заголовок секции -->
      <h2
        class="text-2xl sm:text-3xl lg:text-[36px] font-bold text-black mb-8 lg:mb-10 leading-tight"
      >
        Только с нами вы можете:
      </h2>

      <!-- Сетка: 2 колонки на мобилке (gap 25px) и 12 колонок на ПК (gap 30px) -->
      <div class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px]">
        <!-- КАРТОЧКА 1: Саммари (7 колонок на ПК) -->
        <div
          class="col-span-2 lg:col-span-7 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 lg:px-10 lg:py-8 min-h-[210px] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <!-- Иллюстрация слева -->
          <div
            class="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <!-- Иконка быстрого чтения / таймера -->
            <svg
              class="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
              <circle
                cx="18"
                cy="6"
                r="4"
                class="fill-[#92B4FA] stroke-[#0D47A1]"
                stroke-width="1.5"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 4.5v1.5l1 1"
              />
            </svg>
          </div>

          <!-- Текст справа -->
          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-center sm:text-left max-w-xs lg:max-w-sm"
          >
            Экономить свое время, читая
            <strong class="font-bold text-black">саммари</strong> популярных
            книг
          </p>
        </div>

        <!-- КАРТОЧКА 2: Мобильное приложение (5 колонок на ПК) -->
        <div
          class="col-span-2 lg:col-span-5 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 min-h-[210px] flex flex-col justify-between gap-5"
        >
          <div class="flex items-center justify-between gap-4">
            <!-- Иллюстрация слева -->
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
            >
              <svg
                class="w-12 h-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <rect
                  x="6"
                  y="2"
                  width="12"
                  height="20"
                  rx="3"
                  class="fill-[#BCE0FD]/40"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 19h4"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 7h6M9 10h6M9 13h4"
                />
              </svg>
            </div>

            <!-- Текст справа -->
            <p
              class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-right"
            >
              Пользоваться <br />
              <strong class="font-bold text-black"
                >мобильным приложением</strong
              >
            </p>
          </div>

          <!-- Кнопки App Store и Google Play -->
          <div class="flex flex-wrap items-center justify-end gap-3 pt-1">
            <!-- App Store -->
            <a
              href="#"
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white rounded-lg px-3.5 py-1.5 flex items-center gap-2 transition-colors"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3z"
                />
              </svg>
              <div class="flex flex-col text-left leading-none">
                <span class="text-[8px] opacity-80">Download on the</span>
                <span class="text-xs font-semibold">App Store</span>
              </div>
            </a>

            <!-- Google Play -->
            <a
              href="#"
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white rounded-lg px-3.5 py-1.5 flex items-center gap-2 transition-colors"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"
                />
              </svg>
              <div class="flex flex-col text-left leading-none">
                <span class="text-[8px] opacity-80 uppercase">Get it on</span>
                <span class="text-xs font-semibold">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <!-- КАРТОЧКА 3: Оффлайн режим (5 колонок на ПК) -->
        <div
          class="col-span-2 lg:col-span-5 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 min-h-[210px] flex flex-col justify-between relative overflow-hidden"
        >
          <!-- Текст сверху слева -->
          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug max-w-[260px] z-10"
          >
            Скачивать книги и читать в
            <strong class="font-bold text-black">оффлайн режиме</strong>
          </p>

          <!-- Иллюстрация снизу справа -->
          <div
            class="self-end mt-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <svg
              class="w-12 h-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
              <rect
                x="6"
                y="16"
                width="12"
                height="3"
                rx="1"
                class="fill-[#92B4FA]/50 border-none"
                stroke="none"
              />
            </svg>
          </div>
        </div>

        <!-- КАРТОЧКА 4: Аудиоформат (7 колонок на ПК) -->
        <div
          class="col-span-2 lg:col-span-7 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 lg:px-10 lg:py-8 min-h-[210px] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <!-- Текст слева -->
          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-center sm:text-left max-w-sm"
          >
            Слушать любую книгу в
            <strong class="font-bold text-black">аудиоформате</strong> на
            прогулке или в путешествии
          </p>

          <!-- Иллюстрация справа -->
          <div
            class="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <!-- Иконка наушников и аудиоволны -->
            <svg
              class="w-16 h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
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
                class="fill-[#92B4FA]"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 15v-2m4 2v-4m-2 5v-6"
              />
            </svg>
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
