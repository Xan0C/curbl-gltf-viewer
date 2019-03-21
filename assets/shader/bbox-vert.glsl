#version 300 es
#ifdef GL_ES
    precision mediump float;
#endif

layout(location = 0) in vec3 a_Position;

layout (std140) uniform Matrices
{
    mat4 projectionMatrix;
    mat4 viewMatrix;
    vec3 viewPos;
} Camera;

uniform mat4 u_ModelMatrix;

void main(){
    gl_Position = Camera.projectionMatrix * Camera.viewMatrix * u_ModelMatrix * vec4(a_Position,1.0);
}