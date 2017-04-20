"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_component_1 = require("./abstract-component");
var AbstractViewPort = (function (_super) {
    __extends(AbstractViewPort, _super);
    function AbstractViewPort() {
        return _super !== null && _super.apply(this, arguments) || this;
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
