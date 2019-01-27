/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimationFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */
export module WebGLUtils {
    /**
     * Mesasge for getting a webgl browser
     * @type {string}
     */
    var GET_A_WEBGL_BROWSER = '' +
        'This page requires a browser that supports WebGL.<br/>' +
        '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

    /**
     * Mesasge for need better hardware
     * @type {string}
     */
    var OTHER_PROBLEM = '' +
        "It doesn't appear your computer can support WebGL.<br/>" +
        '<a href="http://get.webgl.org">Click here for more information.</a>';

    /**
     * Creates the HTLM for a failure message
     * @param {string} canvasContainerId id of container of th
     *        canvas.
     * @return {string} The html.
     */
    function makeFailHTML(msg: string): string {
        return '' +
            '<div style="margin: auto; width:500px;z-index:10000;margin-top:20em;text-align:center;">' + msg + '</div>';
    }

    /**
     * Creates a webgl context. If creation fails it will
     * change the contents of the container of the <canvas>
     * tag to an error message with the correct links for WebGL.
     * @param {Element} canvas. The canvas element to create a
     *     context from.
     * @param {WebGLContextCreationAttirbutes} opt_attribs Any
     *     creation attributes you want to pass in.
     * @param {function:(msg)} opt_onError An function to call
     *     if there is an error during creation.
     * @return {WebGL2RenderingContext} The created context.
     */
    export function setupWebGL(canvas: Element, opt_attribs?: WebGLContextAttributes, opt_onError?: (msg: string)=>any):WebGL2RenderingContext|CanvasRenderingContext2D {
        function handleCreationError(msg) {
            let container: Element = document.getElementsByTagName("body")[0];
            if (container) {
                let str = window['WebGL2RenderingContext'] ? OTHER_PROBLEM : GET_A_WEBGL_BROWSER;
                if (msg) {
                    str += "<br/><br/>Status: " + msg;
                }
                container.innerHTML = makeFailHTML(str);
            }
        }

        let onError = opt_onError || handleCreationError;
        if (canvas.addEventListener) {
            canvas.addEventListener("webglcontextcreationerr", (event: any) => {
                onError(event.statusMessage);
            }, false);
        }
        let context = create3DContext(<HTMLCanvasElement>canvas, opt_attribs);
        if (!context) {
            if (!window['WebGL2RenderingContext']) {
                onError("");
            } else {
                onError("");
            }
        }
        return context;
    }

    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    export function create3DContext(canvas: HTMLCanvasElement, opt_attribs:WebGLContextAttributes):WebGL2RenderingContext|CanvasRenderingContext2D {
        let names = ["webgl2","webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        for (let name of names) {
            try {
                context = canvas.getContext(name, opt_attribs);
            } catch (e) {
            }
            if (context) {
                break;
            }
        }
        return context;
    }

    /**
     * Provides requestAnimationFrame in a cross browser
     * way.
     */
    if (!window.requestAnimationFrame) {
        window["requestAnimationFrame"] = (function () {
            return window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"] ||
                function (callback: (...args:any[])=>any, element: any) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
    }

    /** * ERRATA: 'cancelRequestAnimationFrame' renamed to 'cancelAnimationFrame' to reflect an update to the W3C Animation-Timing Spec.
     *
     * Cancels an animation frame request.
     * Checks for cross-browser support, falls back to clearTimeout.
     * @param {number}  Animation frame request. */
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = (window["cancelRequestAnimationFrame"] ||
        window["webkitCancelAnimationFrame"] || window["webkitCancelRequestAnimationFrame"] ||
        window["mozCancelAnimationFrame"] || window["mozCancelRequestAnimationFrame"] ||
        window["msCancelAnimationFrame"] || window["msCancelRequestAnimationFrame"] ||
        window["oCancelAnimationFrame"] || window["oCancelRequestAnimationFrame"] ||
        window.clearTimeout);
    }
}