import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { ViewPort } from "./view-port";
import { AbstractComponent } from "./abstract-component";
export declare abstract class AbstractViewPort extends AbstractComponent implements ViewPort {
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any>;
    canDeactivate(): Promise<boolean>;
    deactivate(): Promise<any>;
}
