"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var AbstractComponent;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("AbstractComponent", AbstractComponent = function () {
                function AbstractComponent() {
                    _classCallCheck(this, AbstractComponent);
                }

                AbstractComponent.prototype.created = function created(owningView, myView) {};

                AbstractComponent.prototype.bind = function bind(bindingContext, overrideContext) {};

                AbstractComponent.prototype.attached = function attached() {};

                AbstractComponent.prototype.detached = function detached() {};

                AbstractComponent.prototype.unbind = function unbind() {};

                return AbstractComponent;
            }());

            _export("AbstractComponent", AbstractComponent);
        }
    };
});