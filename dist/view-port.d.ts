import { RouteConfig, NavigationInstruction } from "aurelia-router";
import { Component } from "./component";
export interface ViewPort extends Component {
    /**
    * Implement this hook if you want to control whether or not your view-model can be navigated to.
    * Return a boolean value, a promise for a boolean value, or a navigation command.
    */
    canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean>;
    /**
    * Implement this hook if you want to perform custom logic just before your view-model is displayed.
    * You can optionally return a promise to tell the router to wait to bind and attach the view until after you finish your work.
    */
    activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<any>;
    /**
    * Implement this hook if you want to control whether or not the router can navigate away from your view-model when moving to a new route.
    * Return a boolean value, a promise for a boolean value, or a navigation command.
    */
    canDeactivate(): Promise<boolean>;
    /**
    * Implement this hook if you want to perform custom logic when your view-model is being navigated away from.
    * You can optionally return a promise to tell the router to wait until after you finish your work.
    */
    deactivate(): Promise<any>;
}
