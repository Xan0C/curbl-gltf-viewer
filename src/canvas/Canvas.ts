import {WebGLUtils} from "../gl/gl_util";

export class Canvas {
    private readonly _defaultWidth:number;
    private readonly _defaultHeight:number;
    private _canvas:HTMLCanvasElement;
    private _context:WebGL2RenderingContext|WebGL2RenderingContext;


    constructor(config:{width:number,height:number}){
        this._defaultWidth = config.width;
        this._defaultHeight = config.height;
        this._canvas = document.createElement('canvas');
        this._canvas.id     = "viewer_canvas";
        this._canvas.width  = this._defaultWidth;
        this._canvas.height = this._defaultHeight;
    }

    public appendCanvas(parent?:string):void{
        if(!this._canvas){
            throw "canvas failed to initialize";
        }
        if(parent){
            document.getElementById(parent).appendChild(this._canvas);
        }else{
            document.body.appendChild(this._canvas);
        }
    }

    public get context():WebGL2RenderingContext{
        if(!this._context) {
            this._context = WebGLUtils.setupWebGL(this._canvas,{ antialias: true, stencil: true} ) as WebGL2RenderingContext;
        }
        return this._context;
    }

    public get canvas():HTMLCanvasElement {
        return this._canvas;
    }

    public set canvas(value:HTMLCanvasElement) {
        this._canvas = value;
    }
}