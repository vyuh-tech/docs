<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <footer class="custom-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="/favicon.svg" alt="Vyuh" class="footer-logo-img" />
          <span class="footer-logo-text">Vyuh</span>
        </div>
        <p class="footer-tagline">
          Architectural primitives for configuration-driven experiences.
        </p>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <h4 class="footer-heading">Resources</h4>
          <a href="/docs/intro/" class="footer-link">
            <Icon icon="ph:book-open-fill" /> Documentation
          </a>
          <a href="/docs/examples/" class="footer-link">
            <Icon icon="ph:folder-open-fill" /> Examples
          </a>
          <a href="https://flow.vyuh.tech" target="_blank" class="footer-link">
            <Icon icon="ph:flow-arrow-fill" /> Node Flow
          </a>
        </div>
        <div class="footer-column">
          <h4 class="footer-heading">Community</h4>
          <a href="https://github.com/vyuh-tech/vyuh" target="_blank" class="footer-link">
            <Icon icon="ph:github-logo-fill" /> GitHub
          </a>
          <a href="https://pub.dev/publishers/vyuh.tech" target="_blank" class="footer-link">
            <Icon icon="simple-icons:dart" /> pub.dev
          </a>
        </div>
        <div class="footer-column">
          <h4 class="footer-heading">Company</h4>
          <a href="https://vyuh.tech" target="_blank" class="footer-link">
            <Icon icon="ph:globe-fill" /> Vyuh Technologies
          </a>
          <a href="mailto:hello@vyuh.tech" class="footer-link">
            <Icon icon="ph:envelope-fill" /> Partner with Us
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright">
        &copy; 2024-2026 Vyuh Technologies. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style>
@reference "../style.css";

.custom-footer {
  @apply relative z-10 py-16 px-6;
  @apply bg-white/50 dark:bg-zinc-800/50;
  @apply backdrop-blur-md;
  @apply border-t border-slate-200/80 dark:border-zinc-700/50;
}

.footer-container {
  @apply max-w-6xl mx-auto grid grid-cols-[1fr_2fr] gap-16;
  @apply max-lg:grid-cols-1;
}

.footer-brand {
  @apply flex flex-col gap-4;
}

.footer-logo {
  @apply flex items-center gap-4;
}

.footer-logo-img {
  @apply w-8 h-8;
}

.footer-logo-text {
  @apply text-lg font-bold text-slate-900 dark:text-zinc-100;
  font-family: var(--vyuh-font-display);
}

.footer-tagline {
  @apply text-sm text-slate-600 dark:text-zinc-400;
}

.footer-links {
  @apply grid grid-cols-2 md:grid-cols-3 gap-10;
}

.footer-column {
  @apply flex flex-col gap-2;
}

.footer-heading {
  @apply text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-zinc-100 mb-2;
  font-family: var(--vyuh-font-mono);
}

.footer-link {
  @apply inline-flex items-center gap-2 text-sm text-slate-600 dark:text-zinc-400 no-underline transition-colors;
}

.footer-link:hover {
  @apply text-violet-600 dark:text-violet-400;
}

.footer-bottom {
  @apply max-w-6xl mx-auto mt-10 pt-6 text-center;
}

.footer-copyright {
  @apply text-sm text-slate-400 dark:text-zinc-500;
}
</style>
