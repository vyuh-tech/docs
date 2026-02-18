---
title: Feature Descriptors
description: Understanding the FeatureDescriptor API and how it drives feature registration in Vyuh
---

# Feature Descriptors

The `FeatureDescriptor` is the central API for registering a feature within the
Vyuh Framework. Every feature, whether on the CMS side or the Flutter side, is
described through a `FeatureDescriptor` that declares its capabilities,
content types, routes, and lifecycle hooks.

## The FeatureDescriptor API

On the Flutter side, the `FeatureDescriptor` is defined in the `vyuh_core`
package. Here is the full set of properties it accepts:

### Required Properties

- **`name`** (`String`): A unique identifier for the feature. This should be a
  short, kebab-case string (e.g., `'my-feature'`). The name is used to match
  the CMS-side feature descriptor.

- **`title`** (`String`): A human-readable display name for the feature.

- **`routes`** (`FutureOr<List<RouteBase>?> Function()`): A function that
  returns the list of routes for this feature. Routes are typically `GoRoute` or
  `CMSRoute` instances. The function can be asynchronous, allowing routes to be
  fetched or computed at runtime.

### Optional Properties

- **`description`** (`String?`): A longer description of what the feature does.
  Useful for developer tools and documentation.

- **`icon`** (`IconData?`): An icon representing the feature. Shown in the
  developer tools view.

- **`init`** (`Future<void> Function()?`): An initialization function called
  when the feature is being set up. Use this to register dependencies, set up
  event listeners, or perform other startup tasks.

- **`dispose`** (`Future<void> Function()?`): A cleanup function called when the
  feature is being torn down. Use this to release resources.

- **`extensions`** (`List<ExtensionDescriptor>?`): A list of extension
  descriptors that declare the content types, actions, conditions, layouts, and
  other capabilities this feature contributes. The most common extension is
  `ContentExtensionDescriptor`.

- **`extensionBuilders`** (`List<ExtensionBuilder>?`): A list of extension
  builders that this feature exposes. Extension builders are responsible for
  assembling descriptors from multiple features into a unified registry. Most
  features will not need to provide these unless they are defining a new
  extension type.

- **`dependencies`** (`List<String>`): An optional list of feature names that
  must be initialized before this feature. This is used for ordering during
  initialization. Defaults to an empty list.

## Example: A Complete FeatureDescriptor

```dart
import 'package:flutter/material.dart';
import 'package:vyuh_core/vyuh_core.dart';
import 'package:vyuh_extension_content/vyuh_extension_content.dart';

final feature = FeatureDescriptor(
  name: 'shop',
  title: 'Shopping',
  description: 'E-commerce shopping feature with product catalog and cart',
  icon: Icons.shopping_cart,
  init: () async {
    // Register feature-level dependencies
    vyuh.di.register(ShopApiClient());
    vyuh.di.register(CartStore());

    // Listen for system events
    vyuh.event.once<SystemReadyEvent>((event) {
      // Perform post-initialization setup
    });
  },
  dispose: () async {
    // Clean up resources if needed
  },
  routes: () async {
    return [
      CMSRoute(
        path: '/shop',
        routes: [
          CMSRoute(path: ':path(.*)'),
        ],
      ),
    ];
  },
  extensions: [
    ContentExtensionDescriptor(
      contentBuilders: [
        ProductCard.contentBuilder,
      ],
      contents: [
        ProductCardDescriptor(layouts: [
          DefaultProductCardLayout.typeDescriptor,
          MiniViewProductCardLayout.typeDescriptor,
        ]),
      ],
      actions: [
        AddToCartAction.typeDescriptor,
      ],
      conditions: [
        SubscriptionTierCondition.typeDescriptor,
      ],
    ),
  ],
);
```

## The init and dispose Lifecycle

The `init` function is called during the framework's bootstrap phase, after
plugins are initialized but before routes are resolved. This is the right place
to:

- Register services and stores on the DI container (`vyuh.di`)
- Set up event listeners (`vyuh.event`)
- Override default layouts (`vyuh.content.setDefaultLayout()`)
- Load configuration or environment variables (`vyuh.env`)

The `dispose` function is called during shutdown and should release any
resources acquired in `init`.

```dart
init: () async {
  vyuh.di.register(MyService());

  vyuh.event.once<SystemReadyEvent>((event) {
    vyuh.content.setDefaultLayout(
      schemaType: Card.schemaName,
      layout: CustomCardLayout(),
      fromJson: CustomCardLayout.fromJson,
    );
  });
},
```

## Routes

The `routes` property is a function that returns a list of `RouteBase` objects.
Using a function (rather than a static list) allows routes to be computed
asynchronously -- for example, fetched from a configuration service.

Most features use `CMSRoute`, which is a custom `GoRoute` that knows how to
fetch and render CMS-managed content:

```dart
routes: () async {
  return [
    CMSRoute(path: '/my-feature'),
    CMSRoute(
      path: '/my-feature/detail/:id',
      cmsPathResolver: (path) => '/my-feature/detail',
    ),
  ];
},
```

## Extensions

The `extensions` property is where a feature declares the content types,
actions, conditions, layouts, modifiers, and other capabilities it contributes
to the framework. The most commonly used extension is
`ContentExtensionDescriptor`:

```dart
extensions: [
  ContentExtensionDescriptor(
    contentBuilders: [...],   // Content builders for new content types
    contents: [...],          // Content descriptors (for layouts, etc.)
    actions: [...],           // Custom action type descriptors
    conditions: [...],        // Custom condition type descriptors
    contentModifiers: [...],  // Custom modifier type descriptors
  ),
],
```

Multiple features can contribute to the same content type. For example, one
feature can define a `ProductCard` content type, while another feature adds a
new layout for it. The framework assembles all contributions at startup.

## CMS-Side FeatureDescriptor

On the CMS side (TypeScript), the `FeatureDescriptor` serves a similar role but
focuses on schema definitions:

```typescript
import { FeatureDescriptor } from '@vyuh/sanity-schema-core'

export const shop = new FeatureDescriptor({
  name: 'shop',
  title: 'Shopping',
  description: 'E-commerce feature',
  contents: [...],              // ContentDescriptor instances
  contentSchemaBuilders: [...], // Schema builders for content types
  actions: [...],               // Action schema definitions
  conditions: [...],            // Condition schema definitions
  contentModifiers: [...],      // Modifier schema definitions
})
```

## Summary

The `FeatureDescriptor` is the contract between a feature and the Vyuh
Framework. It declares everything the framework needs to know: the feature's
identity, its routes, lifecycle hooks, and the content extensions it
contributes. By keeping all of this in a single descriptor, features remain
self-contained and composable -- they can be added to or removed from an app
simply by including or excluding them from the `runApp()` call.
