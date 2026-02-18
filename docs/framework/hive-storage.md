---
title: Hive Storage Plugin
description: Hive-based storage plugin for Vyuh
---

# Hive Storage Plugin

<PubBadge package="vyuh_plugin_storage_hive" />

The `vyuh_plugin_storage_hive` package provides a storage plugin implementation for the Vyuh Framework using [Hive](https://pub.dev/packages/hive_ce), a lightweight and fast key-value database for Flutter and Dart.

## Overview

This plugin implements the `StoragePlugin` interface from `vyuh_core`, providing persistent key-value storage for non-sensitive application data. It is suitable for caching user preferences, app state, and other data that does not require encryption.

## Usage

```dart
import 'package:vyuh_plugin_storage_hive/vyuh_plugin_storage_hive.dart';

void main() {
  vyuh.runApp(
    plugins: PluginDescriptor(
      storage: HiveStoragePlugin(),
      // ... other plugins
    ),
    features: () => [
      // ... features
    ],
  );
}
```

Once configured, you can access storage through the Vyuh platform:

```dart
// Write a value
await vyuh.storage.write('key', 'value');

// Read a value
final value = await vyuh.storage.read('key');

// Check if a key exists
final exists = await vyuh.storage.has('key');

// Delete a value
await vyuh.storage.delete('key');
```

## Links

- [pub.dev](https://pub.dev/packages/vyuh_plugin_storage_hive)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/plugins/vyuh_plugin_storage_hive)
