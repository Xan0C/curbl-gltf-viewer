function glGetStates(gl:WebGL2RenderingContext):{[x:string]:number}{
    return {
        "BLEND":gl.BLEND,
        "DEPTH_TEST":gl.DEPTH_TEST,
        "DITHER":gl.DITHER,
        "SCISSOR_TEST":gl.SCISSOR_TEST,
        "STENCIL_TEST":gl.STENCIL_TEST,
        "TEXTURE_2D":gl.TEXTURE_2D,
        "TEXTURE_3D":gl.TEXTURE_3D,
        "TEXTURE_CUBE_MAP":gl.TEXTURE_CUBE_MAP
    };
}

export function glGetCurrentState(gl:WebGL2RenderingContext):string{
    let states = glGetStates(gl);
    let str = "";
    for(let key in states){
        if(gl.isEnabled(states[key])){
            str += key+" is enabled!\n";
        }else{
            str += key+" is disabled!\n";
        }
    }
    return str;
}

export function glResetState(gl:WebGL2RenderingContext):void{
    let states = glGetStates(gl);
    for(let key in states){
        gl.disable(states[key]);
    }
    gl.enable(gl.DITHER);
}