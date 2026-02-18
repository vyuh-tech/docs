---
title: Vyuh Plugin Content Provider Sanity
description: A Content Provider for the Sanity.io CMS that fetches documents and App configurations via the Sanity Client
---

# Vyuh Plugin Content Provider Sanity

<PubBadge package="vyuh_plugin_content_provider_sanity" />

[Sanity.io](https://sanity.io) is the default CMS used by the Vyuh Framework. This provider allows you to fetch documents from a Sanity dataset using GROQ queries and render them using the Vyuh Framework.

## Overview

This package bridges the Vyuh content plugin system with Sanity.io. It implements the `ContentProvider` interface, handling all communication with the Sanity backend including document fetching, route resolution, and content caching.

Internally, the provider uses the <PubBadge package="sanity_client" /> for its configuration and makes connections to the Sanity CDN.

## Key Features

- **Route fetching** -- Resolves CMS routes to structured content for rendering
- **Document queries** -- Execute GROQ queries and deserialize results to Dart types
- **Built-in caching** -- Leverages `vyuh_cache` to reduce network calls
- **Image handling** -- Optimized image URL generation via Sanity's image pipeline
- **Live preview** -- Support for draft content and preview perspectives

## Configuration

```dart
import 'package:vyuh_plugin_content_provider_sanity/vyuh_plugin_content_provider_sanity.dart';

final contentProvider = SanityContentProvider.withConfig(
  config: SanityConfig(
    projectId: 'your-project-id',
    dataset: 'production',
    perspective: Perspective.previewDrafts,
    useCdn: false,
    token: 'your-token',
  ),
  cacheDuration: const Duration(seconds: 5),
);
```

## Usage with Vyuh

Register the Sanity content provider as part of the plugin configuration:

```dart
void main() {
  vyuh.runApp(
    plugins: PluginDescriptor(
      content: DefaultContentPlugin(
        provider: SanityContentProvider.withConfig(
          config: SanityConfig(
            projectId: 'your-project-id',
            dataset: 'production',
          ),
        ),
      ),
    ),
    features: () => [
      system.feature,
      // ... other features
    ],
  );
}
```

## Dependencies

- `sanity_client` -- Low-level Sanity API client
- `vyuh_core` -- Core framework types
- `vyuh_cache` -- Caching layer for content responses
- `cached_network_image` -- Efficient image loading and caching

## Links

- [pub.dev](https://pub.dev/packages/vyuh_plugin_content_provider_sanity)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/sanity/vyuh_plugin_content_provider_sanity)
- [Sanity.io](https://sanity.io)
