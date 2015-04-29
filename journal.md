
## dev journal ##

### 2015-04-28 ###

* `GET file://cdnjs.cloudflare.com/ajax/libs/mithril/0.1.34/mithril.min.js net::ERR_FILE_NOT_FOUND`
  * script source to cdn begins with //, this is shorthand for "use document's
  protocol" <http://tools.ietf.org/html/rfc3986#section-4.2>. This doesn't
work when loading document from local disk.

* Check the error messages more clearly, the next one has a slight variation;
  at first I thought changing to http didn't solve previous problem.
* `GET http://cdnjs.cloudflare.com/ajax/libs/mithril/0.1.34/mithril.min.js.map 404 (Not Found)`
  * http://stackoverflow.com/questions/18425841/angular-min-js-map-not-found-what-is-it-exactly
  * http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/

### 2015-04-29 ###

* how does `new` work in javascript
  * http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
  * annoyingly, mitril wraps onclick with a try block and silently discards errors
    * this code m("button", {onclick: function() {alert(foobar);}});
    * should produce: Uncaught ReferenceError: foobar is not defined
    * https://github.com/lhorie/mithril.js/blob/47cc6a7b0385854f39a2acea0c51cc/mithril.js#L477
    * hacked together a simple debug-function thrw() to at least see the errors
