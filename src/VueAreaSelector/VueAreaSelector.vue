<template>
  <div class="vue-area-selector">
    <div class="area_box"
         ref="areaBox"
         @mouseenter="mouseenter"
         @mouseleave="mouseleave"
         @mousedown="mousedown"
         @mousemove="mousemove"
         @mouseup="mouseup">
      <i class="vue-area-selector-icon icon-you"
         v-show="showIcon"
         :style="{fontSize:(iconSize||24)+'px',
                 color:color||'white',
                 transform:`rotateZ(${angle+180}deg)`}"></i>
    </div>

    <div class="area_selected"
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
    props: ['color', 'iconSize', 'showIcon','moveRange'],
    data() {
      return {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        isHold: false,  //鼠标是否按住
        isIn: false,  //鼠标是否在区域内
        areaBox: {
          width: 0,
          height: 0,
          centerX: 0,
          centerY: 0
        }
      }
    },
    computed: {
        actionType(){
          let type='';
          let moveRange=this.moveRange||10;
          if(this.area.distanceX<10||this.area.distanceY<10){
              type='click';
          }else{
              type='select';
          }
          return type;
        },
      area() {  //选中区域的属性
        return {
          centerX: Math.abs(this.startX + this.endX) / 2,
          centerY: Math.abs(this.startY + this.endY) / 2,
          startX: Math.min(this.startX, this.endX),
          startY: Math.min(this.startY, this.endY),
          distanceX: Math.abs(this.startX - this.endX),
          distanceY: Math.abs(this.startY - this.endY),
        }
      },
      angle(){
        let point1 = {
          x: this.area.centerX,
          y: this.area.centerY
        }
        let point2 = {
          x: this.areaBox.centerX,
          y: this.areaBox.centerY,
        }
        return $leaf.angleCalculate(point1, point2)
      },
      isAreaResize() {
        return this.isHold && this.isIn;
      }
    },
    mounted(){
      this.setAreaBox();
      window.addEventListener('resize', this.setAreaBox);
    },
    beforeDestroy(){
      window.removeEventListener('resize', this.setAreaBox);
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
        this.$emit('change', {
          area: Object.assign(this.area),
          areaBox: Object.assign(this.areaBox),
          angle: Object.assign(this.angle),
          actionType:this.actionType
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
        this.$set(this.areaBox, 'width', this.$refs.areaBox.offsetWidth);
        this.$set(this.areaBox, 'height', this.$refs.areaBox.offsetHeight);
        this.$set(this.areaBox, 'centerX', this.$refs.areaBox.offsetWidth / 2);
        this.$set(this.areaBox, 'centerY', this.$refs.areaBox.offsetHeight / 2);
      },
      clearArea(){
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
      }
    }
  }
</script>

<style scoped lang="scss">
  @keyframes fadeToggle {
    0% {
      opacity: 0
    }
    50% {
      opacity: 1
    }
    100% {
      opacity: 0
    }
  }

  .icon-you {
    animation: fadeToggle 1s infinite;
  }

  .vue-area-selector {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .area_box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .area_selected {
    position: absolute;
    z-index: -1;
    /*border: 1px dashed #2e2e2e;*/
    opacity: 0.3;
  }

</style>
