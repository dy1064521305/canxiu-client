<template>
	<view class="video-container">
		<video style="width:100%;height:100%" :id="'video-'+id" :ref="'video-'+id" :src="src" @loadedmetadata="canPlay"
			controls :show-fullscreen-btn="false" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				id: uni.$u.guid(),
				videoEle: null
			};
		},
		onLoad(options) {
			this.src = options.src
		},
		methods: {
			canPlay() {
				this.videoEle = uni.createVideoContext('video-' + this.id, this)
				this.videoEle.play()
			}
		}
	}
</script>

<style lang="scss">
	.video-container {
		width: 100vw;
		height: 100vh
	}
</style>
