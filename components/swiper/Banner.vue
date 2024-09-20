<template>
	<view v-if="banner.length" class="swiper" :class="dotStyle" :style="sty">
		<swiper :autoplay="banner.length > 1" :style="height?'height:'+height+'px':h?'height:'+h:''"
			@change="onSwiperChange" :current="current">
			<swiper-item v-for="(item, index) in list" class="swiper-img" :key="index"
				@click.navtive="onTap(item, index)">
				<image :src="item.pic" class="image" mode="widthFix" @load="onImageLoad($event, index)">
				</image>
			</swiper-item>
		</swiper>
		<view v-if="list && list.length > 1" class="swiper-indicator" :class="dotStyle" :style="{bottom: dotBottom}">
			<text v-for="(item, index) in list.length" :key="index" class="swiper-dot"
				:class="{'swiper-active-dot': current == index}"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Banner',
		props: {
			banner: {
				type: Array,
				default () {
					return [];
				},
			},
			imgKey: {
				type: String,
				default: ''
			},
			dotStyle: {
				type: String,
				default: 'none'
			},
			dotBottom: {
				type: String,
				default: '12rpx'
			},
			// 纵横比 宽：高
			rate: {
				type: String,
				default: '',
			},
			sty: {
				type: String,
				default: '',
			},
			h: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				swiperWidth: '',
				initHeight: 0,
				height: '',
				bannerInfo: [],
				bannerHeights: [],
				current: 0,
			}
		},
		watch: {
			banner(val, oVal) {
				if (val != oVal) {
					this.current = 0;
				}
			},
		},
		computed: {
			showDots() {
				if (!this.banner.length || this.banner.length < 2) return false;
				if (['circular', 'square'].indexOf(this.dotStyle) === -1) return false;
				return true;
			},
			list() {
				return this.banner.map(item => {
					if (!this.imgKey) {
						return {
							pic: item
						}
					} else {
						item['pic'] = item[this.imgKey]
					}
					return item;
				})
			}
		},
		mounted() {
			if (this.h) {
				return
			}
			setTimeout(() => {
				let query = uni.createSelectorQuery().in(this);
				query.select(".swiper").boundingClientRect();
				query.exec((res) => {
					if (res && res[0]) {
						if (res[0].width) {
							this.swiperWidth = res[0].width;
							if (!this.rate) {
								this.setBannerHeight();
							}
						}

						if (this.rate && this.rate.indexOf(':') > 0) {
							let rate = this.rate.split(':');
							let h = this.getHeightByRate(rate[0], rate[1]);
							this.initHeight = h;
							this.height = h;
						}
					}
				});
			}, 300)
		},
		methods: {
			onTap(item, index) {
				this.$emit('tap-banner', {
					item,
					index
				})
			},
			getHeightByRate(w, h) {
				return Math.round(this.swiperWidth * h / w);
			},
			onImageLoad(e, index) {
				if (this.rate || this.h) {
					return;
				}
				this.$set(this.bannerInfo, index, e.detail);
				this.setBannerHeight();
			},
			setBannerHeight() {
				let arr = this.bannerInfo;
				for (let i = 0; i < arr.length; i++) {
					let banner = arr[i];
					if (!this.swiperWidth || !banner || !banner.width || !banner.height) {
						continue;
					}
					if (banner.bannerHeight) {
						continue;
					}
					let h = this.getHeightByRate(banner.width, banner.height);

					this.bannerHeights[i] = h;
					if (i == 0 && h) {
						this.height = h;
					}
				}
			},
			onSwiperChange(e) {
				let index = e.detail.current;
				this.current = index;
				let item = this.banner[index];
				this.$emit('change', {
					item,
					index
				});
				if (this.rate || this.h) {
					return;
				}
				let bannerHeight = this.bannerHeights[index];
				if (bannerHeight) {
					this.height = bannerHeight;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		position: relative;
		overflow: hidden;

		swiper {
			-webkit-transition: height 0.1s;
			transition: height 0.1s;
		}

		.image {
			display: block;
			width: 100%;

			&.fill {
				height: 100%;
			}
		}

		.swiper-indicator {
			width: 100%;
			position: absolute;
			bottom: 12rpx;
			left: 0;
			margin: auto;
			text-align: center;

			.swiper-dot {
				display: inline-block;
				width: 8rpx;
				height: 8rpx;
				margin-left: 10rpx;
				border-radius: 4rpx;
				background-color: rgba(0, 0, 0, 0.14);

				&.swiper-active-dot {
					background-color: #fff;
				}

				&:first-of-type {
					margin-left: 0;
				}
			}

			// 方形指示点
			&.square {
				.swiper-dot {
					&.swiper-active-dot {
						width: 20rpx !important;
					}
				}
			}
		}

	}

	.swiper-img {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
</style>