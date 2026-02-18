---
title: Vyuh Cache
description: A flexible caching solution for Vyuh Framework Apps
---

# Vyuh Cache

<PubBadge package="vyuh_cache" />

The `vyuh_cache` package provides a flexible caching solution for Vyuh Framework Apps, offering time-based caching with pluggable storage backends to reduce API calls and boost performance.

## Overview

Caching is essential for responsive applications. This package provides a general-purpose caching layer that can be used throughout your Vyuh application to cache API responses, computed values, and other data that benefits from local storage.

## Key Features

- **Time-based expiration** -- Configure cache duration for automatic invalidation
- **Pluggable storage backends** -- Swap between different storage implementations
- **Key-based caching** -- Store and retrieve values using string keys
- **Hashing support** -- Built-in cryptographic hashing for cache key generation
- **Pure Dart** -- No Flutter dependency, usable in any Dart project

## Dependencies

- `crypto` -- For cache key hashing
- `json_annotation` -- For serialization support

## Usage

```dart
import 'package:vyuh_cache/vyuh_cache.dart';

// Create a cache instance with a time-based expiration
final cache = VyuhCache(
  duration: Duration(minutes: 5),
);

// Store a value
await cache.put('my-key', myData);

// Retrieve a value
final data = await cache.get('my-key');

// Check if a value exists and is not expired
final exists = await cache.has('my-key');
```

## Integration with Content Provider

The cache is used internally by the Sanity content provider (`vyuh_plugin_content_provider_sanity`) to cache CMS responses and reduce network calls. You can configure the cache duration when setting up the content provider:

```dart
SanityContentProvider.withConfig(
  config: SanityConfig(...),
  cacheDuration: const Duration(seconds: 5),
)
```

## Links

- [pub.dev](https://pub.dev/packages/vyuh_cache)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/system/vyuh_cache)
