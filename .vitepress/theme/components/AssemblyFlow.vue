<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, onMounted, onUnmounted } from 'vue';

const activeFlow = ref(-1);

const frameworks = [
  { id: 'vyuh_core', label: 'vyuh_core', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: 'vyuh_feature_system', label: 'vyuh_feature_system', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: 'auth', label: 'auth', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: 'storage', label: 'storage', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: 'telemetry', label: 'telemetry', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
  { id: 'analytics', label: 'analytics', group: 'framework', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },

  { id: 'sanity_client', label: 'sanity_client', group: 'cms', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  { id: 'flutter_sanity_portable_text', label: 'flutter_sanity_portable_text', group: 'cms', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' },
  
  { id: 'vyuh_form_editor', label: 'vyuh_form_editor', group: 'cdx', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  { id: 'vyuh_dashboard_editor', label: 'vyuh_dashboard_editor', group: 'cdx', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  { id: 'vyuh_entity_system', label: 'vyuh_entity_system', group: 'cdx', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' },
  
  { id: 'vyuh_node_flow', label: 'vyuh_node_flow', group: 'flow', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { id: 'vyuh_workflow_editor', label: 'vyuh_workflow_editor', group: 'flow', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  { id: 'vyuh_workflow_engine', label: 'vyuh_workflow_engine', group: 'flow', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' }
];

const experiences = [
  { id: 'mobile', label: 'Modular Flutter Apps', icon: 'mdi:cellphone' },
  { id: 'dashboards', label: 'Enterprise Dashboards', icon: 'mdi:view-dashboard-outline' },
  { id: 'workflows', label: 'Visual Workflows', icon: 'mdi:sitemap-outline' },
  { id: 'cms', label: 'CMS-Driven Content', icon: 'mdi:file-document-outline' }
];

// Helper to get pills by group
const getGroup = (groupName: string) => frameworks.filter(f => f.group === groupName);

// Map experiences to their primitive groups
const isGroupActive = (groupName: string) => {
  if (activeFlow.value === -1) return false;
  if (activeFlow.value === 0) return ['framework'].includes(groupName); // Mobile
  if (activeFlow.value === 1) return ['framework', 'cdx'].includes(groupName); // Dashboards
  if (activeFlow.value === 2) return ['framework', 'flow'].includes(groupName); // Workflows
  if (activeFlow.value === 3) return ['framework', 'cms'].includes(groupName); // CMS
  return false;
};

let interval: number;

onMounted(() => {
  // Simple random highlight cycle
  interval = setInterval(() => {
    activeFlow.value = Math.floor(Math.random() * 4);
    setTimeout(() => {
      activeFlow.value = -1;
    }, 1500);
  }, 3000) as unknown as number;
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="assembly-flow-container max-w-6xl mx-auto py-12 px-4 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 min-h-[500px]">
    
    <!-- Background Speed Lines Layer (Z-0) -->
    <div class="absolute inset-0 pointer-events-none z-0 hidden md:block overflow-hidden">
      <!-- Lines flowing from left edge towards center -->
      <div class="speed-line-left top-[20%] h-[2px]"></div>
      <div class="speed-line-left top-[35%] h-[3px] animation-delay-1"></div>
      <div class="speed-line-left top-[45%] h-[2px] animation-delay-2"></div>
      <div class="speed-line-left top-[65%] h-[3px] animation-delay-3"></div>
      <div class="speed-line-left top-[80%] h-[2px] animation-delay-1"></div>
      
      <!-- Lines diverging from center towards right edge -->
      <div class="speed-line-right top-[25%] h-[3px] animation-delay-2"></div>
      <div class="speed-line-right top-[40%] h-[2px] animation-delay-3"></div>
      <div class="speed-line-right top-[60%] h-[3px] animation-delay-1"></div>
      <div class="speed-line-right top-[75%] h-[2px] animation-delay-2"></div>
    </div>

    <!-- Left Side: Primitives (Pills) -->
    <div class="primitives-section w-full md:w-[40%] flex flex-col gap-6 relative z-10 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] p-6 rounded-2xl border border-white/50 dark:border-white/10">
      <h3 class="text-xs font-semibold tracking-widest text-slate-400 dark:text-zinc-500 uppercase text-center mb-2">Primitives</h3>
      
      <!-- Framework -->
      <div class="pill-group">
        <h4 class="group-title text-violet-500">Framework</h4>
        <div class="flex flex-wrap justify-center gap-4">
          <span v-for="pill in getGroup('framework')" :key="pill.id" class="code-pill" :class="[pill.color, isGroupActive('framework') ? 'ring-2 ring-violet-500 scale-105 shadow-md' : '']">
            {{ pill.label }}
          </span>
        </div>
      </div>

      <!-- CMS -->
      <div class="pill-group">
        <h4 class="group-title text-rose-500">CMS</h4>
        <div class="flex flex-wrap justify-center gap-4">
          <span v-for="pill in getGroup('cms')" :key="pill.id" class="code-pill" :class="[pill.color, isGroupActive('cms') ? 'ring-2 ring-rose-500 scale-105 shadow-md' : '']">
            {{ pill.label }}
          </span>
        </div>
      </div>

      <!-- CDX -->
      <div class="pill-group">
        <h4 class="group-title text-teal-500">CDX</h4>
        <div class="flex flex-wrap justify-center gap-4">
          <span v-for="pill in getGroup('cdx')" :key="pill.id" class="code-pill" :class="[pill.color, isGroupActive('cdx') ? 'ring-2 ring-teal-500 scale-105 shadow-md' : '']">
            {{ pill.label }}
          </span>
        </div>
      </div>

      <!-- Node Flow -->
      <div class="pill-group">
        <h4 class="group-title text-amber-500">Node Flow</h4>
        <div class="flex flex-wrap justify-center gap-4">
          <span v-for="pill in getGroup('flow')" :key="pill.id" class="code-pill" :class="[pill.color, isGroupActive('flow') ? 'ring-2 ring-amber-500 scale-105 shadow-md' : '']">
            {{ pill.label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Center: The Core -->
    <div class="core-section w-full md:w-[20%] flex justify-center items-center relative min-h-[200px] z-10">
      <!-- The Core Circle -->
      <div class="core-circle relative flex flex-col items-center justify-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-2 border-violet-200 dark:border-violet-900/50 rounded-full w-40 h-40 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] transition-all duration-500"
           :class="{ 'scale-110 shadow-[0_0_60px_-10px_rgba(139,92,246,0.6)] border-violet-400': activeFlow !== -1 }">
        <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-400 opacity-50 animate-spin-slow"></div>
        <div class="absolute inset-2 rounded-full border-2 border-transparent border-b-fuchsia-400 opacity-30 animate-spin-reverse-slow"></div>
        
        <span class="text-[10px] font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase leading-loose text-center">
          Configure<br>Compose<br>Ship
        </span>
      </div>
    </div>

    <!-- Right Side: Experiences -->
    <div class="experiences-section w-full md:w-[40%] flex flex-col gap-4 relative z-10 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-[2px] p-6 rounded-2xl border border-white/50 dark:border-white/10">
      <h3 class="text-xs font-semibold tracking-widest text-slate-400 dark:text-zinc-500 uppercase text-center mb-2 md:text-left md:pl-4">Experiences</h3>
      
      <div v-for="(exp, index) in experiences" :key="exp.id" 
           class="experience-card flex items-center gap-4 p-4 rounded-xl border bg-white/60 dark:bg-zinc-800/40 backdrop-blur-sm transition-all duration-500"
           :class="[
             activeFlow === index 
              ? 'border-violet-400 shadow-lg shadow-violet-500/20 scale-[1.02] bg-white dark:bg-zinc-800' 
              : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
           ]">
        <Icon :icon="exp.icon" class="text-2xl text-violet-500 dark:text-violet-400 shrink-0" />
        <span class="font-medium text-slate-800 dark:text-zinc-200">{{ exp.label }}</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
@reference "../style.css";

.pill-group {
  @apply flex flex-col items-center gap-2;
}
.group-title {
  @apply text-[10px] font-bold tracking-widest uppercase mb-1;
}
.code-pill {
  @apply px-3 py-1.5 rounded-full text-[11px] font-mono tracking-tight transition-all duration-300 border border-current/20;
}

/* Speed Lines Animation System */
.speed-line-left {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent);
  width: 50%;
  left: 0;
  opacity: 0;
  transform: translateX(-100%);
  animation: sweepLeft 3s infinite linear;
}

.speed-line-right {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent);
  width: 50%;
  left: 50%;
  opacity: 0;
  transform: translateX(-50%);
  animation: sweepRight 3s infinite linear;
}

@keyframes sweepLeft {
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; } /* Reaches center */
}

@keyframes sweepRight {
  0% { transform: translateX(-50%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(150%); opacity: 0; } /* Reaches right edge */
}

.animation-delay-1 { animation-delay: 0.8s; }
.animation-delay-2 { animation-delay: 1.6s; }
.animation-delay-3 { animation-delay: 2.4s; }

.animate-spin-slow {
  animation: spin 8s linear infinite;
}
.animate-spin-reverse-slow {
  animation: spin 12s linear infinite reverse;
}
</style>
