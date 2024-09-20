---
title: Separation of Concerns
description: Dividing responsibilities between the Store, API Client and Widgets
---

All good software engineering starts with good separation of concerns. This
means knowing what the responsibilities are within the feature and dividing them
accordingly between the various actors. In our case, the actors include:

1. **The Unsplash Store**: it makes the API calls to the Unsplash client and
   fetches the details.
2. **The API client**: responsible for making the server calls, which is done
   through the [unsplash_client](https://pub.dev/packages/unsplash_client) pub
   package.
3. **The Widgets**: rendering surface for the information that is fetched from
   the API calls and serviced through the store.

![Information Flow](images/concerns.png)

## Store

The Unsplash Store internally uses the Unsplash Client to make calls to the
server and fetch all the photos. For this it needs the API key to access
Unsplash, which is set up in the `init()` method of the `FeatureDescriptor`. You
might have seen this in the
[article on the FeatureDescriptor](the-featuredescriptor.md).

## Widgets

The widget layer always talks to the store and never has direct access to the
API client. This is very intentional and also abstracts the details of making
server calls from the widgets. Ultimately, what the widgets care about is simply
having the information that is to be shown on the screen.

{% hint style="info" %} **Design System**

As your feature gets more complex, it is possible that your widget layers will
become even more sophisticated. To ensure consistency across all the screens in
your feature, it is better to abstract all the building blocks (components of
your feature) into a **Design System**. The design system becomes your visual
toolkit that is then used across the entire feature.&#x20; {% endhint %}

In this feature, we have widgets like the `PhotoCard`, `PhotoDetail` and
`CollectionGridView` which act as a simple Design System layer for the screens.
