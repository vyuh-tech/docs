---
title: The FeatureDescriptor
description: The entry point to the Unsplash feature
---

```dart
import 'package:feature_unsplash/routes.dart';
import 'package:feature_unsplash/unsplash_store.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:vyuh_core/vyuh_core.dart';

final feature = FeatureDescriptor(
  name: 'unsplash',
  title: 'Unsplash',
  description: 'View photos, collections and users on Unsplash',
  icon: Icons.photo_camera,
  init: () async {
    await dotenv.load(fileName: '.env');

    final accessKey = dotenv.get('UNSPLASH_ACCESS_KEY');
    final secretKey = dotenv.get('UNSPLASH_SECRET_KEY');

    vyuh.di.register(
      UnsplashStore(
        accessKey: accessKey,
        secretKey: secretKey,
      ),
    );
  },
  routes: routes,
);

```

The entry point, the `FeatureDescriptor`, is a simple one for the Unsplash
feature. Here you can see that we only talk about the basic metadata of the
feature, do its initialization in the `init()` method, which consists of reading
the environment variables from the `.env` file and initializing our
`UnsplashStore`.&#x20;

Finally, we also set up the `routes`, which is just going to be a tabbed route.
We'll see that in the next article.

### A note on the metadata

Although it might seem unnecessary, please take your time to specify the
metadata for a feature. This helps you to identify this feature in the developer
tools and also makes it easier for your team members to know what this feature
consists of. In fact, it shows up in the developer tools like the screenshot
below. And BTW, having a good icon always helps.

<figure><img src="../../.gitbook/assets/image.png" alt="" width="375"><figcaption><p>Unsplash feature in the Developer Tools</p></figcaption></figure>
