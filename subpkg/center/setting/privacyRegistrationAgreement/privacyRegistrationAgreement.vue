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
			
			let info=JSON.parse(decodeURIComponent(options.info))
			console.log(info);
			this.content=info.content
			uni.setNavigationBarTitle({
				title:info.name
			})
		},
		methods: {
		}

	}
</script>

<style>
	page{
		
		background-color: #fff;
	}
</style>
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
