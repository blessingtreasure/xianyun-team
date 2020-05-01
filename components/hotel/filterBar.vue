<template>
  <div class="container">
    <h4 style="font-size:14px">条件筛选:</h4>
    <el-row class="filter-box">
      <el-col :span="8" class="filter-item">
        <div class="title">
          <span>价格</span>
          <span>0-2000</span>
        </div>
        <!-- 价格控件 -->
        <div class="block">
          <el-slider v-model="value2" :max="2000" size="mini"></el-slider>
        </div>
      </el-col>
      <!-- 住宿登记 -->
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
              <em ref="selected">不限</em>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" :command="index">
              <el-dropdown-item v-for="(item,index) in item" :key="index">
                <el-checkbox-group v-model="checkboxGroup">
                  <el-checkbox :label="item.name" @change="dandlecheck">{{item.name}}</el-checkbox>
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
      // 滑块的默认值
      value2: 1000,
      // 酒店的过滤选项
      options: [],
      // 已选选项（全部）
      checkboxGroup: [],
      levels: 0,
      types: 0,
      assets: 0,
      brands: 0
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
    // 处理多选
    dandlecheck() {
      console.log(this.checkboxGroup);
      // console.log(this.$refs.seleted);
    },
    handleCommand(command) {
      // this.$message("click on item " + command);
    }
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