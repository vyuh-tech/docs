---
title: Custom Action
description: Build App-specific operations that can be controlled from the CMS
---

Actions are a great to way to build interactivity within your applications. We
have several built-in actions that you can start with. However, you will
eventually want to create your own and have something more relevant for your
application. In this section, we will focus on creating a custom action from
scratch.

## Built-in Actions

<figure><img src="../../.gitbook/assets/image (2) (1).png" alt="" width="375"><figcaption><p>All the System actions available in Vyuh</p></figcaption></figure>

It is worth mentioning that before you start creating your own action, it is a
good idea to check the ones already available out of the box in Vyuh. These
include:

- Navigation
- Navigate Back
- Open in Dialog
- Open Url
- Toggle Theme
- Show / Hide Snack Bar
- Open / Close Drawer
- Show Alert
- Delay
- Refresh Route
- Restart Application
- Execute JavaScript

{% hint style="info" %} **Conditional Action**

An interesting one is the **`Conditional Action`** that allows you to branch
between two ore more actions based on some runtime condition. {% endhint %}

## A Custom "Show Barcode" Action

Let's start with a custom action that will show a Barcode to the user. This
could be useful in a Store App where you use the barcode for scanning and
retrieving some useful information such as availability, offers, prices, etc.

The first step is to define a schema that defines the configuration needed for
the action.

## Schema for the Barcode Action

Barcodes are normally used to encode some text, making it easier for barcode
scanners to quickly read that information from a set of Black and White blocks
or bars. Additionally, these barcodes can be encoded in multiple formats. Thus,
we need to have **`data`** and **`barcodeType`** as our two primary parameters
for configuration.

{% hint style="info" %}

#### One-Dimensional Barcodes (1D)

- **UPC (Universal Product Code):** Used primarily in retail for product
  identification.
- **EAN (European Article Number):** A variation of UPC used in Europe and other
  regions.
- **ISBN (International Standard Book Number)** barcodes are a type of **UPC**
  barcode. They are specifically designed for book identification and are used
  worldwide.
- **Code 128:** A high-density barcode that can encode large amounts of data.

#### Two-Dimensional Barcodes (2D)

- **QR Code (Quick Response Code):** Can store significantly more data than
  one-dimensional barcodes and can be read from any direction.
- **Data Matrix:** A square or rectangular barcode that can store large amounts
  of data in a small space.

{% endhint %}

With that in mind, here is our schema which we will define in a separate file.
Notice the use of the schema type as **`misc.action.showBarcode`**. It is a good
practice to namespace your actions within your feature and avoid name collisions
with other features.

{% code title="show-barcode.ts" %}

```typescript
import { defineField, defineType } from 'sanity'
import { FaBarcode as Icon } from 'react-icons/fa6'

export const showBarcode = defineType({
  name: 'misc.action.showBarcode',
  title: 'Show Barcode',
  type: 'object',
  icon: Icon,
  fields: [
    defineField({
      name: 'data',
      title: 'Data',
      type: 'string',
      initialValue: 'Vyuh Framework',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'barcodeType',
      title: 'Barcode Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Code128',
      options: {
        list: [
          { title: 'Code128', value: 'Code128' },
          { title: 'CodeUPCE', value: 'CodeUPCE' },
          { title: 'CodeEAN13', value: 'CodeEAN13' },
          { title: 'CodeISBN', value: 'CodeISBN' },
          { title: 'QR Code', value: 'QrCode' },
          { title: 'DataMatrix', value: 'DataMatrix' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      barcodeType: 'barcodeType',
      data: 'data',
    },
    prepare({ barcodeType, data }) {
      return {
        title: 'Show Barcode',
        subtitle: `Data: ${data ?? '---'} | Barcode Type: ${barcodeType}`,
      }
    },
  },
})
```

{% endcode %}

### Include in Feature

Now that the schema is ready, we need to include this action in our
**`FeatureDescriptor`** for the **misc** feature. This is done in the
**`index.ts`** file for the feature.

{% code title="misc/src/index.ts" %}

```typescript
import { FeatureDescriptor } from '@vyuh/sanity-schema-core'
import { showBarcode } from './action/show-barcode.ts'

export const misc = new FeatureDescriptor({
  name: 'misc',
  title: 'Miscellaneous',
  description:
    'The Miscellaneous feature contains a variety of custom content types, conditions, actions, layouts to demonstrate the capabilities of the Vyuh Framework.',
  actions: [showBarcode],

  // ... rest of the definitions ...
})
```

{% endcode %}

The above feature has already been included in the Sanity config and hence it
will show up in the Studio.

{% code title="sanity.config.ts" %}

```typescript
import { defineConfig } from 'sanity'
import { vyuh } from '@vyuh/sanity-plugin-structure'
import { system } from '@vyuh/sanity-schema-system'
import { misc } from 'misc-sanity-schema'

export default defineConfig([
  {
    name: 'default',
    title: 'Demo',
    basePath: '/',

    projectId: '<project-id>',
    dataset: 'production',

    plugins: [
      vyuh({
        features: [
          system,
          misc,

          // ... rest of the features ...
        ],
      }),
    ],
  },
])
```

{% endcode %}

### Configuring the Action inside Sanity Studio

Now, its time to configure it inside the Studio. We will create a built-in Card
which will invoke the action when tapped. Here is how it would look in the
Studio with the configuration form.

