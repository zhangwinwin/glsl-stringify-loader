precision mediump float;

#pragma glslify: myFunction = require(./shader-export)

void main () {
  gl_FragColor = vec4(1, 0, 0, 1);
}
