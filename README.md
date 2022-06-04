# @doublewin/glsl-stringify-loader
用于转化glsl文件的wepback-loader

## Install
使用之前，要先安装`glsl-stringify-loader`:
```console
npm install @doublewin/glsl-stringify-loader --save-dev
```

or

```console
yarn add @doublewin/glsl-stringify-loader -D
```

## Use
然后配置webpack.config.js文件。例如：

**shader.glsl**  
```c++
precision mediump float;

void main () {
  gl_FragColor = vec4(1, 0, 0, 1);
}
```
**file.js**  
```js
import fsShader from './shader.glsl';
```
**webpack.config.js**  
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.glsl$/,
                exclude: [/node_modules/],
                use: ['@doublewin/glsl-stringify-loader'],
            },
        ],
    },
};
```

### 支持引用
在glsl文件中支持使用
```js
#require 'path/example.glsl'
```
引用语句引用别的glsl文件

例如：
**fs.glsl**
```c++
precision mediump float;

#require "./fs-utils.glsl"

void main () {
    gl_FragColor = vec4(1, 0, 0, 1);
}
```

**fs-utils.glsl**
```c++
float myFunction(vec3 normal) {
    vec3 hello = vec3(1, 0, 0)
    return dot(hello, normal);
}
```