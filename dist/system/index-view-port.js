"use strict";

System.register(["aurelia-property-injection", "aurelia-binding", "aurelia-router", "aurelia-i18n", "aurelia-security"], function (_export, _context) {
    "use strict";

    var autoinject, BindingEngine, Router, I18N, SecurityContext, _typeof, __decorate, __metadata, IndexViewPort, _a, _b, _c;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaPropertyInjection) {
            autoinject = _aureliaPropertyInjection.autoinject;
        }, function (_aureliaBinding) {
            BindingEngine = _aureliaBinding.BindingEngine;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_aureliaSecurity) {
            SecurityContext = _aureliaSecurity.SecurityContext;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

            __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
                var c = arguments.length,
                    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
                    d;
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
                    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                }return c > 3 && r && Object.defineProperty(target, key, r), r;
            };

            __metadata = undefined && undefined.__metadata || function (k, v) {
                if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
            };

            _export("IndexViewPort", IndexViewPort = function () {
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
            }());

            _export("IndexViewPort", IndexViewPort);

            __decorate([autoinject, __metadata('design:type', typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a || Object)], IndexViewPort.prototype, "bindingEngine", void 0);
            __decorate([autoinject, __metadata('design:type', SecurityContext)], IndexViewPort.prototype, "securityContext", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b || Object)], IndexViewPort.prototype, "router", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_c = typeof I18N !== 'undefined' && I18N) === 'function' && _c || Object)], IndexViewPort.prototype, "i18n", void 0);
        }
    };
});