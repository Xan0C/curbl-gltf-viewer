#version 300 es
//Vertex Attributes
layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec3 a_Normal;
layout(location = 2) in vec4 a_Tangent;
layout(location = 3) in vec2 a_UV;
#ifdef HAS_SKIN
layout(location = 4) in vec4 a_Joint0;
layout(location = 5) in vec4 a_Weight0;
#ifdef SKIN_VEC8
layout(location = 6) in vec4 a_Joint1;
layout(location = 7) in vec4 a_Weight1;
#endif
#endif

//UBO for Camera
layout (std140) uniform Matrices
{
    mat4 projectionMatrix;
    mat4 viewMatrix;
    vec3 viewPos;
} Camera;

//UBO for JointMatrices
#ifdef HAS_SKIN
layout (std140) uniform JointMatrix
{
    mat4 matrix[65];
} u_JointMatrix;
#endif

//Mesh
uniform mat4 u_ModelMatrix;

//out
out vec3 v_Normal;
out vec3 v_Position;
out vec3 v_ViewPos;
out vec2 v_UV;
out mat3 v_TBN;

void main(){
    #ifdef HAS_SKIN
        mat4 skinMatrix =
            a_Weight0.x * u_JointMatrix.matrix[int(a_Joint0.x)] +
            a_Weight0.y * u_JointMatrix.matrix[int(a_Joint0.y)] +
            a_Weight0.z * u_JointMatrix.matrix[int(a_Joint0.z)] +
            a_Weight0.w * u_JointMatrix.matrix[int(a_Joint0.w)];
    #ifdef SKIN_VEC8
        skinMatrix +=
            a_Weight1.x * u_JointMatrix.matrix[int(a_Joint1.x)] +
            a_Weight1.y * u_JointMatrix.matrix[int(a_Joint1.y)] +
            a_Weight1.z * u_JointMatrix.matrix[int(a_Joint1.z)] +
            a_Weight1.w * u_JointMatrix.matrix[int(a_Joint1.w)];
    #endif
    #else
        mat4 skinMatrix = mat4(1.0);
    #endif

    #ifdef HAS_NORMALS
    #ifdef HAS_TANGENTS
    mat3 normalMatrix = transpose(inverse(mat3(u_ModelMatrix)));
    vec3 N = normalize(normalMatrix * a_Normal);
    vec3 T = normalize(vec3(u_ModelMatrix * vec4(a_Tangent.xyz, 0.0)));
    vec3 B = cross(N, T) * a_Tangent.w;
    v_TBN = mat3(T,B,N);
    #else // HAS_TANGENTS != 1
    v_Normal = normalize(vec3(u_ModelMatrix * transpose(inverse(skinMatrix)) * vec4(a_Normal.xyz, 0.0)));
    #endif
    #endif

    #ifdef HAS_UV
    v_UV = a_UV;
    #else
    v_UV = vec2(0.,0.);
    #endif

    v_Position = vec3(u_ModelMatrix * skinMatrix * vec4(a_Position,1.0));
    v_ViewPos = Camera.viewPos;

    gl_Position = Camera.projectionMatrix * Camera.viewMatrix * u_ModelMatrix * skinMatrix * vec4(a_Position,1.0);
}