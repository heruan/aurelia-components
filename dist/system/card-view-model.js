"use strict";

System.register(["aurelia-property-injection", "aurelia-binding", "aurelia-task-queue", "aurelia-event-aggregator", "aurelia-router", "aurelia-i18n", "aurelia-dialog", "aurelia-progress", "aurelia-notification", "aurelia-validation", "aurelia-persistence", "aurelia-security"], function (_export, _context) {
    "use strict";

    var autoinject, BindingEngine, TaskQueue, EventAggregator, Router, I18N, DialogService, ProgressIndicator, NotificationManager, Validation, EntityManager, FilterObserver, SecurityContext, _typeof, __decorate, __metadata, CardViewModel, _a, _b, _c, _d, _e, _f, _g;

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
        }, function (_aureliaTaskQueue) {
            TaskQueue = _aureliaTaskQueue.TaskQueue;
        }, function (_aureliaEventAggregator) {
            EventAggregator = _aureliaEventAggregator.EventAggregator;
        }, function (_aureliaRouter) {
            Router = _aureliaRouter.Router;
        }, function (_aureliaI18n) {
            I18N = _aureliaI18n.I18N;
        }, function (_aureliaDialog) {
            DialogService = _aureliaDialog.DialogService;
        }, function (_aureliaProgress) {
            ProgressIndicator = _aureliaProgress.ProgressIndicator;
        }, function (_aureliaNotification) {
            NotificationManager = _aureliaNotification.NotificationManager;
        }, function (_aureliaValidation) {
            Validation = _aureliaValidation.Validation;
        }, function (_aureliaPersistence) {
            EntityManager = _aureliaPersistence.EntityManager;
            FilterObserver = _aureliaPersistence.FilterObserver;
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

            _export("CardViewModel", CardViewModel = function () {
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
            }());

            _export("CardViewModel", CardViewModel);

            __decorate([autoinject, __metadata('design:type', typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a || Object)], CardViewModel.prototype, "bindingEngine", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_b = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _b || Object)], CardViewModel.prototype, "eventAggregator", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_c = typeof TaskQueue !== 'undefined' && TaskQueue) === 'function' && _c || Object)], CardViewModel.prototype, "taskQueue", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_d = typeof Router !== 'undefined' && Router) === 'function' && _d || Object)], CardViewModel.prototype, "router", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_e = typeof I18N !== 'undefined' && I18N) === 'function' && _e || Object)], CardViewModel.prototype, "i18n", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_f = typeof DialogService !== 'undefined' && DialogService) === 'function' && _f || Object)], CardViewModel.prototype, "dialogService", void 0);
            __decorate([autoinject, __metadata('design:type', NotificationManager)], CardViewModel.prototype, "notificationManager", void 0);
            __decorate([autoinject, __metadata('design:type', ProgressIndicator)], CardViewModel.prototype, "progressIndicator", void 0);
            __decorate([autoinject, __metadata('design:type', FilterObserver)], CardViewModel.prototype, "filterObserver", void 0);
            __decorate([autoinject, __metadata('design:type', EntityManager)], CardViewModel.prototype, "entityManager", void 0);
            __decorate([autoinject, __metadata('design:type', SecurityContext)], CardViewModel.prototype, "securityContext", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_g = typeof Validation !== 'undefined' && Validation) === 'function' && _g || Object)], CardViewModel.prototype, "validation", void 0);
        }
    };
});