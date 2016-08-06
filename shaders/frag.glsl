precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 uTextureTiling;

//precision mediump float;
//precision mediump int;
//
//uniform vec3 u_lightColor;
//uniform vec3 u_lightDir;
//uniform vec3 u_lightPos;
//uniform vec3 u_viewPos;
//uniform vec3 u_diffuseColor;
//uniform float u_roughness;
//uniform float u_fresnel;
//uniform float u_alpha;
//uniform vec3 u_ambientColor;
//uniform samplerCube u_tCube;
//uniform float u_time;
//varying vec4 vPosition;
//varying vec3 vViewPosition;
//varying vec4 vNormal;
//varying vec3 vViewNormal;
//varying vec2 vUv;
//
//#define M_PI 3.1415926535897932384626433832795
//
//float dotClamped(vec3 a, vec3 b) {
//    return max(dot(a,b), 0.0);
//}
//
//float F(float f0, vec3 l, vec3 h) {
//    float LoH = dot(l,h);
//    float powTerm = (-5.55473 * LoH - 6.98316) * LoH;
//    return f0 + (1.0 - f0) * pow(2.0, powTerm);
//}
//
//float N(float a, vec3 n, vec3 h, float NoH) {
//    float a2 = a*a;
//    return a2 / (4.0 * pow(pow(NoH, 2.0) * (a2 - 1.0) + 1.0, 2.0));
//}
//
//float G(float a, vec3 l, vec3 v, vec3 h, vec3 n, float NoL, float NoV) {
//    float VdotH = max(dot(v,h), 0.0);
//    float NdotH = max(dot(n,h), 0.0);
//    float minV = 2.0 * NdotH * min(NoV, NoL) / VdotH;
//    return min(1.0, minV);
//}

void main(void) {
    vec2 texCoord = vTextureCoord * uTextureTiling;
    vec4 albedo = texture2D(uSampler, texCoord);
    gl_FragColor = albedo;
}

//param, normal dist, shadowing, main