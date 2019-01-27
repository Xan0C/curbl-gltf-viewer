import {GLTexture} from "../gl";
import {GLCubemap} from "../gl/GLCubemap";

/**
 * Creates 1x1 px black textures(addition neutral)
 */
export function createBlackTexture(gl:WebGL2RenderingContext):GLTexture{
    const texture = GLTexture.fromData(gl,new Uint8Array([0, 0, 0, 0]) as any,1,1,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE);
    texture.enableNearestScaling();
    texture.enableWrapClamp();
    return texture;
}

/**
 * Create a black[0,0,0,0] cubemap texture
 * @returns {GLCubemap}
 */
export function createBlackCubemap(gl:WebGL2RenderingContext):GLCubemap{
    const texture = GLCubemap.cubemapFromData(
        gl,
        [
            new Uint8Array([0, 0, 0, 0]),
            new Uint8Array([0, 0, 0, 0]),
            new Uint8Array([0, 0, 0, 0]),
            new Uint8Array([0, 0, 0, 0]),
            new Uint8Array([0, 0, 0, 0]),
            new Uint8Array([0, 0, 0, 0]),
        ] as any,
        1,
        1
    );
    texture.enableWrapClamp();
    texture.enableLinearScaling();
    return texture;
}

/**
 * Create a white[1,1,1,1] cubemap texture
 * @returns {GLCubemap}
 */
export function createWhiteCubemap(gl:WebGL2RenderingContext):GLCubemap{
    const texture = GLCubemap.cubemapFromData(
        gl,
        [
            new Uint8Array([255, 255, 255, 255]),
            new Uint8Array([255, 255, 255, 255]),
            new Uint8Array([255, 255, 255, 255]),
            new Uint8Array([255, 255, 255, 255]),
            new Uint8Array([255, 255, 255, 255]),
            new Uint8Array([255, 255, 255, 255]),
        ] as any,
        1,
        1
    );
    texture.enableWrapClamp();
    texture.enableLinearScaling();
    return texture;
}

/**
 * Creates a 1x1 px white texture(multiplication neutral)
 */
export function createWhiteTexture(gl:WebGL2RenderingContext):GLTexture{
    const texture = GLTexture.fromData(gl,new Uint8Array([255, 255, 255, 255]) as any,1,1,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE);
    texture.enableNearestScaling();
    texture.enableWrapClamp();
    return texture;
}