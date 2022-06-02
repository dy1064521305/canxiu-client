<template>
  <view style="padding: 40rpx;">
    <view>
      <u-search placeholder="请输入查询内容" v-model="params.title" height="60rpx" @search="searchData" @custom="searchData"></u-search>
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
      params: {
        pageNum: 0,
        pageSize: 10,
        title: ''
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
      app.$store.dispatch('Info').then(res => {
        app.params.pageNum = app.params.pageNum + 1
        if (res.user) {
          app.params.operName = res.user.userName
        }
        LogApi.operLog(app.params).then(res => {
          app.logList = app.logList.concat(res.rows);
        })
      })
    },
    searchData () {
      this.params.pageNum = 0
      this.logList = []
      this.loadData();
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