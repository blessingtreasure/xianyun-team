<template>
  <!-- 旅游攻略详情 -->
  <div class="w">
    <el-row>
      <el-col :span="15" class="el-cols">
        <div class="title">
          <span>旅游攻略</span>
          <span>/&nbsp攻略详情</span>
        </div>
        <!-- 标题 -->
        <div class="title-h1" v-if="data.length > 0">
          <h1>{{data[0].title}}</h1>
        </div>
        <div class="tiem">
          <div></div>
          <div class="time-date">
            攻略:
            <span>{{moment(data[0].created_at).format("YYYY-MM-DD hh:mm")}}</span>
            阅读:
            <span>{{data[0].watch}}</span>
          </div>
        </div>
        <!-- 攻略内容 -->
        <div v-if="data.length > 0" v-html="data[0].content" class="content"></div>
        <!-- 评论和分享图标 -->
        <div class="iconfow">
          <div>
            <span class="el-icon-edit-outline"></span>
            <p>评论({{dataList.total}})</p>
          </div>
          <div>
            <span class="el-icon-share" @click="handleShare"></span>
            <p>分享</p>
          </div>
        </div>
        <!-- 评论部分 -->
        <div>
          <div class="discuss">评论</div>
          <!-- 输入框 -->

          <el-input
            type="textarea"
            :placeholder="placeValue"
            v-model="value"
            maxlength="150"
            show-word-limit
            @blur="handleBlur"
          ></el-input>
          <!-- 图片上传框和发送按钮 -->
          <div class="item-upload">
            <div>
              <el-upload
                ref="upload"
                action="http://157.122.54.189:9095/upload"
                name="files"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
            <div>
              <el-button type="primary" @click="handleSend">发送</el-button>
            </div>
          </div>
          <!-- 评论内容部分 -->
          <div class="user-content" v-if="dataList ">
            <div class="user-item" v-for="(item,index) in dataList.data" :key="index">
              <div class="item-userInfo">
                <img :src="$axios.defaults.baseURL +item.account.defaultAvatar" alt />
                <span>{{item.account.nickname}}</span>
                <span>{{moment(item.account.updated).format("YYYY-MM-DD hh:mm")}}</span>
              </div>
              <!-- 回复的评论 二级跟帖 -->
              <Comments v-if="item.parent " :data="item.parent" @reply="replys" />
              <!-- 评论 -->
              <div class="item-comment" v-if="item.content !==''">{{item.content}}</div>
              <!-- 评论的图片 -->
              <div class="item-expression" v-if="item.pics.length>0">
                <div v-for="(value,index) in item.pics" :key="index">
                  <img :src="$axios.defaults.baseURL+value.url" alt />
                </div>
              </div>
              <div class="item-reply">
                <div style="opacity: 0;">占位</div>
                <a href="javascript:;" @click="handleReply(item)">回复</a>
              </div>
            </div>
          </div>
          <!-- 评论分页部分 -->
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[2,5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="verbla">相关攻略</div>
        <div class="conten">
          <p>上海</p>
          <p>2020-04-28 4:36 阅读 15</p>
        </div>
        <div class="conten">
          <p>chumen</p>
          <p>2020-04-28 23:36 阅读 99</p>
        </div>
        <div class="conten">
          <p>shuain</p>
          <p>2020-04-29 9:36 阅读 66</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import Comments from "@/components/post/comments";
export default {
  data() {
    return {
      moment,
      data: [
        //文章详情
        {
          title: ""
        }
      ],
      value: "", //评论输入框数据
      dialogImageUrl: "", //预览图片路径
      dialogVisible: false, //是否预览
      total: 0, //评论总条数
      pageSize: 5, //条数
      pageIndex: 1, //页码
      page_start: 0,
      dataList: {
        data: [
          {
            account: {
              defaultAvatar: "",
              nickname: ""
            },
            follow: {},
            pics: []
          }
        ]
      },
      placeValue: "说点什么把...",
      fileList: [], //图片的参数
      pid: ""
    };
  },
  components: {
    Comments
  },

  methods: {
    handleShare() {
      this.$message.warning("暂时不支持分享");
    },
    // 图片删除后执行的函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.fileList.splice(file, 1);
    },
    // 图片上传后是否展示预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url; //图片路径
      this.dialogVisible = true; //是否预览
    },
    handleSuccess(response, file, fileList) {
      this.fileList.push(response[0]);
    },

    //每页的评论条数发生改变的时候触发的函数
    handleSizeChange(val) {
      this.pageSize = val;

      this.getList();
    },
    //当分页点击改变触发的函数
    handleCurrentChange(val) {
      this.pageIndex = val;
      if (val === 1) {
        this.page_start = 0;
      } else {
        this.page_start = this.pageSize * this.pageIndex - this.pageSize;
      }

      this.getList();
    },
    //发送评论
    handleSend() {
      
      this.$axios({
        url: "/comments",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: {
          content: this.value,
          pics: this.fileList,
          post: this.$route.query.id,
          follow: this.pid
        }
      }).then(res => {
        this.$message.success("发送成功");
        this.value = "";
        this.fileList = [];
        this.$refs.upload.clearFiles();
        this.getList();
        this.pid = "";
      });
    },
    // 点击回复按钮执行的事件
    handleReply(item) {
      this.pid = item.id;
      console.log(this.pid);

      this.placeValue = `回复: @` + item.account.nickname;
    },
    //input失焦占位符恢复
    handleBlur() {
      this.placeValue = "说点什么把....";
    },
    replys(data) {
      this.pid = data.id;
      this.placeValue = `回复: @` + data.account.nickname;
    },
    //评论请求的封装
    getList() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _start: this.page_start,
          _limit: this.pageSize
        }
      }).then(res => {
        const { data } = res;
        this.dataList = data;
        this.total = data.total;
      });
    }
  },
  mounted() {
    // 文章详情
    this.$axios({
      url: "/posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      // 文章详情得数据
      this.data = res.data.data;
    });
    // 文章评论
    this.getList();
  }
};
</script>

