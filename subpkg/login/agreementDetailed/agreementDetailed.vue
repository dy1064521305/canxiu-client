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
	/deep/.ql-size-huge{
		font-size: 64rpx;
	}
	/deep/.ql-size-small{
		font-size: 20rpx;
	}
	/deep/.ql-size-large{
		font-size: 40rpx;
	}
}
</style>
