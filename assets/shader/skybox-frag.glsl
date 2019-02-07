#version 300 es
#ifdef GL_ES
    precision mediump float;
#endif

in vec3 v_Texcoord;
uniform samplerCube u_Skybox;

out vec4 fragmentColor;

void main(){
    fragmentColor = texture(u_Skybox,v_Texcoord);
}