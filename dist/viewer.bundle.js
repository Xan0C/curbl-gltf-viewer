/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../lib/cache/cache.js":
/*!*****************************!*\
  !*** ../lib/cache/cache.js ***!
  \*****************************/
/*! exports provided: CACHE_TYPE, Cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CACHE_TYPE", function() { return CACHE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return Cache; });
/**
 * With Scene, Node and Mesh cache we can access the Model in different stages
 * e.g. Mesh has no animation or Transform,
 * e.g. Node has Animation, Transform etc. for one Mesh
 * e.g. Scene has all Nodes with all Animations and Transforms
 */
var CACHE_TYPE;
(function (CACHE_TYPE) {
    CACHE_TYPE[CACHE_TYPE["TEXTURE"] = 0] = "TEXTURE";
    CACHE_TYPE[CACHE_TYPE["MESH"] = 1] = "MESH";
    CACHE_TYPE[CACHE_TYPE["SCENE"] = 2] = "SCENE";
    CACHE_TYPE[CACHE_TYPE["ANIMATION"] = 3] = "ANIMATION";
    CACHE_TYPE[CACHE_TYPE["MATERIAL"] = 4] = "MATERIAL";
    CACHE_TYPE[CACHE_TYPE["SHADER"] = 5] = "SHADER";
    CACHE_TYPE[CACHE_TYPE["NOOP"] = 6] = "NOOP";
})(CACHE_TYPE || (CACHE_TYPE = {}));
/**
 * Global Cache
 */
class Cache {
    constructor() {
        this.caches = [];
    }
    /**
     * Add a new sub cache
     * @param {CACHE_TYPE} type
     * @param {IBaseCache<T>} cache
     */
    addCache(type, cache) {
        this.caches[type] = cache;
    }
    /**
     * Remove a sub cache
     * @param {string|number} type
     */
    removeCache(type) {
        this.caches.splice(type, 1);
    }
    /**
     * get sub cache
     * @param {string|number} type
     * @returns {IBaseCache<T>}
     */
    getCache(type) {
        return this.caches[type];
    }
    /**
     * add a value to a cache
     * @param {string|number} type
     * @param {string} key
     * @param data
     */
    add(type, key, data) {
        if (this.caches[type]) {
            this.caches[type].add(key, data);
        }
    }
    /**
     * get value from cache
     * @param {string|number} type
     * @param {string} key
     * @returns {T}
     */
    get(type, key) {
        if (this.caches[type]) {
            return this.caches[type].get(key);
        }
    }
    has(type, key) {
        if (this.caches[type]) {
            return !!this.caches[type].get(key);
        }
        return false;
    }
}
//# sourceMappingURL=cache.js.map

/***/ }),

/***/ "../lib/cache/caches/baseCache.js":
/*!****************************************!*\
  !*** ../lib/cache/caches/baseCache.js ***!
  \****************************************/
/*! exports provided: CACHE_EVENTS, BaseCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CACHE_EVENTS", function() { return CACHE_EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCache", function() { return BaseCache; });
/* harmony import */ var _events_EmitSignal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../events/EmitSignal */ "../lib/events/EmitSignal.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_1__);


var CACHE_EVENTS;
(function (CACHE_EVENTS) {
    CACHE_EVENTS["ADDED"] = "ADDED";
    CACHE_EVENTS["REMOVED"] = "REMOVED";
})(CACHE_EVENTS || (CACHE_EVENTS = {}));
class BaseCache {
    constructor() {
        this.cache = {};
        this.emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_1__();
        this._onAdded = new _events_EmitSignal__WEBPACK_IMPORTED_MODULE_0__["EmitSignal"](this.emitter, CACHE_EVENTS.ADDED);
        this._onRemoved = new _events_EmitSignal__WEBPACK_IMPORTED_MODULE_0__["EmitSignal"](this.emitter, CACHE_EVENTS.REMOVED);
    }
    get onAdded() {
        return this._onAdded;
    }
    get onRemoved() {
        return this._onRemoved;
    }
    add(key, data) {
        this.cache[key] = data;
        this._onAdded.emit(key, data);
    }
    addMultiple(elements, mapFunc) {
        for (let i = 0, element; element = elements[i]; i++) {
            const value = mapFunc(element);
            this.add(value.key, value.data);
        }
    }
    remove(key) {
        const data = this.cache[key];
        delete this.cache[key];
        this._onRemoved.emit(key, data);
    }
    get(key) {
        return this.cache[key];
    }
    getAll() {
        return this.cache;
    }
}
//# sourceMappingURL=baseCache.js.map

/***/ }),

/***/ "../lib/cache/caches/index.js":
/*!************************************!*\
  !*** ../lib/cache/caches/index.js ***!
  \************************************/
/*! exports provided: CACHE_EVENTS, BaseCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _baseCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseCache */ "../lib/cache/caches/baseCache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CACHE_EVENTS", function() { return _baseCache__WEBPACK_IMPORTED_MODULE_0__["CACHE_EVENTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCache", function() { return _baseCache__WEBPACK_IMPORTED_MODULE_0__["BaseCache"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/cache/index.js":
/*!*****************************!*\
  !*** ../lib/cache/index.js ***!
  \*****************************/
/*! exports provided: CACHE_TYPE, Cache, CACHE_EVENTS, BaseCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache */ "../lib/cache/cache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CACHE_TYPE", function() { return _cache__WEBPACK_IMPORTED_MODULE_0__["CACHE_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return _cache__WEBPACK_IMPORTED_MODULE_0__["Cache"]; });

/* harmony import */ var _caches_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./caches/index */ "../lib/cache/caches/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CACHE_EVENTS", function() { return _caches_index__WEBPACK_IMPORTED_MODULE_1__["CACHE_EVENTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCache", function() { return _caches_index__WEBPACK_IMPORTED_MODULE_1__["BaseCache"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/canvas/Canvas.js":
/*!*******************************!*\
  !*** ../lib/canvas/Canvas.js ***!
  \*******************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _gl_gl_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gl/gl_util */ "../lib/gl/gl_util/index.js");

class Canvas {
    constructor(config) {
        this._defaultWidth = config.width;
        this._defaultHeight = config.height;
        this._element = document.createElement('canvas');
        this._element.id = "viewer_canvas";
        this._element.width = this._defaultWidth;
        this._element.height = this._defaultHeight;
    }
    appendCanvas(parent) {
        if (!this._element) {
            throw "canvas failed to initialize";
        }
        if (parent) {
            document.getElementById(parent).appendChild(this._element);
        }
        else {
            document.body.appendChild(this._element);
        }
    }
    get context() {
        if (!this._context) {
            this._context = _gl_gl_util__WEBPACK_IMPORTED_MODULE_0__["WebGLUtils"].setupWebGL(this._element, { antialias: true, stencil: true });
        }
        return this._context;
    }
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
    }
    get width() {
        return this._element.width;
    }
    get height() {
        return this._element.height;
    }
}
//# sourceMappingURL=Canvas.js.map

/***/ }),

/***/ "../lib/canvas/index.js":
/*!******************************!*\
  !*** ../lib/canvas/index.js ***!
  \******************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "../lib/canvas/Canvas.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/camera/cameraComponent.js":
/*!***************************************************!*\
  !*** ../lib/components/camera/cameraComponent.js ***!
  \***************************************************/
/*! exports provided: CameraComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraComponent", function() { return CameraComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let CameraComponent = class CameraComponent {
    constructor(config = {
        fovy: 0.785,
        aspect: 16 / 9,
        near: 0.01,
        far: 100
    }) {
        this.init(config);
    }
    init(config) {
        if (!config.projMatrix) {
            this._viewMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].create();
        }
        else {
            this._viewMatrix = config.viewMatrix;
        }
        if (!config.projMatrix) {
            this._projMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].perspective(this._projMatrix, config.fovy || 0.785, config.aspect || (16 / 9), config.near || 0.01, config.far || 100);
        }
        else {
            this._projMatrix = config.projMatrix;
        }
    }
    remove() {
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].identity(this._viewMatrix);
        gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].identity(this._projMatrix);
    }
    get viewMatrix() {
        return this._viewMatrix;
    }
    set viewMatrix(value) {
        this._viewMatrix = value;
    }
    get projMatrix() {
        return this._projMatrix;
    }
    set projMatrix(value) {
        this._projMatrix = value;
    }
};
CameraComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component('CameraComponent')
], CameraComponent);

//# sourceMappingURL=cameraComponent.js.map

/***/ }),

/***/ "../lib/components/camera/index.js":
/*!*****************************************!*\
  !*** ../lib/components/camera/index.js ***!
  \*****************************************/
/*! exports provided: CameraComponent, LookAtCameraComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cameraComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cameraComponent */ "../lib/components/camera/cameraComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraComponent", function() { return _cameraComponent__WEBPACK_IMPORTED_MODULE_0__["CameraComponent"]; });

/* harmony import */ var _lookAtCameraComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lookAtCameraComponent */ "../lib/components/camera/lookAtCameraComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraComponent", function() { return _lookAtCameraComponent__WEBPACK_IMPORTED_MODULE_1__["LookAtCameraComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/camera/lookAtCameraComponent.js":
/*!*********************************************************!*\
  !*** ../lib/components/camera/lookAtCameraComponent.js ***!
  \*********************************************************/
/*! exports provided: LookAtCameraComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraComponent", function() { return LookAtCameraComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let LookAtCameraComponent = class LookAtCameraComponent {
    constructor(config) {
        this.init(config);
    }
    init(config = {
        target: gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create(),
        up: gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].fromValues(0, 1, 0),
        panning: gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create(),
        zoom: gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create(),
    }) {
        this._target = config.target || gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create();
        this._up = config.up || gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].fromValues(0, 1, 0);
        this._panning = config.panning || gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create();
        this._zooming = config.zoom || gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].create();
        this._zoomPos = 0;
    }
    remove() {
    }
    get target() {
        return this._target;
    }
    set target(value) {
        this._target = value;
    }
    get up() {
        return this._up;
    }
    set up(value) {
        this._up = value;
    }
    get panning() {
        return this._panning;
    }
    set panning(value) {
        this._panning = value;
    }
    get zooming() {
        return this._zooming;
    }
    set zooming(value) {
        this._zooming = value;
    }
    get zoomPos() {
        return this._zoomPos;
    }
    set zoomPos(value) {
        this._zoomPos = value;
    }
};
LookAtCameraComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], LookAtCameraComponent);

//# sourceMappingURL=lookAtCameraComponent.js.map

/***/ }),

/***/ "../lib/components/gui/GUIComponent.js":
/*!*********************************************!*\
  !*** ../lib/components/gui/GUIComponent.js ***!
  \*********************************************/
/*! exports provided: GUIComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUIComponent", function() { return GUIComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let GUIComponent = class GUIComponent {
    constructor(config) {
        this.init(config);
    }
    init(config) {
        this.config = config;
    }
    remove() {
    }
};
GUIComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], GUIComponent);

//# sourceMappingURL=GUIComponent.js.map

/***/ }),

/***/ "../lib/components/gui/index.js":
/*!**************************************!*\
  !*** ../lib/components/gui/index.js ***!
  \**************************************/
/*! exports provided: GUIComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GUIComponent */ "../lib/components/gui/GUIComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUIComponent", function() { return _GUIComponent__WEBPACK_IMPORTED_MODULE_0__["GUIComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/index.js":
/*!**********************************!*\
  !*** ../lib/components/index.js ***!
  \**********************************/
/*! exports provided: CameraComponent, LookAtCameraComponent, GUIComponent, LightComponent, SkyboxComponent, AnimationComponent, SceneComponent, TransformComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _camera_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./camera/index */ "../lib/components/camera/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraComponent", function() { return _camera_index__WEBPACK_IMPORTED_MODULE_0__["CameraComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraComponent", function() { return _camera_index__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]; });

/* harmony import */ var _gui_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gui/index */ "../lib/components/gui/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUIComponent", function() { return _gui_index__WEBPACK_IMPORTED_MODULE_1__["GUIComponent"]; });

/* harmony import */ var _light_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./light/index */ "../lib/components/light/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LightComponent", function() { return _light_index__WEBPACK_IMPORTED_MODULE_2__["LightComponent"]; });

/* harmony import */ var _renderer_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderer/index */ "../lib/components/renderer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxComponent", function() { return _renderer_index__WEBPACK_IMPORTED_MODULE_3__["SkyboxComponent"]; });

/* harmony import */ var _scene_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scene/index */ "../lib/components/scene/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationComponent", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_4__["AnimationComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneComponent", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_4__["SceneComponent"]; });

/* harmony import */ var _transform_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transform/index */ "../lib/components/transform/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformComponent", function() { return _transform_index__WEBPACK_IMPORTED_MODULE_5__["TransformComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/light/index.js":
/*!****************************************!*\
  !*** ../lib/components/light/index.js ***!
  \****************************************/
/*! exports provided: LightComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lightComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lightComponent */ "../lib/components/light/lightComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LightComponent", function() { return _lightComponent__WEBPACK_IMPORTED_MODULE_0__["LightComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/light/lightComponent.js":
/*!*************************************************!*\
  !*** ../lib/components/light/lightComponent.js ***!
  \*************************************************/
/*! exports provided: LightComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LightComponent", function() { return LightComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../math */ "../lib/math/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let LightComponent = class LightComponent {
    constructor(config = {
        lightColor: [255, 255, 255],
        lightScale: 1.0,
        lightRotation: 75,
        lightPitch: 40
    }) {
        this.init(config);
    }
    init(config = {
        lightColor: [255, 255, 255],
        lightScale: 1.0,
        lightRotation: 75,
        lightPitch: 40
    }) {
        this._direction = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].create();
        this._color = new _math__WEBPACK_IMPORTED_MODULE_1__["Color"]();
        this._lightColor = config.lightColor;
        this._lightScale = config.lightScale;
        this._lightRotation = config.lightRotation;
        this._lightPitch = config.lightPitch;
        this.updateLight();
    }
    remove() {
    }
    updateLight() {
        this._color.r = this._lightScale * this._lightColor[0] / 255;
        this._color.g = this._lightScale * this._lightColor[1] / 255;
        this._color.b = this._lightScale * this._lightColor[2] / 255;
        const rot = this._lightRotation * Math.PI / 180;
        const pitch = this._lightPitch * Math.PI / 180;
        gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].set(this._direction, Math.sin(rot) * Math.cos(pitch), Math.sin(pitch), Math.cos(rot) * Math.cos(pitch));
    }
    get lightColor() {
        return this._lightColor;
    }
    set lightColor(value) {
        this._lightColor = value;
    }
    get lightScale() {
        return this._lightScale;
    }
    set lightScale(value) {
        this._lightScale = value;
    }
    get lightRotation() {
        return this._lightRotation;
    }
    set lightRotation(value) {
        this._lightRotation = value;
    }
    get lightPitch() {
        return this._lightPitch;
    }
    set lightPitch(value) {
        this._lightPitch = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = value;
    }
};
LightComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], LightComponent);

//# sourceMappingURL=lightComponent.js.map

/***/ }),

/***/ "../lib/components/renderer/index.js":
/*!*******************************************!*\
  !*** ../lib/components/renderer/index.js ***!
  \*******************************************/
/*! exports provided: SkyboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skyboxComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./skyboxComponent */ "../lib/components/renderer/skyboxComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxComponent", function() { return _skyboxComponent__WEBPACK_IMPORTED_MODULE_0__["SkyboxComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/renderer/skyboxComponent.js":
/*!*****************************************************!*\
  !*** ../lib/components/renderer/skyboxComponent.js ***!
  \*****************************************************/
/*! exports provided: SkyboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkyboxComponent", function() { return SkyboxComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SkyboxComponent = class SkyboxComponent {
    constructor(config = {}) {
        this.init(config);
    }
    init(config = {}) {
        this._texture = config.texture;
    }
    remove() {
        this._texture = undefined;
    }
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
    }
};
SkyboxComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], SkyboxComponent);

//# sourceMappingURL=skyboxComponent.js.map

/***/ }),

/***/ "../lib/components/scene/animationComponent.js":
/*!*****************************************************!*\
  !*** ../lib/components/scene/animationComponent.js ***!
  \*****************************************************/
/*! exports provided: AnimationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationComponent", function() { return AnimationComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let AnimationComponent = class AnimationComponent {
    constructor(config) {
        this.init(config);
    }
    init(config) {
        this._key = config.key;
        this._running = false;
        this._paused = false;
        this._startTime = 0;
        this._pauseStart = 0;
        this._pauseEnd = 0;
        this._autoStart = true;
        this._loop = true;
    }
    remove() {
    }
    start() {
        this._running = true;
        this._startTime = performance.now();
    }
    stop() {
        this._running = false;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    get key() {
        return this._key;
    }
    set key(value) {
        this._key = value;
    }
    get running() {
        return this._running;
    }
    get paused() {
        return this._paused;
    }
    set paused(value) {
        if (this._paused === value) {
            return;
        }
        if (value === true) {
            this._pauseStart = performance.now();
        }
        else {
            this._pauseEnd = performance.now();
        }
        this._paused = value;
    }
    get pauseStart() {
        return this._pauseStart;
    }
    get pauseEnd() {
        return this._pauseEnd;
    }
    get startTime() {
        return this._startTime;
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
    }
    get autoStart() {
        return this._autoStart;
    }
    set autoStart(value) {
        this._autoStart = value;
    }
};
AnimationComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], AnimationComponent);

//# sourceMappingURL=animationComponent.js.map

/***/ }),

/***/ "../lib/components/scene/index.js":
/*!****************************************!*\
  !*** ../lib/components/scene/index.js ***!
  \****************************************/
/*! exports provided: AnimationComponent, SceneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animationComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animationComponent */ "../lib/components/scene/animationComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationComponent", function() { return _animationComponent__WEBPACK_IMPORTED_MODULE_0__["AnimationComponent"]; });

/* harmony import */ var _sceneComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sceneComponent */ "../lib/components/scene/sceneComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneComponent", function() { return _sceneComponent__WEBPACK_IMPORTED_MODULE_1__["SceneComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/scene/sceneComponent.js":
/*!*************************************************!*\
  !*** ../lib/components/scene/sceneComponent.js ***!
  \*************************************************/
/*! exports provided: SceneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneComponent", function() { return SceneComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let SceneComponent = class SceneComponent {
    constructor(config) {
        this._key = config.key;
    }
    init(config) {
        this._key = config.key;
    }
    remove() {
    }
    get key() {
        return this._key;
    }
    set key(value) {
        this._key = value;
    }
};
SceneComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], SceneComponent);

//# sourceMappingURL=sceneComponent.js.map

/***/ }),

/***/ "../lib/components/transform/index.js":
/*!********************************************!*\
  !*** ../lib/components/transform/index.js ***!
  \********************************************/
/*! exports provided: TransformComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transformComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transformComponent */ "../lib/components/transform/transformComponent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformComponent", function() { return _transformComponent__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/components/transform/transformComponent.js":
/*!*********************************************************!*\
  !*** ../lib/components/transform/transformComponent.js ***!
  \*********************************************************/
/*! exports provided: TransformComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformComponent", function() { return TransformComponent; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let TransformComponent = class TransformComponent {
    constructor(config = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 }
    }) {
        this.init(config);
    }
    init(config = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 }
    }) {
        //M=T*R*S
        this._localMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].create();
        if (!config) {
            config = Object.create(null);
        }
        if (!config.position) {
            config.position = { x: 0, y: 0, z: 0 };
        }
        if (!config.rotation) {
            config.rotation = { x: 0, y: 0, z: 0, w: 1 };
        }
        if (!config.scale) {
            config.scale = { x: 1, y: 1, z: 1 };
        }
        this._rotation = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["quat"].fromValues(config.rotation.x, config.rotation.y, config.rotation.z, config.rotation.w);
        this._translation = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].fromValues(config.position.x, config.position.y, config.position.z);
        this._scale = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].fromValues(config.scale.x, config.scale.y, config.scale.z);
        this._children = [];
        this._level = 0;
        this._dirty = true;
        this.apply();
    }
    remove() { }
    addChild(child) {
        if (child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        child._level = this._level + 1;
        this._children.push(child);
    }
    removeChild(child) {
        const index = this._children.indexOf(child);
        if (index > -1) {
            child._level = 0;
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }
    apply() {
        if (this._dirty) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].fromRotationTranslationScale(this._localMatrix, this._rotation, this._translation, this._scale);
            this._dirty = false;
        }
        return this._localMatrix;
    }
    get globalMatrix() {
        if (!this._parent) {
            return this.apply();
        }
        else {
            //TODO: check if this is right or do we need to calculcate the parent globalMatrix?
            return gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].multiply(gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].create(), this._parent.localMatrix, this._localMatrix);
        }
    }
    get modelMatrix() {
        return this.globalMatrix;
    }
    /**
     * Returns the LocalTransformation Matrix
     * @returns {Matrix}
     */
    get localMatrix() {
        return this.apply();
    }
    set localMatrix(value) {
        this._localMatrix = value;
    }
    get translation() {
        this._dirty = true;
        return this._translation;
    }
    set translation(value) {
        this._dirty = true;
        this._translation = value;
    }
    get rotation() {
        this._dirty = true;
        return this._rotation;
    }
    set rotation(value) {
        this._dirty = true;
        this._rotation = value;
    }
    get scale() {
        this._dirty = true;
        return this._scale;
    }
    set scale(value) {
        this._dirty = true;
        this._scale = value;
    }
    get level() {
        return this._level;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
};
TransformComponent = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].Component()
], TransformComponent);

//# sourceMappingURL=transformComponent.js.map

/***/ }),

/***/ "../lib/events/DomEvents.js":
/*!**********************************!*\
  !*** ../lib/events/DomEvents.js ***!
  \**********************************/
/*! exports provided: DomEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomEvents", function() { return DomEvents; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EmitSignal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmitSignal */ "../lib/events/EmitSignal.js");


var DOM_EVENTS;
(function (DOM_EVENTS) {
    DOM_EVENTS["KEYDOWN"] = "KEY_DOWN";
    DOM_EVENTS["KEYPRESS"] = "KEY_PRESS";
    DOM_EVENTS["KEYUP"] = "KEY_UP";
    DOM_EVENTS["MOUSECLICK"] = "MOUSE_CLICK";
    DOM_EVENTS["CONTEXTMENU"] = "CONTEXT_MENU";
    DOM_EVENTS["DOUBLECLICK"] = "DOUBLE_CLICK";
    DOM_EVENTS["MOUSEDOWN"] = "MOUSE_DOWN";
    DOM_EVENTS["MOUSEOUT"] = "MOUSE_OUT";
    DOM_EVENTS["MOUSEOVER"] = "MOUSE_OVER";
    DOM_EVENTS["MOUSEUP"] = "MOUSE_UP";
    DOM_EVENTS["MOUSEMOVE"] = "MOUSE_MOVE";
    DOM_EVENTS["WHEEL"] = "WHEEL";
})(DOM_EVENTS || (DOM_EVENTS = {}));
const emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_0__();
const DomEvents = {
    onKeyDown: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.KEYDOWN),
    onKeyPress: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.KEYPRESS),
    onKeyUp: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.KEYUP),
    onClick: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSECLICK),
    onContextMenu: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.CONTEXTMENU),
    onDoubleClick: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.DOUBLECLICK),
    onMouseDown: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSEDOWN),
    onMouseOut: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSEOUT),
    onMouseOver: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSEOVER),
    onMouseUp: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSEUP),
    onMouseMove: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.MOUSEMOVE),
    onWheel: new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](emitter, DOM_EVENTS.WHEEL)
};
(function () {
    document.onkeydown = (ev) => {
        DomEvents.onKeyDown.dispatch(ev);
    };
    document.onkeypress = (ev) => {
        DomEvents.onKeyPress.dispatch(ev);
    };
    document.onkeyup = (ev) => {
        DomEvents.onKeyUp.dispatch(ev);
    };
    document.onclick = (ev) => {
        DomEvents.onClick.dispatch(ev);
    };
    document.oncontextmenu = (ev) => {
        DomEvents.onContextMenu.dispatch(ev);
    };
    document.ondblclick = (ev) => {
        DomEvents.onDoubleClick.dispatch(ev);
    };
    document.onmousedown = (ev) => {
        DomEvents.onMouseDown.dispatch(ev);
    };
    document.onmouseout = (ev) => {
        DomEvents.onMouseOut.dispatch(ev);
    };
    document.onmouseover = (ev) => {
        DomEvents.onMouseOver.dispatch(ev);
    };
    document.onmouseup = (ev) => {
        DomEvents.onMouseUp.dispatch(ev);
    };
    document.onmousemove = (ev) => {
        DomEvents.onMouseMove.dispatch(ev);
    };
    document.onwheel = (ev) => {
        DomEvents.onWheel.dispatch(ev);
    };
})();
//# sourceMappingURL=DomEvents.js.map

/***/ }),

/***/ "../lib/events/EmitSignal.js":
/*!***********************************!*\
  !*** ../lib/events/EmitSignal.js ***!
  \***********************************/
/*! exports provided: EmitSignal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitSignal", function() { return EmitSignal; });
/**
 * EmitSignal wrapper for a single event of an EventEmitter
 */
class EmitSignal {
    constructor(emitter, type) {
        this._type = type;
        this._emitter = emitter;
    }
    emit(...args) {
        return this._emitter.emit(this._type, ...args);
    }
    /**
     * function alias for emit
     * @param args
     */
    dispatch(...args) {
        return this.emit(...args);
    }
    on(fn, context) {
        this._emitter.on(this._type, fn, context);
        return this;
    }
    /**
     * alias for on
     * @param fn - EventFunction
     * @param context - context to call the function with
     */
    add(fn, context) {
        return this.on(fn, context);
    }
    once(fn, context) {
        this._emitter.once(this._type, fn, context);
        return this;
    }
    /**
     * alias for once
     * @param fn
     * @param context
     */
    addOnce(fn, context) {
        return this.once(fn, context);
    }
    removeAllListeners() {
        this._emitter.removeAllListeners(this._type);
        return this;
    }
    removeListener(fn, context, once) {
        this._emitter.removeListener(this._type, fn, context, once);
        return this;
    }
    get type() {
        return this._type;
    }
    get emitter() {
        return this._emitter;
    }
}
//# sourceMappingURL=EmitSignal.js.map

/***/ }),

/***/ "../lib/events/index.js":
/*!******************************!*\
  !*** ../lib/events/index.js ***!
  \******************************/
/*! exports provided: DomEvents, EmitSignal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DomEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DomEvents */ "../lib/events/DomEvents.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomEvents", function() { return _DomEvents__WEBPACK_IMPORTED_MODULE_0__["DomEvents"]; });

/* harmony import */ var _EmitSignal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmitSignal */ "../lib/events/EmitSignal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmitSignal", function() { return _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gl/GLBuffer.js":
/*!*****************************!*\
  !*** ../lib/gl/GLBuffer.js ***!
  \*****************************/
/*! exports provided: GLBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLBuffer", function() { return GLBuffer; });
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
class GLBuffer {
    constructor(gl, type = gl.ARRAY_BUFFER, data, drawType = gl.STATIC_DRAW) {
        this.gl = gl;
        this.type = type;
        this.arrayBuffers = [];
        this._byteLength = 0;
        this.buffer = gl.createBuffer();
        this.drawType = drawType;
        if (data) {
            this.upload(data);
        }
    }
    /**
     * Add Data to the MeshBuffermap that should be uploaded
     * @param {ArrayBuffer | ArrayBufferView} data
     */
    addData(data) {
        this.arrayBuffers.push(data);
        this._byteLength += data.byteLength;
    }
    /**
     * Remove data from the MeshBuffermap
     * @param {ArrayBuffer | ArrayBufferView} data
     */
    removeData(data) {
        const index = this.arrayBuffers.indexOf(data);
        if (index > -1) {
            const data = this.arrayBuffers[index];
            this._byteLength -= data.byteLength;
            this.arrayBuffers.splice(index, 1);
        }
    }
    /**
     * Uploads the new data to the GPU and all the previous data
     * @param data {ArrayBuffer|ArrayBufferView} an array of data to upload
     */
    upload(data) {
        if (data) {
            this.addData(data);
        }
        this.bind();
        let gl = this.gl;
        gl.bufferData(this.type, this._byteLength, this.drawType);
        let offset = 0;
        for (let i = 0, data; data = this.arrayBuffers[i]; i++) {
            gl.bufferSubData(this.type, offset, data);
            offset += data.byteLength;
        }
        this.unbind();
        return this._byteLength;
    }
    bind() {
        this.gl.bindBuffer(this.type, this.buffer);
    }
    unbind() {
        this.gl.bindBuffer(this.type, null);
    }
    destroy() {
        if (this.gl.isBuffer(this.buffer)) {
            this.gl.deleteBuffer(this.buffer);
        }
        this.gl = null;
        this.buffer = null;
    }
    /**
     * sum of the ByteLength of all ArrayBuffers stored in this GLBuffer
     * @returns {number}
     */
    get byteLength() {
        return this._byteLength;
    }
    /**
     * Length of the ArrayBuffers stored in this MeshBuffermap
     * @returns {number}
     */
    get length() {
        return this.arrayBuffers.length;
    }
    static createVertexBuffer(gl, data = null, drawType = gl.STATIC_DRAW) {
        return new GLBuffer(gl, gl.ARRAY_BUFFER, data, drawType);
    }
    static createIndexBuffer(gl, data = null, drawType = gl.STATIC_DRAW) {
        return new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, data, drawType);
    }
    static create(gl, type, data = null, drawType = gl.STATIC_DRAW) {
        return new GLBuffer(gl, type, data, drawType);
    }
}
//# sourceMappingURL=GLBuffer.js.map

/***/ }),

/***/ "../lib/gl/GLCube.js":
/*!***************************!*\
  !*** ../lib/gl/GLCube.js ***!
  \***************************/
/*! exports provided: GLCube */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLCube", function() { return GLCube; });
/* harmony import */ var _GLBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLBuffer */ "../lib/gl/GLBuffer.js");
/* harmony import */ var _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLVertexArrayObject */ "../lib/gl/GLVertexArrayObject.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");



/**
 * Created by Soeren on 18.05.2017.
 */
class GLCube {
    constructor(gl) {
        this.gl = gl;
        this.createVertexData();
    }
    calcVertexData() {
        let vertices = [
            1, 1, 1,
            1, 1, -1,
            1, -1, 1,
            1, -1, -1,
            -1, -1, 1,
            -1, 1, 1,
            -1, 1, -1,
            -1, -1, -1
        ];
        let indices = [];
        //right
        indices[0] = 0;
        indices[1] = 1;
        indices[2] = 2;
        indices[3] = 1;
        indices[4] = 2;
        indices[5] = 3;
        //left
        indices[6] = 4;
        indices[7] = 5;
        indices[8] = 6;
        indices[9] = 4;
        indices[10] = 6;
        indices[11] = 7;
        //top
        indices[12] = 5;
        indices[13] = 6;
        indices[14] = 0;
        indices[15] = 0;
        indices[16] = 6;
        indices[17] = 1;
        //bottom
        indices[18] = 7;
        indices[19] = 2;
        indices[20] = 3;
        indices[21] = 7;
        indices[22] = 2;
        indices[23] = 4;
        //back
        indices[24] = 7;
        indices[25] = 6;
        indices[26] = 3;
        indices[27] = 6;
        indices[28] = 3;
        indices[29] = 1;
        //front
        indices[30] = 5;
        indices[31] = 4;
        indices[32] = 0;
        indices[33] = 0;
        indices[34] = 4;
        indices[35] = 2;
        let a, b, c;
        const fVertices = [];
        for (let i = 0; i < indices.length; i += 3) {
            a = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].fromValues(vertices[indices[i] * 3], vertices[indices[i] * 3 + 1], vertices[indices[i] * 3 + 2]);
            b = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].fromValues(vertices[indices[i + 1] * 3], vertices[indices[i + 1] * 3 + 1], vertices[indices[i + 1] * 3 + 2]);
            c = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].fromValues(vertices[indices[i + 2] * 3], vertices[indices[i + 2] * 3 + 1], vertices[indices[i + 2] * 3 + 2]);
            const ab = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].subtract(ab, b, a);
            const ac = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].subtract(ac, c, a);
            const normal = gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].cross(normal, ab, ac);
            gl_matrix__WEBPACK_IMPORTED_MODULE_2__["vec3"].normalize(normal, normal);
            fVertices.push(a[0], a[1], a[2], normal[0], normal[1], normal[2]);
            fVertices.push(b[0], b[1], b[2], normal[0], normal[1], normal[2]);
            fVertices.push(c[0], c[1], c[2], normal[0], normal[1], normal[2]);
        }
        return new Float32Array(fVertices);
    }
    createVertexData() {
        const vertices = this.calcVertexData();
        const indices = new Uint8Array(36);
        for (let i = 0; i < 36; i++) {
            indices[i] = i;
        }
        this._vertexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createVertexBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
        if (!this._vertexBuffer) {
            throw 'Failed to create VertexBuffer Object';
        }
        this._indexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createIndexBuffer(this.gl, indices, this.gl.STATIC_DRAW);
        if (!this._indexBuffer) {
            throw 'Failed to create IndexBuffer Object!';
        }
        this._vertexArrayObject = new _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__["GLVertexArrayObject"](this.gl);
        this.vertexArrayObject.setIndexBuffer(this._indexBuffer);
    }
    get vertexBuffer() {
        return this._vertexBuffer;
    }
    set vertexBuffer(value) {
        this._vertexBuffer = value;
    }
    get indexBuffer() {
        return this._indexBuffer;
    }
    set indexBuffer(value) {
        this._indexBuffer = value;
    }
    get vertexArrayObject() {
        return this._vertexArrayObject;
    }
    set vertexArrayObject(value) {
        this._vertexArrayObject = value;
    }
    draw() {
        this.vertexArrayObject.bind();
        this.gl.drawElements(this.gl.TRIANGLES, GLCube.INDEX_LENGTH, this.gl.UNSIGNED_BYTE, 0);
        this.vertexArrayObject.unbind();
    }
}
GLCube.INDEX_LENGTH = 36;
//# sourceMappingURL=GLCube.js.map

/***/ }),

/***/ "../lib/gl/GLCubemap.js":
/*!******************************!*\
  !*** ../lib/gl/GLCubemap.js ***!
  \******************************/
/*! exports provided: GLCubemap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLCubemap", function() { return GLCubemap; });
/* harmony import */ var _GLTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLTexture */ "../lib/gl/GLTexture.js");

class GLCubemap extends _GLTexture__WEBPACK_IMPORTED_MODULE_0__["GLTexture"] {
    constructor(gl, textureID = 0, width = -1, height = -1, internalFormat = gl.RGBA, format = gl.RGBA, type = gl.UNSIGNED_BYTE) {
        super(gl, textureID, width, height, internalFormat, format, type);
        this.gl = gl;
        this._textureID = textureID;
        this._texture = gl.createTexture();
        this.mipmap = false;
        this.premultiplyAlpha = false;
        this._width = width;
        this._height = height;
        this.format = format;
        this.type = type;
    }
    /**
     * Uploads this texture to the GPU
     * @param source {HTMLImageElement|ImageData|HTMLVideoElement}
     * @param flip - {boolean} flip the texture
     * @param face {number}
     * @param level {number} mipmap level
     */
    upload(source, flip = false, face = 0, level = 0) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, level, this.internalformat, this.format, this.type, source);
        if (level === 0) {
            this._width = source.width;
            this._height = source.height;
        }
        this.unbind();
    }
    /**
     * Use a data source and uploads this texture to the GPU
     * @param data {TypedArray} data to upload to the texture
     * @param width {number} new width of the texture
     * @param height {number} new height of the texture
     * @param flip - {boolean} flip the texture
     * @param face {number}
     */
    uploadData(data, face, width = this._width, height = this._height, flip = false, level = 0) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, level, this.internalformat, width, height, 0, this.format, this.type, data || null);
        if (level === 0) {
            this._width = width;
            this._height = height;
        }
        this.unbind();
    }
    /**
     * Binds the texture
     * @param location
     */
    bind(location = this._textureID) {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._texture);
        return this;
    }
    unbind(location = this._textureID) {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
        return this;
    }
    /**
     * Enables linear filtering
     */
    enableLinearScaling() {
        this.minFilter(true);
        this.magFilter(true);
    }
    /**
     * Enabled nearest neighbour interpolation
     */
    enableNearestScaling() {
        this.minFilter(false);
        this.magFilter(false);
    }
    /**
     * @param linear {boolean} if we want to use linear filtering or nearest neighbour interpolation
     */
    minFilter(linear) {
        this.bind();
        let gl = this.gl;
        if (this.mipmap) {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
        }
        else {
            gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        }
        this.unbind();
    }
    /**
     * @param linear {boolean} if we want to use linear or nearest neighbour interpolation
     */
    magFilter(linear) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        this.unbind();
    }
    /**
     * Enables mipmapping
     */
    enableMipmap() {
        let gl = this.gl;
        this.bind();
        this.mipmap = true;
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        this.unbind();
    }
    /**
     * Enables clamping on the texture wo WebGL will not repeat it
     */
    enableWrapClamp() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
        this.unbind();
    }
    /**
     * Enable tiling on the texture
     */
    enableWrapRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.REPEAT);
        this.unbind();
    }
    enableWrapMirrorRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.MIRRORED_REPEAT);
        this.unbind();
    }
    /**
     * Destroys this texture
     */
    destroy() {
        let gl = this.gl;
        gl.deleteTexture(this._texture);
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    /**
     * create CubeMap from source data
     * @param gl
     * @param source - the src
     * @param flip - flip the texture default: false
     * @param premultiplyAlpha - premultiplyAlpha
     * @param textureID - textureID
     * @param internalformat
     * @param format
     * @param type
     */
    static cubemapFromSource(gl, source, flip = false, premultiplyAlpha = false, textureID = 0, internalformat, format, type) {
        const cubemap = new GLCubemap(gl, textureID, null, null, internalformat, format, type);
        const sources = [].concat(source);
        cubemap.premultiplyAlpha = premultiplyAlpha;
        const mipLevels = Math.floor(sources.length / 6);
        for (let j = 0; j < mipLevels; j++) {
            for (let i = 0; i < 6; i++) {
                cubemap.upload(sources[(j * 6) + i], flip, i, j);
            }
        }
        if (_GLTexture__WEBPACK_IMPORTED_MODULE_0__["GLTexture"].isPowerOf2(source[0].width) && _GLTexture__WEBPACK_IMPORTED_MODULE_0__["GLTexture"].isPowerOf2(source[0].height)) {
            cubemap.enableMipmap();
            cubemap.enableWrapRepeat();
        }
        else {
            cubemap.enableWrapClamp();
        }
        cubemap.enableLinearScaling();
        return cubemap;
    }
    static cubemapFromData(gl, data, width, height, flip = false, textureID = 0, internalformat, format, type) {
        let texture = new GLCubemap(gl, textureID, null, null, format, type);
        let datas = [].concat(data);
        for (let i = 0; i < 6; i++) {
            texture.uploadData(datas[i], i, width, height, flip);
        }
        return texture;
    }
}
//# sourceMappingURL=GLCubemap.js.map

/***/ }),

/***/ "../lib/gl/GLFramebuffer.js":
/*!**********************************!*\
  !*** ../lib/gl/GLFramebuffer.js ***!
  \**********************************/
/*! exports provided: GLFramebuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLFramebuffer", function() { return GLFramebuffer; });
/* harmony import */ var _GLTexture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLTexture */ "../lib/gl/GLTexture.js");
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

class GLFramebuffer {
    constructor(gl, width = 512, height = 512) {
        this.drawBuffers = [];
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.framebuffer = gl.createFramebuffer();
        this.renderbuffer = null;
        this._textures = [];
    }
    checkStatus() {
        const gl = this.gl;
        let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        switch (status) {
            case gl.FRAMEBUFFER_COMPLETE:
                return true;
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                return false;
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                return false;
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                return false;
            case gl.FRAMEBUFFER_UNSUPPORTED:
                console.warn("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                return false;
            default:
                console.warn("Incomplete framebuffer: " + status);
                return false;
        }
    }
    /**
     * Creates a frame buffer with a texture containing the given data
     *
     * @static
     * @param {WebGL2RenderingContext} gl - The current WebGL rendering context
     * @param {number} width - the width of the drawing area of the frame buffer
     * @param {number} height - the height of the drawing area of the frame buffer
     * @param {number} textureID - texture target
     * @param {number} attachment - COLOR_ATTACHMENT
     * @param {number} internalformat
     * @param {number} format
     * @param {number} type
     * @return {GLFramebuffer} The new framebuffer.
     */
    static createRGBA(gl, width, height, textureID = 0, attachment = gl.COLOR_ATTACHMENT0, internalformat, format, type) {
        return GLFramebuffer.createFloat32(gl, width, height, null, textureID, attachment, format, type);
    }
    /**
     * Creates a frame buffer with a texture containing the given data
     *
     * @static
     * @param {WebGL2RenderingContext} gl - The current WebGL rendering context
     * @param {number} width - the width of the drawing area of the frame buffer
     * @param {number} height - the height of the drawing area of the frame buffer
     * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView} data - an array of data
     * @param {number} textureID - texture target
     * @param {number} attachment - COLOR_ATTACHMENT
     * @param {number} internalformat
     * @param {number} format
     * @param {number} type
     * @return {GLFramebuffer} The new framebuffer.
     */
    static createFloat32(gl, width, height, data, textureID = 0, attachment = gl.COLOR_ATTACHMENT0, internalformat, format, type) {
        const texture = _GLTexture__WEBPACK_IMPORTED_MODULE_0__["GLTexture"].fromData(gl, data, width, height, textureID, internalformat, format, type);
        texture.enableNearestScaling();
        texture.enableWrapClamp();
        // now create the framebuffer object and attach the texture to it.
        const fbo = new GLFramebuffer(gl, width, height);
        fbo.addTargetTexture(texture, attachment);
        fbo.unbind();
        return fbo;
    }
    /**
     * Adds a texture to the framebuffer.
     * @param {GLTexture} texture - the texture to add.
     * @param {Number} attachment - COLOR_ATTACHMENT
     * @param {Number} face if used for 3d Textures
     * @param {Boolean} setDrawBuffer - adds the attachment to the drawBuffer
     */
    addTargetTexture(texture, attachment = this.gl.COLOR_ATTACHMENT0, face, setDrawBuffer = true) {
        const gl = this.gl;
        if (this._textures.indexOf(texture) > -1) {
            this.bind();
            return this;
        }
        this._textures.push(texture || new _GLTexture__WEBPACK_IMPORTED_MODULE_0__["GLTexture"](gl, 0));
        let tex = this._textures[this._textures.length - 1].bind();
        this.bind();
        if (face || face === 0) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, tex.texture, 0);
        }
        else {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, tex.texture, 0);
        }
        if (setDrawBuffer) {
            this.drawBuffers.push(attachment);
            this.gl.drawBuffers(this.drawBuffers);
        }
        return this;
    }
    setDrawBuffer(drawBuffers = this.drawBuffers) {
        this.gl.drawBuffers(drawBuffers);
    }
    /**
     * Initialises the stencil buffer
     */
    createRenderbuffer() {
        if (this.renderbuffer) {
            return null;
        }
        const gl = this.gl;
        this.bind();
        this.renderbuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
        this.unbind();
        return this;
    }
    /**
     * Erases the drawing area and fills it with a colour
     *
     * @param {number} r - the red value of the clearing colour
     * @param {number} g - the green value of the clearing colour
     * @param {number} b - the blue value of the clearing colour
     * @param {number} a - the alpha value of the clearing colour
     * @param {boolean} depthBuffer - clear DepthBuffer default: false
     * @param {boolean} stencilBuffer - clear StencilBuffer default: false
     */
    clear(r = 0, g = 0, b = 0, a = 1, depthBuffer = false, stencilBuffer = false) {
        this.bind();
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        if (depthBuffer && stencilBuffer) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }
        else if (depthBuffer) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        else if (stencilBuffer) {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        }
        else {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        return this;
    }
    /**
     * Binds the frame buffer to the WebGL context
     */
    bind(target = this.gl.FRAMEBUFFER) {
        const gl = this.gl;
        for (let texture of this._textures) {
            texture.unbind();
        }
        gl.bindFramebuffer(target, this.framebuffer);
        return this;
    }
    /**
     * Unbinds the frame buffer to the WebGL context
     */
    unbind(target = this.gl.FRAMEBUFFER) {
        this.gl.bindFramebuffer(target, null);
        return this;
    }
    /**
     * Resizes the drawing area of the buffer to the given width and height
     *
     * @param {number} width - the new width
     * @param {number} height - the new height
     */
    resize(width, height) {
        const gl = this.gl;
        this.width = width;
        this.height = height;
        for (let texture of this._textures) {
            texture.uploadData(null, width, height);
        }
        if (this.renderbuffer) {
            // update the stencil buffer width and height
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
        }
        return this;
    }
    /**
     * Destroys this buffer
     */
    destroy() {
        for (let texture of this._textures) {
            texture.destroy();
        }
        this.gl.deleteFramebuffer(this.framebuffer);
        this.gl = undefined;
        this.framebuffer = undefined;
        this.renderbuffer = undefined;
        this.drawBuffers.length = 0;
        this._textures.length = 0;
    }
    getTexture(idx = 0) {
        return this._textures[idx];
    }
    setTexture(value, idx = 0) {
        this._textures[idx] = value;
    }
    get texture() {
        return this._textures[0];
    }
    set texture(value) {
        this._textures[0] = value;
    }
    get textures() {
        return this._textures;
    }
    set textures(value) {
        this._textures = value;
    }
}
//# sourceMappingURL=GLFramebuffer.js.map

/***/ }),

/***/ "../lib/gl/GLQuad.js":
/*!***************************!*\
  !*** ../lib/gl/GLQuad.js ***!
  \***************************/
/*! exports provided: GLQuad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLQuad", function() { return GLQuad; });
/* harmony import */ var _GLBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLBuffer */ "../lib/gl/GLBuffer.js");
/* harmony import */ var _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLVertexArrayObject */ "../lib/gl/GLVertexArrayObject.js");


/**
 * Created by Soeren on 12.02.2017.
 */
class GLQuad {
    constructor(gl) {
        this.gl = gl;
        this.createVertexData();
    }
    createVertexData() {
        let vertices = new Float32Array([
            -1, 1, 0, 1,
            -1, -1, 0, 0,
            1, 1, 1, 1,
            1, -1, 1, 0
        ]);
        let indices = new Uint8Array(6);
        indices[0] = 0;
        indices[1] = 1;
        indices[2] = 2;
        indices[3] = 1;
        indices[4] = 2;
        indices[5] = 3;
        this._vertexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createVertexBuffer(this.gl, vertices, this.gl.STATIC_DRAW);
        if (!this._vertexBuffer) {
            throw 'Failed to create VertexBuffer Object';
        }
        this._indexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createIndexBuffer(this.gl, indices, this.gl.STATIC_DRAW);
        if (!this._indexBuffer) {
            throw 'Failed to create IndexBuffer Object!';
        }
        this._vertexArrayObject = new _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__["GLVertexArrayObject"](this.gl);
        this.vertexArrayObject.setIndexBuffer(this._indexBuffer);
    }
    get vertexBuffer() {
        return this._vertexBuffer;
    }
    set vertexBuffer(value) {
        this._vertexBuffer = value;
    }
    get indexBuffer() {
        return this._indexBuffer;
    }
    set indexBuffer(value) {
        this._indexBuffer = value;
    }
    get vertexArrayObject() {
        return this._vertexArrayObject;
    }
    set vertexArrayObject(value) {
        this._vertexArrayObject = value;
    }
    draw() {
        this.vertexArrayObject.bind();
        this.gl.drawElements(this.gl.TRIANGLES, GLQuad.INDEX_LENGTH, this.gl.UNSIGNED_BYTE, 0);
        this.vertexArrayObject.unbind();
    }
}
GLQuad.INDEX_LENGTH = 6;
//# sourceMappingURL=GLQuad.js.map

/***/ }),

/***/ "../lib/gl/GLSphere.js":
/*!*****************************!*\
  !*** ../lib/gl/GLSphere.js ***!
  \*****************************/
/*! exports provided: GLSphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLSphere", function() { return GLSphere; });
/* harmony import */ var _GLBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLBuffer */ "../lib/gl/GLBuffer.js");
/* harmony import */ var _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLVertexArrayObject */ "../lib/gl/GLVertexArrayObject.js");


class GLSphere {
    constructor(gl, radius = 1, rings = 12, sectors = 12) {
        this.gl = gl;
        this.createVertexData(radius, rings, sectors);
    }
    createVertexData(radius, rings, sectors) {
        let R = 1.0 / (rings - 1);
        let S = 1.0 / (sectors - 1);
        let vertexData = new Float32Array(rings * sectors * 8);
        let indexData = new Uint32Array(rings * sectors * 6);
        let index = 0;
        for (let r = 0; r < rings; r++) {
            for (let s = 0; s < sectors; s++) {
                let x = Math.cos(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R);
                let y = Math.sin((-Math.PI / 2) + (Math.PI * r * R));
                let z = Math.sin(2 * Math.PI * s * S) * Math.sin(Math.PI * r * R);
                vertexData[index++] = x * radius;
                vertexData[index++] = y * radius;
                vertexData[index++] = z * radius;
                vertexData[index++] = x;
                vertexData[index++] = y;
                vertexData[index++] = z;
                vertexData[index++] = s * S;
                vertexData[index++] = r * R;
            }
        }
        this._indexcount = 0;
        for (let r = 0; r < rings - 1; r++) {
            for (let s = 0; s < sectors - 1; s++) {
                indexData[this._indexcount++] = r * sectors + s;
                indexData[this._indexcount++] = (r + 1) * sectors + s;
                indexData[this._indexcount++] = (r + 1) * sectors + (s + 1);
                indexData[this._indexcount++] = r * sectors + s;
                indexData[this._indexcount++] = (r + 1) * sectors + (s + 1);
                indexData[this._indexcount++] = r * sectors + (s + 1);
            }
        }
        this._vertexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createVertexBuffer(this.gl, vertexData, this.gl.STATIC_DRAW);
        if (!this._vertexBuffer) {
            throw 'Failed to create VertexBuffer Object';
        }
        this._indexBuffer = _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].createIndexBuffer(this.gl, indexData, this.gl.STATIC_DRAW);
        if (!this._indexBuffer) {
            throw 'Failed to create IndexBuffer Object!';
        }
        this._vertexArrayObject = new _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_1__["GLVertexArrayObject"](this.gl);
        this._vertexArrayObject.setIndexBuffer(this._indexBuffer);
    }
    draw() {
        this.vertexArrayObject.bind();
        this.gl.drawElements(this.gl.TRIANGLES, this._indexcount, this.gl.UNSIGNED_INT, 0);
        this.vertexArrayObject.unbind();
    }
    get vertexBuffer() {
        return this._vertexBuffer;
    }
    set vertexBuffer(value) {
        this._vertexBuffer = value;
    }
    get indexBuffer() {
        return this._indexBuffer;
    }
    set indexBuffer(value) {
        this._indexBuffer = value;
    }
    get vertexArrayObject() {
        return this._vertexArrayObject;
    }
    set vertexArrayObject(value) {
        this._vertexArrayObject = value;
    }
    get indexcount() {
        return this._indexcount;
    }
    set indexcount(value) {
        this._indexcount = value;
    }
}
//# sourceMappingURL=GLSphere.js.map

/***/ }),

/***/ "../lib/gl/GLTexture.js":
/*!******************************!*\
  !*** ../lib/gl/GLTexture.js ***!
  \******************************/
/*! exports provided: GLTexture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTexture", function() { return GLTexture; });
/* harmony import */ var _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/GLConstants */ "../lib/gl/constants/GLConstants.js");

class GLTexture {
    constructor(gl, textureID = 0, width = -1, height = -1, internalformat = gl.RGBA, format = gl.RGBA, type = gl.UNSIGNED_BYTE) {
        this.gl = gl;
        this._textureID = textureID;
        this._texture = gl.createTexture();
        this.mipmap = false;
        this._premultiplyAlpha = false;
        this._width = width;
        this._height = height;
        this.internalformat = internalformat;
        this.format = format;
        this.type = type;
        this.miplevel = 0;
    }
    /**
     * Uploads this texture to the GPU
     * @param source {HTMLImageElement|ImageData|HTMLVideoElement}
     */
    upload(source) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiplyAlpha);
        let newWidth = source.width;
        let newHeight = source.height;
        if (newHeight !== this._height || newWidth !== this._width) {
            gl.texImage2D(gl.TEXTURE_2D, this.miplevel, this.internalformat, this.format, this.type, source);
        }
        else {
            gl.texSubImage2D(gl.TEXTURE_2D, this.miplevel, 0, 0, this.format, this.type, source);
        }
        this._width = newWidth;
        this._height = newHeight;
        this.unbind();
    }
    /**
     * Use a data source and uploads this texture to the GPU
     * @param data {TypedArray} data to upload to the texture
     * @param width {number} new width of the texture
     * @param height {number} new height of the texture
     */
    uploadData(data, width, height) {
        this.bind();
        let gl = this.gl;
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiplyAlpha);
        if (width !== this._width || height !== this._height) {
            gl.texImage2D(gl.TEXTURE_2D, this.miplevel, this.internalformat, width, height, 0, this.format, this.type, data || null);
        }
        else {
            gl.texSubImage2D(gl.TEXTURE_2D, this.miplevel, 0, 0, width, height, this.format, this.type, data || null);
        }
        this._width = width;
        this._height = height;
        this.unbind();
    }
    /**
     * Binds the texture
     * @param location
     */
    bind(location = this._textureID) {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        return this;
    }
    unbind(location = this._textureID) {
        let gl = this.gl;
        if (location !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + location);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        return this;
    }
    /**
     * @param linear {boolean} if we want to use linear filtering or nearest neighbour interpolation
     */
    minFilter(linear) {
        this.bind();
        let gl = this.gl;
        if (this.mipmap) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);
        }
        else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        }
        this.unbind();
    }
    setMinFilter(filter) {
        if (!this.mipmap && (filter === _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR
            || filter === _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR_MIPMAP_NEAREST
            || filter === _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].NEAREST_MIPMAP_LINEAR
            || filter === _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].NEAREST_MIPMAP_NEAREST)) {
            this.enableMipmap();
        }
        this.bind();
        let gl = this.gl;
        if (this.mipmap) {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        }
        else {
            //If there is no mipamp e.g. non power of 2 use LINEAR or NEAREST
            const linear = filter === _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR || _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR || _constants_GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR_MIPMAP_NEAREST;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        }
        this.unbind();
    }
    /**
     * @param linear {boolean} if we want to use linear or nearest neighbour interpolation
     */
    magFilter(linear) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linear ? gl.LINEAR : gl.NEAREST);
        this.unbind();
    }
    setMagFilter(filter) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        this.unbind();
    }
    /**
     * Enables mipmapping
     */
    enableMipmap() {
        if (GLTexture.isPowerOf2(this._width) && GLTexture.isPowerOf2(this._height) && (this.internalformat === this.gl.RGB || this.internalformat === this.gl.RGBA)) {
            let gl = this.gl;
            this.bind();
            this.mipmap = true;
            gl.generateMipmap(gl.TEXTURE_2D);
            this.unbind();
        }
    }
    /**
     * Enables linear filtering
     */
    enableLinearScaling() {
        this.minFilter(true);
        this.magFilter(true);
    }
    /**
     * Enabled nearest neighbour interpolation
     */
    enableNearestScaling() {
        this.minFilter(false);
        this.magFilter(false);
    }
    /**
     * Enables clamping on the texture wo WebGL will not repeat it
     */
    enableWrapClamp() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.unbind();
    }
    /**
     * Enable tiling on the texture
     */
    enableWrapRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        this.unbind();
    }
    enableWrapMirrorRepeat() {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
        this.unbind();
    }
    setWrapS(mode) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, mode);
        this.unbind();
    }
    setWrapT(mode) {
        let gl = this.gl;
        this.bind();
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, mode);
        this.unbind();
    }
    flipY(flip) {
        let gl = this.gl;
        this.bind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flip);
        this.unbind();
    }
    /**
     * Destroys this texture
     */
    destroy() {
        let gl = this.gl;
        gl.deleteTexture(this._texture);
    }
    static isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
    static nextHighestPowerOfTwo(x) {
        --x;
        for (var i = 1; i < 32; i <<= 1) {
            x = x | x >> i;
        }
        return x + 1;
    }
    get textureID() {
        return this._textureID;
    }
    set textureID(value) {
        this._textureID = value;
    }
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
    }
    get premultiplyAlpha() {
        return this._premultiplyAlpha;
    }
    set premultiplyAlpha(value) {
        this._premultiplyAlpha = value;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    /**
     *
     * @param gl {WebGL2RenderingContext} the current webgl context
     * @param source {HTMLImageElement|ImageData} the source image of the texture
     * @param premultiplyAlpha {Boolean} If we want to use pre-multiplied alpha
     * @param textureID {number} textureID to use multiple textures in a shader
     * @param internalformat {number} optional interal format RGBA8,RGB16 etc.
     * @param format {number} optional the Format to use for the texture RGBA etc.
     * @param type {number} texture type GL_FLOAT etc
     * @returns {GLTexture}
     */
    static fromSource(gl, source, premultiplyAlpha = false, textureID = 0, internalformat, format, type) {
        let texture = new GLTexture(gl, textureID, null, null, internalformat, format, type);
        texture._premultiplyAlpha = premultiplyAlpha;
        texture.upload(source);
        return texture;
    }
    /**
     * @param {WebGL2RenderingContext} gl - webgl context
     * @param {Float32Array} data - data for the texture
     * @param {number} width - width of the texture
     * @param {number} height - height of the texture
     * @param {number} textureID - textureID
     * @param {number} internalformat - optional format to use RGBA,RGB etc.
     * @param {number} format - optional format to use RGBA,RGB etc.
     * @param {number} type - data type default: UNSIGNED_BYTE
     * @param {boolean} premultiplyAlpha - If we want to use pre-multiplied alpha
     * @returns {GLTexture}
     */
    static fromData(gl, data, width, height, textureID = 0, internalformat, format, type, premultiplyAlpha) {
        let texture = new GLTexture(gl, textureID, null, null, internalformat, format, type);
        texture._premultiplyAlpha = premultiplyAlpha;
        texture.uploadData(data, width, height);
        return texture;
    }
}
//# sourceMappingURL=GLTexture.js.map

/***/ }),

/***/ "../lib/gl/GLUniformBufferObject.js":
/*!******************************************!*\
  !*** ../lib/gl/GLUniformBufferObject.js ***!
  \******************************************/
/*! exports provided: GLUniformBufferObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLUniformBufferObject", function() { return GLUniformBufferObject; });
class GLUniformBufferObject {
    constructor(gl, bindPoint = 0, drawType = gl.DYNAMIC_DRAW) {
        this.gl = gl;
        this.type = gl.UNIFORM_BUFFER;
        this.buffer = gl.createBuffer();
        this.items = {};
        this.drawType = drawType;
        this._bindingPoint = bindPoint;
        this._byteLength = 0;
    }
    /**
     * Add an item/property to the UBO
     * make sure that the order of the items is right
     */
    addItem(name, type, data) {
        this.items[name] = { type: type, offset: 0, blockSize: 0, alignedByteLength: 0, data: data };
    }
    /**
     * Add an block of items/properties to the UBO
     * make sure the order is the same as in the shader
     */
    addBlock(items) {
        for (let i = 0, item; item = items[i]; i++) {
            this.addItem(item.name, item.type, item.data);
        }
    }
    /**
     * Update the item data
     * @param name - name of the item
     * @param data - new data
     * @param updateGL -
     */
    updateItem(name, data, updateGL = false) {
        this.items[name].data = data;
        if (updateGL) {
            this.updateGL(name);
        }
    }
    hasItem(name) {
        return !!this.items[name];
    }
    removeItem(name, updateGL = false) {
        delete this.items[name];
        this.upload();
    }
    /**
     * Update the Buffer for a single item
     * @param name
     */
    updateGL(name) {
        const item = this.items[name];
        if (item.data) {
            this.bind();
            this.gl.bufferSubData(this.type, item.offset, item.data);
            this.unbind();
        }
    }
    /**
     * upload one buffer instead of adding multiple small items
     * @param data - the buffer containing all values
     * @param byteLength - the aligned componentTypeCount of the UBO
     */
    uploadBuffer(byteLength, data, length) {
        this._byteLength = byteLength;
        const gl = this.gl;
        this.bind();
        gl.bufferData(this.type, this._byteLength, this.drawType);
        if (data) {
            gl.bufferSubData(this.type, 0, data, length);
        }
        this.unbind();
        return this._byteLength;
    }
    /**
     * Uploads all data to the gpu
     */
    upload() {
        this._byteLength = this.updateItemAlignment();
        this.bind();
        const gl = this.gl;
        gl.bufferData(this.type, this._byteLength, this.drawType);
        for (let i = 0, item; item = this.items[i]; i++) {
            if (item.data) {
                gl.bufferSubData(this.type, item.offset, item.data);
            }
        }
        this.unbind();
        return this._byteLength;
    }
    bindUBO(bindingPoint = this._bindingPoint, offset = 0, size = this._byteLength) {
        if (offset === 0 && size === this._byteLength) {
            this.gl.bindBufferBase(this.type, bindingPoint, this.buffer);
        }
        else {
            this.gl.bindBufferRange(this.type, bindingPoint, this.buffer, offset, size);
        }
    }
    bind() {
        this.gl.bindBuffer(this.type, this.buffer);
    }
    unbind() {
        this.gl.bindBuffer(this.type, null);
    }
    destroy() {
        if (this.gl.isBuffer(this.buffer)) {
            this.gl.deleteBuffer(this.buffer);
        }
        this.gl = null;
        this.buffer = null;
    }
    updateItemAlignment() {
        let prevItem = null;
        let byteLength = 0;
        const keys = Object.keys(this.items);
        for (let i = 0, item; item = this.items[keys[i]]; i++) {
            if (!item.data) {
                continue;
            }
            const sizes = GLUniformBufferObject.TYPE_TO_SIZE[item.type];
            item.alignment = item.alignedByteLength = sizes[0];
            item.blockSize = sizes[1];
            //check if array
            if (item.data.byteLength !== item.blockSize) {
                const length = item.data.byteLength / item.blockSize;
                item.alignedByteLength = item.alignment * length;
            }
            if (prevItem) {
                item.offset = prevItem.alignedByteLength + prevItem.offset;
            }
            prevItem = item;
            byteLength += item.alignedByteLength;
        }
        return byteLength;
    }
    get bindingPoint() {
        return this._bindingPoint;
    }
    set bindingPoint(value) {
        this._bindingPoint = value;
    }
    get byteLength() {
        return this._byteLength;
    }
    set byteLength(value) {
        this._byteLength = value;
    }
}
GLUniformBufferObject.TYPE_TO_SIZE = {
    float: [4, 4],
    int: [4, 4],
    bool: [4, 4],
    boolean: [4, 4],
    mat4: [64, 64],
    mat3: [48, 48],
    vec4: [16, 16],
    vec3: [16, 12],
    vec2: [8, 8]
};
//# sourceMappingURL=GLUniformBufferObject.js.map

/***/ }),

/***/ "../lib/gl/GLVertexArrayObject.js":
/*!****************************************!*\
  !*** ../lib/gl/GLVertexArrayObject.js ***!
  \****************************************/
/*! exports provided: GLVertexArrayObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLVertexArrayObject", function() { return GLVertexArrayObject; });
class GLVertexArrayObject {
    constructor(gl) {
        this.gl = gl;
        this.vao = this.gl.createVertexArray();
        this.attributes = [];
        this.dirty = false;
    }
    /**
     * Binds the VAO, if its dirty it will initialize the attributes for the data
     */
    bind() {
        if (this.vao) {
            this.gl.bindVertexArray(this.vao);
            if (this.dirty) {
                this.activate();
                this.dirty = false;
                this.bind();
            }
        }
        return this;
    }
    /**
     * Activates the vao,
     * binds the data and applies the Attributes
     */
    activate() {
        const gl = this.gl;
        let lastBuffer = null;
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        for (let i = 0, attribute; attribute = this.attributes[i]; i++) {
            if (lastBuffer !== attribute.buffer) {
                //unbind previous buffer we dont want to apply the attribute to both buffers
                if (lastBuffer) {
                    lastBuffer.unbind();
                }
                //bind attribute buffer
                attribute.buffer.bind();
                //update lastBuffer
                lastBuffer = attribute.buffer;
            }
            GLVertexArrayObject.setVertexAttribArray(gl, attribute);
        }
        if (lastBuffer) {
            lastBuffer.unbind();
        }
        this.indexBuffer.bind();
        return this;
    }
    /**
     * Deactivates the non native VertexArrayObject
     */
    deactivate() {
        const gl = this.gl;
        let lastBuffer = null;
        for (let i = 0, attribute; attribute = this.attributes[i]; i++) {
            if (lastBuffer !== attribute.buffer) {
                attribute.buffer.unbind();
                lastBuffer = attribute.buffer;
            }
            GLVertexArrayObject.setVertexAttribArray(gl, attribute, true);
        }
        this.indexBuffer.unbind();
        return this;
    }
    /**
     * Unbind the VAO
     */
    unbind(force = false) {
        if (this.vao) {
            this.gl.bindVertexArray(null);
        }
        else if (!this.vao || force) {
            this.deactivate();
        }
        return this;
    }
    addAttribute(buffer, attribute, size, type, normalized, stride, offset, initialize = true) {
        this.attributes.push({
            buffer,
            attribute,
            size,
            type,
            normalized,
            stride,
            offset,
            initialize
        });
        this.dirty = true;
        return this;
    }
    setIndexBuffer(buffer) {
        this.indexBuffer = buffer;
        return this;
    }
    draw(mode, size, type, offset) {
        const gl = this.gl;
        gl.drawElements(mode, size, type, offset);
        return this;
    }
    /**
     * Removes all attributes from this vao
     * and deactivates the GLAttributes
     */
    clear() {
        //Bind vao
        if (this.vao) {
            this.gl.bindVertexArray(this.vao);
        }
        //Remove attributes
        this.deactivate();
        //clear attributes
        this.attributes.length = 0;
        //Remove indexBuffer
        this.indexBuffer = null;
        //Unbind vao
        if (this.vao) {
            this.gl.bindVertexArray(null);
        }
    }
    /**
     * Clears the buffer the removes all references
     * making it free for gc
     */
    destroy() {
        this.clear();
        if (this.vao) {
            this.gl.deleteVertexArray(this.vao);
        }
        this.gl = undefined;
        this.indexBuffer = undefined;
        this.attributes = undefined;
        this.vao = undefined;
    }
    static setVertexAttribArrays(gl, attributes, unbind = false) {
        for (let i = 0, attribute; attribute = attributes[i]; i++) {
            GLVertexArrayObject.setVertexAttribArray(gl, attribute, unbind);
        }
    }
    static setVertexAttribArray(gl, attribute, unbind = false) {
        if (attribute.initialize && attribute.attribute) {
            gl.vertexAttribPointer(attribute.attribute.location, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
            attribute.initialize = false;
        }
        if (unbind && attribute.attribute) {
            gl.disableVertexAttribArray(attribute.attribute.location);
        }
        else if (attribute.attribute) {
            gl.enableVertexAttribArray(attribute.attribute.location);
        }
    }
}
//# sourceMappingURL=GLVertexArrayObject.js.map

/***/ }),

/***/ "../lib/gl/constants/GLConstants.js":
/*!******************************************!*\
  !*** ../lib/gl/constants/GLConstants.js ***!
  \******************************************/
/*! exports provided: GL_TYPES, GL_TYPES_BYTESIZE, GL_PRIMITIVES, GL_BUFFERS, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP, GL_INTERNALFORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES", function() { return GL_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES_BYTESIZE", function() { return GL_TYPES_BYTESIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL_PRIMITIVES", function() { return GL_PRIMITIVES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL_BUFFERS", function() { return GL_BUFFERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAG_FILTER", function() { return MAG_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_FILTER", function() { return MIN_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP", function() { return TEXTURE_WRAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GL_INTERNALFORMAT", function() { return GL_INTERNALFORMAT; });
/**
 * Created by Soeren on 31.10.2017.
 */
var GL_TYPES;
(function (GL_TYPES) {
    GL_TYPES[GL_TYPES["BYTE"] = 5120] = "BYTE";
    GL_TYPES[GL_TYPES["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    GL_TYPES[GL_TYPES["SHORT"] = 5122] = "SHORT";
    GL_TYPES[GL_TYPES["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    GL_TYPES[GL_TYPES["INT"] = 5124] = "INT";
    GL_TYPES[GL_TYPES["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    GL_TYPES[GL_TYPES["FLOAT"] = 5126] = "FLOAT"; //5126
})(GL_TYPES || (GL_TYPES = {}));
const GL_TYPES_BYTESIZE = {
    0x1400: 1,
    0x1401: 1,
    0x1402: 2,
    0x1403: 2,
    0x1404: 4,
    0x1405: 4,
    0x1406: 4
};
var GL_PRIMITIVES;
(function (GL_PRIMITIVES) {
    GL_PRIMITIVES["POSITION"] = "POSITION";
    GL_PRIMITIVES["NORMAL"] = "NORMAL";
    GL_PRIMITIVES["TANGENT"] = "TANGENT";
    GL_PRIMITIVES["TEXCOORD_0"] = "TEXCOORD_0";
    GL_PRIMITIVES["TEXCOORD_1"] = "TEXCOORD_1";
    GL_PRIMITIVES["COLOR_0"] = "COLOR_0";
    GL_PRIMITIVES["JOINTS_0"] = "JOINTS_0";
    GL_PRIMITIVES["WEIGHTS_0"] = "WEIGHTS_0";
    GL_PRIMITIVES["JOINTS_1"] = "JOINTS_1";
    GL_PRIMITIVES["WEIGHTS_1"] = "WEIGHTS_1";
})(GL_PRIMITIVES || (GL_PRIMITIVES = {}));
var GL_BUFFERS;
(function (GL_BUFFERS) {
    GL_BUFFERS[GL_BUFFERS["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
    GL_BUFFERS[GL_BUFFERS["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
    GL_BUFFERS[GL_BUFFERS["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
    GL_BUFFERS[GL_BUFFERS["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
    GL_BUFFERS[GL_BUFFERS["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
})(GL_BUFFERS || (GL_BUFFERS = {}));
var MAG_FILTER;
(function (MAG_FILTER) {
    MAG_FILTER[MAG_FILTER["NEAREST"] = 9728] = "NEAREST";
    MAG_FILTER[MAG_FILTER["LINEAR"] = 9729] = "LINEAR";
})(MAG_FILTER || (MAG_FILTER = {}));
var MIN_FILTER;
(function (MIN_FILTER) {
    MIN_FILTER[MIN_FILTER["NEAREST"] = 9728] = "NEAREST";
    MIN_FILTER[MIN_FILTER["LINEAR"] = 9729] = "LINEAR";
    MIN_FILTER[MIN_FILTER["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
    MIN_FILTER[MIN_FILTER["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
    MIN_FILTER[MIN_FILTER["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
    MIN_FILTER[MIN_FILTER["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
})(MIN_FILTER || (MIN_FILTER = {}));
var TEXTURE_WRAP;
(function (TEXTURE_WRAP) {
    TEXTURE_WRAP[TEXTURE_WRAP["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
    TEXTURE_WRAP[TEXTURE_WRAP["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
    TEXTURE_WRAP[TEXTURE_WRAP["REPEAT"] = 10497] = "REPEAT";
})(TEXTURE_WRAP || (TEXTURE_WRAP = {}));
var GL_INTERNALFORMAT;
(function (GL_INTERNALFORMAT) {
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB"] = 6407] = "RGB";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGBA"] = 6408] = "RGBA";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["R8"] = 33321] = "R8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["R16F"] = 33325] = "R16F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["R32F"] = 33326] = "R32F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["R8UI"] = 33330] = "R8UI";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RG8"] = 33323] = "RG8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RG16F"] = 33327] = "RG16F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RG"] = 33319] = "RG";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RG32F"] = 33328] = "RG32F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB8"] = 32849] = "RGB8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["SRGB"] = 35904] = "SRGB";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["SRGB8"] = 35905] = "SRGB8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB565"] = 36194] = "RGB565";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB9_E5"] = 35901] = "RGB9_E5";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB16F"] = 34843] = "RGB16F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB32F"] = 34837] = "RGB32F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB8UI"] = 36221] = "RGB8UI";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGBA8"] = 32856] = "RGBA8";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGB5_A1"] = 32855] = "RGB5_A1";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGBA16F"] = 34842] = "RGBA16F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGBA32F"] = 34836] = "RGBA32F";
    GL_INTERNALFORMAT[GL_INTERNALFORMAT["RGBA8UI"] = 36220] = "RGBA8UI";
})(GL_INTERNALFORMAT || (GL_INTERNALFORMAT = {}));
//# sourceMappingURL=GLConstants.js.map

/***/ }),

/***/ "../lib/gl/constants/index.js":
/*!************************************!*\
  !*** ../lib/gl/constants/index.js ***!
  \************************************/
/*! exports provided: GL_TYPES, GL_TYPES_BYTESIZE, GL_PRIMITIVES, GL_BUFFERS, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP, GL_INTERNALFORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GLConstants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLConstants */ "../lib/gl/constants/GLConstants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES_BYTESIZE", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES_BYTESIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_PRIMITIVES", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["GL_PRIMITIVES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_BUFFERS", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["GL_BUFFERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MAG_FILTER", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["MAG_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MIN_FILTER", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["TEXTURE_WRAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_INTERNALFORMAT", function() { return _GLConstants__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gl/gl_util/defaultValue.js":
/*!*****************************************!*\
  !*** ../lib/gl/gl_util/defaultValue.js ***!
  \*****************************************/
/*! exports provided: DefaultValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultValue", function() { return DefaultValue; });
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var DefaultValue;
(function (DefaultValue) {
    function value(type, size) {
        switch (type) {
            case 'float':
                return 0;
            case 'vec2':
                return new Float32Array(2 * size);
            case 'vec3':
                return new Float32Array(3 * size);
            case 'vec4':
                return new Float32Array(4 * size);
            case 'int':
            case 'samplerCube':
            case 'sampler2D':
                return 0;
            case 'ivec2':
                return new Int32Array(2 * size);
            case 'ivec3':
                return new Int32Array(3 * size);
            case 'ivec4':
                return new Int32Array(4 * size);
            case 'bool':
                return false;
            case 'bvec2':
                return booleanArray(2 * size);
            case 'bvec3':
                return booleanArray(3 * size);
            case 'bvec4':
                return booleanArray(4 * size);
            case 'mat2':
                return new Float32Array([1, 0,
                    0, 1]);
            case 'mat3':
                return new Float32Array([1, 0, 0,
                    0, 1, 0,
                    0, 0, 1]);
            case 'mat4':
                return new Float32Array([1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1]);
            default:
                console.warn("no default value for type ", type);
        }
        function booleanArray(size) {
            let array = new Array(size);
            for (let i = 0; i < array.length; i++) {
                array[i] = false;
            }
            return array;
        }
    }
    DefaultValue.value = value;
})(DefaultValue || (DefaultValue = {}));
//# sourceMappingURL=defaultValue.js.map

/***/ }),

/***/ "../lib/gl/gl_util/glGet.js":
/*!**********************************!*\
  !*** ../lib/gl/gl_util/glGet.js ***!
  \**********************************/
/*! exports provided: glGetCurrentState, glResetState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glGetCurrentState", function() { return glGetCurrentState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "glResetState", function() { return glResetState; });
function glGetStates(gl) {
    return {
        "BLEND": gl.BLEND,
        "DEPTH_TEST": gl.DEPTH_TEST,
        "DITHER": gl.DITHER,
        "SCISSOR_TEST": gl.SCISSOR_TEST,
        "STENCIL_TEST": gl.STENCIL_TEST,
        "TEXTURE_2D": gl.TEXTURE_2D,
        "TEXTURE_3D": gl.TEXTURE_3D,
        "TEXTURE_CUBE_MAP": gl.TEXTURE_CUBE_MAP
    };
}
function glGetCurrentState(gl) {
    let states = glGetStates(gl);
    let str = "";
    for (let key in states) {
        if (gl.isEnabled(states[key])) {
            str += key + " is enabled!\n";
        }
        else {
            str += key + " is disabled!\n";
        }
    }
    return str;
}
function glResetState(gl) {
    let states = glGetStates(gl);
    for (let key in states) {
        gl.disable(states[key]);
    }
    gl.enable(gl.DITHER);
}
//# sourceMappingURL=glGet.js.map

/***/ }),

/***/ "../lib/gl/gl_util/index.js":
/*!**********************************!*\
  !*** ../lib/gl/gl_util/index.js ***!
  \**********************************/
/*! exports provided: DefaultValue, glGetCurrentState, glResetState, MapSize, MapType, WebGLUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _defaultValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultValue */ "../lib/gl/gl_util/defaultValue.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultValue", function() { return _defaultValue__WEBPACK_IMPORTED_MODULE_0__["DefaultValue"]; });

/* harmony import */ var _glGet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./glGet */ "../lib/gl/gl_util/glGet.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glGetCurrentState", function() { return _glGet__WEBPACK_IMPORTED_MODULE_1__["glGetCurrentState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glResetState", function() { return _glGet__WEBPACK_IMPORTED_MODULE_1__["glResetState"]; });

/* harmony import */ var _mapSize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapSize */ "../lib/gl/gl_util/mapSize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapSize", function() { return _mapSize__WEBPACK_IMPORTED_MODULE_2__["MapSize"]; });

/* harmony import */ var _mapType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mapType */ "../lib/gl/gl_util/mapType.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapType", function() { return _mapType__WEBPACK_IMPORTED_MODULE_3__["MapType"]; });

/* harmony import */ var _webglUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./webglUtil */ "../lib/gl/gl_util/webglUtil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLUtils", function() { return _webglUtil__WEBPACK_IMPORTED_MODULE_4__["WebGLUtils"]; });

/**
 * @file Automatically generated by barrelsby.
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gl/gl_util/mapSize.js":
/*!************************************!*\
  !*** ../lib/gl/gl_util/mapSize.js ***!
  \************************************/
/*! exports provided: MapSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapSize", function() { return MapSize; });
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var MapSize;
(function (MapSize) {
    var GLSL_TO_SIZE = {
        'float': 1,
        'vec2': 2,
        'vec3': 3,
        'vec4': 4,
        'int': 1,
        'ivec2': 2,
        'ivec3': 3,
        'ivec4': 4,
        'bool': 1,
        'bvec2': 2,
        'bvec3': 3,
        'bvec4': 4,
        'mat2': 4,
        'mat3': 9,
        'mat4': 16,
        'sampler2D': 1
    };
    /**
     * Returns the componentTypeCount in Bytes needed for the provided GLSL Type in WebGL
     * @param type
     * @returns {any}
     */
    function map(type) {
        return GLSL_TO_SIZE[type];
    }
    MapSize.map = map;
})(MapSize || (MapSize = {}));
//# sourceMappingURL=mapSize.js.map

/***/ }),

/***/ "../lib/gl/gl_util/mapType.js":
/*!************************************!*\
  !*** ../lib/gl/gl_util/mapType.js ***!
  \************************************/
/*! exports provided: MapType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapType", function() { return MapType; });
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
/**
 * Maps the WebGL Types to the convenient GLSL Types
 */
var MapType;
(function (MapType) {
    var GL_TABLE = null;
    var GL_TO_GLSL_TYPES = {
        'FLOAT': 'float',
        'FLOAT_VEC2': 'vec2',
        'FLOAT_VEC3': 'vec3',
        'FLOAT_VEC4': 'vec4',
        'INT': 'int',
        'INT_VEC2': 'ivec2',
        'INT_VEC3': 'ivec3',
        'INT_VEC4': 'ivec4',
        'BOOL': 'bool',
        'BOOL_VEC2': 'bvec2',
        'BOOL_VEC3': 'bvec3',
        'BOOL_VEC4': 'bvec4',
        'FLOAT_MAT2': 'mat2',
        'FLOAT_MAT3': 'mat3',
        'FLOAT_MAT4': 'mat4',
        'SAMPLER_2D': 'sampler2D',
        'SAMPLER_CUBE': 'samplerCube'
    };
    function map(gl, type) {
        if (!GL_TABLE) {
            let typeNames = Object.keys(GL_TO_GLSL_TYPES);
            GL_TABLE = {};
            for (let i = 0; i < typeNames.length; i++) {
                let tn = typeNames[i];
                GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
            }
        }
        return GL_TABLE[type];
    }
    MapType.map = map;
})(MapType || (MapType = {}));
//# sourceMappingURL=mapType.js.map

/***/ }),

/***/ "../lib/gl/gl_util/webglUtil.js":
/*!**************************************!*\
  !*** ../lib/gl/gl_util/webglUtil.js ***!
  \**************************************/
/*! exports provided: WebGLUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebGLUtils", function() { return WebGLUtils; });
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
var WebGLUtils;
(function (WebGLUtils) {
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
    function makeFailHTML(msg) {
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
    function setupWebGL(canvas, opt_attribs, opt_onError) {
        function handleCreationError(msg) {
            let container = document.getElementsByTagName("body")[0];
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
            canvas.addEventListener("webglcontextcreationerr", (event) => {
                onError(event.statusMessage);
            }, false);
        }
        let context = create3DContext(canvas, opt_attribs);
        if (!context) {
            if (!window['WebGL2RenderingContext']) {
                onError("");
            }
            else {
                onError("");
            }
        }
        return context;
    }
    WebGLUtils.setupWebGL = setupWebGL;
    /**
     * Creates a webgl context.
     * @param {!Canvas} canvas The canvas tag to get context
     *     from. If one is not passed in one will be created.
     * @return {!WebGLContext} The created context.
     */
    function create3DContext(canvas, opt_attribs) {
        let names = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        for (let name of names) {
            try {
                context = canvas.getContext(name, opt_attribs);
            }
            catch (e) {
            }
            if (context) {
                break;
            }
        }
        return context;
    }
    WebGLUtils.create3DContext = create3DContext;
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
                function (callback, element) {
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
})(WebGLUtils || (WebGLUtils = {}));
//# sourceMappingURL=webglUtil.js.map

/***/ }),

/***/ "../lib/gl/index.js":
/*!**************************!*\
  !*** ../lib/gl/index.js ***!
  \**************************/
/*! exports provided: GLBuffer, GLCube, GLCubemap, GLFramebuffer, GLQuad, GLSphere, GLTexture, GLUniformBufferObject, GLVertexArrayObject, GL_TYPES, GL_TYPES_BYTESIZE, GL_PRIMITIVES, GL_BUFFERS, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP, GL_INTERNALFORMAT, DefaultValue, glGetCurrentState, glResetState, MapSize, MapType, WebGLUtils, Attributes, GLShader, ProgramCompiler, Uniforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GLBuffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLBuffer */ "../lib/gl/GLBuffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLBuffer", function() { return _GLBuffer__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"]; });

/* harmony import */ var _GLCube__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLCube */ "../lib/gl/GLCube.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLCube", function() { return _GLCube__WEBPACK_IMPORTED_MODULE_1__["GLCube"]; });

/* harmony import */ var _GLCubemap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GLCubemap */ "../lib/gl/GLCubemap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLCubemap", function() { return _GLCubemap__WEBPACK_IMPORTED_MODULE_2__["GLCubemap"]; });

/* harmony import */ var _GLFramebuffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GLFramebuffer */ "../lib/gl/GLFramebuffer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLFramebuffer", function() { return _GLFramebuffer__WEBPACK_IMPORTED_MODULE_3__["GLFramebuffer"]; });

/* harmony import */ var _GLQuad__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GLQuad */ "../lib/gl/GLQuad.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLQuad", function() { return _GLQuad__WEBPACK_IMPORTED_MODULE_4__["GLQuad"]; });

/* harmony import */ var _GLSphere__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GLSphere */ "../lib/gl/GLSphere.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLSphere", function() { return _GLSphere__WEBPACK_IMPORTED_MODULE_5__["GLSphere"]; });

/* harmony import */ var _GLTexture__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GLTexture */ "../lib/gl/GLTexture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTexture", function() { return _GLTexture__WEBPACK_IMPORTED_MODULE_6__["GLTexture"]; });

/* harmony import */ var _GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GLUniformBufferObject */ "../lib/gl/GLUniformBufferObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLUniformBufferObject", function() { return _GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_7__["GLUniformBufferObject"]; });

/* harmony import */ var _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GLVertexArrayObject */ "../lib/gl/GLVertexArrayObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLVertexArrayObject", function() { return _GLVertexArrayObject__WEBPACK_IMPORTED_MODULE_8__["GLVertexArrayObject"]; });

/* harmony import */ var _constants_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants/index */ "../lib/gl/constants/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["GL_TYPES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES_BYTESIZE", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["GL_TYPES_BYTESIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_PRIMITIVES", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["GL_PRIMITIVES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_BUFFERS", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["GL_BUFFERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MAG_FILTER", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["MAG_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MIN_FILTER", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["MIN_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["TEXTURE_WRAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_INTERNALFORMAT", function() { return _constants_index__WEBPACK_IMPORTED_MODULE_9__["GL_INTERNALFORMAT"]; });

/* harmony import */ var _gl_util_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./gl_util/index */ "../lib/gl/gl_util/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultValue", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["DefaultValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glGetCurrentState", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["glGetCurrentState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glResetState", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["glResetState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapSize", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["MapSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapType", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["MapType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLUtils", function() { return _gl_util_index__WEBPACK_IMPORTED_MODULE_10__["WebGLUtils"]; });

/* harmony import */ var _shader_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shader/index */ "../lib/gl/shader/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_11__["Attributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLShader", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_11__["GLShader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgramCompiler", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_11__["ProgramCompiler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uniforms", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_11__["Uniforms"]; });

/**
 * @file Automatically generated by barrelsby.
 */












//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gl/shader/GLAttribute.js":
/*!***************************************!*\
  !*** ../lib/gl/shader/GLAttribute.js ***!
  \***************************************/
/*! exports provided: Attributes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return Attributes; });
/* harmony import */ var _gl_util_mapType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gl_util/mapType */ "../lib/gl/gl_util/mapType.js");
/* harmony import */ var _gl_util_mapSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gl_util/mapSize */ "../lib/gl/gl_util/mapSize.js");
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


var Attributes;
(function (Attributes) {
    class AttributeMap {
        constructor() {
            this.attributeMap = {};
        }
        add(key, attribute) {
            this.attributeMap[key] = attribute;
        }
        remove(key) {
            if (this.attributeMap[key]) {
                this.attributeMap[key] = undefined;
            }
        }
        hasAttribute(key) {
            return !!this.attributeMap[key];
        }
        getAttribute(key) {
            return this.attributeMap[key];
        }
    }
    Attributes.AttributeMap = AttributeMap;
    class GLAttribute {
        constructor(gl, type, size, location) {
            this.gl = gl;
            this.type = type;
            this.size = size;
            this.location = location;
        }
        pointer(type, normalized, stride, start) {
            this.gl.vertexAttribPointer(this.location, this.size, type || this.gl.FLOAT, normalized || false, stride || 0, start || 0);
        }
    }
    Attributes.GLAttribute = GLAttribute;
    function extract(gl, program) {
        const attributes = new AttributeMap();
        const totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < totalAttributes; i++) {
            const attribData = gl.getActiveAttrib(program, i);
            const type = _gl_util_mapType__WEBPACK_IMPORTED_MODULE_0__["MapType"].map(gl, attribData.type);
            attributes.add(attribData.name, new GLAttribute(gl, type, _gl_util_mapSize__WEBPACK_IMPORTED_MODULE_1__["MapSize"].map(type), gl.getAttribLocation(program, attribData.name)));
        }
        return attributes;
    }
    Attributes.extract = extract;
})(Attributes || (Attributes = {}));
//# sourceMappingURL=GLAttribute.js.map

/***/ }),

/***/ "../lib/gl/shader/GLShader.js":
/*!************************************!*\
  !*** ../lib/gl/shader/GLShader.js ***!
  \************************************/
/*! exports provided: GLShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLShader", function() { return GLShader; });
/* harmony import */ var _programCompiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./programCompiler */ "../lib/gl/shader/programCompiler.js");
/* harmony import */ var _GLAttribute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLAttribute */ "../lib/gl/shader/GLAttribute.js");
/* harmony import */ var _uniform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uniform */ "../lib/gl/shader/uniform.js");
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */



class GLShader {
    constructor(gl, vertexSrc, fragmentSrc) {
        this.gl = gl;
        this._defines = Object.create(null);
        this._vertexSrc = vertexSrc;
        this._fragmentSrc = fragmentSrc;
    }
    getDefinesString() {
        let defineString = "";
        for (let key in this._defines) {
            defineString += "#define " + key + " " + this._defines[key] + "\n";
        }
        return defineString;
    }
    getShaderSrcWithDefines(src) {
        const shaderDefines = this.getDefinesString();
        const secondLineIdx = src.indexOf("\n");
        const firstLine = src.substr(0, secondLineIdx);
        const shaderSrc = src.substr(secondLineIdx);
        if (firstLine.indexOf("#version") != -1) {
            return firstLine + shaderDefines + shaderSrc;
        }
        return shaderDefines + firstLine + shaderSrc;
    }
    upload() {
        const gl = this.gl;
        const vertexSrcWithDefines = this.getShaderSrcWithDefines(this._vertexSrc);
        const fragmentSrcWithDefines = this.getShaderSrcWithDefines(this._fragmentSrc);
        this._program = _programCompiler__WEBPACK_IMPORTED_MODULE_0__["ProgramCompiler"].compile(gl, vertexSrcWithDefines, fragmentSrcWithDefines);
        this._attributes = _GLAttribute__WEBPACK_IMPORTED_MODULE_1__["Attributes"].extract(gl, this._program);
        const uniformData = _uniform__WEBPACK_IMPORTED_MODULE_2__["Uniforms"].extract(gl, this._program);
        this._uniforms = _uniform__WEBPACK_IMPORTED_MODULE_2__["Uniforms"].generateUniformAccessObject(gl, uniformData, this._program);
        return this;
    }
    addDefine(def, value) {
        this._defines[def] = value;
    }
    removeDefine(def, value) {
        delete this._defines[def];
    }
    get program() {
        return this._program;
    }
    set program(program) {
        this._program = program;
    }
    set attributes(attributes) {
        this._attributes = attributes;
    }
    get attributes() {
        return this._attributes;
    }
    set uniforms(uniforms) {
        this.uniforms = uniforms;
    }
    get uniforms() {
        return this._uniforms;
    }
    get defines() {
        return this._defines;
    }
    set defines(value) {
        this._defines = value;
    }
    /**
     * Bind this shader and tells the WebGLContext to use it
     */
    bind() {
        this.gl.useProgram(this.program);
        return this;
    }
    /**
     * Unbinds this Shader and tells the WebGLContext to use no shader
     */
    unbind() {
        this.gl.useProgram(null);
        return this;
    }
    /**
     * Destroy the program unloads it from the gpu
     */
    unload() {
        this.gl.deleteProgram(this.program);
        this._program = null;
        this._attributes = null;
        this._uniforms = null;
        this._defines = Object.create(null);
    }
    /**
     * Destroys the program in the WebGLContext nulls all objects in the Shader
     */
    destroy() {
        this.gl.deleteProgram(this.program);
        this.gl = null;
        this._program = null;
        this._attributes = null;
        this._uniforms = null;
        this._defines = null;
        this._vertexSrc = null;
        this._fragmentSrc = null;
    }
    get vertexSrc() {
        return this._vertexSrc;
    }
    set vertexSrc(value) {
        this._vertexSrc = value;
    }
    get fragmentSrc() {
        return this._fragmentSrc;
    }
    set fragmentSrc(value) {
        this._fragmentSrc = value;
    }
}
//# sourceMappingURL=GLShader.js.map

/***/ }),

/***/ "../lib/gl/shader/index.js":
/*!*********************************!*\
  !*** ../lib/gl/shader/index.js ***!
  \*********************************/
/*! exports provided: Attributes, GLShader, ProgramCompiler, Uniforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GLAttribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLAttribute */ "../lib/gl/shader/GLAttribute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return _GLAttribute__WEBPACK_IMPORTED_MODULE_0__["Attributes"]; });

/* harmony import */ var _GLShader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLShader */ "../lib/gl/shader/GLShader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLShader", function() { return _GLShader__WEBPACK_IMPORTED_MODULE_1__["GLShader"]; });

/* harmony import */ var _programCompiler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./programCompiler */ "../lib/gl/shader/programCompiler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgramCompiler", function() { return _programCompiler__WEBPACK_IMPORTED_MODULE_2__["ProgramCompiler"]; });

/* harmony import */ var _uniform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniform */ "../lib/gl/shader/uniform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uniforms", function() { return _uniform__WEBPACK_IMPORTED_MODULE_3__["Uniforms"]; });

/**
 * @file Automatically generated by barrelsby.
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gl/shader/programCompiler.js":
/*!*******************************************!*\
  !*** ../lib/gl/shader/programCompiler.js ***!
  \*******************************************/
/*! exports provided: ProgramCompiler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramCompiler", function() { return ProgramCompiler; });
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ProgramCompiler;
(function (ProgramCompiler) {
    /**
     * @class
     * @param gl {WebGL2RenderingContext} The current WebGL context {WebGLProgram}
     * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
     * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
     * @return {WebGLProgram} the shader program
     */
    function compile(gl, vertexSrc, fragmentSrc) {
        let glVertShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
        let glFragShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
        if (!glVertShader || !glFragShader) {
            return;
        }
        let program = gl.createProgram(); //Create Program which combines two compiled Shaders
        if (!program) {
            console.error('Failed to create Programm');
            return null;
        }
        gl.attachShader(program, glVertShader); //Attach OBJ_Vertex Shader
        gl.attachShader(program, glFragShader); //Attach Fragment Shader
        gl.linkProgram(program); // Then Link the program to the webgl context
        //Check if linking succeeded
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Shader Program Linking failed. Could not initialize Shader.');
            console.error("gl.VALIDATE_STATUS " + gl.getProgramParameter(program, gl.VALIDATE_STATUS));
            console.error('gl.getError(): ' + gl.getError());
            //check if their is a program info log
            if (gl.getProgramInfoLog(program) !== '') {
                console.warn('gl.getProgramInfoLog(): ' + gl.getProgramInfoLog(program));
            }
            gl.deleteProgram(program);
            program = null;
        }
        //Clean up the created shader
        gl.deleteShader(glVertShader);
        gl.deleteShader(glFragShader);
        //Finally return the compiled program
        return program;
    }
    ProgramCompiler.compile = compile;
    /**
     * @private
     * @param gl {WebGL2RenderingContext} The current WebGL context {WebGLProgram}
     * @param type {Number} the type, can be either VERTEX_SHADER or FRAGMENT_SHADER
     * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
     * @return {WebGLShader} the shader
     */
    function compileShader(gl, type, vertexSrc) {
        let shader = gl.createShader(type);
        if (shader == null) {
            console.error("Unable to create shader");
            return null;
        }
        gl.shaderSource(shader, vertexSrc);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Failed to compile shader: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
})(ProgramCompiler || (ProgramCompiler = {}));
//# sourceMappingURL=programCompiler.js.map

/***/ }),

/***/ "../lib/gl/shader/uniform.js":
/*!***********************************!*\
  !*** ../lib/gl/shader/uniform.js ***!
  \***********************************/
/*! exports provided: Uniforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uniforms", function() { return Uniforms; });
/* harmony import */ var _gl_util_mapType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gl_util/mapType */ "../lib/gl/gl_util/mapType.js");
/* harmony import */ var _gl_util_defaultValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gl_util/defaultValue */ "../lib/gl/gl_util/defaultValue.js");
/*
 * This file contains code that was taken from, or heavily based upon, code
 * from the pixi.js project. Those sections are used under the terms of The
 * Pixi License, detailed below:
 *
 * The Pixi License
 *
 * Copyright (c) 2013-2016 Mathew Groves
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


var Uniforms;
(function (Uniforms) {
    var getterTemplate = [
        'return this.data.%%.value;'
    ].join('\n');
    var setterTemplate = [
        'this.data.%%.value = value;',
        'var location = this.data.%%.location;'
    ].join('\n');
    var GLSL_TO_SINGLE_SETTERS = {
        'float': 'uniform1f(location, value)',
        'vec2': 'uniform2f(location, value[0], value[1])',
        'vec3': 'uniform3f(location, value[0], value[1], value[2])',
        'vec4': 'uniform4f(location, value[0], value[1], value[2], value[3])',
        'int': 'uniform1i(location, value)',
        'ivec2': 'uniform2i(location, value[0], value[1])',
        'ivec3': 'uniform3i(location, value[0], value[1], value[2])',
        'ivec4': 'uniform4i(location, value[0], value[1], value[2], value[3])',
        'bool': 'uniform1i(location, value)',
        'bvec2': 'uniform2i(location, value[0], value[1])',
        'bvec3': 'uniform3i(location, value[0], value[1], value[2])',
        'bvec4': 'uniform4i(location, value[0], value[1], value[2], value[3])',
        'mat2': 'uniformMatrix2fv(location, false, value)',
        'mat3': 'uniformMatrix3fv(location, false, value)',
        'mat4': 'uniformMatrix4fv(location, false, value)',
        'sampler2D': 'uniform1i(location, value)',
        'samplerCube': 'uniform1i(location, value)',
        'ubo': 'uniformBlockBinding(this.program, location, value)'
    };
    var GLSL_TO_ARRAY_SETTERS = {
        'float': 'uniform1fv(location, value)',
        'vec2': 'uniform2fv(location, value)',
        'vec3': 'uniform3fv(location, value)',
        'vec4': 'uniform4fv(location, value)',
        'int': 'uniform1iv(location, value)',
        'ivec2': 'uniform2iv(location, value)',
        'ivec3': 'uniform3iv(location, value)',
        'ivec4': 'uniform4iv(location, value)',
        'bool': 'uniform1iv(location, value)',
        'bvec2': 'uniform2iv(location, value)',
        'bvec3': 'uniform3iv(location, value)',
        'bvec4': 'uniform4iv(location, value)',
        'sampler2D': 'uniform1iv(location, value)',
        'samplerCube': 'uniform1iv(location, value)'
    };
    class Uniform {
        constructor(type, size, location, value) {
            this.type = type;
            this.size = size;
            this.location = location;
            this.value = value;
        }
    }
    Uniforms.Uniform = Uniform;
    class UniformMap {
        constructor() {
            this.uniformMap = {};
        }
        add(key, attribute) {
            this.uniformMap[key] = attribute;
        }
        get(key) {
            return this.uniformMap[key];
        }
        remove(key) {
            if (this.uniformMap[key]) {
                this.uniformMap[key] = undefined;
            }
        }
        get keys() {
            return Object.keys(this.uniformMap);
        }
    }
    Uniforms.UniformMap = UniformMap;
    class UniformAccessObject {
        constructor(gl, program) {
            this.data = {};
            this._gl = gl;
            this._program = program;
        }
        get gl() {
            return this._gl;
        }
        set gl(gl) {
            this._gl = gl;
        }
        get program() {
            return this._program;
        }
        set program(value) {
            this._program = value;
        }
    }
    Uniforms.UniformAccessObject = UniformAccessObject;
    function extract(gl, program) {
        const uniforms = new UniformMap();
        //Get Uniform Blocks
        const ubos = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);
        for (let i = 0; i < ubos; i++) {
            let name = gl.getActiveUniformBlockName(program, i);
            name = name.replace(/\[.*?\]/, "");
            uniforms.add(name, new Uniform("ubo", 1, i, null));
        }
        //Get uniforms
        const totalUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < totalUniforms; i++) {
            const uniformData = gl.getActiveUniform(program, i);
            const name = uniformData.name.replace(/\[.*?\]/, "");
            const type = _gl_util_mapType__WEBPACK_IMPORTED_MODULE_0__["MapType"].map(gl, uniformData.type);
            const location = gl.getUniformLocation(program, name); //null if its a uniform block value
            if (location !== undefined && location !== null) {
                uniforms.add(name, new Uniform(type, uniformData.size, gl.getUniformLocation(program, name), _gl_util_defaultValue__WEBPACK_IMPORTED_MODULE_1__["DefaultValue"].value(type, uniformData.size)));
            }
        }
        return uniforms;
    }
    Uniforms.extract = extract;
    function generateUniformAccessObject(gl, uniformData, program) {
        const uniforms = new UniformAccessObject(gl, program);
        const uniformKeys = uniformData.keys;
        for (let i = 0; i < uniformKeys.length; i++) {
            const fullName = uniformKeys[i];
            const nameTokens = fullName.split(".");
            const name = nameTokens[nameTokens.length - 1];
            const uniformGroup = getUniformGroup(nameTokens, uniforms);
            const uniform = uniformData.get(fullName);
            uniformGroup.data[name] = uniform;
            uniformGroup.gl = gl;
            Object.defineProperty(uniformGroup, name, generatePropertyDescriptor(name, uniform));
        }
        return uniforms;
    }
    Uniforms.generateUniformAccessObject = generateUniformAccessObject;
    function getUniformGroup(nameTokens, uniform) {
        let cur = uniform;
        for (let i = 0; i < nameTokens.length - 1; i++) {
            const o = cur[nameTokens[i]] || { data: {} };
            cur[nameTokens[i]] = o;
            cur = o;
        }
        return cur;
    }
    function generatePropertyDescriptor(name, uniform) {
        return {
            get: generateGetter(name),
            set: generateSetter(name, uniform)
        };
    }
    function generateGetter(name) {
        let template = getterTemplate.replace('%%', name);
        return new Function(template);
    }
    function generateSetter(name, uniform) {
        let template = setterTemplate.replace(/%%/g, name);
        let setTemplate;
        if (uniform.size === 1) {
            setTemplate = GLSL_TO_SINGLE_SETTERS[uniform.type];
        }
        else {
            setTemplate = GLSL_TO_ARRAY_SETTERS[uniform.type];
        }
        if (setTemplate) {
            template += "\nthis.gl." + setTemplate + ";";
        }
        return new Function('value', template);
    }
})(Uniforms || (Uniforms = {}));
//# sourceMappingURL=uniform.js.map

/***/ }),

/***/ "../lib/gltf/Base64Binary.js":
/*!***********************************!*\
  !*** ../lib/gltf/Base64Binary.js ***!
  \***********************************/
/*! exports provided: Base64Binary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base64Binary", function() { return Base64Binary; });
class Base64Binary {
    static decodeArrayBuffer(input) {
        const bytes = (input.length / 4) * 3;
        const ab = new ArrayBuffer(bytes);
        Base64Binary.decode(input, null, ab);
        return ab;
    }
    static removePaddingChars(input) {
        const lkey = Base64Binary._keyStr.indexOf(input.charAt(input.length - 1));
        if (lkey === 64) {
            return input.substring(0, input.length - 1);
        }
        return input;
    }
    static decode(input, byteLength, arrayBuffer) {
        //get last chars to see if are valid
        input = Base64Binary.removePaddingChars(input);
        //@ts-ignore
        const bytes = parseInt((input.length / 4) * 3, 10);
        const offset = byteLength !== undefined ? bytes - byteLength : 0;
        const uarray = arrayBuffer ? new Uint8Array(arrayBuffer) : new Uint8Array(bytes);
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        for (let i = 0, j = 0; i < bytes; i += 3) {
            const enc1 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc2 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc3 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc4 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;
            uarray[i] = chr1;
            if (enc3 != 64)
                uarray[i + 1] = chr2;
            if (enc4 != 64)
                uarray[i + 2] = chr3;
        }
        return uarray.slice(offset, bytes);
    }
}
Base64Binary._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//# sourceMappingURL=Base64Binary.js.map

/***/ }),

/***/ "../lib/gltf/GLTFAccessorProcessor.js":
/*!********************************************!*\
  !*** ../lib/gltf/GLTFAccessorProcessor.js ***!
  \********************************************/
/*! exports provided: GLTFAccessorProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFAccessorProcessor", function() { return GLTFAccessorProcessor; });
/* harmony import */ var _scene_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/data */ "../lib/scene/data/index.js");
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gl/constants */ "../lib/gl/constants/index.js");


class GLTFAccessorProcessor {
    constructor(model) {
        this.buffers = [];
        this.model = model;
    }
    /**
     * get/create the BufferViewObject for this accessor
     * @param accessor
     * @param idx
     * @param isIndexBuffer
     */
    getBufferView(idx, isIndexBuffer = false) {
        const gltf = this.model.gltf;
        if (!this.buffers[idx]) {
            this.buffers[idx] = this.createBufferView(gltf.bufferViews[idx]);
        }
        //get the bufferView
        const view = this.buffers[idx];
        //set target for the BufferView IndexBuffer or Vertex/ArrayBuffer
        view.target = isIndexBuffer ? view.target || _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_BUFFERS"].ELEMENT_ARRAY_BUFFER : view.target || _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_BUFFERS"].ARRAY_BUFFER;
        return view;
    }
    getAccessorData(accessor) {
        return this.accessor2TypedArray(this.getBufferView(accessor.bufferView).data, accessor.byteOffset, _scene_data__WEBPACK_IMPORTED_MODULE_0__["GLTF_ACCESORTYPE_SIZE"][accessor.type] * accessor.count, accessor.componentType);
    }
    /**
     * Create a Bufferfiew from the GLTF_Bufferview
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {IGLTF_BufferView} bufferView
     * @returns {BufferView}
     */
    createBufferView(bufferView) {
        const view = new _scene_data__WEBPACK_IMPORTED_MODULE_0__["BufferView"]();
        view.data = this.sliceBuffer(bufferView);
        view.target = bufferView.target;
        return view;
    }
    /**
     * Slice up the Mesh data ArrayBuffer into smaller ArrayBuffers
     * @param {Array<ArrayBuffer|ArrayBufferView>} buffers
     * @param {BufferView} view
     * @returns {ArrayBuffer}
     */
    sliceBuffer(view) {
        const data = this.model.data[view.buffer];
        const offset = view.byteOffset || 0;
        if (data instanceof ArrayBuffer) {
            return data.slice(offset, offset + view.byteLength);
        }
        else {
            return data['buffer'].slice(offset, offset + view.byteLength);
        }
    }
    accessor2TypedArray(buffer, byteOffset, count, componentType) {
        switch (componentType) {
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].BYTE:
                return new Int8Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].UNSIGNED_BYTE:
                return new Uint8Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].SHORT:
                return new Int16Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].UNSIGNED_SHORT:
                return new Int16Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].INT:
                return new Int32Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].UNSIGNED_INT:
                return new Int32Array(buffer, byteOffset, count);
            case _gl_constants__WEBPACK_IMPORTED_MODULE_1__["GL_TYPES"].FLOAT:
                return new Float32Array(buffer, byteOffset, count);
        }
    }
}
//# sourceMappingURL=GLTFAccessorProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFAnimationProcessor.js":
/*!*********************************************!*\
  !*** ../lib/gltf/GLTFAnimationProcessor.js ***!
  \*********************************************/
/*! exports provided: GLTFAnimationProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFAnimationProcessor", function() { return GLTFAnimationProcessor; });
/* harmony import */ var _scene_animation_animationSampler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/animation/animationSampler */ "../lib/scene/animation/animationSampler.js");
/* harmony import */ var _scene_data_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scene/data/accessor */ "../lib/scene/data/accessor.js");
/* harmony import */ var _scene_animation_animationChannel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scene/animation/animationChannel */ "../lib/scene/animation/animationChannel.js");
/* harmony import */ var _scene_animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scene/animation */ "../lib/scene/animation/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");





class GLTFAnimationProcessor {
    constructor(model) {
        this.model = model;
        this.cache = this.model.cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_4__["CACHE_TYPE"].ANIMATION);
    }
    processAnimations() {
        this._animations = [];
        const gltf = this.model.gltf;
        gltf.animations = gltf.animations || [];
        for (let i = 0; i < gltf.animations.length; i++) {
            this._animations.push(this.processAnimation(i));
        }
        return this._animations;
    }
    processAnimation(idx) {
        const animation = new _scene_animation__WEBPACK_IMPORTED_MODULE_3__["Animation"]();
        const gltfAnimation = this.model.gltf.animations[idx];
        animation.name = gltfAnimation.name || "animation" + idx;
        for (let i = 0, sampler; sampler = gltfAnimation.samplers[i]; i++) {
            const animationSampler = this.processSampler(sampler);
            animation.addSampler(animationSampler);
            animation.duration = animation.duration < animationSampler.duration ? animationSampler.duration : animation.duration;
        }
        for (let i = 0, channel; channel = gltfAnimation.channels[i]; i++) {
            animation.addChannel(this.processChannel(channel));
        }
        this.cache.add(animation.name, animation);
        return animation;
    }
    processSampler(sampler) {
        const gltf = this.model.gltf;
        const animationSampler = new _scene_animation_animationSampler__WEBPACK_IMPORTED_MODULE_0__["AnimationSampler"]();
        animationSampler.interpolation = sampler.interpolation || _scene_animation_animationSampler__WEBPACK_IMPORTED_MODULE_0__["Interpolation"].LINEAR;
        const inputAccessor = this.createAccessor(gltf.accessors[sampler.input]);
        const outputAccessor = this.createAccessor(gltf.accessors[sampler.output]);
        animationSampler.inputData = this.model.getAccessorData(inputAccessor);
        animationSampler.outputData = this.model.getAccessorData(outputAccessor);
        animationSampler.componentTypeCount = outputAccessor.componentTypeCount;
        animationSampler.duration = animationSampler.inputData[animationSampler.inputData.length - 1];
        return animationSampler;
    }
    processChannel(channel) {
        const animationChannel = new _scene_animation_animationChannel__WEBPACK_IMPORTED_MODULE_2__["AnimationChannel"]();
        animationChannel.sampler = channel.sampler;
        animationChannel.node = this.model.getNode(channel.target.node);
        animationChannel.path = channel.target.path;
        return animationChannel;
    }
    createAccessor(gltfAccessor) {
        const gltf = this.model.gltf;
        const accessor = new _scene_data_accessor__WEBPACK_IMPORTED_MODULE_1__["Accessor"]();
        accessor.bufferView = gltfAccessor.bufferView;
        accessor.byteOffset = gltfAccessor.byteOffset || 0;
        accessor.normalized = gltfAccessor.normalized;
        accessor.type = gltfAccessor.type;
        accessor.componentType = gltfAccessor.componentType;
        accessor.count = gltfAccessor.count;
        accessor.min = gltfAccessor.min || [];
        accessor.max = gltfAccessor.max || [];
        accessor.stride = gltf.bufferViews[gltfAccessor.bufferView].byteStride || 0;
        return accessor;
    }
    get animations() {
        return this._animations;
    }
    set animations(value) {
        this._animations = value;
    }
}
//# sourceMappingURL=GLTFAnimationProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFMaterialProcessor.js":
/*!********************************************!*\
  !*** ../lib/gltf/GLTFMaterialProcessor.js ***!
  \********************************************/
/*! exports provided: GLTFMaterialProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFMaterialProcessor", function() { return GLTFMaterialProcessor; });
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../material */ "../lib/material/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");
/* harmony import */ var _material_metallicRoughness__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../material/metallicRoughness */ "../lib/material/metallicRoughness.js");
/* harmony import */ var _loader_TextureLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loader/TextureLoader */ "../lib/loader/TextureLoader.js");
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gl/constants */ "../lib/gl/constants/index.js");





class GLTFMaterialProcessor {
    constructor(model) {
        this.model = model;
        this.materialCache = this.model.cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].MATERIAL);
    }
    processMaterial(materialIdx) {
        const gltf = this.model.gltf;
        const gl = this.model.gl;
        //set node name if not already provided
        const materialNode = gltf.materials[materialIdx];
        const cachedMat = this.materialCache.get(materialNode.name);
        if (cachedMat) {
            return cachedMat;
        }
        materialNode.name = materialNode.name || "material" + materialIdx;
        let material;
        if (materialNode.extensions && materialNode.extensions.KHR_materials_pbrSpecularGlossiness) {
            throw "specular glossiness gltf is not supported";
        }
        else {
            material = new _material__WEBPACK_IMPORTED_MODULE_0__["Material"](materialNode.name);
            this.parsePBRMaterial(materialNode, material);
        }
        if (materialNode.emissiveFactor) {
            material.model.emissiveFactor.set(materialNode.emissiveFactor);
        }
        //TODO: alphaMode
        //TODO: alphaCutoff
        //TODO: double sided
        if (materialNode.emissiveTexture) {
            this.parseTexture(material, materialNode.emissiveTexture.index, _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"].EMISSIVE, {
                premultiplyAlpha: false,
                internalFormat: gl.SRGB8_ALPHA8,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }
        if (materialNode.normalTexture) {
            material.model.normalScale = materialNode.normalTexture.scale || 1;
            this.parseTexture(material, materialNode.normalTexture.index, _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"].NORMAL, {
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }
        if (materialNode.occlusionTexture) {
            material.model.occlusionStrength = materialNode.occlusionTexture.strength || 1;
            this.parseTexture(material, materialNode.occlusionTexture.index, _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"].OCCLUSION, {
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }
        this.materialCache.add(material.name, material);
        return material;
    }
    parsePBRMaterial(materialNode, material) {
        const pbr = materialNode.pbrMetallicRoughness;
        material.type = _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_TYPES"].PBR;
        const gl = this.model.gl;
        if (!material.model) {
            material.model = new _material_metallicRoughness__WEBPACK_IMPORTED_MODULE_2__["MetallicRoughness"]();
        }
        if (pbr.baseColorFactor) {
            material.model.baseColorFactor.set(pbr.baseColorFactor);
        }
        if (pbr.metallicFactor !== null
            && pbr.metallicFactor !== undefined) {
            material.model.metallicFactor = pbr.metallicFactor;
        }
        if (pbr.roughnessFactor !== null
            && pbr.roughnessFactor !== undefined) {
            material.model.roughnessFactor = pbr.roughnessFactor;
        }
        //AlbedoTexture
        if (pbr.baseColorTexture !== undefined && pbr.baseColorTexture !== null) {
            this.parseTexture(material, pbr.baseColorTexture.index, _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"].ALBEDO, {
                premultiplyAlpha: false,
                internalFormat: gl.SRGB8_ALPHA8,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }
        //Metallic Roughness Texture
        if (pbr.metallicRoughnessTexture !== undefined && pbr.metallicRoughnessTexture !== null) {
            this.parseTexture(material, pbr.metallicRoughnessTexture.index, _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"].METAL_ROUGHNESS, {
                premultiplyAlpha: false,
                internalFormat: gl.RGBA,
                format: gl.RGBA,
                type: gl.UNSIGNED_BYTE,
            });
        }
    }
    /**
     * Load the Texture defined by the corresponding image and sampler
     * @param {Material} material
     * @param {number} index
     * @param {number} map
     * @param {TextureLoaderConfig} config
     */
    parseTexture(material, index, map, config) {
        if (index === null || index === undefined) {
            return;
        }
        const gltf = this.model.gltf;
        const loader = this.model.loader;
        const path = this.model.path;
        let img;
        if (gltf.textures[index].source !== undefined && gltf.textures[index].source !== null) {
            img = gltf.images[gltf.textures[index].source];
        }
        if (gltf.textures[index].sampler !== undefined && gltf.textures[index].sampler !== null) {
            config.sampler = gltf.samplers[gltf.textures[index].sampler];
        }
        else {
            config.sampler = {
                wrapS: _gl_constants__WEBPACK_IMPORTED_MODULE_4__["TEXTURE_WRAP"].REPEAT,
                wrapT: _gl_constants__WEBPACK_IMPORTED_MODULE_4__["TEXTURE_WRAP"].REPEAT
            };
        }
        //TODO: Parse img from data
        loader.get(_loader_TextureLoader__WEBPACK_IMPORTED_MODULE_3__["TextureLoader"]).add(img.name || img.uri, path + img.uri, config);
        material.maps[map] = new _material__WEBPACK_IMPORTED_MODULE_0__["Materialmap"](img.name || img.uri);
        material.maps[map].sampler = config.sampler;
    }
}
//# sourceMappingURL=GLTFMaterialProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFMeshProcessor.js":
/*!****************************************!*\
  !*** ../lib/gltf/GLTFMeshProcessor.js ***!
  \****************************************/
/*! exports provided: GLTFMeshProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFMeshProcessor", function() { return GLTFMeshProcessor; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "../lib/scene/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");


class GLTFMeshProcessor {
    constructor(model) {
        this.model = model;
        this._meshes = [];
        this.cache = this.model.cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].MESH);
    }
    processMesh(idx) {
        if (this._meshes[idx]) {
            return this._meshes[idx];
        }
        const sceneMesh = new _scene__WEBPACK_IMPORTED_MODULE_0__["Mesh"]();
        const mesh = this.model.gltf.meshes[idx];
        sceneMesh.name = mesh.name || "mesh" + idx;
        for (let i = 0, primitive; primitive = mesh.primitives[i]; i++) {
            sceneMesh.addPrimitive(this.parsePrimitives(sceneMesh, primitive));
        }
        this._meshes[idx] = sceneMesh;
        this.cache.add(sceneMesh.name, sceneMesh);
        return sceneMesh;
    }
    /**
     * creates a new mesh/GLTF_Primitive for the gltf
     * @param {IGLTF_Primitive} gltfPrimitive
     */
    parsePrimitives(mesh, gltfPrimitive) {
        const gltf = this.model.gltf;
        const primitive = new _scene__WEBPACK_IMPORTED_MODULE_0__["Primitive"]();
        //Add attributes to mesh
        for (let id in gltfPrimitive.attributes) {
            //Create BufferView for each Accessor/GLBuffer for Position,Normal,tex,tangent etc. and map the accessor bufferViewIdx new
            const accessor = gltf.accessors[gltfPrimitive.attributes[id]];
            this.addAttribute(primitive, id, accessor);
            mesh.addBufferView(accessor.bufferView, this.model.getBufferView(accessor.bufferView));
        }
        //Set indices for indexBuffer
        if (gltfPrimitive.indices !== undefined && gltfPrimitive.indices !== null) {
            //Create BufferView for each IndexBuffer and map the accessor bufferViewIdx new
            const accessor = gltf.accessors[gltfPrimitive.indices];
            this.setIndices(primitive, accessor);
            mesh.addBufferView(accessor.bufferView, this.model.getBufferView(accessor.bufferView, true));
        }
        primitive.draw_mode = gltfPrimitive.mode || 4; //Default GL_TRIANGLE
        //Set the Material name for the mesh
        this.setMeshMaterial(primitive, gltfPrimitive.material);
        //TODO: morph targets primitive.targets
        return primitive;
    }
    /**
     * Adds an attribute to the primitive of type
     * POSITION,NORMAL,TANGENT,TEXCOORD0,TEXCOORD1,COLOR0,JOINTS0,WEIGHTS0
     * @param {Primitive} primitive
     * @param {string} id
     * @param {IGLTF_Accessor} accessor
     */
    addAttribute(primitive, id, accessor) {
        const gltf = this.model.gltf;
        const view = gltf.bufferViews[accessor.bufferView];
        primitive.addAttribute(id, accessor.type, accessor.componentType, accessor.normalized, view.byteStride || 0, accessor.byteOffset, accessor.bufferView, accessor.min, accessor.max);
    }
    /**
     * sets the name of the material used for the mesh if any
     * else its set to the "__default__" material
     * @param {Primitive} mesh
     * @param {number} materialIdx
     */
    setMeshMaterial(mesh, materialIdx) {
        if (materialIdx === undefined || materialIdx === null) {
            mesh.material = '__default__';
            return;
        }
        mesh.material = this.model.getMaterial(materialIdx).name;
    }
    /**
     * set the index accessor
     * @param {Primitive} primitive
     * @param {IGLTF_Accessor} indices
     */
    setIndices(primitive, indices) {
        primitive.setIndices(indices.count, indices.componentType, indices.byteOffset || 0, indices.bufferView);
    }
    get meshes() {
        return this._meshes;
    }
    set meshes(value) {
        this._meshes = value;
    }
}
//# sourceMappingURL=GLTFMeshProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFModel.js":
/*!********************************!*\
  !*** ../lib/gltf/GLTFModel.js ***!
  \********************************/
/*! exports provided: GLTFModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFModel", function() { return GLTFModel; });
/* harmony import */ var _GLTFMaterialProcessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLTFMaterialProcessor */ "../lib/gltf/GLTFMaterialProcessor.js");
/* harmony import */ var _GLTFMeshProcessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLTFMeshProcessor */ "../lib/gltf/GLTFMeshProcessor.js");
/* harmony import */ var _GLTFNodeProcessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GLTFNodeProcessor */ "../lib/gltf/GLTFNodeProcessor.js");
/* harmony import */ var _GLTFAccessorProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GLTFAccessorProcessor */ "../lib/gltf/GLTFAccessorProcessor.js");
/* harmony import */ var _GLTFSkinProcessor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GLTFSkinProcessor */ "../lib/gltf/GLTFSkinProcessor.js");
/* harmony import */ var _GLTFAnimationProcessor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GLTFAnimationProcessor */ "../lib/gltf/GLTFAnimationProcessor.js");
/* harmony import */ var _GLTFSceneProcessor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GLTFSceneProcessor */ "../lib/gltf/GLTFSceneProcessor.js");







class GLTFModel {
    constructor(gltf, data, config) {
        this.gltf = gltf;
        this.data = data;
        this.cache = config.cache;
        this.loader = config.loader;
        this.gl = config.gl;
        this.path = config.path;
        this.accessorProcessor = new _GLTFAccessorProcessor__WEBPACK_IMPORTED_MODULE_3__["GLTFAccessorProcessor"](this);
        this.meshProcessor = new _GLTFMeshProcessor__WEBPACK_IMPORTED_MODULE_1__["GLTFMeshProcessor"](this);
        this.nodeProcessor = new _GLTFNodeProcessor__WEBPACK_IMPORTED_MODULE_2__["GLTFNodeProcessor"](this);
        this.materialProcessor = new _GLTFMaterialProcessor__WEBPACK_IMPORTED_MODULE_0__["GLTFMaterialProcessor"](this);
        this.skinProcessor = new _GLTFSkinProcessor__WEBPACK_IMPORTED_MODULE_4__["GLTFSkinProcessor"](this);
    }
    process() {
        const scene = new _GLTFSceneProcessor__WEBPACK_IMPORTED_MODULE_6__["GLTFSceneProcessor"](this).processScenes();
        scene.animations = new _GLTFAnimationProcessor__WEBPACK_IMPORTED_MODULE_5__["GLTFAnimationProcessor"](this).processAnimations();
        scene.meshes = this.meshProcessor.meshes;
        return scene;
    }
    getSkin(idx) {
        return this.skinProcessor.processSkin(idx);
    }
    getMaterial(idx) {
        return this.materialProcessor.processMaterial(idx);
    }
    getNode(idx) {
        return this.nodeProcessor.processNode(idx);
    }
    getMesh(idx) {
        return this.meshProcessor.processMesh(idx);
    }
    getBufferView(idx, isIndexBuffer) {
        return this.accessorProcessor.getBufferView(idx, isIndexBuffer);
    }
    getAccessorData(accessor) {
        return this.accessorProcessor.getAccessorData(accessor);
    }
}
//# sourceMappingURL=GLTFModel.js.map

/***/ }),

/***/ "../lib/gltf/GLTFNodeProcessor.js":
/*!****************************************!*\
  !*** ../lib/gltf/GLTFNodeProcessor.js ***!
  \****************************************/
/*! exports provided: GLTFNodeProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFNodeProcessor", function() { return GLTFNodeProcessor; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "../lib/scene/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");


class GLTFNodeProcessor {
    constructor(model) {
        this.model = model;
        this.nodes = [];
    }
    processNode(idx) {
        if (this.nodes[idx]) {
            return this.nodes[idx];
        }
        return this.parseNode(idx, this.nodes);
    }
    /**
     * Parse a single node and all its children
     * a node can have multiple properties e.g. mesh,transform,weights,camera,skin etc.
     * @param {number} nodeIdx
     * @param nodes
     * @param parent
     */
    parseNode(nodeIdx, nodes, parent) {
        const gltf = this.model.gltf;
        const node = gltf.nodes[nodeIdx];
        if (nodes[nodeIdx]) {
            return nodes[nodeIdx];
        }
        const sceneNode = new _scene__WEBPACK_IMPORTED_MODULE_0__["SceneNode"]();
        sceneNode.name = node.name || "node" + nodeIdx;
        nodes[nodeIdx] = sceneNode;
        sceneNode.transform = this.parseTransform(node, parent);
        if (node.mesh !== null && node.mesh !== undefined) {
            sceneNode.mesh = this.model.getMesh(node.mesh);
        }
        if (node.skin !== null && node.skin !== undefined) {
            sceneNode.skin = this.model.getSkin(node.skin);
        }
        node.children = node.children || [];
        for (let i = 0, child; child = node.children[i]; i++) {
            const childNode = this.parseNode(child, nodes, sceneNode);
            sceneNode.addChild(childNode);
        }
        return sceneNode;
    }
    /**
     * Parse the Transformation of a node and add it as a child to the list of transform nodes
     * @param {IGLTF_Node} node
     * @param {Transform} parent - parent of the new node
     * @returns {Transform} newly create Transform node
     */
    parseTransform(node, parent) {
        const transform = new _scene__WEBPACK_IMPORTED_MODULE_0__["Transform"]();
        if (node.matrix !== undefined && node.matrix !== null) {
            transform.localMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].clone(node.matrix);
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].getTranslation(transform.translation, transform.localMatrix);
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].getRotation(transform.rotation, transform.localMatrix);
            gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].getScaling(transform.scale, transform.localMatrix);
        }
        if (node.translation !== undefined && node.translation !== null) {
            transform.translation = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].clone(node.translation);
        }
        if (node.rotation !== undefined && node.rotation !== null) {
            transform.rotation = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["quat"].clone(node.rotation);
        }
        if (node.scale !== undefined && node.scale !== null) {
            transform.scale = gl_matrix__WEBPACK_IMPORTED_MODULE_1__["vec3"].clone(node.scale);
        }
        if (parent) {
            parent.transform.addChild(transform);
        }
        return transform;
    }
}
//# sourceMappingURL=GLTFNodeProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFParser.js":
/*!*********************************!*\
  !*** ../lib/gltf/GLTFParser.js ***!
  \*********************************/
/*! exports provided: GLTF_Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTF_Parser", function() { return GLTF_Parser; });
/* harmony import */ var _GLTFModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLTFModel */ "../lib/gltf/GLTFModel.js");
/* harmony import */ var _Base64Binary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base64Binary */ "../lib/gltf/Base64Binary.js");


/**
 * Parse the GLTF_Json
 */
class GLTF_Parser {
    constructor(loader, gl, cache) {
        this._path = '';
        this.loader = loader;
        this.gl = gl;
        this.cache = cache;
    }
    /**
     *
     * @param {ArrayBuffer} buffer - gltf data(vertices,indices)
     * @param {IGLTF_Model} gltf_model - json object in gltf format
     * @returns {Mesh}
     */
    parse(gltf_model, buffer) {
        const buffers = [];
        if (!buffer) {
            buffers.push(...this.parseBuffers(gltf_model));
        }
        else {
            buffers.push(buffer);
        }
        return new _GLTFModel__WEBPACK_IMPORTED_MODULE_0__["GLTFModel"](gltf_model, buffers, {
            path: this._path,
            gl: this.gl,
            cache: this.cache,
            loader: this.loader
        }).process();
    }
    parseBuffers(gltfModel) {
        const buffers = [];
        for (let i = 0; i < gltfModel.buffers.length; i++) {
            const gltfBuffer = gltfModel.buffers[i];
            const buffer = _Base64Binary__WEBPACK_IMPORTED_MODULE_1__["Base64Binary"].decode(gltfBuffer.uri, gltfBuffer.byteLength);
            buffers.push(buffer);
        }
        return buffers;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
}
//# sourceMappingURL=GLTFParser.js.map

/***/ }),

/***/ "../lib/gltf/GLTFSceneProcessor.js":
/*!*****************************************!*\
  !*** ../lib/gltf/GLTFSceneProcessor.js ***!
  \*****************************************/
/*! exports provided: GLTFSceneProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFSceneProcessor", function() { return GLTFSceneProcessor; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene */ "../lib/scene/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");


class GLTFSceneProcessor {
    constructor(model) {
        this.model = model;
        this.cache = this.model.cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].SCENE);
    }
    /**
     * Parse the scenes by parsing each node of the GTLF File
     */
    processScenes() {
        const gltf = this.model.gltf;
        const scenes = [];
        for (let i = 0, scene; scene = gltf.scenes[i]; i++) {
            scenes.push(this.processScene(scene, i));
        }
        return scenes[0];
    }
    processScene(gltfScene, idx) {
        const scene = new _scene__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        scene.name = gltfScene.name || "scene" + idx;
        for (let i = 0; i < gltfScene.nodes.length; i++) {
            scene.addNode(this.model.getNode(gltfScene.nodes[i]));
        }
        this.cache.add(scene.name, scene);
        return scene;
    }
}
//# sourceMappingURL=GLTFSceneProcessor.js.map

/***/ }),

/***/ "../lib/gltf/GLTFSkinProcessor.js":
/*!****************************************!*\
  !*** ../lib/gltf/GLTFSkinProcessor.js ***!
  \****************************************/
/*! exports provided: GLTFSkinProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFSkinProcessor", function() { return GLTFSkinProcessor; });
/* harmony import */ var _scene_skin_skin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/skin/skin */ "../lib/scene/skin/skin.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");


class GLTFSkinProcessor {
    constructor(model) {
        this.model = model;
        this.skins = [];
    }
    processSkin(idx) {
        if (this.skins[idx]) {
            return this.skins[idx];
        }
        const skin = new _scene_skin_skin__WEBPACK_IMPORTED_MODULE_0__["Skin"]();
        const gltf = this.model.gltf;
        const gltfSkin = gltf.skins[idx];
        const accessor = gltf.accessors[gltfSkin.inverseBindMatrices];
        if (gltfSkin.skeleton !== undefined && gltfSkin.skeleton !== null) {
            skin.skeleton = this.model.getNode(gltfSkin.skeleton);
        }
        for (let i = 0; i < gltfSkin.joints.length; i++) {
            skin.joints.push(this.model.getNode(gltfSkin.joints[i]));
        }
        if (accessor) {
            const inverseBindMatrices = this.model.getAccessorData(accessor);
            for (let i = 0; i < inverseBindMatrices.length; i += 16) {
                skin.inverseBindMatrices.push(gl_matrix__WEBPACK_IMPORTED_MODULE_1__["mat4"].fromValues(inverseBindMatrices[i], inverseBindMatrices[i + 1], inverseBindMatrices[i + 2], inverseBindMatrices[i + 3], inverseBindMatrices[i + 4], inverseBindMatrices[i + 5], inverseBindMatrices[i + 6], inverseBindMatrices[i + 7], inverseBindMatrices[i + 8], inverseBindMatrices[i + 9], inverseBindMatrices[i + 10], inverseBindMatrices[i + 11], inverseBindMatrices[i + 12], inverseBindMatrices[i + 13], inverseBindMatrices[i + 14], inverseBindMatrices[i + 15]));
            }
        }
        this.skins[idx] = skin;
        return skin;
    }
}
//# sourceMappingURL=GLTFSkinProcessor.js.map

/***/ }),

/***/ "../lib/gltf/index.js":
/*!****************************!*\
  !*** ../lib/gltf/index.js ***!
  \****************************/
/*! exports provided: Base64Binary, GLTFAccessorProcessor, GLTFAnimationProcessor, GLTFMaterialProcessor, GLTFMeshProcessor, GLTFModel, GLTFNodeProcessor, GLTF_Parser, GLTFSceneProcessor, GLTFSkinProcessor, ALPHA_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base64Binary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base64Binary */ "../lib/gltf/Base64Binary.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base64Binary", function() { return _Base64Binary__WEBPACK_IMPORTED_MODULE_0__["Base64Binary"]; });

/* harmony import */ var _GLTFAccessorProcessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLTFAccessorProcessor */ "../lib/gltf/GLTFAccessorProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFAccessorProcessor", function() { return _GLTFAccessorProcessor__WEBPACK_IMPORTED_MODULE_1__["GLTFAccessorProcessor"]; });

/* harmony import */ var _GLTFAnimationProcessor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GLTFAnimationProcessor */ "../lib/gltf/GLTFAnimationProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFAnimationProcessor", function() { return _GLTFAnimationProcessor__WEBPACK_IMPORTED_MODULE_2__["GLTFAnimationProcessor"]; });

/* harmony import */ var _GLTFMaterialProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GLTFMaterialProcessor */ "../lib/gltf/GLTFMaterialProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFMaterialProcessor", function() { return _GLTFMaterialProcessor__WEBPACK_IMPORTED_MODULE_3__["GLTFMaterialProcessor"]; });

/* harmony import */ var _GLTFMeshProcessor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GLTFMeshProcessor */ "../lib/gltf/GLTFMeshProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFMeshProcessor", function() { return _GLTFMeshProcessor__WEBPACK_IMPORTED_MODULE_4__["GLTFMeshProcessor"]; });

/* harmony import */ var _GLTFModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GLTFModel */ "../lib/gltf/GLTFModel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFModel", function() { return _GLTFModel__WEBPACK_IMPORTED_MODULE_5__["GLTFModel"]; });

/* harmony import */ var _GLTFNodeProcessor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./GLTFNodeProcessor */ "../lib/gltf/GLTFNodeProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFNodeProcessor", function() { return _GLTFNodeProcessor__WEBPACK_IMPORTED_MODULE_6__["GLTFNodeProcessor"]; });

/* harmony import */ var _GLTFParser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GLTFParser */ "../lib/gltf/GLTFParser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTF_Parser", function() { return _GLTFParser__WEBPACK_IMPORTED_MODULE_7__["GLTF_Parser"]; });

/* harmony import */ var _GLTFSceneProcessor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./GLTFSceneProcessor */ "../lib/gltf/GLTFSceneProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFSceneProcessor", function() { return _GLTFSceneProcessor__WEBPACK_IMPORTED_MODULE_8__["GLTFSceneProcessor"]; });

/* harmony import */ var _GLTFSkinProcessor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GLTFSkinProcessor */ "../lib/gltf/GLTFSkinProcessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFSkinProcessor", function() { return _GLTFSkinProcessor__WEBPACK_IMPORTED_MODULE_9__["GLTFSkinProcessor"]; });

/* harmony import */ var _model_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./model/index */ "../lib/gltf/model/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALPHA_MODE", function() { return _model_index__WEBPACK_IMPORTED_MODULE_10__["ALPHA_MODE"]; });

/**
 * @file Automatically generated by barrelsby.
 */











//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/gltf/model/GLTF_Material.js":
/*!******************************************!*\
  !*** ../lib/gltf/model/GLTF_Material.js ***!
  \******************************************/
/*! exports provided: ALPHA_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALPHA_MODE", function() { return ALPHA_MODE; });
var ALPHA_MODE;
(function (ALPHA_MODE) {
    ALPHA_MODE["OPAQUE"] = "OPAQUE";
    ALPHA_MODE["MASK"] = "MASK";
    ALPHA_MODE["BLEND"] = "BLEND";
})(ALPHA_MODE || (ALPHA_MODE = {}));
//# sourceMappingURL=GLTF_Material.js.map

/***/ }),

/***/ "../lib/gltf/model/index.js":
/*!**********************************!*\
  !*** ../lib/gltf/model/index.js ***!
  \**********************************/
/*! exports provided: ALPHA_MODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GLTF_Material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GLTF_Material */ "../lib/gltf/model/GLTF_Material.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALPHA_MODE", function() { return _GLTF_Material__WEBPACK_IMPORTED_MODULE_0__["ALPHA_MODE"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/index.js":
/*!***********************!*\
  !*** ../lib/index.js ***!
  \***********************/
/*! exports provided: CACHE_TYPE, Cache, Canvas, DomEvents, EmitSignal, GLBuffer, GLCube, GLCubemap, GLFramebuffer, GLQuad, GLSphere, GLTexture, GLUniformBufferObject, GLVertexArrayObject, Base64Binary, GLTFAccessorProcessor, GLTFAnimationProcessor, GLTFMaterialProcessor, GLTFMeshProcessor, GLTFModel, GLTFNodeProcessor, GLTF_Parser, GLTFSceneProcessor, GLTFSkinProcessor, CubemapLoader, GLSLLoader, GLTFLoader, TextureLoader, MATERIAL_TYPES, MATERIAL_MAPS, Material, Materialmap, MetallicRoughness, Color, Math3d, Math2d, Mesh, Scene, SceneNode, Shader, Transform, KhronosPbrShader, SkyboxShader, AnimationSystem, CameraSystem, LookAtCameraControlSystem, GUISystem, ForwardShadingSystem, PrePass, SkyboxPass, WorldSystem, GLOBAL_TEXTURES, UBO_BINDINGS, Viewer, CACHE_EVENTS, BaseCache, CameraComponent, LookAtCameraComponent, GUIComponent, LightComponent, SkyboxComponent, AnimationComponent, SceneComponent, TransformComponent, GL_TYPES, GL_TYPES_BYTESIZE, GL_PRIMITIVES, GL_BUFFERS, MAG_FILTER, MIN_FILTER, TEXTURE_WRAP, GL_INTERNALFORMAT, DefaultValue, glGetCurrentState, glResetState, MapSize, MapType, WebGLUtils, Attributes, GLShader, ProgramCompiler, Uniforms, ALPHA_MODE, Animation, AnimationChannel, Interpolation, AnimationSampler, ACCESSOR_TYPE, GLTF_ACCESORTYPE_SIZE, Accessor, BufferView, Primitive, Skin, ForwardLightPass, ForwardScenePass, WorldScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cache_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cache/index */ "../lib/cache/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CACHE_TYPE", function() { return _cache_index__WEBPACK_IMPORTED_MODULE_0__["CACHE_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cache", function() { return _cache_index__WEBPACK_IMPORTED_MODULE_0__["Cache"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CACHE_EVENTS", function() { return _cache_index__WEBPACK_IMPORTED_MODULE_0__["CACHE_EVENTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCache", function() { return _cache_index__WEBPACK_IMPORTED_MODULE_0__["BaseCache"]; });

/* harmony import */ var _canvas_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/index */ "../lib/canvas/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _canvas_index__WEBPACK_IMPORTED_MODULE_1__["Canvas"]; });

/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/index */ "../lib/components/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["CameraComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["LookAtCameraComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUIComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["GUIComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LightComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["LightComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["SkyboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["AnimationComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["SceneComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformComponent", function() { return _components_index__WEBPACK_IMPORTED_MODULE_2__["TransformComponent"]; });

/* harmony import */ var _events_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events/index */ "../lib/events/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DomEvents", function() { return _events_index__WEBPACK_IMPORTED_MODULE_3__["DomEvents"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmitSignal", function() { return _events_index__WEBPACK_IMPORTED_MODULE_3__["EmitSignal"]; });

/* harmony import */ var _gl_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gl/index */ "../lib/gl/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLBuffer", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLCube", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLCube"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLCubemap", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLCubemap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLFramebuffer", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLFramebuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLQuad", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLQuad"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLSphere", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLSphere"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTexture", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLTexture"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLUniformBufferObject", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLUniformBufferObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLVertexArrayObject", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLVertexArrayObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GL_TYPES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_TYPES_BYTESIZE", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GL_TYPES_BYTESIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_PRIMITIVES", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_BUFFERS", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GL_BUFFERS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MAG_FILTER", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["MAG_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MIN_FILTER", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["MIN_FILTER"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["TEXTURE_WRAP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GL_INTERNALFORMAT", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GL_INTERNALFORMAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultValue", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["DefaultValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glGetCurrentState", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["glGetCurrentState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "glResetState", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["glResetState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapSize", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["MapSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MapType", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["MapType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebGLUtils", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["WebGLUtils"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attributes", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["Attributes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLShader", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["GLShader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProgramCompiler", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["ProgramCompiler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Uniforms", function() { return _gl_index__WEBPACK_IMPORTED_MODULE_4__["Uniforms"]; });

/* harmony import */ var _gltf_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gltf/index */ "../lib/gltf/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Base64Binary", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["Base64Binary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFAccessorProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFAccessorProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFAnimationProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFAnimationProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFMaterialProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFMaterialProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFMeshProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFMeshProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFModel", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFModel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFNodeProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFNodeProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTF_Parser", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTF_Parser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFSceneProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFSceneProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFSkinProcessor", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["GLTFSkinProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALPHA_MODE", function() { return _gltf_index__WEBPACK_IMPORTED_MODULE_5__["ALPHA_MODE"]; });

/* harmony import */ var _loader_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./loader/index */ "../lib/loader/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CubemapLoader", function() { return _loader_index__WEBPACK_IMPORTED_MODULE_6__["CubemapLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLSLLoader", function() { return _loader_index__WEBPACK_IMPORTED_MODULE_6__["GLSLLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFLoader", function() { return _loader_index__WEBPACK_IMPORTED_MODULE_6__["GLTFLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return _loader_index__WEBPACK_IMPORTED_MODULE_6__["TextureLoader"]; });

/* harmony import */ var _material_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material/index */ "../lib/material/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_TYPES", function() { return _material_index__WEBPACK_IMPORTED_MODULE_7__["MATERIAL_TYPES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_MAPS", function() { return _material_index__WEBPACK_IMPORTED_MODULE_7__["MATERIAL_MAPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return _material_index__WEBPACK_IMPORTED_MODULE_7__["Material"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Materialmap", function() { return _material_index__WEBPACK_IMPORTED_MODULE_7__["Materialmap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetallicRoughness", function() { return _material_index__WEBPACK_IMPORTED_MODULE_7__["MetallicRoughness"]; });

/* harmony import */ var _math_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./math/index */ "../lib/math/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _math_index__WEBPACK_IMPORTED_MODULE_8__["Color"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Math3d", function() { return _math_index__WEBPACK_IMPORTED_MODULE_8__["Math3d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Math2d", function() { return _math_index__WEBPACK_IMPORTED_MODULE_8__["Math2d"]; });

/* harmony import */ var _scene_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./scene/index */ "../lib/scene/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Mesh"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Scene"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["SceneNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Shader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Transform"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Animation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationChannel", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["AnimationChannel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpolation", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Interpolation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSampler", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["AnimationSampler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ACCESSOR_TYPE", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["ACCESSOR_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTF_ACCESORTYPE_SIZE", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["GLTF_ACCESORTYPE_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accessor", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Accessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferView", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["BufferView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Primitive", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Primitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return _scene_index__WEBPACK_IMPORTED_MODULE_9__["Skin"]; });

/* harmony import */ var _shader_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shader/index */ "../lib/shader/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KhronosPbrShader", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_10__["KhronosPbrShader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxShader", function() { return _shader_index__WEBPACK_IMPORTED_MODULE_10__["SkyboxShader"]; });

/* harmony import */ var _systems_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./systems/index */ "../lib/systems/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["AnimationSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraSystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["CameraSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraControlSystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["LookAtCameraControlSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUISystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["GUISystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardShadingSystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["ForwardShadingSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrePass", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["PrePass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxPass", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["SkyboxPass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["WorldSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardLightPass", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["ForwardLightPass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardScenePass", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["ForwardScenePass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldScene", function() { return _systems_index__WEBPACK_IMPORTED_MODULE_11__["WorldScene"]; });

/* harmony import */ var _viewer_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./viewer/index */ "../lib/viewer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_TEXTURES", function() { return _viewer_index__WEBPACK_IMPORTED_MODULE_12__["GLOBAL_TEXTURES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UBO_BINDINGS", function() { return _viewer_index__WEBPACK_IMPORTED_MODULE_12__["UBO_BINDINGS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return _viewer_index__WEBPACK_IMPORTED_MODULE_12__["Viewer"]; });

/**
 * @file Automatically generated by barrelsby.
 */













//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/loader/CubemapLoader.js":
/*!**************************************!*\
  !*** ../lib/loader/CubemapLoader.js ***!
  \**************************************/
/*! exports provided: CubemapLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubemapLoader", function() { return CubemapLoader; });
/* harmony import */ var curbl_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-loader */ "../node_modules/curbl-loader/lib/index.js");
/* harmony import */ var _gl_GLCubemap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gl/GLCubemap */ "../lib/gl/GLCubemap.js");
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gl/constants */ "../lib/gl/constants/index.js");
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gl */ "../lib/gl/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");





class CubemapLoader extends curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Middleware"] {
    constructor(gl) {
        super(_cache__WEBPACK_IMPORTED_MODULE_4__["CACHE_TYPE"].TEXTURE);
        this.gl = gl;
    }
    add(key, levels, config = { id: 0 }) {
        const resources = [];
        for (let i = 0, faces; faces = levels[i]; i++) {
            const keys = Object.keys(faces);
            for (let k = 0, face; face = faces[keys[k]]; k++) {
                resources.push({
                    resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                        url: face,
                        loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].IMAGE
                    }, Object.assign({}, config, { face: k, level: i })),
                });
            }
        }
        return this.addResourceToQueue({
            key: key,
            resources: resources
        });
    }
    transform(...resources) {
        const images = resources.sort((a, b) => a.config.face - b.config.face + (a.config.level - b.config.level) * 6).map((resource) => resource.request);
        const textureConfig = resources[0].config;
        const data = _gl_GLCubemap__WEBPACK_IMPORTED_MODULE_1__["GLCubemap"].cubemapFromSource(this.gl, images, textureConfig.flipY, textureConfig.premultiplyAlpha, textureConfig.id, textureConfig.internalFormat, textureConfig.format, textureConfig.type);
        if (textureConfig.flipY) {
            data.flipY(1);
        }
        if (textureConfig.sampler) {
            if (textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].LINEAR
                || textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].NEAREST
                || textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].LINEAR_MIPMAP_NEAREST
                || textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].NEAREST_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].NEAREST_MIPMAP_NEAREST) {
                data.setMinFilter(textureConfig.sampler.minFilter);
            }
            else if (_gl__WEBPACK_IMPORTED_MODULE_3__["GLTexture"].isPowerOf2(data.width) && _gl__WEBPACK_IMPORTED_MODULE_3__["GLTexture"].isPowerOf2(data.height)) {
                data.setMinFilter(_gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR);
            }
            else {
                data.setMinFilter(_gl_constants__WEBPACK_IMPORTED_MODULE_2__["MIN_FILTER"].LINEAR);
            }
            if (textureConfig.sampler.magFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MAG_FILTER"].LINEAR || textureConfig.sampler.magFilter === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["MAG_FILTER"].NEAREST) {
                data.setMagFilter(textureConfig.sampler.magFilter);
            }
            else {
                data.setMagFilter(_gl_constants__WEBPACK_IMPORTED_MODULE_2__["MAG_FILTER"].LINEAR);
            }
            if (textureConfig.sampler.wrapS === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].CLAMP_TO_EDGE
                || textureConfig.sampler.wrapS === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].MIRRORED_REPEAT
                || textureConfig.sampler.wrapS === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].REPEAT) {
                data.setWrapS(textureConfig.sampler.wrapS);
            }
            else {
                data.setWrapS(_gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].REPEAT);
            }
            if (textureConfig.sampler.wrapT === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].CLAMP_TO_EDGE
                || textureConfig.sampler.wrapT === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].MIRRORED_REPEAT
                || textureConfig.sampler.wrapT === _gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].REPEAT) {
                data.setWrapT(textureConfig.sampler.wrapT);
            }
            else {
                data.setWrapT(_gl_constants__WEBPACK_IMPORTED_MODULE_2__["TEXTURE_WRAP"].REPEAT);
            }
        }
        return data;
    }
}
//# sourceMappingURL=CubemapLoader.js.map

/***/ }),

/***/ "../lib/loader/GLSLLoader.js":
/*!***********************************!*\
  !*** ../lib/loader/GLSLLoader.js ***!
  \***********************************/
/*! exports provided: GLSLLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLSLLoader", function() { return GLSLLoader; });
/* harmony import */ var curbl_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-loader */ "../node_modules/curbl-loader/lib/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");
/* harmony import */ var _scene_shader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scene/shader */ "../lib/scene/shader.js");



class GLSLLoader extends curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Middleware"] {
    constructor(gl) {
        super(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].SHADER);
        this.gl = gl;
    }
    add(key, vertexSrc, fragSrc, shader) {
        return this.addResourceToQueue({
            key: key,
            resources: [
                {
                    resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                        url: vertexSrc,
                        loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].XHR,
                        responseType: "text"
                    }, { type: "vertex", shader: shader })
                },
                {
                    resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                        url: fragSrc,
                        loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].XHR,
                        responseType: "text"
                    }, { type: "fragment", shader: shader })
                }
            ]
        });
    }
    transform(...resources) {
        const vertex = resources.find((r) => r.config.type === "vertex");
        const fragment = resources.find((r) => r.config.type === "fragment");
        if (vertex.config.shader) {
            const shader = vertex.config.shader;
            shader.vertexSrc = vertex.request.response;
            shader.fragmentSrc = fragment.request.response;
            return shader;
        }
        return new _scene_shader__WEBPACK_IMPORTED_MODULE_2__["Shader"](this.gl, vertex.request.response, fragment.request.response);
    }
}
//# sourceMappingURL=GLSLLoader.js.map

/***/ }),

/***/ "../lib/loader/GLTFLoader.js":
/*!***********************************!*\
  !*** ../lib/loader/GLTFLoader.js ***!
  \***********************************/
/*! exports provided: GLTFLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTFLoader", function() { return GLTFLoader; });
/* harmony import */ var curbl_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-loader */ "../node_modules/curbl-loader/lib/index.js");
/* harmony import */ var _gltf_GLTFParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gltf/GLTFParser */ "../lib/gltf/GLTFParser.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");



class GLTFLoader extends curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Middleware"] {
    constructor(gl, cache) {
        super(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].SCENE);
        this.gl = gl;
        this.cache = cache;
    }
    add(key, gltfJson, gltfBin) {
        const bufferResource = gltfBin ? {
            resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                url: gltfBin,
                loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].XHR,
                responseType: 'arraybuffer'
            }, {
                type: 'buffer'
            })
        } : null;
        const jsonResource = {
            resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                url: gltfJson,
                loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].XHR,
                responseType: 'json'
            }, {
                type: 'json'
            })
        };
        const resources = bufferResource ? [jsonResource, bufferResource] : [jsonResource];
        return this.addResourceToQueue({
            key: key,
            resources: resources
        });
    }
    transform(...resources) {
        const jsonResource = resources.find((resource) => resource.config.type === 'json');
        const bufferResource = resources.find((resource) => resource.config.type === 'buffer');
        const url = jsonResource.options.url;
        const match = url.match(/[\w\.]+/g);
        const parser = new _gltf_GLTFParser__WEBPACK_IMPORTED_MODULE_1__["GLTF_Parser"](this._loader, this.gl, this.cache);
        parser.path = url.replace(match[match.length - 1], '');
        return parser.parse(jsonResource.request.response, bufferResource ? bufferResource.request.response : undefined);
    }
}
//# sourceMappingURL=GLTFLoader.js.map

/***/ }),

/***/ "../lib/loader/TextureLoader.js":
/*!**************************************!*\
  !*** ../lib/loader/TextureLoader.js ***!
  \**************************************/
/*! exports provided: TextureLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return TextureLoader; });
/* harmony import */ var curbl_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-loader */ "../node_modules/curbl-loader/lib/index.js");
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gl */ "../lib/gl/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");



class TextureLoader extends curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Middleware"] {
    constructor(gl) {
        super(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].TEXTURE);
        this.gl = gl;
    }
    add(key, url, config = {
        id: 0,
        sampler: {
            wrapS: _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT,
            wrapT: _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT
        }
    }) {
        return this.addResourceToQueue({
            key: key,
            resources: [{
                    resource: new curbl_loader__WEBPACK_IMPORTED_MODULE_0__["Resource"]({
                        url: url,
                        loadType: curbl_loader__WEBPACK_IMPORTED_MODULE_0__["LOAD_TYPE"].IMAGE
                    }, config)
                }]
        });
    }
    transform(resource) {
        const textureConfig = resource.config;
        const image = resource.request;
        const data = _gl__WEBPACK_IMPORTED_MODULE_1__["GLTexture"].fromSource(this.gl, image, textureConfig.premultiplyAlpha, textureConfig.id, textureConfig.internalFormat, textureConfig.format, textureConfig.type);
        if (textureConfig.flipY) {
            data.flipY(1);
        }
        if (textureConfig.sampler) {
            if (textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].LINEAR
                || textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].NEAREST
                || textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].LINEAR_MIPMAP_NEAREST
                || textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].NEAREST_MIPMAP_LINEAR
                || textureConfig.sampler.minFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].NEAREST_MIPMAP_NEAREST) {
                data.setMinFilter(textureConfig.sampler.minFilter);
            }
            else if (_gl__WEBPACK_IMPORTED_MODULE_1__["GLTexture"].isPowerOf2(data.width) && _gl__WEBPACK_IMPORTED_MODULE_1__["GLTexture"].isPowerOf2(data.height)) {
                data.setMinFilter(_gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].LINEAR_MIPMAP_LINEAR);
            }
            else {
                data.setMinFilter(_gl__WEBPACK_IMPORTED_MODULE_1__["MIN_FILTER"].LINEAR);
            }
            if (textureConfig.sampler.magFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MAG_FILTER"].LINEAR || textureConfig.sampler.magFilter === _gl__WEBPACK_IMPORTED_MODULE_1__["MAG_FILTER"].NEAREST) {
                data.setMagFilter(textureConfig.sampler.magFilter);
            }
            else {
                data.setMagFilter(_gl__WEBPACK_IMPORTED_MODULE_1__["MAG_FILTER"].LINEAR);
            }
            if (textureConfig.sampler.wrapS === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].CLAMP_TO_EDGE
                || textureConfig.sampler.wrapS === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].MIRRORED_REPEAT
                || textureConfig.sampler.wrapS === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT) {
                data.setWrapS(textureConfig.sampler.wrapS);
            }
            else {
                data.setWrapS(_gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT);
            }
            if (textureConfig.sampler.wrapT === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].CLAMP_TO_EDGE
                || textureConfig.sampler.wrapT === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].MIRRORED_REPEAT
                || textureConfig.sampler.wrapT === _gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT) {
                data.setWrapT(textureConfig.sampler.wrapT);
            }
            else {
                data.setWrapT(_gl__WEBPACK_IMPORTED_MODULE_1__["TEXTURE_WRAP"].REPEAT);
            }
        }
        return data;
    }
}
//# sourceMappingURL=TextureLoader.js.map

/***/ }),

/***/ "../lib/loader/index.js":
/*!******************************!*\
  !*** ../lib/loader/index.js ***!
  \******************************/
/*! exports provided: CubemapLoader, GLSLLoader, GLTFLoader, TextureLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CubemapLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CubemapLoader */ "../lib/loader/CubemapLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CubemapLoader", function() { return _CubemapLoader__WEBPACK_IMPORTED_MODULE_0__["CubemapLoader"]; });

/* harmony import */ var _GLSLLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GLSLLoader */ "../lib/loader/GLSLLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLSLLoader", function() { return _GLSLLoader__WEBPACK_IMPORTED_MODULE_1__["GLSLLoader"]; });

/* harmony import */ var _GLTFLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GLTFLoader */ "../lib/loader/GLTFLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTFLoader", function() { return _GLTFLoader__WEBPACK_IMPORTED_MODULE_2__["GLTFLoader"]; });

/* harmony import */ var _TextureLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextureLoader */ "../lib/loader/TextureLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextureLoader", function() { return _TextureLoader__WEBPACK_IMPORTED_MODULE_3__["TextureLoader"]; });

/**
 * @file Automatically generated by barrelsby.
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/material/index.js":
/*!********************************!*\
  !*** ../lib/material/index.js ***!
  \********************************/
/*! exports provided: MATERIAL_TYPES, MATERIAL_MAPS, Material, Materialmap, MetallicRoughness */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./material */ "../lib/material/material.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_TYPES", function() { return _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_TYPES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_MAPS", function() { return _material__WEBPACK_IMPORTED_MODULE_0__["MATERIAL_MAPS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return _material__WEBPACK_IMPORTED_MODULE_0__["Material"]; });

/* harmony import */ var _materialmap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./materialmap */ "../lib/material/materialmap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Materialmap", function() { return _materialmap__WEBPACK_IMPORTED_MODULE_1__["Materialmap"]; });

/* harmony import */ var _metallicRoughness__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metallicRoughness */ "../lib/material/metallicRoughness.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MetallicRoughness", function() { return _metallicRoughness__WEBPACK_IMPORTED_MODULE_2__["MetallicRoughness"]; });

/**
 * @file Automatically generated by barrelsby.
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/material/material.js":
/*!***********************************!*\
  !*** ../lib/material/material.js ***!
  \***********************************/
/*! exports provided: MATERIAL_TYPES, MATERIAL_MAPS, Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_TYPES", function() { return MATERIAL_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MATERIAL_MAPS", function() { return MATERIAL_MAPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
var MATERIAL_TYPES;
(function (MATERIAL_TYPES) {
    MATERIAL_TYPES[MATERIAL_TYPES["PBR"] = 0] = "PBR";
})(MATERIAL_TYPES || (MATERIAL_TYPES = {}));
var MATERIAL_MAPS;
(function (MATERIAL_MAPS) {
    MATERIAL_MAPS[MATERIAL_MAPS["ALBEDO"] = 0] = "ALBEDO";
    MATERIAL_MAPS[MATERIAL_MAPS["NORMAL"] = 1] = "NORMAL";
    MATERIAL_MAPS[MATERIAL_MAPS["OCCLUSION"] = 2] = "OCCLUSION";
    MATERIAL_MAPS[MATERIAL_MAPS["EMISSIVE"] = 3] = "EMISSIVE";
    MATERIAL_MAPS[MATERIAL_MAPS["METAL_ROUGHNESS"] = 4] = "METAL_ROUGHNESS";
})(MATERIAL_MAPS || (MATERIAL_MAPS = {}));
class Material {
    constructor(name, model) {
        this._type = MATERIAL_TYPES.PBR;
        this.name = name;
        this._maps = [];
        this._model = model;
    }
    hasMap(key) {
        return !!this._maps[key];
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get maps() {
        return this._maps;
    }
    set maps(value) {
        this._maps = value;
    }
    get model() {
        return this._model;
    }
    set model(value) {
        this._model = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
//# sourceMappingURL=material.js.map

/***/ }),

/***/ "../lib/material/materialmap.js":
/*!**************************************!*\
  !*** ../lib/material/materialmap.js ***!
  \**************************************/
/*! exports provided: Materialmap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Materialmap", function() { return Materialmap; });
class Materialmap {
    constructor(texture, sampler) {
        this._texture = texture;
        this._sampler = sampler;
    }
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
    }
    get sampler() {
        return this._sampler;
    }
    set sampler(value) {
        this._sampler = value;
    }
}
//# sourceMappingURL=materialmap.js.map

/***/ }),

/***/ "../lib/material/metallicRoughness.js":
/*!********************************************!*\
  !*** ../lib/material/metallicRoughness.js ***!
  \********************************************/
/*! exports provided: MetallicRoughness */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetallicRoughness", function() { return MetallicRoughness; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");

class MetallicRoughness {
    constructor() {
        this._baseColorFactor = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].fromValues(1, 1, 1, 1);
        this._metallicFactor = 1;
        this._roughnessFactor = 1;
        this._normalScale = 1;
        this._occlusionStrength = 1;
        this._emissiveFactor = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
    }
    get baseColorFactor() {
        return this._baseColorFactor;
    }
    set baseColorFactor(value) {
        this._baseColorFactor = value;
    }
    get metallicFactor() {
        return this._metallicFactor;
    }
    set metallicFactor(value) {
        this._metallicFactor = value;
    }
    get roughnessFactor() {
        return this._roughnessFactor;
    }
    set roughnessFactor(value) {
        this._roughnessFactor = value;
    }
    get emissiveFactor() {
        return this._emissiveFactor;
    }
    set emissiveFactor(value) {
        this._emissiveFactor = value;
    }
    get normalScale() {
        return this._normalScale;
    }
    set normalScale(value) {
        this._normalScale = value;
    }
    get occlusionStrength() {
        return this._occlusionStrength;
    }
    set occlusionStrength(value) {
        this._occlusionStrength = value;
    }
}
//# sourceMappingURL=metallicRoughness.js.map

/***/ }),

/***/ "../lib/math/color.js":
/*!****************************!*\
  !*** ../lib/math/color.js ***!
  \****************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/**
 * Created by Soeren on 26.11.2016.
 */
class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this._elements = new Float32Array([r, g, b, a]);
    }
    get r() {
        return this._elements[0];
    }
    set r(r) {
        this._elements[0] = r;
    }
    get g() {
        return this._elements[1];
    }
    set g(g) {
        this._elements[1] = g;
    }
    get b() {
        return this._elements[2];
    }
    set b(b) {
        this._elements[2] = b;
    }
    get a() {
        return this._elements[3];
    }
    set(a) {
        this._elements[3] = a;
    }
    mult(f) {
        if (typeof f === 'number') {
            f = f;
            return new Color(this.r * f, this.g * f, this.b * f, Math.abs(Math.min(this.a * f, 1)));
        }
        else {
            return new Color(this.r * f.r, this.g * f.g, this.b * f.b, Math.abs(Math.min(this.a * f.a, 1)));
        }
    }
    div(f) {
        if (typeof f === 'number') {
            f = f;
            return this.mult(1 / f);
        }
        let color = new Color(1 / f.r, 1 / f.g, 1 / f.b, Math.min(1 / f.a, 1));
        return this.mult(color);
    }
    plus(other) {
        return new Color(this.r + other.r, this.g + other.g, this.b + other.b, Math.abs(Math.min(this.a + other.a, 1)));
    }
    minus(other) {
        return new Color(this.r - other.r, this.g - other.g, this.b - other.b, Math.abs(Math.min(this.a - other.a, 1)));
    }
    get elements() {
        return this._elements;
    }
    set elements(value) {
        this._elements = value;
    }
    toString() {
        return "{Color: [R: " + this.r + " G: " + this.g + " B: " + this.b + " A: " + this.a + "]}";
    }
}
//# sourceMappingURL=color.js.map

/***/ }),

/***/ "../lib/math/index.js":
/*!****************************!*\
  !*** ../lib/math/index.js ***!
  \****************************/
/*! exports provided: Color, Math3d, Math2d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "../lib/math/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return _color__WEBPACK_IMPORTED_MODULE_0__["Color"]; });

/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "../lib/math/math.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Math3d", function() { return _math__WEBPACK_IMPORTED_MODULE_1__["Math3d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Math2d", function() { return _math__WEBPACK_IMPORTED_MODULE_1__["Math2d"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/math/math.js":
/*!***************************!*\
  !*** ../lib/math/math.js ***!
  \***************************/
/*! exports provided: Math3d, Math2d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Math3d", function() { return Math3d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Math2d", function() { return Math2d; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");

var Math3d;
(function (Math3d) {
    /**
     * Return a vector point on a position of a sphere
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {Vector}
     */
    function getVSpherePos(x, y, width, height) {
        const out = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(1.0 * x / width * 2.0 - 1.0, -(1.0 * y / height * 2.0 - 1.0), 0);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].squaredLength(out);
        let sqrLen = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].squaredLength(out);
        if (sqrLen <= 1.0) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].add(out, out, [0, 0, Math.sqrt(1 - sqrLen)]);
        }
        else {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].normalize(out, out);
        }
        return out;
    }
    Math3d.getVSpherePos = getVSpherePos;
    /**
     * Rotate vector v around axis n with angle a
     * @param {Vector} v - vector to rotate
     * @param {Vector} n - axis to rotate around
     * @param {number} a - rotation angle
     * @returns {Vector}
     */
    function rotateAxisAngle(v, n, a) {
        let co = Math.cos(a);
        let si = Math.sin(a);
        let o = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].create();
        let mx = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(n[0] * n[0] * (1.0 - co) + co, n[0] * n[1] * (1.0 - co) - n[2] * si, n[0] * n[2] * (1.0 - co) + n[1] * si);
        let my = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(n[0] * n[1] * (1.0 - co) + n[2] * si, n[1] * n[1] * (1.0 - co) + co, n[1] * n[2] * (1.0 - co) - n[0] * si);
        let mz = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(n[0] * n[2] * (1.0 - co) - n[1] * si, n[2] * n[1] * (1.0 - co) + n[0] * si, n[2] * n[2] * (1.0 - co) + co);
        o[0] = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].dot(mx, v);
        o[1] = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].dot(my, v);
        o[2] = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].dot(mz, v);
        return o;
    }
    Math3d.rotateAxisAngle = rotateAxisAngle;
    /**
     * transform degree to radians
     * @param {number} deg
     * @returns {number}
     */
    function radians(deg) {
        return deg * Math.PI / 180;
    }
    Math3d.radians = radians;
    /**
     * ModelTransform radians to degrees
     * @param {number} rad
     * @returns {number}
     */
    function degrees(rad) {
        return rad * 180 / Math.PI;
    }
    Math3d.degrees = degrees;
})(Math3d || (Math3d = {}));
var Math2d;
(function (Math2d) {
    function lerp(a, b, f) {
        return a + f * (b - a);
    }
    Math2d.lerp = lerp;
})(Math2d || (Math2d = {}));
//# sourceMappingURL=math.js.map

/***/ }),

/***/ "../lib/scene/animation/animation.js":
/*!*******************************************!*\
  !*** ../lib/scene/animation/animation.js ***!
  \*******************************************/
/*! exports provided: Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");

class Animation {
    constructor() {
        this.samplers = [];
        this.channels = [];
        this._duration = 0;
    }
    addSampler(sampler) {
        this.samplers.push(sampler);
    }
    addChannel(channel) {
        this.channels.push(channel);
    }
    animate(t) {
        const time = t * 0.001;
        for (let i = 0, sampler; sampler = this.samplers[i]; i++) {
            sampler.update(time);
        }
        for (let i = 0, channel; channel = this.channels[i]; i++) {
            const sampler = this.samplers[channel.sampler];
            const node = channel.node;
            switch (channel.path) {
                case "rotation":
                    gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].copy(node.transform.rotation, sampler.value);
                    break;
                case "translation":
                    gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(node.transform.translation, sampler.value);
                    break;
                case "scale":
                    gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].copy(node.transform.scale, sampler.value);
                    break;
            }
        }
    }
    get duration() {
        return this._duration;
    }
    set duration(duration) {
        this._duration = duration;
    }
    get durationMS() {
        return this._duration * 1000;
    }
    set durationMS(durationMS) {
        this._duration = durationMS * 0.001;
    }
}
//# sourceMappingURL=animation.js.map

/***/ }),

/***/ "../lib/scene/animation/animationChannel.js":
/*!**************************************************!*\
  !*** ../lib/scene/animation/animationChannel.js ***!
  \**************************************************/
/*! exports provided: AnimationChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationChannel", function() { return AnimationChannel; });
class AnimationChannel {
}
//# sourceMappingURL=animationChannel.js.map

/***/ }),

/***/ "../lib/scene/animation/animationSampler.js":
/*!**************************************************!*\
  !*** ../lib/scene/animation/animationSampler.js ***!
  \**************************************************/
/*! exports provided: Interpolation, AnimationSampler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interpolation", function() { return Interpolation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationSampler", function() { return AnimationSampler; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");

var Interpolation;
(function (Interpolation) {
    Interpolation["LINEAR"] = "LINEAR";
    Interpolation["STEP"] = "STEP";
    Interpolation["CUBICSPLINE"] = "CUBICSPLINE";
})(Interpolation || (Interpolation = {}));
class AnimationSampler {
    constructor() {
        this._interpolation = Interpolation.LINEAR;
        this.prevValue = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create();
        this.nextValue = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create();
        this._value = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].create();
        this._duration = 0;
    }
    updateValue(idx, t) {
        const typeCount = this._componentTypeCount;
        const prevIdx = idx * typeCount;
        const nextIdx = (prevIdx + typeCount + 2) <= this._outputData.length ? prevIdx + typeCount : prevIdx;
        const lerp = (typeCount === 4 ? gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].slerp : gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].lerp);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].set(this.prevValue, this._outputData[prevIdx], this._outputData[prevIdx + 1], this._outputData[prevIdx + 2], typeCount === 3 ? 0 : this._outputData[prevIdx + 3]);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec4"].set(this.nextValue, this._outputData[nextIdx], this._outputData[nextIdx + 1], this._outputData[nextIdx + 2], typeCount === 3 ? 0 : this._outputData[nextIdx + 3]);
        lerp(this._value, this.prevValue, this.nextValue, t);
    }
    update(t) {
        let idx = 0;
        while (idx < this._inputData.length - 2 && t >= this._inputData[idx + 1]) {
            idx++;
        }
        const previousTime = this._inputData[idx];
        const nextTime = this._inputData[idx + 1];
        const interpolationTime = Math.min(Math.max(0, (t - previousTime) / (nextTime - previousTime)), 1);
        this.updateValue(idx, interpolationTime);
    }
    get value() {
        return this._value;
    }
    get duration() {
        return this._duration;
    }
    set duration(duration) {
        this._duration = duration;
    }
    get interpolation() {
        return this._interpolation;
    }
    set interpolation(value) {
        this._interpolation = value;
    }
    get inputData() {
        return this._inputData;
    }
    set inputData(value) {
        this._inputData = value;
    }
    get outputData() {
        return this._outputData;
    }
    set outputData(value) {
        this._outputData = value;
    }
    get componentTypeCount() {
        return this._componentTypeCount;
    }
    set componentTypeCount(value) {
        this._componentTypeCount = value;
    }
}
//# sourceMappingURL=animationSampler.js.map

/***/ }),

/***/ "../lib/scene/animation/index.js":
/*!***************************************!*\
  !*** ../lib/scene/animation/index.js ***!
  \***************************************/
/*! exports provided: Animation, AnimationChannel, Interpolation, AnimationSampler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ "../lib/scene/animation/animation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _animation__WEBPACK_IMPORTED_MODULE_0__["Animation"]; });

/* harmony import */ var _animationChannel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animationChannel */ "../lib/scene/animation/animationChannel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationChannel", function() { return _animationChannel__WEBPACK_IMPORTED_MODULE_1__["AnimationChannel"]; });

/* harmony import */ var _animationSampler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animationSampler */ "../lib/scene/animation/animationSampler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpolation", function() { return _animationSampler__WEBPACK_IMPORTED_MODULE_2__["Interpolation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSampler", function() { return _animationSampler__WEBPACK_IMPORTED_MODULE_2__["AnimationSampler"]; });

/**
 * @file Automatically generated by barrelsby.
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/scene/data/accessor.js":
/*!*************************************!*\
  !*** ../lib/scene/data/accessor.js ***!
  \*************************************/
/*! exports provided: ACCESSOR_TYPE, GLTF_ACCESORTYPE_SIZE, Accessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCESSOR_TYPE", function() { return ACCESSOR_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLTF_ACCESORTYPE_SIZE", function() { return GLTF_ACCESORTYPE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Accessor", function() { return Accessor; });
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gl/constants */ "../lib/gl/constants/index.js");

var ACCESSOR_TYPE;
(function (ACCESSOR_TYPE) {
    ACCESSOR_TYPE["SCALAR"] = "SCALAR";
    ACCESSOR_TYPE["VEC2"] = "VEC2";
    ACCESSOR_TYPE["VEC3"] = "VEC3";
    ACCESSOR_TYPE["VEC4"] = "VEC4";
    ACCESSOR_TYPE["MAT2"] = "MAT2";
    ACCESSOR_TYPE["MAT3"] = "MAT3";
    ACCESSOR_TYPE["MAT4"] = "MAT4";
})(ACCESSOR_TYPE || (ACCESSOR_TYPE = {}));
const GLTF_ACCESORTYPE_SIZE = {
    [ACCESSOR_TYPE.SCALAR]: 1,
    [ACCESSOR_TYPE.VEC2]: 2,
    [ACCESSOR_TYPE.VEC3]: 3,
    [ACCESSOR_TYPE.VEC4]: 4,
    [ACCESSOR_TYPE.MAT2]: 4,
    [ACCESSOR_TYPE.MAT3]: 9,
    [ACCESSOR_TYPE.MAT4]: 16,
};
class Accessor {
    constructor() {
        this._byteOffset = 0;
        this._componentType = _gl_constants__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES"].FLOAT;
        this._stride = 0;
        this._normalized = false;
        this._max = [];
        this._min = [];
    }
    get bufferView() {
        return this._bufferView;
    }
    set bufferView(value) {
        this._bufferView = value;
    }
    get byteOffset() {
        return this._byteOffset;
    }
    set byteOffset(value) {
        this._byteOffset = value;
    }
    get componentType() {
        return this._componentType;
    }
    set componentType(value) {
        this._componentType = value;
    }
    get stride() {
        return this._stride;
    }
    set stride(value) {
        this._stride = value;
    }
    get normalized() {
        return this._normalized;
    }
    set normalized(value) {
        this._normalized = value;
    }
    get componentTypeCount() {
        return GLTF_ACCESORTYPE_SIZE[this._type];
    }
    get count() {
        return this._count;
    }
    set count(value) {
        this._count = value;
    }
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = value;
    }
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}
//# sourceMappingURL=accessor.js.map

/***/ }),

/***/ "../lib/scene/data/bufferView.js":
/*!***************************************!*\
  !*** ../lib/scene/data/bufferView.js ***!
  \***************************************/
/*! exports provided: BufferView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferView", function() { return BufferView; });
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gl/constants */ "../lib/gl/constants/index.js");

/**
 * Describes which buffer to create for the GPU
 */
class BufferView {
    constructor() {
        this.bufferOffset = 0;
        this.drawType = _gl_constants__WEBPACK_IMPORTED_MODULE_0__["GL_BUFFERS"].STATIC_DRAW;
    }
}
//# sourceMappingURL=bufferView.js.map

/***/ }),

/***/ "../lib/scene/data/index.js":
/*!**********************************!*\
  !*** ../lib/scene/data/index.js ***!
  \**********************************/
/*! exports provided: ACCESSOR_TYPE, GLTF_ACCESORTYPE_SIZE, Accessor, BufferView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accessor */ "../lib/scene/data/accessor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ACCESSOR_TYPE", function() { return _accessor__WEBPACK_IMPORTED_MODULE_0__["ACCESSOR_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTF_ACCESORTYPE_SIZE", function() { return _accessor__WEBPACK_IMPORTED_MODULE_0__["GLTF_ACCESORTYPE_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accessor", function() { return _accessor__WEBPACK_IMPORTED_MODULE_0__["Accessor"]; });

/* harmony import */ var _bufferView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bufferView */ "../lib/scene/data/bufferView.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferView", function() { return _bufferView__WEBPACK_IMPORTED_MODULE_1__["BufferView"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/scene/index.js":
/*!*****************************!*\
  !*** ../lib/scene/index.js ***!
  \*****************************/
/*! exports provided: Mesh, Scene, SceneNode, Shader, Transform, Animation, AnimationChannel, Interpolation, AnimationSampler, ACCESSOR_TYPE, GLTF_ACCESORTYPE_SIZE, Accessor, BufferView, Primitive, Skin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "../lib/scene/mesh.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _mesh__WEBPACK_IMPORTED_MODULE_0__["Mesh"]; });

/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scene */ "../lib/scene/scene.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return _scene__WEBPACK_IMPORTED_MODULE_1__["Scene"]; });

/* harmony import */ var _sceneNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sceneNode */ "../lib/scene/sceneNode.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return _sceneNode__WEBPACK_IMPORTED_MODULE_2__["SceneNode"]; });

/* harmony import */ var _shader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shader */ "../lib/scene/shader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return _shader__WEBPACK_IMPORTED_MODULE_3__["Shader"]; });

/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transform */ "../lib/scene/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return _transform__WEBPACK_IMPORTED_MODULE_4__["Transform"]; });

/* harmony import */ var _animation_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animation/index */ "../lib/scene/animation/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return _animation_index__WEBPACK_IMPORTED_MODULE_5__["Animation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationChannel", function() { return _animation_index__WEBPACK_IMPORTED_MODULE_5__["AnimationChannel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interpolation", function() { return _animation_index__WEBPACK_IMPORTED_MODULE_5__["Interpolation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSampler", function() { return _animation_index__WEBPACK_IMPORTED_MODULE_5__["AnimationSampler"]; });

/* harmony import */ var _data_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data/index */ "../lib/scene/data/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ACCESSOR_TYPE", function() { return _data_index__WEBPACK_IMPORTED_MODULE_6__["ACCESSOR_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLTF_ACCESORTYPE_SIZE", function() { return _data_index__WEBPACK_IMPORTED_MODULE_6__["GLTF_ACCESORTYPE_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Accessor", function() { return _data_index__WEBPACK_IMPORTED_MODULE_6__["Accessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferView", function() { return _data_index__WEBPACK_IMPORTED_MODULE_6__["BufferView"]; });

/* harmony import */ var _primitive_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./primitive/index */ "../lib/scene/primitive/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Primitive", function() { return _primitive_index__WEBPACK_IMPORTED_MODULE_7__["Primitive"]; });

/* harmony import */ var _skin_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./skin/index */ "../lib/scene/skin/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return _skin_index__WEBPACK_IMPORTED_MODULE_8__["Skin"]; });

/**
 * @file Automatically generated by barrelsby.
 */









//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/scene/mesh.js":
/*!****************************!*\
  !*** ../lib/scene/mesh.js ***!
  \****************************/
/*! exports provided: Mesh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return Mesh; });
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gl */ "../lib/gl/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");


class Mesh {
    constructor() {
        this._primitives = [];
        this._bufferViews = Object.create(null);
    }
    /**
     * init this modell by creating the GPUBuffers(Vertex- and Indexbuffer)
     * ot upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    init(gl, vertexBuffer, indexBuffer) {
        this.initBuffers(gl, vertexBuffer, indexBuffer);
        this.setIndexBuffers(gl);
        return this;
    }
    initBuffers(gl, vertexBuffer, indexBuffer) {
        const keys = Object.keys(this._bufferViews);
        for (let i = 0, view; view = this._bufferViews[keys[i]]; i++) {
            if (view.buffer === null || view.buffer === undefined) {
                let buffer;
                if (view.target === _gl__WEBPACK_IMPORTED_MODULE_0__["GL_BUFFERS"].ARRAY_BUFFER) {
                    buffer = vertexBuffer || _gl__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].create(gl, view.target, null, view.drawType);
                }
                else {
                    buffer = indexBuffer || _gl__WEBPACK_IMPORTED_MODULE_0__["GLBuffer"].create(gl, view.target, null, view.drawType);
                }
                view.bufferOffset = buffer.byteLength;
                buffer.addData(view.data);
                view.buffer = buffer;
            }
        }
    }
    /**
     * Create all the VAO for the IndexBuffers
     * @param {WebGL2RenderingContext} gl
     */
    setIndexBuffers(gl) {
        for (let i = 0, primitive; primitive = this._primitives[i]; i++) {
            if (primitive.indices && primitive.indices.bufferView !== undefined && primitive.indices.bufferView !== null) {
                const view = this._bufferViews[primitive.indices.bufferView];
                primitive.initVertexArrayObject(gl, view.buffer);
            }
        }
    }
    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    upload() {
        const keys = Object.keys(this._bufferViews);
        for (let i = 0, view; view = this._bufferViews[keys[i]]; i++) {
            if (!view.buffer) {
                throw "Failed to upload buffer for bufferView, did you forget to initialize the buffer first?";
            }
            view.buffer.upload();
        }
        return this;
    }
    /**
     * Draws all Meshes that form the Mesh
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     * @param {Cache} cache - cache to get the materials
     */
    draw(shader, cache) {
        shader.applyMesh(this);
        for (let i = 0, primitive; primitive = this._primitives[i]; i++) {
            const view = this._bufferViews[primitive.indices.bufferView];
            const offset = view.bufferOffset + primitive.indices.byteOffset;
            shader.applyMaterial(cache.get(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].MATERIAL, primitive.material));
            primitive.draw(primitive.draw_mode, primitive.indices.count, primitive.indices.componentType, offset);
        }
    }
    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key, glAttribute) {
        for (let i = 0, primitive; primitive = this._primitives[i]; i++) {
            const attribute = primitive.attributes[key];
            if (attribute !== null && attribute !== undefined) {
                const view = this._bufferViews[attribute.bufferView];
                const buffer = view.buffer;
                const offset = view.bufferOffset + attribute.byteOffset;
                primitive.vertexArrayObject.addAttribute(buffer, glAttribute, attribute.componentTypeCount, attribute.componentType, attribute.normalized, attribute.stride, offset);
            }
        }
    }
    /**
     * check if any primitive in this mesh has the attribute
     * @param key - key of the attribute e.g. TANGENT,NORMAL, etc.
     */
    hasAttribute(key) {
        for (let i = 0, primitive; primitive = this._primitives[i]; i++) {
            if (primitive.hasAttribute(key)) {
                return true;
            }
        }
        return false;
    }
    /**
     * check if any material used by a primitve has the map with the specified key
     * @param cache - cache to get the material from
     * @param key - key of the map e.g ALBEDO, METALIC_ROUGHNESS etc.
     */
    hasMap(cache, key) {
        for (let i = 0, primitive; primitive = this._primitives[i]; i++) {
            const material = cache.get(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].MATERIAL, primitive.material);
            if (material) {
                return material.hasMap(key);
            }
        }
    }
    unload() {
        //TODO: destroy data and each mesh vao
    }
    addPrimitive(mesh) {
        this._primitives.push(mesh);
        return mesh;
    }
    get primitives() {
        return this._primitives;
    }
    set primitives(value) {
        this._primitives = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    addBufferView(idx, bufferView) {
        this._bufferViews[idx] = bufferView;
    }
}
//# sourceMappingURL=mesh.js.map

/***/ }),

/***/ "../lib/scene/primitive/index.js":
/*!***************************************!*\
  !*** ../lib/scene/primitive/index.js ***!
  \***************************************/
/*! exports provided: Primitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _primitive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primitive */ "../lib/scene/primitive/primitive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Primitive", function() { return _primitive__WEBPACK_IMPORTED_MODULE_0__["Primitive"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/scene/primitive/primitive.js":
/*!*******************************************!*\
  !*** ../lib/scene/primitive/primitive.js ***!
  \*******************************************/
/*! exports provided: Primitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Primitive", function() { return Primitive; });
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gl */ "../lib/gl/index.js");
/* harmony import */ var _data_accessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/accessor */ "../lib/scene/data/accessor.js");


/**
 * GLTF Primitive wrapper
 * Primitive is a Geometric piece of the Mesh that uses a specific material
 * or. a stream of vertices that can be rendered together
 */
class Primitive {
    constructor() {
        this._attributes = Object.create(null);
        this._draw_mode = 4; //GL_TRIANGLE
        this._material = "__default__";
    }
    /**
     * Check if this mesh has the attribute
     * @param key - name/key of the attribute e.g. TANGENT,NORMAL,POSITION etc.
     */
    hasAttribute(key) {
        return !!this._attributes[key];
    }
    /**
     * adds an attribute to the MeshPrimitive, that is later send to the GPU via an VAO
     * @param {GL_PRIMITIVES | string} key
     * @param {number} accessorType
     * @param {GL_TYPES} glType
     * @param {boolean} normalized
     * @param {number} stride
     * @param {number} byteOffset
     * @param {number} bufferView
     * @param {ACCESSOR_TYPE} componentType
     * @param count
     * @param min
     * @param max
     * @returns {Accessor}
     */
    addAttribute(key, accessorType, glType, normalized = false, stride = 0, byteOffset = 0, bufferView, min = [], max = []) {
        const accessor = new _data_accessor__WEBPACK_IMPORTED_MODULE_1__["Accessor"]();
        accessor.bufferView = bufferView;
        accessor.type = accessorType;
        accessor.componentType = glType;
        accessor.normalized = normalized;
        accessor.stride = stride;
        accessor.byteOffset = byteOffset;
        accessor.min = min;
        accessor.max = max;
        this._attributes[key] = accessor;
        return this._attributes[key];
    }
    /**
     * Sets the index accessor that is later used for the IndexBuffer as an attribute and send to the GPU
     * @param {number} count
     * @param {GL_TYPES} type
     * @param {number} byteOffset
     * @param {number} bufferView
     * @returns {IndexAccessor}
     */
    setIndices(count, type, byteOffset = 0, bufferView) {
        this._indices = new _data_accessor__WEBPACK_IMPORTED_MODULE_1__["Accessor"]();
        this._indices.bufferView = bufferView;
        this._indices.count = count;
        this._indices.componentType = type;
        this._indices.byteOffset = byteOffset;
        return this._indices;
    }
    initVertexArrayObject(gl, indexBuffer, vao) {
        this._vertexArrayObject = vao || new _gl__WEBPACK_IMPORTED_MODULE_0__["GLVertexArrayObject"](gl);
        this._vertexArrayObject.setIndexBuffer(indexBuffer);
    }
    /**
     * Should only be called by the Models draw method, to calculate the actual offset
     * which is the bufferOffset + bufferDataOffset + indexAccessorOffset
     * @param {number} mode
     * @param {number} size
     * @param {number} type
     * @param {number} offset
     */
    draw(mode = this._draw_mode, size = this._indices.count, type = this._indices.componentType, offset = this._indices.byteOffset) {
        if (this._vertexArrayObject) {
            this._vertexArrayObject.bind();
            this._vertexArrayObject.draw(mode, size, type, offset);
            this._vertexArrayObject.unbind();
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get draw_mode() {
        return this._draw_mode;
    }
    set draw_mode(value) {
        this._draw_mode = value;
    }
    get attributes() {
        return this._attributes;
    }
    set attributes(value) {
        this._attributes = value;
    }
    get indices() {
        return this._indices;
    }
    set indices(value) {
        this._indices = value;
    }
    get material() {
        return this._material;
    }
    set material(value) {
        this._material = value;
    }
    get vertexArrayObject() {
        return this._vertexArrayObject;
    }
    set vertexArrayObject(value) {
        this._vertexArrayObject = value;
    }
}
//# sourceMappingURL=primitive.js.map

/***/ }),

/***/ "../lib/scene/scene.js":
/*!*****************************!*\
  !*** ../lib/scene/scene.js ***!
  \*****************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
class Scene {
    constructor() {
        this._nodes = [];
        this._meshes = [];
        this._animations = [];
    }
    /**
     * init the scene creating the GPUBuffers(Vertex- and Indexbuffer) or using an existing MeshBuffermap
     * or upload the data to an existing buffer
     * @param {WebGL2RenderingContext} gl
     * @param {GLBuffer} vertexBuffer - use existing VertexBuffer and add the gltf data into it
     * @param {GLBuffer} indexBuffer - use existing IndexBuffer and add the gltf indices into it
     * @returns {Mesh}
     */
    init(gl, vertexBuffer, indexBuffer) {
        for (let i = 0, node; node = this._nodes[i]; i++) {
            node.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }
    /**
     * Make sure to initialize(init) the Mesh before uploading the data
     * Create the GPU_Buffers and upload this Mesh to the GPU
     * @returns {Mesh}
     */
    upload() {
        for (let i = 0, node; node = this._nodes[i]; i++) {
            node.upload();
        }
        return this;
    }
    /**
     * Draws all Meshes in the scene
     * @param {Shader} shader - Shader that should be used for all primitives/Materials
     * @param {Cache} cache - cache to get the materials
     */
    draw(shader, cache) {
        for (let i = 0, node; node = this._nodes[i]; i++) {
            shader.applyScene(this);
            node.draw(shader, cache);
        }
    }
    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key, glAttribute) {
        for (let i = 0, node; node = this._nodes[i]; i++) {
            node.addAttribute(key, glAttribute);
        }
    }
    addNode(...nodes) {
        for (let i = 0, node; node = nodes[i]; i++) {
            this._nodes.push(node);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get meshes() {
        return this._meshes;
    }
    set meshes(value) {
        this._meshes = value;
    }
    get animations() {
        return this._animations;
    }
    set animations(value) {
        this._animations = value;
    }
    get root() {
        return this._nodes[0];
    }
}
//# sourceMappingURL=scene.js.map

/***/ }),

/***/ "../lib/scene/sceneNode.js":
/*!*********************************!*\
  !*** ../lib/scene/sceneNode.js ***!
  \*********************************/
/*! exports provided: SceneNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneNode", function() { return SceneNode; });
class SceneNode {
    constructor() {
        this.children = [];
    }
    init(gl, vertexBuffer, indexBuffer) {
        if (this.mesh) {
            this.mesh.init(gl, vertexBuffer, indexBuffer);
        }
        if (this.skin) {
            this.skin.init(gl);
        }
        for (let i = 0, child; child = this.children[i]; i++) {
            child.init(gl, vertexBuffer, indexBuffer);
        }
        return this;
    }
    upload() {
        if (this.mesh) {
            this.mesh.upload();
        }
        for (let i = 0, child; child = this.children[i]; i++) {
            child.upload();
        }
        return this;
    }
    draw(shader, cache) {
        if (this.mesh) {
            shader.applyNode(this);
            this.mesh.draw(shader, cache);
        }
        for (let i = 0, child; child = this.children[i]; i++) {
            child.draw(shader, cache);
        }
    }
    /**
     * Add an attribute to the VAO
     * @param {GL_PRIMITIVES} key
     * @param {Shader} shader
     * @param {Attributes.GLAttribute} glAttribute
     */
    addAttribute(key, glAttribute) {
        if (this.mesh) {
            this.mesh.addAttribute(key, glAttribute);
        }
        for (let i = 0, child; child = this.children[i]; i++) {
            child.addAttribute(key, glAttribute);
        }
    }
    addChild(child) {
        this.children.push(child);
    }
}
//# sourceMappingURL=sceneNode.js.map

/***/ }),

/***/ "../lib/scene/shader.js":
/*!******************************!*\
  !*** ../lib/scene/shader.js ***!
  \******************************/
/*! exports provided: Shader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony import */ var _gl_shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gl/shader */ "../lib/gl/shader/index.js");

class Shader extends _gl_shader__WEBPACK_IMPORTED_MODULE_0__["GLShader"] {
    constructor(gl, vertexSrc, fragmentSrc) {
        super(gl, vertexSrc, fragmentSrc);
    }
    apply() { }
    applyMaterial(material) { }
    applyMesh(mesh) { }
    applyNode(node) { }
    applyScene(scene) { }
}
//# sourceMappingURL=shader.js.map

/***/ }),

/***/ "../lib/scene/skin/index.js":
/*!**********************************!*\
  !*** ../lib/scene/skin/index.js ***!
  \**********************************/
/*! exports provided: Skin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./skin */ "../lib/scene/skin/skin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return _skin__WEBPACK_IMPORTED_MODULE_0__["Skin"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/scene/skin/skin.js":
/*!*********************************!*\
  !*** ../lib/scene/skin/skin.js ***!
  \*********************************/
/*! exports provided: Skin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skin", function() { return Skin; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _gl_GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../gl/GLUniformBufferObject */ "../lib/gl/GLUniformBufferObject.js");
/* harmony import */ var _viewer_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../viewer/constants */ "../lib/viewer/constants.js");



const NUM_MAX_JOINTS = 65;
class Skin {
    constructor() {
        this._joints = [];
        this._inverseBindMatrices = [];
        this._jointMatrices = [];
        this._data = new Float32Array(NUM_MAX_JOINTS * 16);
        this._dirty = true;
    }
    init(gl) {
        for (let i = 0; i < this._joints.length; i++) {
            this._jointMatrices.push(gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create());
        }
        this._ubo = new _gl_GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_1__["GLUniformBufferObject"](gl, _viewer_constants__WEBPACK_IMPORTED_MODULE_2__["UBO_BINDINGS"].SKIN);
        this._ubo.addItem('matrix', 'mat4', this._data);
        this._ubo.upload();
        this._ubo.bindUBO();
        //this.update();
    }
    update() {
        if (!this._dirty) {
            return;
        }
        for (let i = 0, jointMatrix; jointMatrix = this._jointMatrices[i]; i++) {
            this._data.set(jointMatrix, i * 16);
        }
        this._ubo.updateItem("matrix", this._data, true);
        this._dirty = false;
    }
    get joints() {
        return this._joints;
    }
    set joints(value) {
        this._joints = value;
    }
    get skeleton() {
        return this._skeleton;
    }
    set skeleton(value) {
        this._skeleton = value;
    }
    get inverseBindMatrices() {
        return this._inverseBindMatrices;
    }
    set inverseBindMatrices(value) {
        this._inverseBindMatrices = value;
    }
    get jointMatrices() {
        this._dirty = true;
        return this._jointMatrices;
    }
    set jointMatrices(value) {
        this._dirty = true;
        this._jointMatrices = value;
    }
    get ubo() {
        return this._ubo;
    }
    set ubo(value) {
        this._ubo = value;
    }
}
//# sourceMappingURL=skin.js.map

/***/ }),

/***/ "../lib/scene/transform.js":
/*!*********************************!*\
  !*** ../lib/scene/transform.js ***!
  \*********************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");

class Transform {
    constructor(config = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 }
    }) {
        this.init(config);
    }
    init(config = {
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: 1, y: 1, z: 1 }
    }) {
        //M=T*R*S
        this._localMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        if (!config) {
            config = Object.create(null);
        }
        if (!config.position) {
            config.position = { x: 0, y: 0, z: 0 };
        }
        if (!config.rotation) {
            config.rotation = { x: 0, y: 0, z: 0, w: 1 };
        }
        if (!config.scale) {
            config.scale = { x: 1, y: 1, z: 1 };
        }
        this._rotation = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["quat"].fromValues(config.rotation.x, config.rotation.y, config.rotation.z, config.rotation.w);
        this._translation = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(config.position.x, config.position.y, config.position.z);
        this._scale = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["vec3"].fromValues(config.scale.x, config.scale.y, config.scale.z);
        this._children = [];
        this._level = 0;
        this._dirty = true;
        this._worldMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].create();
        this.apply();
    }
    addChild(child) {
        if (child._parent) {
            child._parent.removeChild(child);
        }
        child._parent = this;
        child._level = this._level + 1;
        this._children.push(child);
    }
    removeChild(child) {
        const index = this._children.indexOf(child);
        if (index > -1) {
            child._level = 0;
            child._parent = undefined;
            this._children.splice(index, 1);
        }
    }
    apply() {
        if (this._dirty) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].fromRotationTranslationScale(this._localMatrix, this._rotation, this._translation, this._scale);
            this._dirty = false;
        }
        return this._localMatrix;
    }
    //TODO: check if we need to recalculate worldMatrix
    get worldMatrix() {
        if (!this._parent) {
            return this.apply();
        }
        else {
            return gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].multiply(this._worldMatrix, this._parent.worldMatrix, this.localMatrix);
        }
    }
    get modelMatrix() {
        return this.worldMatrix;
    }
    /**
     * Returns the LocalTransformation Matrix
     * @returns {Matrix}
     */
    get localMatrix() {
        return this.apply();
    }
    set localMatrix(value) {
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].getRotation(this._rotation, value);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].getTranslation(this._translation, value);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__["mat4"].getScaling(this._scale, value);
        this._dirty = true;
    }
    get translation() {
        this._dirty = true;
        return this._translation;
    }
    set translation(value) {
        this._dirty = true;
        this._translation = value;
    }
    get rotation() {
        this._dirty = true;
        return this._rotation;
    }
    set rotation(value) {
        this._dirty = true;
        this._rotation = value;
    }
    get scale() {
        this._dirty = true;
        return this._scale;
    }
    set scale(value) {
        this._dirty = true;
        this._scale = value;
    }
    get level() {
        return this._level;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
    get children() {
        return this._children;
    }
    set children(value) {
        this._children = value;
    }
    get dirty() {
        return this._dirty;
    }
}
//# sourceMappingURL=transform.js.map

/***/ }),

/***/ "../lib/shader/SkyboxShader.js":
/*!*************************************!*\
  !*** ../lib/shader/SkyboxShader.js ***!
  \*************************************/
/*! exports provided: SkyboxShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkyboxShader", function() { return SkyboxShader; });
/* harmony import */ var _scene_shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/shader */ "../lib/scene/shader.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");
/* harmony import */ var _viewer_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../viewer/constants */ "../lib/viewer/constants.js");



class SkyboxShader extends _scene_shader__WEBPACK_IMPORTED_MODULE_0__["Shader"] {
    constructor(gl, cache) {
        super(gl);
        this.cache = cache;
    }
    apply() {
        this.applyCamera();
        const texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_1__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_2__["GLOBAL_TEXTURES"].SKYBOX);
        texture.bind(0);
        this.uniforms.u_Skybox = 0;
    }
    applyCamera() {
        this.uniforms.Matrices = _viewer_constants__WEBPACK_IMPORTED_MODULE_2__["UBO_BINDINGS"].CAMERA;
    }
}
//# sourceMappingURL=SkyboxShader.js.map

/***/ }),

/***/ "../lib/shader/index.js":
/*!******************************!*\
  !*** ../lib/shader/index.js ***!
  \******************************/
/*! exports provided: KhronosPbrShader, SkyboxShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _khronosPbrShader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./khronosPbrShader */ "../lib/shader/khronosPbrShader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KhronosPbrShader", function() { return _khronosPbrShader__WEBPACK_IMPORTED_MODULE_0__["KhronosPbrShader"]; });

/* harmony import */ var _SkyboxShader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SkyboxShader */ "../lib/shader/SkyboxShader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxShader", function() { return _SkyboxShader__WEBPACK_IMPORTED_MODULE_1__["SkyboxShader"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/shader/khronosPbrShader.js":
/*!*****************************************!*\
  !*** ../lib/shader/khronosPbrShader.js ***!
  \*****************************************/
/*! exports provided: KhronosPbrShader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KhronosPbrShader", function() { return KhronosPbrShader; });
/* harmony import */ var _scene_shader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scene/shader */ "../lib/scene/shader.js");
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material */ "../lib/material/index.js");
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gl */ "../lib/gl/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");
/* harmony import */ var _viewer_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../viewer/constants */ "../lib/viewer/constants.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");






const TEXTURES = {
    DIFFUSE_ENVIRONMENT: 0,
    SPECULAR_ENVIRONMENT: 1,
    BRDF_LUT: 2,
    DIFFUSE: 3,
    METALLIC_ROUGHNESS: 4,
    NORMAL: 5,
    EMISSIVE: 6,
    OCCLUSION: 7
};
class KhronosPbrShader extends _scene_shader__WEBPACK_IMPORTED_MODULE_0__["Shader"] {
    constructor(gl, cache) {
        super(gl);
        this.cache = cache;
    }
    initializeDefines(model) {
        if (model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].NORMAL)) {
            this.addDefine("HAS_NORMALS", 1);
        }
        if (model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].TANGENT)) {
            this.addDefine("HAS_TANGENTS", 1);
        }
        if (model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].TEXCOORD_0)) {
            this.addDefine("HAS_UV", 1);
        }
        if (model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].JOINTS_0) && model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].WEIGHTS_0)) {
            this.addDefine("HAS_SKIN", 1);
        }
        if (model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].JOINTS_1) && model.hasAttribute(_gl__WEBPACK_IMPORTED_MODULE_2__["GL_PRIMITIVES"].WEIGHTS_1)) {
            this.addDefine("SKIN_VEC8", 1);
        }
        if (model.hasMap(this.cache, _material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].ALBEDO)) {
            this.addDefine("HAS_BASECOLORMAP", 1);
        }
        if (model.hasMap(this.cache, _material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].METAL_ROUGHNESS)) {
            this.addDefine("HAS_METALROUGHNESSMAP", 1);
        }
        if (model.hasMap(this.cache, _material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].NORMAL)) {
            this.addDefine("HAS_NORMALMAP", 1);
        }
        if (model.hasMap(this.cache, _material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].EMISSIVE)) {
            this.addDefine("HAS_EMISSIVEMAP", 1);
        }
        if (model.hasMap(this.cache, _material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].OCCLUSION)) {
            this.addDefine("HAS_OCCLUSIONMAP", 1);
        }
        const brdfLUT = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].BRDF_LUT);
        const diffuseEnv = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].DIFFUSE_ENVIRONMENT);
        const specularEnv = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].SPECULAR_ENVIRONMENT);
        if (brdfLUT && diffuseEnv && specularEnv) {
            this.addDefine("USE_IBL", 1);
        }
    }
    applyMesh(model) { }
    applyNode(node) {
        this.uniforms.u_ModelMatrix = node.transform.modelMatrix;
        if (node.skin) {
            const inverseTransformMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].create();
            //TODO: skin.skeleton.transform.modelMatrix if skeleton provided
            gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].invert(inverseTransformMatrix, node.transform.modelMatrix);
            for (let i = 0, join; join = node.skin.joints[i]; i++) {
                const joinMatrix = node.skin.jointMatrices[i];
                gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].mul(joinMatrix, join.transform.modelMatrix, node.skin.inverseBindMatrices[i]);
                gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].mul(joinMatrix, inverseTransformMatrix, joinMatrix);
            }
            node.skin.update();
        }
    }
    applyScene(scene) {
    }
    applyMaterial(material) {
        this.applyCamera();
        this.applyTextures(material);
        this.applyIBL();
        this.uniforms.u_BaseColorFactor = material.model.baseColorFactor;
        this.uniforms.u_RoughnessFactor = material.model.roughnessFactor;
        this.uniforms.u_MetallicFactor = material.model.metallicFactor;
    }
    applyIBL() {
        /*******************************IBL*************************************/
        const brdfLUT = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].BRDF_LUT);
        if (brdfLUT) {
            brdfLUT.bind(TEXTURES.BRDF_LUT);
            this.uniforms.u_brdfLUT = TEXTURES.BRDF_LUT;
        }
        const diffuseEnv = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].DIFFUSE_ENVIRONMENT);
        if (diffuseEnv) {
            diffuseEnv.bind(TEXTURES.DIFFUSE_ENVIRONMENT);
            this.uniforms.u_DiffuseEnvSampler = TEXTURES.DIFFUSE_ENVIRONMENT;
        }
        const specularEnv = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["GLOBAL_TEXTURES"].SPECULAR_ENVIRONMENT);
        if (specularEnv) {
            specularEnv.bind(TEXTURES.SPECULAR_ENVIRONMENT);
            this.uniforms.u_SpecularEnvSampler = TEXTURES.SPECULAR_ENVIRONMENT;
        }
    }
    applyTextures(material) {
        //applyMaterial BaseColor Texture
        if (material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].ALBEDO] && this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].ALBEDO].texture)) {
            const texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].ALBEDO].texture);
            texture.bind(TEXTURES.DIFFUSE);
            this.uniforms.u_BaseColorSampler = TEXTURES.DIFFUSE;
        }
        //applyMaterial MetallicRoughnessSampler
        if (material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].METAL_ROUGHNESS] && this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].METAL_ROUGHNESS].texture)) {
            let texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].METAL_ROUGHNESS].texture);
            texture.bind(TEXTURES.METALLIC_ROUGHNESS);
            this.uniforms.u_MetallicRoughnessSampler = TEXTURES.METALLIC_ROUGHNESS;
        }
        //applyMaterial NormalMaps
        if (material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].NORMAL] && this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].NORMAL].texture)) {
            let texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].NORMAL].texture);
            texture.bind(TEXTURES.NORMAL);
            this.uniforms.u_NormalSampler = TEXTURES.NORMAL;
            this.uniforms.u_NormalScale = material.model.normalScale;
        }
        //applyMaterial emissive map
        if (material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].EMISSIVE] && this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].EMISSIVE].texture)) {
            let texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].EMISSIVE].texture);
            texture.bind(TEXTURES.EMISSIVE);
            this.uniforms.u_EmissiveSampler = TEXTURES.EMISSIVE;
            this.uniforms.u_EmissiveFactor = material.model.emissiveFactor;
        }
        //applyMesh Occlusion map
        if (material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].OCCLUSION] && this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].OCCLUSION].texture)) {
            let texture = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_3__["CACHE_TYPE"].TEXTURE, material.maps[_material__WEBPACK_IMPORTED_MODULE_1__["MATERIAL_MAPS"].OCCLUSION].texture);
            texture.bind(TEXTURES.OCCLUSION);
            this.uniforms.u_OcclusionSampler = TEXTURES.OCCLUSION;
            this.uniforms.u_OcclusionStrength = material.model.occlusionStrength;
        }
    }
    applyCamera() {
        this.uniforms.Matrices = _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["UBO_BINDINGS"].CAMERA;
        this.uniforms.JointMatrix = _viewer_constants__WEBPACK_IMPORTED_MODULE_4__["UBO_BINDINGS"].SKIN;
    }
}
//# sourceMappingURL=khronosPbrShader.js.map

/***/ }),

/***/ "../lib/systems/animation/AnimationSystem.js":
/*!***************************************************!*\
  !*** ../lib/systems/animation/AnimationSystem.js ***!
  \***************************************************/
/*! exports provided: AnimationSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationSystem", function() { return AnimationSystem; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_scene_animationComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/scene/animationComponent */ "../lib/components/scene/animationComponent.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cache */ "../lib/cache/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let AnimationSystem = class AnimationSystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(cache) {
        super();
        this.cache = cache;
    }
    setUp() {
    }
    tearDown() {
    }
    update(t) {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            const animationComponent = entity.get(_components_scene_animationComponent__WEBPACK_IMPORTED_MODULE_1__["AnimationComponent"]);
            if (animationComponent.autoStart && animationComponent.loop && !animationComponent.running) {
                animationComponent.start();
            }
            const animation = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].ANIMATION, animationComponent.key);
            const pauseDuration = (animationComponent.pauseEnd - animationComponent.pauseStart);
            const time = t - animationComponent.startTime - pauseDuration;
            if (!animationComponent.paused && animationComponent.running) {
                animation.animate(time);
            }
            if (time >= animation.durationMS) {
                animationComponent.stop();
            }
        }
    }
};
AnimationSystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System(_components_scene_animationComponent__WEBPACK_IMPORTED_MODULE_1__["AnimationComponent"])
], AnimationSystem);

//# sourceMappingURL=AnimationSystem.js.map

/***/ }),

/***/ "../lib/systems/animation/index.js":
/*!*****************************************!*\
  !*** ../lib/systems/animation/index.js ***!
  \*****************************************/
/*! exports provided: AnimationSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnimationSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationSystem */ "../lib/systems/animation/AnimationSystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSystem", function() { return _AnimationSystem__WEBPACK_IMPORTED_MODULE_0__["AnimationSystem"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/camera/CameraSystem.js":
/*!*********************************************!*\
  !*** ../lib/systems/camera/CameraSystem.js ***!
  \*********************************************/
/*! exports provided: CameraSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CameraSystem", function() { return CameraSystem; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "../lib/components/index.js");
/* harmony import */ var _gl_GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../gl/GLUniformBufferObject */ "../lib/gl/GLUniformBufferObject.js");
/* harmony import */ var _viewer_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../viewer/constants */ "../lib/viewer/constants.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! curbl-ecs/lib/Events */ "../node_modules/curbl-ecs/lib/Events.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






/**
 * Handle Camera component
 */
let CameraSystem = class CameraSystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(config) {
        super();
        this.gl = config.gl;
        this.translation = gl_matrix__WEBPACK_IMPORTED_MODULE_5__["vec3"].create();
    }
    setUp() {
        const initMatrix = gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].create();
        this.cameraUBO = new _gl_GLUniformBufferObject__WEBPACK_IMPORTED_MODULE_2__["GLUniformBufferObject"](this.gl, _viewer_constants__WEBPACK_IMPORTED_MODULE_3__["UBO_BINDINGS"].CAMERA);
        this.cameraUBO.addItem("projectionMatrix", "mat4");
        this.cameraUBO.addItem("viewMatrix", "mat4");
        this.cameraUBO.addItem("viewPos", "vec3");
        this.cameraUBO.updateItem("projectionMatrix", initMatrix);
        this.cameraUBO.updateItem("viewMatrix", initMatrix);
        this.cameraUBO.updateItem("viewPos", this.translation);
        this.cameraUBO.upload();
        this.cameraUBO.bindUBO();
        this.events.on(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_4__["SYSTEM_EVENTS"].ENTITY_ADDED, this.initEntity, this);
        this.events.on(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_4__["SYSTEM_EVENTS"].ENTITY_REMOVED, this.removeEntity, this);
    }
    initEntity(entity) {
        if (!this._camera) {
            this._camera = entity;
            const camera = this._camera.get(_components__WEBPACK_IMPORTED_MODULE_1__["CameraComponent"]);
            const transform = this._camera.get(_components__WEBPACK_IMPORTED_MODULE_1__["TransformComponent"]);
            this.cameraUBO.updateItem("projectionMatrix", camera.projMatrix);
            this.cameraUBO.updateItem("viewMatrix", camera.viewMatrix);
            this.cameraUBO.updateItem("viewPos", gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].getTranslation(this.translation, transform.modelMatrix));
            this.cameraUBO.upload();
            this.cameraUBO.bindUBO();
        }
    }
    removeEntity(entity) {
        if (entity === this._camera) {
            this._camera = undefined;
        }
    }
    render() {
        if (this._camera) {
            const camera = this._camera.get(_components__WEBPACK_IMPORTED_MODULE_1__["CameraComponent"]);
            const transform = this._camera.get(_components__WEBPACK_IMPORTED_MODULE_1__["TransformComponent"]);
            this.cameraUBO.updateItem("projectionMatrix", camera.projMatrix, true);
            this.cameraUBO.updateItem("viewMatrix", camera.viewMatrix, true);
            this.cameraUBO.updateItem("viewPos", gl_matrix__WEBPACK_IMPORTED_MODULE_5__["mat4"].getTranslation(this.translation, transform.modelMatrix), true);
        }
    }
    get camera() {
        return this._camera;
    }
    set camera(value) {
        this._camera = value;
    }
};
CameraSystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System(_components__WEBPACK_IMPORTED_MODULE_1__["TransformComponent"], _components__WEBPACK_IMPORTED_MODULE_1__["CameraComponent"])
], CameraSystem);

//# sourceMappingURL=CameraSystem.js.map

/***/ }),

/***/ "../lib/systems/camera/LookAtCameraControlSystem.js":
/*!**********************************************************!*\
  !*** ../lib/systems/camera/LookAtCameraControlSystem.js ***!
  \**********************************************************/
/*! exports provided: LookAtCameraControlSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraControlSystem", function() { return LookAtCameraControlSystem; });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components */ "../lib/components/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../math */ "../lib/math/index.js");
/* harmony import */ var _events_DomEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/DomEvents */ "../lib/events/DomEvents.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let LookAtCameraControlSystem = class LookAtCameraControlSystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_1__["System"] {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.lastMouseX = -1;
        this.lastMouseY = -1;
        this.drag = false;
    }
    setUp() {
        this.canvas.element.addEventListener('mousedown', (ev) => this.onMouseDown(ev));
        this.canvas.element.addEventListener('mouseup', (ev) => this.onMouseUp(ev));
        this.canvas.element.addEventListener('mousemove', (ev) => this.onMouseMove(ev));
        _events_DomEvents__WEBPACK_IMPORTED_MODULE_3__["DomEvents"].onWheel.add(this.onMouseWheel, this);
        _events_DomEvents__WEBPACK_IMPORTED_MODULE_3__["DomEvents"].onKeyDown.add(this.onKeyDown, this);
    }
    onMouseDown(ev) {
        this.drag = true;
        if (this.lastMouseX === -1) {
            this.lastMouseX = ev.x;
        }
        if (this.lastMouseY === -1) {
            this.lastMouseY = ev.y;
        }
    }
    calcTranslation(panning, zooming, rotation) {
        const translation = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(translation, translation, panning);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(translation, translation, zooming);
        const vec3Rotation = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].fromValues(rotation[0] / rotation[3], rotation[1] / rotation[3], rotation[2] / rotation[3]);
        return gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(translation, translation, vec3Rotation);
    }
    onMouseUp(ev) {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            let transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
            let perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(transform.translation, transform.translation, translation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(perspective.target, perspective.target, perspective.panning);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["quat"].set(transform.rotation, 0, 0, 0, transform.rotation[3]);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.panning, 0, 0, 0);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.zooming, 0, 0, 0);
        }
        this.drag = false;
        this.lastMouseX = -1;
        this.lastMouseY = -1;
    }
    onMouseWheel(ev) {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            let transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
            let perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
            this.zoom(entity, ev.deltaY, 0.001);
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(transform.translation, transform.translation, translation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.zooming, 0, 0, 0);
        }
    }
    onMouseMove(ev) {
        if (this.drag) {
            for (let i = 0, entity; entity = this.entities[i]; i++) {
                this.rotate(entity, ev.x, ev.y);
                this.lastMouseX = ev.x;
                this.lastMouseY = ev.y;
            }
        }
    }
    onKeyDown(ev) {
        let y = 0;
        let x = 0;
        //W
        if (ev.key === "w") {
            y += 0.1;
        }
        //S
        if (ev.key === "s") {
            y -= 0.1;
        }
        //A
        if (ev.key === "a") {
            x += 0.1;
        }
        //D
        if (ev.key === "d") {
            x -= 0.1;
        }
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            const perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
            const transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
            this.pan(entity, x, y);
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(transform.translation, transform.translation, translation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(perspective.target, perspective.target, perspective.panning);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.panning, 0, 0, 0);
        }
    }
    /**
     * Calculate the panning-plane
     */
    pan(entity, dx, dy) {
        const perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
        const transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
        const aDir = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(aDir, perspective.target, transform.translation); //Vektor von Target nach Position
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(aDir, aDir);
        const aRight = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].cross(aRight, aDir, perspective.up);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(aRight, aRight);
        const aUp = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].cross(aUp, aDir, aRight);
        //calc out vector(overwriting aRight, aUp)
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].scale(aRight, aRight, dx);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].scale(aUp, aUp, dy);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(perspective.panning, aRight, aUp);
    }
    /**
     * Calculate camera zoom
     */
    zoom(entity, wheelDelta, delta) {
        const perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
        const transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
        const dz = (perspective.zoomPos - wheelDelta) * delta;
        const aDir = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(aDir, perspective.target, transform.translation);
        const dist = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].length(aDir);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(aDir, aDir);
        if (dist - dz <= 1.0) {
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].scale(perspective.zooming, aDir, dist - 1.0);
        }
        else {
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].scale(perspective.zooming, aDir, dz);
        }
    }
    rotate(entity, x, y) {
        const perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
        const transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
        const po = _math__WEBPACK_IMPORTED_MODULE_2__["Math3d"].getVSpherePos(this.lastMouseX, this.lastMouseY, this.canvas.width, this.canvas.height);
        const pn = _math__WEBPACK_IMPORTED_MODULE_2__["Math3d"].getVSpherePos(x, y, this.canvas.width, this.canvas.height);
        const poPn = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(poPn, po, pn);
        if (gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].squaredLength(poPn) < 0.0001) {
            return;
        }
        let cosangle = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].dot(po, pn);
        if (cosangle > 1.0) {
            cosangle = 1;
        }
        else if (cosangle < -1.0) {
            cosangle = -1;
        }
        let angle = Math.acos(cosangle);
        const rotAxis = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].cross(rotAxis, pn, po);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(rotAxis, rotAxis);
        const subTranslationPerspective = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(subTranslationPerspective, transform.translation, perspective.target);
        let diff = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].fromValues(0, 0, gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].length(subTranslationPerspective));
        let rotDiff = _math__WEBPACK_IMPORTED_MODULE_2__["Math3d"].rotateAxisAngle(diff, rotAxis, angle);
        const cDir = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(cDir, perspective.target, transform.translation);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(cDir, cDir);
        const cRight = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].cross(cRight, cDir, perspective.up);
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].normalize(cRight, cRight);
        const cUp = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].cross(cUp, cRight, cDir);
        const rotDiffW = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].fromValues(cRight[0] * rotDiff[0] + cUp[0] * rotDiff[1] + -cDir[0] * rotDiff[2], cRight[1] * rotDiff[0] + cUp[1] * rotDiff[1] + -cDir[1] * rotDiff[2], cRight[2] * rotDiff[0] + cUp[2] * rotDiff[1] + -cDir[2] * rotDiff[2]);
        const out = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(out, rotDiffW, gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].subtract(out, transform.translation, perspective.target));
        const w = transform.rotation[3];
        gl_matrix__WEBPACK_IMPORTED_MODULE_4__["quat"].set(transform.rotation, out[0] / w, out[1] / w, out[2] / w, w);
    }
    update() {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            const camera = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["CameraComponent"]);
            const transform = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]);
            const perspective = entity.get(_components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"]);
            //Update
            const translation = this.calcTranslation(perspective.panning, perspective.zooming, transform.rotation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(transform.translation, transform.translation, translation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(perspective.target, perspective.target, perspective.panning);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["quat"].set(transform.rotation, 0, 0, 0, transform.rotation[3]);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.panning, 0, 0, 0);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].set(perspective.zooming, 0, 0, 0);
            //Apply to camera localMatrix
            const target = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(target, perspective.target, perspective.panning);
            const position = gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].create();
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(position, perspective.panning, perspective.zooming);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["vec3"].add(position, position, transform.translation);
            gl_matrix__WEBPACK_IMPORTED_MODULE_4__["mat4"].lookAt(camera.viewMatrix, position, target, perspective.up);
        }
    }
};
LookAtCameraControlSystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_1__["ECS"].System(_components__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"], _components__WEBPACK_IMPORTED_MODULE_0__["CameraComponent"], _components__WEBPACK_IMPORTED_MODULE_0__["LookAtCameraComponent"])
], LookAtCameraControlSystem);

//# sourceMappingURL=LookAtCameraControlSystem.js.map

/***/ }),

/***/ "../lib/systems/camera/index.js":
/*!**************************************!*\
  !*** ../lib/systems/camera/index.js ***!
  \**************************************/
/*! exports provided: CameraSystem, LookAtCameraControlSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CameraSystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CameraSystem */ "../lib/systems/camera/CameraSystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraSystem", function() { return _CameraSystem__WEBPACK_IMPORTED_MODULE_0__["CameraSystem"]; });

/* harmony import */ var _LookAtCameraControlSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LookAtCameraControlSystem */ "../lib/systems/camera/LookAtCameraControlSystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraControlSystem", function() { return _LookAtCameraControlSystem__WEBPACK_IMPORTED_MODULE_1__["LookAtCameraControlSystem"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/gui/GUISystem.js":
/*!***************************************!*\
  !*** ../lib/systems/gui/GUISystem.js ***!
  \***************************************/
/*! exports provided: GUISystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUISystem", function() { return GUISystem; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dat_gui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dat.gui */ "../node_modules/dat.gui/build/dat.gui.module.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! curbl-ecs/lib/Events */ "../node_modules/curbl-ecs/lib/Events.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_gui_GUIComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/gui/GUIComponent */ "../lib/components/gui/GUIComponent.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let GUISystem = class GUISystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor() {
        super();
        this.gui = new dat_gui__WEBPACK_IMPORTED_MODULE_1__["GUI"]();
    }
    setUp() {
        this.events.on(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_2__["SYSTEM_EVENTS"].ENTITY_ADDED, this.onEntityAdded, this);
    }
    onEntityAdded(entity) {
        const config = entity.get(_components_gui_GUIComponent__WEBPACK_IMPORTED_MODULE_3__["GUIComponent"]).config;
        let folder = this.gui;
        let controller;
        if (config.folder) {
            folder = this.gui.addFolder(config.folder);
        }
        for (let property of config.properties) {
            if (property.isColor) {
                controller = folder.addColor(property.prop, property.propName);
            }
            else if (property.items) {
                controller = folder.add(property.prop, property.propName, property.items);
            }
            else {
                controller = folder.add(property.prop, property.propName, property.min, property.max);
            }
            controller.onChange(property.onChange).onFinishChange(property.onFinishChange);
        }
    }
};
GUISystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System(_components_gui_GUIComponent__WEBPACK_IMPORTED_MODULE_3__["GUIComponent"])
], GUISystem);

//# sourceMappingURL=GUISystem.js.map

/***/ }),

/***/ "../lib/systems/gui/index.js":
/*!***********************************!*\
  !*** ../lib/systems/gui/index.js ***!
  \***********************************/
/*! exports provided: GUISystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GUISystem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GUISystem */ "../lib/systems/gui/GUISystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUISystem", function() { return _GUISystem__WEBPACK_IMPORTED_MODULE_0__["GUISystem"]; });

/**
 * @file Automatically generated by barrelsby.
 */

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/index.js":
/*!*******************************!*\
  !*** ../lib/systems/index.js ***!
  \*******************************/
/*! exports provided: AnimationSystem, CameraSystem, LookAtCameraControlSystem, GUISystem, ForwardShadingSystem, PrePass, SkyboxPass, WorldSystem, ForwardLightPass, ForwardScenePass, WorldScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _animation_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation/index */ "../lib/systems/animation/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationSystem", function() { return _animation_index__WEBPACK_IMPORTED_MODULE_0__["AnimationSystem"]; });

/* harmony import */ var _camera_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera/index */ "../lib/systems/camera/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CameraSystem", function() { return _camera_index__WEBPACK_IMPORTED_MODULE_1__["CameraSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LookAtCameraControlSystem", function() { return _camera_index__WEBPACK_IMPORTED_MODULE_1__["LookAtCameraControlSystem"]; });

/* harmony import */ var _gui_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gui/index */ "../lib/systems/gui/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GUISystem", function() { return _gui_index__WEBPACK_IMPORTED_MODULE_2__["GUISystem"]; });

/* harmony import */ var _rendering_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rendering/index */ "../lib/systems/rendering/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardShadingSystem", function() { return _rendering_index__WEBPACK_IMPORTED_MODULE_3__["ForwardShadingSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrePass", function() { return _rendering_index__WEBPACK_IMPORTED_MODULE_3__["PrePass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxPass", function() { return _rendering_index__WEBPACK_IMPORTED_MODULE_3__["SkyboxPass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardLightPass", function() { return _rendering_index__WEBPACK_IMPORTED_MODULE_3__["ForwardLightPass"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardScenePass", function() { return _rendering_index__WEBPACK_IMPORTED_MODULE_3__["ForwardScenePass"]; });

/* harmony import */ var _world_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./world/index */ "../lib/systems/world/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return _world_index__WEBPACK_IMPORTED_MODULE_4__["WorldSystem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldScene", function() { return _world_index__WEBPACK_IMPORTED_MODULE_4__["WorldScene"]; });

/**
 * @file Automatically generated by barrelsby.
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/rendering/ForwardLightPass.js":
/*!****************************************************!*\
  !*** ../lib/systems/rendering/ForwardLightPass.js ***!
  \****************************************************/
/*! exports provided: ForwardLightPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForwardLightPass", function() { return ForwardLightPass; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "../lib/components/index.js");
/* harmony import */ var _ForwardScenePass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ForwardScenePass */ "../lib/systems/rendering/ForwardScenePass.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



let ForwardLightPass = class ForwardLightPass extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(config) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
    }
    setUp() {
        this.scenePass = curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].addSystem(new _ForwardScenePass__WEBPACK_IMPORTED_MODULE_2__["ForwardScenePass"]({ gl: this.gl, cache: this.cache, shader: this.shader }));
    }
    tearDown() {
        curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].removeSystem(this.scenePass);
    }
    render() {
        //this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.shader.bind();
        for (let i = 0, light; light = this.entities[i]; i++) {
            this.shader.uniforms.u_LightColor = light.get(_components__WEBPACK_IMPORTED_MODULE_1__["LightComponent"]).color.elements;
            this.shader.uniforms.u_LightDirection = light.get(_components__WEBPACK_IMPORTED_MODULE_1__["LightComponent"]).direction;
            this.scenePass.draw();
        }
        this.shader.unbind();
        //this.gl.disable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.DEPTH_TEST);
    }
};
ForwardLightPass = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System(_components__WEBPACK_IMPORTED_MODULE_1__["LightComponent"])
], ForwardLightPass);

//# sourceMappingURL=ForwardLightPass.js.map

/***/ }),

/***/ "../lib/systems/rendering/ForwardScenePass.js":
/*!****************************************************!*\
  !*** ../lib/systems/rendering/ForwardScenePass.js ***!
  \****************************************************/
/*! exports provided: ForwardScenePass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForwardScenePass", function() { return ForwardScenePass; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components */ "../lib/components/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cache */ "../lib/cache/index.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! curbl-ecs/lib/Events */ "../node_modules/curbl-ecs/lib/Events.js");
/* harmony import */ var curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _gl_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../gl/constants */ "../lib/gl/constants/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





let ForwardScenePass = class ForwardScenePass extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    //use the same data for all scenes/meshes etc.
    // private vertexBuffer:GLBuffer;
    // private indexBuffer:GLBuffer;
    constructor(config) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        // this.vertexBuffer = GLBuffer.createVertexBuffer(this.gl);
        // this.indexBuffer = GLBuffer.createIndexBuffer(this.gl);
    }
    setUp() {
        this.events.on(curbl_ecs_lib_Events__WEBPACK_IMPORTED_MODULE_3__["SYSTEM_EVENTS"].ENTITY_ADDED, this.initEntity, this);
    }
    /**
     * Init Shader for the Meshes
     * @param entity
     */
    initEntity(entity) {
        const sceneComponent = entity.get(_components__WEBPACK_IMPORTED_MODULE_1__["SceneComponent"]);
        const scene = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].SCENE, sceneComponent.key);
        if (scene) {
            scene.init(this.gl);
            scene.upload();
            this.initShaderAttributes(scene);
        }
        else {
            console.warn('Their is no scene for key ' + sceneComponent.key + ' in the cache.');
        }
    }
    initShaderAttributes(scene) {
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].POSITION, this.shader.attributes.getAttribute('a_Position'));
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].NORMAL, this.shader.attributes.getAttribute('a_Normal'));
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].TANGENT, this.shader.attributes.getAttribute('a_Tangent'));
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].TEXCOORD_0, this.shader.attributes.getAttribute('a_UV'));
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].JOINTS_0, this.shader.attributes.getAttribute('a_Joint0'));
        scene.addAttribute(_gl_constants__WEBPACK_IMPORTED_MODULE_4__["GL_PRIMITIVES"].WEIGHTS_0, this.shader.attributes.getAttribute('a_Weight0'));
    }
    draw() {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            this.drawScene(entity);
        }
    }
    drawScene(entity) {
        const key = entity.get(_components__WEBPACK_IMPORTED_MODULE_1__["SceneComponent"]).key;
        const scene = this.cache.get(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].SCENE, key);
        this.shader.apply();
        scene.draw(this.shader, this.cache);
    }
};
ForwardScenePass = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System(_components__WEBPACK_IMPORTED_MODULE_1__["SceneComponent"])
], ForwardScenePass);

//# sourceMappingURL=ForwardScenePass.js.map

/***/ }),

/***/ "../lib/systems/rendering/ForwardShadingSystem.js":
/*!********************************************************!*\
  !*** ../lib/systems/rendering/ForwardShadingSystem.js ***!
  \********************************************************/
/*! exports provided: ForwardShadingSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForwardShadingSystem", function() { return ForwardShadingSystem; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ForwardLightPass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForwardLightPass */ "../lib/systems/rendering/ForwardLightPass.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let ForwardShadingSystem = class ForwardShadingSystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(config) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
    }
    setUp() {
        this.forwardLightningPass = curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].addSystem(new _ForwardLightPass__WEBPACK_IMPORTED_MODULE_1__["ForwardLightPass"]({ gl: this.gl, cache: this.cache, shader: this.shader }));
    }
    tearDown() {
        curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].removeSystem(this.forwardLightningPass);
        curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].removeSystem(this);
    }
};
ForwardShadingSystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System()
], ForwardShadingSystem);

//# sourceMappingURL=ForwardShadingSystem.js.map

/***/ }),

/***/ "../lib/systems/rendering/PrePass.js":
/*!*******************************************!*\
  !*** ../lib/systems/rendering/PrePass.js ***!
  \*******************************************/
/*! exports provided: PrePass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrePass", function() { return PrePass; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let PrePass = class PrePass extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(gl) {
        super();
        this.gl = gl;
    }
    /**
     * Clear rendering Context
     * @param colorBuffer
     * @param depthBuffer
     * @param color
     */
    clearContext(colorBuffer = true, depthBuffer = false, color = { r: 0, g: 0, b: 0, a: 1 }) {
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        if (colorBuffer && depthBuffer) {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT | this.gl.STENCIL_BUFFER_BIT);
        }
        else if (colorBuffer) {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
        else if (depthBuffer) {
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }
    }
    render() {
        this.clearContext(true, true, { r: 0.2, g: 0.2, b: 0.2, a: 1 });
    }
};
PrePass = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System()
], PrePass);

//# sourceMappingURL=PrePass.js.map

/***/ }),

/***/ "../lib/systems/rendering/SkyboxPass.js":
/*!**********************************************!*\
  !*** ../lib/systems/rendering/SkyboxPass.js ***!
  \**********************************************/
/*! exports provided: SkyboxPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SkyboxPass", function() { return SkyboxPass; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../gl */ "../lib/gl/index.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../cache */ "../lib/cache/index.js");
/* harmony import */ var _viewer_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../viewer/constants */ "../lib/viewer/constants.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let SkyboxPass = class SkyboxPass extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(config) {
        super();
        this.gl = config.gl;
        this.cache = config.cache;
        this.shader = config.shader;
        this.cube = new _gl__WEBPACK_IMPORTED_MODULE_1__["GLCube"](this.gl);
    }
    setUp() {
        this.shader.bind();
        this.cube.vertexArrayObject.bind();
        this.cube.vertexArrayObject.addAttribute(this.cube.vertexBuffer, this.shader.attributes.getAttribute('a_Position'), 3, this.gl.FLOAT, false, 24, 0);
        this.cube.vertexArrayObject.unbind();
        this.shader.unbind();
    }
    tearDown() {
    }
    render() {
        if (this.cache.has(_cache__WEBPACK_IMPORTED_MODULE_2__["CACHE_TYPE"].TEXTURE, _viewer_constants__WEBPACK_IMPORTED_MODULE_3__["GLOBAL_TEXTURES"].SKYBOX)) {
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.depthFunc(this.gl.LEQUAL);
            this.shader.bind();
            this.shader.apply();
            this.cube.draw();
            this.shader.unbind();
            this.gl.depthFunc(this.gl.LESS);
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }
};
SkyboxPass = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System()
], SkyboxPass);

//# sourceMappingURL=SkyboxPass.js.map

/***/ }),

/***/ "../lib/systems/rendering/index.js":
/*!*****************************************!*\
  !*** ../lib/systems/rendering/index.js ***!
  \*****************************************/
/*! exports provided: ForwardShadingSystem, PrePass, SkyboxPass, ForwardLightPass, ForwardScenePass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForwardLightPass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForwardLightPass */ "../lib/systems/rendering/ForwardLightPass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardLightPass", function() { return _ForwardLightPass__WEBPACK_IMPORTED_MODULE_0__["ForwardLightPass"]; });

/* harmony import */ var _ForwardScenePass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForwardScenePass */ "../lib/systems/rendering/ForwardScenePass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardScenePass", function() { return _ForwardScenePass__WEBPACK_IMPORTED_MODULE_1__["ForwardScenePass"]; });

/* harmony import */ var _ForwardShadingSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ForwardShadingSystem */ "../lib/systems/rendering/ForwardShadingSystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ForwardShadingSystem", function() { return _ForwardShadingSystem__WEBPACK_IMPORTED_MODULE_2__["ForwardShadingSystem"]; });

/* harmony import */ var _PrePass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PrePass */ "../lib/systems/rendering/PrePass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrePass", function() { return _PrePass__WEBPACK_IMPORTED_MODULE_3__["PrePass"]; });

/* harmony import */ var _SkyboxPass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SkyboxPass */ "../lib/systems/rendering/SkyboxPass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SkyboxPass", function() { return _SkyboxPass__WEBPACK_IMPORTED_MODULE_4__["SkyboxPass"]; });

/**
 * @file Automatically generated by barrelsby.
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/world/index.js":
/*!*************************************!*\
  !*** ../lib/systems/world/index.js ***!
  \*************************************/
/*! exports provided: WorldSystem, WorldScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _worldScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldScene */ "../lib/systems/world/worldScene.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldScene", function() { return _worldScene__WEBPACK_IMPORTED_MODULE_0__["WorldScene"]; });

/* harmony import */ var _worldSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worldSystem */ "../lib/systems/world/worldSystem.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return _worldSystem__WEBPACK_IMPORTED_MODULE_1__["WorldSystem"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../lib/systems/world/worldScene.js":
/*!******************************************!*\
  !*** ../lib/systems/world/worldScene.js ***!
  \******************************************/
/*! exports provided: WorldScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldScene", function() { return WorldScene; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);

class WorldScene {
    constructor(config) {
        this.entities = {};
        this._destroyOnTearDown = config.destroyOnTearDown || false;
        this._name = config.name;
    }
    /**
     * setUp the scene loading necessary elements
     * calls preload and triggers the loader
     * once the loader finished loading the create method is called
     */
    setUp(loader, cache) {
        this._loader = loader;
        this._cache = cache;
        this._active = true;
        this.preload();
        this._loader.onComplete.once(this.create, this);
        this._loader.load();
    }
    /**
     * tearDown the scene removing all Entities from the scene
     * it will destroy all entities if destroyOnTearDown is true{default: false}
     */
    tearDown() {
        this.shutdown();
        this._active = false;
        if (this._destroyOnTearDown) {
            const keys = Object.keys(this.entities);
            for (let i = 0, entity; entity = this.entities[keys[i]]; i++) {
                curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].destroyEntity(entity);
            }
        }
        else {
            const keys = Object.keys(this.entities);
            for (let i = 0, entity; entity = this.entities[keys[i]]; i++) {
                curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].removeEntity(entity);
            }
        }
    }
    /**
     * Restore the Scene, adding all Entities previously removed, with their latest values
     */
    restore() {
        for (let i = 0, entity; entity = this.entities[i]; i++) {
            curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].addEntity(entity);
        }
    }
    /**
     * add Entity to the Scene
     * @param entity
     */
    add(entity) {
        this.entities[entity.id] = curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].addEntity(entity);
        return entity;
    }
    /**
     * Remove entity from the scene and ecs
     * @param entity
     */
    remove(entity) {
        delete this.entities[entity.id];
        return curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].removeEntity(entity);
    }
    /**
     * Destroy entity, removes it from the scene and ecs and removes all components
     */
    destroy(entity) {
        delete this.entities[entity.id];
        return curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].destroyEntity(entity);
    }
    get name() {
        return this._name;
    }
    get destroyOnTearDown() {
        return this._destroyOnTearDown;
    }
    set destroyOnTearDown(value) {
        this._destroyOnTearDown = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get loader() {
        return this._loader;
    }
    set loader(value) {
        this._loader = value;
    }
    get cache() {
        return this._cache;
    }
    set cache(value) {
        this._cache = value;
    }
}
//# sourceMappingURL=worldScene.js.map

/***/ }),

/***/ "../lib/systems/world/worldSystem.js":
/*!*******************************************!*\
  !*** ../lib/systems/world/worldSystem.js ***!
  \*******************************************/
/*! exports provided: WorldSystem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return WorldSystem; });
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _worldScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worldScene */ "../lib/systems/world/worldScene.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


let WorldSystem = class WorldSystem extends curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["System"] {
    constructor(config) {
        super();
        this._loader = config.loader;
        this._cache = config.cache;
    }
    setUp() {
        this._scenes = Object.create(null);
    }
    tearDown() {
        const keys = Object.keys(this._scenes);
        for (let i = 0, scene; scene = this._scenes[keys[i]]; i++) {
            this.removeScene(scene);
        }
    }
    update() {
        const keys = Object.keys(this._scenes);
        for (let i = 0, scene; scene = this._scenes[keys[i]]; i++) {
            if (scene.active) {
                scene.update();
            }
        }
    }
    /**
     * Return the key of the given scene
     * @param scene
     */
    getKey(scene) {
        let key = scene;
        if (scene instanceof _worldScene__WEBPACK_IMPORTED_MODULE_1__["WorldScene"]) {
            key = scene.name;
        }
        return key;
    }
    addScene(scene) {
        this._scenes[scene.name] = scene;
        return scene;
    }
    removeScene(scene) {
        const key = this.getKey(scene);
        const sceneObj = this._scenes[key];
        sceneObj.tearDown();
        delete this._scenes[key];
        return sceneObj;
    }
    start(scene) {
        const key = this.getKey(scene);
        this._scenes[key].setUp(this._loader, this._cache);
        return this._scenes[key];
    }
    stop(scene) {
        const key = this.getKey(scene);
        this._scenes[key].tearDown();
        return this._scenes[key];
    }
    restore(scene) {
        const key = this.getKey(scene);
        this._scenes[key].restore();
        return this._scenes[key];
    }
};
WorldSystem = __decorate([
    curbl_ecs__WEBPACK_IMPORTED_MODULE_0__["ECS"].System()
], WorldSystem);

//# sourceMappingURL=worldSystem.js.map

/***/ }),

/***/ "../lib/viewer/Viewer.js":
/*!*******************************!*\
  !*** ../lib/viewer/Viewer.js ***!
  \*******************************/
/*! exports provided: Viewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return Viewer; });
/* harmony import */ var _canvas_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas/Canvas */ "../lib/canvas/Canvas.js");
/* harmony import */ var curbl_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! curbl-loader */ "../node_modules/curbl-loader/lib/index.js");
/* harmony import */ var _loader_CubemapLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../loader/CubemapLoader */ "../lib/loader/CubemapLoader.js");
/* harmony import */ var _loader_TextureLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loader/TextureLoader */ "../lib/loader/TextureLoader.js");
/* harmony import */ var _loader_GLTFLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loader/GLTFLoader */ "../lib/loader/GLTFLoader.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cache */ "../lib/cache/index.js");
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gl */ "../lib/gl/index.js");
/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../material */ "../lib/material/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _loader_GLSLLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../loader/GLSLLoader */ "../lib/loader/GLSLLoader.js");
/* harmony import */ var _shader_khronosPbrShader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shader/khronosPbrShader */ "../lib/shader/khronosPbrShader.js");
/* harmony import */ var _shader_SkyboxShader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shader/SkyboxShader */ "../lib/shader/SkyboxShader.js");
/* harmony import */ var _systems_rendering_SkyboxPass__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../systems/rendering/SkyboxPass */ "../lib/systems/rendering/SkyboxPass.js");
/* harmony import */ var _systems_rendering_ForwardShadingSystem__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../systems/rendering/ForwardShadingSystem */ "../lib/systems/rendering/ForwardShadingSystem.js");
/* harmony import */ var _systems_rendering_PrePass__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../systems/rendering/PrePass */ "../lib/systems/rendering/PrePass.js");
/* harmony import */ var _systems_gui_GUISystem__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../systems/gui/GUISystem */ "../lib/systems/gui/GUISystem.js");
/* harmony import */ var _systems_camera_LookAtCameraControlSystem__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../systems/camera/LookAtCameraControlSystem */ "../lib/systems/camera/LookAtCameraControlSystem.js");
/* harmony import */ var _systems_camera_CameraSystem__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../systems/camera/CameraSystem */ "../lib/systems/camera/CameraSystem.js");
/* harmony import */ var _material_metallicRoughness__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../material/metallicRoughness */ "../lib/material/metallicRoughness.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _systems_animation_AnimationSystem__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../systems/animation/AnimationSystem */ "../lib/systems/animation/AnimationSystem.js");
/* harmony import */ var _systems_world_worldSystem__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../systems/world/worldSystem */ "../lib/systems/world/worldSystem.js");






















class Viewer {
    constructor(config = { width: 1280, height: 720 }) {
        this._canvas = new _canvas_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]({ width: config.width, height: config.height });
        this._loader = new curbl_loader__WEBPACK_IMPORTED_MODULE_1__["ResourceLoader"]();
        this._cache = new _cache__WEBPACK_IMPORTED_MODULE_5__["Cache"]();
    }
    init(onLoaded) {
        this._canvas.appendCanvas("root");
        const gl = this._canvas.context;
        this._gl = gl;
        //Create cache
        this._cache.addCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].MATERIAL, new _cache__WEBPACK_IMPORTED_MODULE_5__["BaseCache"]());
        this._cache.addCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].MESH, new _cache__WEBPACK_IMPORTED_MODULE_5__["BaseCache"]());
        this._cache.addCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].TEXTURE, new _cache__WEBPACK_IMPORTED_MODULE_5__["BaseCache"]());
        this._cache.addCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].SCENE, new _cache__WEBPACK_IMPORTED_MODULE_5__["BaseCache"]());
        this._cache.addCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].ANIMATION, new _cache__WEBPACK_IMPORTED_MODULE_5__["BaseCache"]());
        //Set loader Middlewares
        this._loader.addMiddleware(new _loader_CubemapLoader__WEBPACK_IMPORTED_MODULE_2__["CubemapLoader"](gl), _loader_CubemapLoader__WEBPACK_IMPORTED_MODULE_2__["CubemapLoader"]);
        this._loader.addMiddleware(new _loader_TextureLoader__WEBPACK_IMPORTED_MODULE_3__["TextureLoader"](gl), _loader_TextureLoader__WEBPACK_IMPORTED_MODULE_3__["TextureLoader"]);
        this._loader.addMiddleware(new _loader_GLTFLoader__WEBPACK_IMPORTED_MODULE_4__["GLTFLoader"](gl, this._cache), _loader_GLTFLoader__WEBPACK_IMPORTED_MODULE_4__["GLTFLoader"]);
        this._loader.addMiddleware(new _loader_GLSLLoader__WEBPACK_IMPORTED_MODULE_9__["GLSLLoader"](gl), _loader_GLSLLoader__WEBPACK_IMPORTED_MODULE_9__["GLSLLoader"]);
        //Cache them all
        this._loader.onLoadComplete.on((data) => {
            this._cache.add(data.type, data.key, data.data);
        });
        this.defaultMaterial();
        //Create shader
        this._shader = new _shader_khronosPbrShader__WEBPACK_IMPORTED_MODULE_10__["KhronosPbrShader"](this._gl, this._cache);
        this._skyboxShader = new _shader_SkyboxShader__WEBPACK_IMPORTED_MODULE_11__["SkyboxShader"](this._gl, this._cache);
        //Load shader
        this._loader.get(_loader_GLSLLoader__WEBPACK_IMPORTED_MODULE_9__["GLSLLoader"]).add("shader", "../assets/shader/pbr-vert.glsl", "../assets/shader/pbr-frag.glsl", this._shader);
        this._loader.get(_loader_GLSLLoader__WEBPACK_IMPORTED_MODULE_9__["GLSLLoader"]).add("skyboxShader", "../assets/shader/skybox-vert.glsl", "../assets/shader/skybox-frag.glsl", this._skyboxShader);
        this.load(onLoaded);
    }
    defaultMaterial() {
        const gl = this._gl;
        const texture = _gl__WEBPACK_IMPORTED_MODULE_6__["GLTexture"].fromData(gl, new Uint8Array([128, 128, 128, 255]), 1, 1, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
        texture.enableNearestScaling();
        texture.enableWrapClamp();
        this._cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].TEXTURE).add('__default__', texture);
        const mat = new _material_metallicRoughness__WEBPACK_IMPORTED_MODULE_18__["MetallicRoughness"]();
        mat.baseColorFactor = gl_matrix__WEBPACK_IMPORTED_MODULE_19__["vec4"].fromValues(0.5, 0.5, 0.5, 1);
        const material = new _material__WEBPACK_IMPORTED_MODULE_7__["Material"](name, mat);
        material.maps[_material__WEBPACK_IMPORTED_MODULE_7__["MATERIAL_MAPS"].ALBEDO] = new _material__WEBPACK_IMPORTED_MODULE_7__["Materialmap"]('__default__');
        this._cache.getCache(_cache__WEBPACK_IMPORTED_MODULE_5__["CACHE_TYPE"].MATERIAL).add('__default__', material);
    }
    createSystems() {
        //Create Systems
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].systemUpdateMethods = ['update', 'render'];
        this._world = curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_world_worldSystem__WEBPACK_IMPORTED_MODULE_21__["WorldSystem"]({ loader: this._loader, cache: this._cache }));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_camera_CameraSystem__WEBPACK_IMPORTED_MODULE_17__["CameraSystem"]({ gl: this._gl }));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_camera_LookAtCameraControlSystem__WEBPACK_IMPORTED_MODULE_16__["LookAtCameraControlSystem"](this._canvas));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_gui_GUISystem__WEBPACK_IMPORTED_MODULE_15__["GUISystem"]());
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_animation_AnimationSystem__WEBPACK_IMPORTED_MODULE_20__["AnimationSystem"](this._cache));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_rendering_PrePass__WEBPACK_IMPORTED_MODULE_14__["PrePass"](this._gl));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_rendering_ForwardShadingSystem__WEBPACK_IMPORTED_MODULE_13__["ForwardShadingSystem"]({ gl: this._gl, cache: this._cache, shader: this._shader }));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].addSystem(new _systems_rendering_SkyboxPass__WEBPACK_IMPORTED_MODULE_12__["SkyboxPass"]({ gl: this._gl, cache: this._cache, shader: this._skyboxShader }));
    }
    load(onLoaded) {
        this._loader.load(() => {
            this._shader.upload();
            this._skyboxShader.upload();
            this.createSystems();
            onLoaded();
            this.update(0);
        });
    }
    update(t) {
        curbl_ecs__WEBPACK_IMPORTED_MODULE_8__["ECS"].update(t);
        requestAnimationFrame((t) => { this.update(t); });
    }
    get cache() {
        return this._cache;
    }
    set cache(value) {
        this._cache = value;
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(value) {
        this._canvas = value;
    }
    get loader() {
        return this._loader;
    }
    set loader(value) {
        this._loader = value;
    }
    get gl() {
        return this._gl;
    }
    set gl(value) {
        this._gl = value;
    }
    get shader() {
        return this._shader;
    }
    set shader(value) {
        this._shader = value;
    }
    get skyboxShader() {
        return this._skyboxShader;
    }
    set skyboxShader(value) {
        this._skyboxShader = value;
    }
    get world() {
        return this._world;
    }
    set world(value) {
        this._world = value;
    }
}
//# sourceMappingURL=Viewer.js.map

/***/ }),

/***/ "../lib/viewer/constants.js":
/*!**********************************!*\
  !*** ../lib/viewer/constants.js ***!
  \**********************************/
/*! exports provided: GLOBAL_TEXTURES, UBO_BINDINGS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_TEXTURES", function() { return GLOBAL_TEXTURES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UBO_BINDINGS", function() { return UBO_BINDINGS; });
const GLOBAL_TEXTURES = {
    BRDF_LUT: 'brdfLUT',
    DIFFUSE_ENVIRONMENT: 'diffuseEnvironment',
    SPECULAR_ENVIRONMENT: 'specularEnvironment',
    SKYBOX: 'skybox'
};
var UBO_BINDINGS;
(function (UBO_BINDINGS) {
    UBO_BINDINGS[UBO_BINDINGS["CAMERA"] = 0] = "CAMERA";
    UBO_BINDINGS[UBO_BINDINGS["SKIN"] = 1] = "SKIN";
})(UBO_BINDINGS || (UBO_BINDINGS = {}));
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../lib/viewer/index.js":
/*!******************************!*\
  !*** ../lib/viewer/index.js ***!
  \******************************/
/*! exports provided: GLOBAL_TEXTURES, UBO_BINDINGS, Viewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "../lib/viewer/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GLOBAL_TEXTURES", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["GLOBAL_TEXTURES"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UBO_BINDINGS", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["UBO_BINDINGS"]; });

/* harmony import */ var _Viewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Viewer */ "../lib/viewer/Viewer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return _Viewer__WEBPACK_IMPORTED_MODULE_1__["Viewer"]; });

/**
 * @file Automatically generated by barrelsby.
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/curbl-ecs/lib/Component.js":
/*!**************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/Component.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Soeren on 27.06.2017.
 */
const ECS_1 = __webpack_require__(/*! ./ECS */ "../node_modules/curbl-ecs/lib/ECS.js");
class ComponentBitmaskMap {
    constructor() {
        this.bitmaskMap = new Map();
    }
    has(component) {
        if (typeof component === "string") {
            return this.bitmaskMap.has(component);
        }
        else {
            return this.bitmaskMap.has(component.prototype.constructor.name);
        }
    }
    add(component) {
        if (typeof component === "string") {
            this.bitmaskMap.set(component, 1 << this.bitmaskMap.size);
        }
        else {
            this.bitmaskMap.set(component.prototype.constructor.name, 1 << this.bitmaskMap.size);
        }
    }
    get(component) {
        if (!this.has(component)) {
            this.add(component);
        }
        if (typeof component === "string") {
            return this.bitmaskMap.get(component) || 0;
        }
        return this.bitmaskMap.get(component.prototype.constructor.name) || 0;
    }
}
exports.ComponentBitmaskMap = ComponentBitmaskMap;
const COMPONENT_PROPERTIES = {};
const COMPONENT_PROTOTYPE = {
    init: () => { return ECS_1.ECS.noop; },
    remove: () => { return ECS_1.ECS.noop; }
};
exports.COMPONENT_PROPERTY_DECORATOR = {};
function injectComponent(component) {
    for (let propKey in COMPONENT_PROPERTIES) {
        if (component[propKey] === undefined || component[propKey] === null) {
            component[propKey] = COMPONENT_PROPERTIES[propKey]();
        }
    }
    for (let propKey in exports.COMPONENT_PROPERTY_DECORATOR) {
        if (component[propKey] === undefined || component[propKey] === null) {
            exports.COMPONENT_PROPERTY_DECORATOR[propKey](component);
        }
    }
    for (let protoKey in COMPONENT_PROTOTYPE) {
        if (component.constructor && component.constructor.prototype) {
            if (component.constructor.prototype[protoKey] === undefined || component.constructor.prototype[protoKey] === null) {
                component.constructor.prototype[protoKey] = COMPONENT_PROTOTYPE[protoKey]();
            }
        }
        else {
            if (component[protoKey] === undefined || component[protoKey] === null) {
                component[protoKey] = COMPONENT_PROTOTYPE[protoKey]();
            }
        }
    }
}
exports.injectComponent = injectComponent;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/ECS.js":
/*!********************************************!*\
  !*** ../node_modules/curbl-ecs/lib/ECS.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __webpack_require__(/*! ./Entity */ "../node_modules/curbl-ecs/lib/Entity.js");
const EntityComponentManager_1 = __webpack_require__(/*! ./EntityComponentManager */ "../node_modules/curbl-ecs/lib/EntityComponentManager.js");
const Component_1 = __webpack_require__(/*! ./Component */ "../node_modules/curbl-ecs/lib/Component.js");
const System_1 = __webpack_require__(/*! ./System */ "../node_modules/curbl-ecs/lib/System.js");
const EntitySystemManager_1 = __webpack_require__(/*! ./EntitySystemManager */ "../node_modules/curbl-ecs/lib/EntitySystemManager.js");
const InjectorService_1 = __webpack_require__(/*! ./InjectorService */ "../node_modules/curbl-ecs/lib/InjectorService.js");
const EventEmitter = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
const Events_1 = __webpack_require__(/*! ./Events */ "../node_modules/curbl-ecs/lib/Events.js");
class ECS {
    constructor() {
        this.componentBitmaskMap = new Component_1.ComponentBitmaskMap();
        this.events = new EventEmitter();
        this.ecm = new EntityComponentManager_1.EntityComponentManager(this.componentBitmaskMap, this.events);
        this.scm = new EntitySystemManager_1.EntitySystemManager(this.componentBitmaskMap, this.events);
        this.registerEvents();
    }
    registerEvents() {
        this.ecm.events.on(Events_1.ECM_EVENTS.ENTITY_ADDED, this.onEntityAdded);
        this.ecm.events.on(Events_1.ECM_EVENTS.ENTITY_REMOVED, this.onEntityRemoved);
        this.ecm.events.on(Events_1.ECM_EVENTS.ENTITY_DESTROYED, this.onEntityDestroyed);
        this.ecm.events.on(Events_1.ECM_EVENTS.COMPONENT_ADDED, this.onComponentAdded);
        this.ecm.events.on(Events_1.ECM_EVENTS.COMPONENT_REMOVED, this.onComponentRemoved);
        this.scm.events.on(Events_1.ESM_EVENTS.SYSTEM_ADDED, this.onSystemAdded);
    }
    onEntityAdded(entity) {
        ECS.instance.scm.updateEntity(entity);
    }
    onEntityRemoved(entity) {
        ECS.instance.scm.removeEntity(entity);
    }
    onEntityDestroyed(entity) {
        ECS.instance.scm.removeEntity(entity);
    }
    onComponentAdded(entity) {
        ECS.instance.scm.updateEntity(entity);
    }
    onComponentRemoved(entity) {
        ECS.instance.scm.updateEntity(entity);
    }
    onSystemAdded(system) {
        for (let id in ECS.instance.ecm.entities) {
            ECS.instance.scm.updateEntity(ECS.instance.ecm.entities[id], system);
        }
    }
    static get instance() {
        if (ECS._instance) {
            return ECS._instance;
        }
        return ECS._instance = new ECS();
    }
    static get Injector() {
        return InjectorService_1.InjectorService.instance;
    }
    static noop() { }
    /**
     * create an entity
     * @param entity {optional} - use existing entity
     * @param components {optional} - components to add to the entity if provided this will override the current components of the entity if any
     */
    static createEntity(entity, components) {
        return ECS.instance.ecm.createEntity(entity, components);
    }
    /**
     * adds the Entity with the provided components(or existing ones) to the ECS
     * @param entity - Entity to add to the ECS
     * @param components - Components for the entity, if provided this will override the current components of the entity if any
     */
    static addEntity(entity, components) {
        return ECS.instance.ecm.addEntity(entity, components);
    }
    /**
     * Return a list of entities with the specified components
     * since we need to check all entities this can be quite slow
     * @param components - list of components the entity needs to have
     */
    static getEntities(...components) {
        return ECS.instance.ecm.getEntities(...components);
    }
    /**
     * removes the entity from the ECS, it will keep all of its components
     * @param entity - Entity to remove
     * @returns {IEntity}
     */
    static removeEntity(entity) {
        return ECS.instance.ecm.removeEntity(entity);
    }
    /**
     * removes all entities from the ecs
     */
    static removeAllEntities() {
        return ECS.instance.ecm.removeAllEntities();
    }
    /**
     * destroy an entity removes it from the ecs and removes all components
     * usually you want to use removeEntity and let the garbage collector do its job
     * @param entity - entity to destroy
     * @param pool - wether or not to add the entity to the ObjectPool(default: true)
     */
    static destroyEntity(entity, pool) {
        return ECS.instance.ecm.destroyEntity(entity, pool);
    }
    /**
     * remove all components and entities from the ecs
     * usually you want to use removeAllEntities and let the garbage collector do its job
     * @param pool - if components and entities should be pooled instead of destroyed{default: true}
     */
    static destroyAllEntities(pool) {
        return ECS.instance.ecm.destroyAllEntities(pool);
    }
    static hasEntity(entity) {
        return ECS.instance.ecm.hasEntity(entity);
    }
    static removeComponent(entity, component) {
        return ECS.instance.ecm.removeComponent(entity, component);
    }
    static addComponent(entity, component) {
        return ECS.instance.ecm.addComponent(entity, component);
    }
    static addSystem(system, componentMask) {
        return ECS.instance.scm.add(system, componentMask);
    }
    static hasSystem(system) {
        return ECS.instance.scm.has(system);
    }
    static hasSystemOf(constructor) {
        return ECS.instance.scm.hasOf(constructor);
    }
    static removeSystem(system) {
        return ECS.instance.scm.remove(system);
    }
    static removeSystemOf(constructor) {
        return ECS.instance.scm.removeOf(constructor);
    }
    static getSystemComponentMaskOf(constructor) {
        return ECS.instance.scm.getComponentMaskOf(constructor);
    }
    static removeEntityFromSystem(entity, system) {
        ECS.instance.scm.removeEntity(entity, system);
    }
    static getSystem(constructor) {
        return ECS.instance.scm.get(constructor);
    }
    static update(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        ECS.instance.scm.update(a1, a2, a3, a4, a5, a6, a7, a8, a9);
    }
    /**
     * Calls a specific method for all systems (e.g. update)
     * @param functionName - name of the function to be called
     */
    static callSystemMethod(functionName) {
        ECS.instance.scm.callSystemMethod(functionName);
    }
    static createComponentsFromDecorator(components) {
        const comps = Object.create(null);
        let component;
        for (let dec of components) {
            component = new dec.component(dec.config);
            comps[component.id] = component;
        }
        return comps;
    }
    static Component(id) {
        return function (constructor) {
            const wrapper = function (...args) { return new (constructor.bind.apply(constructor, [void 0].concat(args)))(); };
            const DecoratorSystem = function (...args) {
                let component = ECS.instance.ecm.pool.pop(constructor);
                if (!component) {
                    component = wrapper.apply(this, args);
                    Object.setPrototypeOf(component, Object.getPrototypeOf(this));
                    Component_1.injectComponent(component);
                }
                else {
                    component.init(...args);
                }
                component.id = id || constructor.prototype.constructor.name;
                return component;
            };
            DecoratorSystem.prototype = constructor.prototype;
            return DecoratorSystem;
        };
    }
    static System(...components) {
        return function (constructor) {
            const wrapper = function (...args) { return new (constructor.bind.apply(constructor, [void 0].concat(args)))(); };
            const DecoratorSystem = function (...args) {
                const system = wrapper.apply(this, args);
                Object.setPrototypeOf(system, Object.getPrototypeOf(this));
                System_1.injectSystem(system, ECS.instance.scm.systemUpdateMethods);
                system.id = system.id || constructor.prototype.constructor.name;
                ECS.instance.scm.updateBitmask(system, components);
                return system;
            };
            DecoratorSystem.prototype = constructor.prototype;
            return DecoratorSystem;
        };
    }
    static Entity(...components) {
        return function (constructor) {
            const wrapper = function (...args) { return new (constructor.bind.apply(constructor, [void 0].concat(args)))(); };
            const DecoratorEntity = function (...args) {
                let entity = ECS.instance.ecm.pool.pop(constructor);
                if (!entity) {
                    entity = wrapper.apply(this, args);
                    Object.setPrototypeOf(entity, Object.getPrototypeOf(this));
                    Entity_1.injectEntity(entity);
                }
                ECS.instance.ecm.createEntity(entity, ECS.createComponentsFromDecorator(components));
                return entity;
            };
            DecoratorEntity.prototype = constructor.prototype;
            return DecoratorEntity;
        };
    }
    static get uuid() {
        return ECS.instance.ecm.uuid;
    }
    static set uuid(value) {
        ECS.instance.ecm.uuid = value;
    }
    static get systemUpdateMethods() {
        return ECS.instance.scm.systemUpdateMethods;
    }
    static set systemUpdateMethods(methods) {
        ECS.instance.scm.systemUpdateMethods = methods;
    }
    static get events() {
        return ECS.instance.events;
    }
}
exports.ECS = ECS;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/Entity.js":
/*!***********************************************!*\
  !*** ../node_modules/curbl-ecs/lib/Entity.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ECS_1 = __webpack_require__(/*! ./ECS */ "../node_modules/curbl-ecs/lib/ECS.js");
const ENTITY_PROPERTIES = {
    id: () => { return ECS_1.ECS.uuid(); },
    components: () => { return Object.create(null); },
    bitmask: () => { return 0; }
};
const ENTITY_PROTOTYPE = {
    get: () => { return Entity.prototype.get; },
    getAll: () => { return Entity.prototype.getAll; },
    has: () => { return Entity.prototype.has; },
    add: () => { return Entity.prototype.add; },
    remove: () => { return Entity.prototype.remove; },
    dispose: () => { return Entity.prototype.dispose; },
    destroy: () => { return Entity.prototype.destroy; }
};
exports.ENTITY_PROPERTY_DECORATOR = {};
function injectEntity(entity) {
    for (let propKey in ENTITY_PROPERTIES) {
        if (entity[propKey] === undefined || entity[propKey] === null) {
            entity[propKey] = ENTITY_PROPERTIES[propKey]();
        }
    }
    for (let propKey in exports.ENTITY_PROPERTY_DECORATOR) {
        if (entity[propKey] === undefined || entity[propKey] === null) {
            exports.ENTITY_PROPERTY_DECORATOR[propKey](entity);
        }
    }
    for (let protoKey in ENTITY_PROTOTYPE) {
        if (entity.constructor && entity.constructor.prototype) {
            if (entity.constructor.prototype[protoKey] === undefined || entity.constructor.prototype[protoKey] === null) {
                entity.constructor.prototype[protoKey] = ENTITY_PROTOTYPE[protoKey]();
            }
        }
        else {
            if (entity[protoKey] === undefined || entity[protoKey] === null) {
                entity[protoKey] = ENTITY_PROTOTYPE[protoKey]();
            }
        }
    }
}
exports.injectEntity = injectEntity;
class Entity {
    constructor() {
        this.id = ENTITY_PROPERTIES.id();
        this.components = ENTITY_PROPERTIES.components();
        this.bitmask = ENTITY_PROPERTIES.bitmask();
    }
    getAll() {
        return this.components;
    }
    get(component) {
        if (typeof component === 'string') {
            return this.components[component];
        }
        return this.components[component.prototype.constructor.name];
    }
    has(component) {
        if (typeof component === 'string') {
            return !!this.components[component];
        }
        return !!this.components[component.prototype.constructor.name];
    }
    add(component) {
        return ECS_1.ECS.addComponent(this, component);
    }
    remove(component) {
        return ECS_1.ECS.removeComponent(this, component);
    }
    dispose() {
        return ECS_1.ECS.removeEntity(this);
    }
    destroy(pool) {
        return ECS_1.ECS.destroyEntity(this, pool);
    }
}
exports.Entity = Entity;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/EntityComponentManager.js":
/*!***************************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/EntityComponentManager.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = __webpack_require__(/*! ./Entity */ "../node_modules/curbl-ecs/lib/Entity.js");
const UUIDGenerator_1 = __webpack_require__(/*! ./UUIDGenerator */ "../node_modules/curbl-ecs/lib/UUIDGenerator.js");
const ObjectPool_1 = __webpack_require__(/*! ./ObjectPool */ "../node_modules/curbl-ecs/lib/ObjectPool.js");
const Events_1 = __webpack_require__(/*! ./Events */ "../node_modules/curbl-ecs/lib/Events.js");
/**
 * The EntityComponentManager stores and manages all Entities and their components
 * Entities itself are just empty objects with an id, the Manager maps those ids to the components
 * Its also responsible for adding and removing components from and entity or creating/removing entities
 * By default all Components are stored in an ObjectPool if no longer used instead of being destroyed/gc
 */
class EntityComponentManager {
    constructor(componentBitmaskMap, events, uuid = UUIDGenerator_1.UUIDGenerator.uuid) {
        this._pool = new ObjectPool_1.DynamicObjectPool();
        this._events = events;
        this._uuid = uuid;
        this.componentBitmask = componentBitmaskMap;
        this._entities = Object.create(null);
    }
    /**
     * Creates an Entity, adds it to the EntityComponentMap but not to the active entities or actual ECS,
     * so if the entity is deleted/gc it will be removed from the WeakMap
     * @param entity
     * @param components
     */
    createEntity(entity, components) {
        if (!entity) {
            entity = this.pool.pop(Entity_1.Entity);
            if (!entity) {
                entity = new Entity_1.Entity();
            }
        }
        entity.components = components || Object.create(null);
        entity.bitmask = 0;
        this.updateComponentBitmask(entity);
        return entity;
    }
    updateComponentBitmask(entity) {
        for (let key in entity.components) {
            entity.bitmask = entity.bitmask | this.componentBitmask.get(entity.components[key].id);
        }
    }
    /**
     * Adds the Entity with the provided Components(or existing ones) to the ECS,
     * @param entity - Entity to add to the ECS
     * @param components - Components for the entity, if provided this will override the current components of the entity if any
     * @param silent - dispatch the entityAdded signal(If added silent the entity wont be added to an system)
     */
    addEntity(entity, components, silent = false) {
        this._entities[entity.id] = entity;
        entity.components = components || entity.components || Object.create(null);
        entity.bitmask = entity.bitmask || 0;
        if (components) {
            this.updateComponentBitmask(entity);
        }
        if (!silent) {
            this._events.emit(Events_1.ECM_EVENTS.ENTITY_ADDED, entity);
        }
        return entity;
    }
    /**
     * Return a list of entities with the specified components
     * since we need to check all entities this can be quite slow
     * @param components - list of components the entity needs to have
     */
    getEntities(...components) {
        let bitmask = 0;
        for (let i = 0, component; component = components[i]; i++) {
            bitmask = bitmask | this.componentBitmask.get(component);
        }
        const keys = Object.keys(this._entities);
        const entities = [];
        for (let i = 0, entity; entity = this._entities[keys[i]]; i++) {
            if ((entity.bitmask & bitmask) === bitmask) {
                entities.push(entity);
            }
        }
        return entities;
    }
    /**
     * destroys the entity removes it from the manager and deletes all of its components
     * @param entity - entity to destroy
     * @param pool - if false the Entity will not be added to the ObjectPool(default: true)
     * @param silent - Dispatch onEntityDestroyed Signal(Removing the Entity from the Systems)
     * @returns {boolean} - true if entity was destroyed from the ecs
     */
    destroyEntity(entity, pool = true, silent = false) {
        if (this._entities[entity.id]) {
            for (let key in entity.components) {
                this.removeComponent(entity, entity.components[key].id, !pool, true);
            }
            entity.bitmask = 0;
            entity.components = Object.create(null);
            if (pool) {
                this._pool.push(entity);
            }
            if (!silent && this.hasEntity(entity)) {
                this._events.emit(Events_1.ECM_EVENTS.ENTITY_DESTROYED, entity);
            }
            return delete this._entities[entity.id];
        }
        return false;
    }
    /**
     * destroy all entities removing all of its components and remove them from the ecs
     * @param pool - if all components and entities should be pooled
     */
    destroyAllEntities(pool) {
        const keys = Object.keys(this._entities);
        for (let i = 0, entity; entity = this._entities[keys[i]]; i++) {
            this.destroyEntity(entity, pool);
        }
    }
    /**
     * @param entity - Entity to remove
     * @param silent - Dispatch onEntityRemoved Signal(Removing the Entity from the Systems)
     * @returns {boolean} - true if entity got removed from the ecs
     */
    removeEntity(entity, silent = false) {
        if (this._entities[entity.id]) {
            if (!silent && this.hasEntity(entity)) {
                this._events.emit(Events_1.ECM_EVENTS.ENTITY_REMOVED, entity);
            }
            delete this._entities[entity.id];
            return entity;
        }
        return entity;
    }
    /**
     * removes all Entities from the ecs
     */
    removeAllEntities() {
        const entities = [];
        const keys = Object.keys(this._entities);
        for (let i = 0, entity; entity = this._entities[keys[i]]; i++) {
            entities.push(this.removeEntity(entity));
        }
        return entities;
    }
    /**
     * Returns true if the entity is in the ECS
     * @param entity
     * @returns {boolean}
     */
    hasEntity(entity) {
        return !!this._entities[entity.id];
    }
    /**
     * Adds a component to the Entity
     * @param entity - Entity
     * @param component - Component to add
     * @param silent - If true this onComponentAdded signal is not dispatched and no system is updated
     */
    addComponent(entity, component, silent = false) {
        entity.components[component.id] = component;
        entity.bitmask = entity.bitmask | this.componentBitmask.get(component.id);
        if (!silent && this.hasEntity(entity)) {
            this._events.emit(Events_1.ECM_EVENTS.COMPONENT_ADDED, entity, component);
        }
    }
    /**
     * Removes a component from the Entity
     * @param entity - Entity
     * @param component - Component type to remove
     * @param destroy - If true the component is destroyed otherwise its added to the ObjectPool
     * @param silent - If true the onComponentRemoved signal is not dispatched and no system will be updated
     * @returns {boolean}
     */
    removeComponent(entity, component, destroy = false, silent = false) {
        let comp;
        if (typeof component === 'string') {
            comp = entity.components[component];
        }
        else {
            comp = entity.components[component.prototype.constructor.name];
        }
        if (comp) {
            entity.bitmask = entity.bitmask ^ this.componentBitmask.get(comp.id);
            if (!destroy) {
                this._pool.push(comp);
            }
            if (!silent && this.hasEntity(entity)) {
                this._events.emit(Events_1.ECM_EVENTS.COMPONENT_REMOVED, entity, comp);
            }
            comp.remove();
            return delete entity.components[comp.id];
        }
        return false;
    }
    get pool() {
        return this._pool;
    }
    get entities() {
        return this._entities;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(value) {
        this._uuid = value;
    }
    get events() {
        return this._events;
    }
}
exports.EntityComponentManager = EntityComponentManager;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/EntitySystemManager.js":
/*!************************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/EntitySystemManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = __webpack_require__(/*! ./System */ "../node_modules/curbl-ecs/lib/System.js");
const Events_1 = __webpack_require__(/*! ./Events */ "../node_modules/curbl-ecs/lib/Events.js");
class EntitySystemManager {
    constructor(componentBitmaskMap, events) {
        this._events = events;
        this._systemUpdateMethods = ['update'];
        this.componentBitmask = componentBitmaskMap;
        this.systems = Object.create(null);
        this.ids = [];
    }
    /**
     * update the system bitmask
     * @param system
     * @param componentMask
     */
    updateBitmask(system, componentMask = []) {
        for (let i = 0, component; component = componentMask[i]; i++) {
            system.bitmask = system.bitmask | this.componentBitmask.get(component);
        }
        return system;
    }
    /**
     * Add the system to the ECS so its methods will be called by the update methods
     * Before the existing entities get added into the system the init method is called
     * @param system
     * @param componentMask
     * @param silent
     */
    add(system, componentMask = [], silent = false) {
        if (!this.has(system)) {
            System_1.injectSystem(system, this.systemUpdateMethods);
            this.systems[system.id] = system;
            this.ids.push(system.id);
            this.updateBitmask(system, componentMask);
            system.setUp();
            if (!silent) {
                this._events.emit(Events_1.ESM_EVENTS.SYSTEM_ADDED, system);
            }
        }
        else {
            console.warn('System ' + system + ' already exists! And can only exists ones');
        }
        return system;
    }
    /**
     * Checks if the system is in the ECS
     * @param system
     * @returns {boolean}
     */
    has(system) {
        return !!this.systems[system.id];
    }
    /**
     * Checks if a system of the class exists in the ECS
     * @param constructor
     * @returns {boolean}
     */
    hasOf(constructor) {
        return !!this.systems[constructor.prototype.constructor.name];
    }
    /**
     * Removes the system
     * @param system
     * @param silent
     * @returns {boolean}
     */
    remove(system, silent = false) {
        if (this.has(system)) {
            if (!silent) {
                this._events.emit(Events_1.ESM_EVENTS.SYSTEM_REMOVED, system);
            }
            system.tearDown();
            this.ids.splice(this.ids.indexOf(system.id), 1);
            return delete this.systems[system.id];
        }
        return false;
    }
    /**
     * Removes the System of the provided type from the ECS
     * @param constructor
     * @param silent
     * @returns {boolean}
     */
    removeOf(constructor, silent) {
        return this.remove(this.get(constructor), silent);
    }
    /**
     * Returns entities for the system of the type if it exists in the ECS
     * @param constructor
     * @returns {undefined|Map<string, IEntity>}
     */
    getEntitiesOf(constructor) {
        let system = this.get(constructor);
        if (system) {
            return system.entities;
        }
        return undefined;
    }
    getComponentMaskOf(constructor) {
        let system = this.get(constructor);
        if (system) {
            return system.bitmask;
        }
        return undefined;
    }
    get(constructor) {
        return this.systems[constructor.prototype.constructor.name];
    }
    /**
     * Adds the entity to the system, or adds it to all Systems
     * @param entity
     * @param system - optional system to add the entity to
     * @param silent
     */
    addEntity(entity, system, silent = false) {
        if (system) {
            if (system.bitmask !== 0 && (entity.bitmask & system.bitmask) === system.bitmask) {
                system.entities.push(entity);
                system.events.emit(Events_1.SYSTEM_EVENTS.ENTITY_ADDED, entity);
            }
        }
        else {
            const ids = this.ids;
            const systems = this.systems;
            for (let i = 0, system; system = systems[ids[i]]; i++) {
                if ((entity.bitmask & system.bitmask) === system.bitmask) {
                    system.entities.push(entity);
                    system.events.emit(Events_1.SYSTEM_EVENTS.ENTITY_ADDED, entity);
                }
            }
        }
        if (!silent && (!system || this.has(system))) {
            this._events.emit(Events_1.ESM_EVENTS.ENTITY_ADDED_TO_SYSTEM, entity, system);
        }
    }
    /**
     * Removes an entity from the system or all systems
     * @param entity
     * @param system
     * @param silent
     */
    removeEntity(entity, system, silent = false) {
        if (system) {
            const idx = system.entities.indexOf(entity);
            if (idx != -1) {
                system.entities.splice(idx, 1);
            }
            system.events.emit(Events_1.SYSTEM_EVENTS.ENTITY_REMOVED, entity);
        }
        else {
            const ids = this.ids;
            const systems = this.systems;
            let idx = -1;
            for (let i = 0, system; system = systems[ids[i]]; i++) {
                idx = system.entities.indexOf(entity);
                if (idx != -1) {
                    system.entities.splice(idx, 1);
                }
                system.events.emit(Events_1.SYSTEM_EVENTS.ENTITY_REMOVED, entity);
            }
        }
        if (!silent) {
            this._events.emit(Events_1.ESM_EVENTS.ENTITY_REMOVED_FROM_SYSTEM, entity, system);
        }
    }
    /**
     * Updates the Entity adds it to the right systems and removes it from systems if it does not fit anymore
     * @param entity
     * @param system - optional only update for for the given system(ether add or remove the entity from the system)
     */
    updateEntity(entity, system) {
        if (system) {
            this.addEntityToSystem(system, entity);
        }
        else {
            const ids = this.ids;
            const systems = this.systems;
            for (let i = 0, system; system = systems[ids[i]]; i++) {
                this.addEntityToSystem(system, entity);
            }
        }
    }
    addEntityToSystem(system, entity) {
        if ((entity.bitmask & system.bitmask) === system.bitmask) {
            if (!system.has(entity)) {
                this.addEntity(entity, system);
            }
        }
        else if (system.has(entity)) {
            this.removeEntity(entity, system);
        }
    }
    /**
     * Calls the Method for all Systems and Subsystems
     */
    callSystemMethod(id, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        const ids = this.ids;
        const systems = this.systems;
        for (let i = 0, system; system = systems[ids[i]]; i++) {
            system[id](a1, a2, a3, a4, a5, a6, a7, a8, a9);
        }
    }
    /**
     * Calls all system update methods for all system and child systems
     */
    update(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        for (let i = 0, method; method = this._systemUpdateMethods[i]; i++) {
            this.callSystemMethod(method, a1, a2, a3, a4, a5, a6, a7, a8, a9);
        }
    }
    /**
     * Injects the SystemMethods into all systems if the methods does not exist a noop method will be added
     */
    updateSystemMethods() {
        const ids = this.ids;
        const systems = this.systems;
        const methods = this.systemUpdateMethods;
        for (let i = 0, system; system = systems[ids[i]]; i++) {
            System_1.injectSystem(system, methods);
        }
    }
    get events() {
        return this._events;
    }
    get systemUpdateMethods() {
        return this._systemUpdateMethods;
    }
    set systemUpdateMethods(value) {
        this._systemUpdateMethods = value;
        this.updateSystemMethods();
    }
}
exports.EntitySystemManager = EntitySystemManager;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/Events.js":
/*!***********************************************!*\
  !*** ../node_modules/curbl-ecs/lib/Events.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ESM_EVENTS;
(function (ESM_EVENTS) {
    ESM_EVENTS["SYSTEM_ADDED"] = "entitySystemManager.systemAdded";
    ESM_EVENTS["SYSTEM_REMOVED"] = "entitySystemManager.systemRemoved";
    ESM_EVENTS["ENTITY_ADDED_TO_SYSTEM"] = "entitySystemManager.entityAddedToSystem";
    ESM_EVENTS["ENTITY_REMOVED_FROM_SYSTEM"] = "entitySystemManager.entityRemovedFromSystem";
})(ESM_EVENTS = exports.ESM_EVENTS || (exports.ESM_EVENTS = {}));
var SYSTEM_EVENTS;
(function (SYSTEM_EVENTS) {
    SYSTEM_EVENTS["ENTITY_ADDED"] = "system.entityAdded";
    SYSTEM_EVENTS["ENTITY_REMOVED"] = "system.entityRemoved";
})(SYSTEM_EVENTS = exports.SYSTEM_EVENTS || (exports.SYSTEM_EVENTS = {}));
var ECM_EVENTS;
(function (ECM_EVENTS) {
    ECM_EVENTS["ENTITY_ADDED"] = "entityComponentManager.entityAdded";
    ECM_EVENTS["ENTITY_REMOVED"] = "entityComponentManager.entityRemoved";
    ECM_EVENTS["ENTITY_DESTROYED"] = "entityComponentManager.entityDestroyed";
    ECM_EVENTS["COMPONENT_ADDED"] = "entityComponentManager.componentAdded";
    ECM_EVENTS["COMPONENT_REMOVED"] = "entityComponentManager.componentRemoved";
})(ECM_EVENTS = exports.ECM_EVENTS || (exports.ECM_EVENTS = {}));


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/InjectorService.js":
/*!********************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/InjectorService.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ECS_1 = __webpack_require__(/*! ./ECS */ "../node_modules/curbl-ecs/lib/ECS.js");
class InjectorService {
    constructor() { }
    static get instance() {
        if (InjectorService._instance) {
            return InjectorService._instance;
        }
        return InjectorService._instance = new InjectorService();
    }
    /**
     * Injects an existing system into the class
     * @param {{new(config?: {[p: string]: any}) => T}} system
     * @returns {(target: Object, propKey: (number | string)) => void}
     * @constructor
     */
    System(systems) {
        return function (constructor) {
            const wrapper = function (...args) { return new (constructor.bind.apply(constructor, [void 0].concat(args)))(); };
            const DecoratorInjector = function (...args) {
                const object = wrapper.apply(this, args);
                Object.setPrototypeOf(object, Object.getPrototypeOf(this));
                const keys = Object.keys(systems);
                for (let i = 0, system; system = systems[keys[i]]; i++) {
                    object[keys[i]] = ECS_1.ECS.getSystem(system);
                }
                return object;
            };
            DecoratorInjector.prototype = constructor.prototype;
            return DecoratorInjector;
        };
    }
}
exports.InjectorService = InjectorService;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/ObjectPool.js":
/*!***************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/ObjectPool.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Pool {
    constructor() {
        this.objects = [];
    }
    push(...objects) {
        this.objects.push(...objects);
    }
    remove(...objects) {
        for (let i = 0, object; object = objects[i]; i++) {
            if (this.has(object)) {
                this.objects.splice(this.objects.indexOf(object), 1);
            }
        }
    }
    empty() {
        return this.objects.length > 0;
    }
    has(object) {
        return (this.objects.indexOf(object) >= 0);
    }
    pop() {
        return this.objects.pop();
    }
    dispose() {
        delete this.objects;
    }
    removeAll() {
        this.objects.length = 0;
    }
    clear() {
        this.objects.length = 0;
    }
}
class DynamicObjectPool {
    constructor() {
        this.pool = Object.create(null);
    }
    push(...objects) {
        for (let i = 0, object; object = objects[i]; i++) {
            if (!this.pool[object.constructor.name]) {
                this.pool[object.constructor.name] = new Pool();
            }
            if (!this.has(object)) {
                this.pool[object.constructor.name].push(object);
            }
        }
    }
    remove(...objects) {
        if (objects && objects[0] && this.pool[objects[0].constructor.name]) {
            this.pool[objects[0].constructor.name].remove(...objects);
        }
    }
    removeAllOf(object) {
        if (this.hasOf(object)) {
            this.pool[object.prototype.constructor.name].removeAll();
        }
    }
    has(object) {
        if (this.pool[object.constructor.name]) {
            return this.pool[object.constructor.name].has(object);
        }
        return false;
    }
    hasOf(object) {
        if (this.pool[object.constructor.name]) {
            return !this.pool[object.prototype.constructor.name].empty();
        }
        return false;
    }
    pop(object) {
        if (this.pool[object.prototype.constructor.name] && !this.pool[object.prototype.constructor.name].empty()) {
            return this.pool[object.prototype.constructor.name].pop();
        }
        return undefined;
    }
    dispose() {
        this.pool = Object.create(null);
    }
    clear() {
        this.pool = Object.create(null);
    }
}
exports.DynamicObjectPool = DynamicObjectPool;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/System.js":
/*!***********************************************!*\
  !*** ../node_modules/curbl-ecs/lib/System.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ECS_1 = __webpack_require__(/*! ./ECS */ "../node_modules/curbl-ecs/lib/ECS.js");
const EventEmitter = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
exports.SYSTEM_PROTOTYPE = {
    setUp: () => { return ECS_1.ECS.noop; },
    tearDown: () => { return ECS_1.ECS.noop; },
    has: () => { return System.prototype.has; },
    remove: () => { return System.prototype.remove; },
    dispose: () => { return System.prototype.dispose; }
};
exports.SYSTEM_PROPERTIES = {
    bitmask: () => { return 0; },
    entities: () => { return []; },
    events: () => { return new EventEmitter(); }
};
exports.SYSTEM_PROPERTY_DECORATOR = {};
function injectSystem(system, updateMethods) {
    for (let propKey in exports.SYSTEM_PROPERTIES) {
        if (system[propKey] === undefined || system[propKey] === null) {
            system[propKey] = exports.SYSTEM_PROPERTIES[propKey]();
        }
    }
    for (let propKey in exports.SYSTEM_PROPERTY_DECORATOR) {
        if (system[propKey] === undefined || system[propKey] === null) {
            exports.SYSTEM_PROPERTY_DECORATOR[propKey](system);
        }
    }
    for (let protoKey in exports.SYSTEM_PROTOTYPE) {
        if (system.constructor && system.constructor.prototype) {
            if (system.constructor.prototype[protoKey] === undefined || system.constructor.prototype[protoKey] === null) {
                system.constructor.prototype[protoKey] = exports.SYSTEM_PROTOTYPE[protoKey]();
            }
        }
        else {
            if (system[protoKey] === undefined || system[protoKey] === null) {
                system[protoKey] = exports.SYSTEM_PROTOTYPE[protoKey]();
            }
        }
    }
    for (let i = 0, protoKey; protoKey = updateMethods[i]; i++) {
        if (system.constructor && system.constructor.prototype) {
            if (system.constructor.prototype[protoKey] === undefined || system.constructor.prototype[protoKey] === null) {
                system.constructor.prototype[protoKey] = ECS_1.ECS.noop;
            }
        }
        else {
            if (system[protoKey] === undefined || system[protoKey] === null) {
                system[protoKey] = ECS_1.ECS.noop;
            }
        }
    }
}
exports.injectSystem = injectSystem;
class System {
    constructor() {
        this.bitmask = exports.SYSTEM_PROPERTIES.bitmask();
        this.entities = exports.SYSTEM_PROPERTIES.entities();
        this.events = exports.SYSTEM_PROPERTIES.events();
    }
    has(entity) {
        return this.entities.indexOf(entity) !== -1;
    }
    remove(entity, fromECS = true, destroy) {
        if (fromECS) {
            if (destroy) {
                ECS_1.ECS.destroyEntity(entity, true);
            }
            else {
                ECS_1.ECS.removeEntity(entity);
            }
        }
        ECS_1.ECS.removeEntityFromSystem(entity, this);
    }
    dispose() {
        ECS_1.ECS.removeSystem(this);
    }
}
exports.System = System;


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/UUIDGenerator.js":
/*!******************************************************!*\
  !*** ../node_modules/curbl-ecs/lib/UUIDGenerator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDGenerator = {
    uuid: () => { return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/1|0/g, function () { return (0 | Math.random() * 16).toString(16); }); }
};


/***/ }),

/***/ "../node_modules/curbl-ecs/lib/index.js":
/*!**********************************************!*\
  !*** ../node_modules/curbl-ecs/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Component */ "../node_modules/curbl-ecs/lib/Component.js"));
__export(__webpack_require__(/*! ./ECS */ "../node_modules/curbl-ecs/lib/ECS.js"));
__export(__webpack_require__(/*! ./Entity */ "../node_modules/curbl-ecs/lib/Entity.js"));
__export(__webpack_require__(/*! ./EntityComponentManager */ "../node_modules/curbl-ecs/lib/EntityComponentManager.js"));
__export(__webpack_require__(/*! ./EntitySystemManager */ "../node_modules/curbl-ecs/lib/EntitySystemManager.js"));
__export(__webpack_require__(/*! ./InjectorService */ "../node_modules/curbl-ecs/lib/InjectorService.js"));
__export(__webpack_require__(/*! ./ObjectPool */ "../node_modules/curbl-ecs/lib/ObjectPool.js"));
__export(__webpack_require__(/*! ./System */ "../node_modules/curbl-ecs/lib/System.js"));
__export(__webpack_require__(/*! ./UUIDGenerator */ "../node_modules/curbl-ecs/lib/UUIDGenerator.js"));


/***/ }),

/***/ "../node_modules/curbl-loader/lib/AsyncWorkerQueue.js":
/*!************************************************************!*\
  !*** ../node_modules/curbl-loader/lib/AsyncWorkerQueue.js ***!
  \************************************************************/
/*! exports provided: AsyncWorkerQueue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncWorkerQueue", function() { return AsyncWorkerQueue; });
function _noop() { }
class AsyncWorkerQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.paused = false;
        this.processes = 0;
        this.workers = [];
        this.tasks = [];
    }
    process(finishCb) {
        this.finishCb = finishCb || _noop;
        while (!this.paused && this.processes < this.concurrency && this.length) {
            const task = this.tasks.shift();
            this.processes++;
            task.listener.apply(task.listenerContext, [() => this.next(task)]);
            task.process.apply(task.processContext, task.args);
        }
    }
    enqueue(worker) {
        if (!worker.tasks || worker.tasks.length === 0) {
            throw "Worker needs to have at least one task";
        }
        worker.count = worker.count || 0;
        worker.onWorkFinished = worker.onWorkFinished || _noop;
        this.workers.push(worker);
        for (let i = 0, task; task = worker.tasks[i]; i++) {
            task.worker = worker;
            task.completed = task.completed || false;
            this.tasks.push(task);
        }
    }
    dequeue(...workers) {
        for (let i = 0, worker; worker = workers[i]; i++) {
            const index = this.workers.indexOf(worker);
            if (index != -1) {
                for (let k = 0, task; task = worker.tasks[k]; k++) {
                    const taskIndex = this.tasks.indexOf(task);
                    if (taskIndex != -1) {
                        this.tasks.splice(taskIndex, 1);
                    }
                }
                this.workers.splice(index, 1);
            }
        }
    }
    idle() {
        return this.length + this.processes + this.workers.length === 0;
    }
    next(task) {
        //Completed the task
        this.processes--;
        task.completed = true;
        //Check if all tasks of the Worker have been completed
        this.workerFinished(task.worker);
        this.onQueueFinished();
        this.process(this.finishCb);
    }
    /**
     * If all tasks of the worker have been completed we can call its onWorkFinished callback
     * and remove the worker from the queue
     * @param worker
     */
    workerFinished(worker) {
        worker.count += 1;
        const index = this.workers.indexOf(worker);
        if (worker.count === worker.tasks.length && index != -1) {
            const resources = worker.tasks.map((task) => task.resource);
            worker.onWorkFinished.apply(worker.onWorkFinishedContext, resources);
            this.workers.splice(index, 1);
        }
    }
    onQueueFinished() {
        if (this.idle()) {
            this.finishCb();
        }
    }
    abort() {
        for (let i = 0, worker; worker = this.workers[i]; i++) {
            for (let j = 0, task; task = worker.tasks[j]; j++) {
                task.resource.abort();
            }
        }
    }
    /**
     * Stop processing of further tasks and clear worker cb
     */
    stop() {
        this.finishCb = _noop;
        this.abort();
        this.workers.length = 0;
        this.tasks.length = 0;
        this.processes = 0;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        if (this.paused === false) {
            return;
        }
        this.paused = false;
        this.process();
    }
    get length() {
        return this.tasks.length;
    }
    get running() {
        return !!this.processes;
    }
}


/***/ }),

/***/ "../node_modules/curbl-loader/lib/EmitSignal.js":
/*!******************************************************!*\
  !*** ../node_modules/curbl-loader/lib/EmitSignal.js ***!
  \******************************************************/
/*! exports provided: EmitSignal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitSignal", function() { return EmitSignal; });
class EmitSignal {
    constructor(emitter, type) {
        this._type = type;
        this._emitter = emitter;
    }
    emit(...args) {
        return this._emitter.emit(this._type, ...args);
    }
    /**
     * function alias for emit
     * @param args
     */
    dispatch(...args) {
        return this.emit(...args);
    }
    on(fn, context) {
        this._emitter.on(this._type, fn, context);
        return this;
    }
    /**
     * alias for on
     * @param fn - EventFunction
     * @param context - context to call the function with
     */
    add(fn, context) {
        return this.on(fn, context);
    }
    once(fn, context) {
        this._emitter.once(this._type, fn, context);
        return this;
    }
    /**
     * alias for once
     * @param fn
     * @param context
     */
    addOnce(fn, context) {
        return this.once(fn, context);
    }
    removeAllListeners() {
        this._emitter.removeAllListeners(this._type);
        return this;
    }
    removeListener(fn, context, once) {
        this._emitter.removeListener(this._type, fn, context, once);
        return this;
    }
    get type() {
        return this._type;
    }
    get emitter() {
        return this._emitter;
    }
}


/***/ }),

/***/ "../node_modules/curbl-loader/lib/Middleware.js":
/*!******************************************************!*\
  !*** ../node_modules/curbl-loader/lib/Middleware.js ***!
  \******************************************************/
/*! exports provided: RESOURCE_LOADER_EVENTS, Middleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESOURCE_LOADER_EVENTS", function() { return RESOURCE_LOADER_EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Middleware", function() { return Middleware; });
/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resource */ "../node_modules/curbl-loader/lib/Resource.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _EmitSignal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitSignal */ "../node_modules/curbl-loader/lib/EmitSignal.js");



var RESOURCE_LOADER_EVENTS;
(function (RESOURCE_LOADER_EVENTS) {
    RESOURCE_LOADER_EVENTS["LOAD_COMPLETE"] = "LOAD_COMPLETE";
})(RESOURCE_LOADER_EVENTS || (RESOURCE_LOADER_EVENTS = {}));
const RESOURCE_LOADER_PROPERTIES = {
    _emitter: () => new eventemitter3__WEBPACK_IMPORTED_MODULE_1__(),
    onLoad: () => new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](undefined._emitter, RESOURCE_LOADER_EVENTS.LOAD_COMPLETE),
};
const RESOURCE_LOADER_PROTOTYPE = {
    transform: () => Middleware.prototype.transform,
    add: () => Middleware.prototype.add,
    addResourceToQueue: () => Middleware.prototype.addResourceToQueue,
    _queueCallback: () => Middleware.prototype._queueCallback
};
class Middleware {
    constructor(type) {
        this._emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_1__();
        this.onLoad = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, RESOURCE_LOADER_EVENTS.LOAD_COMPLETE);
        this.type = type;
    }
    static inject(middleware) {
        for (let propKey in RESOURCE_LOADER_PROPERTIES) {
            if (middleware[propKey] === undefined || middleware[propKey] === null) {
                middleware[propKey] = RESOURCE_LOADER_PROPERTIES[propKey]();
            }
        }
        for (let protoKey in RESOURCE_LOADER_PROTOTYPE) {
            if (middleware.constructor && middleware.constructor.prototype) {
                if (middleware.constructor.prototype[protoKey] === undefined || middleware.constructor.prototype[protoKey] === null) {
                    middleware.constructor.prototype[protoKey] = RESOURCE_LOADER_PROTOTYPE[protoKey]();
                }
            }
            else {
                if (middleware[protoKey] === undefined || middleware[protoKey] === null) {
                    middleware[protoKey] = RESOURCE_LOADER_PROTOTYPE[protoKey]();
                }
            }
        }
    }
    add(url, ...args) {
        this.addResourceToQueue({
            resources: [{
                    resource: new _Resource__WEBPACK_IMPORTED_MODULE_0__["Resource"](url),
                    args: [...args]
                }]
        });
        return this;
    }
    addResourceToQueue(config) {
        this._loader._addResourceToQueue({
            resources: config.resources,
            onResourcesLoaded: (...resources) => this._queueCallback(config.key, this.type, ...resources),
            onResourcesLoadedContext: this
        });
        return this;
    }
    _queueCallback(key, type, ...resources) {
        const data = this.transform(...resources);
        this.onLoad.emit({ key: key, type: type, data: data });
    }
    /**
     * transform is called after the Middleware has finished processing the Resources
     * that have been added to the LoadQueue of the loader
     * its used to further transform the loaded data, e.g. if u have 2 files json and binary etc.
     * @param resources {Resource[]} - the resources that have finished loading
     */
    transform(...resources) {
        return resources.map(resource => resource.request);
    }
}


/***/ }),

/***/ "../node_modules/curbl-loader/lib/Resource.js":
/*!****************************************************!*\
  !*** ../node_modules/curbl-loader/lib/Resource.js ***!
  \****************************************************/
/*! exports provided: RESOURCE_EVENT, LOAD_TYPE, Resource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESOURCE_EVENT", function() { return RESOURCE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOAD_TYPE", function() { return LOAD_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return Resource; });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EmitSignal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmitSignal */ "../node_modules/curbl-loader/lib/EmitSignal.js");


var RESOURCE_EVENT;
(function (RESOURCE_EVENT) {
    RESOURCE_EVENT["PROGRESS"] = "resource_event_progress";
    RESOURCE_EVENT["LOAD_START"] = "resource_event_loadStart";
    RESOURCE_EVENT["LOAD_COMPLETE"] = "resource_event_load";
    RESOURCE_EVENT["ERROR"] = "resource_event_error";
    RESOURCE_EVENT["ABORT"] = "resource_event_abort";
    RESOURCE_EVENT["TIMEOUT"] = "resource_event_timeout";
})(RESOURCE_EVENT || (RESOURCE_EVENT = {}));
var LOAD_TYPE;
(function (LOAD_TYPE) {
    LOAD_TYPE["XHR"] = "xhr";
    LOAD_TYPE["IMAGE"] = "image";
})(LOAD_TYPE || (LOAD_TYPE = {}));
class Resource {
    constructor(options, config) {
        this.config = config || Object.create(null);
        if (typeof options === 'string') {
            this.options = {
                url: options,
                loadType: LOAD_TYPE.XHR,
                responseType: ''
            };
        }
        else {
            this.options = Object.assign({}, options, { url: options.url, loadType: options.loadType || LOAD_TYPE.XHR, responseType: options.responseType || '' });
        }
        this._emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_0__();
        this.onProgress = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.PROGRESS);
        this.onLoadStart = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.LOAD_START);
        this.onLoadFinished = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.LOAD_COMPLETE);
        this.onError = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.ERROR);
        this.onAbort = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.ABORT);
        this.onTimeout = new _EmitSignal__WEBPACK_IMPORTED_MODULE_1__["EmitSignal"](this._emitter, RESOURCE_EVENT.TIMEOUT);
    }
    /**
     * Create a XMLHttpRequest and start loading the Resource
     * @param options - { url: string, timeout?: number, asnyc?: boolean, responseType?: string;}
     * @param args - will be emitted with loadstart and load events
     */
    loadXhr(options, ...args) {
        const request = new XMLHttpRequest();
        request.timeout = options.timeout;
        request.responseType = options.responseType || 'text';
        request.open('GET', options.url, options.async === undefined ? true : !!options.async);
        request.addEventListener('progress', (event) => this.onProgress.emit(event, request), { once: true });
        request.addEventListener('loadstart', (event) => this.onLoadStart.emit(event, request, ...args), { once: true });
        request.addEventListener('load', (event) => this.onLoadFinished.emit(this), { once: true });
        request.addEventListener('error', (event) => this.onError.emit(event, request), { once: true });
        request.addEventListener('abort', (event) => this.onAbort.emit(event, request), { once: true });
        request.addEventListener('timeout', (event) => this.onTimeout.emit(event, request), { once: true });
        request.send();
        return request;
    }
    /**
     * Create a HTMLImageElement and start loading the Resource
     * @param options - { url: string, width?: number, height?: number }
     * @param args - will be emitted with loadstart and load events
     */
    loadImage(options, ...args) {
        const image = new Image(options.width, options.height);
        if (!image) {
            console.error('Failed to create Image Object');
            this.onError.emit(event, image);
            return image;
        }
        image.addEventListener('progress', (event) => this.onProgress.emit(event, image), { once: true });
        image.addEventListener('loadstart', (event) => this.onLoadStart.emit(event, image, ...args), { once: true });
        image.addEventListener('load', (event) => this.onLoadFinished.emit(this), { once: true });
        image.addEventListener('error', (event) => this.onError.emit(event, image), { once: true });
        image.addEventListener('abort', (event) => this.onAbort.emit(event, image), { once: true });
        image.crossOrigin = this._determineCrossOrigin(options.url);
        image.src = options.url;
        return image;
    }
    _determineCrossOrigin(url) {
        // data: and javascript: urls are considered same-origin
        if (url.indexOf('data:') === 0) {
            return '';
        }
        // A sandboxed iframe without the 'allow-same-origin' attribute will have a special
        // origin designed not to match window.location.origin, and will always require
        // crossOrigin requests regardless of whether the location matches.
        if (window.origin !== window.location.origin) {
            return 'anonymous';
        }
        // default is window.location
        const loc = window.location;
        if (!Resource.tempAnchor) {
            Resource.tempAnchor = document.createElement('a');
        }
        // let the browser determine the full href for the url of this resource and then
        // use the properties of the anchor element, cause fuck IE9
        Resource.tempAnchor.href = url;
        const samePort = (!Resource.tempAnchor.port && loc.port === '') || (Resource.tempAnchor.port === loc.port);
        const protocol = Resource.tempAnchor.protocol ? `${Resource.tempAnchor.protocol}:` : '';
        // if cross origin
        if (Resource.tempAnchor.host !== loc.hostname || !samePort || protocol !== loc.protocol) {
            return 'anonymous';
        }
        return '';
    }
    /**
     * Called by the _loader to start loading the Resource
     * @param options - load options for the resource or the url
     * @param args
     * @returns {LoadComponent}
     */
    load(...args) {
        switch (this.options.loadType) {
            case LOAD_TYPE.IMAGE:
                this.request = this.loadImage(this.options, ...args);
                return this;
            case LOAD_TYPE.XHR:
                this.request = this.loadXhr(this.options, ...args);
                return this;
        }
        return this;
    }
    abort() {
        if (this.request instanceof XMLHttpRequest) {
            this.request.abort();
        }
        else if (this.request instanceof HTMLImageElement) {
            this.request.src = "";
        }
        return this;
    }
}


/***/ }),

/***/ "../node_modules/curbl-loader/lib/ResourceLoader.js":
/*!**********************************************************!*\
  !*** ../node_modules/curbl-loader/lib/ResourceLoader.js ***!
  \**********************************************************/
/*! exports provided: LOADER_EVENTS, ResourceLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOADER_EVENTS", function() { return LOADER_EVENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourceLoader", function() { return ResourceLoader; });
/* harmony import */ var _Middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Middleware */ "../node_modules/curbl-loader/lib/Middleware.js");
/* harmony import */ var _AsyncWorkerQueue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AsyncWorkerQueue */ "../node_modules/curbl-loader/lib/AsyncWorkerQueue.js");
/* harmony import */ var _EmitSignal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitSignal */ "../node_modules/curbl-loader/lib/EmitSignal.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_3__);




var LOADER_EVENTS;
(function (LOADER_EVENTS) {
    LOADER_EVENTS["PRE"] = "PRE";
    LOADER_EVENTS["AFTER"] = "AFTER";
    LOADER_EVENTS["PROGRESS"] = "PROGRESS";
    LOADER_EVENTS["LOAD_START"] = "LOAD_START";
    LOADER_EVENTS["LOAD_COMPLETE"] = "LOAD_COMPLETE";
    LOADER_EVENTS["LOADER_FINISHED"] = "LOADER_FINISHED";
    LOADER_EVENTS["ERROR"] = "ERROR";
})(LOADER_EVENTS || (LOADER_EVENTS = {}));
class ResourceLoader {
    constructor(concurrency = 10) {
        this._emitter = new eventemitter3__WEBPACK_IMPORTED_MODULE_3__();
        this.middleware = Object.create(null);
        this.resourceQueue = new _AsyncWorkerQueue__WEBPACK_IMPORTED_MODULE_1__["AsyncWorkerQueue"](concurrency);
        this._preSignal = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.PRE);
        this._afterSignal = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.AFTER);
        this.onProgress = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.PROGRESS);
        this.onLoadStart = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.LOAD_START);
        this.onLoadComplete = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.LOAD_COMPLETE);
        this.onError = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.ERROR);
        this.onComplete = new _EmitSignal__WEBPACK_IMPORTED_MODULE_2__["EmitSignal"](this._emitter, LOADER_EVENTS.LOADER_FINISHED);
    }
    _callAfter(data) {
        this.onLoadComplete.emit(data);
        this._afterSignal.emit(data);
    }
    /**
     * get a LoadComponent
     * @param {string | {new(...args): T}} id
     * @returns {T}
     */
    get(id) {
        if (id && typeof id === "string") {
            return this.middleware[id];
        }
        else if (id && typeof id !== "string") {
            return this.middleware[id.prototype.constructor.name];
        }
        return undefined;
    }
    /**
     * Add a new Middleware e.g. to load Models from OBJ,GLTF file or to load Textures, Audio etc
     * @param {Middleware} middleware
     * @param {string | {new(...args): T}} id
     * @returns {T}
     */
    addMiddleware(middleware, id) {
        _Middleware__WEBPACK_IMPORTED_MODULE_0__["Middleware"].inject(middleware);
        middleware._loader = this;
        if (id && typeof id === "string") {
            this.middleware[id] = middleware;
        }
        else if (id && typeof id !== "string") {
            this.middleware[id.prototype.constructor.name] = middleware;
        }
        middleware.onLoad.on(this._callAfter, this);
        return middleware;
    }
    /**
     * Remove a Middleware from the ResourceLoader
     * @param {string | {new(...args): T}} id
     */
    removeMiddleware(id) {
        if (id && typeof id === "string") {
            delete this.middleware[id];
        }
        else if (id && typeof id !== "string") {
            delete this.middleware[id.prototype.constructor.name];
        }
    }
    _onResourceLoadStart(value) {
        this._preSignal.emit(value.resource);
        this.onLoadStart.emit(value.resource);
    }
    _addResourceToQueue(config) {
        config.resources.forEach(value => {
            value.resource.onProgress.on((event) => this.onProgress.emit(event));
            value.resource.onError.on((event) => this.onError.emit(event));
            value.resource.onLoadStart.on(() => this._onResourceLoadStart(value));
        });
        this.resourceQueue.enqueue({
            tasks: config.resources.map(value => {
                return {
                    resource: value.resource,
                    process: value.resource.load,
                    processContext: value.resource,
                    listener: value.resource.onLoadFinished.once,
                    listenerContext: value.resource.onLoadFinished,
                    args: value.args
                };
            }),
            onWorkFinished: config.onResourcesLoaded,
            onWorkFinishedContext: config.onResourcesLoadedContext
        });
        return this;
    }
    /**
     * cb to call before a resource starts loading
     * cb is removed after the ResourceLoader has finished loading the resources
     * @param cb
     */
    pre(cb) {
        this._preSignal.on(cb);
        return this;
    }
    /**
     * cb to call after a Middleware has finished loading and transformed a resource
     * cb is removed after the ResourceLoader has finished loading the resources
     * @param cb
     */
    after(cb) {
        this._afterSignal.on(cb);
        return this;
    }
    _onLoadComplete() {
        this._preSignal.removeAllListeners();
        this._afterSignal.removeAllListeners();
        this.onComplete.emit(this);
    }
    load(finishCb) {
        if (finishCb && typeof finishCb === 'function') {
            this.onComplete.once(finishCb);
        }
        this.resourceQueue.process(() => this._onLoadComplete());
        return this;
    }
    stop() {
        this.resourceQueue.stop();
    }
    pause() {
        this.resourceQueue.pause();
    }
    resume() {
        this.resourceQueue.resume();
    }
}


/***/ }),

/***/ "../node_modules/curbl-loader/lib/index.js":
/*!*************************************************!*\
  !*** ../node_modules/curbl-loader/lib/index.js ***!
  \*************************************************/
/*! exports provided: LOADER_EVENTS, ResourceLoader, RESOURCE_EVENT, LOAD_TYPE, Resource, RESOURCE_LOADER_EVENTS, Middleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResourceLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResourceLoader */ "../node_modules/curbl-loader/lib/ResourceLoader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOADER_EVENTS", function() { return _ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["LOADER_EVENTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResourceLoader", function() { return _ResourceLoader__WEBPACK_IMPORTED_MODULE_0__["ResourceLoader"]; });

/* harmony import */ var _Resource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Resource */ "../node_modules/curbl-loader/lib/Resource.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RESOURCE_EVENT", function() { return _Resource__WEBPACK_IMPORTED_MODULE_1__["RESOURCE_EVENT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LOAD_TYPE", function() { return _Resource__WEBPACK_IMPORTED_MODULE_1__["LOAD_TYPE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Resource", function() { return _Resource__WEBPACK_IMPORTED_MODULE_1__["Resource"]; });

/* harmony import */ var _Middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Middleware */ "../node_modules/curbl-loader/lib/Middleware.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RESOURCE_LOADER_EVENTS", function() { return _Middleware__WEBPACK_IMPORTED_MODULE_2__["RESOURCE_LOADER_EVENTS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Middleware", function() { return _Middleware__WEBPACK_IMPORTED_MODULE_2__["Middleware"]; });






/***/ }),

/***/ "../node_modules/dat.gui/build/dat.gui.module.js":
/*!*******************************************************!*\
  !*** ../node_modules/dat.gui/build/dat.gui.module.js ***!
  \*******************************************************/
/*! exports provided: color, controllers, dom, gui, GUI, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "color", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "controllers", function() { return controllers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dom", function() { return dom$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gui", function() { return gui; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUI", function() { return GUI$1; });
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};


/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=dat.gui.module.js.map


/***/ }),

/***/ "../node_modules/eventemitter3/index.js":
/*!**********************************************!*\
  !*** ../node_modules/eventemitter3/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "../node_modules/gl-matrix/esm/common.js":
/*!***********************************************!*\
  !*** ../node_modules/gl-matrix/esm/common.js ***!
  \***********************************************/
/*! exports provided: EPSILON, ARRAY_TYPE, RANDOM, setMatrixArrayType, toRadian, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARRAY_TYPE", function() { return ARRAY_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANDOM", function() { return RANDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMatrixArrayType", function() { return setMatrixArrayType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadian", function() { return toRadian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}

/***/ }),

/***/ "../node_modules/gl-matrix/esm/index.js":
/*!**********************************************!*\
  !*** ../node_modules/gl-matrix/esm/index.js ***!
  \**********************************************/
/*! exports provided: glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "glMatrix", function() { return _common_js__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _mat2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat2.js */ "../node_modules/gl-matrix/esm/mat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2", function() { return _mat2_js__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _mat2d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat2d.js */ "../node_modules/gl-matrix/esm/mat2d.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat2d", function() { return _mat2d_js__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mat3.js */ "../node_modules/gl-matrix/esm/mat3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat3", function() { return _mat3_js__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mat4.js */ "../node_modules/gl-matrix/esm/mat4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "mat4", function() { return _mat4_js__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quat.js */ "../node_modules/gl-matrix/esm/quat.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat", function() { return _quat_js__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _quat2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./quat2.js */ "../node_modules/gl-matrix/esm/quat2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "quat2", function() { return _quat2_js__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _vec2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vec2.js */ "../node_modules/gl-matrix/esm/vec2.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec2", function() { return _vec2_js__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./vec3.js */ "../node_modules/gl-matrix/esm/vec3.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec3", function() { return _vec3_js__WEBPACK_IMPORTED_MODULE_8__; });
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./vec4.js */ "../node_modules/gl-matrix/esm/vec4.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "vec4", function() { return _vec4_js__WEBPACK_IMPORTED_MODULE_9__; });












/***/ }),

/***/ "../node_modules/gl-matrix/esm/mat2.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/mat2.js ***!
  \*********************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, transpose, invert, adjoint, determinant, multiply, rotate, scale, fromRotation, fromScaling, str, frob, LDU, add, subtract, exactEquals, equals, multiplyScalar, multiplyScalarAndAdd, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LDU", function() { return LDU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */

function fromValues(m00, m01, m10, m11) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */

function set(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3]; // Calculate the determinant

  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */

function adjoint(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2));
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Alias for {@link mat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../node_modules/gl-matrix/esm/mat2d.js":
/*!**********************************************!*\
  !*** ../node_modules/gl-matrix/esm/mat2d.js ***!
  \**********************************************/
/*! exports provided: create, clone, copy, identity, fromValues, set, invert, determinant, multiply, rotate, scale, translate, fromRotation, fromScaling, fromTranslation, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */

function fromValues(a, b, c, d, tx, ty) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */

function set(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */

function invert(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  return a[0] * a[3] - a[1] * a[2];
}
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */

function multiply(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function rotate(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/

function scale(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/

function translate(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
}
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1);
}
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}
/**
 * Alias for {@link mat2d.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../node_modules/gl-matrix/esm/mat3.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/mat3.js ***!
  \*********************************************/
/*! exports provided: create, fromMat4, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, rotate, scale, fromTranslation, fromRotation, fromScaling, fromMat2d, fromQuat, normalFromMat4, projection, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat2d", function() { return fromMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalFromMat4", function() { return normalFromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projection", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */

function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */

function translate(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
;
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function fromRotation(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/

function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/

function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2));
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../node_modules/gl-matrix/esm/mat4.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/mat4.js ***!
  \*********************************************/
/*! exports provided: create, clone, copy, fromValues, set, identity, transpose, invert, adjoint, determinant, multiply, translate, scale, rotate, rotateX, rotateY, rotateZ, fromTranslation, fromScaling, fromRotation, fromXRotation, fromYRotation, fromZRotation, fromRotationTranslation, fromQuat2, getTranslation, getScaling, getRotation, fromRotationTranslationScale, fromRotationTranslationScaleOrigin, fromQuat, frustum, perspective, perspectiveFromFieldOfView, ortho, lookAt, targetTo, str, frob, add, subtract, multiplyScalar, multiplyScalarAndAdd, exactEquals, equals, mul, sub */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return transpose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adjoint", function() { return adjoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "determinant", function() { return determinant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromScaling", function() { return fromScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromXRotation", function() { return fromXRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromYRotation", function() { return fromYRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromZRotation", function() { return fromZRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat2", function() { return fromQuat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScaling", function() { return getScaling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRotation", function() { return getRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScale", function() { return fromRotationTranslationScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationScaleOrigin", function() { return fromRotationTranslationScaleOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromQuat", function() { return fromQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frustum", function() { return frustum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspective", function() { return perspective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "perspectiveFromFieldOfView", function() { return perspectiveFromFieldOfView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ortho", function() { return ortho; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lookAt", function() { return lookAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "targetTo", function() { return targetTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "frob", function() { return frob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalar", function() { return multiplyScalar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiplyScalarAndAdd", function() { return multiplyScalarAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function transpose(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function invert(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function multiply(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */

function translate(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  var s, c, t;

  if (len < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {quat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
  out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
  out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S;
    out[2] = (mat[1] - mat[4]) / S;
  } else if (mat[0] > mat[5] && mat[0] > mat[10]) {
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S;
    out[2] = (mat[8] + mat[2]) / S;
  } else if (mat[5] > mat[10]) {
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S;
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S;
  } else {
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyey - centery) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] && Math.abs(eyez - centerz) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return identity(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
;
/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str(a) {
  return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2));
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub = subtract;

/***/ }),

/***/ "../node_modules/gl-matrix/esm/quat.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/quat.js ***!
  \*********************************************/
/*! exports provided: create, identity, setAxisAngle, getAxisAngle, multiply, rotateX, rotateY, rotateZ, calculateW, slerp, random, invert, conjugate, fromMat3, fromEuler, str, clone, fromValues, copy, set, add, mul, scale, dot, lerp, length, len, squaredLength, sqrLen, normalize, exactEquals, equals, rotationTo, sqlerp, setAxes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxisAngle", function() { return setAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAxisAngle", function() { return getAxisAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateW", function() { return calculateW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slerp", function() { return slerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat3", function() { return fromMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromEuler", function() { return fromEuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotationTo", function() { return rotationTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqlerp", function() { return sqlerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAxes", function() { return setAxes; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _mat3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mat3.js */ "../node_modules/gl-matrix/esm/mat3.js");
/* harmony import */ var _vec3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vec3.js */ "../node_modules/gl-matrix/esm/vec3.js");
/* harmony import */ var _vec4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vec4.js */ "../node_modules/gl-matrix/esm/vec4.js");




/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */

function multiply(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function random(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var u3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */

var clone = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["clone"];
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["fromValues"];
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["copy"];
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["set"];
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */

var add = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["add"];
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["scale"];
/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["dot"];
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["lerp"];
/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["length"];
/**
 * Alias for {@link quat.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["squaredLength"];
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["normalize"];
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var exactEquals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["exactEquals"];
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var equals = _vec4_js__WEBPACK_IMPORTED_MODULE_3__["equals"];
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["create"]();
  var xUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](1, 0, 0);
  var yUnitVec3 = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["fromValues"](0, 1, 0);
  return function (out, a, b) {
    var dot = _vec3_js__WEBPACK_IMPORTED_MODULE_2__["dot"](a, b);

    if (dot < -0.999999) {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, xUnitVec3, a);
      if (_vec3_js__WEBPACK_IMPORTED_MODULE_2__["len"](tmpvec3) < 0.000001) _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, yUnitVec3, a);
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["normalize"](tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      _vec3_js__WEBPACK_IMPORTED_MODULE_2__["cross"](tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create();
  var temp2 = create();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = _mat3_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize(out, fromMat3(out, matr));
  };
}();

/***/ }),

/***/ "../node_modules/gl-matrix/esm/quat2.js":
/*!**********************************************!*\
  !*** ../node_modules/gl-matrix/esm/quat2.js ***!
  \**********************************************/
/*! exports provided: create, clone, fromValues, fromRotationTranslationValues, fromRotationTranslation, fromTranslation, fromRotation, fromMat4, copy, identity, set, getReal, getDual, setReal, setDual, getTranslation, translate, rotateX, rotateY, rotateZ, rotateByQuatAppend, rotateByQuatPrepend, rotateAroundAxis, add, multiply, mul, scale, dot, lerp, invert, conjugate, length, len, squaredLength, sqrLen, normalize, str, exactEquals, equals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslationValues", function() { return fromRotationTranslationValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotationTranslation", function() { return fromRotationTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromTranslation", function() { return fromTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromRotation", function() { return fromRotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromMat4", function() { return fromMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getReal", function() { return getReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDual", function() { return getDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReal", function() { return setReal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDual", function() { return setDual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTranslation", function() { return getTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatAppend", function() { return rotateByQuatAppend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateByQuatPrepend", function() { return rotateByQuatPrepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateAroundAxis", function() { return rotateAroundAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return invert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjugate", function() { return conjugate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");
/* harmony import */ var _quat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./quat.js */ "../node_modules/gl-matrix/esm/quat.js");
/* harmony import */ var _mat4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mat4.js */ "../node_modules/gl-matrix/esm/mat4.js");



/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */

function create() {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }

  dq[3] = 1;
  return dq;
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */

function clone(a) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q quaternion
 * @param {vec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Creates a dual quat from a translation
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {vec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
/**
 * Creates a dual quat from a quaternion
 *
 * @param {quat2} dual quaternion receiving operation result
 * @param {quat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {mat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */

function fromMat4(out, a) {
  //TODO Optimize this
  var outer = _quat_js__WEBPACK_IMPORTED_MODULE_1__["create"]();
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getRotation"](outer, a);
  var t = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  _mat4_js__WEBPACK_IMPORTED_MODULE_2__["getTranslation"](t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */

function identity(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */

function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} real part
 */

var getReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {quat2} a Dual Quaternion
 * @return {quat} dual part
 */

function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */

var setReal = _quat_js__WEBPACK_IMPORTED_MODULE_1__["copy"];
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */

function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {quat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */

function getTranslation(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to translate
 * @param {vec3} v vector to translate by
 * @returns {quat2} out
 */

function translate(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateX(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateX"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateY(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateY"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateZ(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  _quat_js__WEBPACK_IMPORTED_MODULE_1__["rotateZ"](out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {quat} q quaternion to rotate by
 * @returns {quat2} out
 */

function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat} q quaternion to rotate by
 * @param {quat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */

function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the dual quaternion to rotate
 * @param {vec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */

function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"]) {
    return copy(out, a);
  }

  var axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 * @function
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {quat2} out
 */

function multiply(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
/**
 * Alias for {@link quat2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot = _quat_js__WEBPACK_IMPORTED_MODULE_1__["dot"];
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {quat2} a the first operand
 * @param {quat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */

function lerp(out, a, b, t) {
  var mt = 1 - t;
  if (dot(a, b) < 0) t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */

function invert(out, a) {
  var sqlen = squaredLength(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {quat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
/**
 * Calculates the length of a dual quat
 *
 * @param {quat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */

var length = _quat_js__WEBPACK_IMPORTED_MODULE_1__["length"];
/**
 * Alias for {@link quat2.length}
 * @function
 */

var len = length;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {quat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength = _quat_js__WEBPACK_IMPORTED_MODULE_1__["squaredLength"];
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {quat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */

function normalize(out, a) {
  var magnitude = squaredLength(a);

  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }

  return out;
}
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {quat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */

function str(a) {
  return 'quat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ')';
}
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat2} a the first dual quaternion.
 * @param {quat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {quat2} a the first dual quat.
 * @param {quat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

/***/ }),

/***/ "../node_modules/gl-matrix/esm/vec2.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/vec2.js ***!
  \*********************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat2, transformMat2d, transformMat3, transformMat4, rotate, angle, zero, str, exactEquals, equals, len, sub, mul, div, dist, sqrDist, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2", function() { return transformMat2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat2d", function() { return transformMat2d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotate", function() { return rotate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0],
      y = a[1];
  return Math.sqrt(x * x + y * y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {vec2} a The vec2 point to rotate
 * @param {vec2} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec2} out
 */

function rotate(out, a, b, c) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(c),
      cosC = Math.cos(c); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {vec2} a The first operand
 * @param {vec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1];
  var len1 = x1 * x1 + y1 * y1;

  if (len1 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len1 = 1 / Math.sqrt(len1);
  }

  var len2 = x2 * x2 + y2 * y2;

  if (len2 > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len2 = 1 / Math.sqrt(len2);
  }

  var cosine = (x1 * x2 + y1 * y2) * len1 * len2;

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return 'vec2(' + a[0] + ', ' + a[1] + ')';
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

/***/ }),

/***/ "../node_modules/gl-matrix/esm/vec3.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/vec3.js ***!
  \*********************************************/
/*! exports provided: create, clone, length, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, squaredLength, negate, inverse, normalize, dot, cross, lerp, hermite, bezier, random, transformMat4, transformMat3, transformQuat, rotateX, rotateY, rotateZ, angle, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hermite", function() { return hermite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bezier", function() { return bezier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat3", function() { return transformMat3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateX", function() { return rotateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateY", function() { return rotateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateZ", function() { return rotateZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angle", function() { return angle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues(x, y, z) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.sqrt(x * x + y * y + z * z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */

function cross(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 * Math.PI;
  var z = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */

function rotateX(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
  r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */

function rotateY(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */

function rotateZ(out, a, b, c) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
  r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var tempA = fromValues(a[0], a[1], a[2]);
  var tempB = fromValues(b[0], b[1], b[2]);
  normalize(tempA, tempA);
  normalize(tempB, tempB);
  var cosine = dot(tempA, tempB);

  if (cosine > 1.0) {
    return 0;
  } else if (cosine < -1.0) {
    return Math.PI;
  } else {
    return Math.acos(cosine);
  }
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

/***/ }),

/***/ "../node_modules/gl-matrix/esm/vec4.js":
/*!*********************************************!*\
  !*** ../node_modules/gl-matrix/esm/vec4.js ***!
  \*********************************************/
/*! exports provided: create, clone, fromValues, copy, set, add, subtract, multiply, divide, ceil, floor, min, max, round, scale, scaleAndAdd, distance, squaredDistance, length, squaredLength, negate, inverse, normalize, dot, cross, lerp, random, transformMat4, transformQuat, zero, str, exactEquals, equals, sub, mul, div, dist, sqrDist, len, sqrLen, forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromValues", function() { return fromValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return subtract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scale", function() { return scale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleAndAdd", function() { return scaleAndAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distance", function() { return distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredLength", function() { return squaredLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dot", function() { return dot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return cross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformMat4", function() { return transformMat4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformQuat", function() { return transformQuat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zero", function() { return zero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exactEquals", function() { return exactEquals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sub", function() { return sub; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mul", function() { return mul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dist", function() { return dist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrDist", function() { return sqrDist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "len", function() { return len; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrLen", function() { return sqrLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "../node_modules/gl-matrix/esm/common.js");

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create() {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);

  if (_common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"] != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone(a) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues(x, y, z, w) {
  var out = new _common_js__WEBPACK_IMPORTED_MODULE_0__["ARRAY_TYPE"](4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function multiply(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */

function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */

function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */

function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {vec4} result the receiving vector
 * @param {vec4} U the first vector
 * @param {vec4} V the second vector
 * @param {vec4} W the third vector
 * @returns {vec4} result
 */

function cross(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
;
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v2 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    v4 = _common_js__WEBPACK_IMPORTED_MODULE_0__["RANDOM"]() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _common_js__WEBPACK_IMPORTED_MODULE_0__["EPSILON"] * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub = subtract;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul = multiply;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div = divide;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist = distance;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len = length;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach = function () {
  var vec = create();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

/***/ }),

/***/ "./src/example.ts":
/*!************************!*\
  !*** ./src/example.ts ***!
  \************************/
/*! exports provided: Example */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Example", function() { return Example; });
/* harmony import */ var _lib_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/viewer */ "../lib/viewer/index.js");
/* harmony import */ var _scenes_EnvironmentScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes/EnvironmentScene */ "./src/scenes/EnvironmentScene.ts");
/* harmony import */ var _scenes_ModelScene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scenes/ModelScene */ "./src/scenes/ModelScene.ts");
/* harmony import */ var _lib_components_gui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/components/gui */ "../lib/components/gui/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_components_camera__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/components/camera */ "../lib/components/camera/index.js");
/* harmony import */ var _lib_components_transform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/components/transform */ "../lib/components/transform/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! gl-matrix */ "../node_modules/gl-matrix/esm/index.js");








const sampleModels = {
    "BoxAnimated": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated0.bin"
    },
    "RiggedSimple": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple0.bin"
    },
    "BrainStem": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem0.bin"
    },
    "WaterBottle": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.bin"
    },
    "Sponza": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.bin"
    },
    "DamagedHelmet": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.bin"
    },
    "MetalRoughSpheres": {
        gltfJson: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
        gltfBin: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres0.bin"
    }
};
class Example {
    constructor() {
        this.scene = "DamagedHelmet";
        this.viewer = new _lib_viewer__WEBPACK_IMPORTED_MODULE_0__["Viewer"]({ width: window.innerWidth, height: window.innerHeight });
        this.viewer.init(() => this.init());
    }
    init() {
        this.createSceneSelector();
        this.createCamera();
        this.viewer.world.addScene(new _scenes_EnvironmentScene__WEBPACK_IMPORTED_MODULE_1__["EnvironmentScene"]({ name: "Environment" }));
        this.viewer.world.addScene(new _scenes_ModelScene__WEBPACK_IMPORTED_MODULE_2__["ModelScene"]({
            name: "ModelScene",
            gltfJson: sampleModels[this.scene].gltfJson,
            gltfBin: sampleModels[this.scene].gltfBin,
            shader: this.viewer.shader
        }));
        this.viewer.world.start("Environment");
        this.viewer.world.start("ModelScene");
    }
    reloadModelScene() {
        this.viewer.loader.stop();
        this.viewer.world.removeScene("ModelScene");
        this.viewer.world.addScene(new _scenes_ModelScene__WEBPACK_IMPORTED_MODULE_2__["ModelScene"]({
            name: "ModelScene",
            gltfJson: sampleModels[this.scene].gltfJson,
            gltfBin: sampleModels[this.scene].gltfBin,
            shader: this.viewer.shader
        }));
        this.viewer.world.start("ModelScene");
    }
    createCamera() {
        this.camera = curbl_ecs__WEBPACK_IMPORTED_MODULE_4__["ECS"].createEntity();
        this.camera.add(new _lib_components_camera__WEBPACK_IMPORTED_MODULE_5__["CameraComponent"]({
            aspect: (window.innerWidth / window.innerHeight),
            fovy: 45.0 * Math.PI / 180.0,
            near: 0.01,
            far: 100.0
        }));
        this.camera.add(new _lib_components_transform__WEBPACK_IMPORTED_MODULE_6__["TransformComponent"]({
            position: { x: 0, y: 0, z: -4.00 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 1, y: 1, z: 1 }
        }));
        this.camera.add(new _lib_components_camera__WEBPACK_IMPORTED_MODULE_5__["LookAtCameraComponent"]());
        curbl_ecs__WEBPACK_IMPORTED_MODULE_4__["ECS"].addEntity(this.camera);
        window.addEventListener('resize', () => this.onResize());
    }
    onResize() {
        gl_matrix__WEBPACK_IMPORTED_MODULE_7__["mat4"].perspective(this.camera.get(_lib_components_camera__WEBPACK_IMPORTED_MODULE_5__["CameraComponent"]).projMatrix, 45.0 * Math.PI / 180.0, (window.innerWidth / window.innerHeight), 0.01, 100);
    }
    createSceneSelector() {
        const entity = curbl_ecs__WEBPACK_IMPORTED_MODULE_4__["ECS"].createEntity();
        entity.add(new _lib_components_gui__WEBPACK_IMPORTED_MODULE_3__["GUIComponent"]({
            properties: [
                {
                    prop: this,
                    propName: "scene",
                    items: Object.keys(sampleModels),
                    onChange: () => this.reloadModelScene()
                }
            ]
        }));
        curbl_ecs__WEBPACK_IMPORTED_MODULE_4__["ECS"].addEntity(entity);
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _example__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./example */ "./src/example.ts");

window.onload = () => { new _example__WEBPACK_IMPORTED_MODULE_0__["Example"](); };


/***/ }),

/***/ "./src/scenes/EnvironmentScene.ts":
/*!****************************************!*\
  !*** ./src/scenes/EnvironmentScene.ts ***!
  \****************************************/
/*! exports provided: EnvironmentScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnvironmentScene", function() { return EnvironmentScene; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_1__);


class EnvironmentScene extends _lib__WEBPACK_IMPORTED_MODULE_0__["WorldScene"] {
    preload() {
        this.loader.get(_lib__WEBPACK_IMPORTED_MODULE_0__["CubemapLoader"]).add(_lib__WEBPACK_IMPORTED_MODULE_0__["GLOBAL_TEXTURES"].SKYBOX, [{
                right: './assets/ibl/environment/environment_right_0.jpg',
                left: './assets/ibl/environment/environment_left_0.jpg',
                top: './assets/ibl/environment/environment_top_0.jpg',
                bottom: './assets/ibl/environment/environment_bottom_0.jpg',
                front: './assets/ibl/environment/environment_front_0.jpg',
                back: './assets/ibl/environment/environment_back_0.jpg'
            }]);
        this.loader.get(_lib__WEBPACK_IMPORTED_MODULE_0__["CubemapLoader"]).add(_lib__WEBPACK_IMPORTED_MODULE_0__["GLOBAL_TEXTURES"].DIFFUSE_ENVIRONMENT, [{
                right: './assets/ibl/diffuse/diffuse_right_0.jpg',
                left: './assets/ibl/diffuse/diffuse_left_0.jpg',
                top: './assets/ibl/diffuse/diffuse_top_0.jpg',
                bottom: './assets/ibl/diffuse/diffuse_bottom_0.jpg',
                front: './assets/ibl/diffuse/diffuse_front_0.jpg',
                back: './assets/ibl/diffuse/diffuse_back_0.jpg'
            }], {
            premultiplyAlpha: false,
            internalFormat: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].SRGB8_ALPHA8,
            format: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].RGBA,
            type: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES"].UNSIGNED_BYTE
        });
        let specular_map = [];
        for (let i = 0; i < 10; i++) {
            specular_map.push({
                right: './assets/ibl/specular/specular_right_' + i + '.jpg',
                left: './assets/ibl/specular/specular_left_' + i + '.jpg',
                top: './assets/ibl/specular/specular_top_' + i + '.jpg',
                bottom: './assets/ibl/specular/specular_bottom_' + i + '.jpg',
                front: './assets/ibl/specular/specular_front_' + i + '.jpg',
                back: './assets/ibl/specular/specular_back_' + i + '.jpg'
            });
        }
        this.loader.get(_lib__WEBPACK_IMPORTED_MODULE_0__["CubemapLoader"]).add(_lib__WEBPACK_IMPORTED_MODULE_0__["GLOBAL_TEXTURES"].SPECULAR_ENVIRONMENT, specular_map, {
            premultiplyAlpha: false,
            internalFormat: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].SRGB8_ALPHA8,
            format: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].RGBA,
            type: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES"].UNSIGNED_BYTE
        });
        this.loader.get(_lib__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]).add(_lib__WEBPACK_IMPORTED_MODULE_0__["GLOBAL_TEXTURES"].BRDF_LUT, "./assets/ibl/brdfLUT.png", {
            premultiplyAlpha: false,
            internalFormat: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].SRGB8_ALPHA8,
            format: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_INTERNALFORMAT"].RGBA,
            type: _lib__WEBPACK_IMPORTED_MODULE_0__["GL_TYPES"].UNSIGNED_BYTE,
            sampler: {
                magFilter: _lib__WEBPACK_IMPORTED_MODULE_0__["MAG_FILTER"].LINEAR,
                minFilter: _lib__WEBPACK_IMPORTED_MODULE_0__["MIN_FILTER"].LINEAR,
                wrapS: _lib__WEBPACK_IMPORTED_MODULE_0__["TEXTURE_WRAP"].CLAMP_TO_EDGE,
                wrapT: _lib__WEBPACK_IMPORTED_MODULE_0__["TEXTURE_WRAP"].CLAMP_TO_EDGE
            }
        });
    }
    create() {
        const entity = curbl_ecs__WEBPACK_IMPORTED_MODULE_1__["ECS"].createEntity();
        const lightComponent = new _lib__WEBPACK_IMPORTED_MODULE_0__["LightComponent"]({
            lightColor: [255, 255, 255],
            lightScale: 1.0,
            lightRotation: 75,
            lightPitch: 40
        });
        entity.add(lightComponent);
        entity.add(new _lib__WEBPACK_IMPORTED_MODULE_0__["GUIComponent"]({
            folder: "Directional Light",
            properties: [
                {
                    prop: lightComponent,
                    propName: "lightColor",
                    isColor: true,
                    onChange: () => lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightScale",
                    min: 0,
                    max: 10,
                    onChange: () => lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightRotation",
                    min: 0,
                    max: 360,
                    onChange: () => lightComponent.updateLight()
                },
                {
                    prop: lightComponent,
                    propName: "lightPitch",
                    min: -90,
                    max: 90,
                    onChange: () => lightComponent.updateLight()
                }
            ]
        }));
        this.add(entity);
    }
    shutdown() {
    }
    update() {
    }
}


/***/ }),

/***/ "./src/scenes/ModelScene.ts":
/*!**********************************!*\
  !*** ./src/scenes/ModelScene.ts ***!
  \**********************************/
/*! exports provided: ModelScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModelScene", function() { return ModelScene; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! curbl-ecs */ "../node_modules/curbl-ecs/lib/index.js");
/* harmony import */ var curbl_ecs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(curbl_ecs__WEBPACK_IMPORTED_MODULE_1__);


class ModelScene extends _lib__WEBPACK_IMPORTED_MODULE_0__["WorldScene"] {
    constructor(config) {
        super(config);
        this.gltfJson = config.gltfJson;
        this.gltfBin = config.gltfBin;
        this.shader = config.shader;
    }
    preload() {
        this.loader.get(_lib__WEBPACK_IMPORTED_MODULE_0__["GLTFLoader"]).add("ExampleScene", this.gltfJson, this.gltfBin);
    }
    create() {
        const sceneObj = this.cache.get(_lib__WEBPACK_IMPORTED_MODULE_0__["CACHE_TYPE"].SCENE, "ExampleScene");
        this.shader.unload();
        this.shader.initializeDefines(sceneObj.meshes[0]);
        this.shader.upload();
        const scene = curbl_ecs__WEBPACK_IMPORTED_MODULE_1__["ECS"].createEntity();
        scene.add(new _lib__WEBPACK_IMPORTED_MODULE_0__["SceneComponent"]({ key: "ExampleScene" }));
        scene.add(new _lib__WEBPACK_IMPORTED_MODULE_0__["TransformComponent"]({
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 1, y: 1, z: 1 }
        }));
        if (sceneObj.animations[0]) {
            const animationKey = sceneObj.animations[0].name;
            scene.add(new _lib__WEBPACK_IMPORTED_MODULE_0__["AnimationComponent"]({ key: animationKey }));
        }
        this.add(scene);
    }
    shutdown() {
    }
    update() {
    }
}


/***/ })

/******/ });
//# sourceMappingURL=viewer.bundle.js.map