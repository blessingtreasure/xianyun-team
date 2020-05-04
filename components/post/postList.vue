<template>
  <div>
    <div>
      <el-input
        placeholder="请输入想去的地方，比如：广州"
        class="search"
        v-model="city"
        @keyup.enter.native="handleSearch"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearch"></i>
      </el-input>
      <div class="recommend">
        <span>推荐：</span>
        <button
          v-for="(item,index) in recommendCity"
          :key="index"
          @click="handleCity(item)"
        >{{ item }}</button>
      </div>
      <div>
        <el-row class="title" type="flex" justify="space-between">
          <h4>推荐攻略</h4>
          <div>
            <nuxt-link to="post/post-release">
              <el-button type="primary" icon="el-icon-edit">写游记</el-button>
            </nuxt-link>
          </div>
        </el-row>
        <!-- 推荐列表 -->
        <div class="listBox">
          <!-- 三张图片的 -->
          <el-row
            class="list-item"
            v-for="(item,index) in postList"
            :key="index"
            v-show="item.images.length>=3||item.images.length===0"
          >
            <nuxt-link
              :to="{
                    path: `/post/dateil`, 
                    query: {id: item.id} 
                  }"
            >
              <h4>{{ item.title }}</h4>
              <p>{{ item.summary }}</p>

              <el-row type="flex" justify="space-between" class="img-list">
                <div
                  :style="`height:(item.imgages.length?0:150px)`"
                  v-for="(item1,index1) in item.images"
                  :key="index1"
                >
                  <img :src="item1" alt />
                </div>
              </el-row>
            </nuxt-link>
            <el-row class="post-info" type="flex" justify="space-between">
              <div class="info">
                <i class="el-icon-location-outline"></i>
                <span>{{ item.cityName }}</span>
                <span>by</span>
                <!-- <img :src="'$axios.defaults.baseURL' + item.account.defaultAvatar" /> -->
                <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" />
                <span>{{ item.account.nickname }}</span>
                <i class="el-icon-view"></i>
                <span>{{ item.watch||0}}</span>
              </div>
              <div class="star">{{ item.like||0}}赞</div>
            </el-row>
          </el-row>
          <!-- 一张图片的 -->

          <el-row
            class="list-item"
            type="flex"
            v-for="(item) in postList"
            :key="item.imgages"
            v-show="item.images.length>0 && item.images.length<3"
          >
            <div class="imgBox">
              <nuxt-link
                :to="{
                    path: `/post/dateil`, 
                    query: {id: item.id} 
                  }"
              >
                <img :src="item.images[0]" />
              </nuxt-link>
            </div>
            <el-col type="flex">
              <nuxt-link
                :to="{
                    path: `/post/dateil`, 
                    query: {id: item.id} 
                  }"
              >
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.summary }}</p>
                </div>
              </nuxt-link>

              <el-row class="post-info" type="flex" justify="space-between">
                <div class="info">
                  <i class="el-icon-location-outline"></i>
                  <span>{{ item.cityName }}</span>
                  <span>by</span>
                  <img :src="$axios.defaults.baseURL + item.account.defaultAvatar" />
                  <span>{{ item.account.nickname }}</span>
                  <i class="el-icon-view"></i>
                  <span>{{ item.watch||0 }}</span>
                </div>
                <div class="star">{{ item.like||0 }}赞</div>
              </el-row>
            </el-col>
          </el-row>

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendCity: ["广州", "上海", "北京"],
      city: "",
      postList: [],
      postListCache: [],
      postData: [],
      total: 0,
      pageSize: 5,
      pageIndex: 1,
      queryCity: ""
    };
  },
  // watch: {
  //   queryCity() {
  //     this.city = this.queryCity;
  //     // alert(444444);
  //   }
  // },

  mounted() {
    //文章列表
    this.$axios({
      url: "/posts",
      params: {}
    }).then(res => {
      // console.log(res);
      const { data, total } = res.data;
      this.postData = data;
      this.postListCache = [...this.postData];
      this.postList = this.postData.slice(0, this.pageSize);
      // console.log(this.postList);
      this.total = this.postData.length;
      if (this.$route.query.city) {
        this.queryCity = this.$route.query.city;
        this.city = this.queryCity;
        this.handleSearch();
      }
    });
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.postList = this.postData.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      this.pageIndex = 1;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.postList = this.postListCache.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // console.log(`当前页: ${val}`);
    },
    //点击搜索城市
    handleSearch() {
      this.postListCity = this.postListCache.filter(v => {
        return v.cityName.replace("市", "") === this.city;
      });
      this.postList = this.postListCity.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      this.total = this.postListCity.length;
    },
    handleCity(item) {
      this.city = item;
      this.postListCity = this.postListCache.filter(v => {
        return v.cityName.replace("市", "") === this.city;
      });
      this.postList = this.postListCity.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      this.total = this.postListCity.length;
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #666;
  button {
    background: none;
    border: none;
    margin-right: 5px;
    outline: none;
    color: #666;
    cursor: pointer;
  }
  button:hover {
    text-decoration: underline;
    color: orange;
  }
}
.search {
  border: 3px solid orange;
  border-radius: 0;
}
/deep/.el-input__inner {
  border-radius: 0;
  border: 0;
}
.el-input__icon {
  font-size: 24px;
  color: orange;
  font-weight: bold;
}
.title {
  height: 50px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  h4 {
    font-size: 18px;
    height: 48px;
    line-height: 40px;
    font-weight: 400;
    color: orange;
    border-bottom: 2px solid orange;
  }
}

.listBox {
  .list-item {
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    padding-bottom: 20px;
    h4 {
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
      margin-bottom: 15px;
    }
    h4:hover {
      color: orange;
    }
    p {
      font-size: 14px;
      line-height: 1.5;
      color: #666;
      margin-bottom: 15px;
      height: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .img-list {
      width: 100%;
      overflow: hidden;
      div {
        float: left;
        width: 240px;
        margin-right: 10px;
        // height: 150px;
        img {
          width: 240px;
          height: 150px;
        }
      }

      margin-bottom: 15px;
    }
    .imgBox {
      margin-right: 12px;
      img {
        width: 240px;
        height: 150px;
      }
    }
    .post-info {
      .info {
        height: 15px;
        line-height: 15px;

        color: #999;
        font-size: 12px;
        img {
          width: 13px;
          vertical-align: middle;
        }
        span {
          margin: 0 3px;
        }
      }
      .star {
        color: orange;
        font-size: 16px;
      }
    }
  }
}
</style>