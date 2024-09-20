<template>
	<view v-if="list.length">
		<swiper :autoplay="true" :interval="3000" :duration="1000" @change="onSwiperChange"
			:style="{height: swiperHeight + 'px'}">
			<swiper-item v-for="(item, index) in imgList" :key="index">
				<image :src="item.img" mode="widthFix" :style="{width: imgWidth + 'px'}"
					@load="onImageLoad($event, index)" @click="onTapItem(item.url)">
				</image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	const {
		windowWidth
	} = uni.getSystemInfoSync();
	import {
		jumpUrl
	} from '@/utils/index.js'

	export default {
		name: 'swiper-banner',
		props: {
			list: {
				type: Array,
				default: () => []
			},
			imgKey: {
				type: String,
				default: ''
			},
			imgWidth: {
				type: String | Number,
				default: windowWidth
			},
			onTapItem: {
				type: Function,
				default: (url) => {
					jumpUrl(url)
				}
			}
		},
		data() {
			return {
				current: 0,
				imgListHeight: []
			}
		},
		computed: {
			imgList() {
				return this.list.map(item => {
					if (!this.imgKey) return {
						img: item
					}
					return {
						img: item[this.imgKey],
						url: item.url
					}
				});
			},
			swiperHeight() {
				if (!this.imgListHeight.length) return 0;
				return this.imgListHeight[this.current] || 0
			}
		},
		mounted() {

		},
		methods: {
			onImageLoad(e, index) {
				if (!this.imgListHeight[index]) {
					const {
						height,
						width
					} = e.detail
					let h = this.imgWidth * height / width;
					this.$set(this.imgListHeight, index, Math.floor(h));
				}
			},
			onSwiperChange(e) {
				this.current = e.detail.current
			}
		}
	}
</script>