<template>
  <view class="mobile-item-container">
    <u--form ref="form1" labelPosition="left">
      <u-form-item label="标题" prop="noticeTitle" borderBottom>
        <u--textarea v-model="notice.noticeTitle" placeholder="请输入标题" :count="false" :maxlength="30" :autoHeight="true" confirmType="done"></u--textarea>
      </u-form-item>
      <u-form-item label="状态" prop="status" borderBottom>
        <u-radio-group v-model="notice.status">
          <u-radio shape="circle" label="正常" name="0" checked></u-radio>
          <u-radio shape="circle" label="关闭" name="1"></u-radio>
        </u-radio-group>
      </u-form-item>
      <u-form-item label="正文" prop="noticeContent">
        <u--textarea v-model="notice.noticeContent" placeholder="请输入标题" :count="true" :maxlength="600" confirmType="done"></u--textarea>
      </u-form-item>
    </u--form>
    <u-action-sheet :actions="actions" :title="actionTitle" :show="actionShow"></u-action-sheet>
    <u-row :gutter="16">
      <u-col :span="6">
        <u-button type="error" text="删除" @click="del"></u-button>
      </u-col>
      <u-col :span="6">
        <u-button type="primary" text="提交" @click="submit"></u-button>
      </u-col>
    </u-row>
  </view>
</template>

<script>
import * as NoticeApi from '@/api/work/notice'

export default {
  data () {
    return {
      noticeId: undefined,
      notice: {},
      actionShow: false,
      actions: [],
      actionTitle: ''
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
    del () {
      NoticeApi.noticeDelete(this.noticeId).then(res => {
        uni.showToast({ title: '保存成功！' })
      })
    },
    submit () {
      NoticeApi.noticeModify(this.notice).then(res => {
        uni.showToast({ title: '提交成功！' })
      })
    }
  }
}
</script>