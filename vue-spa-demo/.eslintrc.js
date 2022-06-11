module.exports = {
  // 继承Eslint规则
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'], // 'plugin:vue/vue3-essential',
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6, // 指定为es6语法  这样就可以使用const这种关键字了
    sourceType: 'module', // es module
  },
  rules: {
    'no-var': 2, // 禁止使用var变量,使用了就报错 0：off; 1: warn; 2: error;
    'no-unused-vars': 0, // 允许声明变量但是不使用
  },
  // parser: '@babel-eslint-parser', // 直接用vue的eslint-plugin-vue的extends
}
