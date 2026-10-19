<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    // Пример: [{ label: 'Главная', href: '/' }, { label: 'Каталог' }]
  },
});
</script>

<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <ol class="flex items-center flex-wrap gap-2 text-xs sm:text-sm">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2"
      >
        <router-link
          v-if="item.href && item.href !== '#' && index < items.length - 1"
          :to="item.href"
          class="text-gray-400 hover:text-[#0D47A1] transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span
          v-else-if="item.href === '#' && index < items.length - 1"
          class="text-gray-400"
        >
          {{ item.label }}
        </span>
        <span v-else class="text-gray-800 font-medium">
          {{ item.label }}
        </span>

        <span
          v-if="index < items.length - 1"
          class="text-gray-400 select-none text-xs"
        >
          &gt;
        </span>
      </li>
    </ol>
  </nav>
</template>
