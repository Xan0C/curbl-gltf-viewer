import {ECS, IEntity, System} from "curbl-ecs";
import * as dat from "dat.gui";
import {SYSTEM_EVENTS} from "curbl-ecs/lib/Events";
import {GUIComponent} from "../components/gui/GUIComponent";
import {GUIController} from "dat.gui";

@ECS.System(GUIComponent)
export class GUISystem extends System {

    private gui:dat.GUI;

    constructor() {
        super();
        this.gui = new dat.GUI()
    }

    setUp() {
        this.events.on(SYSTEM_EVENTS.ENTITY_ADDED, this.onEntityAdded, this);
    }

    onEntityAdded(entity:IEntity) {
        const config = entity.get(GUIComponent).config;
        let folder = this.gui;
        let controller: GUIController;

        if(config.folder) {
            folder = this.gui.addFolder(config.folder);
        }

        for(let property of config.properties) {
            if (property.isColor) {
                controller = folder.addColor(property.prop, property.propName);
            } else {
                controller = folder.add(property.prop, property.propName, property.min, property.max);
            }

            controller.onChange(property.onChange).onFinishChange(property.onFinishChange);
        }
    }
}