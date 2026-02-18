---
title: Platform Customization
description: Customize loaders, error views, and platform-level widgets
---

# Platform Customization

The Vyuh Framework provides a `PlatformWidgetBuilder` that controls the visual
chrome of the platform. This includes loading indicators shown during
initialization, error views displayed when content fails to load, route page
transitions, and other platform-level widgets such as the app bar and scaffold.

By supplying your own `PlatformWidgetBuilder`, you can tailor these elements to
match your application's design language without modifying individual features.

## The PlatformWidgetBuilder Interface

The `PlatformWidgetBuilder` is an abstract class that defines the methods the
framework calls when it needs to render platform-level UI:

```dart
abstract class PlatformWidgetBuilder {
  Widget buildLoader(BuildContext context);
  Widget buildError(BuildContext context, {String? title, dynamic error});
  Widget buildRouteLoader(BuildContext context);
  Widget buildRouteError(BuildContext context, {String? title, dynamic error});
  Page buildPage(BuildContext context, Widget child, RouteBase route);
}
```

Each method serves a specific purpose:

| **Method**         | **Purpose**                                                   |
| ------------------ | ------------------------------------------------------------- |
| `buildLoader`      | Shown while the platform is initializing                      |
| `buildError`       | Shown when a platform-level error occurs                      |
| `buildRouteLoader` | Shown while a route's content is being fetched                |
| `buildRouteError`  | Shown when a route fails to load its content                  |
| `buildPage`        | Wraps each route's widget in a `Page` for navigation and transitions |

::: info
The `buildLoader` and `buildError` methods are used during the platform's own
initialization phase. The `buildRouteLoader` and `buildRouteError` methods are
used at the individual route level as content loads from the CMS.
:::

## Creating a Custom Implementation

To customize the platform widgets, extend `PlatformWidgetBuilder` and override
the methods you need:

```dart
final class MyPlatformWidgetBuilder extends PlatformWidgetBuilder {
  @override
  Widget buildLoader(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 16),
            Text('Loading your experience...'),
          ],
        ),
      ),
    );
  }

  @override
  Widget buildError(BuildContext context, {String? title, dynamic error}) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.error_outline, size: 48, color: Colors.red),
            Text(title ?? 'Something went wrong'),
            if (error != null) Text('$error'),
          ],
        ),
      ),
    );
  }

  @override
  Widget buildRouteLoader(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }

  @override
  Widget buildRouteError(BuildContext context, {String? title, dynamic error}) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.warning_amber_rounded, size: 48, color: Colors.orange),
          Text(title ?? 'Failed to load content'),
          if (error != null) Text('$error'),
        ],
      ),
    );
  }

  @override
  Page buildPage(BuildContext context, Widget child, RouteBase route) {
    return MaterialPage(child: child);
  }
}
```

::: tip
You do not need to override every method if the defaults are acceptable. Focus
on the methods that need customization for your application.
:::

## Registering the PlatformWidgetBuilder

Pass your custom builder to the `runApp()` call via the
`platformWidgetBuilder` parameter:

```dart
import 'package:vyuh_core/vyuh_core.dart' as vc;

void main() async {
  vc.runApp(
    platformWidgetBuilder: MyPlatformWidgetBuilder(),
    features: () => [
      // ... your features ...
    ],
    plugins: plugins,
  );
}
```

Once registered, the framework will use your builder for all platform-level
widget rendering.

## Customizing Route Page Transitions

The `buildPage` method determines how route transitions are handled across the
app. By default, you might use `MaterialPage` for standard Material transitions.
To apply a custom transition, return a `CustomTransitionPage` instead:

```dart
@override
Page buildPage(BuildContext context, Widget child, RouteBase route) {
  return CustomTransitionPage(
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(opacity: animation, child: child);
    },
  );
}
```

This gives you a single place to control page transitions for the entire
application. Every route rendered by the framework will use whatever `Page` you
return from this method.

::: tip
You can inspect the `route` parameter to apply different transitions for
specific routes. For example, you could use a slide transition for detail pages
and a fade transition for top-level pages.
:::

## When to Customize

There are several situations where providing a custom `PlatformWidgetBuilder` is
useful:

- **Branding the loading experience** -- Replace the default loader with your
  app's logo, brand colors, or a custom animation that appears during
  initialization.
- **Custom error UX** -- Provide actionable error views with retry buttons,
  support links, or user-friendly messaging instead of raw error output.
- **Consistent page transitions** -- Apply a uniform transition style (fade,
  slide, scale) across all routes in the app from a single location.
- **Platform-specific adjustments** -- Use different visual treatments on iOS
  versus Android, or adapt the loading and error experience based on screen
  size.

## Summary

The `PlatformWidgetBuilder` gives you control over the visual chrome that the
Vyuh Framework renders during initialization, content loading, error states, and
route transitions. By implementing your own builder and registering it in the
`runApp()` call, you can align these platform-level widgets with your
application's design without modifying individual features or routes.
