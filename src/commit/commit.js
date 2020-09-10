export default{
  // 封装图片限制
  ImageRestrictions (width,height,type) {
    if (type === 1 && width/height === 34.5/14) {
      return true
    }
    if (type === 2 && width/height === 34.5/18.6) {
      return true
    }
    if (type === 3 && width/height === 34.5/15) {
      return true
    }
    return false
  }
}
