/* MIT License */

if (!Array.from) Array.from = function (n) { return Array.prototype.slice.call(n); };
var $ = function (id) { return Array.from(document.querySelectorAll(id)); };

Window.prototype.on = function (type, listener) { return this.addEventListener(type, listener, false); };
(typeof EventTarget === "undefined") ? (Document.prototype.on = Element.prototype.on = Window.prototype.on) : (EventTarget.prototype.on = Window.prototype.on);
Window.prototype.off = function (type, listener) { return this.removeEventListener(type, listener, false); };
(typeof EventTarget === "undefined") ? (Document.prototype.off = Element.prototype.off = Window.prototype.off) : (EventTarget.prototype.off = Window.prototype.off);

Element.prototype.is = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
Array.prototype.each = Array.prototype.forEach;
Array.prototype.first = function () { return (this.length === 0 ? null : this[0]); };
Array.prototype.last = function () { return (this.length === 0 ? null : this[this.length - 1]); };
Element.prototype.find = function (id) { return Array.from(this.querySelectorAll(id)); };
if (!Element.prototype.closest) { //IE fix
    Element.prototype.closest = function (s) { var e = this; 
        while (e.parentElement && !e.parentElement.is(s)) e = e.parentElement; 
        return e.parentElement; }
}


Element.prototype.attr = function (name, value) { return [ this ].attr(name, value); };
Element.prototype.val = function (value) { return [ this ].val(value); };
Element.prototype.append = function (html) { return [ this ].append(html); };
Element.prototype.html = function (value) { return [ this ].html(value); };
Element.prototype.text = function (value) { return [ this ].text(value); };

String.prototype.htmlEncode = function () {
    var map = { "&": "&amp;", "\"": "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" };
    return this.replace(/&|"|'|<|>/g, function (m) { return map[m]; });
};
String.prototype.htmlDecode = function () {
    var map = { "&amp;": "&", "&quot;": "\"", "&#39;": "'", "&lt;": "<", "&gt;": ">" };
    return this.replace(/&amp;|&quot;|&#39;|&lt;|&gt;/g, function (m) { return map[m]; });
};

//Element actions on array
Array.prototype.attr = function (name, value) { 
    if (typeof value === "undefined")
        return this.length > 0 ? this[0].getAttribute(name) : null;
    this.forEach(function (e,i) { e.setAttribute(name, value); });
    return this;
};
Array.prototype.val = function (value) { 
    if (typeof value === "undefined")
        return this.length > 0 ? this[0].value : null;
    this.forEach(function (e,i) { e.value = value; });
    return this;
};
Array.prototype.append = function (html) {
    this.forEach(function (e,i) { e.innerHTML += html; });
    return this;
};
Array.prototype.html = function (value) { 
    if (typeof value === "undefined")
        return this.length > 0 ? this[0].innerHTML : null;
    this.forEach(function (e,i) { e.innerHTML = value; });
    return this;
};
Array.prototype.text = function (value) { 
    if (typeof value === "undefined")
        return this.length > 0 ? this[0].innerText : null;
    this.forEach(function (e,i) { e.innerText = value; });
    return this;
};
Array.prototype.on = function (type, listener) {
    this.forEach(function (e,i) { e.on(type, listener); });
    return this;
};
Array.prototype.off = function (type, listener) {
    this.forEach(function (e,i) { e.off(type, listener); });
    return this;
};
Array.prototype.findNative = Array.prototype.find;
Array.prototype.find = function (selector) {
    if (typeof selector === "function")
        return this.findNative(selector);
    var result = [ ];
    this.forEach(function (e,i) { Array.prototype.push.apply(result, e.find(selector)); });
    return result;
};
//Array.prototype.closest = function (selector) { if (this.length > 0) { return this[0].closest(selector); }; return null; };
Array.prototype.closest = function (selector) { 
    var result = [ ];
    this.forEach(function (e,i) { Array.prototype.push.apply(result, e.closest(selector)); });
    return result;
};
Array.prototype.is = function (selector) { if (this.length > 0) { return this[0].is(selector); }; return false; };

