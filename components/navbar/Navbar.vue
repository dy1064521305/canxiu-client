<template>
  <block v-if="isShow()">
    <view v-if="hideBtn" class="u-navbar" :style="{ backgroundColor: bgColor, textAlign: 'center' }">
      <view class="u-navbar__placeholder" :style="{ height: barHeight}">
        <view :class="[fixed && 'u-navbar--fixed']">
          <u-status-bar v-if="safeAreaInsetTop" :bgColor="bgColor"></u-status-bar>
          <view class="u-navbar__content" :class="[border && 'u-border-bottom']" :style="{ height: contentHeight, backgroundColor: bgColor }">
            <view class="u-navbar__content__left" hover-class="u-navbar__content__left--hover" hover-start-time="150">
              <text class="u-line-1 u-navbar__content__title" :style="[{ width: $u.addUnit(titleWidth)}, { height: contentHeight, lineHeight: contentHeight, margin: '0 auto' }, $u.addStyle(titleStyle)]">
                {{ title }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-navbar v-else :title="title" :autoBack="autoBack" :placeholder="true" :bgColor="bgColor"></u-navbar>
  </block>
</template>

<script>
import props from './props.js';
/**
 * Navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @tutorial https://www.uviewui.com/components/navbar.html
 * @property {Boolean}			safeAreaInsetTop	是否开启顶部安全区适配  （默认 true ）
 * @property {Boolean}			placeholder			固定在顶部时，是否生成一个等高元素，以防止塌陷 （默认 false ）
 * @property {Boolean}			fixed				导航栏是否固定在顶部 （默认 false ）
 * @property {Boolean}			border				导航栏底部是否显示下边框 （默认 false ）
 * @property {String}			leftIcon			左边返回图标的名称，只能为uView自带的图标 （默认 'arrow-left' ）
 * @property {String}			leftText			左边的提示文字
 * @property {String}			rightText			右边的提示文字
 * @property {String}			rightIcon			右边返回图标的名称，只能为uView自带的图标
 * @property {String}			title				导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String}			bgColor				导航栏背景设置 （默认 '#ffffff' ）
 * @property {String | Number}	titleWidth			导航栏标题的最大宽度，内容超出会以省略号隐藏 （默认 '400rpx' ）
 * @property {String | Number}	height				导航栏高度(不包括状态栏高度在内，内部自动加上)（默认 '44px' ）
 * @property {String | Number}	leftIconSize		左侧返回图标的大小（默认 20px ）
 * @property {String | Number}	leftIconColor		左侧返回图标的颜色（默认 #303133 ）
 * @property {Boolean}	        autoBack			点击左侧区域(返回图标)，是否自动返回上一页（默认 false ）
 * @property {Object | String}	titleStyle			标题的样式，对象或字符串
 * @property {Boolean}			h5Show				是否在h5模式下显示 （默认 false ）
 * @property {Boolean}			hideBtn				是否隐藏返回按钮 （默认 false ）
 * @event {Function} leftClick		点击左侧区域
 * @event {Function} rightClick		点击右侧区域
 */
export default {
  mixins: [props],
  props: {
    h5Show: Boolean,
    hideBtn: Boolean,
  },
  data () {
    return {
      systemInfo : this.$store.getters.getSystemInfo,
      statusBarHeight: uni.$u.addUnit(uni.$u.getPx(this.height) + uni.$u.sys().statusBarHeight, 'px'),
      contentHeight: uni.$u.addUnit(this.height)
    }
  },
  methods: {
    isShow () {
      if (this.systemInfo.uniPlatform == 'web') {
        return this.h5Show
      }
      return true;
    }
  }
}
</script>