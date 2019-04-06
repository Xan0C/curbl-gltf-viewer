#version 300 es
#ifdef GL_ES
    precision mediump float;
#endif

out vec4 fragmentColor;

uniform vec3 u_Color;

void main(){
    fragmentColor = vec4(u_Color, 1.0);
}