<style scoped lang='less'>
.w {
  width: 1200px;
  margin: 0 auto;
}
.el-cols {
  margin-right: 30px;
}
.title {
  height: 50px;
  line-height: 50px;
  span:nth-child(1) {
    font-weight: 700;
    font-size: 14px;
  }
  span:nth-child(2) {
    color: #777;
    font-size: 14px;
  }
}
.title-h1 {
  border-bottom: 1px solid #eee;
}
.tiem {
  display: flex;
  justify-content: space-between;
  color: #888;
  height: 60px;
  line-height: 60px;
}

.content {
  /deep/img {
    width: 100%;
  }
}
.iconfow {
  display: flex;
  justify-content: center;
  div {
    text-align: center;
    margin: 50px;
    span {
      font-size: 40px;
      color: #ffa500;
    }
    p {
      color: #999;
      font-size: 14px;
    }
  }
}
.discuss {
  height: 50px;
  font-size: 26px;
  line-height: 50px;
}
.item-upload {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.verbla {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
.conten {
  border-bottom: 1px solid #eee;
  p:nth-child(1) {
    line-height: 60px;
  }
  p:nth-child(2) {
    line-height: 40px;
    color: #777;
    font-size: 15px;
  }
}
.user-content {
  width: 100%;
  border: 1px solid #888;
  padding-bottom: 2px;
}
.user-item {
  padding: 15px;
  border-bottom: 1px dashed #666;
}
.item-userInfo {
  display: flex;
  height: 40px;
  line-height: 40px;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  span {
    display: block;
    margin: 0 10px;
    font-size: 14px;
    color: #666;
  }
}
.item-comment {
  padding: 0 17px;
  display: flex;
  align-items: center;
  height: 50px;
}
.item-expression {
  display: flex;
  padding: 0 17px;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
.item-reply {
  display: flex;
  justify-content: space-between;
  color: rgb(56, 24, 199);
  font-size: 14px;
  padding: 0 20px;
  a {
    opacity: 0;
  }
  a:hover {
    opacity: 1;
  }
}
</style>