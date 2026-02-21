<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const activeTab = ref(0);

const products = [
  {
    id: 'mobx',
    title: 'MobX',
    icon: 'mdi:atom-variant',
    description: 'A transparent functional reactive state management system. Use Flutter MobX for live observation and high-performance UI reactivity.',
    color: 'blue',
    details: [
      'Reactive state management layer',
      'Flutter MobX for observation',
      'Transparent tracking & reactions'
    ]
  },
  {
    id: 'framework',
    title: 'Vyuh Framework',
    icon: 'mdi:puzzle-outline',
    description: 'Compose scalable Flutter applications with a robust foundation of modular, feature-based architecture.',
    color: 'violet',
    details: [
      'Modular features and plugins',
      'Declarative application composition',
      'Scalable architecture for apps'
    ]
  },
  {
    id: 'cms',
    title: 'Sanity CMS & Server-Driven UI',
    icon: 'mdi:cloud-outline',
    description: 'First-class Sanity.io integration with live Server-Driven UI. Dynamically change experiences, layouts, and content using a robust Portable Text renderer.',
    color: 'rose',
    themeColor: '#881337',
    glowColor: '#fb7185',
    details: [
      'Native Dart Sanity Client',
      'Live Portable Text Renderer',
      'Dynamic Server-Driven UI'
    ]
  },
  {
    id: 'ems',
    title: 'Entity Management',
    icon: 'mdi:form-select',
    description: 'A full-stack toolkit for building complex enterprise-grade configuration interfaces. Seamlessly connect data from APIs to declarative UX with managed relationships and role-based dashboards.',
    color: 'amber',
    themeColor: '#78350f',
    glowColor: '#fbbf24',
    details: [
      'API-to-UX data connector stack',
      'Declarative relationship modeling',
      'Customizable dashboards per persona',
      'Audit compliance & E-Signatures'
    ]
  },
  {
    id: 'flow',
    title: 'Node Flow Editor',
    icon: 'mdi:sitemap-outline',
    description: 'A powerful combination of visual node editors, workflow editors, and execution engines for building complex visual programming interfaces.',
    color: 'cyan',
    themeColor: '#083344',
    glowColor: '#22d3ee',
    details: [
      'Visual workflow and node editor',
      'Robust workflow execution engine',
      'Extensive connectors'
    ]
  }
];
</script>

<template>
  <div class="product-stack-container max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start p-4 my-10 min-h-[450px]">
    
    <!-- Left Side: Vertical Stack -->
    <div class="product-stack w-full md:w-1/3 flex flex-col gap-3 relative z-10">
      <button 
        v-for="(product, index) in products" 
        :key="product.id"
        @click="activeTab = index"
        class="stack-item flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 relative focus:outline-none text-left"
        :class="[
          activeTab === index 
            ? `bg-white dark:bg-zinc-800 border-${product.color}-500 shadow-md scale-[1.02] ring-1 ring-${product.color}-500/20 z-20` 
            : 'bg-white/60 dark:bg-zinc-800/50 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-zinc-800/80 z-10'
        ]"
      >
        <div 
          class="icon-box p-2.5 rounded-lg transition-colors shrink-0"
          :class="[
            activeTab === index
              ? `bg-${product.color}-100 dark:bg-${product.color}-500/20 text-${product.color}-600 dark:text-${product.color}-400`
              : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-zinc-400'
          ]"
        >
          <Icon :icon="product.icon" class="text-2xl" />
        </div>
        <div class="flex-grow">
          <h3 
            class="text-base font-bold tracking-tight"
            :class="[activeTab === index ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-300']"
          >
            {{ product.title }}
          </h3>
        </div>
      </button>
    </div>

    <!-- Right Side: Details -->
    <div class="product-details w-full md:w-2/3 relative z-10">
      <transition name="fade-slide" mode="out-in">
        <div :key="activeTab" class="details-card p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-900/50 h-full flex flex-col justify-center min-h-[350px] text-left">
          <div class="flex items-center gap-4 mb-6">
            <div 
              class="p-4 rounded-xl"
              :class="`bg-${products[activeTab].color}-100 dark:bg-${products[activeTab].color}-500/20 text-${products[activeTab].color}-600 dark:text-${products[activeTab].color}-400`"
            >
              <Icon :icon="products[activeTab].icon" class="text-4xl" />
            </div>
            <h2 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {{ products[activeTab].title }}
            </h2>
          </div>
          
          <p class="text-lg text-slate-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-2xl">
            {{ products[activeTab].description }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              v-for="detail in products[activeTab].details" 
              :key="detail"
              class="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-slate-100 dark:border-white/5 shadow-sm"
            >
              <Icon icon="mdi:check-circle" class="text-xl shrink-0 mt-0.5" :class="`text-${products[activeTab].color}-500`" />
              <span class="text-slate-700 dark:text-zinc-200 font-medium">{{ detail }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Tab Colors */
.border-zinc-500 { border-color: #71717a; }
.border-cyan-500 { border-color: #06b6d4; }
.border-violet-500 { border-color: #8b5cf6; }
.border-teal-500 { border-color: #14b8a6; }
.border-amber-500 { border-color: #f59e0b; }
.border-rose-500 { border-color: #f43f5e; }
.border-blue-500 { border-color: #3b82f6; }

.text-zinc-600 { color: #52525b; }
.text-cyan-600 { color: #0891b2; }
.text-violet-600 { color: #7c3aed; }
.text-teal-600 { color: #0d9488; }
.text-amber-600 { color: #d97706; }
.text-rose-600 { color: #e11d48; }
.text-blue-600 { color: #2563eb; }

.text-zinc-500 { color: #71717a; }
.text-cyan-500 { color: #06b6d4; }
.text-violet-500 { color: #8b5cf6; }
.text-teal-500 { color: #14b8a6; }
.text-amber-500 { color: #f59e0b; }
.text-rose-500 { color: #f43f5e; }
.text-blue-500 { color: #3b82f6; }

.bg-zinc-100 { background-color: #f4f4f5; }
.bg-cyan-100 { background-color: #cffafe; }
.bg-violet-100 { background-color: #ede9fe; }
.bg-teal-100 { background-color: #ccfbf1; }
.bg-amber-100 { background-color: #fef3c7; }
.bg-rose-100 { background-color: #ffe4e6; }
.bg-blue-100 { background-color: #dbeafe; }

@media (prefers-color-scheme: dark) {
  .dark\:text-zinc-400 { color: #a1a1aa; }
  .dark\:text-cyan-400 { color: #22d3ee; }
  .dark\:text-violet-400 { color: #a78bfa; }
  .dark\:text-teal-400 { color: #2dd4bf; }
  .dark\:text-amber-400 { color: #fbbf24; }
  .dark\:text-rose-400 { color: #fb7185; }
  .dark\:text-blue-400 { color: #60a5fa; }

  .dark\:bg-zinc-500\/20 { background-color: rgba(113, 113, 122, 0.2); }
  .dark\:bg-cyan-500\/20 { background-color: rgba(6, 182, 212, 0.2); }
  .dark\:bg-violet-500\/20 { background-color: rgba(139, 92, 246, 0.2); }
  .dark\:bg-teal-500\/20 { background-color: rgba(20, 184, 166, 0.2); }
  .dark\:bg-amber-500\/20 { background-color: rgba(245, 158, 11, 0.2); }
  .dark\:bg-rose-500\/20 { background-color: rgba(244, 63, 94, 0.2); }
  .dark\:bg-blue-500\/20 { background-color: rgba(59, 130, 246, 0.2); }
}
</style>