<template>
  <view class="mobile-item-container">
    <u--form ref="form1" labelPosition="left">
      <u-form-item label="标题" prop="noticeTitle" borderBottom>
        <u--textarea v-model="notice.noticeTitle" placeholder="请输入标题" :count="true" :maxlength="30" :autoHeight="true" confirmType="done"></u--textarea>
      </u-form-item>
      <u-form-item label="类型" prop="type" borderBottom>
        <u-radio-group v-model="notice.type" size="36rpx">
          <u-radio shape="circle" label="通知" name="1" checked></u-radio>
          <u-radio shape="circle" label="公告" name="2"></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="正文" prop="noticeContent">
        <u--textarea v-model="notice.noticeContent" placeholder="请输入标题" :count="true" :maxlength="600" confirmType="done"></u--textarea>
      </u-form-item>
    </u--form>
    <u-button text="test" @click="click"></u-button>
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
  onShow () {
    this.noticeId = this.$route.query.id
    this.loadData()
  },
  methods: {
    loadData () {
      const app = this
      NoticeApi.noticeById(this.noticeId).then(res => {
        app.notice = res.data
      })
    },
    click () {
      uni.showToast({ title: 'xxx', durtion: 2000 })
    }
  }
}
</script>