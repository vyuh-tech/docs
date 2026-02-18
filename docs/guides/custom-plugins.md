---
title: Custom Plugins
description: Create custom plugins to extend the Vyuh framework
---

# Custom Plugins

Plugins in the Vyuh Framework provide cross-cutting functionality that is
available to all features. Authentication, analytics, networking, and storage are
all examples of plugin-powered capabilities. The framework ships with a set of
built-in plugin types, but you can define your own when your application needs
infrastructure that does not fit into the existing categories.

This guide walks through the plugin architecture, the Plugin vs Provider
distinction, and the steps to create, implement, and register a custom plugin.

## Plugin Basics

Every plugin in Vyuh extends the base `Plugin` class. This class defines a
standard lifecycle that the framework manages automatically during startup and
shutdown:

```dart
abstract class Plugin {
  final String name;
  final String title;

  Plugin({required this.name, required this.title});

  Future<void> init();
  Future<void> dispose();
}
```

- **`name`** -- a unique identifier for the plugin type (e.g., `'notification'`)
- **`title`** -- a human-readable label shown in developer tools
- **`init()`** -- called by the framework during bootstrap, before features are
  initialized. Use this to set up SDK clients, establish connections, or load
  configuration.
- **`dispose()`** -- called during shutdown. Release resources, close
  connections, and clean up state here.

::: info Lifecycle ordering
Plugins are initialized before features. This guarantees that when a feature's
`init()` runs, all plugins are already available through the `vyuh` global.
:::

## Plugin vs Provider

The Vyuh plugin system distinguishes between two concepts:

- A **Plugin** defines the interface and contract for a capability. It describes
  _what_ operations are available.
- A **Provider** is a concrete implementation of that capability that handles
  _how_ those operations are carried out using a specific vendor or library.

The **Analytics plugin** illustrates this well. The plugin defines a standard
interface for tracking events. The actual delivery of those events to a backend
is handled by one or more providers:

```dart
analytics: AnalyticsPlugin(
  providers: [
    FirebaseAnalyticsProvider(),
    MixpanelAnalyticsProvider(),
  ],
),
```

When the application records an analytics event, the plugin dispatches it to all
registered providers. Adding or removing a provider is a configuration change,
not a code change within your features.

Not all plugins use the Provider model. Some plugins are direct implementations
where a single class handles both the interface and the logic. The `AuthPlugin`
is an example -- you configure it with a specific implementation like
`FirebaseAuthPlugin` directly, without a separate provider layer.

::: tip When to use Providers
Use the Provider model when you expect multiple implementations to run
simultaneously (analytics, telemetry) or when you want to swap implementations
without changing feature code (content providers). Use a direct implementation
when a single concrete class is sufficient.
:::

## Built-in Plugin Types

The framework includes the following plugin types, each accessible through the
`vyuh` global:

| Plugin Type     | Accessor           | Purpose                                           |
| --------------- | ------------------ | ------------------------------------------------- |
| ContentPlugin   | `vyuh.content`     | CMS integration and content rendering              |
| AuthPlugin      | `vyuh.auth`        | Authentication (login, logout, user state)          |
| AnalyticsPlugin | `vyuh.analytics`   | Event tracking and user behavior analytics          |
| NetworkPlugin   | `vyuh.network`     | HTTP client for REST API calls                      |
| StoragePlugin   | `vyuh.storage`     | Persistent key-value storage                        |
| TelemetryPlugin | `vyuh.telemetry`   | Logging and diagnostics                             |
| FeatureFlagPlugin | `vyuh.featureFlag` | Remote feature flag evaluation                    |
| DIPlugin        | `vyuh.di`          | Dependency injection container                      |
| NavigationPlugin | `vyuh.router`     | Routing and navigation (wraps GoRouter)             |
| EnvPlugin       | `vyuh.env`         | Environment variables from `.env` files             |

See the [Using Plugins](/docs/guides/using-plugins) guide for details on each of
these.

## Creating a Custom Plugin

When your application needs shared infrastructure that falls outside the built-in
types, you can define a custom plugin. The process involves three steps:

1. Define an abstract plugin class with the interface
2. Create one or more concrete implementations
3. Register the plugin at app startup

### Step 1: Define the Plugin Interface

