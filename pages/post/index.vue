<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <div class="grid-content bg-purple">左侧组件</div> -->
        <SideBar />
      </el-col>
      <el-col :span="18">
        <div>
          <PostList />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SideBar from "@/components/post/sideBar";
import PostList from "@/components/post/postList";
export default {
  components: {
    SideBar,
    PostList
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
</style>