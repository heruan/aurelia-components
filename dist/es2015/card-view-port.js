import { CardViewModel } from "./card-view-model";
export class CardViewPort extends CardViewModel {
    constructor(newable, relation = "self") {
        super(newable, relation);
    }
    canActivate(params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    }
    activate(params, routeConfig, navigationInstruction) {
        this.params = navigationInstruction.params;
        return this.entityService.retrieve(this.entity, this.relation, navigationInstruction.params).then(entity => {
            this.bindRouteTitle(routeConfig, entity);
            return super.activate(entity);
        });
    }
    canDeactivate() {
        return Promise.resolve(true);
    }
    deactivate() {
        return super.deactivate();
    }
    created(owningView, myView) {
    }
    bind(bindingContext, overrideContext) {
    }
    attached() {
    }
    detached() {
    }
    unbind() {
    }
    get hash() {
        return window.location.hash;
    }
    bindRouteTitle(routeConfig, entity) {
        if (routeConfig.title) {
            this.title = routeConfig.title.replace(/\{([^\}]+)\}/g, (match, path) => {
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
//# sourceMappingURL=card-view-port.js.map