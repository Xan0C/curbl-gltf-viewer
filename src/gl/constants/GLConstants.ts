/**
 * Created by Soeren on 31.10.2017.
 */

export enum GL_TYPES {
    BYTE = 0x1400, //5120
    UNSIGNED_BYTE = 0x1401, //5121
    SHORT = 0x1402, //5122
    UNSIGNED_SHORT = 0x1403, //5123
    INT = 0x1404, //5124
    UNSIGNED_INT = 0x1405, //5125
    FLOAT = 0x1406 //5126
}

export const GL_TYPES_BYTESIZE = {
    0x1400: 1,
    0x1401: 1,
    0x1402: 2,
    0x1403: 2,
    0x1404: 4,
    0x1405: 4,
    0x1406: 4
};

export enum GL_PRIMITIVES {
    POSITION = "POSITION",
    NORMAL = "NORMAL",
    TANGENT = "TANGENT",
    TEXCOORD_0 = "TEXCOORD_0",
    TEXCOORD_1 = "TEXCOORD_1",
    COLOR_0 = "COLOR_0",
    JOINTS_0 = "JOINTS_0",
    WEIGHTS_0 = "WEIGHTS_0",
    JOINTS_1 = "JOINTS_1",
    WEIGHTS_1 = "WEIGHTS_1"
}

export enum GL_BUFFERS {
    STATIC_DRAW = 0x88E4,
    STREAM_DRAW = 0x88E0,
    DYNAMIC_DRAW = 0x88E8,
    ARRAY_BUFFER = 0x8892,
    ELEMENT_ARRAY_BUFFER = 0x8893
}

export enum MAG_FILTER {
    NEAREST = 9728,
    LINEAR = 9729
}

export enum MIN_FILTER {
    NEAREST = 9728,
    LINEAR = 9729,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987
}

export enum TEXTURE_WRAP {
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    REPEAT = 10497
}

export enum GL_INTERNALFORMAT {
    RGB = 6407,
    RGBA = 6408,
    R8 = 33321,
    R16F = 33325,
    R32F = 33326,
    R8UI = 33330,
    RG8 = 33323,
    RG16F = 33327,
    RG = 33319,
    RG32F = 33328,
    RGB8 = 32849,
    SRGB = 35904,
    SRGB8 = 35905,
    SRGB8_ALPHA8 = 35907,
    RGB565 = 36194,
    R11F_G11F_B10F = 35898,
    RGB9_E5 = 35901,
    RGB16F = 34843,
    RGB32F = 34837,
    RGB8UI = 36221,
    RGBA8 = 32856,
    RGB5_A1 = 32855,
    RGBA16F = 34842,
    RGBA32F = 34836,
    RGBA8UI = 36220
}