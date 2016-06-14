import { AbstractComponent } from "./abstract-component";
export class AbstractViewPort extends AbstractComponent {
    canActivate(params, routeConfig, navigationInstruction) {
        return Promise.resolve(true);
    }
    activate(params, routeConfig, navigationInstruction) {
        return Promise.resolve();
    }
    canDeactivate() {
        return Promise.resolve(true);
    }
    deactivate() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=abstract-view-port.js.map