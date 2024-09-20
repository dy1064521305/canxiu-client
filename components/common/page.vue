<template>
	<view>
		<slot></slot>
		<!-- 全局组件 登录 -->
		<LoginPop :inviteType="inviteType"></LoginPop>
	</view>
</template>

<script>
	import LoginPop from '@/components/popup/login.vue'
	export default {
		name: 'common-page',
		components: {
			LoginPop,
		},
		props: {
			inviteType: {
				type: Number,
				default: 0,
			},
		},
	}
</script>