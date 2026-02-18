---
title: Creating a Feature
description: A practical guide to creating your first feature in the Vyuh Framework
---

# Creating a Feature

Creating a feature in the Vyuh Framework involves putting together a set of
elements that work on both the CMS side and the Flutter side. This guide walks
you through the process of building a complete feature from scratch.

## What Makes a Feature?

A feature in Vyuh is a self-contained unit of functionality that includes:

- **APIs** to talk to the backend and fetch data
- **Content Blocks** that render widgets on the screen
- **Journeys** that allow users to navigate between screens
- **Design System** components for a consistent experience
- **State Management** to track user interactions

## Core Building Blocks

The three core building blocks of any feature are **APIs**, **Content Blocks**,
and **Journeys**.

### APIs

APIs are the primary source of data for the feature. They could be REST APIs,
GraphQL APIs, or even WebSockets. The Vyuh Framework has a built-in component
for working with APIs called `APIContent`, which can be configured from the CMS.

As you work with more complex APIs, consider wrapping them in an **API SDK**
package. This hides implementation details like deserialization, request headers,
and API keys. When APIs are shared across features, the SDK becomes a common
package.

### Content Blocks

Content blocks have two counterparts:

- On the **CMS** where they exist as schemas, allowing business teams to
  configure them
- On the **Flutter** side where they exist as widgets combined with state
  management, dependency injection, analytics, and other elements

### Journeys

In the Vyuh Framework, journeys are not hardcoded into the feature. Instead,
they are defined and configured from the CMS. This gives the business team the
ability to change journeys dynamically depending on the type of customer.

::: tip
There are cases where a journey is fixed in nature and does not require CMS
configuration. The payment journey is one such example -- once checkout begins,
the flow is predictable and can be hardcoded into the feature.
:::

## Steps to Create a Feature

### 1. Define the CMS Schema

Create a `FeatureDescriptor` on the CMS side that exports your content schemas:

```typescript
import { FeatureDescriptor } from '@vyuh/sanity-schema-core'
import { RouteDescriptor } from '@vyuh/sanity-schema-system'

export const myFeature = new FeatureDescriptor({
  name: 'my-feature',
  title: 'My Feature',
  contents: [
    new RouteDescriptor({
      regionItems: [
        // your content types here
      ],
    }),
  ],
})
```

### 2. Create the Flutter Feature

On the Flutter side, create an equivalent `FeatureDescriptor`:

```dart
import 'package:flutter/material.dart';
import 'package:vyuh_core/vyuh_core.dart';

final feature = FeatureDescriptor(
  name: 'my-feature',
  title: 'My Feature',
  description: 'Description of what this feature does',
  icon: Icons.star,
  routes: () async {
    return [
      CMSRoute(
        path: '/my-feature',
        routes: [
          CMSRoute(path: ':path(.*)'),
        ],
      ),
    ];
  },
  extensions: [
    ContentExtensionDescriptor(
      contentBuilders: [
        // your content builders here
      ],
    ),
  ],
);
```

### 3. Register the Feature in Your App

Include the feature in your app's `runApp()` call:

```dart
import 'package:vyuh_core/vyuh_core.dart' as vc;
import 'package:my_feature/feature.dart' as myFeature;

void main() async {
  vc.runApp(
    initialLocation: '/my-feature',
    features: () => [
      system.feature,
      myFeature.feature,
    ],
    plugins: plugins,
  );
}
```

### 4. Build Content Blocks

For each content block in your feature, you need:

1. A **Sanity schema** defining the CMS configuration
2. A **Dart class** extending `ContentItem` for deserialization
3. A **LayoutConfiguration** defining how it renders in Flutter
4. A **ContentBuilder** tying it all together

Refer to the [Content Types](/docs/guides/content-types) guide for a detailed
walkthrough.

## Feature Organization

Each feature is typically organized as a combination of two packages:

- A **schema** package (TypeScript/NPM) for CMS schemas
- A **Flutter** package for the Dart implementation

```
features/
  my-feature/
    flutter_package/
      lib/
        feature.dart
        content/
        actions/
        conditions/
    schema/
      src/
        index.ts
        content/
        actions/
        conditions/
```

## Summary

Creating a feature in the Vyuh Framework follows a consistent pattern: define
schemas on the CMS, build their Flutter counterparts, and register everything
through `FeatureDescriptor` instances. This modular approach lets you build
features that are self-contained, testable, and transferable across apps.
