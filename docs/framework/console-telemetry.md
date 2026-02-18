---
title: Console Telemetry Provider
description: Console logger telemetry provider for Vyuh
---

# Console Telemetry Provider

<PubBadge package="vyuh_plugin_telemetry_provider_console" />

The `vyuh_plugin_telemetry_provider_console` package provides a console-based telemetry provider for the Vyuh Framework. It logs telemetry data to the console using the [logger](https://pub.dev/packages/logger) package, making it ideal for development and debugging.

## Overview

This telemetry provider outputs all telemetry events, logs, and metrics to the console with formatted, color-coded output. It is particularly useful during development to inspect what your application is doing without needing an external logging service.

## Usage

```dart
import 'package:vyuh_plugin_telemetry_provider_console/vyuh_plugin_telemetry_provider_console.dart';

void main() {
  vyuh.runApp(
    plugins: PluginDescriptor(
      telemetry: TelemetryPlugin(
        providers: [
          ConsoleTelemetryProvider(),
        ],
      ),
      // ... other plugins
    ),
    features: () => [
      // ... features
    ],
  );
}
```

## When to Use

- **Development** -- Get detailed, readable logs during development
- **Debugging** -- Inspect telemetry events and application behavior
- **Testing** -- Verify that telemetry events are being emitted correctly

For production environments, consider using more robust telemetry providers that can ship logs to external services.

## Links

- [pub.dev](https://pub.dev/packages/vyuh_plugin_telemetry_provider_console)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/plugins/vyuh_plugin_telemetry_provider_console)
