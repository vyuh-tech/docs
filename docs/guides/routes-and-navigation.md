---
title: Routes and Navigation
description: Understanding Vyuh's routing system, CMSRoute, and navigation patterns
---

# Routes and Navigation

Routing in the Vyuh Framework is built on top of the
[GoRouter](https://pub.dev/packages/go_router) package and extends it with
CMS-driven route resolution. This guide covers how routes work in Vyuh, the
`CMSRoute` abstraction, and navigation patterns.

## How Routing Works

Every feature in a Vyuh app declares its routes through the `routes` property of
its `FeatureDescriptor`. At startup, the framework collects routes from all
features and assembles them into a single `GoRouter` configuration.

```dart
final feature = FeatureDescriptor(
  name: 'shop',
  title: 'Shopping',
  routes: () async {
    return [
      CMSRoute(path: '/shop'),
      CMSRoute(
        path: '/shop/product/:id',
        cmsPathResolver: (path) => '/shop/product',
      ),
    ];
  },
);
```

The `routes` property is a function (not a static list) because routes may need
to be computed asynchronously -- for example, fetched from a configuration
service or determined based on feature flags.

## CMSRoute

`CMSRoute` is a custom `GoRoute` provided by the Vyuh Framework. It knows how
to fetch and render content from the CMS for a given path. When a user navigates
to a CMS route, the framework:

1. Resolves the CMS path (using `cmsPathResolver` if provided, or the route
   path directly)
2. Fetches the route document from the CMS via the `ContentProvider`
3. Renders the route's regions and content items using registered
   `ContentBuilder` instances

### Basic CMSRoute

The simplest form maps a Flutter route path directly to a CMS route:

```dart
CMSRoute(path: '/home')
```

This fetches the CMS route document with path `/home` and renders it.

### Nested CMSRoutes

You can nest CMS routes to create hierarchical navigation:

```dart
CMSRoute(
  path: '/shop',
  routes: [
    CMSRoute(path: ':path(.*)'),
  ],
)
```

The wildcard pattern `:path(.*)` catches all sub-paths under `/shop` and
resolves them against the CMS.

### CMSRoute with Path Resolver

For parameterized routes where multiple application paths should map to the same
CMS template, use a `cmsPathResolver`:

```dart
CMSRoute(
  path: '/shop/product/:id',
  cmsPathResolver: (path) => '/shop/product',
)
```

This means `/shop/product/abc123` and `/shop/product/xyz789` both fetch the same
CMS route document at `/shop/product`. The actual product ID is available via
GoRouter's path parameters. See the
[Template Routes](/docs/guides/template-routes) guide for more details.

## Navigation

Vyuh provides the `NavigationPlugin` accessible via `vyuh.router`. It wraps
GoRouter's navigation methods and adds analytics tracking:

```dart
// Navigate to a route (replaces current)
vyuh.router.go('/shop');

// Push a route onto the stack
vyuh.router.push('/shop/product/123');

// Pop the current route
vyuh.router.pop();

// Replace the current route
vyuh.router.replace('/shop/cart');
```

::: tip
The advantage of using `vyuh.router` instead of GoRouter directly is that it
also calls the analytics plugin (`vyuh.analytics`) wherever needed to track page
transitions.
:::

## Route Lifecycle

Routes in Vyuh can have lifecycle handlers that are invoked when a route is
initialized or disposed. This is managed through `RouteLifecycleConfiguration`,
which can be set up from the CMS or in code.

The lifecycle provides hooks for:

- **init**: Called when the route is about to be displayed. Use this to register
  scoped dependencies or load data.
- **dispose**: Called when the route is being removed. Use this to clean up
  resources.

See the [Scoped DI](/docs/guides/scoped-di) guide for details on using
lifecycle handlers for dependency injection.

## Conditional Routes

The framework supports conditional routes that branch between different CMS
routes based on a runtime condition. This is configured entirely from the CMS.
See the [Conditional Routes](/docs/guides/conditional-routes) guide for details.

## Static Routes (Non-CMS)

Not all routes need to be CMS-driven. You can use standard `GoRoute` instances
for screens that are fully code-driven:

```dart
routes: () async {
  return [
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsScreen(),
    ),
    CMSRoute(path: '/home'),
  ];
},
```

## Navigation Configuration

The `NavigationPlugin` supports several configuration options:

```dart
// Ensure imperative navigation URLs are shown in the URL bar
DefaultNavigationPlugin.enableURLReflectsImperativeAPIs();

// Use path strategy (removes the hash from URLs on web)
DefaultNavigationPlugin.usePathStrategy();
```

## Summary

Vyuh's routing system builds on GoRouter to add CMS-driven route resolution.
`CMSRoute` handles fetching and rendering CMS content, while standard `GoRoute`
is available for code-driven screens. The `cmsPathResolver` enables template
routes where multiple paths share the same CMS layout. Navigation is handled
through `vyuh.router`, which integrates analytics tracking automatically.
