---
layout: docs
title: WebRx - The If-Binding
---
{% include sample-warning.html %}
## The If-Binding

### Purpose

The if binding causes a section of markup to appear in your document (and to have its data-bind attributes applied), only if a specified expression evaluates to true (or a true-ish value such as a non-null object or nonempty string).

if plays a similar role to the visible binding. The difference is that, with visible, the contained markup always remains in the DOM and always has its data-bind attributes applied - the visible binding just uses CSS to toggle the container element’s visiblity. The if binding, however, physically adds or removes the contained markup in your DOM, and only applies bindings to descendants if the expression is true.

### Example 1

This example shows that the if binding can dynamically add and remove sections of markup as observable values change.

<div class="panel panel-default" id="if-example">
	<div class="panel-body">
		<label><input type="checkbox" data-bind="checked: @displayMessage" /> Display message</label>
	 
		<div data-bind="if: displayMessage">Here is a message. Astonishing.</div>

		<script>
			wx.applyBindings({
			    displayMessage: wx.property(false)
			}, document.getElementById("if-example"));
		</script>
	</div>
</div>

**Source code: View**

```html
<label><input type="checkbox" data-bind="checked: @displayMessage" /> Display message</label>
 
<div data-bind="if: displayMessage">Here is a message. Astonishing.</div>
```

**Source code: View model**

```javascript
wx.applyBindings({
    displayMessage: wx.property(false)
});
```

### Example 2

In the following example, the *div* element will be empty for “Mercury”, but populated for “Earth”. That’s because Earth has a non-null capital property, whereas “Mercury” has null for that property.

```html
<ul data-bind="foreach: planets">
    <li>
        Planet: <b data-bind="text: name"> </b>
        <div data-bind="if: capital">
            Capital: <b data-bind="text: capital.cityName"> </b>
        </div>
    </li>
</ul>
``` 
 
```html
<script>
    wx.applyBindings({
        planets: [
            { name: 'Mercury', capital: null }, 
            { name: 'Earth', capital: { cityName: 'Barnsley' } }        
        ]
    });
</script>
```

It’s important to understand that the if binding really is vital to make this code work properly. Without it, there would be an error when trying to evaluate capital.cityName in the context of “Mercury” where capital is null. In JavaScript, you’re not allowed to evaluate subproperties of null or undefined values.

### Parameters

#### Main parameter

The expression you wish to evaluate. If it evaluates to true (or a true-ish value), the contained markup will be present in the document, and any data-bind attributes on it will be applied. If your expression evaluates to false, the contained markup will be removed from your document without first applying any bindings to it.

If your expression involves any observable values, the expression will be re-evaluated whenever any of them change. Correspondingly, the markup within your if block can be added or removed dynamically as the result of the expression changes. data-bind attributes will be applied to a new copy of the contained markup whenever it is re-added.