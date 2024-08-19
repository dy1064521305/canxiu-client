<template>
	<view>
		<view class="header" :class="type" :style="{zIndex,backgroundColor: bgTop}">
			<view class="header-bg" :style="{backgroundColor: bg, backgroundImage: 'url('+ bgImg +')', opacity}"></view>
			<status-bar></status-bar>
			<view style="height: 88rpx;">
				<view class="header-wrapper acea-row row-middle" :style="{height: wrapH + 'px'}">
					<view class="acea-row row-middle" style="width:100%">
						<view :style="{width: align == 'center' ? mwith : '', height:'40px',lineHeight:'40px'}"
							style="display: flex; align-items: center;">
							<slot name="back">
								<u-icon name="arrow-left" v-if="!noBack" size="20" @click="$jump(-1)"></u-icon>
							</slot>
						</view>
						<view class="header-content acea-con acea-row row-middle" :class="'row-'+align"
							:style="{height: mheight}">
							<slot><text :style="{opacity: listenScroll ? opacity : 1 }">{{title}}</text></slot>
						</view>
						<view :style="{width: mwith, textAlign: 'right'}">
							<!-- #ifndef MP -->
							<slot name="right"></slot>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>

		</view>
		<status-bar v-if="!noBlank"></status-bar>
		<view v-if="!noBlank" class="header-blank"></view>
	</view>
</template>

<script>
	export default {
		name: 'Header',
		props: {
			type: {
				type: String,
				default: '',
			},
			noBlank: {
				type: Boolean,
				default: false,
			},
			noBack: {
				type: Boolean,
				default: false,
			},
			zIndex: {
				type: Number,
				default: 99,
			},
			title: {
				type: String,
				default: '',
			},
			bg: {
				type: String,
				default: '',
			},
			bgTop: {
				type: String,
				default: '',
			},
			bgImg: {
				type: String,
				default: '',
			},
			listenScroll: {
				type: Boolean,
				default: false,
			},
			scrollTop: {
				type: Number,
				default: 0,
			},
			offsetTop: {
				type: Number,
				default: 0,
			},
			align: {
				type: String,
				default: 'center',
			}
		},
		data() {
			return {
				mwith: '80px',
				mBtnWith: '40px',
				mheight: '32px',
				mtop: 0,
				hearderH: 44,
				wrapH: 44,
			}
		},
		computed: {
			opacity() {
				if (!this.listenScroll) return 1;
				if (!this.scrollTop) return 0;
				let h = this.offsetTop || this.hearderH;
				if (this.scrollTop > h) return 1;
				return Math.round(this.scrollTop / h * 10) / 10
			}
		},
		created() {
			// #ifdef MP
			const app = getApp();
			const m = app.globalData.menuRect;
			this.mwith = m.width + 'px';
			this.mBtnWith = m.width / 2 + 'px';
			this.mheight = m.height + 'px';
			let sTop = this.$store.state.safeAreaTop;
			let top = m.top - sTop;
			this.mtop = top + 'px';
			this.hearderH = m.top + m.height + top;
			this.wrapH = m.height + top * 2;
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		box-sizing: border-box;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		&.dark {
			color: #303133;
		}

		&.light {
			color: #fff;
		}

		.header-wrapper {
			height: 88rpx;
			padding: 0 20rpx 0 10rpx;
			position: relative;

			.icon-zuo {
				display: inline-block;
				font-size: 46rpx;
				// width: 100rpx;
				margin-right: 20rpx;
			}

			.header-content {
				font-size: 34rpx;
				text-align: center;
				// overflow: hidden;
			}
		}

		.header-bg {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
			background-repeat: no-repeat;
			background-color: #fff;
			background-size: 100% auto;
			opacity: 0;
		}
	}

	.header-blank {
		height: 88rpx;
	}
</style>