import * as EventEmitter from "eventemitter3";
import {EmitSignal} from "./EmitSignal";

enum DOM_EVENTS {
    KEYDOWN = "KEY_DOWN",
    KEYPRESS = "KEY_PRESS",
    KEYUP = "KEY_UP",
    MOUSECLICK = "MOUSE_CLICK",
    CONTEXTMENU = "CONTEXT_MENU",
    DOUBLECLICK = "DOUBLE_CLICK",
    MOUSEDOWN = "MOUSE_DOWN",
    MOUSEOUT = "MOUSE_OUT",
    MOUSEOVER = "MOUSE_OVER",
    MOUSEUP = "MOUSE_UP",
    MOUSEMOVE = "MOUSE_MOVE",
    WHEEL = "WHEEL"
}

const emitter = new EventEmitter();

export const DomEvents = {
    onKeyDown: new EmitSignal(emitter,DOM_EVENTS.KEYDOWN),
    onKeyPress: new EmitSignal(emitter,DOM_EVENTS.KEYPRESS),
    onKeyUp: new EmitSignal(emitter,DOM_EVENTS.KEYUP),
    onClick: new EmitSignal(emitter,DOM_EVENTS.MOUSECLICK),
    onContextMenu: new EmitSignal(emitter,DOM_EVENTS.CONTEXTMENU),
    onDoubleClick: new EmitSignal(emitter,DOM_EVENTS.DOUBLECLICK),
    onMouseDown: new EmitSignal(emitter,DOM_EVENTS.MOUSEDOWN),
    onMouseOut: new EmitSignal(emitter,DOM_EVENTS.MOUSEOUT),
    onMouseOver: new EmitSignal(emitter,DOM_EVENTS.MOUSEOVER),
    onMouseUp: new EmitSignal(emitter,DOM_EVENTS.MOUSEUP),
    onMouseMove: new EmitSignal(emitter,DOM_EVENTS.MOUSEMOVE),
    onWheel: new EmitSignal(emitter, DOM_EVENTS.WHEEL)
};

(function()  {
    document.onkeydown = (ev: KeyboardEvent) => {
        DomEvents.onKeyDown.dispatch(ev);
    };
    document.onkeypress = (ev: KeyboardEvent) => {
        DomEvents.onKeyPress.dispatch(ev)
    };
    document.onkeyup = (ev: KeyboardEvent) => {
        DomEvents.onKeyUp.dispatch(ev)
    };
    document.onclick = (ev: MouseEvent) => {
        DomEvents.onClick.dispatch(ev)
    };
    document.oncontextmenu = (ev: PointerEvent) => {
        DomEvents.onContextMenu.dispatch(ev)
    };
    document.ondblclick = (ev: MouseEvent) => {
        DomEvents.onDoubleClick.dispatch(ev)
    };
    document.onmousedown = (ev: MouseEvent) => {
        DomEvents.onMouseDown.dispatch(ev)
    };
    document.onmouseout = (ev: MouseEvent) => {
        DomEvents.onMouseOut.dispatch(ev)
    };
    document.onmouseover = (ev: MouseEvent) => {
        DomEvents.onMouseOver.dispatch(ev)
    };
    document.onmouseup = (ev: MouseEvent) => {
        DomEvents.onMouseUp.dispatch(ev)
    };
    document.onmousemove = (ev: MouseEvent) => {
        DomEvents.onMouseMove.dispatch(ev)
    };
    document.onwheel = (ev: WheelEvent) => {
        DomEvents.onWheel.dispatch(ev);
    }
})();
