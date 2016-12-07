import { View } from "aurelia-templating";
import { Component } from "./component";

export abstract class AbstractComponent implements Component {

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

}
