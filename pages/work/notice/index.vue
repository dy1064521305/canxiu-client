<template>
  <view style="padding: 40rpx;">
    <u-list v-if="list.length > 0" @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index">
        <u-cell :isLink="true" :border="true">
          <u-avatar slot="icon" :bg-color="item.noticeType == 2 ? '#2979ff' : '#19be6b'" :text="item.noticeType == 2 ? '公' : '通'" size="80rpx" fontSize="50" shape="square"></u-avatar>
          <view slot="title" style="font-size: 36rpx; font-weight: bold;">{{item.noticeTitle}}</view>
          <view slot="label" style="display: flex;">
            <u-icon name="clock"></u-icon>
            <text>{{item.createTime}}</text>
          </view>
        </u-cell>
      </u-list-item>
    </u-list>
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