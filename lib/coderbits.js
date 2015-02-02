/*jslint browser: true*/
/*global define, module, exports*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.Coderbits = factory(root);
    }
})(this, function () {
    'use strict';

    if (!(Function.prototype.hasOwnProperty('bind'))) {
        Function.prototype.bind = function () {
            var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };
        };
    }

    var Coderbits = function (options) {
        if (!this || !(this instanceof Coderbits)) {
            return new Coderbits(options);
        }

        if (typeof options === 'string') {
            options = { key : options };
        }

        this.endpoint  = 'https://coderbits.com/' + options.user + '.json';
        this.container = options.container;

        this.request();
    };

    Coderbits.init = function (options) {
        return new Coderbits(options);
    };

    Coderbits.prototype = {
        jsonp: function (url, callback, context) {
            var name = 'jsonp_' + Math.round(100000 * Math.random()),
                head, script, extScript;

            head           = document.head || document.getElementsByTagName('head')[0];
            extScript      = document.createElement('script');
            extScript.type = 'text/javascript';

            script       = extScript.cloneNode();
            script.src   = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + name;
            script.async = true;

            head.appendChild(script);

            window[name] = function (data) {
                callback.call((context || window), data);
                head.removeChild(script);
                script = null;
                delete this.name;
            }.bind(this);
        },
        loop: function (els, callback) {
            var i = 0, max = els.length;
            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        request: function () {
            this.jsonp(this.endpoint, function (data) {
                this.attach(data);
            }.bind(this));
        },
        profile: function (data) {
            var name   = document.createTextNode(data.name),
                title  = document.createTextNode('"' + data.title + '"'),
                avatar = 'https://www.gravatar.com/avatar/' + data.gravatar_hash,
                header = this.create('header', {id: 'profile'}),
                h2     = this.create('h2', {id: 'profile-username'}),
                a      = this.create('a', {href: data.link}),
                img    = this.create('img', {src: avatar, id: 'profile-image'}),
                p      = this.create('p', {id: 'profile-title'});

            h2.appendChild(name);
            p.appendChild(title);
            a.appendChild(img);
            header.appendChild(a);
            header.appendChild(h2);
            header.appendChild(p);

            return header;
        },
        badges: function (data) {
            var href = data.link,
                src  = data.image_link,
                alt  = data.name,
                a    = this.create('a', {href: href, className: 'badge-image'}),
                img  = this.create('img', {src: src, alt: alt, title: alt});

            a.appendChild(img);

            return a;
        },
        attach: function (data) {
            var count     = 0,
                div       = this.create('div', {id: 'badges'}),
                a         = this.create('a', {id: 'more', href: data.link}),
                t         = document.createTextNode('View all'),
                container = document.querySelector(this.container);

            container.appendChild(this.profile(data));

            this.loop(data.badges, function (badge) {
                if (badge.earned) {
                    if (count < 12 && badge.level === 1) {
                        div.appendChild(this.badges(badge).cloneNode(true));
                        count += 1;
                    }
                }
            }.bind(this));

            a.appendChild(t);
            container.appendChild(div);
            div.appendChild(a);
        }
    };

    return Coderbits;
});