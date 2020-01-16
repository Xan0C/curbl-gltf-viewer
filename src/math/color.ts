export class Color {
    private _elements: Float32Array;

    constructor(r = 0, g = 0, b = 0, a = 1) {
        this._elements = new Float32Array([r, g, b, a]);
    }
    public get r(): number {
        return this._elements[0];
    }
    public set r(r: number) {
        this._elements[0] = r;
    }
    public get g(): number {
        return this._elements[1];
    }
    public set g(g: number) {
        this._elements[1] = g;
    }
    public get b(): number {
        return this._elements[2];
    }
    public set b(b: number) {
        this._elements[2] = b;
    }
    public get a(): number {
        return this._elements[3];
    }
    public set(a: number) {
        this._elements[3] = a;
    }
    public mult(f: number | Color): Color {
        if (typeof f === 'number') {
            return new Color(this.r * f, this.g * f, this.b * f, Math.abs(Math.min(this.a * f, 1)));
        } else {
            return new Color(this.r * f.r, this.g * f.g, this.b * f.b, Math.abs(Math.min(this.a * f.a, 1)));
        }
    }
    public div(f: number | Color): Color {
        if (typeof f === 'number') {
            return this.mult(1 / f);
        }
        const color = new Color(1 / f.r, 1 / f.g, 1 / f.b, Math.min(1 / f.a, 1));
        return this.mult(color);
    }
    public plus(other: Color): Color {
        return new Color(this.r + other.r, this.g + other.g, this.b + other.b, Math.abs(Math.min(this.a + other.a, 1)));
    }
    public minus(other: Color): Color {
        return new Color(this.r - other.r, this.g - other.g, this.b - other.b, Math.abs(Math.min(this.a - other.a, 1)));
    }

    public get elements(): Float32Array {
        return this._elements;
    }

    public set elements(value: Float32Array) {
        this._elements = value;
    }

    public toString(): string {
        return '{Color: [R: ' + this.r + ' G: ' + this.g + ' B: ' + this.b + ' A: ' + this.a + ']}';
    }
}
