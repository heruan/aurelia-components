import { TableViewModel } from "./table-view-model";
export class TableViewPort extends TableViewModel {
    constructor(newable, relation = "list") {
        super(newable, relation);
        this.boundScrollListener = this.scrollListener.bind(this);
    }
    canActivate(params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    }
    activate(params, routeConfig, navigationInstruction) {
        return super.activate(navigationInstruction.params);
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
        super.retrieveAndReplaceEntities();
    }
    attached() {
        window.addEventListener("scroll", this.boundScrollListener);
    }
    detached() {
        window.removeEventListener("scroll", this.boundScrollListener);
    }
    unbind() {
    }
    get hash() {
        return window.location.hash;
    }
}
//# sourceMappingURL=table-view-port.js.map