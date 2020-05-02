<template>
  <div class="container">
    <!-- 关键字搜索 -->
    <el-row class="search-bar">
      <el-col :span="24">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="querySearch"
          placeholder="请输入城市的名称"
          @select="handleSelect"
          class="el-autocomplete"
          v-model="city"
          :trigger-on-focus="false"
          @blur="handleBlur"
        ></el-autocomplete>
        <!-- 日期选择 -->
        <el-date-picker
          v-model="datatime"
          :picker-options="pickerOptions"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="selectTime"
        ></el-date-picker>

        <!--人数选择  -->
        <el-input
          placeholder="人数未定"
          class="member"
          @focus="handleClick"
          v-model="totalMember"
          readonly="readonly"
        >
          <i slot="suffix" class="el-input__icon el-icon-user"></i>
        </el-input>
        <!-- 卡片区域 -->
        <el-card class="box-card" v-if="showCard">
          <div slot="header" class="clearfix">
            <span>每间</span>
            <el-select
              v-model="child"
              placeholder="请选择"
              size="mini"
              style="float: right; padding: 3px 0;width:120px"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              size="mini"
              v-model="adult"
              placeholder="请选择"
              style="float: right; padding: 3px 0;width:120px;margin-right:10px"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="text item">
            <el-button type="primary" size="mini" style="float:right" @click="selectMember">确定</el-button>
          </div>
        </el-card>

        <el-button type="primary" style="margin-left:10px" @click="searchInfo">查询价格</el-button>
      </el-col>
    </el-row>
    <!-- 筛选区域 -->
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="aside-bar">
          <!-- 城市区域 -->
          <div class="district">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="区域:" name="1">
                <div v-if="scenics.length>0">
                  <a href="#" v-for="(item,index) in scenics" :key="index">{{item.name}}</a>
                </div>
                <div v-else style="color:#999">暂未获取到该城市的信息</div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 均价 -->
          <div class="price">
            <h4 style="font-size:14px;height:50px;line-height:50px">均价：</h4>
            <!-- {{location}} -->
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平综合评估。"
                placement="bottom-start"
              >
                <span>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <em>¥332</em>
                </span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平综合评估。"
                placement="bottom-start"
              >
                <span>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <em>¥522</em>
                </span>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平综合评估。"
                placement="bottom-start"
              >
                <span>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <i class="iconfont icon-cs-hg-1"></i>
                  <em>¥768</em>
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-col>
      <!--右侧地图  -->
      <el-col :span="10">
        <div class="map">
          <script
            type="text/javascript"
            src="https://webapi.amap.com/maps?v=1.4.15&key=ff831391f19ff347e5c4ff2e8490a9ed&plugin=AMap.ToolBar,AMap.CitySearch"
          ></script>
          <script
            type="text/javascript"
            src="https://a.amap.com/jsapi_demos/static/demo-center/data/food_1.4.15.js"
          ></script>
          <div id="container"></div>
        </div>
        <div class="info">
          <p id="info"></p>
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗窗口 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%">
      <span>
        <i class="el-icon-location" style="color:#6ac144;font-size:30px"></i>
        <em>当前定位城市：{{$store.state.hotel.locationCity.city}}</em>
      </span>
      <span slot="footer" class="dialog-foo ter">
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <div v-show="false">{{getlocation}}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    //   将vuex中的数据保存到data中
    getlocation() {}
  },
  mounted() {
    const IsshowMap = !this.$store.state.hotel.IsshowMap;

    if (IsshowMap) {
      // 首次进入获取当前城市列表
      this.$axios({
        url: "/cities",
        params: {
          name: this.locationCity
        }
      }).then(res => {
        const { scenics } = res.data.data[0];
        this.scenics = scenics;
        this.cityId = res.data.data[0].id;
        // 获取酒店列表
        this.searchInfo();
      });

      // this.$store.commit("hotel/setIsshowMap", true);
    }
    setTimeout(() => {
      this.getMap();
    }, 600);
  },
  data() {
    return {
      moment,
      location: [],
      // 折叠
      activeNames: ["1"],
      options1: [],
      options2: [
        { value: 1, label: "1 成人" },
        { value: 2, label: "2 成人" },
        { value: 3, label: "3 成人" },
        { value: 4, label: "4 成人" },
        { value: 5, label: "5 成人" }
      ],
      options3: [
        { value: 0, label: "0 儿童" },
        { value: 1, label: "1 儿童" },
        { value: 2, label: "2 儿童" },
        { value: 3, label: "3 儿童" },
        { value: 4, label: "4 儿童" }
      ],
      //   显示的总人数
      totalMember: "",
      // 选择的时间
      datatime: [],
      // 成人 和 儿童 选项的值
      child: "0 儿童",
      adult: "1 成人",
      list: [],
      loading: false,
      states: [],
      //   卡片是否显示
      showCard: false,
      locationCity: "",
      city: "",
      cityId: "",
      //   酒店信息列表
      hotelList: [],
      //   搜索城市下拉列表
      searchCity: [],
      //   当前城市的区域列表
      scenics: [],
      //   弹窗窗
      dialogVisible: false,
      //   当前ip地址的城市
      ipcity: "",
      //   地图中心
      center: [113.0991626, 21.9335713],
      //   时间选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      },
      //   起始时间
      enterTime: "",
      //   结束时间
      leftTime: ""
    };
  },
  methods: {
    getMap() {
      // 创建地图实例

      var map = new AMap.Map("container", {
        //   center: [113.722733, 22.39739], //地图中心点
        center: this.center,
        zoom: 8 //地图显示的缩放级别
      });
      const city = this.showCityInfo();
      //   是否显示弹出窗口
      this.dialogVisible = true;

      // -------------------------

      // ------------------------
      // 自定义点标记内容
      var markerContent = document.createElement("div");
      markerContent.style = "position:relative";
      // 点标记中的图标
      var markerImg = document.createElement("img");
      markerImg.className = "markerlnglat";
      markerImg.src =
        "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
      markerImg.style = "width:30px;";
      // markerImg.position = "relative";
      markerContent.appendChild(markerImg);
      // 点标记中的数字
      var markerNum = document.createElement("span");
      markerNum.className = "marker-number";
      markerNum.style =
        "position:absolute;left:50%;top:50%;transform: translate(-50%, -85%);color:#fff;";
      markerNum.innerHTML = "9";
      markerContent.appendChild(markerNum);
      var marker = new AMap.Marker({
        content: markerContent,
        offset: new AMap.Pixel(-13, -30)
      });
      // 将 markers 添加到地图
      map.add(marker);
    },
    //   获取搜索城市方法封装
    getCity(value) {
      return this.$axios({
        url: "/cities",
        method: "get",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newdata = data.map(item => {
          // 一定要添加value 属性，否则会有问题
          item.value = item.name;
          return item;
        });
        return newdata;
      });
    },
    // 输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearch(value, cb) {
      if (!value) {
        cb([]);
        this.searchCity = [];
        return;
      }
      this.getCity(value).then(res => {
        this.searchCity = res;
        cb(res);
      });
    },
    // 城市列表下拉选择时触发
    handleSelect(item) {},
    // 失去焦点
    handleBlur() {
      if (this.city === "") return;
      if (this.searchCity.length > 0) {
        this.city = this.searchCity[0].value;
        // 获取城市区域列表
        this.getScenics();
      }
    },
    // 控制卡片是否显示
    handleClick() {
      this.showCard = !this.showCard;
    },
    // 选择人数
    selectMember() {
      if (this.adult === "1 成人" && this.child === "0 儿童") {
        this.adult = 1;
        this.child = 0;
      }
      // 保存总人数
      this.totalMember = this.adult + "成人" + "  " + this.child + "儿童";

      this.showCard = false;
      //   console.log(this.totalMember);
    },
    handleChange(val) {
      console.log(val);
    },
    handleClose() {},
    // 获取选择的时间
    selectTime() {
      // 起始时间
      this.enterTime = moment(this.datatime[0]).format("YYYY-MM-DD");
      //   结束时间
      this.leftTime = moment(this.datatime[1]).format("YYYY-MM-DD");
    },
    // 获取城市区域列表
    getScenics() {
      this.$axios({
        url: "/cities",
        params: {
          name: this.city
        }
      }).then(res => {
        const { scenics } = res.data.data[0];
        this.scenics = scenics;
        this.cityId = res.data.data[0].id;
      });
    },
    // 查询酒店列表信息
    searchInfo() {
      // if (!this.enterTime && !this.leftTime && !this.cityId) {
      //   return this.$message.error("请填写搜索内容！");
      // }
      // 字段: hotels,enterTime,leftTime
      this.$axios({
        url: "/hotels",
        method: "get",
        params: {
          enterTime: this.enterTime,
          leftTime: this.leftTime,
          _limit: 5,
          _start: 1,
          city: this.cityId
        }
      }).then(res => {
        this.hotelList = res.data;
        this.$store.commit("hotel/setHotelList", this.hotelList);
        this.$store.commit("hotel/setFilter", {
          enterTime: this.enterTime,
          leftTime: this.leftTime,
          city: this.cityId
        });
      });
    },
    //获取用户所在城市信息
    showCityInfo() {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch();
      let that = this;
      //自动获取用户IP，返回当前城市的数据
      citysearch.getLocalCity(function(status, result) {
        if (status === "complete" && result.info === "OK") {
          if (result && result.city && result.bounds) {
            //   获取城市的经纬度
            const { Q, R } = result.bounds.northeast;
            that.center = [R, Q];
            // 把数据保存到vuex
            that.$store.commit("hotel/setCity", result);
            // 把城市保存到data中
            that.locationCity = result.city;
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#container {
  height: 260px;
  // position: absolute;
}

/deep/.el-dialog__body {
  padding: 5px 20px;
  span {
    display: flex;
    align-items: center;
    i {
      margin-right: 10px;
    }
  }
}
/deep/.el-select-dropdown /deep/.el-popper {
  z-index: 9999;
}
.el-tooltip {
  cursor: pointer;
}
// 价格区
.price {
  i {
    font-size: 12px;
    color: #fd9927;
  }
  em {
    margin-left: 10px;
    color: #444;
    font-size: 14px;
  }
  margin: 10px 0;
  span {
    margin-right: 20px;
  }
}
// 均价区
.district {
  a {
    margin-right: 8px;
  }
}
/deep/.el-collapse-item__header {
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.container {
  .text {
    font-size: 14px;
  }
  .member {
    width: 200px;
  }
  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 340px;
    right: 120px;
    margin-top: 10px;
    position: absolute;
    z-index: 999;
  }
  /deep/.el-card__header {
    padding: 10px 15px;
    font-size: 14px;
    line-height: 48px;
    box-sizing: border-box;
  }
  /deep/ .el-card__body {
    padding: 30px 5px !important;
    box-sizing: border-box;
  }
  .search-bar {
    position: relative;
    margin-bottom: 20px;
    display: flex;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
}
</style>