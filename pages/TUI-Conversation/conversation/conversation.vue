<template>
	<view class="container-conversation">
		<view v-if="!isLogin" style="padding-top: 330rpx;">
			<u-empty mode="permission" icon="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/04/99b6e40d11194c5bae53b199773db5b6.png" text="您还未登录">
			</u-empty>
			<view class="btns">
				<view @click="quxiao">
					取消
				</view>
				<view @click="login">
					去登录
				</view>
			</view>
		</view>
		<view v-else class="">
			<view class="scroll-box">
				<view class="uni-list margintop-bar">
					<view v-for="item in conversationList" :key="item.conversationID" @tap="handleRoute(item.conversationID)">
						<TUI-conversation-item :data-type="item.type" :conversation="item"></TUI-conversation-item>
					</view>
				</view>
			</view>
			<view class="bottom-back">
				<view class="bottom-area">
					<view v-if="showSelectTag" class="conversation-bubble" @tap.stop="handleEditToggle">
						<view v-for="(item, index) in array" :key="index" class="picker" :data-name="item.name" @tap="handleOnTap">{{ item.name }}</view>
					</view>
					<image @tap="showMore" class="btn-show-more" src="/static/static/assets/add.svg"></image>
					<view @tap="learnMore" class="im-link">了解更多IM功能</view>
				</view>
			</view>
		</view>
	</view>
</template>
<!-- 这里有个加载的补丁逻辑待优化，页面向SDK请求conversationList的时候会有时延，
造成页面的一个抖动，这里加一个if逻辑打一个补丁，后续继续优化 -->
<script>
import logger from '../../../utils/logger';
import TUIConversationItem from '../../../components/tui-conversation/conversation-item/index';
import TUIMessageList from '../../../components/tui-chat/message-list/index';

import { accountQueryState } from '@/api/tim.js'
import storage from '@/utils/storage'
import {
		getUserSig
	} from '@/api/tim.js'
	
export default {
	data() {
		return {
			isLogin: false,
			conversationList: [],
			showSelectTag: false,
			array: [
				{
					name: '发起会话'
				},
				{
					name: '发起群聊'
				},
				{
					name: '加入群聊'
				}
			]
		};
	},

	components: {
		TUIConversationItem,
		TUIMessageList
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		// 登入后拉去会话列表
		this.getConversationList();
		uni.$TUIKit.on(uni.$TUIKitEvent.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
		
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {
		uni.$TUIKit.off(uni.$TUIKitEvent.SDK_READY, this.onConversationListUpdated);
	},
	onShow() {
		this.isLogin = storage.get('AccessToken');
		this.queryState();
		console.info('---------======================')
		console.info(this.conversationList)
		console.info('===============================')
	},
	methods: {
		
		queryState(){
			accountQueryState().then(res => {
				if(res.data.QueryResult[0].State == 'Offline' && this.isLogin != false){
					getUserSig().then(ress => {
						uni.$TUIKit.login({
							userID: res.data.QueryResult[0].To_Account,
							userSig: ress.msg
						}).then(function(imResponse) {
							if (imResponse.data.repeatLogin === true) {
								// 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
								console.log(imResponse.data.errorInfo);
							}
						}).catch((error) => {
							console.info(error)
						})
					})
				}
				
			})
		},
		//取消登录
		quxiao() {
			uni.switchTab({
				url: '/pages/home/index'
			})
		},
		//去登录
		login() {
			uni.navigateTo({
				url: '/pages/login/index'
			})
		},
		
		
		handleRoute(id) {
			const url = `../../TUI-Chat/chat?conversationID=${id}`;
			uni.navigateTo({
				url
			});
		},
		onConversationListUpdated(event) {
			logger.log('TUI-conversation | onConversationListUpdated  |ok');
			this.setData({
				conversationList: event.data
			});
		},

		getConversationList() {
			uni.$TUIKit.getConversationList().then(imResponse => {
				logger.log(`TUI-conversation | getConversationList | getConversationList-length: ${imResponse.data.conversationList.length}`);
				this.setData({
					conversationList: imResponse.data.conversationList
				});
			});
		},

		showMore() {
			this.setData({
				showSelectTag: !this.showSelectTag
			});
		},

		learnMore() {
			uni.navigateTo({
				url: '../../TUI-User-Center/webview/webview?url=https://cloud.tencent.com/product/im'
			});
		},

		handleOnTap(event) {
			this.setData(
				{
					showSelectTag: false
				},
				() => {
					switch (event.currentTarget.dataset.name) {
						case '发起会话':
							this.$createConversation();
							break;

						case '发起群聊':
							this.$createGroup();
							break;

						case '加入群聊':
							this.$joinGroup();

						default:
							break;
					}
				}
			);
		},

		goHomePage() {
			// uni.navigateTo 不能跳转到 tabbar 页面，使用 uni.switchTab 代替
			uni.switchTab({
				url: '/subpkgChat/TUI-Index/index'
			});
		},

		handleEditToggle() {
			this.setData({
				showSelectTag: false
			});
		},

		$createConversation() {
			uni.navigateTo({
				url: '/subpkgChat/create-conversation/create'
			});
		},

		$createGroup() {
			uni.navigateTo({
				url: '../../TUI-Group/create-group/create'
			});
		},

		$joinGroup() {
			uni.navigateTo({
				url: '../../TUI-Group/join-group/join'
			});
		}
	}
};
</script>
<style scoped>
@import './conversation.css';
.center-con {
		position: relative;
	}
.btns {
		display: flex;
		justify-content: space-evenly;
		margin: 50rpx auto;
		width: 63%;

		view {
			width: 180rpx;
			height: 60rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
		}

		view:first-child {
			background: #9FD6BA;
			color: #fff;
		}

		view:nth-child(2) {
			background: #FFFFFF;
			border: 4rpx solid #9FD6BA;
			color: #9FD6BA;
		}
	}
</style>
