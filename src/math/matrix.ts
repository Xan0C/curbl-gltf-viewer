import {Vector} from "./vector";
import {Quaternion} from "./quaternion";

/**
 * Matrix class consisting of
 * R(Right) first column
 * U(Up) second column
 * F(Forward) third column
 * T(Translation) fourth column
 */
export class Matrix {
    private _elements:Float32Array;

    /**
     * Elements are added in column order
     * @param elements
     */
    constructor(elements?:Array<number>){
        if(elements){
            this._elements = new Float32Array(16);
            for(let i=0; i < 16;i++){
                this._elements[i] = elements[i];
            }
        }else{
            this._elements = new Float32Array([
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1
            ]);
        }
    }

    /**
     * Multiplies the Vector by the 4x4 Matrix
     * dividing its individual components by W
     * @param v
     * @returns {Vector}
     */
    transformVec4x4(v:Vector):Vector{
        const m = this._elements;
        let X = m[0]*v.x+m[4]*v.y+m[8]*v.z+m[12];
        let Y = m[1]*v.x+m[5]*v.y+m[9]*v.z+m[13];
        let Z = m[2]*v.x+m[6]*v.y+m[10]*v.z+m[14];
        let W = m[3]*v.x+m[7]*v.y+m[11]*v.z+m[15];
        return new Vector(X/W,Y/W,Z/W);
    }

    /**
     * Multiplies the Vector with the 3x3 Matrix
     * @param v
     * @returns {Vector}
     */
    transformVec3x3(v:Vector):Vector{
        const m = this._elements;
        let X = m[0]*v.x+m[4]*v.y+m[8]*v.z;
        let Y = m[1]*v.x+m[5]*v.y+m[9]*v.z;
        let Z = m[2]*v.x+m[6]*v.y+m[10]*v.z;
        return new Vector(X,Y,Z);
    }

    /**
     * Up Vector of the Matrix(2nd column)
     * @returns {Vector}
     */
    get up():Vector{
        const m = this._elements;
        return new Vector(m[4],m[5],m[6]);
    }

    set up(v:Vector){
        this._elements[4] = v.x;
        this._elements[5] = v.y;
        this._elements[6] = v.z;
    }

    /**
     * Forward Vector(3rd Column)
     * @returns {Vector}
     */
    get forward():Vector{
        const m = this._elements;
        return new Vector(m[8],m[9],m[10]);
    }

    set forward(v:Vector){
        this._elements[8] = v.x;
        this._elements[9] = v.y;
        this._elements[10] = v.z;
    }

    /**
     * Right Vector(1st Column)
     * @returns {Vector}
     */
    get right():Vector{
        const m = this._elements;
        return new Vector(m[0],m[1],m[2]);
    }

    set right(v:Vector){
        this._elements[0] = v.x;
        this._elements[1] = v.y;
        this._elements[2] = v.z;
    }

    get translation():Vector{
        const m = this._elements;
        return new Vector(m[12],m[13],m[13]);
    }

    set translation(v:Vector){
        this._elements[12] = v.x;
        this._elements[13] = v.y;
        this._elements[14] = v.z;
    }

    getScale():Vector{
        return new Vector(this._elements[0],this._elements[5],this._elements[10]);
    }

    /**
     * Multiplies this Matrix with the given localMatrix m this = this*M
     * @param m
     * @returns {Matrix}
     */
    multiply(m:Matrix):Matrix{
        return Matrix.multiply(this,m,this);
    }

    /**
     * Multiplies this Matrix with the given Matrix m from the left side this with M = M*this
     * @param m
     * @returns {Matrix}
     */
    concat(m:Matrix):Matrix{
        return Matrix.multiply(m,this,this);
    }

    static multiply(A:Matrix,B:Matrix,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let e = out._elements;
        let a = A._elements;
        let b = B._elements;

        //If e equals b(same object) copy to temporary localMatrix
        if(e === b){
            b = new Float32Array(16);
            for(let i=0; i < 16; i++){
                b[i] = e[i];
            }
        }
        if(e === a){
            a = new Float32Array(16);
            for(let i=0; i < 16; i++){
                a[i] = e[i];
            }
        }
        let ai0, ai1, ai2, ai3;
        for (let i = 0; i < 4; i++) {
            ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
            e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
            e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
            e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
            e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }
        return out;
    }

