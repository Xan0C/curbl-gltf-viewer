import {ResourceLoader} from "curbl-loader";

export abstract class ViewerScene {

    protected loader: ResourceLoader;

    constructor(loader: ResourceLoader) {
        this.loader = loader;
    }

    abstract preload():void;
    abstract create():void;
}