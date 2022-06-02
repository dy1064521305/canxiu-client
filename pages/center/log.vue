<template>
  <view style="padding: 40rpx;">
    <view>
      <u-search placeholder="请输入查询内容" v-model="searchText" height="60rpx"></u-search>
    </view>
    <view>
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in logList" :key="index" class="log-item">
          <view><text style="color: #606266;">操作内容：</text><text>{{item.title}}</text></view>
          <view><text style="color: #606266;">请求地址：</text><text>{{item.operUrl}}</text></view>
          <view><text style="color: #606266;">操作地址：</text><text>{{item.operLocation}}</text></view>
          <view><text style="color: #606266;">操作时间：</text><text>{{item.operTime}}</text></view>
        </u-list-item>
      </u-list>
    </view>
  </view>
</template>

<script>
import * as LogApi from '@/api/center/log'

export default {
  data () {
    return {
      searchText: '',
      params: {
        pageNum: 1,
        pageSize: 10
      },
      logList: []
    }
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      const app = this
      LogApi.operLog(app.params).then(res => {
        app.logList = app.logList.concat(res.rows);
      })
    },
    scrolltolower () {
      this.loadData();
    }
  }
}
</script>

<style lang="scss" scoped>
.log-item {
  padding: 20rpx 0;
  border-bottom: 0.5px solid #ccc;
}
</style>