<template>
  <block v-if="isShow()">
    <view v-if="hideBtn" class="u-navbar" :style="{ backgroundColor: bgColor, textAlign: 'center' }">
      <view class="u-navbar__placeholder" :style="{ height: barHeight}">
        <view :class="[fixed && 'u-navbar--fixed']">
          <u-status-bar
            v-if="safeAreaInsetTop"
            :bgColor="bgColor"
          ></u-status-bar>
          <view
            class="u-navbar__content"
            :class="[border && 'u-border-bottom']"
            :style="{
              height: contentHeight,
              backgroundColor: bgColor,
            }">
            <view
              class="u-navbar__content__left"
              hover-class="u-navbar__content__left--hover"
              hover-start-time="150"
            >
              <text
                class="u-line-1 u-navbar__content__title"
                :style="[{ width: $u.addUnit(titleWidth)}, { height: contentHeight, lineHeight: contentHeight, margin: '0 auto' }, $u.addStyle(titleStyle)]"
              >{{ title }}</text>
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