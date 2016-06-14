"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardViewModel = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaPropertyInjection = require("aurelia-property-injection");

var _aureliaBinding = require("aurelia-binding");

var _aureliaTaskQueue = require("aurelia-task-queue");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaRouter = require("aurelia-router");

var _aureliaI18n = require("aurelia-i18n");

var _aureliaDialog = require("aurelia-dialog");

var _aureliaProgress = require("aurelia-progress");

var _aureliaNotification = require("aurelia-notification");

var _aureliaValidation = require("aurelia-validation");

var _aureliaPersistence = require("aurelia-persistence");

var _aureliaSecurity = require("aurelia-security");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var CardViewModel = exports.CardViewModel = function () {
    function CardViewModel(newable) {
        var relation = arguments.length <= 1 || arguments[1] === undefined ? "self" : arguments[1];

        _classCallCheck(this, CardViewModel);

        this.disposables = [];
        this.newable = newable;
        this.relation = relation;
    }

    CardViewModel.prototype.afterConstructor = function afterConstructor() {
        this.entityService = this.entityManager.getService(this.newable);
    };

    CardViewModel.prototype.activate = function activate(entity) {
        this.entity = entity;
        this.entityValidation = this.setEntityValidationConstraints();
        return Promise.resolve(this.entity);
    };

    CardViewModel.prototype.canDeactivate = function canDeactivate() {
        return this.deactivate() || Promise.resolve(true);
    };

    CardViewModel.prototype.deactivate = function deactivate() {
        this.disposables.forEach(function (disposable) {
            return disposable.dispose();
        });
        return Promise.resolve(true);
    };

    CardViewModel.prototype.setEntityValidationConstraints = function setEntityValidationConstraints() {
        return this.validation.on(this.entity);
    };

    CardViewModel.prototype.updateEntity = function updateEntity(entity) {
        return this.entityService.patch(entity);
    };

    return CardViewModel;
}();

__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_a = typeof _aureliaBinding.BindingEngine !== 'undefined' && _aureliaBinding.BindingEngine) === 'function' && _a || Object)], CardViewModel.prototype, "bindingEngine", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_b = typeof _aureliaEventAggregator.EventAggregator !== 'undefined' && _aureliaEventAggregator.EventAggregator) === 'function' && _b || Object)], CardViewModel.prototype, "eventAggregator", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_c = typeof _aureliaTaskQueue.TaskQueue !== 'undefined' && _aureliaTaskQueue.TaskQueue) === 'function' && _c || Object)], CardViewModel.prototype, "taskQueue", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_d = typeof _aureliaRouter.Router !== 'undefined' && _aureliaRouter.Router) === 'function' && _d || Object)], CardViewModel.prototype, "router", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_e = typeof _aureliaI18n.I18N !== 'undefined' && _aureliaI18n.I18N) === 'function' && _e || Object)], CardViewModel.prototype, "i18n", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_f = typeof _aureliaDialog.DialogService !== 'undefined' && _aureliaDialog.DialogService) === 'function' && _f || Object)], CardViewModel.prototype, "dialogService", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaNotification.NotificationManager)], CardViewModel.prototype, "notificationManager", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaProgress.ProgressIndicator)], CardViewModel.prototype, "progressIndicator", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaPersistence.FilterObserver)], CardViewModel.prototype, "filterObserver", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaPersistence.EntityManager)], CardViewModel.prototype, "entityManager", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaSecurity.SecurityContext)], CardViewModel.prototype, "securityContext", void 0);
__decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_g = typeof _aureliaValidation.Validation !== 'undefined' && _aureliaValidation.Validation) === 'function' && _g || Object)], CardViewModel.prototype, "validation", void 0);
var _a, _b, _c, _d, _e, _f, _g;