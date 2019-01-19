<template>
  <div class="vue-area-selector">
    <div class="area_box"
         ref="areaBox"
         @mouseenter="mouseenter"
         @mouseleave="mouseleave"
         @mousedown="mousedown"
         @mousemove="mousemove"
         @mouseup="mouseup"></div>
    <div class="area"
         :style="{left:area.startX+'px',
                  top:area.startY+'px',
                  width:area.distanceX+'px',
                  height:area.distanceY+'px',
                  backgroundColor:color||'#efefef'}">

    </div>
  </div>
</template>

<script>
  import $leaf from './leaf'

  export default {
    name: "vue-area-selector",
    props:['color'],
    data() {
      return {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        isHold: false,  //鼠标是否按住
        isIn: false,  //鼠标是否在区域内
        areaBox:{
          width:0,
          height:0,
        }
      }
    },
    computed: {
      area() {  //选中区域的属性
        return {
          startX: Math.min(this.startX, this.endX),
          startY: Math.min(this.startY, this.endY),
          distanceX: Math.abs(this.startX - this.endX),
          distanceY: Math.abs(this.startY - this.endY),
        }
      },
      isAreaResize() {
        return this.isHold && this.isIn;
      }
    },
    mounted(){
      this.setAreaBox();
      window.addEventListener('resize',this.setAreaBox);
    },
    beforeDestroy(){
      window.removeEventListener('resize',this.setAreaBox);
    },
    methods: {
      mousedown(event) {
        let point = $leaf.getPoint(event);  //获取该点坐标
        // console.log('point',point.x,point.y);
        this.startX = point.x;
        this.startY = point.y;
        this.endX = point.x;  //为了第二次点击的时候能够清除上次end位置
        this.endY = point.y;  //为了第二次点击的时候能够清除上次end位置
        this.isHold = true;
        this.isIn = true;
      },
      mousemove(event) {
        if (!this.isHold) return;  //如果鼠标没有按住则退出
        let point = $leaf.getPoint(event);  //获取该点坐标
        // console.log('x,y',point.x,point.y);
        this.endX = point.x;
        this.endY = point.y;
        this.isIn = true;
      },
      mouseup(up) {
        let point = $leaf.getPoint(event);  //获取该点坐标
        this.isHold = false;
        this.isIn = true;
        this.$emit('change',{
          area:Object.assign(this.area),
          areaBox:Object.assign(this.areaBox)
        })
      },
      mouseleave() {
        this.isIn = false;
      },
      mouseenter() {
        this.isIn = true;
      },
      setAreaBox(){
        // console.log(this.$refs.areaBox.offsetWidth);
        this.$set(this.areaBox,'width',this.$refs.areaBox.offsetWidth);
        this.$set(this.areaBox,'height',this.$refs.areaBox.offsetHeight);
      }
    }
  }
</script>

<style scoped lang="scss">
  .vue-area-selector {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .area_box{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .area {
    position: absolute;
    z-index: -1;
    /*border: 1px dashed #2e2e2e;*/
    opacity: 0.3;
  }
</style>
