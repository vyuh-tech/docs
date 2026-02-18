---
title: Best Practices
description: Guidelines for building well-structured Vyuh applications
---

# Best Practices

This guide collects practical guidelines for building well-structured
applications with the Vyuh Framework. These recommendations come from real-world
usage and help you avoid common pitfalls as your project grows.

## Feature Boundaries

Each feature should live in its own Dart package. This enforces clear separation
and makes features independently testable and transferable across apps.

- **One feature, one package.** A feature like "shopping" gets its own
  `feature_shop/` package with its own `pubspec.yaml`.
- **No direct imports between features.** Feature A should never import from
  Feature B's package. If two features need to communicate, use the DI system
  (`vyuh.di`) to share services, or use the event system (`vyuh.event`) for
  loose coupling.
- **Keep metadata descriptive.** The `name`, `title`, `description`, and `icon`
  on your `FeatureDescriptor` are shown in the developer tools. Make them
  meaningful so that anyone browsing the feature list understands what each
  feature does at a glance.

::: tip Shared code goes in a shared package
If two features need the same data model or utility, extract it into a package
under `packages/` rather than having one feature depend on the other.
:::

## Content Type Design

Content types are the bridge between your CMS and your Flutter widgets. Getting
their design right has a large impact on maintainability.

- **Use dotted naming.** Follow the pattern `feature.contentType` for schema
  type identifiers. For example, `shop.productCard` or `blog.articleSummary`.
  This avoids naming collisions across features.
- **Keep schemas focused on content, not presentation.** A content type should
  describe _what_ to show (title, image, price), not _how_ to show it (font
  size, padding, column count). Presentation details belong in
  `LayoutConfiguration`.
- **Always provide a default layout.** Every content type needs at least one
  layout so the framework can render it even when no specific layout is chosen in
  the CMS.

```dart
ContentDescriptor(
  schemaType: 'shop.productCard',
  title: 'Product Card',
  layouts: [
    DefaultProductCardLayout.typeDescriptor,
    MiniViewProductCardLayout.typeDescriptor,
  ],
)
```

::: info Content vs. Layout
A useful litmus test: if a business user would want to change it without a code
deploy, it belongs in the content type schema. If a developer needs to change it
to affect visual rendering, it belongs in the layout.
:::

## Schema Naming

Consistent naming across your CMS schemas makes the system predictable and
easier to navigate as the number of content types grows.

Follow these patterns:

| Type       | Pattern                              | Example                              |
| ---------- | ------------------------------------ | ------------------------------------ |
| Content    | `feature.contentType`                | `shop.productCard`                   |
| Action     | `feature.action.name`                | `shop.action.addToCart`              |
| Condition  | `feature.condition.name`             | `auth.condition.isLoggedIn`          |
| Layout     | `feature.contentType.layout.name`    | `shop.productCard.layout.miniView`   |
| Lifecycle  | `feature.lifecycleHandler.name`      | `misc.lifecycleHandler.diRegistration` |

The dotted hierarchy makes it straightforward to find and filter schema types in
the Sanity Studio and in the developer tools.

## State Management

