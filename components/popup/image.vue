<template>
	<Popup :show="show" @tap-mask="maskCLose">
		<template #wrapper>
			<view class="pop-wrapper" :style="{ width,top:showStyleTop}">
				<image v-if="img" class="pop-img" :class="{one:showStyle}" :src="img" show-menu-by-longpress
					mode="widthFix" @click="tapHandler" @load="loadImg">
				</image>
				<image v-if="!hideClose" class="pop-close" src="/static/image/icon/close.png" @click="$emit('close')">
				</image>
				<slot></slot>
			</view>
		</template>
	</Popup>
</template>

<script>
	import Popup from '@/components/popup/center.vue'

	export default {
		name: 'PopupImage',
		components: {
			Popup
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			img: String,
			url: String,
			hideClose: {
				type: Boolean,
				default: false
			},
			width: {
				type: String,
				default: '540rpx'
			},
			showStyle: {
				type: Boolean,
				default: false
			},
			// 图片上移
			showStyleTop: {
				type: String,
				default: '0rpx'
			},
		},
		data() {
			return {

			}
		},
		methods: {
			loadImg(e) {
				// console.log(e);
				if (e) {
					this.$emit('imgLoad', e);
				}
			},
			maskCLose() {
				this.$emit('tap-mask');
			},
			tapHandler() {
				if (this.url) return this.$jump(this.url);
				this.$emit('tap-img');
			}
		}
	}
</script>

<style scoped lang="scss">
	.pop-wrapper {
		position: relative;
	}

	.pop-img {
		display: block;
		width: 100%;
		margin: auto;

		&.one {
			-webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
			animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
		}
	}

	@-webkit-keyframes scale-in-center {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 1;
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes scale-in-center {
		0% {
			-webkit-transform: scale(0);
			transform: scale(0);
			opacity: 1;
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}


	.pop-close {
		display: block;
		width: 80rpx;
		height: 80rpx;
		margin: 60rpx auto 0;
	}
</style>