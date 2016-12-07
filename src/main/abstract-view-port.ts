import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { ViewPort } from "./view-port";
import { AbstractComponent } from "./abstract-component";

export abstract class AbstractViewPort extends AbstractComponent implements ViewPort {

    public canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean> {
        return Promise.resolve(true);
    }

    public activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any> {
        return Promise.resolve();
    }

    public canDeactivate(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public deactivate(): Promise<any> {
        return Promise.resolve();
    }

}
