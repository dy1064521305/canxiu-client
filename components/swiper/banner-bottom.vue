<template>
	<view v-if="banner.length" class="swiper" :class="dotStyle" :style="sty">
		<swiper :autoplay="banner.length > 1" style="height: 100%" :circular="circular"
			@change="onSwiperChange">
			<swiper-item v-for="(item, index) in list" :key="index" @click.navtive="onTap(item, index)">
				<image :src="item.pic" class="image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		
		<view v-if="list && list.length > 1" class="swiper-indicator" :class="dotStyle" :style="{bottom: dotBottom}">
			<text v-for="(item, index) in list.length" :key="index" class="swiper-dot" :class="{'swiper-active-dot': current == index}"></text>
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
			sty: {
				type: String,
				default: '',
			},
			h: {
				type: String,
				default: '',
			},
			circular: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				height: '',
				current: 0,
			}
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
		methods: {
			onTap(item, index) {
				this.$emit('tap-banner', {
					item,
					index
				})
			},
			onSwiperChange(e) {
				let index = e.detail.current;
				this.current = index;
				let item = this.banner[index];
				this.$emit('change', {
					item,
					index
				});
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
			position: absolute;
			bottom: 0;
			left: 0;
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
</style>