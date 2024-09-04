<template>
	<view>
		<canvas canvas-id="canvas" :style="{'width': width + 'px', 'height': height + 'px','background':'#ccc'}"
			style="position: fixed; left: -9999px; top: -9999px;"></canvas>
	</view>
</template>

<script>
	export default {
		name: "drawImage",
		props: {
			// 绘制图片的尺寸
			imageSize: {
				type: Object,
				default: () => {},
			},
			// canvas绘制的数据
			canvasData: {
				type: Array,
				default: () => [],
			},
			// 是否开始绘制
			isDraw: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				// 屏幕宽度
				screenWidth: 0,
				// canvas画布的宽度
				width: 0,
				// canvas画布的高度
				height: 0,
				// 当前图片放大倍数 - 清晰度
				count: 2,
			};
		},
		mounted() {
			// 这段代码主要是为了防止uni-app在app端IOS的问题，因为在IOS 画布过大可能会导致绘制空白 - 可以自行调整
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === 'ios') {
				this.count = 1.8;
			}
			// #endif
		},
		watch: {
			// 监听是否开始绘制
			isDraw: async function(newVal) {
				if (newVal) {
					this.getSystemInfo();
					this.getImageByCanvasData(this.canvasData);
				}
			}
		},
		methods: {
			/** 获取系统信息 */
			getSystemInfo() {
				const {
					screenWidth
				} = uni.getSystemInfoSync();

				this.width = this.imageSize.width * this.count;
				this.height = this.imageSize.height * this.count;
				this.screenWidth = screenWidth;
			},

			/**
			 * 通过数据绘制图片
			 * @param {array} data		canvas绘制的数组
			 * 格式：每一项的数据
			 * { type: 'rect',  attr: { color: '', x, y, width, height, radian_1, radian_2, radian_3, radian_4 } }
			 * { type: 'image', attr: { image: '', x, y, width, height, radian_1, radian_2, radian_3, radian_4 } }
			 * { type: 'text',  attr: { text: '', x, y, color, size, weight, writingMode } }
			 * */
			async getImageByCanvasData(data) {
				// 获取canvas上下文对象
				const context = uni.createCanvasContext("canvas", this);
				// 清空画布
				context.clearRect(0, 0, this.width * this.count, this.height * this.count);

				for (const item of data) {
					// 判断类型
					if (item.type === 'rect') {
						// 绘制圆边矩形
						this.drawRoundRectangular(
							context,
							item.attr.color,
							item.attr.x * this.count,
							item.attr.y * this.count,
							item.attr.width * this.count,
							item.attr.height * this.count,
							item.attr.radian_1 ? item.attr.radian_1 * this.count : 0,
							item.attr.radian_2 ? item.attr.radian_2 * this.count : -1,
							item.attr.radian_3 ? item.attr.radian_3 * this.count : -1,
							item.attr.radian_4 ? item.attr.radian_4 * this.count : -1
						);
					} else if (item.type === 'image' && item.attr.image) {
						// 绘制圆边图片
						await this.drawRoundImageToCanvas(
							context,
							item.attr.image,
							item.attr.x * this.count,
							item.attr.y * this.count,
							item.attr.width * this.count,
							item.attr.height * this.count,
							item.attr.radian_1 ? item.attr.radian_1 * this.count : 0,
							item.attr.radian_2 ? item.attr.radian_2 * this.count : -1,
							item.attr.radian_3 ? item.attr.radian_3 * this.count : -1,
							item.attr.radian_4 ? item.attr.radian_4 * this.count : -1
						);
					} else if (item.type === 'text' && item.attr.text) {
						// 绘制文本
						this.drawTextToCanvas(
							context,
							item.attr.text,
							item.attr.x * this.count,
							item.attr.y * this.count,
							item.attr.color,
							parseInt(item.attr.size ? item.attr.size * this.count : 16 * this.count),
							item.attr.weight,
							item.attr.writingMode ? item.attr.writingMode : 'initial'
						);
					}
				}

				// 绘制图片 
				context.draw(false, () => {
					uni.canvasToTempFilePath({
						canvasId: 'canvas',
						x: 0,
						y: 0,
						width: this.width,
						height: this.height,
						destWidth: this.width,
						height: this.height,
						success: res => {
							this.$emit("generateImageSuccessful", res.tempFilePath);
						},
					}, this);
				});
			},

			/**
			 * 绘制文本
			 * @param {string} context		Canvase的实例
			 * @param {string} text			文本内容
			 * @param {number} x			矩形的x坐标
			 * @param {number} y			矩形的y坐标
			 * @param {number} color		文本颜色
			 * @param {number} size			字体的大小
			 * @param {string} weight		字体的粗细
			 * @param {string} writingMode	字体的排列方式 - initial 水平  tb 垂直
			 * */
			drawTextToCanvas(context, text, x, y, color = '#000', size = 16, weight = '400', writingMode = 'initial') {
				context.fillStyle = color;
				context.font = `normal ${weight} ${size}px sans-serif`;
				if (writingMode === 'tb') {
					const temp = text.split("");
					for (let i = 0; i < temp.length; i++) {
						context.fillText(temp[i], x, i * size + y);
					}
				} else {
					// 判断是否有换行符
					const temp = text.split("\n");
					for (let i = 0; i < temp.length; i++) {
						context.fillText(temp[i], x, i * size + y + i * size * 0.2); // i * size * 0.2 增加换行的间距
					}
				}
			},

			/**
			 * 绘制圆边矩形
			 * @param {string} context	Canvase的实例
			 * @param {string} color	填充的颜色
			 * @param {number} x		矩形的x坐标
			 * @param {number} y		矩形的y坐标
			 * @param {number} width	矩形的宽度
			 * @param {number} height	矩形的高度
			 * @param {number} height	图片的高度
			 * @param {number} radian_1	弧度大小 - radian_1 右上 的弧度, 1个参数代表全部
			 * @param {number} radian_2	弧度大小 - radian_2 右下 的弧度
			 * @param {number} radian_3	弧度大小 - radian_3 左下 的弧度
			 * @param {number} radian_4	弧度大小 - radian_4 左上 的弧度
			 * */
			drawRoundRectangular(context, color, x, y, width, height, radian_1 = 0, radian_2 = -1, radian_3 = -1,
				radian_4 = -1) {
				context.save();
				this.drawRoundPath(context, x, y, width, height, radian_1, radian_2, radian_3, radian_4);
				context.setFillStyle(color);
				context.fill();
				context.restore();
			},

			/**
			 * 绘制圆角图片
			 * @param {string} context	Canvase的实例
			 * @param {string} image	图片地址
			 * @param {number} x		图片的x坐标
			 * @param {number} y		图片的y坐标
			 * @param {number} width	图片的宽度
			 * @param {number} height	图片的高度
			 * @param {number} radian_1	弧度大小 - radian_1 右上 的弧度, 1个参数代表全部
			 * @param {number} radian_2	弧度大小 - radian_2 右下 的弧度
			 * @param {number} radian_3	弧度大小 - radian_3 左下 的弧度
			 * @param {number} radian_4	弧度大小 - radian_4 左上 的弧度
			 * */
			async drawRoundImageToCanvas(context, image, x, y, width, height, radian_1 = 0, radian_2 = -1, radian_3 = -1,
				radian_4 = -1) {
				context.save();
				this.drawRoundPath(context, x, y, width, height, radian_1, radian_2, radian_3, radian_4);
				context.drawImage(await this.handleNetworkImgaeTransferTempImage(image), x, y, width, height);
				context.restore();
			},

			/**
			 * 绘制圆边路径
			 * @param {string} context	Canvase的实例
			 * @param {number} x		图片的x坐标
			 * @param {number} y		图片的y坐标
			 * @param {number} width	图片的宽度
			 * @param {number} height	图片的高度
			 * @param {number} radian_1	弧度大小 - radian_1 右上 的弧度, 1个参数代表全部
			 * @param {number} radian_2	弧度大小 - radian_2 右下 的弧度
			 * @param {number} radian_3	弧度大小 - radian_3 左下 的弧度
			 * @param {number} radian_4	弧度大小 - radian_4 左上 的弧度
			 * */
			drawRoundPath(context, x, y, width, height, radian_1 = 0, radian_2 = -1, radian_3 = -1, radian_4 = -1) {
				// 设置弧度
				radian_2 = radian_2 === -1 ? radian_1 : radian_2;
				radian_3 = radian_3 === -1 ? radian_1 : radian_3;
				radian_4 = radian_4 === -1 ? radian_1 : radian_4;

				// 创建路径 - 绘制带圆边的矩形
				context.beginPath();
				context.moveTo(x + width / 2, y);
				context.arcTo(x + width, y, x + width, y + height, radian_1);
				context.arcTo(x + width, y + height, x, y + height, radian_2);
				context.arcTo(x, y + height, x, y, radian_3);
				context.arcTo(x, y, x + width, y, radian_4);
				// 关闭路径 - 结束绘制
				context.closePath();
				context.strokeStyle = "transparent";
				context.stroke();
				context.clip();
			},

			/** 将网络图片变成临时图片 */
			handleNetworkImgaeTransferTempImage(url) {
				return new Promise(resolve => {
					if (url.indexOf('http') === 0) {
						uni.downloadFile({
							url,
							success: res => {
								resolve(res.tempFilePath);
							}
						});
					} else {
						resolve(url);
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">

</style>