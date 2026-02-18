<script setup lang="ts">
defineProps<{
  /** Add a top border */
  borderTop?: boolean;
  /** Add a bottom border */
  borderBottom?: boolean;
}>();
</script>

<template>
  <section
    class="cta-section"
    :class="[
      borderTop && 'border-t border-slate-200/50 dark:border-zinc-700/50',
      borderBottom && 'border-b border-slate-200/50 dark:border-zinc-700/50',
    ]"
  >
    <div class="cta-blur cta-blur-1" />
    <div class="cta-blur cta-blur-2" />
    <div class="cta-content">
      <slot />
    </div>
  </section>
</template>

<style>
@reference "../style.css";

.cta-section {
  @apply relative py-32 px-6 text-center overflow-hidden;
}

.cta-blur {
  @apply absolute rounded-full pointer-events-none;
  filter: blur(150px);
}

.cta-blur-1 {
  @apply w-[600px] h-[600px] bg-violet-500 -top-48 left-[10%] opacity-12 dark:opacity-20;
}

.cta-blur-2 {
  @apply w-[500px] h-[500px] bg-purple-500 -bottom-36 right-[10%] opacity-10 dark:opacity-18;
}

.cta-content {
  @apply relative z-10 max-w-3xl mx-auto;
}
</style>
