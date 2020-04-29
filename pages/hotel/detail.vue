<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/hotel'}">广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>锦江之星(吴泾痁)</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="hotel">
      <h3>锦江之星(吴经店)</h3>
      <div class="pingyin">jin jiang zhi xing (shang hai min bang wu jiang dian)</div>
      <div class="hotel-location">
        <i class="el-icon-location"></i>
        剑川路165号(近龙吴路)
      </div>
      <el-row :gutter="15">
        <el-col :span="16" class="hotel-img-big">
          <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
        </el-col>
        <el-col :span="8" class="hotel-img-small">
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </div>
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg" alt />
          </div>
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </div>
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </div>
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </div>
          <div class="img-wrap">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
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
      <el-row class="form">
        <el-col :span="8">携程</el-col>
        <el-col :span="8" class="middle">高级大床房A</el-col>
        <el-col :span="8" class="bottom">
          <span class="orange">￥ 254</span>
          <i>起</i>
          <span class="orange">></span>
        </el-col>
      </el-row>
      <el-row class="form">
        <el-col :span="8">携程</el-col>
        <el-col :span="8" class="middle">高级大床房A</el-col>
        <el-col :span="8" class="bottom">
          <span class="orange">￥ 254</span>
          <i>起</i>
          <span class="orange">></span>
        </el-col>
      </el-row>
    </div>
    <div class="map">
      <script src="https://webapi.amap.com/maps?v=1.4.15&key=7179779dbf7533b3b406fdd4449307bd"></script>
      <div id="map-container"></div>
      <div class="traffic"></div>
    </div>
    <div class="hotel-info">
      <el-row>
        <el-col :span="4">基本信息</el-col>
        <el-col :span="5">入住时间: 14:00之后</el-col>
        <el-col :span="5">离店时间: 12:00之前</el-col>
        <el-col :span="5">2004年开业/2007装修</el-col>
        <el-col :span="5">酒店规模: 216间客房</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">主要设施</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">停车服务</el-col>
      </el-row>
      <el-row>
        <el-col :span="4">品牌信息</el-col>
      </el-row>
    </div>
    <div class="comments">
      <h4>0条真实用户评论</h4>
      <el-row class="comments-main" :gutter="20">
        <el-col :span="3" class="comments-total">
          <div>总评数: 148</div>
          <div>好评数: 43</div>
          <div>差评数: 5</div>
        </el-col>
        <el-col :span="5" class="recomment">
          <div class="recomment-stars">
            <div class="remoment-bg">
            推荐
          </div>
            <el-rate
              v-model="value"
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
            <canvas width="70" height="70" class="canvas"></canvas>
            <span>环境</span>
            <span>7.4</span>
          </div>
          <div class="score-item">
            <canvas width="70" height="70" class="canvas"></canvas>
            <span>产品</span>
            <span>7.2</span>
          </div>
          <div class="score-item">
            <canvas width="70" height="70" class="canvas"></canvas>
            <span>服务</span>
            <span>7.9</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
  <script src="https://webapi.amap.com/maps?v=1.4.15&key=7179779dbf7533b3b406fdd4449307bd"></script>

<script>
// import AMapLoader from "@amap/amap-jsapi-loader";
export default {
  data() {
    return {
      value: 3.7
    };
  },
  mounted() {
    setTimeout(() => {
      this.setMap();
      this.setCanvas();
    }, 30);
  },
  methods: {
    setMap() {
      var map = new AMap.Map("map-container", {
        zoom: 12
      });
    },
    setCanvas() {
      let canvas = document.querySelectorAll(".canvas");
      canvas.forEach(item => {
        draw(item);
      });
      function draw(canvas) {
        if (!canvas.getContext) return;
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(35, 35, 34, 0, Math.PI * 2 * 0.7);
        ctx.strokeStyle = "#ff9900";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
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
.map {
  overflow: hidden;
  margin: 40px 0;
  #map-container {
    width: 600px;
    height: 400px;
    float: left;
  }
  .traffic {
    width: 400px;
    height: 400px;
    float: right;
    background: red;
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
  h4{
    padding: 24px 0;
  }
  .comments-main {
    .el-col{
      height: 70px;
    }
    .comments-total{
      color:#333;
    }
    .recomment {
      .recomment-stars{
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 36px;
        /deep/ i{
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
        .canvas {
          position: absolute;
          transform: rotate(-90deg);
        }
      }
    }
  }
}
</style>
