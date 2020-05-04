<template>
  <div class="container">
    <div class="release">
      <h3>发表新攻略</h3>
      <p>分享你的个游记,让更多人看到哦!</p>
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item class="editor" prop="content">
          <client-only>
            <quill-editor ref="editRef" v-model="form.content" :options="editorOption" />
          </client-only>
          <input id="fileInput" type="file" style="display:none" />
        </el-form-item>
        <el-form-item label="选择城市" label-width="80px" class="city" prop="cityName">
          <el-autocomplete
            v-model="form.cityName"
            :fetch-suggestions="queryCity"
            placeholder="请搜索游玩城市"
            style="width: 200px;"
            @select="handleDepartSelect"
          />
        </el-form-item>
      </el-form>
      <div class="submit">
        <el-button type="primary" size="mini" @click="releasePost">发布</el-button>或者
        <el-button type="text" class="release-temp" @click="saveDraft">保存到草稿</el-button>
      </div>
    </div>
    <div class="temp">
      <div class="draft">草稿箱 （{{draftList.length>0?draftList.length:0}}）</div>
      <div class="draft-content">
        <div  @click="showDraft(index)" class="draft-item" v-for="(item, index) in draftList" :key="index">
          <h4 class="draft-title">{{item.title}}</h4>
          <div v-html="item.content" class="draft-item-content"></div>
        </div>
      </div>
      <div v-show="false">{{draft}}</div>
    </div>
  </div>
</template>

<script>
import { quillRedefine } from "vue-quill-editor-upload";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: "",
        cityName: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入内容"
          }
        ],
        cityName: {
          required: true,
          message: "请选择城市"
        }
      },
      uploadUrl: "",
      editorOption: {
        // modules: {
        //   ImageExtend: {
        //     name: 'files',
        //     action: this.$axios.defaults.baseURL,
        //     response: (res) => {
        //       console.log(res, 'res---------')
        //     },
        //     headers: (xhr) => {
        //       xhr.setRequestHeader({
        //         Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
        //       })
        //     }
        //   }
        // }
      },
      loading: "",
      // 选中的草稿的下标
      index:''
    };
  },
  mounted() {
    this.uploadUrl = this.$axios.defaults.baseURL + "/upload";
    // 自定义图片上传
    this.editorOption = quillRedefine({
      uploadConfig: {
        action: this.uploadUrl,
        start: () => {
          this.loading = this.$loading({
            lock: true,
            text: "上传中。。。",
            spinner: "el-icon-loading",
            background: "rgba(0,0,0,.7)"
          });
        },
        res: response => {
          return this.$axios.defaults.baseURL + response[0].url;
        },
        success: () => {
          this.loading.close();
        },
        name: "files"
      }
    });
  },
  computed: {
    ...mapState({
      draftList(state){
        const draftArr = JSON.parse(JSON.stringify(state.post.draftList))
        if(draftArr.length===0) return false
        const temp = draftArr.map(v=>{
          v.content = v.content.replace(/<img.*>/ig, '')
          return v
        })
        return temp
      },
      draft(state){
        if(!state.post.draft) return false
        this.form = {...state.post.draft}
        return '111111'
      }
    })
   
  },
  watch:{
    
  },
  methods: {
    // 实时搜索城市
    async queryCity(city, cb) {
      if (!city) {
        return false;
      }
      const { data: res } = await this.$axios({
        url: "/airs/city",
        params: { name: city }
      });
      const arr = res.data.map(v => {
        v.value = v.name;
        return v;
      });
      cb(arr);
    },
    handleDepartSelect(item) {
      this.form.city = item.id;
    },
    // 发布文章
    releasePost() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) {
          return false;
        }
        if(this.draft){
          // 如果是草稿的数据 删除state中的draft
          this.$store.commit('post/removeDraft',this.index)
        }
        const { data: res } = await this.$axios({
          method: "post",
          url: "/posts",
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userInfo.token
          },
          data: this.form
        });
        if (res.message === "新增成功") {
          this.$message.success(res.message);
          this.form = {
            title: "",
            content: "",
            city: "",
            cityName: ""
          };
        }
        this.$refs.formRef.resetFields();
      });
    },
    // 存为草稿
    saveDraft() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return false;
        const from = {...this.form}
        this.$store.commit("post/setDraft", from);
        this.$message.success('已存为草稿')
        this.$refs.formRef.resetFields();
      });
    },
    // 草稿内容复现
    showDraft(index){
     this.$store.commit('post/getDraftDetail',index)
     this.index = index
    },
    imgHandler(state) {
      console.log(state);
      if (state) {
        const fileInput = document.getElementById("fileInput");
        console.log(fileInput);
        fileInput.click();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 25px;
}
.release {
  float: left;
  width: 700px;

  h3 {
    font-weight: normal;
    font-size: 23px;
  }
  p {
    color: #999;
    font-size: 14px;
    padding: 9px 0;
  }
  .editor {
    height: 541px;
    margin-bottom: 0;
    .quill-editor {
      height: 400px;
    }
  }
  /deep/ .el-form-item__label {
    text-align: left;
  }
  .submit {
    font-size: 14px;
    padding: 10px 0;
    margin-bottom: 10px;
    .el-button {
      margin-right: 10px;
    }
    .release-temp {
      color: #ffa500;
    }
  }
}
.temp {
  width: 300px;
  float: right;
  .draft {
    width: 260px;
    height: 41px;
    float: right;
    padding: 10px 5px;
    border: 1px solid #ddd;
  }
  .draft-content{
    float: right;
    width: 260px;
    .draft-item{
      cursor: pointer;
      display: block;
      border-bottom:1px solid #ccc;
      .draft-title{
        padding: 20px;
      }
      .draft-item-content{
        // padding: 20px 0;
        height: 60px;
        font-size: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
    
  }
}
</style>
