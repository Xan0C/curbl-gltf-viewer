export class Base64Binary {
    private static readonly _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    static decodeArrayBuffer(input: string): ArrayBuffer {
        const bytes = (input.length / 4) * 3;
        const ab = new ArrayBuffer(bytes);
        Base64Binary.decode(input, null, ab);

        return ab;
    }

    private static removePaddingChars(input: string) {
        const lkey = Base64Binary._keyStr.indexOf(input.charAt(input.length - 1));
        if (lkey === 64) {
            return input.substring(0, input.length - 1);
        }
        return input;
    }

    static decode(input: string, byteLength?: number, arrayBuffer?: ArrayBuffer): Uint8Array {
        //get last chars to see if are valid
        input = Base64Binary.removePaddingChars(input);
        //@ts-ignore
        const bytes = parseInt((input.length / 4) * 3, 10);
        const offset = byteLength !== undefined ? bytes - byteLength : 0;

        const uarray: Uint8Array = arrayBuffer ? new Uint8Array(arrayBuffer) : new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

        for (let i = 0, j = 0; i < bytes; i += 3) {
            const enc1 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc2 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc3 = Base64Binary._keyStr.indexOf(input.charAt(j++));
            const enc4 = Base64Binary._keyStr.indexOf(input.charAt(j++));

            const chr1 = (enc1 << 2) | (enc2 >> 4);
            const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            const chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i + 1] = chr2;
            if (enc4 != 64) uarray[i + 2] = chr3;
        }

        return uarray.slice(offset, bytes);
    }
}
