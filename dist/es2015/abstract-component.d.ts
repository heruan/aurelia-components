import { View } from "aurelia-templating";
import { Component } from "./component";
export declare abstract class AbstractComponent implements Component {
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext?: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
}
