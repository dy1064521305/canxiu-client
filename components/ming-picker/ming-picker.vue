<template>
	<view>
		<picker class="address-picker" mode="multiSelector" :range="[province, city, area]" :value="value"
			@change="changeHandler" @cancel="close" @columnchange="columnchange">
			<slot></slot>
		</picker>
	</view>
</template>

<script>
	export default {
		props: {
			defaultAddress: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				addressData:[],
				// province: addressData.map(it => it.name),
				// city: addressData[0].children.map(it => it.name),
				// area: addressData[0].children[0].children.map(it => it.name),
				province: [],
				city: [],
				area:[],
				value: [0, 0, 0]
			};
		},
		created() {
			var that=this
			uni.request({
				url: 'https://hzcxkj.oss-cn-hangzhou.aliyuncs.com/6cfc99b225184b0eafbed58cd5c6ede5.json',
				method: 'GET',
				complete(res) {
					 console.log('...res...', res);
					// console.log(res.data);
					
					that.addressData=res.data
					console.log(that.addressData,'11111111111');
					
					that.province=that.addressData.map(it => it.name)
					that.city=that.addressData[0].children.map(it => it.name)
					that.area=that.addressData[0].children[0].children.map(it => it.name)
					that.onAttached();
				}
			})
			//this.onAttached();
		},
		methods: {
			onAttached() {
				const address = this.defaultAddress;
				if (address[0]) {
					// 如果有初始值，则需要初始地址
					const filter = (index) => (index > -1 ? index : 0);
					const currentProvince = filter(this.addressData.findIndex(it => it.name === address[0]));
					const currentCity = filter(this.addressData[currentProvince].children.findIndex(it => it.name === address[
						1]));
					const currentArea = filter(this.addressData[currentProvince].children[currentCity].children.findIndex(it =>
						it.name === address[2]));
					const city = this.addressData[currentProvince].children;
					const area = this.addressData[currentProvince].children[currentCity].children;
					this.value = [currentProvince, currentCity, currentArea];
					this.city = city.map(it => it.name);
					this.area = area.map(it => it.name);
					this.address = [this.addressData[currentProvince].name, city[currentCity].name, area[currentArea].name];
				}
			},
			changeHandler() {
				let value1 = this.getAddress(...this.value),
					value = this.getCode(...this.value)
					console.log(value);
				this.$emit("address", {
					value1,
					value,
					data: {
						[value1[0]]: value1[0],
						[value1[1]]: value1[1],
						[value1[2]]: value1[2],
					}
				})
			},
			close() {
				this.$emit("close", {})
			},
			getAddress(p, c, a) {
				const {
					province,
					city = [],
					area = []
				} = this;
				return [province[p], city[c] || '', area[a] || ''];
			},
			getCode(p, c, a) {
				let province = this.addressData.map(it => it.code),
					city = this.addressData[p].children.map(it => it.code),
					area = this.addressData[p].children[c].children.map(it => it.code)
				return [province[p], city[c] || 0, area[a] || 0];
			},
			columnchange(e) {
				// wx.showLoading({ mask: true });
				const {
					column,
					value: index
				} = e.detail;
				if (column === 0) {
					// 省份变了
					this.city = this.addressData[index].children.map(it => it.name);
					this.area = this.addressData[index].children[0].children.map(it => it.name);
					this.value = [index, 0, 0];
				} else if (column === 1) {
					// 城市变了
					const currentProvince = this.value[0];
					this.area = this.addressData[currentProvince].children[index].children.map(it => it.name);
					this.value = [currentProvince, index, 0];
				} else {
					const value = this.value;
					value[2] = index;
					this.value = value;
				}
			}
		}
	}
</script>

<style scoped>

</style>
