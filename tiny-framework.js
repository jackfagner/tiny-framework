/* MIT License */

var $ = function (id) { return Array.prototype.slice.call(document.querySelectorAll(id)); };

Window.prototype.on = function (type, listener) { return this.addEventListener(type, listener, false); };
if (typeof EventTarget == "undefined") //Chromium
    Document.prototype.on = Element.prototype.on = Window.prototype.on;
else
    EventTarget.prototype.on = Window.prototype.on;
    
Element.prototype.attr = function (name, value) { return (typeof value == "undefined" ? this.getAttribute(name) : this.setAttribute(name, value)); };
Element.prototype.html = function (value) { return (typeof value == "undefined" ? this.innerHTML : this.innerHTML = value); };
Element.prototype.append = function (value) { this.innerHTML = this.innerHTML += value; };
Element.prototype.getParentByTagName = function (tagName) { return (this.parentNode["getParentByTagName"] ? (this.parentNode.nodeName.toLowerCase() == tagName.toLowerCase() ? this.parentNode : this.parentNode.getParentByTagName(tagName)) : null); };
Array.prototype.first = function () { return (this.length == 0 ? null : this[0]); };
Array.prototype.last = function () { return (this.length == 0 ? null : this[this.length - 1]); };

String.prototype.htmlEncode = function () {
    var map = { "&": "&amp;", "\"": "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" };
    return this.replace(/&|"|'|<|>/g, function (m) { return map[m]; });
};
String.prototype.htmlDecode = function () {
    var map = { "&amp;": "&", "&quot;": "\"", "&#39;": "'", "&lt;": "<", "&gt;": ">" };
    return this.replace(/&amp;|&quot;|&#39;|&lt;|&gt;/g, function (m) { return map[m]; });
};
