<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AssemblyFlow from './components/AssemblyFlow.vue';
import Badge from './components/Badge.vue';
import CtaButton from './components/CtaButton.vue';
import CtaSection from './components/CtaSection.vue';
import HeroSection from './components/HeroSection.vue';
import PathCard from './components/PathCard.vue';
import ProductStack from './components/ProductStack.vue';
import Section from './components/Section.vue';
import SectionHeader from './components/SectionHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="home-page min-h-screen relative overflow-x-hidden">
    <!-- ═══════════════════════════════════════════════════════════════
         Section 1: Hero — Centered layout
         ═══════════════════════════════════════════════════════════════ -->
    <HeroSection variant="centered">
      <div class="hero-animate-1 opacity-0">
        <Badge icon="mdi:cube-outline" color="purple">Open Source · Flutter</Badge>
      </div>
      <h1 class="hero-title hero-animate-2 opacity-0">
        Architectural Primitives for Configuration-Driven Experiences
      </h1>
      <p class="hero-description hero-animate-3 opacity-0">
        Vyuh is a system of composable packages — a modular toolkit for
        assembling enterprise-grade Flutter applications, visual workflows,
        dashboards, and content experiences. Built to be prompt-friendly
        and infinitely extensible.
      </p>
      <div class="flex gap-4 flex-wrap justify-center hero-animate-4 opacity-0 mt-10">
        <CtaButton href="/docs/intro/" variant="primary" size="lg">
          Explore the Platform <Icon icon="ph:arrow-right-bold" />
        </CtaButton>
        <CtaButton
          href="https://github.com/vyuh-tech/vyuh"
          icon="ph:github-logo-fill"
          variant="secondary"
          size="lg"
          external
        >
          View on GitHub
        </CtaButton>
      </div>
    </HeroSection>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 2: The Platform — Assembly Flow
         ═══════════════════════════════════════════════════════════════ -->
    <Section border-top centered size="xl">
      <SectionHeader
        badge="Platform"
        badge-icon="mdi:package-variant-closed"
        badge-color="purple"
        title="A System of Composable Packages"
        subtitle="From architectural primitives to production experiences. Assemble exactly what you need."
        centered
      />
      <AssemblyFlow />
    </Section>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 3: Product Lines — Product Stack
         ═══════════════════════════════════════════════════════════════ -->
    <Section background border-top centered>
      <SectionHeader
        badge="Products"
        badge-icon="mdi:layers-outline"
        badge-color="teal"
        title="The Ecosystem"
        subtitle="Each package focuses on a different dimension of the development experience."
        centered
      />
      <ProductStack />
    </Section>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 4: Built for the AI Era
         ═══════════════════════════════════════════════════════════════ -->
    <Section border-top variant="purple" background centered>
      <SectionHeader
        badge="AI-First"
        badge-icon="mdi:robot-outline"
        badge-color="purple"
        title="Prompt Your Way to Production"
        subtitle="Vyuh's architecture is designed for the age of AI-assisted development."
        centered
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        <div class="ai-card">
          <h3 class="ai-card-title">
            <Icon icon="mdi:code-braces" class="text-violet-500 dark:text-violet-400 text-xl" />
            For Developers
          </h3>
          <ul class="ai-card-list">
            <li>Create Claude Code skills and Cursor rules that leverage Vyuh as primitives</li>
            <li>Generate features, schemas, and content types through natural language</li>
            <li>Composable architecture lets AI reason about each piece independently</li>
          </ul>
        </div>
        <div class="ai-card">
          <h3 class="ai-card-title">
            <Icon icon="mdi:domain" class="text-violet-500 dark:text-violet-400 text-xl" />
            For Enterprises
          </h3>
          <ul class="ai-card-list">
            <li>Digital modernization with an AI-first approach</li>
            <li>Rebuild legacy systems with architecture that scales</li>
            <li>Configuration-driven experiences that business teams can manage</li>
          </ul>
        </div>
      </div>
      <p class="text-sm text-slate-500 dark:text-zinc-400 mt-10 text-center">
        <a href="mailto:ask@vyuh.tech" class="text-violet-600 dark:text-violet-400 font-semibold hover:underline">Partner with us for your AI-driven digital transformation &rarr;</a>
      </p>
    </Section>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 5: Get Started — CLI + PathCards
         ═══════════════════════════════════════════════════════════════ -->
    <CtaSection border-top>
      <Badge icon="mdi:rocket-launch-outline" color="purple">Get Started</Badge>
      <h2 class="cta-title">Ready to Build?</h2>
      <p class="cta-subtitle">Dive into the docs and start assembling.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[repeat(4,auto)] gap-x-6 gap-y-6 md:gap-y-2 mt-8 max-w-4xl mx-auto">
        <PathCard
          icon="mdi:book-open-outline"
          title="Learn the Concepts"
          description="Understand features, plugins, and content-driven architecture."
          href="/docs/concepts/"
          color="violet"
        />
        <PathCard
          icon="mdi:play-circle-outline"
          title="Quick Start Guide"
          description="Build your first Vyuh app in under 10 minutes."
          href="/docs/intro/get-started"
          color="teal"
        />
        <PathCard
          icon="mdi:package-variant-closed"
          title="Browse Packages"
          description="Explore packages across Framework, CDX, and Node Flow."
          href="/docs/framework/"
          color="blue"
        />
      </div>
    </CtaSection>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 6: Footer
         ═══════════════════════════════════════════════════════════════ -->
    <SiteFooter />
  </div>
</template>

<style>
@reference "./style.css";

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

.hero-title {
  @apply text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-indigo-400 tracking-tight;
  font-family: var(--vyuh-font-display);
}

.hero-description {
  @apply text-lg font-medium text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto;
}

.hero-animate-1 { animation: fadeSlideUp 0.8s var(--vyuh-ease-out) 0.2s forwards; }
.hero-animate-2 { animation: fadeSlideUp 0.8s var(--vyuh-ease-out) 0.25s forwards; }
.hero-animate-3 { animation: fadeSlideUp 0.8s var(--vyuh-ease-out) 0.3s forwards; }
.hero-animate-4 { animation: fadeSlideUp 0.8s var(--vyuh-ease-out) 0.4s forwards; }


/* ═══════════════════════════════════════════════════════════════
   AI-FIRST SECTION
   ═══════════════════════════════════════════════════════════════ */

.ai-card {
  @apply rounded-xl border p-8 backdrop-blur-xl relative overflow-hidden;
  @apply bg-white/40 dark:bg-zinc-800/30;
  @apply border-white/50 dark:border-white/10;
}

.ai-card-title {
  @apply flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-zinc-100 mb-4 tracking-tight;
  font-family: var(--vyuh-font-display);
}

.ai-card-list {
  @apply space-y-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed list-disc list-outside pl-5;
}

.ai-card-list li {
  @apply pl-1;
}

/* ═══════════════════════════════════════════════════════════════
   CTA / GET STARTED
   ═══════════════════════════════════════════════════════════════ */

.cta-title {
  @apply text-4xl sm:text-5xl font-black text-slate-900 dark:text-zinc-100 mb-6 tracking-tight;
  font-family: var(--vyuh-font-display);
}

.cta-subtitle {
  @apply text-lg text-slate-600 dark:text-zinc-400 leading-relaxed mb-10;
}

</style>
