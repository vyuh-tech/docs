---
title: Glossary
description: Definition of various terms in the context of the Vyuh Framework
---

## Descriptor

A way to describe a modular piece of content or functionality. Descriptors are
used to define a feature and its exported content types. They are also used to
describe other aspect of the framework such as custom content, layouts,
extensions, etc.

On the CMS side, descriptors are used to describe various content types and
configurations that can be used on the CMS Studio.

Some of the common descriptor types you will encounter include the
`FeatureDescriptor`, `ContentDescriptor`, `APIContentDescriptor`, etc.

## Builder

Builders are used to collect a set of related descriptors and build a feature or
content. On the CMS side, builders assemble and create the schema for a single
content-type. They collect all the related descriptors and use them to build the
final schema.

On the Flutter side, builders collect all the related descriptors, build a
type-registry and help in rendering the content at runtime.

## Feature

Describes a single feature that is a unit of functionality in the application.
Features are usually user-facing and include elements such as content types,
routes, layouts, actions, and conditions. A feature also has metadata about its
name, icon, title, and description.

The ability to describe a feature in a modular manner is what makes _Vyuh_
unique.&#x20;

One super-power of a Feature is that it is _transferable_ across any
Vyuh-enabled Apps. This means you can literally drop a feature into an unrelated
Vyuh App and have it work with minimal or no configuration changes. This allows
Vyuh to build a **family of Apps** that share a bunch of features!

{% hint style="info" %} **Mini App**

Features are also referred as **Mini Apps** in the Vyuh's parlance. When a
feature encapsulates a significant functionality, rivaling that of an App, we
tend to refer to it as a Mini App.&#x20;

Think of a feature in a _**Banking App**_ that takes care of handling
_Investments_ or _Loans_ or doing a peer-to-peer _Payment_, like UPI. These are
modular features that are sizable and encapsulate a fair amount of UX journeys
and APIs. Such features qualify as _**Mini Apps**_. {% endhint %}

## Plugin

Plugins are a way to provide cross-cutting functionality that can be used by any
feature in the app.

For example,

- The `auth` plugin (accessible via `vyuh.auth`) can be used for accessing
  authentication related APIs
- The `network` plugin (accessible via `vyuh.network`) can be used for making
  API requests such as `get`, `post` etc.

{% hint style="info" %} A Plugin in the context of Vyuh is just a pluggable API
and should not be confused with
[plugin](https://docs.flutter.dev/packages-and-plugins/using-packages) from the
Flutter framework. {% endhint %}

## Schema

Schema defines the shape and structure of your content-item along with all of
its typed-attributes. Schemas are pervasively used in Vyuh to define various
elements such as actions, layouts, routes, and custom content-types.

The Schema has a Dart counterpart in Flutter, which deserializes the content and
renders on the screen.

All of these elements are part of the `FeatureDescriptor`, which describes the
feature.

## CMS

CMS stands for Content Management System, more specifically a **Headless**
content management system. It's a way to manage (create/store/edit) structured
content with a pre-defined schema.

CMS itself is a plugin inside Vyuh and accessible via `vyuh.content`. It is used
to describe dynamic content with a known schema. Vyuh takes special advantage of
headless CMS-es like `Sanity` to make App development a very exploratory
process. You can use the CMS to describe diverse content types such as an
E-Commerce Product, a News Article or a Menu Item for a restaurant.

Other aspects of an application such as routes, actions, conditions, etc. are
also managed on the CMS.

## Studio

Refers to the Content editing experience offered by the headless CMS. This is
usually where all the content gets created and managed. It might include a set
of workflows for approval before publishing it live. Some studios allow greater
customization, allowing developers to provide custom input controls for editing
complex content types.

## Content Item

Refers to an instance of a unique content-type such as a Product Card, Image,
Text or even a collection such as a Carousel, List or Grid. There are standard
content-items built into the framework such as Card, Group, Divider, Accordion,
Portable Text, etc. However, the framework also allows creating custom Content
Items that are specialized for the App.

## Condition

Conditions are runtime elements that evaluate to a boolean or some enumeration.
They are used to control the flow of the application as well as the availability
of certain elements.

For example,

- A platform condition may only allow certain widgets on certain platforms.
- An app version condition may only allow certain paths on a specific app
  version or a range of app versions.

Conditions are used for routing, visibility, layouts, actions, and other dynamic
aspects of the app.

## Route

A route represents an identifiable screen, dialog or page of the application.
The `path` attribute is used to uniquely identify a route. Route is possibly the
most important content-type in a CMS driven Application.

## Conditional Route

A special type of Route that includes a _condition_ to allow runtime branching
and switching between two or more Routes. Conditional routes are used to provide
a fork in journey based on some condition. A classic example is to show a Login
page or a Dashboard page depending on the authentication-state of the user. This
can be done with a `ConditionalRoute` pointing to a _Login Page_ for the `false`
condition and the _Dashboard Page_ for the `true` condition of the
user-authentication state.

## Action

Actions specify what needs to be done after a certain event. For example,
navigating to a page on clicking a card, or showing a success animation after
checkout, etc.

Vyuh has several built in actions such as Navigation, Script execution,
Restarting, Changing themes, etc.

You can add your own actions and make them relevant to your app.

> Like everything else in the _Vyuh Framework_, Action has counterparts on CMS
> and on the Flutter side.

## Layout

Layouts describe the visual structure of a content-type. Every content type
(standard or custom) must have a _default layout_ and can also include multiple
other layouts. They are particularly useful for routes, and content types like
`Card` or `Group`. Whether a `Group` should be shown as a _vertical list_ or a
_2-column grid_ is controlled by the layout. Layouts can be switched for
different platforms, screen sizes, or based on runtime conditions.

## Feature Registry

Feature Registry is a store of all the features that are available in the app.
As described earlier in the Feature section, it is an atomic, transferable piece
of functionality.

## Platform

Platform is the deployment target for the app. It can be `iOS`, `android`, `web`
or any of the supported platforms of Flutter.
