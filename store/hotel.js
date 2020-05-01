function state() {
  return {
    // 获取当前城市
    locationCity: "",
    // 酒店信息列表
    hotelList: {},
    // 酒店的筛选条件
    filter: {},
    // 酒店定位经纬度
    location: []
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
  }

}

export default {
  state,
  mutations
}
