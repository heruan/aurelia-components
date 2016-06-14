import {RouteConfig, NavigationInstruction} from "aurelia-router";
import {View} from "aurelia-templating";
import {ViewPort} from "./view-port";
import {CardViewModel} from "./card-view-model";

export abstract class CardViewPort<E> extends CardViewModel<E> implements ViewPort {

    protected params: Object;

    public constructor(newable: any, relation: string = "self") {
        super(newable, relation);
    }

    public canActivate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<boolean> {
        return Promise.resolve(true);
    }

    public activate(params: Object, routeConfig?: RouteConfig, navigationInstruction?: NavigationInstruction): Promise<E> {
        this.params = navigationInstruction.params;
        return this.entityService.retrieve(this.entity, this.relation, navigationInstruction.params).then(entity => {
            this.bindRouteTitle(routeConfig, entity);
            return super.activate(entity);
        });
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

    }

    public attached(): void {

    }

    public detached(): void {

    }

    public unbind(): void {

    }

    get hash(): string {
        return window.location.hash;
    }

    protected bindRouteTitle(routeConfig: RouteConfig, entity: Object): void {
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, (match, path: string) => {
                let steps = path.split(".");
                let field = steps.pop();
                for (let step of steps) {
                    entity = entity[step];
                }
                this.bindingEngine.propertyObserver(entity, field).subscribe(value => {
                    this.title = routeConfig.title.replace(`{${path}}`, value);
                    routeConfig.navModel.setTitle(this.title);
                });
                return entity[field];
            });
            routeConfig.navModel.setTitle(this.title);
        }
    }

}
