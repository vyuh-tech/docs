---
title: Vyuh Extension Content
description:
  Integrate with a headless CMS with this extension and support its core types
---

{% embed url="https://pub.dev/packages/vyuh_extension_content" %}

This package provides the core types for integrating with a headless CMS, which
includes the Content plugin, the CMS building blocks, and also the UI for
rendering a route from a CMS.

## Content Plugin

This is the default implementation for the `ContentPlugin`, and it works with a
`ContentProvider` to do most of the heavy lifting. The `ContentPlugin` maintains
the type registry of all the content items that will be fetched from the CMS,
whereas the `ContentProvider` takes care of fetching a single route or fetching
specific documents from the headless CMS.

## Descriptor and Builder

This includes the `ContentDescriptor` and the `ContentBuilder` pair that knows
how to assemble a content-item, once fetched from the CMS. As you know, the
builder takes care of building a type-registry by assembling the various
content-descriptors across the features. The allows the builder to supply a
visual representation for the content item at the time of rendering.

Additionally, this package also includes the `ContentExtensionDescriptor` and
the `ContentExtensionBuilder` that allows you to manage the content extensions
for your App. Every feature that needs to get its content items fetched from a
CMS will be using a `ContentExtensionDescriptor` to supply all the details of
the content items.

## Core Types

Expands the set of core types for Content driven apps by adding `Action` and
`Condition` types.
