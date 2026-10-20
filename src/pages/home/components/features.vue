<script setup>
import Container from "@/components/layout/container.vue";
</script>

<template>
  <section class="w-full py-10 lg:py-14">
    <Container>
      <h2
        class="text-2xl sm:text-3xl lg:text-[36px] font-bold text-black mb-8 lg:mb-10 leading-tight"
      >
        Только с нами вы можете:
      </h2>

      <div class="grid grid-cols-2 gap-[25px] lg:grid-cols-12 lg:gap-[30px]">
        <div
          class="col-span-2 lg:col-span-7 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 lg:px-10 lg:py-8 min-h-[210px] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div
            class="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <img
              src="@/assets/icons/feature-summary.svg"
              alt="Саммари"
              class="w-16 h-16"
            />
          </div>

          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-center sm:text-left max-w-xs lg:max-w-sm"
          >
            Экономить свое время, читая
            <strong class="font-bold text-black">саммари</strong> популярных
            книг
          </p>
        </div>

        <div
          class="col-span-2 lg:col-span-5 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 min-h-[210px] flex flex-col justify-between gap-5"
        >
          <div class="flex items-center justify-between gap-4">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
            >
              <img
                src="@/assets/icons/feature-mobile.svg"
                alt="Мобильное приложение"
                class="w-12 h-12"
              />
            </div>

            <p
              class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-right"
            >
              Пользоваться <br />
              <strong class="font-bold text-black"
                >мобильным приложением</strong
              >
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-3 pt-1">
            <a
              href="#"
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white rounded-lg px-3.5 py-1.5 flex items-center gap-2 transition-colors"
            >
              <img
                src="@/assets/icons/apple-white.svg"
                alt="App Store"
                class="w-5 h-5"
              />
              <div class="flex flex-col text-left leading-none">
                <span class="text-[8px] opacity-80">Download on the</span>
                <span class="text-xs font-semibold">App Store</span>
              </div>
            </a>

            <a
              href="#"
              class="bg-[#0D47A1] hover:bg-[#0a367a] text-white rounded-lg px-3.5 py-1.5 flex items-center gap-2 transition-colors"
            >
              <img
                src="@/assets/icons/google-play-white.svg"
                alt="Google Play"
                class="w-4 h-4"
              />
              <div class="flex flex-col text-left leading-none">
                <span class="text-[8px] opacity-80 uppercase">Get it on</span>
                <span class="text-xs font-semibold">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        <div
          class="col-span-2 lg:col-span-5 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 min-h-[210px] flex flex-col justify-between relative overflow-hidden"
        >
          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug max-w-[260px] z-10"
          >
            Скачивать книги и читать в
            <strong class="font-bold text-black">оффлайн режиме</strong>
          </p>

          <div
            class="self-end mt-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <img
              src="@/assets/icons/feature-offline.svg"
              alt="Оффлайн режим"
              class="w-12 h-12"
            />
          </div>
        </div>

        <div
          class="col-span-2 lg:col-span-7 bg-[#F2F4F8] hover:bg-[#EBF0F9] transition-colors rounded-[28px] p-6 sm:p-8 lg:px-10 lg:py-8 min-h-[210px] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p
            class="text-lg sm:text-xl lg:text-[22px] text-gray-900 leading-snug text-center sm:text-left max-w-sm"
          >
            Слушать любую книгу в
            <strong class="font-bold text-black">аудиоформате</strong> на
            прогулке или в путешествии
          </p>

          <div
            class="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0D47A1]"
          >
            <img
              src="@/assets/icons/feature-audio.svg"
              alt="Аудиоформат"
              class="w-16 h-16"
            />
          </div>
        </div>
      </div>
    </Container>
  </section>
</template>
