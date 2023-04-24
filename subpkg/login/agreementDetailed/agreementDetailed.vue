<template>
	<view class="agree-ment">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	import {
		getAgreement
	} from '@/api/login.js'
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(options) {
			console.log(options);
			this.content=options.remark
		},
		methods: {
		}

	}
</script>

<style lang="scss" scoped>
.agree-ment{
	padding: 20rpx;
}
</style>
