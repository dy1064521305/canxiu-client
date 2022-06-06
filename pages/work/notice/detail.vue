<template>
  <view style="padding: 40rpx;">
    <view style="font-size: 60rpx; font-weight: bold;">{{notice.noticeTitle}}</view>
    <view style="display: flex;">
      <u-icon name="clock"></u-icon>
      <text>{{notice.createTime}}</text>
      <u-icon name="account"></u-icon>
      <text>{{notice.remark}}</text>
    </view>
    <view style="margin-top: 40rpx;">
      <u-parse :content="notice.noticeContent"></u-parse>
    </view>
  </view>
</template>

<script>
import * as NoticeApi from '@/api/work/notice'

export default {
  data () {
    return {
      noticeId: undefined,
      notice: {}
    }
  },
  created () {
    this.noticeId = this.$route.query.id
    this.loadData()
  },
  methods: {
    loadData () {
      const app = this
      NoticeApi.noticeById(this.noticeId).then(res => {
        app.notice = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>