---
title: Conditions
description:
  Enables conditional behavior for various aspects of your application
---

_Condition_ is one of the core elements that is built into the Vyuh Framework.
It allows you to express a _runtime_ condition that evaluates to one of many
values. This can be used to control different aspects of the framework.
Conditions are evaluated _**asynchronously**_, to accommodate making network
calls or use local values.

<figure><img src="../../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure>

## Need for Conditions

Just like conditions are necessary for any programming language (think of your
`if-else`/`ternary`/`switch-case` constructs), conditions are also useful for a
framework like Vyuh. It allows controlling the runtime behavior from a CMS
without hardcoding the behavior in your App, giving you powerful and dynamic
control.&#x20;

### What if there were no conditions?

To explain the real need for conditions, let's take up a counter-argument:
Imagine for a moment, there were _no conditions in the framework!_&#x20;

Now, in order to have a button do a _Login action_ or a _Logout action,_ it
would require creating an entirely new _Custom Button_. This custom button would
check the _user's authentication-state_ and then take the right action. This
works great for a simple Button use case.&#x20;

If you wanted to do more elaborate things like _changing layouts_ or _switching
between different screens_ or applying the previous condition to other content
items like a Card or a Toggle Switch, we would end up creating lots of custom
elements, all _**duplicating**_ the conditional behavior.&#x20;

Over time, this would only make the framework more bloated and more importantly
your Application more bloated. Thankfully, that eventuality is ruled out,
because **conditions are a first class citizen of the Vyuh Framework**.

### Back to the real world

Now that you appreciate the need for conditions, let's get on with more useful
attributes of having conditions.&#x20;

{% hint style="info" %}

#### The Switch-Case analogy

Conditions in Vyuh evaluate to one of many pre-determined **String** values.
Think of it as a `Switch-Case` from a programming language with the result being
a value from an enumeration. \

A simple `If-Else` condition can be expressed as a `Switch-Case` with two
possible enumerated values: `false` and `true`. {% endhint %}

There are several conditions built into the Framework such as:

- **Current Theme Mode**: one of `light` or `dark`
- **Current Screen Size**: one of `small`, `medium`, `large`. These breakpoints
  can be defined on the Flutter side for specific control.
- **Current Platform**: `ios` | `android` | `web`
- **User Authenticated**: `true` | `false`
- **Feature Flag**: one of many values from a Feature Flagging service such as
  Firebase Remote Config, PostHog, LaunchDarkly, etc. These values are fetched
  using the configured `FeatureFlag` plugin.
- or just a **Simple Boolean**: `true` | `false`

### Custom Conditions

You are not limited to the above set and there is provision for any **Feature**
to contribute more conditions that are relevant for the application. Such
conditions are called _Custom Conditions_. You can read up more about creating
custom conditions in its [dedicated guide](custom-condition.md).

## Where can a condition be used?

We already saw one instance where a condition could be used: Actions! However,
they are applicable in all of the following areas:&#x20;

1. **Content Items**: a _Conditional Content Item_ can show, hide or switch
   between different content items based on a condition.
2. **Routes**: a _Conditional Route_ can navigate to one of many routes
   depending on the condition
3. **Layouts**: a _Conditional Layout_ can switch between different layouts for
   a content-item
4. **Actions**: a Conditional Action can decide between one of many actions
   based on a condition.

Your application will ultimately be a combination of various Routes, Content
Items, Layouts and Actions sprinkled with _Conditions_ to control the user
journeys. How you leverage these conditions is entirely left to your
imagination. The Framework does give you some starting points but as things
become more complex, a condition could help in simplifying certain parts of your
application.

## Examples

We have seen a few instances already but here are few more to get you thinking
about areas where a condition would be useful:

1. Switching between various layouts for Mobile, Tablet and Desktop with a
   Conditional Layout
2. Navigating to a Profile page or the Login page based on the User Auth state,
   via a Conditional Route
3. Showing full content for an article or only partially based on
   subscription-status of the User. This can be done via Conditional Blocks.
4. Testing different user journeys based on a Feature Flag, as part of a A/B/N
   test. This is possible with Conditional Routes.
5. Switching layouts of a Card based on subscription tier.
6. Switching themes on a page based on a user preference

## Control from the CMS

We briefly mentioned in the beginning that these conditions can be controlled
from the CMS. This gives you lot of control to try various possibilities without
committing to it in code. This means you can explore various journeys, layouts,
content types, actions all inside the comfort of your CMS.

This is where the true power of the framework comes out. Besides being a
framework for building large-scale, production-quality apps, it can also be a
great companion for exploration during your development journey.&#x20;

<figure><img src="../../.gitbook/assets/image (1) (1) (1) (1) (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>

Designers and Developers can work together to construct the building blocks and
try out various permutations for a demo. Pick the one that makes most sense at
build-time or release it to your customers to decide based on the winning A/B/N
variation. There is a ton of exploratory power built into the framework and it
call all be controlled via _**conditions**_.

## Summary

The Vyuh Framework allows you to define conditions that can be used to control
different aspects of the application, like layouts, routes, actions and content
items. This makes the application more dynamic and adaptable without requiring
code changes. Conditions can be controlled from the CMS, giving designers and
developers flexibility to try out different variations during development.
