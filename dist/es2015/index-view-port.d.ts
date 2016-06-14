import { BindingEngine } from "aurelia-binding";
import { View } from "aurelia-templating";
import { Router, RouterConfiguration, RouteConfig, NavigationInstruction } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { SecurityContext } from "aurelia-security";
import { RouterViewPort } from "./router-view-port";
export declare abstract class IndexViewPort implements RouterViewPort {
    protected bindingEngine: BindingEngine;
    protected securityContext: SecurityContext;
    protected router: Router;
    protected i18n: I18N;
    protected title: string;
    configureRouter(routerConfiguration: RouterConfiguration, router: Router): void;
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    protected bindRouteTitle(routeConfig: RouteConfig, entity: Object): void;
}
