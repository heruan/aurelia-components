import { View} from "aurelia-templating";

export interface Component {

    created(owningView: View, myView: View): void;

    bind(bindingContext: Object, overrideContext?: Object): void;

    attached(): void;

    detached(): void;

    unbind(): void;

}
