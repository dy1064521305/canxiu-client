<template>

	<map-Point ref='maps'  @commitCheck="commitCheck" :mapKey='mapKey' :Radius='Radius' :showResetting='showResetting'
		:configData='configData' ></map-Point>
</template>
<script>
	export default {
		data() {
			return {
				mapKey: 'baf8fcab1589a647585720a44488917d',
				address: '',
				latitude: '',
				longitude: '',
				showResetting: true,
				Radius: '',
				// 微信公众号jsSdk配置
				configData: {
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: '', // 必填，公众号的唯一标识
					timestamp: '', // 必填，生成签名的时间戳
					nonceStr: '', // 必填，生成签名的随机串
					signature: '', // 必填，签名
				}
			};
		},
		onLoad(option) {
		
			let info=JSON.parse(option.info)
			this.longitude=info.longitude
			this.latitude=info.latitude
				console.log(this.latitude);
			
		},
		onReady() {
			this.$refs.maps.getData(this.latitude,this.longitude)	
		},
		methods: {
			commitCheck(e) {
				console.log(e, 565);
				if (!e.district||e.district==null) {
					e.district=e.city
				}
				if (!e.province) {
					e.province=e.city
				}
				const pages = uni.$u.pages()
				pages[pages.length - 2].$vm.commitCheck(e)
				uni.navigateBack()
			}
		}
	};
</script>