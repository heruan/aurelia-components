"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractComponent = exports.AbstractComponent = function () {
    function AbstractComponent() {
        _classCallCheck(this, AbstractComponent);
    }

    AbstractComponent.prototype.created = function created(owningView, myView) {};

    AbstractComponent.prototype.bind = function bind(bindingContext, overrideContext) {};

    AbstractComponent.prototype.attached = function attached() {};

    AbstractComponent.prototype.detached = function detached() {};

    AbstractComponent.prototype.unbind = function unbind() {};

    return AbstractComponent;
}();