---
title: CMS
description: The Content Extension to render Apps from a CMS
---

{% hint style="info" %} CMS stands for **C**ontent **M**anagement **S**ystem
{% endhint %}

The CMS (Content for short) is a flagship extension provided by the Vyuh
Framework. It allows you to integrate with any headless-CMS and have it control
the App Experience. By default we provide support for
[Sanity.io](https://sanity.io), a popular headless-CMS that works well for the
kind of scenarios that we expect in App Development.

The Vyuh Framework supports extensions that allow you to extend the capabilities
of the framework in new directions. The Content extension is supported by two
types of classes: `ContentExtensionDescriptor` and `ContentExtensionBuilder`.
These two work in conjunction to extract the content-extensions by various
features and use that to render content in the final App.

{% hint style="info" %} The concept of
[Descriptors and Builders](../../concepts/descriptors-and-builders.md) plays a
significant role here. The `ContentExtensionDescriptor` is used by individual
features to export the various content types, actions, conditions and other
kinds of configurations. The `ContentExtensionBuilder` compiles all these
descriptors, across the features and assembles a registry that is used to render
content at runtime. {% endhint %}

## CMS Setup

In order to work well with the headless CMS, we need two _counterparties_ to
work together. On the CMS side, we have to export the schemas that are used to
configure the content types. This is done by using the `FeatureDescriptor` for
the CMS that collects the schemas exported by individual features.&#x20;

Most headless CMS-es are TypeScript based, including Sanity.io (our default
supported CMS). The Sanity Studio supports creating custom plugins to simplify
the setup of schemas. We do this with our plugin, aptly named the **`vyuh`**
plugin, which takes in a list of features and builds the master schema for
Sanity. Here is the typical `sanity.config.ts` file for a Vyuh project:

{% code title="sanity.config.ts" lineNumbers="true" %}

```typescript
import { defineConfig } from 'sanity'
import { vyuh } from '@vyuh/sanity-plugin-structure'
import { system } from '@vyuh/sanity-schema-system'
import { firebaseAuth } from '@vyuh/sanity-schema-firebase-auth'
import { onboarding } from '@vyuh/sanity-schema-onboarding'
import { forms } from '@vyuh/sanity-schema-forms'

export default defineConfig([
  {
    name: 'default',
    title: 'My Vyuh Studio',
    basePath: '/',

    projectId: '<project-id>',
    dataset: 'production',

    plugins: [
      vyuh({
        features: [
          system,
          firebaseAuth,
          onboarding,
          forms,
          // ... other features ... //
        ],
      }),
    ],
  },
])
```

{% endcode %}

Notice the use of the **`vyuh()`** plugin on line no. **`18`**. We pass in the
array of features, where each feature is an instance of the `FeatureDescriptor`.
A feature-descriptor can export multiple types of content. You can see it in its
definition:

```typescript
class FeatureDescriptor {
  name: string
  title: string
  description: string
  contents: ContentDescriptor[]
  contentSchemaBuilders: ContentSchemaBuilder[]
  contentSchemaModifiers: ContentSchemaModifier[]
  actions: SchemaTypeDefinition[]
  conditions: SchemaTypeDefinition[]

  // ... other properties and methods ... //
}
```

{% hint style="info" %} For a deeper dive into setting up the CMS, do refer to
the guide on [Integrating the CMS](../../intro/integrating-a-cms.md).
{% endhint %}

## Flutter Setup

A similar setup exists on the Flutter side, where we bootstrap the
counterpart-features of the content schemas. Here is the _Dart code_ that will
help in rendering the Vyuh App with the previously mentioned features from the
CMS setup:

<pre class="language-dart" data-title="lib/main.dart" data-line-numbers><code class="lang-dart">import 'package:vyuh_core/vyuh_core.dart' as vc;
import 'package:vyuh_extension_content/vyuh_extension_content.dart';
import 'package:vyuh_feature_system/vyuh_feature_system.dart' as system;

// ... various imports of the features, plugins and libraries ... //

void main() async {
  final plugins = await _getPlugins();

  <a data-footnote-ref href="#user-content-fn-1">vc.runApp(</a>
    initialLocation: '/chakra',
    features: () => [
      system.feature,
      developer.feature,
      onboarding.feature,
      firebase_auth.feature(),
      forms.feature,
    ],
    plugins: plugins,
  );
}

_getPlugins() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  final contentProvider = SanityContentProvider.withConfig(
    config: SanityConfig(
      projectId: '&#x3C;your-project-id>',
      dataset: 'production',
      perspective: Perspective.previewDrafts,
      useCdn: false,
      token: '&#x3C;your-token>',
    ),
    cacheDuration: const Duration(seconds: 5),
  );

  return [
    DefaultContentPlugin(
      provider: contentProvider,
      // provider: localContentProvider,
    ),
    vc.AnalyticsPlugin(providers: [
      FirebaseAnalyticsProvider(),
      SentryAnalyticsProvider(
          config: SentryProviderConfig(
              sampleRate: 0.2,
              dsn: '&#x3C;your-sentry-dsn>',
          )),
    ]),
    vc.ConsoleLoggerPlugin(),
    FirebaseAuthPlugin(),
    FirebaseFeatureFlagPlugin(
        settings: RemoteConfigSettings(
      fetchTimeout: const Duration(seconds: 10),
      minimumFetchInterval: const Duration(seconds: 10),
    )),
  ];
}

</code></pre>

The main entry point is on line no. **`10`**, where we call `runApp()` from the
**`vyuh_core`** library. As expected, it takes in an array of `features` and
`plugins` and bootstraps the Vyuh App to life.

Continue exploring the various aspects of Vyuh for a flexible system of
building, evolving a Flutter App, configured from a CMS.

[^1]: Vyuh's Main Entry point