<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';
import PackagePill from './PackagePill.vue';

const flowRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    isVisible.value = true;
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (flowRef.value) observer.observe(flowRef.value);
});

onUnmounted(() => observer?.disconnect());

const primitives = [
  { label: 'Framework', color: 'violet' as const, packages: ['vyuh_core', 'vyuh_feature_system', 'sanity_client'] },
  { label: 'CDX', color: 'teal' as const, packages: ['vyuh_form_editor', 'vyuh_dashboard_editor', 'vyuh_entity_system'] },
  { label: 'Node Flow', color: 'amber' as const, packages: ['vyuh_node_flow', 'vyuh_workflow_editor', 'vyuh_workflow_engine'] },
  { label: 'Plugins', color: 'blue' as const, packages: ['auth', 'storage', 'telemetry', 'analytics'] },
];

const experiences = [
  { icon: 'mdi:cellphone', label: 'Modular Flutter Apps' },
  { icon: 'mdi:view-dashboard-outline', label: 'Enterprise Dashboards' },
  { icon: 'mdi:sitemap-outline', label: 'Visual Workflows' },
  { icon: 'mdi:file-document-outline', label: 'CMS-Driven Content' },
];
</script>

<template>
  <div ref="flowRef" class="assembly-flow" :class="{ 'assembly-flow-visible': isVisible }">
    <!-- Left: Primitives -->
    <div class="assembly-col assembly-primitives">
      <h4 class="assembly-col-label">Primitives</h4>
      <div v-for="group in primitives" :key="group.label" class="assembly-group">
        <span class="assembly-group-label" :class="`assembly-group-label-${group.color}`">{{ group.label }}</span>
        <div class="assembly-group-pills">
          <PackagePill v-for="pkg in group.packages" :key="pkg" :name="pkg" :color="group.color" />
        </div>
      </div>
    </div>

    <!-- Center: Coin -->
    <div class="assembly-col assembly-center">
      <div class="assembly-coin">
        <span class="assembly-coin-text">Configure<br/>Compose<br/>Ship</span>
      </div>
    </div>

    <!-- Right: Experiences -->
    <div class="assembly-col assembly-experiences">
      <h4 class="assembly-col-label">Experiences</h4>
      <div v-for="exp in experiences" :key="exp.label" class="assembly-experience">
        <Icon :icon="exp.icon" class="assembly-experience-icon" />
        <span class="assembly-experience-label">{{ exp.label }}</span>
      </div>
    </div>
  </div>
</template>

<style>
@reference "../style.css";

.assembly-flow {
  @apply grid grid-cols-[1fr_auto_1fr] gap-12 items-center max-w-5xl mx-auto;
}

@media (max-width: 768px) {
  .assembly-flow {
    @apply grid-cols-1 gap-10;
  }
  .assembly-center {
    @apply hidden;
  }
}

/* Animation: staggered fade-in */
.assembly-primitives,
.assembly-center,
.assembly-experiences {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s var(--vyuh-ease-out);
}

.assembly-flow-visible .assembly-primitives {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0s;
}

.assembly-flow-visible .assembly-center {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.3s;
}

.assembly-flow-visible .assembly-experiences {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.6s;
}

.assembly-col {
  @apply flex flex-col gap-6;
}

.assembly-col-label {
  @apply text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2;
  font-family: var(--vyuh-font-mono);
}

/* Primitive groups */
.assembly-group {
  @apply flex flex-col gap-2;
}

.assembly-group-label {
  @apply text-xs font-semibold uppercase tracking-wider;
  font-family: var(--vyuh-font-mono);
}

.assembly-group-label-violet { @apply text-violet-500 dark:text-violet-400; }
.assembly-group-label-teal { @apply text-teal-500 dark:text-teal-400; }
.assembly-group-label-amber { @apply text-amber-500 dark:text-amber-400; }
.assembly-group-label-blue { @apply text-blue-500 dark:text-blue-400; }

.assembly-group-pills {
  @apply flex flex-wrap gap-1.5;
}

/* Center: Coin */
.assembly-center {
  @apply items-center justify-center;
}

.assembly-coin {
  @apply flex items-center justify-center rounded-full;
  width: 140px;
  height: 140px;
  /* White background */
  @apply bg-white dark:bg-zinc-800;
  /* Double border: inner solid + outer via outline */
  border: 2px solid rgba(139, 92, 246, 0.35);
  outline: 2px solid rgba(139, 92, 246, 0.15);
  outline-offset: 5px;
  /* Gradient shadow */
  box-shadow:
    0 8px 30px rgba(139, 92, 246, 0.2),
    0 0 60px rgba(139, 92, 246, 0.08);
}

.dark .assembly-coin {
  border-color: rgba(167, 139, 250, 0.4);
  outline-color: rgba(167, 139, 250, 0.2);
  box-shadow:
    0 8px 30px rgba(167, 139, 250, 0.25),
    0 0 60px rgba(167, 139, 250, 0.1);
}

.assembly-coin-text {
  @apply text-center text-xs font-bold uppercase tracking-widest leading-loose;
  @apply text-violet-600 dark:text-violet-300;
  font-family: var(--vyuh-font-mono);
}

/* Experience cards */
.assembly-experience {
  @apply flex items-center gap-3 px-4 py-3 rounded-xl border;
  @apply bg-white dark:bg-zinc-800;
  @apply border-slate-200/60 dark:border-zinc-700/50;
  transition: all 0.3s var(--vyuh-ease-out);
}

.assembly-experience:hover {
  @apply border-violet-300 dark:border-violet-600;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.1);
}

.assembly-experience-icon {
  @apply text-xl text-violet-500 dark:text-violet-400;
}

.assembly-experience-label {
  @apply text-sm font-medium text-slate-700 dark:text-zinc-300;
}
</style>
