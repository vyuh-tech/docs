---
title: Typical Project Structure
description: The project structure for building Apps at super scale
---

The Vyuh Framework was designed to build large scale apps in a modular fashion.
It helps you to break up your app as as collection of features and connect them
all together with a Server-Driven (aka CMS-Driven) UI. Even if you don't intend
to use a CMS to drive the experience, it is still helpful to think modularly
with the use of _features as your logical units of functionality_.

{% hint style="info" %} The following is also the default structure that is
created when using the [**Mason Brick**](../intro/mason-setup.md) for creating a
new Vyuh App. {% endhint %}

## Structure

With this notion in mind, the project structure is specifically crafted to think
in features from the beginning and not devolve into a monolithic structure.
Additionally, we have taken some of the best techniques and practices building
large scale apps and baked them into the framework. At a high level, here is the
organization of the files and folders of a typical Vyuh Project.

<figure><img src="../.gitbook/assets/image (22).png" alt="" width="563"><figcaption></figcaption></figure>

A few things will stand out immediately:

- We truly believe in a **mono-repo** structure where all your _apps_,
  _features_ and _packages_ stay together.
- **Apps**: There can be multiple apps that can be built by assembling a
  collection of features. Hence the need for a **`/apps`** folder where you can
  create a _family of apps_ that rely on related features. We have seen this
  used for team-specific apps that test only a part of the features and also
  apps that have shared features. Note that the **`/apps`** folder is also where
  you can keep your _CMS Studio_.
- **Features**: All features are organized inside the **`/features`** folder.
  Each feature is a combination of the `schema` package and a `flutter` package.
- **Packages**: The **`/packages`** folder contains shared libraries that may be
  used by multiple features or just packages that need to be kept outside of a
  feature for better modularity. You could keep your _custom plugins_, _design
  system_ library or other types of _third-party integrations_ inside this
  folder. It can also hold shared schemas that may be used across features.

## Keep Evolving

As you keep growing your app, you will start seeing more patterns of similarity,
shared features, scripts and tools that build your apps and other utilities to
make your development process simpler. Keep all them together under the
mono-repo, possibly by creating additional top-level folders such as `scripts`
or `tools`. We have deliberately not included them in the cores structure as
that is a very App or Company specific configuration.&#x20;

As we continue to build more apps, we will include them in future versions of
the project structure.