The Vyuh Framework uses [MobX](https://pub.dev/packages/mobx) for reactive state
and [GetIt](https://pub.dev/packages/get_it) (via `vyuh.di`) for dependency
injection.

- **Register stores in `init()`.** The feature's `init` callback is the right
  place to register your stores and services on the DI container.
- **Use MobX observables for reactive state.** This integrates naturally with
  the framework's `Observer` widgets and keeps your UI in sync with your data.
- **Keep stores feature-scoped.** A store that manages cart state belongs in the
  `feature_shop` package, not in a global package. Other features that need cart
  data should access it through an interface registered on `vyuh.di`.
- **Dispose resources in `dispose()`.** Cancel subscriptions, close streams, and
  clean up anything allocated during `init`.

```dart
final feature = FeatureDescriptor(
  name: 'shop',
  title: 'Shopping',
  init: () async {
    vyuh.di.register(ShopApiClient());
    vyuh.di.register(CartStore());
  },
  dispose: () async {
    vyuh.di.get<CartStore>().dispose();
  },
  // ...
);
```

::: tip Scoped DI for route-level state
If a store is only needed while a particular route is active, use
[Scoped DI](/docs/guides/scoped-di) instead of registering it globally. This
ties the store's lifetime to the route and avoids unnecessary memory usage.
:::

## Error Handling

The framework provides built-in error handling at several levels. Work with it
rather than around it.

- **Customize the default error views.** The `PlatformWidgetBuilder` lets you
  replace the framework's default error, loading, and route-error views with
  widgets that match your brand. Configure this through the
  [Platform Customization](/docs/guides/platform-customization) guide.
- **Content deserialization errors are caught automatically.** If a content type
  fails to deserialize from the CMS, the framework shows a debug hint with the
  error details. This helps during development without crashing the app.
- **Handle API errors in your stores.** When fetching data from external APIs,
  catch errors and expose them as observable state so your UI can show
  appropriate feedback.

```dart
class ProductStore {
  @observable
  String? errorMessage;

  @action
  Future<void> fetchProducts() async {
    try {
      errorMessage = null;
      // fetch products...
    } catch (e) {
      errorMessage = 'Failed to load products. Please try again.';
    }
  }
}
```

## Performance

A few straightforward techniques help keep your Vyuh application responsive as
it grows.

- **Use `LazyFeatureDescriptor` for deferred features.** If a feature is not
  needed on startup (e.g., a settings or help section), wrap it in a
  `LazyFeatureDescriptor`. Its routes will be registered immediately, but the
  feature's `init` and extensions will only load when the user first navigates
  to one of its routes.
- **Leverage CMS caching.** The content provider supports a `cacheDuration`
  parameter. Set it appropriately to avoid redundant network requests for content
  that does not change frequently.
- **Keep content types lightweight.** Avoid deeply nested content structures.
  Flat or shallow hierarchies deserialize faster and are easier to manage in the
  CMS.
- **Use the CMS CDN for images.** If you are using Sanity, take advantage of its
  image pipeline for resizing, cropping, and format conversion rather than
  serving full-resolution images to every device.

::: info Lazy features still register routes
A `LazyFeatureDescriptor` registers its routes at startup so navigation works
immediately. Only the feature's initialization and content extensions are
deferred until first access.
:::

## Project Structure

Organize your monorepo to reflect the separation between apps, features, and
schemas:

```text
my_app/
├── apps/
│   └── my_app/               # Main app that composes features
├── features/
│   ├── feature_shop/          # Shopping feature (Dart)
│   ├── feature_auth/          # Auth feature (Dart)
│   └── feature_profile/       # Profile feature (Dart)
├── packages/
│   └── shared_utils/          # Shared utilities, models, API SDKs
├── schemas/
│   └── sanity_studio/         # CMS schemas (TypeScript)
├── melos.yaml                 # Dart monorepo management
└── package.json               # Node.js monorepo management
```

Key points:

- **`apps/`** contains the runnable Flutter application(s). Each app composes a
  set of features via `vc.runApp()`.
- **`features/`** contains one Dart package per feature. Each has its own
  `FeatureDescriptor` and is independently testable.
- **`packages/`** contains shared code that multiple features depend on, such as
  API SDKs, theme definitions, or common data models.
- **`schemas/`** contains the TypeScript schema packages for the Sanity Studio.

::: tip Use the Vyuh CLI
Run `vyuh create project my_app` to scaffold this structure automatically. See
the [CLI guide](/docs/intro/cli) for details.
:::

## Migration from Existing Apps

Moving an existing Flutter app to the Vyuh Framework does not need to happen all
at once. An incremental approach reduces risk and lets you validate the
architecture as you go.

1. **Identify logical features.** Look at your existing app and group screens
   and functionality into cohesive features (e.g., auth, profile, catalog,
   checkout).

2. **Create `FeatureDescriptor` instances.** For each logical feature, create a
   `FeatureDescriptor` that declares its routes and any existing content types.

3. **Move routes incrementally.** Start with one feature. Move its routes from
   your existing router into the feature's `routes` callback. Verify that
   navigation still works before moving the next feature.

4. **Add CMS integration where it adds value.** Not every screen needs CMS
   content. Focus on screens where business teams need to update content without
   code changes -- landing pages, promotional banners, and onboarding flows are
   good starting points.

5. **Extract shared code into packages.** As you split your app into features,
   you will discover shared dependencies. Move these into the `packages/`
   directory so features can depend on them without depending on each other.

::: tip Don't convert everything at once
A partially migrated app is perfectly valid. Features can coexist with
traditional Flutter code. Convert screens to CMS-driven content only when the
flexibility of CMS management justifies the effort.
:::

## Summary

These guidelines help keep your Vyuh applications maintainable as they grow:
keep features isolated in their own packages, follow consistent naming for
schemas, separate content from presentation in your content types, and adopt an
incremental approach when migrating existing apps. The framework's built-in
support for DI, error handling, lazy loading, and CMS caching takes care of many
cross-cutting concerns -- lean on these rather than building custom solutions.
