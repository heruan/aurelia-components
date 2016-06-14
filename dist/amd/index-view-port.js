define(["exports", "aurelia-property-injection", "aurelia-binding", "aurelia-router", "aurelia-i18n", "aurelia-security"], function (exports, _aureliaPropertyInjection, _aureliaBinding, _aureliaRouter, _aureliaI18n, _aureliaSecurity) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.IndexViewPort = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = undefined && undefined.__metadata || function (k, v) {
        if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };

    var IndexViewPort = exports.IndexViewPort = function () {
        function IndexViewPort() {
            _classCallCheck(this, IndexViewPort);
        }

        IndexViewPort.prototype.configureRouter = function configureRouter(routerConfiguration, router) {
            routerConfiguration.map([{
                name: "table",
                route: "/",
                moduleId: "./table"
            }, {
                name: "card",
                route: "/:id",
                moduleId: "./card"
            }]);
            this.router = router;
        };

        IndexViewPort.prototype.canActivate = function canActivate(params, routeConfig, navigationInstruction) {
            return Promise.resolve(true);
        };

        IndexViewPort.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            return Promise.resolve();
        };

        IndexViewPort.prototype.canDeactivate = function canDeactivate() {
            return Promise.resolve(true);
        };

        IndexViewPort.prototype.deactivate = function deactivate() {
            return Promise.resolve();
        };

        IndexViewPort.prototype.created = function created(owningView, myView) {};

        IndexViewPort.prototype.bind = function bind(bindingContext, overrideContext) {
            this.securityContext.refreshRouteVisibility(this.router);
        };

        IndexViewPort.prototype.attached = function attached() {};

        IndexViewPort.prototype.detached = function detached() {};

        IndexViewPort.prototype.unbind = function unbind() {};

        IndexViewPort.prototype.bindRouteTitle = function bindRouteTitle(routeConfig, entity) {
            var _this = this;

            if (routeConfig.title) {
                this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, function (match, path) {
                    var steps = path.split(".");
                    var field = steps.pop();
                    for (var _iterator = steps, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var step = _ref;

                        entity = entity[step];
                    }
                    _this.bindingEngine.propertyObserver(entity, field).subscribe(function (value) {
                        _this.title = routeConfig.title.replace("{" + path + "}", value);
                        routeConfig.navModel.setTitle(_this.title);
                    });
                    return entity[field];
                });
                routeConfig.navModel.setTitle(this.title);
            }
        };

        return IndexViewPort;
    }();

    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_a = typeof _aureliaBinding.BindingEngine !== 'undefined' && _aureliaBinding.BindingEngine) === 'function' && _a || Object)], IndexViewPort.prototype, "bindingEngine", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaSecurity.SecurityContext)], IndexViewPort.prototype, "securityContext", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_b = typeof _aureliaRouter.Router !== 'undefined' && _aureliaRouter.Router) === 'function' && _b || Object)], IndexViewPort.prototype, "router", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_c = typeof _aureliaI18n.I18N !== 'undefined' && _aureliaI18n.I18N) === 'function' && _c || Object)], IndexViewPort.prototype, "i18n", void 0);
    var _a, _b, _c;
});