<script setup lang="ts">
import { Icon } from '@iconify/vue';
import CtaButton from './CtaButton.vue';
import PackagePill from './PackagePill.vue';
import PubBadge from './PubBadge.vue';

defineProps<{
  icon: string;
  title: string;
  description: string;
  packages: Array<{ name: string; color: 'violet' | 'teal' | 'amber' | 'blue' }>;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  accent: 'violet' | 'teal' | 'amber';
  reverse?: boolean;
  pubPackages?: string[];
}>();
</script>

<template>
  <div class="product-band" :class="[`product-band-${accent}`, reverse && 'product-band-reverse']">
    <div class="product-band-icon" :class="`product-band-icon-${accent}`">
      <Icon :icon="icon" />
    </div>
    <div class="product-band-content">
      <h3 class="product-band-title">{{ title }}</h3>
      <p class="product-band-description">{{ description }}</p>
      <div class="product-band-packages">
        <PackagePill
          v-for="pkg in packages"
          :key="pkg.name"
          :name="pkg.name"
          :color="pkg.color"
        />
      </div>
      <div v-if="pubPackages?.length" class="product-band-badges">
        <PubBadge v-for="pkg in pubPackages" :key="pkg" :package="pkg" />
      </div>
      <div class="product-band-cta">
        <CtaButton
          :href="ctaHref"
          variant="secondary"
          size="sm"
          :external="ctaExternal"
        >
          {{ ctaText }} <Icon icon="ph:arrow-right-bold" />
        </CtaButton>
      </div>
    </div>
  </div>
</template>

<style>
@reference "../style.css";

.product-band {
  @apply flex gap-8 items-start p-8 rounded-2xl border;
  @apply bg-white/60 dark:bg-zinc-800/40;
  @apply border-slate-200/60 dark:border-zinc-700/50;
  transition: all 0.3s var(--vyuh-ease-out);
}

.product-band:hover {
  @apply -translate-y-1;
}

.product-band-reverse {
  @apply flex-row-reverse;
}

@media (max-width: 768px) {
  .product-band {
    @apply flex-col;
  }
  .product-band-reverse {
    @apply flex-col;
  }
}

.product-band-violet:hover { box-shadow: 0 20px 40px -10px rgba(139, 92, 246, 0.15); }
.product-band-teal:hover { box-shadow: 0 20px 40px -10px rgba(20, 184, 166, 0.15); }
.product-band-amber:hover { box-shadow: 0 20px 40px -10px rgba(245, 158, 11, 0.15); }

.product-band-icon {
  @apply flex items-center justify-center w-16 h-16 rounded-2xl shrink-0 text-2xl;
}

.product-band-icon-violet {
  @apply bg-violet-100 text-violet-600;
  @apply dark:bg-violet-900/40 dark:text-violet-400;
}

.product-band-icon-teal {
  @apply bg-teal-100 text-teal-600;
  @apply dark:bg-teal-900/40 dark:text-teal-400;
}

.product-band-icon-amber {
  @apply bg-amber-100 text-amber-600;
  @apply dark:bg-amber-900/40 dark:text-amber-400;
}

.product-band-title {
  @apply text-xl font-bold text-slate-900 dark:text-zinc-100 mb-2;
  font-family: var(--vyuh-font-display);
}

.product-band-description {
  @apply text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4 max-w-xl;
}

.product-band-packages {
  @apply flex flex-wrap gap-2 mb-4;
}

.product-band-badges {
  @apply flex flex-wrap gap-2 mb-4;
}

.product-band-cta {
  @apply mt-2;
}
</style>
