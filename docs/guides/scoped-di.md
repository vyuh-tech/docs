---
title: Scoped DI
description: Manage dependencies for a single route without affecting the global DI container
---

# Scoped DI

Dependencies can be managed within the Vyuh Framework using a Dependency
Injection (DI) container. We use [GetIt](https://pub.dev/packages/get_it)
internally as the default plugin for managing DI. The plugin can be referenced
with `vyuh.di` and used to set up and look up dependencies.

However, all the dependencies you create are managed at a global level. This
means there is a single DI container globally in which you put all of your
dependencies.

Sometimes it may be necessary that some dependencies only exist at specific
**route levels**. As long as the route is active, you want the dependencies to
be active. _Implicitly, the lifetime of the dependencies is linked with the
lifetime of the route_.

To manage such a scenario, we have introduced the concept of a **Scoped DI**.
This allows you to create a scoped DI container for a widget subtree within
which you can manage your dependencies. Currently, the default support exists
for a Route, but you can also apply this scoping for your own widget trees.

This keeps your dependencies local to the route (or widget), and if you look up
a dependency within that widget tree, it will first try to find something at the
route level (or your own widget level). If it does not find it, then it goes to
the global container (`vyuh.di`) as a fallback.

## Looking Up Scoped Dependencies

You can look up a scoped dependency using the `context.di` API. The `context.di`
looks up a scoped DI container up the widget ancestry and finds the nearest one.
If none is found, it will fall back to `vyuh.di`.

> Note that you do need the `context` parameter to look up the scoped DI
> container. This is by design, as you only want this lookup to happen within a
> widget tree.

```dart
Widget build(BuildContext context, Card content) {
  final title = context.di.get<TestStore>().title;

  final theme = Theme.of(context);

  return Card(
    child: Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('The below text is read from a Route-Scoped DI Store',
              style: theme.textTheme.labelSmall),
          Text(title,
              style: theme.textTheme.titleMedium?.apply(
                fontWeightDelta: 2,
                color: theme.colorScheme.primary,
              )),
        ],
      ),
    ),
  );
}
```

## Setting a Scoped Dependency

Since the scoped dependency is limited to the Route, there has to be a way to
inject the dependencies at the time of initializing the route. We do this with
the `RouteLifecycleConfiguration`.

This lifecycle configuration can be set up at the CMS level, or you can do it
explicitly if you are managing the route locally within your code.

The `RouteLifecycleConfiguration` has `init(BuildContext, RouteBase)` and
`dispose()` methods which are invoked whenever the route is about to be
initialized or disposed. This is a perfect opportunity to set up scoped
dependencies since you also have access to the `context` within the `init()`
method.

```dart
final class TestStore {
  final String title;
  TestStore(this.title);
}

@JsonSerializable()
final class DIRegistrationLifecycleHandler
    extends RouteLifecycleConfiguration {
  DIRegistrationLifecycleHandler()
      : super(schemaType: 'misc.lifecycleHandler.diRegistration');

  static const schemaName = 'misc.lifecycleHandler.diRegistration';
  static final typeDescriptor = TypeDescriptor(
      schemaType: schemaName,
      fromJson: DIRegistrationLifecycleHandler.fromJson,
      title: 'DI Registration Lifecycle Handler');

  factory DIRegistrationLifecycleHandler.fromJson(
          Map<String, dynamic> json) =>
      _$DIRegistrationLifecycleHandlerFromJson(json);

  @override
  Future<void> init(BuildContext context, RouteBase route) async {
    context.di.register(TestStore('Hello Scoped DI'));
  }

  @override
  Future<void> dispose() async {}
}
```

Typically, you set up lifecycle handlers within the CMS on a `Route` where such
dependencies are needed.

You also need to register the `TypeDescriptor` for the lifecycle handler inside
the feature. Notice how this is done within the `RouteDescriptor` using the
`lifecycleHandlers` property:

```dart
final feature = FeatureDescriptor(
  name: 'misc',
  title: 'Misc',
  extensions: [
    ContentExtensionDescriptor(
      RouteDescriptor(
        lifecycleHandlers: [
          SimulatedDelayLifecycleHandler.typeDescriptor,
          DIRegistrationLifecycleHandler.typeDescriptor,
        ],
      ),
    ),
  ],
);
```

The `init()` of the lifecycle handler is automatically invoked as part of the
Route deserialization.

::: info Resetting the Scoped DI
The scoped DI container is automatically reset whenever the route is refreshed.
:::

## Summary

The **Scoped DI** container gives you the ability to localize your dependencies
within a route. This avoids polluting the global DI container and also takes
care of cleaning up the dependencies after they are done.

By linking the lifetime of the dependencies to the lifetime of your route, you
get better memory management, better performance, and more efficient routes.
