<template>
  <div>
    <div class="menu-box">
      <el-menu
        class="el-menu-demo menu"
        mode="vertical"
        @select="handleSelect"
        collapse
        v-for="(item,index) in cities"
        :key="index"
      >
        <el-submenu index="index" class="menu-item" id="active">
          <template slot="title" class="menu-option">
            {{ item.type }}
            <i class="el-icon-arrow-right"></i>
          </template>
          <el-menu-item
            index="index"
            v-for="(item1,index1) in item.children"
            :key="index1"
            class="mn-option"
            @click="handleSearchCity(item1.city)"
          >
            <i>{{ index1+1 }}</i>
            <span>{{ item1.city }}</span>
            <p>{{ item1.desc }}</p>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <!-- 推荐城市 -->
    <div>
      <h3>推荐城市</h3>
      <div>
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cities: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      //   console.log(res);
      const { data } = res.data;
      this.cities = data;
    });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSearchCity(item) {
      this.$router.push({
        path: "/post",
        query: { city: item }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.menu {
  width: 100%;
}
.menu-item {
  height: 40px;
  border: 1px solid #bbb;
  border-bottom: none;
  border-right: none;
}
.menu-item /deep/.el-menu--popup-right-start {
  background: red;
}
/deep/.el-submenu__title {
  border-right: 1px solid #bbb;
}
/deep/.el-submenu__title:hover {
  background: none;
  color: orange;
  border-right: 1px solid #fff;
}
/deep/.el-submenu__title:active {
  background: none;
  color: orange;
  border-right: 1px solid #fff;
}

.el-menu {
  border-right: none;
}
.menu:last-child {
  border-bottom: 1px solid #bbb;
}
/deep/.el-submenu__title {
  //   position: relative;
  //   left: -12px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  i {
    color: inherit;
    float: right;
    height: 40px;
    line-height: 40px;
  }
}
.mn-options {
  background: red;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: none;
}
.el-menu--popup > .el-menu {
  background: red;
}
.el-menu-item {
  height: 40px;
  line-height: 40px;
}
.mn-option {
  i {
    font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Helvetica Neue, Arial, sans-serif;
    font-size: 20px;
    font-style: italic;
    color: orange;
  }
  span {
    color: orange;
    margin: 0 10px;
  }
  p {
    display: inline;
    color: #cfcfcf;
  }
  p:hover {
    text-decoration: underline;
  }
}
/deep/.el-menu--popup {
  background: red;
}
//推荐城市
h3 {
  margin-top: 20px;
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
img {
  width: 100%;
  cursor: pointer;
}
</style>