import {mat4, vec3} from "gl-matrix";

export enum FRUSTUM_INTERSECT {
    INSIDE,
    INTERSECTING,
    OUTSIDE
}

export enum HALFSPACE {
    NEGATIVE = -1,
    ON_PLANE = 0,
    POSITIVE = 1
}

/**
 * Plane representation as ax+by+cz+d = 0, with (a,b,c) = normal
 */
export class Plane {
    normal: vec3;
    distance: number;

    constructor(normal?:  vec3, distance?: number) {
        this.normal = normal || vec3.create();
        this.distance = distance || 0;
    }

    distanceToPoint(p: vec3): number {
        return vec3.dot(this.normal, p) + this.distance;
    }

    halfspace(p: vec3): HALFSPACE {
        const distance = this.distanceToPoint(p);

        if(distance < 0) return HALFSPACE.NEGATIVE;
        if(distance > 0) return HALFSPACE.POSITIVE;
        return HALFSPACE.ON_PLANE;
    }

    /**
     * flips the normal vectors of the plane
     * by default they point to the inside
     */
    flip(): Plane {
        vec3.scale(this.normal, this.normal, -1);
        this.distance *= -1;
        return this;
    }

    static create(): Plane {
        return new Plane();
    }

    //Plane from normal and support vector p0
    static fromNormalAndPoint(n: vec3, p0: vec3) {
        const normal = vec3.normalize(vec3.create(), n);
        const d = vec3.dot(vec3.scale(vec3.create(), normal, -1), p0);
        return new Plane(normal, d);
    }

    static fromPoints(p0: vec3, p1: vec3, p2:vec3, flip?: boolean): Plane {
        const v = vec3.subtract(vec3.create(), p1, p0);
        const u = vec3.subtract(vec3.create(), p2, p0);
        const n = vec3.cross(vec3.create(), u, v);
        vec3.normalize(n, n);
        const d = vec3.dot(n, p0) * -1.0;

        return flip ? new Plane(n, d).flip() : new Plane(n, d);
    }
}

export class Frustum {

    planes: [Plane, Plane, Plane, Plane, Plane, Plane];

    constructor() {
        this.planes = [Plane.create(), Plane.create(), Plane.create(), Plane.create(), Plane.create(), Plane.create()];
    }

    normalize(): Frustum {
        for(let i=0; i < 6; i++) {
            const magnitude = vec3.length(this.planes[i].normal);
            vec3.scale(this.planes[i].normal, this.planes[i].normal, 1/magnitude);
            this.planes[i].distance /= magnitude;
        }
        return this;
    }

    /**
     * flip the normals of the frustum planes
     */
    flip(): Frustum {
        for(let i=0, plane: Plane; plane = this.planes[i]; i++) {
            plane.flip();
        }
        return this;
    }

    /**
     * https://fgiesen.wordpress.com/2010/10/17/view-frustum-culling/
     * intersection with boundingBox assuming the plane normals are facing inside
     * @param box
     */
    intersectAABB(box: {min: vec3, max:vec3}): FRUSTUM_INTERSECT {
        let result = FRUSTUM_INTERSECT.INSIDE;
        for(let i=0, plane: Plane; plane = this.planes[i]; i++) {
            const p = vec3.clone(box.min);
            p[0] = plane.normal[0] >= 0 ? box.max[0] : p[0];
            p[1] = plane.normal[1] >= 0 ? box.max[1] : p[1];
            p[2] = plane.normal[2] >= 0 ? box.max[2] : p[2];

            const n = vec3.clone(box.max);
            n[0] = plane.normal[0] >= 0 ? box.min[0] : n[0];
            n[1] = plane.normal[1] >= 0 ? box.min[1] : n[1];
            n[2] = plane.normal[2] >= 0 ? box.min[2] : n[2];

            //point nearest to the plane is outside
            if(plane.distanceToPoint(p) < 0) {
                return FRUSTUM_INTERSECT.OUTSIDE;
            }

            //p inside but n outside
            if( plane.distanceToPoint(n) < 0) {
                result = FRUSTUM_INTERSECT.INTERSECTING;
            }
        }
        return result;
    }

