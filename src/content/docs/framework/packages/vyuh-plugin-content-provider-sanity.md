---
title: Vyuh Plugin Content Provider Sanity
description:
  A Content Provider for the Sanity.io CMS. It fetches documents and App
  configurations via the Sanity Client and renders them with Vyuh
---

{% embed url="https://pub.dev/packages/vyuh_plugin_content_provider_sanity" %}

[Sanity.io](https://sanity.io) is the default CMS that is used by the Vyuh
framework. This provider allows you to fetch documents from a Sanity dataset
using GROQ queries and render them using the Vyuh framework.

Internally, the provider uses the
[Sanity Client](https://pub.dev/packages/sanity_client) for its configuration
and makes connections to the Sanity CDN.
