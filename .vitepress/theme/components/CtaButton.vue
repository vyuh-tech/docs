<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  href?: string;
  icon?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
}>();
</script>

<template>
  <a
    :href="href"
    class="cta-btn"
    :class="[
      variant === 'secondary' ? 'cta-btn-secondary' : 'cta-btn-primary',
      size === 'lg' && 'cta-btn-lg',
      size === 'sm' && 'cta-btn-sm',
    ]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <Icon v-if="icon" :icon="icon" />
    <slot />
  </a>
</template>

<style>
@reference "../style.css";

.cta-btn {
  @apply inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-sm rounded-xl cursor-pointer no-underline;
  @apply max-md:justify-center max-md:w-full;
  font-family: var(--vyuh-font-display);
  transition: all 0.3s var(--vyuh-ease-out);
}

.cta-btn-primary {
  @apply text-white border-none;
  background: linear-gradient(
    135deg,
    #5856D6,
    #6e6ce0
  );
  box-shadow: 0 4px 20px rgba(88, 86, 214, 0.3);
}

.cta-btn-primary:hover {
  @apply -translate-y-1;
  box-shadow:
    0 12px 40px rgba(88, 86, 214, 0.5),
    0 0 60px rgba(88, 86, 214, 0.3);
}

.cta-btn-secondary {
  @apply bg-white text-slate-700 border border-slate-200;
  @apply dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-500;
}

.cta-btn-secondary:hover {
  @apply border-violet-600 text-violet-600;
  @apply dark:border-violet-400 dark:text-violet-400;
}

.cta-btn-lg {
  @apply px-10 py-4 text-base;
}

.cta-btn-sm {
  @apply px-5 py-2.5 text-xs;
}
</style>
