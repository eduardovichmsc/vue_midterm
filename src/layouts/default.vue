<script setup>
import AppHeader from "../components/layout/header.vue";
import AppFooter from "../components/layout/footer.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <app-header />

    <main class="flex-grow w-full">
      <slot />
    </main>

    <app-footer />
  </div>
</template>
