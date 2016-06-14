define(["exports", "./table-view-model"], function (exports, _tableViewModel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TableViewPort = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

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

    var TableViewPort = exports.TableViewPort = function (_TableViewModel) {
        _inherits(TableViewPort, _TableViewModel);

        function TableViewPort(newable) {
            var relation = arguments.length <= 1 || arguments[1] === undefined ? "list" : arguments[1];

            _classCallCheck(this, TableViewPort);

            var _this = _possibleConstructorReturn(this, _TableViewModel.call(this, newable, relation));

            _this.boundScrollListener = _this.scrollListener.bind(_this);
            return _this;
        }

        TableViewPort.prototype.canActivate = function canActivate(params, routeConfig, navigationInstruction) {
            return Promise.resolve(true);
        };

        TableViewPort.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
            return _TableViewModel.prototype.activate.call(this, navigationInstruction.params);
        };

        TableViewPort.prototype.canDeactivate = function canDeactivate() {
            return Promise.resolve(true);
        };

        TableViewPort.prototype.deactivate = function deactivate() {
            return _TableViewModel.prototype.deactivate.call(this);
        };

        TableViewPort.prototype.created = function created(owningView, myView) {};

        TableViewPort.prototype.bind = function bind(bindingContext, overrideContext) {
            _TableViewModel.prototype.retrieveAndReplaceEntities.call(this);
        };

        TableViewPort.prototype.attached = function attached() {
            window.addEventListener("scroll", this.boundScrollListener);
        };

        TableViewPort.prototype.detached = function detached() {
            window.removeEventListener("scroll", this.boundScrollListener);
        };

        TableViewPort.prototype.unbind = function unbind() {};

        _createClass(TableViewPort, [{
            key: "hash",
            get: function get() {
                return window.location.hash;
            }
        }]);

        return TableViewPort;
    }(_tableViewModel.TableViewModel);
});