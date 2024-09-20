<template>
	<view class="agree-ment">
		<div v-for="(url,i) in standardUrl" :key="i">
			<video :id="i" :src="url"  controls ></video>
		</div>
	
		<u-parse :content="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				standardUrl:[]
			};
		},
		onLoad(options) {

			let info = JSON.parse(decodeURIComponent(options.info))
			this.content=info.remark
			this.standardUrl=info.standardUrl!=null?info.standardUrl.split(','):[]
		},
		methods: {
		
		}

	}
</script>

<style lang="scss" scoped>
	.agree-ment {
		padding: 20rpx;

		/deep/.ql-size-huge {
			font-size: 64rpx;
		}

		/deep/.ql-size-small {
			font-size: 20rpx;
		}

		/deep/.ql-size-large {
			font-size: 40rpx;
		}
	}
</style>