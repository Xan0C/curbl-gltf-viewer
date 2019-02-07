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

out vec3 v_Texcoord;

void main(){
    v_Texcoord = a_Position;
    mat4 view = mat4(mat3(Camera.viewMatrix));
    vec4 pos = Camera.projectionMatrix * view * vec4(a_Position,1.0);
    gl_Position = pos.xyww;
}