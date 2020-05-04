<template>
  <div class="container">
    <h4 style="font-size:14px">条件筛选:</h4>
    <el-row class="filter-box">
      <el-col :span="8" class="filter-item">
        <div class="title">
          <span>价格</span>
          <span>0-4000</span>
        </div>
        <!-- 价格控件 -->
        <div class="block">
          <el-slider v-model="price" :max="4000" size="mini" @change="handlePrice(price)"></el-slider>
        </div>
      </el-col>
      <!-- 过滤筛选 -->
      <!-- 过滤筛选 -->
      <el-col :span="4" class="filter-item" v-for="(item,index) in options" :key="index">
        <div class="title">
          <span v-if="index==='levels'">酒店等级</span>
          <span v-if="index==='types'">酒店类型</span>
          <span v-if="index==='assets'">酒店设施</span>
          <span v-if="index==='brands'">酒店品牌</span>
        </div>
        <div class="block">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <em ref="selected" v-if="index==='levels'">{{levellenght>0?'已选'+levellenght+'项':'不限'}}</em>
              <em ref="selected" v-if="index==='types'">{{typelength>0?'已选'+typelength+'项':'不限'}}</em>
              <em ref="selected" v-if="index==='assets'">{{asseslength>0?'已选'+asseslength+'项':'不限'}}</em>
              <em
                ref="selected"
                v-if="index==='brands'"
              >{{brandslength>0?'已选'+brandslength+'项':'不限'}}</em>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item) in item" :key="item.length" :command="index">
                <el-checkbox-group v-model="checkboxGroup">
                  <el-checkbox
                    :label="item.name"
                    @change="dandlecheck(index,item)"
                    true-label
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getOptions();
  },
  data() {
    return {
      price: 4000, // 滑块的默认值
      options: [], // 酒店的过滤选项
      checkboxGroup: [],
      checkboxSlected: [], // 已选选项数组（全部）
      filterStr: "", //已选的过滤条件
      filterPrice: "", //价格筛选
      cityId: "", // 城市id
      levellenght: 0,
      typelength: 0,
      asseslength: 0,
      brandslength: 0
    };
  },
  methods: {
    // 获取酒店的筛选选项
    getOptions() {
      this.$axios.get("/hotels/options").then(res => {
        const { data } = res.data;
        this.options = data;
      });
    },
    // 处理价格条件
    handlePrice(price) {
      this.filterPrice = `price_lt=${price}&`;
      this.handleFilter();
    },
    // 处理多条件筛选
    dandlecheck(index, checkedItem) {
      // 定义falg变量，默认为true
      let flag = true;
      // 酒店等级
      if (index === "levels") {
        if (this.checkboxSlected.length > 0) {
          this.checkboxSlected.forEach((item, index) => {
            if (item == `hotellevel_in=${checkedItem.level}&`) {
              flag = false;
              this.checkboxSlected.splice(index, 1);
              this.levellenght--;
            }
          });
          if (flag) {
            this.levellenght++;
            this.checkboxSlected.push(`hotellevel_in=${checkedItem.level}&`);
          }
        } else {
          this.levellenght++;
          this.checkboxSlected.push(`hotellevel_in=${checkedItem.level}&`);
        }
      }
      // 酒店类型
      if (index === "types") {
        if (this.checkboxSlected.length > 0) {
          this.checkboxSlected.forEach((item, index) => {
            if (item == `hoteltype_in=${checkedItem.id}&`) {
              flag = false;
              this.typelength--;
              this.checkboxSlected.splice(index, 1);
            }
          });
          if (flag) {
            this.checkboxSlected.push(`hoteltype_in=${checkedItem.id}&`);
            this.typelength++;
          }
        } else {
          this.checkboxSlected.push(`hoteltype_in=${checkedItem.id}&`);
          this.typelength++;
        }
      }
      // // 酒店设施
      if (index === "assets") {
        if (this.checkboxSlected.length > 0) {
          this.checkboxSlected.forEach((item, index) => {
            if (item == `hotelasset_in=${checkedItem.id}&`) {
              flag = false;
              this.checkboxSlected.splice(index, 1);
              this.asseslength--;
            }
          });
          if (flag) {
            this.checkboxSlected.push(`hotelasset_in=${checkedItem.id}&`);
            this.asseslength++;
          }
        } else {
          this.checkboxSlected.push(`hotelasset_in=${checkedItem.id}&`);
          this.asseslength++;
        }
      }
      //  酒店品牌
      if (index === "brands") {
        if (this.checkboxSlected.length > 0) {
          this.checkboxSlected.forEach((item, index) => {
            if (item == `hotelbrand_in=${checkedItem.id}&`) {
              flag = false;
              this.checkboxSlected.splice(index, 1);
              this.brandslength--;
            }
          });
          if (flag) {
            this.checkboxSlected.push(`hotelbrand_in=${checkedItem.id}&`);
            this.brandslength++;
          }
        } else {
          this.checkboxSlected.push(`hotelbrand_in=${checkedItem.id}&`);
          this.brandslength++;
        }
      }
      this.filterStr = this.checkboxSlected.join(",");
      this.filterStr = this.filterStr.replace(/,/g, "");
      this.handleFilter();
    },
    // 酒店列表网络请求
    handleFilter() {
      let filter = this.$store.state.hotel.filter;
      let filterArr = [];
      for (let key in filter) {
        if (filter[key] && key !== "price_lt") {
          filterArr = filterArr.concat(`${key}=${filter[key]}&`);
        }
      }
      filterArr = filterArr.join(",");
      filterArr = filterArr.replace(/,/g, "");
      this.$axios({
        url: `/hotels?${filterArr}${this.filterPrice}${this.filterStr}`
      }).then(res => {
        const data = res.data.data || {};
        let location = [];
        if (data) {
          data.forEach(item => {
            location.push({
              latitude: item.location.latitude,
              longitude: item.location.longitude,
              name: item.name
            });
          });
        }
        if (location.length > 0) {
          // this.center = [location[0].longitude, location[0].latitude];
          this.location = location;
          this.$store.commit("hotel/setLocation", location);
        }
        this.$store.commit("hotel/setHotelList", res.data);
        // 将城市名称保存到vuex
        this.$store.commit("hotel/setCity", { city: this.city });
      });
    },
    handleCommand(command) {}
  }
};
</script>

<style lang="less" scoped>
/deep/.el-checkbox__inner {
  border-radius: 50%;
}
.el-dropdown-menu {
  height: 220px;
  overflow-y: scroll !important;
}
.filter-box {
  border: 1px solid #eee;
  height: 80px;
  margin: 20px 0;
  padding: 10px 0;
  /deep/.el-slider__bar {
    border-radius: 3px;
    height: 6px;
  }
  .el-dropdown {
    width: 100%;
    cursor: pointer;
  }

  /deep/.el-dropdown-link {
    margin-top: 10px;
    font-size: 12px;
    width: 100% !important;
    display: flex;
    justify-content: space-between;
  }

  .filter-item {
    height: 100%;
    border-right: 1px solid #eee;
    padding: 0 20px;
    font-size: 14px;
    color: #555;
    .title {
      display: flex;
      justify-content: space-between;
    }
  }
  .filter-item:last-child {
    border: 0;
  }
}
</style>