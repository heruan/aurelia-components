var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-property-injection";
import { BindingEngine } from "aurelia-binding";
import { TaskQueue } from "aurelia-task-queue";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { DialogService } from "aurelia-dialog";
import { ProgressIndicator } from "aurelia-progress";
import { NotificationManager } from "aurelia-notification";
import { SecurityContext } from "aurelia-security";
import { LocalStorage } from "aurelia-storage";
import { EntityManager, EntityService, FilterObserver, FilterQuery, SearchQuery, SearchBooleanContext, Sorting, UserFilter } from "aurelia-persistence";
export class TableViewModel {
    constructor(newable, relation = "list") {
        // @autoinject
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
    afterConstructor() {
        this.entityService = this.entityManager.getService(this.newable);
    }
    activate(params) {
        this.params = params;
        this.disposables.push(this.eventAggregator.subscribe(SearchQuery.SEARCH_EVENT, (callback) => {
            this.searchEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        this.disposables.push(this.eventAggregator.subscribe(FilterQuery.FILTERING_EVENT, (callback) => {
            this.filterEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        this.disposables.push(this.eventAggregator.subscribe(Sorting.SORTING_EVENT, (callback) => {
            this.retrieveEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        return Promise.resolve([]); //this.retrieveAndReplaceEntities(this.limit, this.skip);
    }
    canDeactivate() {
        return this.deactivate().then(deactivation => true);
    }
    deactivate() {
        if (this.retrieveEntitiesPromise) {
            this.retrieveEntitiesPromise.cancel();
        }
        this.disposables.forEach(disposable => disposable.dispose());
        return Promise.resolve();
    }
    scrollListener(event) {
        let element = event.target;
        if (!this.scrollLoading && element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
            this.infiniteScroll();
        }
    }
    filterField(property) {
        if (this.filterBindings[property]) {
            this.filter.regex(property, this.filterBindings[property]);
        }
        else {
            this.filter.unset(property);
        }
        this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
    }
    filterCollection(collection, property) {
        if (this.filterBindings[property]) {
            this.filter.elemMatch(collection, new FilterQuery().regex(property, this.filterBindings[property]));
        }
        else {
            this.filter.unset(collection);
        }
        this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
    }
    searchEntities(limit = this.limit, skip = this.skip) {
        return this.retrieveEntities(limit, skip, this.search);
    }
    filterEntities(limit = this.limit, skip = this.skip) {
        return this.retrieveEntities(limit, skip, this.filter);
    }
    retrieveEntities(limit = this.limit, skip = this.skip, query = this.filter) {
        this.progressIndicator.start();
        let path = this.entityService.link(this.relation, this.params);
        this.retrieveEntitiesPromise = this.entityService.searchMessage("table-view-model", path, query, limit, skip, this.sort, this.properties);
        return this.retrieveEntitiesPromise.then(success => {
            this.progressIndicator.done();
            this.countTotal = +success.headers.get(EntityService.COUNT_TOTAL_HEADER);
            this.countFilter = +success.headers.get(EntityService.COUNT_FILTER_HEADER);
            return success.content;
        }, failure => {
            this.progressIndicator.done();
        });
    }
    replaceEntities(entities) {
        return this.entities = entities;
    }
    retrieveAndReplaceEntities(limit = this.limit, skip = this.skip) {
        return this.retrieveEntities(limit, skip).then(this.replaceEntities.bind(this));
    }
    concatenateEntities(entities) {
        entities.forEach(entity => {
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        });
        return this.entities;
    }
    infiniteScroll() {
        let limit = TableViewModel.INFINITE_SCROLL_INCREMENT;
        let skip = this.limit;
        this.scrollLoading = true;
        return this.retrieveEntities(limit, skip).then(this.concatenateEntities.bind(this)).then(entities => {
            this.scrollLoading = false;
            return this.limit += limit;
        });
    }
}
TableViewModel.DEFAULT_LIMIT = 25;
TableViewModel.INFINITE_SCROLL_INCREMENT = 25;
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a) || Object)
], TableViewModel.prototype, "bindingEngine", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_b = typeof TaskQueue !== 'undefined' && TaskQueue) === 'function' && _b) || Object)
], TableViewModel.prototype, "taskQueue", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_c = typeof Router !== 'undefined' && Router) === 'function' && _c) || Object)
], TableViewModel.prototype, "router", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_d = typeof I18N !== 'undefined' && I18N) === 'function' && _d) || Object)
], TableViewModel.prototype, "i18n", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_e = typeof DialogService !== 'undefined' && DialogService) === 'function' && _e) || Object)
], TableViewModel.prototype, "dialogService", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', LocalStorage)
], TableViewModel.prototype, "localStorage", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', NotificationManager)
], TableViewModel.prototype, "notificationManager", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', ProgressIndicator)
], TableViewModel.prototype, "progressIndicator", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', FilterObserver)
], TableViewModel.prototype, "filterObserver", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', SecurityContext)
], TableViewModel.prototype, "securityContext", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', EntityManager)
], TableViewModel.prototype, "entityManager", void 0);
var _a, _b, _c, _d, _e;
//# sourceMappingURL=table-view-model.js.map