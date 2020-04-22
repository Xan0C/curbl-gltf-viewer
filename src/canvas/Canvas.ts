import { WebGLUtil } from '@curbl/gl-util';

export class Canvas {
    private readonly _defaultWidth: number;
    private readonly _defaultHeight: number;
    private _element: HTMLCanvasElement;
    private _context: WebGL2RenderingContext | WebGL2RenderingContext;

    constructor(config: { width: number; height: number }) {
        this._defaultWidth = config.width;
        this._defaultHeight = config.height;
        this._element = document.createElement('canvas');
        this._element.id = 'viewer_canvas';
        this._element.width = this._defaultWidth;
        this._element.height = this._defaultHeight;
    }

    public appendCanvas(parent?: string): void {
        if (!this._element) {
            throw 'canvas failed to initialize';
        }
        if (parent) {
            document.getElementById(parent).appendChild(this._element);
        } else {
            document.body.appendChild(this._element);
        }
    }

    public get context(): WebGL2RenderingContext {
        if (!this._context) {
            this._context = WebGLUtil.setupWebGL(this._element, { antialias: true, stencil: true, alpha: false }) as WebGL2RenderingContext;
        }
        return this._context;
    }

    public get element(): HTMLCanvasElement {
        return this._element;
    }

    public set element(value: HTMLCanvasElement) {
        this._element = value;
    }

    get width(): number {
        return this._element.width;
    }

    get height(): number {
        return this._element.height;
    }
}
