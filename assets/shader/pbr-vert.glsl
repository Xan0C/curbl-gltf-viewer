#version 300 es
//Vertex Attributes
layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;
layout(location = 2) in vec4 a_Tangent;
layout(location = 3) in vec2 a_Texcoord;

//UBO for Camera
layout (std140) uniform Matrices
{
    mat4 projectionMatrix;
    mat4 viewMatrix;
    vec3 viewPos;
} Camera;

//Model
uniform mat4 u_ModelMatrix;

//out
out vec3 v_Normal;
out vec3 v_Position;
out vec3 v_ViewPos;
out vec2 v_UV;
out mat3 v_TBN;

//Davon ausgehend das erstmal alles da ist
void main(){
    v_Position = vec3(u_ModelMatrix * vec4(a_Position,1.0));
    v_TBN = mat3(1.0);

    v_Normal = normalize(vec3(u_ModelMatrix * vec4(a_Normal.xyz, 0.0)));

    mat3 normalMatrix = transpose(inverse(mat3(u_ModelMatrix)));
    vec3 N = normalize(normalMatrix * a_Normal);
    vec3 T = normalize(vec3(u_ModelMatrix * vec4(a_Tangent.xyz, 0.0)));
    vec3 B = cross(N, T) * a_Tangent.w;
    v_TBN = mat3(T,B,N);

    v_UV = a_Texcoord;
    v_ViewPos = Camera.viewPos;

    gl_Position = Camera.projectionMatrix * Camera.viewMatrix * u_ModelMatrix * vec4(a_Position,1.0);
}