---
title: Flutter Sanity Portable Text
description: Flutter renderer for the Sanity.io Portable Text format
---

# Flutter Sanity Portable Text

<PubBadge package="flutter_sanity_portable_text" />

The `flutter_sanity_portable_text` package provides a Flutter renderer for the [Portable Text](https://github.com/portabletext/portabletext) format used by Sanity.io. It supports standard and custom blocks, spans, annotations, and styles.

## Overview

Portable Text is an open specification for rich text content, designed to be a universal standard for structured rich text. This package renders Portable Text content as native Flutter widgets, giving you full control over the presentation of rich text from your CMS.

## Key Features

- **Standard block rendering** -- Headings, paragraphs, lists, and block quotes
- **Custom blocks** -- Register custom block types with their own renderers
- **Span decorators** -- Bold, italic, underline, strikethrough, and custom decorators
- **Annotations** -- Links, references, and custom annotation types
- **Custom styles** -- Override default text styles for any block or span type
- **Extensible** -- Add your own block types, span types, and annotation handlers

## Usage

```dart
import 'package:flutter_sanity_portable_text/flutter_sanity_portable_text.dart';

// Render Portable Text content
PortableText(
  blocks: portableTextBlocks,
  // Optional: customize block renderers
  blockRenderers: {
    'myCustomBlock': (context, block) => MyCustomBlockWidget(block),
  },
  // Optional: customize annotation handlers
  annotationHandlers: {
    'link': (context, annotation, text) => InkWell(
      onTap: () => launchUrl(annotation['href']),
      child: text,
    ),
  },
)
```

## Supported Block Types

- **Normal text** -- Standard paragraphs
- **Headings** -- H1 through H6
- **Block quotes** -- Quoted content
- **Lists** -- Bulleted and numbered lists
- **Custom blocks** -- Any custom block type you define in your CMS schema

## Integration with Vyuh

The Portable Text renderer is used throughout the Vyuh Framework, particularly in the `vyuh_feature_system` package where the Portable Text content item renders CMS-authored rich text. It is also a dependency of `vyuh_core`.

## Links

- [pub.dev](https://pub.dev/packages/flutter_sanity_portable_text)
- [GitHub Source](https://github.com/vyuh-tech/vyuh/tree/main/packages/sanity/flutter_sanity_portable_text)
- [Portable Text Specification](https://github.com/portabletext/portabletext)
