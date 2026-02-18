---
title: Framework Overview
description: Overview of the various framework packages and their usage.
---

# Framework Overview

The **Vyuh Framework** is a collection of open-source packages that enable you to build modular, scalable, CMS-driven Flutter apps. It provides the **no-code** flexibility to Business teams (via the CMS) and the **full-code** power to Engineering teams, putting the right control at the right place without compromise.

## Core Packages

The framework is organized into several categories of packages:

### System Packages

- [**vyuh_core**](vyuh-core) -- The core runtime library with base types, plugin system, and bootstrapping
- [**vyuh_extension_content**](vyuh-extension-content) -- CMS integration extension with content types and rendering
- [**vyuh_feature_system**](vyuh-feature-system) -- Essential building blocks for CMS-driven UI
- [**vyuh_feature_auth**](vyuh-feature-auth) -- Authentication UI and flows
- [**vyuh_feature_onboarding**](vyuh-feature-onboarding) -- Onboarding experience feature
- [**vyuh_feature_developer**](vyuh-feature-developer) -- Developer tools for inspecting your app
- [**vyuh_content_widget**](vyuh-content-widget) -- Lightweight widget for embedding CMS content without the full framework
- [**vyuh_cache**](vyuh-cache) -- Flexible caching solution with pluggable storage backends

### Sanity Integration

- [**sanity_client**](sanity-client) -- Native Dart client for GROQ queries and Sanity.io documents
- [**flutter_sanity_portable_text**](flutter-sanity-portable-text) -- Flutter renderer for Portable Text format
- [**vyuh_plugin_content_provider_sanity**](vyuh-plugin-content-provider-sanity) -- Content provider plugin for Sanity.io CMS

### Plugin Packages

- [**vyuh_plugin_storage_hive**](hive-storage) -- Hive-based storage plugin
- [**vyuh_plugin_storage_secure**](secure-storage) -- Secure encrypted storage plugin
- [**vyuh_plugin_telemetry_provider_console**](console-telemetry) -- Console logger telemetry provider

## Architecture

The Vyuh Framework is built around a few core concepts:

### Features

Features are the primary building blocks of a Vyuh application. They represent user-facing functionality in a modular, reusable, atomic manner. Features can be composed together to create the entire app or a family of apps, and can be transferred between apps easily.

### Plugins

All third-party integrations are handled in a cross-cutting manner using Plugins. Authentication, Networking, CMS, Storage, Permissions, and more are all plugins available to all features.

### CMS-Driven UI

Also known as Server-Driven UI, the entire app experience can be driven from a CMS. This includes screen journeys, page content, themes, and more. The CMS itself is a standard plugin with custom Providers. You can bring your own CMS as a `ContentProvider`.

::: info
The default CMS used by Vyuh is [Sanity.io](https://sanity.io).
:::

## Getting Started

To get started with the Vyuh Framework, you can either use the full framework for your app or start small with the [vyuh_content_widget](vyuh-content-widget) package.

- Read the [Getting Started guide](/docs/intro/get-started) to build your first Vyuh app
- Explore the [Examples](/docs/examples/) to see various mini-apps built with the framework
- Check the [Changelog](changelog) to track the latest changes and updates

## Resources

- [GitHub Repository](https://github.com/vyuh-tech/vyuh)
- [pub.dev Packages](https://pub.dev/publishers/vyuh.tech/packages)
- [Discord Community](https://discord.gg/b49sbjqszG)
