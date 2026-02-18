---
title: Secure Storage Plugin
description: A secure storage plugin for Vyuh using flutter_secure_storage for encrypted data storage
---

# Secure Storage Plugin

<PubBadge package="vyuh_plugin_storage_secure" />

The `vyuh_plugin_storage_secure` package provides a secure storage plugin for the Vyuh Framework using [flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage) for encrypted data storage across platforms.

## Overview

This plugin implements the `SecureStoragePlugin` interface from `vyuh_core`, providing encrypted key-value storage for sensitive application data such as tokens, credentials, and other private information.

## Usage

```dart
import 'package:vyuh_plugin_storage_secure/vyuh_plugin_storage_secure.dart';

void main() {
  vyuh.runApp(
    plugins: PluginDescriptor(
      secureStorage: SecureStoragePlugin(),
      // ... other plugins
    ),
    features: () => [
      // ... features
    ],
  );
}
```

Once configured, you can access secure storage through the Vyuh platform:

```dart
// Write a sensitive value
await vyuh.secureStorage.write('auth_token', token);

// Read a sensitive value
final token = await vyuh.secureStorage.read('auth_token');

// Check if a key exists
final exists = await vyuh.secureStorage.has('auth_token');

// Delete a sensitive value
await vyuh.secureStorage.delete('auth_token');
```

## Platform Support

The underlying `flutter_secure_storage` package uses platform-specific secure storage mechanisms:

- **iOS** -- Keychain
- **Android** -- EncryptedSharedPreferences / Keystore
- **macOS** -- Keychain
- **Windows** -- Windows Credential Manager
- **Linux** -- libsecret

## Links

- [pub.dev](https://pub.dev/packages/vyuh_plugin_storage_secure)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/plugins/vyuh_plugin_storage_secure)
