<template>
	<view>
		<slot></slot>
		<!-- 全局组件 登录 -->
		<LoginPop></LoginPop>
	</view>
</template>

<script>
	import LoginPop from '@/components/popup/login.vue'
	export default {
		name: 'common-page',
		components: {
			LoginPop,
		}
	}
</script>