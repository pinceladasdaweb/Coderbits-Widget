# Coderbits Widget
> Coderbits Widget developed with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Coderbits-Widget/master/example/screenshot.png)

## Demo
View demo [here](http://www.pinceladasdaweb.com.br/blog/uploads/coderbits/)

## How to use?
Coderbits Widget is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependencies. Include the [`coderbits.min.js`](build/coderbits.min.js) in the footer of your page and initialise it:

```javascript
(function(window, document, undefined) {
    Coderbits.init({
        container: '#coderbits',
        user: 'bit'
    });
}(window, document));
```
In an AMD loader:

```js
require(['/path/to/coderbits.min'], function(Coderbits) {
    Coderbits.init({
        container: '#coderbits',
        user: 'bit'
    });
});
```

## Options
Customise how Coderbits Widget works by passing in custom options.

```javascript
// Options
container: '#coderbits' // Element tagname, element class or element id
user: 'bit' // Coderbits username
```

## Browser support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## License
Coderbits Widget is licensed under the MIT License.