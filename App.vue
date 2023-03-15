<script>
	export default {
		onLaunch() {
			// 加载系统信息
			this.$store.dispatch('SystemInfo')
		},
		onShow() {},
		onHide() {},
		globalData: {
			index: undefined // 默认参数 也可设置为空
		}
	}
</script>


<style>
	page {

		background: #F5F9FA;
	}
</style>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
</style>
