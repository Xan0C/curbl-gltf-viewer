import {Vector} from "./vector";

export module Math3d {

    /**
     * Return a vector point on a position of a sphere
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @returns {Vector}
     */
    export function getVSpherePos(x:number,y:number,width:number,height:number):Vector{
        let p = new Vector(1.0*x/width*2.0-1.0, 1.0*y/height*2.0-1.0, 0);
        p.y = -p.y;
        let sqrLen = p.lengthSquared();
        if(sqrLen <= 1.0){
            p.z = Math.sqrt(1-sqrLen);
        }else{
            p.normalize();
        }
        return p;
    }

    /**
     * Rotate vector v around axis n with angle a
     * @param {Vector} v - vector to rotate
     * @param {Vector} n - axis to rotate around
     * @param {number} a - rotation angle
     * @returns {Vector}
     */
    export function rotateAxisAngle(v:Vector,n:Vector,a:number):Vector{
        let co = Math.cos(a);
        let si = Math.sin(a);

        let o:Vector = new Vector();
        let mx = new Vector(n.x*n.x*(1.0-co)+co, n.x*n.y*(1.0-co)-n.z*si, n.x*n.z*(1.0-co)+n.y*si);
        let my = new Vector(n.x*n.y*(1.0-co)+n.z*si, n.y*n.y*(1.0-co)+co, n.y*n.z*(1.0-co)-n.x*si);
        let mz = new Vector(n.x*n.z*(1.0-co)-n.y*si, n.z*n.y*(1.0-co)+n.x*si, n.z*n.z*(1.0-co)+co);
        o.x = mx.dot(v);
        o.y = my.dot(v);
        o.z = mz.dot(v);
        return o;
    }

    /**
     * transform degree to radians
     * @param {number} deg
     * @returns {number}
     */
    export function radians(deg:number):number{
        return deg * Math.PI / 180;
    }

    /**
     * ModelTransform radians to degrees
     * @param {number} rad
     * @returns {number}
     */
    export function degrees(rad:number):number{
        return rad * 180 / Math.PI;
    }
}

export module Math2d {
    export function lerp(a:number,b:number,f:number):number{
        return a+f*(b-a);
    }
}