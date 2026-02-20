<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon: string;
  title: string;
  description: string;
  href: string;
  color?: 'violet' | 'teal' | 'blue';
}>();
</script>

<template>
  <a :href="href" class="path-card" :class="color ? `path-card-${color}` : 'path-card-violet'">
    <div class="path-card-icon">
      <Icon :icon="icon" />
    </div>
    <h3 class="path-card-title">{{ title }}</h3>
    <p class="path-card-description">{{ description }}</p>
    <span class="path-card-link">
      Explore <Icon icon="ph:arrow-right-bold" />
    </span>
  </a>
</template>

<style>
@reference "../style.css";

.path-card {
  @apply block md:grid md:grid-rows-subgrid md:row-span-4 p-6 rounded-xl border no-underline backdrop-blur-xl relative overflow-hidden text-left items-start justify-items-start;
  @apply bg-white/40 dark:bg-zinc-800/30;
  @apply border-white/50 dark:border-white/10;
  transition: all 0.3s var(--vyuh-ease-out);
}

.path-card:hover {
  @apply -translate-y-1;
}

.path-card-violet:hover { box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.2); }
.path-card-teal:hover { box-shadow: 0 20px 40px -10px rgba(20, 184, 166, 0.2); }
.path-card-blue:hover { box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.2); }

.path-card-icon {
  @apply text-2xl md:mb-0 mb-4;
}

.path-card-violet .path-card-icon { @apply text-violet-500 dark:text-violet-400; }
.path-card-teal .path-card-icon { @apply text-teal-500 dark:text-teal-400; }
.path-card-blue .path-card-icon { @apply text-blue-500 dark:text-blue-400; }

.path-card-title {
  @apply text-lg font-bold text-slate-900 dark:text-zinc-100 md:mb-0 mb-2;
  font-family: var(--vyuh-font-display);
}

.path-card-description {
  @apply text-sm text-slate-600 dark:text-zinc-400 leading-relaxed md:mb-0 mb-4;
}

.path-card-link {
  @apply inline-flex items-center gap-1 text-sm font-semibold;
}

.path-card-violet .path-card-link { @apply text-violet-600 dark:text-violet-400; }
.path-card-teal .path-card-link { @apply text-teal-600 dark:text-teal-400; }
.path-card-blue .path-card-link { @apply text-blue-600 dark:text-blue-400; }
</style>