<figure><img src="../../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption><p>Setting up the "Show Barcode" Action</p></figcaption></figure>

## Flutter counterpart for the Action

With the CMS side of the equation firmly established, let's turn our attention
to the Flutter side counterpart which will execute this action.

### Setting up the ActionConfiguration

The executable version of an action needs to extend the
**`ActionConfiguration`** class, which is an abstract class built into the Vyuh
Framework. Since we have setup the schema for the configuration already in the
CMS, this counterpart will just be a Dart class that maps the parameters
accordingly. Let's see this.

{% code title="show_barcode.dart" %}

```dart
import 'dart:async';

import 'package:barcode_widget/barcode_widget.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:vyuh_core/vyuh_core.dart';
import 'package:vyuh_extension_content/vyuh_extension_content.dart';

part 'show_barcode.g.dart';

@JsonSerializable()
final class ShowBarcodeAction extends ActionConfiguration {
  static const schemaName = 'misc.action.showBarcode';

  static final typeDescriptor = TypeDescriptor(
    schemaType: schemaName,
    title: 'Show Barcode',
    fromJson: ShowBarcodeAction.fromJson,
  );

  final BarcodeType barcodeType;
  final String data;

  ShowBarcodeAction({
    super.isAwaited,
    this.barcodeType = BarcodeType.Code128,
    this.data = 'Vyuh Framework',
  }) : super(schemaType: schemaName, title: 'Show Bar Code');

  factory ShowBarcodeAction.fromJson(Map<String, dynamic> json) =>
      _$ShowBarcodeActionFromJson(json);

  @override
  FutureOr<void> execute(
    BuildContext context, {
    Map<String, dynamic>? arguments,
  }) {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        icon: const Icon(Icons.barcode_reader),
        title: Text('Barcode: ${barcodeType.name}'),
        content: BarcodeWidget(
          barcode: Barcode.fromType(barcodeType),
          data: data,
          height: 100,
        ),
      ),
    );
  }
}

```

{% endcode %}

Notice that the **`barcodeType`** and the **`data`** fields map exactly to the
ones in the previous schema definition for the action. We are also leveraging a
custom pub package called
[barcode_widget](https://pub.dev/packages/barcode_widget) for rendering the
Barcode. Hence, we need to add this package to our feature with the following
command. Make sure to run it inside the feature package folder.

```sh
flutter pub add barcode_widget
```

### Including in the FeatureDescriptor

To ensure this action can be picked up when reading the Sanity payload, we need
to include it in the **`FeatureDescriptor`** for our feature. This can be seen
in the code below (**`line no 26-28`**). The use of a static
**`typeDescriptor`** has become a common practice to ensure we keep it neatly
tucked with the Action class itself.

{% code title="feature.dart" lineNumbers="true" %}

```dart
import 'package:feature_misc/action/show_barcode.dart';
import 'package:flutter/material.dart';
import 'package:vyuh_core/vyuh_core.dart';
import 'package:vyuh_extension_content/vyuh_extension_content.dart';

final feature = FeatureDescriptor(
  name: 'misc',
  title: 'Misc',
  description:
      'Miscellaneous feature showing all capabilities of the Vyuh Framework.',
  icon: Icons.miscellaneous_services_outlined,
  routes: () async {
    return [
      CMSRoute(
        path: '/misc',
        routes: [
          CMSRoute(path: ':path(.*)'),
        ],
      ),
    ];
  },
  extensions: [
    ContentExtensionDescriptor(
      // ... rest of the definitions ...
      actions: [
        ShowBarcodeAction.typeDescriptor,
      ],
    ),
  ],
);

```

{% endcode %}

### Ensure feature is included with the App

We do have to ensure this feature is included in our App, else it would fail at
runtime to recognize the Action from the Sanity payload. Let's do this in the
call to the vyuh's **`runApp()`** method. This will be in the **`main.dart`**
file of our App.

```dart
import 'package:feature_misc/feature_misc.dart' as misc;
import 'package:vyuh_core/vyuh_core.dart' as vc;
import 'package:vyuh_feature_system/vyuh_feature_system.dart' as system;

void main() async {
  final plugins = await _getPlugins();

  vc.runApp(
    initialLocation: '/demo',
    features: () => [
      system.feature,
      misc.feature,
      // ... rest of the features ...
    ],
    plugins: plugins,
  );
}

_getPlugins() async {
  // configure and return the plugins
}


```

### Test and confirm behavior

With all the setup from before, we can now hot-reload the Flutter App and get
ready to see the **`"Show Barcode"`** action. We have created a demo page that
includes a Card linked to the "Show Barcode" Action.

{% hint style="warning" %} One fun fact to note is that the **UPC**, **EAN** and
**ISBN** formats can only encode numbers, so it will fail for our string "Vyuh
Framework" :hushed:. {% endhint %}

{% embed url="https://youtu.be/evt-9izEp-s" %} Quick test of the Show Barcode
action {% endembed %}

## Summary

In this article we have seen how to create a custom Action (the Show Barcode
Action) where we create the schema, its Flutter counterpart and also a quick
test to ensure the configuration is picked up correctly when rendering it in the
simulator.

Custom Actions can also be used to work directly with your internal Client
State, make network calls and do other useful things that are relevant to your
App. They are a powerful way of configuring action directly from the CMS.
