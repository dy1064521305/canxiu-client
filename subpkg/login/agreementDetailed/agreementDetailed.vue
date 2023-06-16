<template>
	<view class="agree-ment">
			<u-parse :content="content"></u-parse>
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
			this.content=JSON.parse(decodeURIComponent(options.remark))
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
