---
title: Distilling Wonderous
description: A quick breakdown of the Wonderous App
---

Let's start with a quick breakdown of the Wonderous App and understand the
moving parts in bit more detail.

<figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>Sample screens from Wonderous</p></figcaption></figure>

At the onset, we can see that the app is all about the _8 Wonders_ of the world.
Each Wonder is a compiled set of information such as:

- Facts and history of the Wonder
- The construction process
- Location details
- Artifacts and Collectibles
- Photos
- A timeline of events during the era of the Wonder

The information is supported with rich design assets such as icons,
illustrations and animations to bring it all together in the App experience.

## Navigation

<figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption><p>Navigation within the App</p></figcaption></figure>

The app experience can be seen as a nice _master-detail_ scenario with the
landing screen showing all the wonders. The landing screen is the _master_ that
allows navigation into all other wonders. Each wonder gets its own set of detail
screens, organized by the bottom tabs.

This is the journey we will be rebuilding with _Vyuh_.

## What's not included

We have deliberately skipped a few things in this version of the _Vyuh rebuild_,
so as to focus more on the content-driven experience. The skipped parts are:

1. Custom transition from Wonder landing page to the screen with tabs
2. Animations inside the wonder detail section
3. Global timeline of events
4. All artifacts screen
5. Tracking user-found collectibles
6. Localization of content

It is definitely possible to add the above as well with the Vyuh Framework. We
will do that in _future versions_. For now we wanted to focus more on the core
benefits of the Vyuh approach, which are:

1. Defining the Wonder as a structured schema
2. Dynamic content updates from a CMS
3. Defining the navigation and journeys on a CMS
4. Adding new wonders quickly
5. Publishing new updates to existing wonders
6. Trying new layout combinations for a wonder

Let's start _re-building!_
