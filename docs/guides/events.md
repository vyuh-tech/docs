---
title: Events
description: Events are a way to get notified of important lifecycle events and to communicate between features
---

# Events

Events are a way to get notified of important lifecycle events in the Vyuh
Framework as well as to communicate between features.

The framework leverages a built-in `EventPlugin` to handle the propagation of
events. It is a global event system that even allows features to communicate
with each other. The event plugin can be referenced with `vyuh.event`.

## Listening for Events

To listen for an event, use the `on` method on `vyuh.event`. The `on<T>()`
method is a generic method based on the type of the Event and takes a typed
listener that matches the generic type. The method returns a disposer function
that can be invoked at a later point to cancel the event listener.

A typical place to set up an event listener would be in the `init` method of a
feature:

```dart
final feature = FeatureDescriptor(
  name: 'root',
  title: 'Vyuh Root Feature',
  init: () async {
    final disposer = vyuh.event.on<SystemReadyEvent>((event) {
      print('System is ready');
    });

    // At a later point, invoke the disposer to cancel the listener
    disposer();
  },
);
```

::: tip
With the `on` method, you can listen for multiple events by skipping the type
specifier:

```dart
final disposer = vyuh.event.on((event) {
  print('${event.runtimeType} event received');
});
```
:::

### Listening for Events Once

You can listen to events just once with the `once` method. This removes the
listener after the first time the event is triggered:

```dart
vyuh.event.once<SystemReadyEvent>((event) {
  print('System is ready');
});
```

The `once` method also supports listening to multiple events without specifying
a type.

## Triggering Events

To trigger an event, use the `emit` method on `vyuh.event`. The `emit` method
emits a type-safe event that is a subclass of `VyuhEvent`:

```dart
vyuh.event.emit(SystemReadyEvent());
```

### VyuhEvent

The `VyuhEvent` class is the base class for all events in the Vyuh Framework. It
is a generic class that takes a type parameter representing the payload of the
event. The payload can be any type or `void` if the event does not have a
payload.

The `name` of the event is a string that uniquely identifies the event. It is
common to use a reverse domain name notation for the event name. The event class
also has a `timestamp` that represents the time when the event was created.

```dart
class VyuhEvent<T> {
  final String name;
  final DateTime timestamp;
  final T? data;

  VyuhEvent({
    required this.name,
    this.data,
  }) : timestamp = DateTime.now();
}
```

### Standard Events

Currently, there is one standard event in the Vyuh Framework:

- **`SystemReadyEvent`**: Triggered when the system is ready to start the
  application. It is a good place to perform post-initialization setup.

### Custom Events

You can create custom events by extending the `VyuhEvent` class:

```dart
class CustomEvent extends VyuhEvent<String> {
  CustomEvent({required super.data})
      : super(name: 'com.example.customEvent');
}
```

The custom event can be triggered like so:

```dart
vyuh.event.emit(CustomEvent(data: 'Hello, World!'));
```

## Event Propagation

The event system in the Vyuh Framework is a global event system. The event
propagation is synchronous and happens in the order of the event registration.

When an event is emitted, the event plugin iterates through all the event
listeners and invokes them in the order they were registered. You can cancel
an event listener by invoking the disposer function returned by the `on` method.

## Summary

Events are a powerful way to communicate between features in the Vyuh Framework.
The event system is global and allows features to listen to events and
communicate with each other. The event system is synchronous and propagates
events in the order of registration.
