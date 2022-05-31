<template>
  <view style="padding: 20rpx;">
    <u--form :model="userInfo" ref="uForm" labelWidth="160rpx" labelAlign="left">
			<u-form-item label="姓名" prop="name" class="u-border-bottom">
				<u--input
          placeholder="请输入内容"
          border="none"
          v-model="userInfo.name"
        ></u--input>
			</u-form-item>
      <u-form-item label="性别" prop="name" class="u-border-bottom">
				<u--input
          placeholder="请输入内容"
          border="none"
          v-model="userInfo.name"
        ></u--input>
			</u-form-item>
      <u-form-item label="出生日期" prop="name" class="u-border-bottom">
				<u--input
          placeholder="请输入内容"
          border="none"
          v-model="userInfo.name"
        ></u--input>
			</u-form-item>
		</u--form>
  </view>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  }
}
</script>

<style lang="sass" scoped>

</style>