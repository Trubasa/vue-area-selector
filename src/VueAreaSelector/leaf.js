let methods={
  getPoint(event){
    // console.log('event',event);
    return {
      x:event.offsetX,
      y:event.offsetY
    }
  }
}

export default methods;
