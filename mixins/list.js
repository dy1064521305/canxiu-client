export default {
	data() {
		return {
			list: [],
			where: {
				pageNum: 1,
			},
			loading: false,
			finished: false,
			costomReachBottom: false,
			customPullDown: false
		};
	},
	onReachBottom() {
		if (this.costomReachBottom) return;
		this.getList();
	},
	methods: {
		getList(reload) {
			if (reload == 1) {
				this.list = [];
				this.where.pageNum = 1;
				this.loading = false;
				this.finished = false;
			}
			if (this.loading || this.finished) return;
			this.loading = true;
			this.getListApi && this.getListApi().then((res) => {
				this.loading = false;
				let data = this.getResponeseData(res);
				console.log(res, "@");
				console.log(data, "@data");
				this.list.push.apply(this.list, data);
				if (data.length && res.total != data.length) {
					this.where.pageNum++;
				} else {
					this.finished = true;
				}
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 1000)
			}).catch(err => {
				this.$toast(err);
				this.loading = false;
				this.finished = true;
				uni.stopPullDownRefresh();
			})
		},
		getResponeseData(res) {
			return res.rows || [];
		}
	},
	onPullDownRefresh() {
		if (this.customPullDown) return;
		this.getList(1);
	}
};