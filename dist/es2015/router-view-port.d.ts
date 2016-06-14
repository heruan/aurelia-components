import { RouterConfiguration, Router } from "aurelia-router";
import { ViewPort } from "./view-port";
export interface RouterViewPort extends ViewPort {
    configureRouter(routerConfiguration: RouterConfiguration, router: Router): void;
}
