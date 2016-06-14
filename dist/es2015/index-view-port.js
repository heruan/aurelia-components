var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from "aurelia-property-injection";
import { BindingEngine } from "aurelia-binding";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { SecurityContext } from "aurelia-security";
export class IndexViewPort {
    configureRouter(routerConfiguration, router) {
        routerConfiguration.map([{
                name: "table",
                route: "/",
                moduleId: "./table"
            }, {
                name: "card",
                route: "/:id",
                moduleId: "./card"
            }]);
        this.router = router;
    }
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
    created(owningView, myView) {
    }
    bind(bindingContext, overrideContext) {
        this.securityContext.refreshRouteVisibility(this.router);
    }
    attached() {
    }
    detached() {
    }
    unbind() {
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
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a) || Object)
], IndexViewPort.prototype, "bindingEngine", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', SecurityContext)
], IndexViewPort.prototype, "securityContext", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_b = typeof Router !== 'undefined' && Router) === 'function' && _b) || Object)
], IndexViewPort.prototype, "router", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_c = typeof I18N !== 'undefined' && I18N) === 'function' && _c) || Object)
], IndexViewPort.prototype, "i18n", void 0);
var _a, _b, _c;
//# sourceMappingURL=index-view-port.js.map