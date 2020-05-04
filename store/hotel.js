function state() {
  return {
    // 获取当前城市
    locationCity: "",
    // 城市列表
    scenics: [],
    // 酒店信息列表
    hotelList: {},
    // 酒店的筛选条件
    filter: {},
    // 酒店定位经纬度
    location: [],
    // 控制地图显示（防止重复显示弹窗）
    IsshowMap: false
  }
}
// 同步修改state中的数据
const mutations = {
  //    修改城市的方法
  setCity(state, data) {
    state.locationCity = data;
  },
  //   修改酒店信息列表
  setHotelList(state, data) {
    state.hotelList = data;
  },
  setFilter(state, data) {
    state.filter = data;
  },
  // 添加定位坐标
  setLocation(state, data) {
    state.location = data;
  },
  // 修改是否显示地图
  setIsshowMap(state, data) {
    state.IsshowMap = data;
  },
  // 修改城市列表
  setScenics(state, data) {
    state.scenics = data;
  }
}

export default {
  state,
  mutations
}