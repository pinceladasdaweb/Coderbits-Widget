# Coderbits Widget
> Coderbits Widget developed with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Coderbits-Widget/master/screenshot.png)

## Demo
View demo [here](http://www.pinceladasdaweb.com.br/blog/uploads/coderbits/)

## How to use?
Coderbits Widget is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. Include the [`coderbits.min.js`](assets/js/coderbits.min.js) in the footer of your page and initialise it:

```javascript
(function(window, document, undefined) {
    Coderbits.init({
        container: '#coderbits',
        user: 'bit'
    });
}(window, document));
```
## Options
Customise how Coderbits Widget works by passing in custom options.

```javascript
// Options
container: '#coderbits' // Element tagname, element class or element id
user: 'bit' // Coderbits username
```

## Browser support
IE8+ and modern browsers.

## License
Coderbits Widget is licensed under the MIT License.