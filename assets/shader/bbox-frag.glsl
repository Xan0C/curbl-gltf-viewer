#version 300 es
#ifdef GL_ES
    precision mediump float;
#endif

out vec4 fragmentColor;

void main(){
    fragmentColor = vec4(1.0, 0.0, 0.0, 1.0);
}