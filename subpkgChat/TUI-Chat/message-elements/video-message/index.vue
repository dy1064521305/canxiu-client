<template>
	<view :class="'video-box ' + (isMine ? 'my-video' : '')" @click="playerHander">
		<image class="video-icon" src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/09/8497a3a9554a4271bc432a4bf491172a.png"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isPlay: false,
			videoIcon: 'http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/06/09/8497a3a9554a4271bc432a4bf491172a.png'
		};
	},

	components: {},
	props: {
		message: {
			type: Object,
			default: () => {}
		},
		isMine: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		message: {
			handler: function(newVal) {
				this.setData({
					message: newVal
				});
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		playerHander() {
			uni.$emit('videoPlayerHandler', {
				isPlay: true,
				message: this.message
			});
		},
		stopHander() {
			this.isPlay = false;
		}
	}
};
</script>
<style>
@import './index.css';
</style>
