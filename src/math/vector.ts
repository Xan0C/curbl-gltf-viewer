/**
 * Created by Soeren on 26.11.2016.
 */
export class Vector {
    private _elements:Float32Array;

    constructor(x:number=0,y:number=0,z:number=0){
        this._elements = new Float32Array([x,y,z]);
    }

    public set(x:number,y:number,z:number){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public get x():number{
        return this._elements[0];
    }
    public set x(x:number){
        this._elements[0] = x;
    }
    public get y():number{
        return this._elements[1];
    }
    public set y(y:number){
        this._elements[1] = y;
    }
    public get z():number{
        return this._elements[2];
    }
    public set z(z:number){
        this._elements[2] = z;
    }
    public dot(other:Vector):number{
        return (this.x*other.x+this.y*other.y+this.z*other.z);
    }
    public cross(other:Vector):Vector{
        let x = this.y*other.z - this.z*other.y;
        let y = this.z*other.x - this.x*other.z;
        let z = this.x*other.y - this.y*other.x;
        return new Vector(x,y,z);
    }
    public lengthSquared():number{
        return (this.x*this.x+this.y*this.y+this.z*this.z);
    }
    public length():number{
        return Math.sqrt(this.lengthSquared());
    }
    public normalize():Vector{
        let length = this.length();
        this.x = this.x/length;
        this.y = this.y/length;
        this.z = this.z/length;
        return this;
    }
    public mult(f:number):Vector{
        return new Vector(this.x*f,this.y*f,this.z*f);
    }
    public div(f:number):Vector{
        return this.mult(1/f);
    }
    public add(other:Vector):Vector{
        return new Vector(this.x+other.x,this.y+other.y,this.z+other.z);
    }
    public substract(other:Vector):Vector{
        return new Vector(this.x-other.x,this.y-other.y,this.z-other.z);
    }

    /**
     * Calculates the reflection Vector
     * Using this Vector as "Aufpunktvektor"
     * and the normal of the surface to reflect from
     * @param normal
     * @returns {Vector}
     */
    public reflection(normal:Vector):Vector{
        let self = new Vector(this.x,this.y,this.z);
        let n = new Vector(normal.x,normal.y,normal.z);
        self = self.normalize();
        n = n.normalize();
        let reflect = self.substract(n).mult(2*self.dot(n));
        reflect = reflect.normalize();
        return reflect;
    }

    /**********************************************************************************************************************************
     *TriangleIntersection - Prueft ob ein Strahl vom Vektor *this aus im Dreieck a,b,c liegt                                          *
     * Vector a,b,c spannen das Dreieck auf                                                                                            *
     * *this ist der Ursprung des Strahles                                                                                             *
     * s der skalierungsfaktor                                                                                                         *
     * Vector d die richtung des Strahles                                                                                              *
     * Vector p der Schnittpunkt mit der Ebene in der das Dreieck liegt                                                                *
     * A. Schnittpunkt mit Ebene in der das Dreieck liegt bestimmen                                                                    *
     ***********************************************************************************************************************************
     * 1. Ein Punkt des Dreiecks als Stützvektor der Ebene(hier: a)                                                                    *
     * 2. Vektoren berechnen die die Ebene aufspannen in der das Dreieck liegt, also b-a, c-a                                          *
     * 3. Normale der Ebene berechnen bMinusA.cross(c-a)                                                                               *
     * 4. normale auf länge 1 bringen(normalisieren)                                                                                   *
     * 5. Wenn die länge der normale 0 ist handelt es sich nicht um eine Ebene/Dreieck                                                 *
     * 6. Distanz zur Ebene feststellen(Skalarprodukt der Normale mit beliebigem Punkt der Ebene                                       *
     *    (also X,Y,Z) liefert Koordinatengleichung der form n1x+n2y+n3z = normal.dot(a), wobei letzteres die Distanz d beschreibt)    *
     * 7. Skalierungsfaktor s für Strahlgleichung(p = *this+sd) bestimmen                                                              *
     *    Strahlgleichung in Ebenengleichung einsetzen                                                                                 *
     *    Ebenengleichung: f(p) = n*p-d = 0 Strahlgleichung: p = *this +sd;                                                            *
     *    => 0 = n*p-d => n*(*this+sd)-d=0 => (n*(*this))+(n*sd)-d=0 => d-(n*(*this)) = s(n*d) => s = (d-n*(*this))/(n*d)              *
     * 8. Durch s erhalten wir den Schnittpunkt p mit der Ebene p=*this+sd                                                             *
     ***********************************************************************************************************************************
     * B. Prüfen ob Schnittpunkt p im Dreieck ABC liegt                                                                                *
     ***********************************************************************************************************************************
     * 1. Fläche vom Dreick abc bestimmen                                                                                              *
     * 2. Vergleichen ob die fläche der Dreiecke der Eckpunkte mit Schnittpunkt der Ebene summiert                                     *
     *    kleiner oder gleich der Fläche vom Dreieck abc ist(mit Fehlertoleranz epsilon von -0.0001f)                                  *
     *    @return {Number} distance to the intersection point default {-1} if their is no intersection
     ***********************************************************************************************************************************/
    public triangleIntersection(d:Vector,a:Vector,b:Vector,c:Vector):number{
        let eps = -0.0001;
        let bMinusA = b.substract(a);
        let cMinusA = c.substract(a);
        let normal = bMinusA.cross(cMinusA).normalize();
        if(normal.length() === 0){
            return -1;
        }
        let distance = normal.dot(a);
        let s = (distance - normal.dot(this))/normal.dot(d);
        let p = this.add(d.mult(s));
        let triangleAreaSum = Vector.triangleArea(a,b,p)+Vector.triangleArea(a,c,p)+Vector.triangleArea(b,c,p);
        let diff = Vector.triangleArea(a,b,c)-triangleAreaSum;
        if(diff >= eps && s>=0){
            return s;
        }
        return -1;
    }

    public static triangleArea(a:Vector,b:Vector,c:Vector){
        let bMinusA = b.substract(a);
        let cMinusA = c.substract(a);
        return bMinusA.cross(cMinusA).length()/2;
    }

    public get elements():Float32Array {
        return this._elements;
    }

    public set elements(value:Float32Array) {
        this._elements = value;
    }

    public toString():string{
        return "{Vector: [X: "+this.x+" Y: "+this.y+" Z: "+this.z+"]}";
    }
}