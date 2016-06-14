import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { View } from "aurelia-templating";
import { ViewPort } from "./view-port";
import { CardViewModel } from "./card-view-model";
export declare abstract class CardViewPort<E> extends CardViewModel<E> implements ViewPort {
    protected params: Object;
    constructor(newable: any, relation?: string);
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<E>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    readonly hash: string;
    protected bindRouteTitle(routeConfig: RouteConfig, entity: Object): void;
}
