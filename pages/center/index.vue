<template>
	<view class="">
		我的
    <u-button text="退出" @click="logout"></u-button>
	</view>
</template>

<script>
export default {
  methods: {
    logout () {
      const app = this
      app.$store.dispatch('Logout').then(res => {
        uni.reLaunch({
          url: '/'
        })
      })
    }
  }
}
</script>

<style>
</style>