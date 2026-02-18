---
title: What is Vyuh?
description: Introduction to the Vyuh Framework
---

# What is Vyuh?

Vyuh is a Flutter framework for building **modular, CMS-driven apps** across
mobile, web, and desktop. It provides a structured approach to composing
large-scale applications as a collection of independent features, each developed
and maintained by separate teams.

## Core Capabilities

### Modular Feature Architecture

Every feature in a Vyuh app is encapsulated in a `FeatureDescriptor`. Each
feature owns its routes, content types, and extensions, making it independently
buildable, testable, and deployable.

### CMS-Driven UI

Connect to a headless CMS like **Sanity.io** to manage routes, layouts, and
content blocks. Update your app experience without an app store release. The CMS
drives what users see, while Flutter handles how it looks and behaves.

::: info CMS is Optional

The CMS integration is **completely optional**. You can use Vyuh purely as a
modular Flutter framework without any CMS. When you do adopt a CMS, you control
the granularity: drive the entire app from CMS, a single page, or even just a
component. Start without it and add it when the need arises.

:::

### Plugin System

Vyuh provides a plugin architecture for cross-cutting concerns like
authentication, analytics, networking, storage, feature flags, and more. Swap
implementations without changing feature code.

### Cross-Platform Flutter Apps

Build for iOS, Android, web, and desktop from a single codebase. Vyuh works
wherever Flutter runs.

## What a Vyuh App Looks Like

A Vyuh app is composed by declaring features and plugins at startup:

```dart
import 'package:vyuh_core/vyuh_core.dart' as vc;

void main() async {
  vc.runApp(
    initialLocation: '/',
    features: () => [
      shopFeature,    // E-commerce module
      authFeature,    // Authentication module
      profileFeature, // User profile module
    ],
    plugins: PluginDescriptor(
      content: DefaultContentPlugin(
        provider: SanityContentProvider.withConfig(...),
      ),
      auth: FirebaseAuthPlugin(),
    ),
  );
}
```

Each feature is self-contained with its own routes, content types, and
dependencies. The plugin descriptor wires in infrastructure services that all
features share.

## Who Is This For?

- **Teams building large-scale Flutter apps** with multiple features that need
  clear boundaries between modules.
- **Apps that need dynamic content updates** without going through app store
  review cycles.
- **Organizations wanting modular, team-independent development** where separate
  teams own and ship features independently.
- **Developers looking for a structured approach** to Flutter architecture beyond
  what a single `MaterialApp` provides.

## Pick Your Learning Path

<div class="learning-paths" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-top: 1rem;">

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1.25rem;">

### Tutorial

Build a complete feature from scratch. Best for hands-on learners who want to
see how the pieces fit together.

[Start Tutorial -->](/docs/guides/tutorial)

</div>

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1.25rem;">

### Concepts

Understand the architecture before writing code. Covers features, plugins,
content, and routing.

[Read Concepts -->](/docs/concepts/)

</div>

<div style="border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 1.25rem;">

### Examples

Learn by studying working apps. See real patterns for e-commerce, authentication,
and more.

[Browse Examples -->](/docs/examples/)

</div>

</div>
