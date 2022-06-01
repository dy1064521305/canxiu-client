<template>
  <view style="padding: 40rpx;">
    <u-subsection :list="list" :current="current"></u-subsection>
    <view>
      <u-list @scrolltolower="loadData">
        <u-list-item v-for="(item, index) in logList" :key="index" class="log-item">
          <view>操作内容: {{item.title}}</view>
          <view>请求地址: {{item.operUrl}}</view>
          <view>请求参数： {{item.params}}</view>
          <view>操作地址: {{item.operLocation}}</view>
          <view>操作时间: {{item.operTime}}</view>
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
      list: [{ name: '今日' }, { name: '近7日' }, { name: '全部' }],
      current: 0,
      logList: []
    }
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      const app = this
      LogApi.operLog().then(res => {
        app.logList = app.logList.concat(res.rows);
      })
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