    /**
     * http://cgvr.cs.uni-bremen.de/teaching/cg_literatur/lighthouse3d_view_frustum_culling/index.html
     * @param cam
     * @param lookAt
     */
    static createFromCameraDefinition(
        cam:{ fovy: number, aspect: number, near: number, far: number},
        lookAt: {position: vec3, target:vec3 , up:vec3}): Frustum
    {
        const nh = cam.near * cam.fovy;
        const nw = nh * cam.aspect;
        const fh = cam.far * cam.fovy;
        const fw = fh * cam.fovy;

        //z axis of the camera opposite direction of the looking direction (points towards the near and far plane)
        const z = vec3.subtract(vec3.create(), lookAt.position, lookAt.target);
        vec3.normalize(z,z);
        // x axis
        const x = vec3.cross(vec3.create(), lookAt.up, z);
        vec3.normalize(x,x);
        //y axis (real up vector)
        const y = vec3.cross(vec3.create(), z, x);
        vec3.normalize(y,y);

        //center of the near and far planes
        const nc = vec3.subtract(vec3.create(), lookAt.position, vec3.scale(vec3.create(), z, cam.near));
        const fc = vec3.subtract(vec3.create(), lookAt.position, vec3.scale(vec3.create(), z, cam.far));

        //4 corners of the frustum of the near plane (ntl = near top left etc.)
        const ynh = vec3.scale(vec3.create(), y, nh);
        const xnw = vec3.scale(vec3.create(), x, nw);
        const ntl = vec3.sub(vec3.create(), vec3.add(vec3.create(), nc, ynh), xnw);
        const ntr = vec3.add(vec3.create(), vec3.add(vec3.create(), nc, ynh), xnw);
        const nbl = vec3.sub(vec3.create(), vec3.sub(vec3.create(), nc, ynh), xnw);
        const nbr = vec3.add(vec3.create(), vec3.sub(vec3.create(), nc, ynh), xnw);

        //4 corners of the frustum far plane
        const yfh = vec3.scale(vec3.create(), y, fh);
        const xfw = vec3.scale(vec3.create(), x, fw);
        const ftl = vec3.sub(vec3.create(), vec3.add(vec3.create(), fc, yfh), xfw);
        const ftr = vec3.add(vec3.create(), vec3.add(vec3.create(), fc, yfh), xfw);
        const fbl = vec3.sub(vec3.create(), vec3.sub(vec3.create(), fc, yfh), xfw);
        const fbr = vec3.add(vec3.create(), vec3.sub(vec3.create(), fc, yfh), xfw);

        //six planes from the corner points
        const frustum = new Frustum();
        //top
        frustum.planes[0] = Plane.fromPoints(ntl, ntr, ftl);
        //bottom
        frustum.planes[1] = Plane.fromPoints(nbr, nbl, fbr);
        //left
        frustum.planes[2] = Plane.fromPoints(nbl, ntl, fbl);
        //right
        frustum.planes[3] = Plane.fromPoints(nbr, ntr, fbr);
        //near
        frustum.planes[4] = Plane.fromPoints(ntr, ntl, nbr);
        //far
        frustum.planes[5] = Plane.fromPoints(ftl, ftr, fbl);

        return frustum;
    }

    /**
     * TODO: is this right?
     * create frustum from orthogonal matrix
     * where the normals point inside
     * @param mat
     * @param flip - flip the planes of the frustum, so the normals point outside
     */
    static createFromMat4(mat: mat4, flip?: boolean): Frustum {
        const frustum = new Frustum();
        //left clipping plane
        for(let i=0; i < 3; i++) frustum.planes[0].normal[i] = mat[12 +  i] + mat[i];
        frustum.planes[0].distance = mat[15] + mat[3];
        //right clipping plane
        for(let i=0; i < 3; i++) frustum.planes[1].normal[i] = mat[12 +  i] - mat[i];
        frustum.planes[1].distance = mat[15] - mat[3];
        //top clipping plane
        for(let i=0; i < 3; i++) frustum.planes[2].normal[i] = mat[12 +  i] - mat[4+i];
        frustum.planes[2].distance = mat[15] - mat[7];
        //bottom clipping lane
        for(let i=0; i < 3; i++) frustum.planes[3].normal[i] = mat[12 +  i] + mat[4+i];
        frustum.planes[3].distance = mat[15] + mat[7];
        //near clipping plane
        for(let i=0; i < 3; i++) frustum.planes[4].normal[i] = mat[12 +  i] + mat[8+i];
        frustum.planes[4].distance = mat[15] + mat[11];
        //far clipping plane
        for(let i=0; i < 3; i++) frustum.planes[5].normal[i] = mat[12 +  i] - mat[8+i];
        frustum.planes[5].distance = mat[15] - mat[11];

        if(flip) {
            return frustum.flip().normalize();
        }
        return frustum.normalize();
    }
}