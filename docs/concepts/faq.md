---
title: FAQ
description: Frequently asked questions about the Vyuh Framework
---

# {{ $frontmatter.title }}

## When should I use Vyuh vs vanilla Flutter?

**Use Vyuh when:**

- Building apps with multiple features owned by different teams
- You need CMS-driven content that business teams can update without code changes
- You want a modular architecture where features are independent Dart packages
- You need remote content and navigation updates without app redeployment

**Stick with vanilla Flutter when:**

- Building a simple, single-purpose app
- You have no need for a CMS or remote content management
- A small team is working on a handful of features with stable content

Vyuh adds structure and modularity that pays off as your app and team grow. For
a weekend project or a utility app, vanilla Flutter is the simpler choice.

## Do I need a CMS to use Vyuh?

No. The CMS is completely optional. You can use `GoRoute` for all navigation and
build features without any CMS integration. The CMS adds the ability to control
content and navigation remotely, but many features work without it.

```dart
final feature = FeatureDescriptor(
  name: 'settings',
  title: 'Settings',
  icon: Icons.settings,
  routes: () async => [
    GoRoute(path: '/settings', builder: (_, __) => const SettingsScreen()),
  ],
);
```

::: info
You can start without a CMS and add it later. The framework does not require a
CMS to function. When you do add one, only the features that need remote content
need to use `CMSRoute`.
:::

## What is the difference between CMSRoute and GoRoute?

- **`GoRoute`** -- Standard client-side routing. Content and layout are defined
  entirely in Flutter code.
- **`CMSRoute`** -- A route whose content is fetched from the CMS at runtime.
  Layout and content blocks are configured by content editors in the CMS Studio.

You can mix both in the same app. Some features may use `GoRoute` for static
screens while others use `CMSRoute` for CMS-driven pages.

```dart
routes: () async => [
  // Static route defined in code
  GoRoute(path: '/about', builder: (_, __) => const AboutScreen()),

  // Dynamic route driven by CMS content
  CMSRoute(path: '/home'),
],
```

## Which CMS does Vyuh support?

**Sanity.io** is the primary supported CMS with first-party packages
(`vyuh_plugin_content_provider_sanity`).

The content plugin system is designed to be provider-agnostic. You can implement
a custom `ContentProvider` for any headless CMS by conforming to the content
plugin interface.

::: details Implementing a custom ContentProvider

To support a different CMS, you implement the `ContentProvider` interface and
supply it to the `PluginDescriptor`. The framework interacts with the CMS
exclusively through this interface, so no other changes are required.

:::

## What state management does Vyuh use?

MobX is the recommended and internally used state management solution. However,
you are free to use any state management library -- Riverpod, Bloc, Provider, or
anything else -- within your features.

Features manage their own state independently. The framework does not impose a
global state management approach on your feature code.

## How does Vyuh handle navigation?

Vyuh uses `go_router` under the hood. It supports both static `GoRoute` and
dynamic `CMSRoute` definitions. Navigation can also be controlled entirely from
the CMS using Conditional Routes, which evaluate runtime conditions to determine
which route to display.

Standard `go_router` patterns -- deep linking, redirect guards, shell routes --
all work as expected.

::: info
See the [Routes and Navigation](/docs/guides/routes-and-navigation) guide for a
detailed walkthrough of routing configuration.
:::

## Can I use Vyuh for web and desktop apps?

Yes. Vyuh targets all Flutter-supported platforms: **iOS**, **Android**, **Web**,
**macOS**, **Windows**, and **Linux**.

## How do I debug content issues?

- Use the **Developer feature** (`vyuh_feature_developer`) to inspect registered
  features, content types, and routes at runtime.
- Check the console output for content deserialization errors. The framework logs
  warnings when it encounters content types that are not registered or cannot be
  deserialized.
- The framework provides debug hints when content types or layouts are missing
  from the type registry.

::: info
Add `vyuh_feature_developer` to your app's feature list during development. It
gives you a live view of everything registered in the framework.

```dart
features: () => [
  developerFeature, // from vyuh_feature_developer
  // ...other features
],
```

:::

## How does Vyuh scale for large teams?

- Each team owns one or more features as **separate Dart packages**. Features are
  independent and changes in one feature do not affect others.
- A feature built for one Vyuh app can be transferred to another Vyuh app with
  minimal or no configuration changes.
- The CMS allows business teams to work independently from engineering.
  Content editors can compose pages and navigation without waiting for code
  changes.

::: details Example team structure

| Team          | Owned Features                    |
| ------------- | --------------------------------- |
| Auth team     | `auth`, `onboarding`              |
| Commerce team | `shop`, `payments`, `orders`      |
| Content team  | `blog`, `promotions`              |
| Platform team | `system`, `developer`, `analytics`|

Each team publishes their features as Dart packages. The app shell assembles them
in a single `runApp()` call.
:::

## Can I migrate an existing Flutter app to Vyuh?

Yes, and you can do it incrementally:

1. Add the Vyuh framework packages to your project.
2. Wrap existing screens as features by creating a `FeatureDescriptor` for each
   one.
3. Gradually convert screens into features with proper routes and content
   extensions.
4. Add CMS integration only where it provides value -- not every screen needs to
   be CMS-driven.

You do not need to rewrite your app. Start with the structural benefits of
feature modularity and add CMS-driven content where it makes sense.
