import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { View } from "aurelia-templating";
import { ViewPort } from "./view-port";
import { TableViewModel } from "./table-view-model";
export declare abstract class TableViewPort<E> extends TableViewModel<E> implements ViewPort {
    protected boundScrollListener: EventListener;
    constructor(newable: any, relation?: string);
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<E[]>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    readonly hash: string;
}
