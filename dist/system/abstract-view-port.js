"use strict";

System.register(["./abstract-component"], function (_export, _context) {
    "use strict";

    var AbstractComponent, AbstractViewPort;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_abstractComponent) {
            AbstractComponent = _abstractComponent.AbstractComponent;
        }],
        execute: function () {
            _export("AbstractViewPort", AbstractViewPort = function (_AbstractComponent) {
                _inherits(AbstractViewPort, _AbstractComponent);

                function AbstractViewPort() {
                    _classCallCheck(this, AbstractViewPort);

                    return _possibleConstructorReturn(this, _AbstractComponent.apply(this, arguments));
                }

                AbstractViewPort.prototype.canActivate = function canActivate(params, routeConfig, navigationInstruction) {
                    return Promise.resolve(true);
                };

                AbstractViewPort.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
                    return Promise.resolve();
                };

                AbstractViewPort.prototype.canDeactivate = function canDeactivate() {
                    return Promise.resolve(true);
                };

                AbstractViewPort.prototype.deactivate = function deactivate() {
                    return Promise.resolve();
                };

                return AbstractViewPort;
            }(AbstractComponent));

            _export("AbstractViewPort", AbstractViewPort);
        }
    };
});