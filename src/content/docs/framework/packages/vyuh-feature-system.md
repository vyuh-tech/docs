---
title: Vyuh Feature System
description:
  The quintessential system feature that provides the building blocks for
  CMS-driven UI
---

{% embed url="https://pub.dev/packages/vyuh_feature_system" %}

This is a system level feature that is needed for all Vyuh Apps. It includes the
fundamental blocks for rendering **Content Items** and **Routes**, handling
**Actions**, branching based on **Conditions** and switching between different
**Layouts** for content items.

The following sections go into details of the various elements exposed in this
feature.

## Content Items

Content Items, also known as _Structured Content Blocks,_ represent the visual
and information blocks used in an Application. These blocks can be configured on
the CMS and have a visual equivalent rendered with Flutter. The default layouts
are shown below. However they are completely customizable with custom layouts.

<figure><img src="../../.gitbook/assets/image (23).png" alt="" width="375"><figcaption></figcaption></figure>

The System feature includes core elements such as:

### **Card**

This is one of the most versatile content blocks in Vyuh. A card has a `title`,
`description` and `image` as its primary properties. It also includes a primary
`action` that is triggered on a tap or click. Similarly there are secondary and
tertiary actions for advanced use cases.

### **Group**

This represents a collection of items such as a list, carousel or other kinds of
related items that are shown together visually. It includes a `title`,
`description` and the `items` as its primary fields. The `items` field can
include an arbitrary combination of content-items and need not be homogenous.

### **API Content**

The block allows you to render content from a third-party API with rich
customizations on the display. It relies on a specific `configuration` that
represents the type of API that will be invoked along with any custom display
properties for further customizations.

### **Conditional**

This allows you to use a Condition at runtime to decide the type of Content Item
to show. You can define multiple `cases` for the condition and their
corresponding content items.

### **Portable Text**

Renders text using the
[Portable Text](https://github.com/portabletext/portabletext) specification. It
allows the use of custom blocks, styles and annotations for a highly customized
rich text display.&#x20;

### **Divider**

This represents a logical divider between content items. It renders as a line by
default and allows separating sections of content in your page. With custom
layouts you can make it as fancy as you like.

### **Accordion**

This is a group of `items` that each have their own title and set of content
items. It renders as a set of collapsible items that can be expanded to show its
content. In the collapsed mode, only the `title` is shown

### **Video Player**

A simple video-player that plays a video from a Network Url with an optional
`title`. You can control aspects such as autoplay, looping and muting the
volume.

### **Empty**

Useful when you don't want to show anything. It is generally used in the context
of a Conditional as a content-item for the false value.

### **Unknown**

This is a _special type of content_ that is only used by the system to represent
exceptional situations, especially when there is a missing type registration for
an item. It is not meant to be used directly and not exposed on the CMS as well.

---

## Routes

Routes represent individual pages or screens of content. When creating a user
journey, you would create several routes and link them together. Routes are a
special kind of Content Item. The system feature includes two kinds of
routes:&#x20;

- **Page**
- **Dialog**

## Conditional Routes

A special type of Route that allows branching between two or more routes based
on a condition. Conditions are configured on the CMS and evaluated at runtime on
the App by the framework.&#x20;

A simple example of a Conditional Route is one where you go to the _Login Route_
if the user is _not authenticated_ and straight to the _Home route_ when
_already logged in_.

---

## Layouts

Layouts represent different ways of rendering a Content Item. Every content item
can have one or more layouts along with a default layout. Following are the
various layouts supported by the Content Items mentioned earlier.

- **Card**
  - Default
  - Button
  - List Item
- **Group**
  - Default
  - Carousel
  - Grid
  - Vertical List
- **Portable Text**
  - Default
- **Accordion**
  - Default
- **Divider**
  - Default
- **Empty**
  - Default
- **Unknown**
  - Default
- **API Content**
  - Default

{% hint style="info" %} **API Configurations**

**API Content** is a bit special as it also supports custom _API Configurations_
to work with any 3rd Party API. By default it includes the _JSONPath-based
configuration_ for quick testing of APIs with the ability to set endpoint urls,
request-headers and do a _JSONPath-based_ mapping to render as a single Card or
a list of Cards.

**Custom API Configurations** can choose to talk to a specific API with more
complex setup and rendering. You have complete freedom to invoke any _ReST_,
_GraphQL_ or a _Streaming API_ and render it the way you please! {% endhint %}

- **Route**
  - Default
  - Tabs
  - Single Item
- **Conditional Route**
  - Default

---

## Actions

Actions allows you to invoke specific operations based on certain user or system
events. These could range from showing a dialog to making API calls. The
following actions are built into the system feature:

- **Navigate to a Url or a Route**
- **Navigate Back**
- **Show Alert**
- **Delay**
- **Open/Close Drawer**
- **Open/Close End-Drawer**
- **Open a route in a Dialog**
- **Open Url in a platform-specific App**
- **Refresh a Route**
- **Restart the Vyuh Application**
- **Show/Hide a SnackBar**
- **Toggle Light/Dark Themes**

---

## Conditions

A Condition is evaluated at runtime and results in one of many values. The
conditions in the system feature are:

- **Simple Boolean**
- **Current Platform**
- **Current Theme**
- **Feature Flag**
- **Current Screen Size**
- **User Authenticated**
