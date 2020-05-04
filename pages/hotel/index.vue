<template>
  <div class="container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
      <!-- {{$store.state.hotel.locationCity.city}} -->
    </el-breadcrumb>
    <!-- 地区筛选 -->
    <searchBar />
    <!-- 酒店条件筛选 -->
    <filterBar />
    <!-- 酒店列表 -->
    <keep-alive>
      <hotelList />
    </keep-alive>
  </div>
</template>

<script>
import searchBar from "@/components/hotel/searchBar";
import filterBar from "@/components/hotel/filterBar";
import hotelList from "@/components/hotel/hotelList";
export default {
  components: {
    searchBar,
    filterBar,
    hotelList
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  .el-breadcrumb {
    margin: 20px 0;
  }
}
</style>