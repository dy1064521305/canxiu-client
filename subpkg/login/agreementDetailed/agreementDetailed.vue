<template>
	<view class="agree-ment">
		<rich-text :nodes="content"></rich-text>
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
			console.log(options);
			getAgreement().then(res => {
				console.log(res);
				res.data.forEach(info => {
					if (info.agreementName == options.name) {
						this.content = info.remark
					}
				})
			})
		},
		methods: {
		}

	}
</script>

<style lang="scss" scoped>
.agree-ment{
	padding: 20rpx;
}
</style>
