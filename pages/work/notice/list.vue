<template>
  <view class="mobile-item-container">
    <Navbar title="通知公告" bgColor="#fff" :hideBtn="true" :h5Show="false"></Navbar>
    <view style="border-radius: 8px; background-color: #f4f4f5; padding: 8px 16px; display: flex; flex-direction: row; flex-wrap: wrap; align-items: center;">
      <text>共有 2 条通知，未读 </text>
      <u-tag text="2" size="mini" type="warning"></u-tag>
      <text>条。</text>
    </view>

    <view v-if="list.length > 0">
      <u-cell v-for="(item, index) in list" :key="index" :isLink="true" :border="true" @click="toDetail(item.noticeId)">
        <u-avatar slot="icon" :bg-color="item.noticeType == 2 ? '#2979ff' : '#19be6b'" :text="item.noticeType == 2 ? '公' : '通'" shape="square"></u-avatar>
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
import Navbar from '@/components/navbar/Navbar'
import uIcon from '@/uni_modules/uview-ui/components/u-icon/u-icon.vue'

export default {
  components: {
    Navbar,
    uIcon
  },
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