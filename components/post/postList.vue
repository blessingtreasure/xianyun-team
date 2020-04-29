<template>
  <div>
    <div>
      <el-input placeholder="请输入想去的地方，比如：广州" v-model="serchCity" class="search">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <div class="recommend">
        <span>推荐：</span>
        <button>广州</button>
        <button>上海</button>
        <button>北京</button>
      </div>
      <div>
        <el-row class="title" type="flex" justify="space-between">
          <h4>推荐攻略</h4>
          <div>
            <el-button type="primary" icon="el-icon-edit">写游记</el-button>
          </div>
        </el-row>
        <!-- 推荐列表 -->
        <div class="listBox">
          <!-- 三张图片的 -->
          <el-row class="list-item">
            <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
            <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或</p>
            <el-row class="img-list" type="flex" justify="space-between">
              <img
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
                alt
              />
              <img
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
                alt
              />
              <img
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
                alt
              />
            </el-row>
            <el-row class="post-info" type="flex" justify="space-between">
              <div class="info">
                <i class="el-icon-location-outline"></i>
                <span>北京市</span>
                <span>by</span>
                <img src="http://127.0.0.1:1337/assets/images/avatar.jpg" />
                <span>地球发动机</span>
                <i class="el-icon-view"></i>
                <span>15194</span>
              </div>
              <div class="star">80赞</div>
            </el-row>
          </el-row>
          <!-- 一张张图片的 -->

          <el-row class="list-item" type="flex" justify="space-between">
            <div class="imgBox">
              <img
                src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              />
            </div>
            <div>
              <h4>塞班贵？一定是你的打开方式不对！6000块玩转塞班</h4>
              <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班</p>
              <el-row class="post-info" type="flex" justify="space-between">
                <div class="info">
                  <i class="el-icon-location-outline"></i>
                  <span>北京市</span>
                  <span>by</span>
                  <img src="http://127.0.0.1:1337/assets/images/avatar.jpg" />
                  <span>地球发动机</span>
                  <i class="el-icon-view"></i>
                  <span>15194</span>
                </div>
                <div class="star">80赞</div>
              </el-row>
            </div>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchCity: ""
    };
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
      img {
        width: 240px;
        height: 150px;
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