Start by creating an abstract class that extends `Plugin`. This class declares
the operations your plugin supports:

```dart
abstract class NotificationPlugin extends Plugin {
  NotificationPlugin()
      : super(name: 'notification', title: 'Notifications');

  Future<void> sendLocalNotification({
    required String title,
    required String body,
  });

  Future<void> requestPermission();
  Future<bool> hasPermission();
}
```

This abstract class serves as the contract. Features that use notifications
depend on `NotificationPlugin` and remain unaware of the underlying
implementation.

### Step 2: Implement the Plugin

Create a concrete class that extends your abstract plugin and implements all
methods, including the lifecycle methods from the base `Plugin` class:

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

final class FlutterLocalNotificationPlugin extends NotificationPlugin {
  final _plugin = FlutterLocalNotificationsPlugin();

  @override
  Future<void> init() async {
    const initSettings = InitializationSettings(
      android: AndroidInitializationSettings('@mipmap/ic_launcher'),
      iOS: DarwinInitializationSettings(),
    );

    await _plugin.initialize(initSettings);
  }

  @override
  Future<void> sendLocalNotification({
    required String title,
    required String body,
  }) async {
    const details = NotificationDetails(
      android: AndroidNotificationDetails(
        'default_channel',
        'Default',
      ),
    );

    await _plugin.show(0, title, body, details);
  }

  @override
  Future<void> requestPermission() async {
    await _plugin
        .resolvePlatformSpecificImplementation<
            IOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(alert: true, badge: true, sound: true);
  }

  @override
  Future<bool> hasPermission() async {
    // Check platform-specific permission status
    return true;
  }

  @override
  Future<void> dispose() async {
    // Clean up resources
  }
}
```

You can create additional implementations (e.g., `OneSignalNotificationPlugin`,
`MockNotificationPlugin`) by extending the same abstract class.

### Step 3: Register the Plugin

Register your plugin in the `PluginDescriptor` passed to `runApp()`. Custom
plugins that are not one of the named built-in types go into the `others` list:

```dart
import 'package:vyuh_core/vyuh_core.dart' as vc;

void main() async {
  vc.runApp(
    initialLocation: '/home',
    features: () => [
      system.feature,
      // ... other features ...
    ],
    plugins: PluginDescriptor(
      content: DefaultContentPlugin(
        provider: SanityContentProvider.withConfig(
          config: SanityConfig(
            projectId: '<project-id>',
            dataset: 'production',
          ),
        ),
      ),
      auth: FirebaseAuthPlugin(),
      others: [
        FlutterLocalNotificationPlugin(),
      ],
    ),
  );
}
```

The framework calls `init()` on all plugins (including those in `others`) during
bootstrap, and `dispose()` during shutdown.

## Using a Custom Plugin from a Feature

Since custom plugins are registered in the `others` list, they are not available
as named properties on the `vyuh` global (like `vyuh.auth` or `vyuh.network`).
Instead, retrieve them through the DI container:

```dart
final feature = FeatureDescriptor(
  name: 'messaging',
  title: 'Messaging',
  init: () async {
    // Access the notification plugin from DI
    final notifications = vyuh.di.get<NotificationPlugin>();
    final hasPermission = await notifications.hasPermission();

    if (!hasPermission) {
      await notifications.requestPermission();
    }
  },
  routes: () async => [...],
);
```

Within a widget, the same lookup works:

```dart
class SendNotificationButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final notifications = vyuh.di.get<NotificationPlugin>();
        await notifications.sendLocalNotification(
          title: 'New Message',
          body: 'You have a new message waiting.',
        );
      },
      child: const Text('Send Notification'),
    );
  }
}
```

::: tip Depend on the abstract type
When calling `vyuh.di.get<NotificationPlugin>()`, use the abstract type rather
than the concrete implementation. This keeps your feature code decoupled from any
specific notification library and allows swapping implementations without
changing features.
:::

## Summary

Custom plugins extend the Vyuh Framework with shared infrastructure beyond the
built-in types. A plugin defines an abstract interface with lifecycle methods
(`init` and `dispose`), and one or more concrete implementations provide the
actual behavior. Plugins are registered via `PluginDescriptor` at startup and are
accessible to all features through the DI container. By depending on the abstract
plugin type, features stay decoupled from specific implementations.
