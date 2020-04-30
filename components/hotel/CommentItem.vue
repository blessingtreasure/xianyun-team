<template>
  <!-- last是否为最后一级评论 -->
  <div>
    <!-- <CommentItem v-if="item.followed[0]" :item="item.followed[0]" /> -->
    <div :class="['comment-list-item',item.parent?'nolast':'last']">
      <!-- <div :class="[item.parent?'container':'']"> -->
      <div class="avatar">
        <div class="avatar-user">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="" />
          <!-- {{ item.account.nickname }} -->
          <span>闲云用户</span>
          <!-- <span v-if="item.followed[0]"><i class="reply">回复</i> -->
            <!-- {{ item.parent.account.nickname }} -->
            <!-- 闲云用户 -->
          <!-- </span> -->
        </div>
        <div class="avatar-release-time">
          {{ item.created_at | formatDate }}
        </div>
      </div>
      <div class="comment-main">
        <p>{{ item.content }}</p>
        <!-- <div v-if="item.pics.length>0">
          <img v-for="(pic, index) in item.pics" :key="index" :src="pic" alt="">
        </div> -->
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/formatDate'
export default {
  name: 'CommentItem',
  filters: {
    formatDate
  },
  props: {
    item: {
      type: Object,
      default: () => { return {} }
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      src:'/images/user.png'
    }
  }
}
</script>

<style lang='less' scoped>

.comment-list-item{
    border-bottom: 1px #ddd dashed;
    // padding:15px 0 15px 20px;
    padding: 15px 0;
  .avatar{
      overflow: hidden;
      .avatar-user{
        float: left;
        font-size: 14px;
        img{
          width: 15px;
          height: 15px;
          border-radius: 50%;
          position: relative;
          top: 2px;
        }
        .reply{
          margin: 0 8px;
          color:#999;
        }
      }
      .avatar-release-time{
        float: right;
        color:#999;
        font-size:12px;
      }
    }
    .comment-main{
      padding-left: 20px;
      p{
        padding:12px 0;
      }
    }
  }
.nolast{
  margin-left: 20px;
}
.last{
    padding-left:0;
  }
</style>
