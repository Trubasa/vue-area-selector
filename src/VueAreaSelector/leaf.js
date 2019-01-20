let methods = {
  getPoint(event){
    // console.log('event',event);
    return {
      x: event.offsetX,
      y: event.offsetY
    }
  },
//计算两点的角度
  angleCalculate(point1,point2){
    let angle;
    let Pi=Math.PI;
    /*switch(true){
      case point1.x==point2.x:
          angle=point1.y<point2.y?Pi/2:-Pi/2
        break;
      case point1.y==point2.y:
        angle=point1.x<point2.x?Pi:0
        break;
      default:
        if(point1.x>point2.x)
        break;
    }*/
    //角度逻辑判断
    if(point1&&point2){
      if(point1.x==point2.x){
        if(point1.y!=point2.y){
          angle=point1.y>point2.y?-90:90;
        }
      }else{
        if(point1.y==point2.y){
          angle=point1.x>point2.x?180:0;
        }else{
          if(point2.x-point1.x<0){
            angle=(Math.atan((point2.y-point1.y)/(point2.x-point1.x))*180/Math.PI+180);
          }else{
            angle=Math.atan((point2.y-point1.y)/(point2.x-point1.x))*180/Math.PI;
          }
        }
      }
    }
    return angle;
  }
}

export default methods;
