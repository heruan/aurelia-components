import {autoinject} from "aurelia-property-injection";
import {BindingEngine, Disposable} from "aurelia-binding";
import {TaskQueue} from "aurelia-task-queue";
import {EventAggregator} from "aurelia-event-aggregator";
import {Router, RouteConfig} from "aurelia-router";
import {I18N} from "aurelia-i18n";
import {DialogService} from "aurelia-dialog";
import {ProgressIndicator} from "aurelia-progress";
import {NotificationManager} from "aurelia-notification";
import {Validation, ValidationGroup} from "aurelia-validation";
import {EntityManager, EntityService, FilterObserver} from "aurelia-persistence";
import {SecurityContext} from "aurelia-security";

export abstract class CardViewModel<E> {

    @autoinject
    protected bindingEngine: BindingEngine;

    @autoinject
    protected eventAggregator: EventAggregator;

    @autoinject
    protected taskQueue: TaskQueue;

    @autoinject
    protected router: Router;

    @autoinject
    protected i18n: I18N;

    @autoinject
    protected dialogService: DialogService;

    @autoinject
    protected notificationManager: NotificationManager;

    @autoinject
    protected progressIndicator: ProgressIndicator;

    @autoinject
    protected filterObserver: FilterObserver;

    @autoinject
    protected entityManager: EntityManager;

    @autoinject
    protected securityContext: SecurityContext;

    protected entityService: EntityService;

    protected title: string;

    protected newable: any;

    protected relation: string;

    protected properties: string[];

    protected entity: E;

    @autoinject
    protected validation: Validation;

    protected entityValidation: ValidationGroup;

    protected disposables: Disposable[] = [];

    public constructor(newable: any, relation: string = "self") {
        this.newable = newable;
        this.relation = relation;
    }

    protected afterConstructor() {
        this.entityService = this.entityManager.getService(this.newable);
    }

    public activate(entity: E): Promise<E> {
        this.entity = entity;
        this.entityValidation = this.setEntityValidationConstraints();
        return Promise.resolve(this.entity);
    }

    public canDeactivate(): Promise<boolean> {
        return this.deactivate() || Promise.resolve(true);
    }

    public deactivate(): Promise<any> {
        this.disposables.forEach(disposable => disposable.dispose());
        return Promise.resolve(true);
    }

    protected setEntityValidationConstraints(): ValidationGroup {
        return this.validation.on(this.entity);
    }

    protected updateEntity(entity: E): Promise<E> {
        return this.entityService.patch(entity);
    }

}
