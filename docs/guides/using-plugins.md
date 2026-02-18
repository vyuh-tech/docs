---
title: Using Plugins
description: Making use of the cross-cutting Plugin API for invoking various capabilities
---

# Using Plugins

Plugins, as discussed in the
[Features and Plugins](/docs/concepts/features-and-plugins) article, provide
cross-cutting functionality available to all features. Think of it as the
frontend brain for the user-facing feature. The classic example is the
Authentication plugin. It allows you to invoke auth operations like `login` and
`logout` without worrying about the UI. The authentication feature provides the
UI and invokes the **auth** plugin (via **`vyuh.auth`**) as per the user events.

This separation allows features to focus more on the presentation and less on
the plumbing used to achieve the user-facing functionality.

## Setting Up Plugins

The Vyuh Framework has built-in plugins for most common scenarios. This helps
you get started quickly. However, as you build more complex apps, it will be
necessary to set up custom plugins and integrations.

This is done as part of the **`runApp()`** call from the **`vyuh_core`**
package:

```dart
void main() async {
  final plugins = await _getPlugins();

  vc.runApp(
    initialLocation: '/demo',
    features: () => [
      system.feature,
      developer.feature,
      // ... other features ...
    ],
    plugins: plugins,
  );
}

_getPlugins() async {
  WidgetsFlutterBinding.ensureInitialized();

  return PluginDescriptor(
    content: DefaultContentPlugin(
      provider: SanityContentProvider.withConfig(
        config: SanityConfig(
          projectId: '<project-id>',
          dataset: 'production',
          perspective: Perspective.previewDrafts,
          useCdn: false,
          token: '<token>',
        ),
        cacheDuration: const Duration(seconds: 5),
      ),
    ),
    analytics: vc.AnalyticsPlugin(
      providers: [
        FirebaseAnalyticsProvider(),
      ],
    ),
    telemetry: vc.TelemetryPlugin(
      providers: [
        vc.ConsoleLoggerTelemetryProvider(),
      ],
    ),
    auth: FirebaseAuthPlugin(),
    others: [
      FirebaseFeatureFlagPlugin(
        settings: RemoteConfigSettings(
          fetchTimeout: const Duration(seconds: 10),
          minimumFetchInterval: const Duration(seconds: 10),
        ),
      ),
    ],
  );
}
```

## Available Plugins

There are many built-in plugins available. These plugins fall into the following
categories:

| **Category**         | **API**            |
| -------------------- | ------------------ |
| Content              | `vyuh.content`     |
| Network              | `vyuh.network`     |
| Authentication       | `vyuh.auth`        |
| Navigation           | `vyuh.router`      |
| Dependency Injection | `vyuh.di`          |
| Environment          | `vyuh.env`         |
| Analytics            | `vyuh.analytics`   |
| Telemetry            | `vyuh.telemetry`   |
| Feature Flag         | `vyuh.featureFlag` |
| Logger               | `vyuh.log`         |
| Events               | `vyuh.event`       |

## Using the ContentPlugin

The `ContentPlugin` is one of the core plugins, accessible via `vyuh.content`.
It allows you to interact with the CMS content and render it on Flutter widgets.

### Content Building

Content can be rendered with `buildContent()` and `buildRoute()` methods:

```dart
final class FoodItemHero extends StatelessWidget {
  final FoodMenuItem item;

  const FoodItemHero({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(item.title, style: theme.textTheme.headlineMedium),
        Text('${item.calories.toInt()} calories'),
        Padding(
          padding: EdgeInsets.symmetric(vertical: 20),
          child: vyuh.content.buildContent(context, item.description),
        ),
      ],
    );
  }
}
```

You can also build content directly by passing in an instance of a specific
`ContentItem`:

```dart
return vyuh.content.buildContent(
  context,
  vf.Card(
    title: document.title,
    description: document.subtitle,
    image: document.icon,
    action: vc.Action(
      configurations: [
        NavigationAction(
          url: '/wonderous/wonder/${document.identifier}/details',
        ),
      ],
    ),
  ),
);
```

### Type Registrations

Types can be registered and checked with the `register()` and `isRegistered()`
methods. You would generally not need to use these methods directly unless you
are building a very custom `ContentItem` with a `ContentBuilder` that leverages
custom `ContentDescriptor`.

## Using the NavigationPlugin

Accessible via `vyuh.router`. It wraps the `GoRouter` package methods (`go()`,
`push()`, `pop()`, `replace()`, etc.) and also calls the analytics plugin to
track page transitions:

```dart
PhotoCard(
  photo: photo,
  showStats: true,
  onTap: () => vyuh.router.push('/unsplash/home/photos/${photo.id}'),
)
```

## Using the NetworkPlugin

Accessible via `vyuh.network`. It is a wrapper around `HTTPClient` and allows
making network calls for all HTTP verbs:

```dart
Future<GenresListResponse> genres() async {
  final response = await vyuh.network.get(apiUrl('genre/movie/list'));

  final data = jsonDecode(response.body);
  return GenresListResponse.fromJson(data);
}
```

## Using the DIPlugin

Accessible via `vyuh.di`. Useful for injecting shared dependencies within a
feature or across features. Typically, you do all DI registrations inside the
`init()` method of the feature:

```dart
final feature = FeatureDescriptor(
  name: 'tmdb',
  title: 'TMDB',
  init: () async {
    vyuh.di.register(TMDBClient(vyuh.env.get('TMDB_API_KEY')));
    vyuh.di.register(TMDBStore());
    vyuh.di.register(TmdbSearchStore());
  },
);
```

For route-scoped dependencies, use the Scoped DI accessible inside the
`RouteLifecycleConfiguration`. See the [Scoped DI](/docs/guides/scoped-di)
guide for more details.

## Using the EnvPlugin

The env plugin is useful for loading environment settings from a `.env` file. It
uses the `flutter_dotenv` package. Make sure to include the `.env` file in your
assets:

```yaml
flutter:
  uses-material-design: true
  assets:
    - .env
```

Example usage:

```dart
final feature = FeatureDescriptor(
  name: 'tmdb',
  title: 'TMDB',
  init: () async {
    final apiKey = vyuh.env.get('TMDB_API_KEY');
    vyuh.di.register(TMDBClient(apiKey));
  },
);
```

## Using the EventPlugin

Refer to the [Events](/docs/guides/events) guide.

## Summary

Plugins in the Vyuh Framework provide cross-cutting functionality that is
available to all features. By configuring plugins in the `runApp()` call, you
can set up content providers, analytics, authentication, navigation, and more.
Each plugin is accessible through a well-defined API on the `vyuh` singleton,
making it easy to use across your application.
