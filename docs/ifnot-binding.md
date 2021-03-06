---
layout: docs
title: WebRx - The IfNot-Binding
---
# The IfNot-Binding

The ifnot binding is exactly the same as the [if binding](/docs/if-binding.html), except that it inverts the result of whatever expression you pass to it. For more details, see documentation for the [if binding](/docs/if-binding.html).

The following markup:

```html
<div data-bind="ifnot: someProperty">...</div>
```

… is equivalent to the following:

```html
<div data-bind="if: !someProperty()">...</div>
```

… assuming that someProperty is observable and hence you need to invoke it as a function to obtain the current value.

The only reason to use <code>ifnot</code> instead of a negated <code>if</code> is just as a matter of taste: many developers feel that it looks tidier.

<a class="next-topic" href="/docs/with-binding.html">Next: The With-Binding</a>
