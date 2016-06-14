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
import { TaskQueue } from "aurelia-task-queue";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from "aurelia-router";
import { I18N } from "aurelia-i18n";
import { DialogService } from "aurelia-dialog";
import { ProgressIndicator } from "aurelia-progress";
import { NotificationManager } from "aurelia-notification";
import { Validation } from "aurelia-validation";
import { EntityManager, FilterObserver } from "aurelia-persistence";
import { SecurityContext } from "aurelia-security";
export class CardViewModel {
    constructor(newable, relation = "self") {
        this.disposables = [];
        this.newable = newable;
        this.relation = relation;
    }
    afterConstructor() {
        this.entityService = this.entityManager.getService(this.newable);
    }
    activate(entity) {
        this.entity = entity;
        this.entityValidation = this.setEntityValidationConstraints();
        return Promise.resolve(this.entity);
    }
    canDeactivate() {
        return this.deactivate() || Promise.resolve(true);
    }
    deactivate() {
        this.disposables.forEach(disposable => disposable.dispose());
        return Promise.resolve(true);
    }
    setEntityValidationConstraints() {
        return this.validation.on(this.entity);
    }
    updateEntity(entity) {
        return this.entityService.patch(entity);
    }
}
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_a = typeof BindingEngine !== 'undefined' && BindingEngine) === 'function' && _a) || Object)
], CardViewModel.prototype, "bindingEngine", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_b = typeof EventAggregator !== 'undefined' && EventAggregator) === 'function' && _b) || Object)
], CardViewModel.prototype, "eventAggregator", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_c = typeof TaskQueue !== 'undefined' && TaskQueue) === 'function' && _c) || Object)
], CardViewModel.prototype, "taskQueue", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_d = typeof Router !== 'undefined' && Router) === 'function' && _d) || Object)
], CardViewModel.prototype, "router", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_e = typeof I18N !== 'undefined' && I18N) === 'function' && _e) || Object)
], CardViewModel.prototype, "i18n", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_f = typeof DialogService !== 'undefined' && DialogService) === 'function' && _f) || Object)
], CardViewModel.prototype, "dialogService", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', NotificationManager)
], CardViewModel.prototype, "notificationManager", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', ProgressIndicator)
], CardViewModel.prototype, "progressIndicator", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', FilterObserver)
], CardViewModel.prototype, "filterObserver", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', EntityManager)
], CardViewModel.prototype, "entityManager", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', SecurityContext)
], CardViewModel.prototype, "securityContext", void 0);
__decorate([
    autoinject, 
    __metadata('design:type', (typeof (_g = typeof Validation !== 'undefined' && Validation) === 'function' && _g) || Object)
], CardViewModel.prototype, "validation", void 0);
var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=card-view-model.js.map