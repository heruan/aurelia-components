define(["exports", "aurelia-property-injection", "aurelia-binding", "aurelia-task-queue", "aurelia-event-aggregator", "aurelia-router", "aurelia-i18n", "aurelia-dialog", "aurelia-progress", "aurelia-notification", "aurelia-security", "aurelia-storage", "aurelia-persistence"], function (exports, _aureliaPropertyInjection, _aureliaBinding, _aureliaTaskQueue, _aureliaEventAggregator, _aureliaRouter, _aureliaI18n, _aureliaDialog, _aureliaProgress, _aureliaNotification, _aureliaSecurity, _aureliaStorage, _aureliaPersistence) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TableViewModel = undefined;

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

    var TableViewModel = exports.TableViewModel = function () {
        function TableViewModel(newable) {
            var relation = arguments.length <= 1 || arguments[1] === undefined ? "list" : arguments[1];

            _classCallCheck(this, TableViewModel);

            this.eventAggregator = new _aureliaEventAggregator.EventAggregator();
            this.filters = [];
            this.newFilter = new _aureliaPersistence.UserFilter();
            this.limit = TableViewModel.DEFAULT_LIMIT;
            this.skip = 0;
            this.disposables = [];
            this.newable = newable;
            this.relation = relation;
            this.filter = new _aureliaPersistence.FilterQuery();
            this.search = new _aureliaPersistence.SearchBooleanContext();
            this.filterBindings = {};
            this.sort = new _aureliaPersistence.Sorting();
            this.scrollLoading = false;
        }

        TableViewModel.prototype.afterConstructor = function afterConstructor() {
            this.entityService = this.entityManager.getService(this.newable);
        };

        TableViewModel.prototype.activate = function activate(params) {
            var _this = this;

            this.params = params;
            this.disposables.push(this.eventAggregator.subscribe(_aureliaPersistence.SearchQuery.SEARCH_EVENT, function (callback) {
                _this.searchEntities(_this.limit, _this.skip).then(_this.replaceEntities.bind(_this)).then(function (entities) {
                    if (callback && callback.call) {
                        callback.call(_this, entities);
                    }
                });
            }));
            this.disposables.push(this.eventAggregator.subscribe(_aureliaPersistence.FilterQuery.FILTERING_EVENT, function (callback) {
                _this.filterEntities(_this.limit, _this.skip).then(_this.replaceEntities.bind(_this)).then(function (entities) {
                    if (callback && callback.call) {
                        callback.call(_this, entities);
                    }
                });
            }));
            this.disposables.push(this.eventAggregator.subscribe(_aureliaPersistence.Sorting.SORTING_EVENT, function (callback) {
                _this.retrieveEntities(_this.limit, _this.skip).then(_this.replaceEntities.bind(_this)).then(function (entities) {
                    if (callback && callback.call) {
                        callback.call(_this, entities);
                    }
                });
            }));
            return Promise.resolve([]);
        };

        TableViewModel.prototype.canDeactivate = function canDeactivate() {
            return this.deactivate().then(function (deactivation) {
                return true;
            });
        };

        TableViewModel.prototype.deactivate = function deactivate() {
            if (this.retrieveEntitiesPromise) {
                this.retrieveEntitiesPromise.cancel();
            }
            this.disposables.forEach(function (disposable) {
                return disposable.dispose();
            });
            return Promise.resolve();
        };

        TableViewModel.prototype.scrollListener = function scrollListener(event) {
            var element = event.target;
            if (!this.scrollLoading && element.scrollTop === element.scrollHeight - element.offsetHeight) {
                this.infiniteScroll();
            }
        };

        TableViewModel.prototype.filterField = function filterField(property) {
            if (this.filterBindings[property]) {
                this.filter.regex(property, this.filterBindings[property]);
            } else {
                this.filter.unset(property);
            }
            this.eventAggregator.publish(_aureliaPersistence.FilterQuery.FILTERING_EVENT, property);
        };

        TableViewModel.prototype.filterCollection = function filterCollection(collection, property) {
            if (this.filterBindings[property]) {
                this.filter.elemMatch(collection, new _aureliaPersistence.FilterQuery().regex(property, this.filterBindings[property]));
            } else {
                this.filter.unset(collection);
            }
            this.eventAggregator.publish(_aureliaPersistence.FilterQuery.FILTERING_EVENT, property);
        };

        TableViewModel.prototype.searchEntities = function searchEntities() {
            var limit = arguments.length <= 0 || arguments[0] === undefined ? this.limit : arguments[0];
            var skip = arguments.length <= 1 || arguments[1] === undefined ? this.skip : arguments[1];

            return this.retrieveEntities(limit, skip, this.search);
        };

        TableViewModel.prototype.filterEntities = function filterEntities() {
            var limit = arguments.length <= 0 || arguments[0] === undefined ? this.limit : arguments[0];
            var skip = arguments.length <= 1 || arguments[1] === undefined ? this.skip : arguments[1];

            return this.retrieveEntities(limit, skip, this.filter);
        };

        TableViewModel.prototype.retrieveEntities = function retrieveEntities() {
            var limit = arguments.length <= 0 || arguments[0] === undefined ? this.limit : arguments[0];

            var _this2 = this;

            var skip = arguments.length <= 1 || arguments[1] === undefined ? this.skip : arguments[1];
            var query = arguments.length <= 2 || arguments[2] === undefined ? this.filter : arguments[2];

            this.progressIndicator.start();
            var path = this.entityService.link(this.relation, this.params);
            this.retrieveEntitiesPromise = this.entityService.searchMessage("table-view-model", path, query, limit, skip, this.sort, this.properties);
            return this.retrieveEntitiesPromise.then(function (success) {
                _this2.progressIndicator.done();
                _this2.countTotal = +success.headers.get(_aureliaPersistence.EntityService.COUNT_TOTAL_HEADER);
                _this2.countFilter = +success.headers.get(_aureliaPersistence.EntityService.COUNT_FILTER_HEADER);
                return success.content;
            }, function (failure) {
                _this2.progressIndicator.done();
            });
        };

        TableViewModel.prototype.replaceEntities = function replaceEntities(entities) {
            return this.entities = entities;
        };

        TableViewModel.prototype.retrieveAndReplaceEntities = function retrieveAndReplaceEntities() {
            var limit = arguments.length <= 0 || arguments[0] === undefined ? this.limit : arguments[0];
            var skip = arguments.length <= 1 || arguments[1] === undefined ? this.skip : arguments[1];

            return this.retrieveEntities(limit, skip).then(this.replaceEntities.bind(this));
        };

        TableViewModel.prototype.concatenateEntities = function concatenateEntities(entities) {
            var _this3 = this;

            entities.forEach(function (entity) {
                if (_this3.entities.indexOf(entity) < 0) {
                    _this3.entities.push(entity);
                }
            });
            return this.entities;
        };

        TableViewModel.prototype.infiniteScroll = function infiniteScroll() {
            var _this4 = this;

            var limit = TableViewModel.INFINITE_SCROLL_INCREMENT;
            var skip = this.limit;
            this.scrollLoading = true;
            return this.retrieveEntities(limit, skip).then(this.concatenateEntities.bind(this)).then(function (entities) {
                _this4.scrollLoading = false;
                return _this4.limit += limit;
            });
        };

        return TableViewModel;
    }();

    TableViewModel.DEFAULT_LIMIT = 25;
    TableViewModel.INFINITE_SCROLL_INCREMENT = 25;
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_a = typeof _aureliaBinding.BindingEngine !== 'undefined' && _aureliaBinding.BindingEngine) === 'function' && _a || Object)], TableViewModel.prototype, "bindingEngine", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_b = typeof _aureliaTaskQueue.TaskQueue !== 'undefined' && _aureliaTaskQueue.TaskQueue) === 'function' && _b || Object)], TableViewModel.prototype, "taskQueue", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_c = typeof _aureliaRouter.Router !== 'undefined' && _aureliaRouter.Router) === 'function' && _c || Object)], TableViewModel.prototype, "router", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_d = typeof _aureliaI18n.I18N !== 'undefined' && _aureliaI18n.I18N) === 'function' && _d || Object)], TableViewModel.prototype, "i18n", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', typeof (_e = typeof _aureliaDialog.DialogService !== 'undefined' && _aureliaDialog.DialogService) === 'function' && _e || Object)], TableViewModel.prototype, "dialogService", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaStorage.LocalStorage)], TableViewModel.prototype, "localStorage", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaNotification.NotificationManager)], TableViewModel.prototype, "notificationManager", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaProgress.ProgressIndicator)], TableViewModel.prototype, "progressIndicator", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaPersistence.FilterObserver)], TableViewModel.prototype, "filterObserver", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaSecurity.SecurityContext)], TableViewModel.prototype, "securityContext", void 0);
    __decorate([_aureliaPropertyInjection.autoinject, __metadata('design:type', _aureliaPersistence.EntityManager)], TableViewModel.prototype, "entityManager", void 0);
    var _a, _b, _c, _d, _e;
});