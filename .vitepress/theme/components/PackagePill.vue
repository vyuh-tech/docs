<script setup lang="ts">
defineProps<{
  name: string;
  color?: 'violet' | 'teal' | 'amber' | 'blue';
}>();
</script>

<template>
  <span class="pkg-pill" :class="color ? `pkg-pill-${color}` : 'pkg-pill-violet'">
    {{ name }}
  </span>
</template>

<style>
@reference "../style.css";

.pkg-pill {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap;
  font-family: var(--vyuh-font-mono);
  transition: all 0.3s var(--vyuh-ease-out);
}

.pkg-pill-violet {
  @apply text-violet-700 bg-violet-100 border border-violet-200;
  @apply dark:text-violet-300 dark:bg-violet-900/40 dark:border-violet-700/50;
}

.pkg-pill-teal {
  @apply text-teal-700 bg-teal-100 border border-teal-200;
  @apply dark:text-teal-300 dark:bg-teal-900/40 dark:border-teal-700/50;
}

.pkg-pill-amber {
  @apply text-amber-700 bg-amber-100 border border-amber-200;
  @apply dark:text-amber-300 dark:bg-amber-900/40 dark:border-amber-700/50;
}

.pkg-pill-blue {
  @apply text-blue-700 bg-blue-100 border border-blue-200;
  @apply dark:text-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50;
}
</style>
