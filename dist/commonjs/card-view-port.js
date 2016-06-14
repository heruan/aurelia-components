"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardViewPort = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cardViewModel = require("./card-view-model");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardViewPort = exports.CardViewPort = function (_CardViewModel) {
    _inherits(CardViewPort, _CardViewModel);

    function CardViewPort(newable) {
        var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];

        _classCallCheck(this, CardViewPort);

        return _possibleConstructorReturn(this, _CardViewModel.call(this, newable, relation));
    }

    CardViewPort.prototype.canActivate = function canActivate(params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    };

    CardViewPort.prototype.activate = function activate(params, routeConfig, navigationInstruction) {
        var _this2 = this;

        this.params = navigationInstruction.params;
        return this.entityService.retrieve(this.entity, this.relation, navigationInstruction.params).then(function (entity) {
            _this2.bindRouteTitle(routeConfig, entity);
            return _CardViewModel.prototype.activate.call(_this2, entity);
        });
    };

    CardViewPort.prototype.canDeactivate = function canDeactivate() {
        return Promise.resolve(true);
    };

    CardViewPort.prototype.deactivate = function deactivate() {
        return _CardViewModel.prototype.deactivate.call(this);
    };

    CardViewPort.prototype.created = function created(owningView, myView) {};

    CardViewPort.prototype.bind = function bind(bindingContext, overrideContext) {};

    CardViewPort.prototype.attached = function attached() {};

    CardViewPort.prototype.detached = function detached() {};

    CardViewPort.prototype.unbind = function unbind() {};

    CardViewPort.prototype.bindRouteTitle = function bindRouteTitle(routeConfig, entity) {
        var _this3 = this;

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
                _this3.bindingEngine.propertyObserver(entity, field).subscribe(function (value) {
                    _this3.title = routeConfig.title.replace("{" + path + "}", value);
                    routeConfig.navModel.setTitle(_this3.title);
                });
                return entity[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    };

    _createClass(CardViewPort, [{
        key: "hash",
        get: function get() {
            return window.location.hash;
        }
    }]);

    return CardViewPort;
}(_cardViewModel.CardViewModel);