    translate(t:{x:number,y:number,z:number}):Matrix{
        let e = this._elements;
        let x,y,z;
        x = t.x;
        y = t.y;
        z = t.z;
        e[12] += e[0] * x + e[4] * y + e[8]  * z;
        e[13] += e[1] * x + e[5] * y + e[9]  * z;
        e[14] += e[2] * x + e[6] * y + e[10] * z;
        e[15] += e[3] * x + e[7] * y + e[11] * z;
        return this;
    }

    /**
     * Sets the Matrix to the Translation Matrix
     * @param t - translation vector
     * @param out - {optional} localMatrix to write to
     * @returns {Matrix}
     */
    static setTranslate(t:{x:number,y:number,z:number},out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let m = out._elements;
        m[0] = 1; m[4] = 0; m[8] = 0;  m[12] = t.x;
        m[1] = 0; m[5] = 1; m[9] = 0;  m[13] = t.y;
        m[2] = 0; m[6] = 0; m[10] = 1; m[14] = t.z;
        m[3] = 0; m[7] = 0; m[11] = 0; m[15] = 1;
        return out;
    }

    /**
     * Multiplies this Matrix by the Rotation Matrix this=this*R
     * @param angle
     * @param axis
     * @returns {Matrix}
     */
    rotate(angle:number,axis:{x:number,y:number,z:number}):Matrix{
        return this.multiply(Matrix.setRotate(angle,axis));
    }

    /**
     * http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/
     * @returns {Quaternion}
     */
    getRotation():Quaternion {
        const m = this._elements;
        const tr = m[0] + m[5] + m[10];
        let x,y,z,w;
        if(tr > 0){
            const S = Math.sqrt(tr+1)*2; //S=4*w
            w = 0.25*S;
            x = (m[9] - m[6]) / S;
            y = (m[2] - m[8]) / S;
            z = (m[4] - m[1]) / S;
        }else if((m[0] > m[5])&&(m[0] > m[10])) {
            const S = Math.sqrt(1 + m[0] - m[5] - m[10]) *2; //S=4*x
            w = (m[9] - m[6]) / S;
            x = 0.25*S;
            y = (m[1] + m[4]) / S;
            z = (m[2] + m[8]) / S;
        }else if(m[5] > m[10]){
            const S = Math.sqrt(1 + m[5] - m[0] - m[10]) * 2; //S=4*y
            w = (m[2] - m[8]) / S;
            x = (m[1] + m[4]) / S;
            y = 0.25 * S;
            z = (m[6] + m[9]) / S;
        }else{
            const S = Math.sqrt(1 + m[10] - m[0] - m[5]) * 2; //S=4*z
            w = (m[4] - m[1]) / S;
            x = (m[2] + m[8]) / S;
            y = (m[6] + m[9]) / S;
            z = 0.25 * S;
        }
        return new Quaternion(x,y,z,w);
    }

