---
layout: docs
title: WebRx - The Value-Binding
---
# The Value-Binding

The value binding links the associated DOM element's value with a property on your view model. 
This is typically useful with form elements such as <code>input</code>, <code>select</code> and <code>textarea</code>.

When the user edits the value in the associated form control, it updates the value on your view model. 
Likewise, when you update the value in your view model, this updates the value of the form control on screen.

Note: If you're working with checkboxes or radio buttons, use the [checked binding](/docs/checked-binding.html) to read and 
write your element's <code>checked</code> state, not the value binding.

## Example

```html
<p>Login name: <input data-bind="value: @userName" /></p>
<p>Password: <input type="password" data-bind="value: @userPassword" /></p>
 
<script type="text/javascript">
    var viewModel = {
        userName: wx.property(""),        // Initially blank
        userPassword: wx.property("abc"), // Prepopulate
    };
</script>
```

## Parameters

### Main parameter

The binding sets the element's <code>value</code> property to your parameter value. Any previous value will be overwritten.

If this parameter is a [property reference](/docs/observable-properties.html#topic-propref) (denoted by the <code>@</code>-operator),
the binding will update the element's value whenever the value changes and vice-versa.
If the parameter something else, it will only set the element's value once and will not update it again later.

If you supply something other than a number or a string (e.g., you pass an object or an array), 
the displayed text will be equivalent to <code>yourParameter.toString()</code> (that's usually not very useful, 
so it's best to supply string or numeric values).

Whenever the user edits the value in the associated form control, the binding will update the property 
on your view model. The binding will always attempt to update your view model when the value has been 
modified and a user transfers focus to another DOM node.

## Getting value updates instantly from inputs

If you are trying to bind an <code>input type="text"</code> or <code>textarea</code> to get instant updates to your viewmodel, 
use the the [textInput binding](/docs/textinput-binding.html).

## Working with drop-down lists (i.e., <code>select</code> elements)

WebRx has special support for drop-down lists (i.e., <code>select</code> elements) in form of the [selectedValue-binding](/docs/selected-value-binding.html).

<a class="next-topic" href="/docs/textinput-binding.html">Next: The TextInput-Binding</a>
