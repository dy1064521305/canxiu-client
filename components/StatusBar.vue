<template>
	<view :style="{height: height + 'px', background: bg}"></view>
</template>

<script>
	export default {
		name: 'StatusBar',
		props: {
			bg: String,
			type: {
				type: String,
				default: 'top'
			}
		},
		data() {
			// return {
			// 	safeArea: uni.getSystemInfoSync().safeAreaInsets
			// }
			const {safeAreaInsets, statusBarHeight} = uni.getSystemInfoSync();
			return {
				top: safeAreaInsets.top || statusBarHeight,
				bottom: safeAreaInsets.bottom
			}
		},
		computed: {
			// height() {
			// 	return this.type == 'bottom' ? this.safeArea.bottom : this.safeArea.top
			// }
			height() {
				return this.type == 'bottom' ? this.bottom : this.top
			}
		}
	}
</script>