    /**
     * Sets the Matrix to the Rotation Matrix
     * @param angle
     * @param axis
     * @param out
     * @returns {Matrix}
     */
    static setRotate(angle:number,axis:{x:number,y:number,z:number},out?:Matrix):Matrix{
        let e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
        let x,y,z;
        x = axis.x;
        y = axis.y;
        z = axis.z;
        if(!out){
            out = new Matrix();
        }
        angle = Math.PI * angle / 180;
        e = out._elements;

        s = Math.sin(angle);
        c = Math.cos(angle);

        if (0 !== x && 0 === y && 0 === z) {
            // Rotation around X axis
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
            e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
            e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else if (0 === x && 0 !== y && 0 === z) {
            // Rotation around Y axis
            if (y < 0) {
                s = -s;
            }
            e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
            e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
            e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else if (0 === x && 0 === y && 0 !== z) {
            // Rotation around Z axis
            if (z < 0) {
                s = -s;
            }
            e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
            e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
            e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
            e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else {
            // Rotation around another axis
            len = Math.sqrt(x*x + y*y + z*z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            e[ 0] = x*x*nc +  c;
            e[ 1] = xy *nc + zs;
            e[ 2] = zx *nc - ys;
            e[ 3] = 0;

            e[ 4] = xy *nc - zs;
            e[ 5] = y*y*nc +  c;
            e[ 6] = yz *nc + xs;
            e[ 7] = 0;

            e[ 8] = zx *nc + ys;
            e[ 9] = yz *nc - xs;
            e[10] = z*z*nc +  c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }
        return out;
    }

    /**
     * Scales the Matrix this=this*S
     * @param scale
     * @returns {Matrix}
     */
    scale(scale:{x:number,y:number,z:number}):Matrix{
        let e = this._elements;
        let x,y,z;
        x = scale.x;
        y = scale.y;
        z = scale.z;

        e[0] *= x;  e[4] *= y;  e[8]  *= z;
        e[1] *= x;  e[5] *= y;  e[9]  *= z;
        e[2] *= x;  e[6] *= y;  e[10] *= z;
        e[3] *= x;  e[7] *= y;  e[11] *= z;

        return this;
    }

    static setScale(scale:{x:number,y:number,z:number},out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let e = out._elements;
        let x = scale.x;
        let y = scale.y;
        let z = scale.z;
        e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
        e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
        e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
        e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        return out;
    }

    identity():Matrix{
        return Matrix.setIdentity(this);
    }

    static setIdentity(out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let m = out._elements;
        m[0]  = 1; m[4]  = 0; m[8]  = 0; m[12] = 0;
        m[1]  = 0; m[5]  = 1; m[9]  = 0; m[13] = 0;
        m[2]  = 0; m[6]  = 0; m[10] = 1; m[14] = 0;
        m[3]  = 0; m[7]  = 0; m[11] = 0; m[15] = 1;
        return out;
    }

    transpose():Matrix{
        return Matrix.transpose(this,this);
    }

    static transpose(A:Matrix,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let m = out._elements;
        let a = A._elements;

        if(a === m){
            a = new Float32Array(16);
            for(let i=0; i < 16; i++){
                a[i] = m[i];
            }
        }

        m[0]  = a[0];  m[4] = a[1];  m[8]  = a[2];  m[12] = a[3];
        m[1]  = a[4];  m[5] = a[5];  m[9]  = a[6];  m[13] = a[7];
        m[2]  = a[8];  m[6] = a[9];  m[10] = a[10]; m[14] = a[11];
        m[3] =  a[12]; m[7] = a[13]; m[11] = a[14]; m[15] = a[15];

        return out;
    }

    invert():Matrix{
        return Matrix.invert(this,this);
    }

    /**
     * TODO: Maybe wrong
     * @param A
     * @param out
     * @returns {Matrix}
     */
    static invert(A:Matrix,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let i, s, m, inv, det;
        s = A._elements;
        m = out._elements;
        inv = new Float32Array(16);

        inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
        inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
        inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
        inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

        inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
        inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
        inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
        inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

        inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
        inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
        inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
        inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

        inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
        inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
        inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
        inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

        det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
        if (det === 0) {
            return out;
        }
        det = 1 / det;
        for (i = 0; i < 16; i++) {
            m[i] = inv[i] * det;
        }
        return out;
    }

    lookAt(eye:{x:number,y:number,z:number},center:{x:number,y:number,z:number},up:{x:number,y:number,z:number}):Matrix{
        return this.multiply(Matrix.setLookAt(eye,center,up));
    }

    static setLookAt(eye:{x:number,y:number,z:number},center:{x:number,y:number,z:number},up:{x:number,y:number,z:number},out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let m = out._elements;
        let fx,fy,fz;
        let ux,uy,uz;
        fx = center.x - eye.x;
        fy = center.y - eye.y;
        fz = center.z - eye.z;

        //Normalize Target-Position Vector
        let len = Math.sqrt(fx*fx+fy*fy+fz*fz);
        fx /= len;
        fy /= len;
        fz /= len;

        //Normalize Up
        ux = up.x;
        uy = up.y;
        uz = up.z;
        len = Math.sqrt(ux*ux+uy*uy+uz*uz);
        ux /= len;
        uy /= len;
        uz /= len;

        //Cross of DIR and UP
        let rx,ry,rz;
        rx = fy * uz - fz * uy;
        ry = fz * ux - fx * uz;
        rz = fx * uy - fy * ux;
        len = Math.sqrt(rx*rx+ry*ry+rz*rz);
        rx /= len;
        ry /= len;
        rz /= len;

        //Cross R DIR
        ux = ry * fz - rz * fy;
        uy = rz * fx - rx * fz;
        uz = rx * fy - ry * fx;

        m[0]  = rx;  m[4] = ry;  m[8]  = rz;  m[12] = 0;
        m[1]  = ux;  m[5] = uy;  m[9]  = uz;  m[13] = 0;
        m[2]  = -fx; m[6] = -fy; m[10] = -fz; m[14] = 0;
        m[3] = 0;    m[7] = 0;   m[11] = 0;   m[15] = 1;

        m[12]  += m[0] * -eye.x + m[4] * -eye.y + m[8]  * -eye.z;
        m[13]  += m[1] * -eye.x + m[5] * -eye.y + m[9]  * -eye.z;
        m[14] +=  m[2] * -eye.x + m[6] * -eye.y + m[10] * -eye.z;

        return out;
    }

    /**
     * Multiply this Matrix by the Perspective Matrix
     * @param fovy
     * @param aspect
     * @param near
     * @param far
     * @returns {Matrix}
     */
    perspective(fovy:number,aspect:number,near:number,far:number):Matrix{
        return this.multiply(Matrix.setPerspective(fovy,aspect,near,far));
    }

    static setPerspective(fovy:number,aspect:number,near:number,far:number,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let m = out._elements;
        if (near === far || aspect === 0) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }

        fovy = Math.PI * fovy / 180 / 2; //convert to rad but only half
        let s = Math.sin(fovy);
        if (s === 0) {
            throw 'null frustum';
        }
        let ct = Math.cos(fovy) / s;
        let rd = 1 / (far - near);

        m[0]  = ct / aspect; m[4] = 0;  m[8]  = 0;              m[12]  = 0;
        m[1]  = 0;           m[5] = ct; m[9]  = 0;              m[13]  = 0;
        m[2]  = 0;           m[6] = 0;  m[10] = -(far+near)*rd; m[14] = -2*far*near*rd;
        m[3]  = 0;           m[7] = 0;  m[11] = -1;             m[15] = 0;

        return out;
    }

    ortho(left:number,right:number,bottom:number,top:number,near:number,far:number):Matrix{
        return this.multiply(Matrix.setOrtho(left,right,bottom,top,near,far));
    }

    static setOrtho(left:number,right:number,bottom:number,top:number,near:number,far:number,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        let e, rw, rh, rd;

        if (left === right || bottom === top || near === far) {
            throw 'null frustum';
        }

        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);

        e = out._elements;

        e[0]  = 2 * rw; e[4]  = 0;      e[8]  = 0;       e[12]  = -(right + left) * rw;
        e[1]  = 0;      e[5]  = 2 * rh; e[9]  = 0;       e[13]  = -(top + bottom) * rh;
        e[2]  = 0;      e[6]  = 0;      e[10] = -2 * rd; e[14] = -(far + near) * rd;
        e[3]  = 0;      e[7]  = 0;      e[11] = 0;       e[15] = 1;

        return out;
    }

    frustrum(left:number,right:number,bottom:number,top:number,near:number,far:number):Matrix{
        return this.multiply(Matrix.setFrustrum(left,right,bottom,top,near,far));
    }

    static setFrustrum(left:number,right:number,bottom:number,top:number,near:number,far:number,out?:Matrix):Matrix{
        if(!out){
            out = new Matrix();
        }
        var e, rw, rh, rd;

        if (left === right || top === bottom || near === far) {
            throw 'null frustum';
        }
        if (near <= 0) {
            throw 'near <= 0';
        }
        if (far <= 0) {
            throw 'far <= 0';
        }

        rw = 1 / (right - left);
        rh = 1 / (top - bottom);
        rd = 1 / (far - near);

        e = out._elements;

        e[0] = 2 * near * rw; e[4]  = 0;             e[8]  = (right + left) * rw; e[12]  = 0;
        e[1] = 0;             e[5]  = 2 * near * rh; e[9]  = (top + bottom) * rh; e[13]  = 0;
        e[2] = 0;             e[6]  = 0;             e[10] = -(far + near) * rd;  e[14] = -2 * near * far * rd;
        e[3] = 0;             e[7]  = 0;             e[11] = -1;                  e[15] = 0;

        return out;
    }

    public toString():string{
        return `{Matrix4: [
                ${this._elements[0]} ${this._elements[4]} ${this._elements[ 8]} ${this._elements[12]}
                ${this._elements[1]} ${this._elements[5]} ${this._elements[ 9]} ${this._elements[13]}
                ${this._elements[2]} ${this._elements[6]} ${this._elements[10]} ${this._elements[14]}
                ${this._elements[3]} ${this._elements[7]} ${this._elements[11]} ${this._elements[15]}
            ]}`;
    }

    public get elements():Float32Array {
        return this._elements;
    }

    public set elements(value:Float32Array) {
        this._elements = value;
    }
}