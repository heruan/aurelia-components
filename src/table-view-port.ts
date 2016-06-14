import {RouteConfig, NavigationInstruction} from "aurelia-router";
import {View} from "aurelia-templating";
import {ViewPort} from "./view-port";
import {TableViewModel} from "./table-view-model";

export abstract class TableViewPort<E> extends TableViewModel<E> implements ViewPort {

    protected boundScrollListener: EventListener;

    public constructor(newable: any, relation: string = "list") {
        super(newable, relation);
        this.boundScrollListener = this.scrollListener.bind(this);
    }

    public canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean> {
        return Promise.resolve(true);
    }

    public activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<E[]> {
        return super.activate(navigationInstruction.params);
    }

    public canDeactivate(): Promise<boolean> {
        return Promise.resolve(true);
    }

    public deactivate(): Promise<any> {
        return super.deactivate();
    }

    public created(owningView: View, myView: View): void {

    }

    public bind(bindingContext: Object, overrideContext?: Object): void {
        super.retrieveAndReplaceEntities();
    }

    public attached(): void {
        window.addEventListener("scroll", this.boundScrollListener);
    }

    public detached(): void {
        window.removeEventListener("scroll", this.boundScrollListener);
    }

    public unbind(): void {

    }

    get hash(): string {
        return window.location.hash;
    }

}
