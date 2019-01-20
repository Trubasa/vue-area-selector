# 使用说明

### 在html里直接引用

> 可参考example/index.html

- 引入js

  ```html
  <script src="../dist/vue-area-selector.js"></script>
  ```
  或：
  ```javascript
   import VueAreaSelector from './vue-area-selector.js'
   Vue.use(VueAreaSelector)
  ```
- 组件标签
  ```html
    <vue-area-selector color="#efefef"
                       :show-icon="true"
                       @change="areaChange"></vue-area-selector>
  ```
  
- 参数
  - **color**，选中框的和图标的颜色
  - **show-icon** ，是否显示图标
- 事件
  - **change**，点击或者选框之后触发
- 方法
  - **clearArea**，清除选框


