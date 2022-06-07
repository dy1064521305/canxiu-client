<template>
  <view class="page-container">
    <view v-if="list.length > 0">
      <u-cell v-for="(item, index) in list" :key="index" :isLink="true" :border="true" @click="toDetail(item.noticeId)">
        <u-avatar slot="icon" :bg-color="item.noticeType == 2 ? '#2979ff' : '#19be6b'" :text="item.noticeType == 2 ? '公' : '通'" size="80rpx" fontSize="50" shape="square"></u-avatar>
        <view slot="title" style="font-size: 30rpx; font-weight: bold;">{{item.noticeTitle}}</view>
        <view slot="label" style="display: flex; font-size: 12px; color: #909399;">
          <u-icon name="clock" size="12"></u-icon>
          <text>{{item.createTime}}</text>
        </view>
      </u-cell>
    </view>
    <u-empty v-else></u-empty>
  </view>
</template>

<script>
import * as NoticeApi from '@/api/work/notice'
import uIcon from '@/uni_modules/uview-ui/components/u-icon/u-icon.vue'

export default {
  components: { uIcon },
  data () {
    return {
      params: {
        pageNum: 0,
        pageSize: 10
      },
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    // 加载通知公告数据
    loadData () {
      const app = this
      this.params.pageNum += 1;
      NoticeApi.noticeList(this.params).then(res => {
        app.list = res.rows;
      })
    },
    // 滚动分页加载数据
    scrolltolower () {
      this.loadData();
    },
    toDetail (noticeId) {
      uni.navigateTo({ url: '/pages/work/notice/detail?id=' + noticeId })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  padding: 20rpx 0;
  border-bottom: 0.5px solid #ccc;
}
</style>