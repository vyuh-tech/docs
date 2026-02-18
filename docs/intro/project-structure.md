---
title: Project Structure
description: Understanding the standard Vyuh project layout
---

# Project Structure

A typical Vyuh project follows a modular monorepo structure that cleanly
separates your Flutter app, feature packages, CMS schemas, and shared utilities.
This structure is automatically scaffolded when you use the
[Vyuh CLI](/docs/intro/cli) to create a new project.

## Standard layout

```text
my_vyuh_app/
├── apps/
│   └── my_app/                  # Main Flutter app
│       ├── lib/
│       │   └── main.dart         # Entry point with vc.runApp()
│       └── pubspec.yaml
├── features/
│   ├── feature_shop/             # Feature package
│   │   ├── lib/
│   │   │   ├── feature.dart      # FeatureDescriptor
│   │   │   └── ...
│   │   └── pubspec.yaml
│   └── feature_auth/             # Another feature
│       ├── lib/
│       │   ├── feature.dart
│       │   └── ...
│       └── pubspec.yaml
├── schemas/
│   ├── feature_shop/             # Sanity schema for shop
│   │   ├── src/
│   │   │   └── index.ts
│   │   └── package.json
│   └── feature_auth/             # Sanity schema for auth
│       ├── src/
│       │   └── index.ts
│       └── package.json
├── packages/                     # Shared utility packages
│   └── shared_utils/
│       ├── lib/
│       └── pubspec.yaml
├── melos.yaml                    # Monorepo management (Dart)
├── package.json                  # Root config (Node/schemas)
└── pubspec.yaml                  # Root config (Dart)
```

## Key directories

### `apps/`

Contains the main Flutter application(s). Each app has its own `pubspec.yaml`
and acts as the entry point that assembles features together using `vc.runApp()`.
A project may have more than one app -- for example, a customer-facing app and a
back-office app that share the same features.

### `features/`

Each feature is a standalone Dart package with its own `FeatureDescriptor`. This
is the heart of the Vyuh architecture: features are independent, self-contained
units that declare their routes, content extensions, and initialization logic.

A feature package typically contains:

- **`feature.dart`** -- the `FeatureDescriptor` that acts as the manifest for
  the feature
- **Content builders** -- widgets and layouts for CMS content types
- **Routes** -- `go_router` routes exposed by the feature
- **State management** -- any stores or controllers used by the feature

### `schemas/`

Contains the CMS schema packages (TypeScript/JavaScript) that define the content
types available in the Sanity Studio. Each schema package mirrors a
corresponding feature package. These schemas are used by the
[Sanity Structure Plugin](/docs/guides/sanity-structure-plugin) to configure
the Studio.

### `packages/`

Shared utility packages that are used across multiple features. This could
include shared models, API clients, theme definitions, or other cross-cutting
concerns.

## Monorepo tooling

Vyuh projects use two tools to manage the monorepo:

1. **[Melos](https://melos.invertase.dev/)** -- manages the Dart/Flutter
   packages under `apps/`, `features/`, and `packages/`. It handles dependency
   linking, running scripts across packages, and versioning.

2. **[pnpm](https://pnpm.io/)** -- manages the Node.js packages under
   `schemas/` and the Sanity Studio configuration. It provides efficient
   dependency management for the TypeScript schema packages.

## Creating the structure

You can scaffold this entire structure with a single command:

```bash
vyuh create project my_vyuh_app
```

See the [CLI guide](/docs/intro/cli) for more details on project creation
options.

## Next steps

- [Quick Start](/docs/intro/get-started) -- build your first feature
- [Features & Plugins](/docs/concepts/features-and-plugins) -- understand the
  feature architecture
- [Creating a Feature](/docs/guides/creating-a-feature) -- detailed guide on
  feature development
