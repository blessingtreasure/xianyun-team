<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in hotelDetail.breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
      <!-- {{hotelDetail.breadcrumb}} -->
    </el-breadcrumb>
    <div class="hotel">
      <h3>{{hotelDetail.name}}</h3>
      <div class="pingyin">{{hotelDetail.alias}}</div>
      <div class="hotel-location">
        <i class="el-icon-location"></i>
        {{hotelDetail.address}}
      </div>
      <el-row :gutter="15">
        <el-col :span="16" class="hotel-img-big">
          <img :src="`/images/${bigImg}.jpeg`" alt />
        </el-col>
        <el-col :span="8" class="hotel-img-small">
          <div
            class="img-wrap"
            v-for="(item, index) in 6"
            :key="index"
            @click="handleImgChoose(item)"
          >
            <img :src="`/images/${item}.jpeg`" alt />
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="hotel-price">
      <el-row class="head">
        <el-col :span="8">价格来源</el-col>
        <el-col :span="8" class="middle">低价房源</el-col>
        <el-col :span="8" class="bottom">最低价格/每晚</el-col>
      </el-row>
      <!-- 酒店来源 -->
      <el-row class="form" v-for="(item, index) in hotelDetail.products" :key="index">
        <el-col :span="8">{{item.name}}</el-col>
        <el-col :span="8" class="middle">{{item.bestType}}</el-col>
        <el-col :span="8" class="bottom">
          <span class="orange">￥ {{item.price}}</span>
          <i>起</i>
          <span class="orange">></span>
        </el-col>
      </el-row>
    </div>
    <div class="map">
      <script
        src="https://webapi.amap.com/maps?v=1.4.15&key=7179779dbf7533b3b406fdd4449307bd&plugin=AMap.Driving,AMap.PlaceSearch"
      ></script>
      <div id="map-container"></div>
      <div class="traffic">
        <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
          <el-tab-pane label="景点" name="景点"></el-tab-pane>
          <el-tab-pane label="交通" name="公交，地铁站"></el-tab-pane>
        </el-tabs>
        <div id="panel"></div>
      </div>
    </div>
    <div class="hotel-info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">入住时间: 14:00之后</el-col>
        <el-col :span="5">离店时间: 12:00之前</el-col>
        <el-col :span="5">{{hotelDetail.creation_time}}/{{hotelDetail.renovat_time}}</el-col>
        <el-col :span="5">酒店规模: {{hotelDetail.roomCount}}间客房</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
        <el-col :span="20">
          <el-tag
            type="info"
            v-for="(item,index) in hotelDetail.hotelassets"
            :key="index"
          >{{item.name}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
        <el-col :span="20">{{hotelDetail.parking}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
        <el-col :span="20" v-if="hotelDetail.hotelbrand">{{hotelDetail.hotelbrand.name}}</el-col>
      </el-row>
    </div>
    <div class="comments">
      <h4>{{total}}条真实用户评论</h4>
      <el-row class="comments-main" :gutter="20">
        <el-col :span="3" class="comments-total">
          <div>总评数: {{hotelDetail.all_remarks}}</div>
          <div>好评数: {{hotelDetail.good_remarks}}</div>
          <div>差评数: {{hotelDetail.bad_remarks}}</div>
        </el-col>
        <el-col :span="5" class="recomment">
          <div class="recomment-stars">
            <div class="remoment-bg" v-if="hotelDetail.stars<=2">一般</div>
            <div class="remoment-bg" v-else-if="hotelDetail.stars<4">推荐</div>
            <div class="remoment-bg" v-else>非常推荐</div>
            <el-rate
              v-model="hotelDetail.stars"
              disabled
              show-score
              :max="5"
              allow-half
              text-color="#ff9900"
              score-template="{value}分"
            ></el-rate>
          </div>
        </el-col>
        <el-col :span="15" class="score">
          <div class="score-item">
            <Canvas :score="hotelDetail.scores.environment" />
            <span>环境</span>
            <span>{{hotelDetail.scores.environment}}</span>
          </div>
          <div class="score-item">
            <Canvas :score="hotelDetail.scores.product" />
            <span>产品</span>
            <span>{{hotelDetail.scores.product}}</span>
          </div>
          <div class="score-item">
            <Canvas :score="hotelDetail.scores.service" />
            <span>服务</span>
            <span>{{hotelDetail.scores.service}}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 评论列表 -->
      <div class="comment-list">
        <CommentItem v-for="(item, index) in comments" :key="index" :item="item" :is-last="true" />
        <div v-if="comments.length<=0" class="comment-none">暂无评论~</div>
      </div>
    </div>
  </div>
</template>
<script src="https://webapi.amap.com/maps?v=1.4.15&key=7179779dbf7533b3b406fdd4449307bd&plugin=AMap.Driving,AMap.PlaceSearch"></script>

<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
import Canvas from "@/components/hotel/canvas";
import CommentItem from "@/components/hotel/CommentItem";
export default {
  data() {
    return {
      value: 3.7,
      // 酒店详情
      hotelDetail: {
        scores: {}
      },
      // 大图片的路径
      bigImg: 1,
      // 地图标签页显示,默认显示景点
      map: null,
      activeName: "景点",
      // 评论
      comments: [
        {
          pics: []
        }
      ],
      total: 0
    };
  },
  components: {
    Canvas,
    CommentItem
  },
  async mounted() {
    await this.getHotelDetail();
    this.getComments();
    setTimeout(() => {
      this.setMap();
    }, 50);
  },
  methods: {
    // 设置地图
    setMap() {
      let { longitude, latitude } = this.hotelDetail.location;

      this.map = new AMap.Map("map-container", {
        zoom: 12,
        center: [longitude, latitude]
      });
      // 酒店图标
      var hotelIcon = new AMap.Icon({
        size: new AMap.Size(40, 40), // 图标尺寸
        image: "/images/location_icon_hotel.png", // Icon的图像
        // imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(40, 40) // 根据所设置的大小拉伸或压缩图片
      });
      // 酒店标记
      var hotelMarker = new AMap.Marker({
        position: new AMap.LngLat(longitude, latitude),
        icon: hotelIcon,
        title: this.hotelDetail.name,
        animation: "AMAP_ANIMATION_DROP"
      });
      // 酒店文本
      var text = new AMap.Text({
        text: this.hotelDetail.name,
        map: this.map,
        offset: new AMap.Pixel(10, -50),
        position: new AMap.LngLat(longitude, latitude)
      });
      this.map.add(hotelMarker);
      this.mapSearch();
    },

    // 获取酒店详情
    getHotelDetail() {
      return new Promise(async (resolve, reject) => {
        let { id } = this.$route.query;
        let { data: res } = await this.$axios({
          url: "/hotels",
          params: {
            id
          }
        });
        res.data[0].breadcrumb = res.data[0].breadcrumb.split(" > ");
        this.hotelDetail = res.data[0];
        resolve(this.hotelDetail);
      });
    },
    // 点击更换图片
    handleImgChoose(src) {
      this.bigImg = src;
    },
    // 地图搜索
    mapSearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 15, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.hotelDetail.real_city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.activeName);
      });
    },
    handleClick(item) {},
    // 获取酒店评论
    async getComments() {
      const { id } = this.$route.query;
      const { data: res } = await this.$axios({
        url: "/hotels/comments",
        params: {
          hotel: id
        }
      });
      this.comments = res.data;
      this.total = res.total;
    }
  },
  watch: {
    activeName() {
      this.mapSearch();
      return "";
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
.el-breadcrumb {
  margin-top: 20px;
}
.hotel {
  margin-top: 20px;
  h3 {
    font-size: 24px;
    font-weight: normal;
  }
  .pingyin,
  .hotel-location {
    color: #666;
    font-size: 14px;
  }
  .el-row {
    margin-top: 40px;
    .hotel-img-big {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .hotel-img-small {
      padding: 0 !important;
      margin: 0;
      box-sizing: border-box;
      .img-wrap {
        float: left;
        margin-bottom: 14px;
        cursor: pointer;
        &:nth-child(2n-1) {
          margin-right: 15px;
        }
        img {
          width: 160px;
          display: block;
          background-size: cover;
        }
      }
    }
  }
}
.hotel-price {
  margin-top: 40px;
  .el-row {
    border-bottom: 1px solid #ebeef5;
    padding: 16px 0;
    font-size: 14px;
    color: #606266;
  }
  .form {
    transition: background-color 0.25;
    &:hover {
      background-color: #f5f7fa;
    }
  }
  .head {
    color: #909399;
  }
  .middle {
    text-align: center;
  }
  .bottom {
    padding-left: 176px;
    .orange {
      color: #ff9900;
    }
    i {
      margin: 0 6px;
    }
  }
}
/deep/ .amap_lib_placeSearch {
  border: none !important;
}
.map {
  overflow: hidden;
  margin: 40px 0;
  #map-container {
    width: 600px;
    height: 400px;
    float: left;
  }
  .traffic {
    padding-left: 20px;
    width: 380px;
    height: 400px;
    float: right;
    #panel {
      background-color: white;
      height: 350px;
      width: 100%;
      overflow: auto;
    }
  }
}
.hotel-info {
  .el-row {
    padding: 14px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
}
.comments {
  margin: 20px 0;
  h4 {
    padding: 24px 0;
  }
  .comments-main {
    .el-col {
      height: 70px;
    }
    .comments-total {
      color: #333;
    }
    .recomment {
      .recomment-stars {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 36px;
        /deep/ i {
          font-size: 22px;
          margin-right: 2px;
        }
      }
      .remoment-bg {
        position: absolute;
        height: 70px;
        width: 70px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #ff9900;
        font-size: 17px;
        color: #ff9900;
        opacity: 0.35;
        left: 50%;
        top: -21px;
        transform: rotate(-30deg) translateX(-50%);
      }
    }
    .score {
      display: flex;
      .score-item {
        display: flex;
        width: 70px;
        height: 70px;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        color: #ff9900;
        margin-left: 50px;
      }
    }
  }
  .comment-list {
    margin-top: 40px;
  }
  .comment-none {
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #999;
  }
}
</style>
