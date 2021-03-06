---
layout: docs
title: WebRx - The Hidden-Binding
---
# The Hidden-Binding


The hidden binding is exactly the same as the [visible binding](/docs/visible-binding.html), except that it inverts the result of whatever expression you pass to it. For more details, see documentation for the [visible binding](/docs/visible-binding.html).

The following markup:

```html
<div data-bind="hidden: someProperty">...</div>
```

… is equivalent to the following:

```html
<div data-bind="visible: !someProperty()">...</div>
```

… assuming that someProperty is observable and hence you need to invoke it as a function to obtain the current value.

The only reason to use <code>hidden</code> instead of a negated <code>visible</code> is just as a matter of taste: many developers feel that it looks tidier.

<a class="next-topic" href="/docs/text-binding.html">Next: The Text-Binding</a>
