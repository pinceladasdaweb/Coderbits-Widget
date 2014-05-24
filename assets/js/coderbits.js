/*
--------------------------------
Coderbits Widget
--------------------------------
+ https://github.com/pinceladasdaweb/Coderbits-Widget
+ version 1.0.0
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Coderbits-Widget
*/

var loadJSONP = (function (window, document, undefined) {
    'use strict';
    /*jslint plusplus: true */
    var id = 0, head, externalScript;
    head = document.head || document.getElementsByTagName('head')[0];
    externalScript = document.createElement('script');
    externalScript.type = 'text/javascript';

    return function (url, callback, context) {
        var name = 'jsonp_' + id++, script;

        if (url.match(/\?/)) {
            url += '&callback=' + name;
        } else {
            url += '?callback=' + name;
        }

        script = externalScript.cloneNode();
        script.src = url;

        window[name] = function (data) {
            callback.call((context || window), data);
            head.removeChild(script);
            script = null;
            delete window[name];
        }

        head.appendChild(script);
    }
}(window, document));

var Coderbits = (function (window, document, undefined) {
    "use strict";
    var module = {
        config: function (config) {
            this.url       = 'https://coderbits.com/' + config.user + '.json';
            this.container = config.container;
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
            var self = this;

            loadJSONP(self.url, function (data) {
                self.attach(data);
            })
        },
        profile: function (data) {
            var self   = this,
                name   = document.createTextNode(data.name),
                title  = document.createTextNode('"' + data.title + '"'),
                avatar = 'http://www.gravatar.com/avatar/' + data.gravatar_hash,
                header = self.create('header', {id: 'profile'}),
                h2     = self.create('h2', {id: 'profile-username'}),
                a      = self.create('a', {href: data.link}),
                img    = self.create('img', {src: avatar, id: 'profile-image'}),
                p      = self.create('p', {id: 'profile-title'});

            h2.appendChild(name);
            p.appendChild(title);
            a.appendChild(img);
            header.appendChild(a);
            header.appendChild(h2);
            header.appendChild(p);
            
            return header;
        },
        badges: function (data) {
            var self = this,
                href = data.link,
                src  = data.image_link,
                alt  = data.name,
                a    = self.create('a', {href: href, className: 'badge-image'}),
                img  = self.create('img', {src: src, alt: alt, title: alt});

            a.appendChild(img);

            return a;
        },
        attach: function (data) {
            var self      = this,
                count     = 0,
                div       = self.create('div', {id: 'badges'}),
                a         = self.create('a', {id: 'more', href: data.link}),
                t         = document.createTextNode('View all'),
                container = document.querySelector(self.container);

            container.appendChild(self.profile(data));

            self.loop(data.badges, function (badge) {
                if (badge.earned) {
                    if(count < 12 && badge.level === 1) {
                        div.appendChild(self.badges(badge).cloneNode(true));
                        count++;
                    }
                }
            });

            a.appendChild(t);
            container.appendChild(div);
            div.appendChild(a);
        },
        init: function (config) {
            module.config(config);
            module.request();
        }
    };
    return {
        init: module.init
    };
}(window, document));