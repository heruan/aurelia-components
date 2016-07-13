"use strict";
var AbstractComponent = (function () {
    function AbstractComponent() {
    }
    AbstractComponent.prototype.created = function (owningView, myView) {
    };
    AbstractComponent.prototype.bind = function (bindingContext, overrideContext) {
    };
    AbstractComponent.prototype.attached = function () {
    };
    AbstractComponent.prototype.detached = function () {
    };
    AbstractComponent.prototype.unbind = function () {
    };
    return AbstractComponent;
}());
exports.AbstractComponent = AbstractComponent;
