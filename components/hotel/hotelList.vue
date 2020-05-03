<template>
  <div class="container">
    <div v-if="hotelList.total>0">
      <el-row class="listItem" v-for="(item,index) in hotelList.data" :key="index">
        <!-- 图片 -->
        <div @click="toDetail(item.id)">
          <el-col :span="8">
            <img :src="item.photos" alt />
          </el-col>
          <el-col :span="10">
            <h3 class="title">{{item.name}}</h3>
            <span class="sub-title">{{item.alias}}</span>
            <div class="level" v-if="item.hoteltype.name">
              <!-- 星级酒店 -->

              <i
                class="iconfont icon-cs-hg-1"
                v-for="(item,index) in item.hotellevel.level"
                :key="'-'+index"
              ></i>

              <span>{{item.hoteltype.name}}</span>
            </div>
            <!-- 评价 -->
            <div class="rate">
              <el-row>
                <!-- 评分等级 -->
                <el-col :span="8">
                  <el-rate
                    v-model="item.stars"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                </el-col>
                <!-- 显示评价数 -->
                <el-col :span="8">
                  <span class="orange">{{item.common_remarks}}</span>条评价
                </el-col>
                <el-col :span="8">
                  <span class="orange">{{item.good_remarks}}</span>篇游记
                </el-col>
              </el-row>
            </div>
            <!-- 定位 -->
            <div class="location">
              <i class="iconfont icon-tianchongxing-" style="color:#666;font-size:14px"></i>
              <span>{{item.address}}</span>
            </div>
          </el-col>
          <!-- 快捷跳转 -->
          <el-col :span="6">
            <!-- <nuxt-link to="https://hotels.ctrip.com/hotel/694679.html" target="_blank" > -->
            <div
              class="shortItem"
              v-for="(item,index) in item.products"
              :key="'products'+index"
              @click="jumpLink"
            >
              <div class="title">{{item.name}}</div>
              <div class="price">
                <span class="orange">¥{{item.price}}</span>
                起
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <!-- </nuxt-link> -->
          </el-col>
        </div>
      </el-row>
    </div>
    <h4 class="nodata" v-else>暂无符合条件的酒店</h4>
    <!-- 分页 -->
    <el-pagination
      v-if="hotelList.total>0"
      style="margin:20px 0;float:right"
      background
      layout="total,prev, pager, next"
      @current-change="handleCurrentChange"
      :total="hotelList.total"
    ></el-pagination>
    <div v-show="false">{{gethotelList}}{{getFilter}}</div>
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {
    //   将vuex中的数据保存到data中
    gethotelList() {
      return (this.hotelList = this.$store.state.hotel.hotelList);
    },
    getFilter() {
      return (this.filter = this.$store.state.hotel.filter);
    }
  },
  data() {
    return {
      value: 4,
      //   酒店信息列表
      hotelList: {},
      // 关键字搜索信息
      filter: {}
    };
  },
  methods: {
    // 分页跳转
    handleCurrentChange(val) {
      // 字段: hotels,enterTime,leftTime,  _start（分页），_limit 条数,cityid
      this.$axios({
        url: "/hotels",
        method: "get",
        params: {
          enterTime: this.filter.enterTime,
          leftTime: this.filter.leftTime,
          // _limit: 5,
          _start: val,
          city: this.filter.city
        }
      }).then(res => {
        const data = res.data.data || {};
        this.hotelList = res.data;
        let location = [];
        if (data) {
          data.forEach(item => {
            location.push(item.location);
          });
        }
        if (location.length > 0) {
          // this.center = [location[0].longitude, location[0].latitude];
          this.location = location;
          this.$store.commit("hotel/setLocation", location);
        }
        this.$store.commit("hotel/setHotelList", this.hotelList);
      });
    },
    // 跳转酒店详情
    toDetail(id) {
      this.$router.push({
        path: "/hotel/detail",
        query: {
          id
        }
      });
    },
    // 外链跳转
    jumpLink() {
      // 新窗口打开
      window.open("https://hotels.ctrip.com/hotel/694679.html", "_blank");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .nodata {
    margin: 10px 0 30px 0;
    text-align: center;
    font-weight: normal;
    color: #999;
  }
  /deep/.el-rate__icon {
    margin-right: 3px;
  }
  .listItem {
    height: 265px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    padding: 25px 0;
    font-size: 14px;
    cursor: pointer;

    .orange {
      color: #fd9927;
      margin-right: 6px;
    }

    .title {
      font-size: 20px;
    }
    .sub-title {
      color: #999;
      font-size: 16px;
    }
    .level {
      .iconfont {
        color: #fd9927;
      }
    }
    .shortItem {
      display: flex;
      padding: 10px 20px;
      justify-content: space-between;
      color: #666;
      cursor: pointer;
      .title {
        font-size: 14px;
      }
      border-bottom: 1px solid #eee;
    }
    .shortItem:hover {
      background: #f5f7fa;
    }
    img {
      width: 320px;
      height: 210px;
    }
    .level {
      margin-top: 10px;
    }
    .rate {
      margin: 10px 0;
      text-align: center;
    }
  }
}
</style>