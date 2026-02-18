<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  icon?: string;
  color?: 'blue' | 'purple' | 'teal' | 'amber';
}>();
</script>

<template>
  <div
    class="badge"
    :class="color ? `badge-${color}` : 'badge-blue'"
  >
    <Icon v-if="icon" :icon="icon" />
    <span><slot /></span>
  </div>
</template>

<style>
@reference "../style.css";

.badge {
  @apply inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest w-fit mb-6;
  font-family: var(--vyuh-font-mono);
}

.badge svg {
  @apply text-sm;
}

.badge-blue {
  @apply text-blue-600 dark:text-blue-400;
  @apply bg-blue-600/10 border border-blue-600/30;
  @apply dark:bg-blue-400/15 dark:border-blue-400/30;
  box-shadow: var(--glow-blue);
}

.badge-purple {
  @apply text-violet-500 dark:text-violet-400;
  @apply bg-violet-500/10 border border-violet-500/30;
  @apply dark:bg-violet-400/15 dark:border-violet-400/30;
  box-shadow: var(--glow-purple);
}

.badge-teal {
  @apply text-teal-500 dark:text-teal-400;
  @apply bg-teal-500/10 border border-teal-500/30;
  @apply dark:bg-teal-400/15 dark:border-teal-400/30;
  box-shadow: var(--glow-teal);
}

.badge-amber {
  @apply text-amber-600 dark:text-amber-400;
  @apply bg-amber-600/10 border border-amber-600/30;
  @apply dark:bg-amber-400/15 dark:border-amber-400/30;
  box-shadow: var(--glow-amber);
}
</style>
