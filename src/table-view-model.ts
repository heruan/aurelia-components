import {autoinject} from "aurelia-property-injection";
import {HttpResponseMessage} from "aurelia-http-client";
import {BindingEngine, Disposable} from "aurelia-binding";
import {TaskQueue} from "aurelia-task-queue";
import {EventAggregator, Subscription} from "aurelia-event-aggregator";
import {Router, RouteConfig} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {DialogService} from "aurelia-dialog";
import {ProgressIndicator} from "aurelia-progress";
import {NotificationManager} from "aurelia-notification";
import {CancelablePromise} from "aurelia-utils";
import {SecurityContext} from "aurelia-security";
import {LocalStorage} from "aurelia-storage";
import {EntityManager, EntityService, EntityCollector, FilterObserver, FilterQuery, SearchQuery, SearchBooleanContext, Sorting, UserFilter} from "aurelia-persistence";

export abstract class TableViewModel<E> {

    public static DEFAULT_LIMIT: number = 25;

    public static INFINITE_SCROLL_INCREMENT: number = 25;

    @autoinject
    protected bindingEngine: BindingEngine;

    // @autoinject
    protected eventAggregator: EventAggregator = new EventAggregator();

    @autoinject
    protected taskQueue: TaskQueue;

    @autoinject
    protected router: Router;

    @autoinject
    protected i18n: I18N;

    @autoinject
    protected dialogService: DialogService;

    @autoinject
    protected localStorage: LocalStorage;

    @autoinject
    protected notificationManager: NotificationManager;

    @autoinject
    protected progressIndicator: ProgressIndicator;

    @autoinject
    protected filterObserver: FilterObserver;

    @autoinject
    protected securityContext: SecurityContext;

    @autoinject
    protected entityManager: EntityManager;

    protected entityService: EntityService;

    protected title: string;

    protected newable: any;

    protected relation: string;

    protected properties: string[];

    protected params: Object;

    protected entities: E[];

    protected selected: E[];

    protected countTotal: number;

    protected countFilter: number;

    protected filters: UserFilter[] = [];

    protected newFilter: UserFilter = new UserFilter();

    protected filter: FilterQuery;

    protected search: SearchBooleanContext;

    protected sort: Sorting;

    protected limit: number = TableViewModel.DEFAULT_LIMIT;

    protected skip: number = 0;

    protected filterBindings: Object;

    protected retrieveEntitiesPromise: CancelablePromise<HttpResponseMessage>;

    protected scrollLoading: boolean;

    protected disposables: Disposable[] = [];

    public constructor(newable: any, relation: string = "list") {
        this.newable = newable;
        this.relation = relation;
        this.filter = new FilterQuery();
        this.search = new SearchBooleanContext();
        this.filterBindings = {};
        this.sort = new Sorting();
        this.scrollLoading = false;
    }

    protected afterConstructor() {
        this.entityService = this.entityManager.getService(this.newable);
    }

    public activate(params?: Object): Promise<E[]> {
        this.params = params;
        this.disposables.push(this.eventAggregator.subscribe(SearchQuery.SEARCH_EVENT, (callback: Function) => {
            this.searchEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        this.disposables.push(this.eventAggregator.subscribe(FilterQuery.FILTERING_EVENT, (callback: Function) => {
            this.filterEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        this.disposables.push(this.eventAggregator.subscribe(Sorting.SORTING_EVENT, (callback: Function) => {
            this.retrieveEntities(this.limit, this.skip).then(this.replaceEntities.bind(this)).then(entities => {
                if (callback && callback.call) {
                    callback.call(this, entities);
                }
            });
        }));
        return Promise.resolve([]);//this.retrieveAndReplaceEntities(this.limit, this.skip);
    }

    public canDeactivate(): Promise<boolean> {
        return this.deactivate().then(deactivation => true);
    }

    public deactivate(): Promise<any> {
        if (this.retrieveEntitiesPromise) {
            this.retrieveEntitiesPromise.cancel();
        }
        this.disposables.forEach(disposable => disposable.dispose());
        return Promise.resolve();
    }

    public scrollListener(event: MouseEvent): void {
        let element = <HTMLElement> event.target;
        if (!this.scrollLoading && element.scrollTop === (element.scrollHeight - element.offsetHeight)) {
            this.infiniteScroll();
        }
    }

    public filterField(property: string) {
        if (this.filterBindings[property]) {
            this.filter.regex(property, this.filterBindings[property]);
        } else {
            this.filter.unset(property);
        }
        this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
    }

    public filterCollection(collection: string, property: string) {
        if (this.filterBindings[property]) {
            this.filter.elemMatch(collection, new FilterQuery().regex(property, this.filterBindings[property]));
        } else {
            this.filter.unset(collection);
        }
        this.eventAggregator.publish(FilterQuery.FILTERING_EVENT, property);
    }

    protected searchEntities(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.retrieveEntities(limit, skip, this.search);
    }

    protected filterEntities(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.retrieveEntities(limit, skip, this.filter);
    }

    protected retrieveEntities(limit: number = this.limit, skip: number = this.skip, query: SearchQuery = this.filter): Promise<E[]> {
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

    protected replaceEntities(entities: E[]): E[] {
        return this.entities = entities;  
    }

    protected retrieveAndReplaceEntities(limit: number = this.limit, skip: number = this.skip): Promise<E[]> {
        return this.retrieveEntities(limit, skip).then(this.replaceEntities.bind(this));
    }

    protected concatenateEntities(entities: E[]): E[] {
        entities.forEach(entity => {
            if (this.entities.indexOf(entity) < 0) {
                this.entities.push(entity);
            }
        });
        return this.entities;
    }

    protected infiniteScroll(): Promise<number> {
        let limit = TableViewModel.INFINITE_SCROLL_INCREMENT;
        let skip = this.limit;
        this.scrollLoading = true;
        return this.retrieveEntities(limit, skip).then(this.concatenateEntities.bind(this)).then(entities => {
            this.scrollLoading = false;
            return this.limit += limit;
        });
    }

}
