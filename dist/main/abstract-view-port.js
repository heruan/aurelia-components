"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_component_1 = require("./abstract-component");
var AbstractViewPort = (function (_super) {
    __extends(AbstractViewPort, _super);
    function AbstractViewPort() {
        return _super.apply(this, arguments) || this;
    }
    AbstractViewPort.prototype.canActivate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    };
    AbstractViewPort.prototype.activate = function (params, routeConfig, navigationInstruction) {
        return Promise.resolve();
    };
    AbstractViewPort.prototype.canDeactivate = function () {
        return Promise.resolve(true);
    };
    AbstractViewPort.prototype.deactivate = function () {
        return Promise.resolve();
    };
    return AbstractViewPort;
}(abstract_component_1.AbstractComponent));
exports.AbstractViewPort = AbstractViewPort;

//# sourceMappingURL=abstract-view-port.js.map
