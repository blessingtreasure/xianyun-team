<template>
  <div>
    <Comments v-if="data.parent" :data="data.parent" />
    <div class="reply">
      <div class="item-userInfo">
        <span>{{data.account.nickname}}</span>
        <span>{{moment(data.account.updated).format("YYYY-MM-DD hh:mm")}}</span>
      </div>
      <div class="item-comment" v-if="data.content !==''">{{data.content}}</div>
      <div class="item-expression" v-if="data.pics.length>0">
        <img
          v-for="(item,index) in  item.pics"
          :key="index"
          :src="$axios.defaults.baseUR+item.name"
          alt
        />
      </div>
      <div class="item-reply">
        <div style=" opacity: 0">占位</div>
        <a href="javascript:;" @click="handleReply">回复</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Comments",
  data() {
    return {
      moment
    };
  },
  mounted() {},
  methods: {
    handleReply() {}
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped lang='less'>
.reply {
  box-sizing: border-box;
  width: 95%;
  background: #eee;
  margin: 0 auto;

  border: 1px solid #ccc;
}
.item-reply:hover a {
  display: block;
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
  padding: 5px 10px;
  a {
    opacity: 0;
  }
  a:hover {
    opacity: 1;
  }
}
</style>