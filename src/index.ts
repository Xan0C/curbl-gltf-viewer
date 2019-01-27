import {Viewer} from "./viewer/Viewer";
import {Logger, LogLevel} from "ts-simple-log";

window.onload = () => {
    Logger.getInstance().logLevel = LogLevel.TRACE;
    const viewer = new Viewer();
    viewer.init();
    viewer.loadScene();
};

