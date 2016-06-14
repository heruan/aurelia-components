"use strict";

System.register(["aurelia-property-injection", "aurelia-binding", "aurelia-task-queue", "aurelia-event-aggregator", "aurelia-router", "aurelia-i18n", "aurelia-dialog", "aurelia-progress", "aurelia-notification", "aurelia-security", "aurelia-storage", "aurelia-persistence"], function (_export, _context) {
    "use strict";

    var autoinject, BindingEngine, TaskQueue, EventAggregator, Router, I18N, DialogService, ProgressIndicator, NotificationManager, SecurityContext, LocalStorage, EntityManager, EntityService, FilterObserver, FilterQuery, SearchQuery, SearchBooleanContext, Sorting, UserFilter, _typeof, __decorate, __metadata, TableViewModel, _a, _b, _c, _d, _e;

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
        }, function (_aureliaSecurity) {
            SecurityContext = _aureliaSecurity.SecurityContext;
        }, function (_aureliaStorage) {
            LocalStorage = _aureliaStorage.LocalStorage;
        }, function (_aureliaPersistence) {
            EntityManager = _aureliaPersistence.EntityManager;
            EntityService = _aureliaPersistence.EntityService;
            FilterObserver = _aureliaPersistence.FilterObserver;
            FilterQuery = _aureliaPersistence.FilterQuery;
            SearchQuery = _aureliaPersistence.SearchQuery;
            SearchBooleanContext = _aureliaPersistence.SearchBooleanContext;
            Sorting = _aureliaPersistence.Sorting;
            UserFilter = _aureliaPersistence.UserFilter;
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

            _export("TableViewModel", TableViewModel = function () {
                function TableViewModel(newable) {
                    var relation = arguments.length <= 1 || arguments[1] === undefined ? "list" : arguments[1];

                    _classCallCheck(this, TableViewModel);

                    this.eventAggregator = new EventAggregator();
                    this.filters = [];
                    this.newFilter = new UserFilter();
                    this.limit = TableViewModel.DEFAULT_LIMIT;
                    this.skip = 0;
                    this.disposables = [];
                    this.newable = newable;
                    this.relation = relation;
                    this.filter = new FilterQuery();
                    this.search = new SearchBooleanContext();
                    this.filterBindings = {};
                    this.sort = new Sorting();
                    this.scrollLoading = false;
                }

                TableViewModel.prototype.afterConstructor = function afterConstructor() {
                    this.entityService = this.entityManager.getService(this.newable);
                };

                TableViewModel.prototype.activate = function activate(params) {
                    var _this = this;

                    this.params = params;
                    this.disposables.push(this.eventAggregator.subscribe(SearchQuery.SEARCH_EVENT, function (callback) {
                        _this.searchEntities(_this.limit, _this.skip).then(_this.replaceEntities.bind(_this)).then(function (entities) {
                            if (callback && callback.call) {
                                callback.call(_this, entities);
                            }
                        });
                    }));
                    this.disposables.push(this.eventAggregator.subscribe(FilterQuery.FILTERING_EVENT, function (callback) {
                        _this.filterEntities(_this.limit, _this.skip).then(_this.replaceEntities.bind(_this)).then(function (entities) {
                            if (callback && callback.call) {
                                callback.call(_this, entities);
                            }
                        });
                    }));
                    this.disposables.push(this.eventAggregator.subscribe(Sorting.SORTING_EVENT, function (callback) {
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
                    this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
                };

                TableViewModel.prototype.filterCollection = function filterCollection(collection, property) {
                    if (this.filterBindings[property]) {
                        this.filter.elemMatch(collection, new FilterQuery().regex(property, this.filterBindings[property]));
                    } else {
                        this.filter.unset(collection);
                    }
                    this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
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
                        _this2.countTotal = +success.headers.get(EntityService.COUNT_TOTAL_HEADER);
                        _this2.countFilter = +success.headers.get(EntityService.COUNT_FILTER_HEADER);
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
            }());

            _export("TableViewModel", TableViewModel);

            TableViewModel.DEFAULT_LIMIT = 25;
            TableViewModel.INFINITE_SCROLL_INCREMENT = 25;
            __decorate([autoinject, __metadata('design:type', typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a || Object)], TableViewModel.prototype, "bindingEngine", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_b = typeof TaskQueue !== 'undefined' && TaskQueue) === 'function' && _b || Object)], TableViewModel.prototype, "taskQueue", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_c = typeof Router !== 'undefined' && Router) === 'function' && _c || Object)], TableViewModel.prototype, "router", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_d = typeof I18N !== 'undefined' && I18N) === 'function' && _d || Object)], TableViewModel.prototype, "i18n", void 0);
            __decorate([autoinject, __metadata('design:type', typeof (_e = typeof DialogService !== 'undefined' && DialogService) === 'function' && _e || Object)], TableViewModel.prototype, "dialogService", void 0);
            __decorate([autoinject, __metadata('design:type', LocalStorage)], TableViewModel.prototype, "localStorage", void 0);
            __decorate([autoinject, __metadata('design:type', NotificationManager)], TableViewModel.prototype, "notificationManager", void 0);
            __decorate([autoinject, __metadata('design:type', ProgressIndicator)], TableViewModel.prototype, "progressIndicator", void 0);
            __decorate([autoinject, __metadata('design:type', FilterObserver)], TableViewModel.prototype, "filterObserver", void 0);
            __decorate([autoinject, __metadata('design:type', SecurityContext)], TableViewModel.prototype, "securityContext", void 0);
            __decorate([autoinject, __metadata('design:type', EntityManager)], TableViewModel.prototype, "entityManager", void 0);
        }
    };
});