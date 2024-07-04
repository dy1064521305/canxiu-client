<template>
	<view class="order-detail">
		<view class="status" @click="showStep=true">
			<view class="left">
				<view style="display: flex;">
					{{status}}
					<view style="margin-left:40rpx ;">
						<u-count-down v-if="info.orderStatus=='待接单'&&!pipeiStatus" :time="dateDiff" format="mm:ss"
							autoStart millisecond @change="onChange">
							<view class="time">
								<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
								<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
							</view>
						</u-count-down>
						<view v-if="pipeiStatus&&info.orderStatus!='待上门'&&info.orderStatus!='客户取消'"
							style="margin-top: -10rpx;">
							<u-loadmore status="loading" :loading-text="loadingText" />
						</view>
					</view>
				</view>
				<view>{{content}}<br />
					<text v-if="info.orderStatus=='待上门'">
						上门时间{{info.expectTime}}
					</text>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<image style="width:14rpx;height: 25rpx;"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
				</image>
			</view>
		</view>



		<view class="bg info">
			<view class="title">
				服务信息
			</view>
			<view class="line">
				<text class="ziduan">客户经理</text>
				<text>{{info.clientManager||""}} {{info.clientManagerPhone||''}}</text>
			</view>
			<view class="line">
				<text class="ziduan">下单人</text>
				<text>{{info.orderPerson||''}} {{info.orderPersonPhone}}</text>
			</view>
			<view class="line">
				<text class="ziduan">服务门店</text>
				<text>{{info.warrantyStore||''}}</text>
			</view>
			<view class="line">
				<text class="ziduan">服务联系人</text>
				<text>{{addressVo.contact}} {{addressVo.phone}}</text>
			</view>
			<view class="line">
				<text class="ziduan">预约上门时间</text>
				<text>{{info.expectTime}}</text>
			</view>
			<view class="line">
				<text class="ziduan">所属区域</text>
				<text>{{addressVo.addressRegion}}</text>
			</view>
			<view class="line">
				<text class="ziduan">详情地址</text>
				<text>{{addressVo.addressDetailed}}</text>

			</view>

		</view>



		<view class="worker bg" @click="workerDetailed" v-if="workerInfo.workerName">
			<view class="title">
				本单维修师
			</view>
			<view class="info">
				<view style="display: flex;    flex-direction: column;
    width: 21%;
    align-items: center;">
					<image v-if="workerInfo.avatarUrl==null" style="width:98rpx;height: 98rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/11/10/38405b13b68b4ac3be692e812874e648.png">
					</image>
					<image v-else style="width:98rpx;height: 98rpx;border-radius: 50%;" :src="workerInfo.avatarUrl">
					</image>
					<view class="logo">
						{{workerType}}
					</view>
				</view>

				<view style="margin-left:14rpx ;width: 85%;">
					<view style="font-size: 31rpx;color: #3D3F3E;font-weight: bold;margin: 10rpx 0;display: flex;">
						<text style="margin-right: 20rpx;"> {{workerInfo.workerName}}</text>
						<!-- 	<img :src="workerInfo.levelIcon" style='width: 140rpx;height: 34rpx;margin-left: 20rpx;'> -->

					</view>
					<view style="margin-left: -9rpx;">
						<u-rate count="5" v-model="workerInfo.value" activeColor='#ec9322' size='48rpx' readonly>
						</u-rate>
					</view>
				</view>
				<view class="back">
					<image style="width:14rpx;height: 25rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/28/0e15ed9e53ec47569b535aaffb6b0d7b.png">
					</image>
				</view>
			</view>


		</view>
		<view class="project bg">
			<view v-if="newProject.length!=0&&info.orderStatus!='服务中【审核驳回】'&&info.orderStatus!='服务中【待上级审核】'"
				style="font-size: 33rpx;font-weight: bold;">
				原维修方案
			</view>
			<view v-for="(item,index) in info.projectDataVoList" :key="index" style="margin: 15rpx 0;">
				<project-card :pro='item' />
				<view class="info-box">
					<view class="font">
						图片/视频
					</view>
					<view>
						<cl-upload :listStyle="{
						columnGap: '10rpx',
						columns:'4',
						rowGap:'10rpx'
						}" :imageFormData="{
							size:10
						}" :videoFromData="{
							size:10
						}" v-model="item.projectImg" :add="false" :remove="false"></cl-upload>
						<!-- <upLoadFile :fileListt='item.projectVideo' types='video' :index='index' :isDel='false' /> -->
					</view>
				</view>
				<view v-if="item.remark!=''" class="info-box">
					<view class="font">
						订单备注
					</view>
					<view class="right" style="color: #707271;">
						{{item.remark}}
					</view>
				</view>
			</view>


		</view>



		<view
			v-if="(newProject.length!=0||showMelList.length!=0)&&info.orderStatus!='服务中【审核驳回】'&&info.orderStatus!='服务中【待上级审核】'&&info.orderStatus!='服务中【客户驳回】'"
			class="bg">
			<view v-if="newProject.length!=0" class="projec">
				<view style="font-size: 33rpx;font-weight: bold;">
					变更后服务项<image style="width: 62rpx;height: 27rpx;margin-left: 20rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/04/02/2657cdc6a3624dc58270db3fb924ff47.png">
					</image>
				</view>
				<!--  -->
				<view style="margin: 15rpx 0;" v-for="(item,index) in newProject" :key="index">
					<project-card :pro='item' />
				</view>
			</view>
			<view v-if="showMelList.length!=0" class="info">
				<view class="mel-title">
					<text>维修材料</text>
					<!-- 	<text style="font-size: 33rpx;color: #EC5722;">¥{{melTotal}}</text> -->
				</view>
				<view v-for="(mfel,fmi) in showMelList" :key="fmi">
					<view style="font-weight: bold;margin-top: 20rpx;">
						{{mfel[0].classifyName}}
					</view>
					<view class="thumb-box" v-for="(mel,mi) in mfel" :key="mi">
						<view class="no-imgs">
							<image v-if="mel.materialImg!=null&&mel.materialImg!=''" :src="mel.materialImg"
								style="width:100%;height:100%;border-radius: 10rpx;">
							</image>
							<view v-else style="width:100%;height:100%;" class="img-text">
								<image style="width:90rpx ;height:68rpx;"
									src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/12/11/0cee8335a9f94b82aab54ebab36f524b.png"
									mode=""></image>
								<text>暂无图片</text>
							</view>
						</view>
						<view class="right flexCss">
							<view class="flexCss" style="align-items: center;">
								<text style="font-weight: bold;color: #3D3F3E;">{{mel.materialName}}</text>
								<text style="color:#EC5722 ;">{{mel.materialCount}}{{mel.materialUnit}}</text>
							</view>
							<view style="color: #A5A7A7;">
								<text v-if="mel.specsId==null"></text>
								<text v-else class="mel_style">
									<text v-for="(s,si) in Object.values(JSON.parse(mel.materialSpecs))" :key="si">
										{{s}}
									</text>
								</text>

							</view>
							<view style="color:#EC5722 ;" class="flexCss">
								<view class="">
									¥{{Number(mel.materialPrice)}}
								</view>
								<view style="font-weight: bold;margin-left: 21rpx;">
									小计:¥{{Number(mel.materialPrice)*Number(mel.materialCount)}}
								</view>
							</view>
						</view>


					</view>
				</view>

			</view>
			<!--	<view v-if="newProject.length!=0||showMelList.length!=0" style="margin-top: 30rpx;" class="info">
				<view class="title">
					项目预估总价
				</view>
		 	<view class="line">
					<text class="ziduan">预估人工费</text>
					<text style="color: #EC5722;">¥{{newTotalPrice}}</text>
				</view>
				<view class="line">
					<text class="ziduan">加急费</text>
					<text style="color: #EC5722;">¥{{info.additionalPrice!=null?info.additionalPrice:0}}</text>
				</view> 
				<view class="line">
					<text class="ziduan">合计</text>
					<text style="color: #EC5722;">¥{{info.additionalPrice!=null?Number(info.additionalPrice)+Number(newTotalPrice):newTotalPrice}}</text>
				</view>
			</view>-->
		</view>
		<view v-if="info.priceFlag == 0" class="bg info" style="margin-top: -20rpx;">
			<view class="title" style="display: flex;justify-content: space-between;align-items: center;">
				<view class="">
					订单费用
				</view>
				<view class="img" v-if="isGet">
					<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/02/21/a5a0b58c2d674bacb335cb758d4fca3d.png">
					</image>
					未达标按起步价收取
				</view>
				<view v-else class="img">
					<image style="width: 32rpx;height: 32rpx;margin-right: 10rpx;"
						src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/08/18/87c7f99dab0b4efcb0ff259ecc86c7fd.png">
					</image>已达到起步价
				</view>
			</view>
			<view class="line">
				<text class="ziduan">起步价</text>
				<text
					:style="{'text-decoration':!isGet?'line-through':'','color':!isGet?'#A5A7A7':'#EC5722'}">¥{{info.startingFree}}</text>
			</view>
			<!-- 	<view class="line">
				<text class="ziduan">检测费</text>
				<text
					:style="{'text-decoration':isGet?'line-through':'','color':isGet?'#A5A7A7':'#EC5722'}">¥{{info.servicePrice}}</text>
			</view> -->
			<view class="line">
				<text class="ziduan">服务费</text>
				<text
					:style="{'text-decoration':isGet?'line-through':'','color':isGet?'#A5A7A7':'#EC5722'}">¥{{info.preferentialPrice}}</text>
			</view>
			<view v-if="info.additionalPrice!=null&&info.additionalPrice!=0" class="line">
				<text class="ziduan">加急费</text>
				<text style="color: #EC5722;">¥{{info.additionalPrice}}</text>
			</view>
			<view v-if="info.materialPrice!=null&&info.materialPrice!=0" class="line">
				<text class="ziduan">材料费</text>
				<text style="color: #EC5722;">¥{{info.materialPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">小计：</text>

				<text
					style="color: #EC5722;">¥{{Number(info.orderPrice)+Number(info.subsidyPrice)+(Number(info.favorablePrice)<0?0:Number(info.favorablePrice))}}</text>
			</view>
			<view v-if="info.favorablePrice!=0" style="margin-left: 20rpx;color: #A5A7A7;" class="line">
				<text class="ziduan">品牌折扣：</text>
				<text style="color: #EC5722;">¥{{info.favorablePrice}}</text>
			</view>
			<view v-if="info.subsidyPrice!=0&&info.subsidyPrice!=null" style="margin-left: 20rpx;color: #A5A7A7;"
				class="line">
				<text class="ziduan">价格优惠：</text>
				<text style="color: #EC5722;">-¥{{info.subsidyPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">实付金额</text>
				<!-- info.additionalPrice!=null?Number(info.additionalPrice)+Number(info.preferentialPrice):Number(info.preferentialPrice) -->
				<text style="color: #EC5722;">¥{{info.orderPrice}}</text>
			</view>
		</view>



		<view class="bg info" v-if="info.priceFlag != 0">
			<view class="title">
				订单费用
			</view>
			<view class="line">
				<text class="ziduan">服务费</text>
				<text>¥{{info.orderPrice}}</text>
			</view>
			<view class="line">
				<text class="ziduan">合计</text>
				<text style="color: #EC5722;">¥{{info.orderPrice}}</text>
			</view>
		</view>


		<view v-if="info.deliveryVo&&info.orderStatus!='售后中'" class="bg project">
			<view class="title">
				维修详情
			</view>
			<view class="info-box">
				<view class="font">
					图片
				</view>
				<view>
					<upLoadFile
						:fileListt='info.deliveryVo.deliveryImg!=null?info.deliveryVo.deliveryImg.split(",") : []'
						types='image' :isDel='false' :isInfo='true' />
				</view>
			</view>
			<view class="info-box">
				<view class="font">
					订单备注
				</view>
				<view>
					{{info.deliveryVo.remark}}
				</view>
			</view>
		</view>


		<view class="bg info" v-if="info.orderStatus=='已完成'&&JSON.stringify(appraise) != '{}'">
			<view class="title">
				评价信息
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">维修技术</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.technicalScore">
				</u-rate>
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">维修速度</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.velocityScore">
				</u-rate>
			</view>
			<view class="line" style="display: flex;">
				<text style="width: 66%;" class="ziduan">服务态度</text>
				<u-rate size='23' allowHalf activeColor='#EC5722' count="5" readonly v-model="appraise.attitudeScore">
				</u-rate>
			</view>
			<view class="line">
				<text class="ziduan">订单评价</text>
				<text>{{appraise.appraiseContent}}</text>
			</view>
			<view class="line" style="display: flex;">
				<text class="ziduan">评价图片</text>
				<view style="width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;">
					<upLoadFile :fileListt='appraise.imgs' types='image' :isDel='false' :isInfo='true' />
				</view>
			</view>
		</view>

		<!--<view class="info" style="background-color: #fff;margin-top: 20rpx;">
			<u-collapse>
				<u-collapse-item title="服务信息" name="Docs guide">
					<view style="margin:-10rpx 0;">
						<view class="line">
							<text class="ziduan">报修门店</text>
							<text>{{info.warrantyStore}}</text>
						</view>
					 	<view class="line">
							<text class="ziduan">下单人</text>
							<text>{{info.warrantyStore}}</text>
						</view> 
						<view class="line">
							<text class="ziduan">预约上门时间</text>
							<text>{{info.expectTime}}</text>
						</view>
						<view class="line">
							<text class="ziduan">服务地址</text>
							<text>{{addressVo.addressRegion}}{{addressVo.addressDetailed}}</text>

						</view>
						<view class="line">
							<text class="ziduan"></text>
							<text>{{addressVo.contact}} {{addressVo.showPhone}}</text>

						</view>
					</view>

				</u-collapse-item>


			</u-collapse>
		</view>
-->
		<view class="info" style="background-color: #fff;margin: 20rpx 0 40rpx;">
			<u-collapse>
				<u-collapse-item title="订单信息" name="Docs guide">
					<view style="margin:-10rpx 0;">
						<view class="line">
							<text class="ziduan">订单编号</text>
							<text>{{info.orderNumber}}</text>
						</view>
						<view class="line">
							<text class="ziduan">订单类型</text>
							<text><text v-if="info.repairId!=null" style="width:14% ;"
									class="fanxiu">返修</text>{{info.orderType=='1'?'保养':'维修'}}</text>
						</view>
						<view class="line">
							<text class="ziduan">订单状态</text>
							<text
								style="color: #EC5722;">{{info.isUrgent=='0'?'不加急':info.isUrgent=='1'?'客户加急':'实际加急'}}</text>
						</view>
						<view class="line">
							<text class="ziduan">下单时间</text>
							<text>{{info.orderTime}}</text>
						</view>
					</view>
				</u-collapse-item>


			</u-collapse>
		</view>

		<view v-if="info.sign!=null&&info.sign!=''&&info.orderStatus!='售后中'" class="title"
			style="display: flex;background-color: #fff;padding: 10rpx 28rpx;justify-content: space-between;">
			<view style="width: 25%;">
				客户签名：
			</view>
			<view style="width: 70%;">

				<img :style="{'transform':'rotate(-90deg)','width':big?'100%':'14%','height':big?'477rpx':'121rpx'}"
					:src="info.sign" alt="">
			</view>
			<view @click="big=!big">
				<img style='width:50rpx ;height: 50rpx;' v-if="big"
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/4497ca4f26e54c58871233a2170aa148.png"
					alt="">
				<img style='width:50rpx ;height: 50rpx;' v-else
					src="http://hzcxkj.oss-cn-hangzhou.aliyuncs.com/2023/03/09/83c8f89a91b442d8bdcf0358466df5e7.png"
					alt="">
			</view>
		</view>


		<!-- <view @click="showPhone=true"
			style="width:100%;margin:0 auto;color: #3398F3; text-align: center; margin:22rpx 0;">
			有疑问？联系客服
		</view> -->
		<!--  -->

		<view
			v-if="info.orderStatus=='待上门'||info.orderStatus=='待接单'||info.orderStatus=='待服务'||info.orderStatus=='上级驳回,待处理'"
			class="btns">
			<view class="btn-white" @click="show=true">
				取消订单
			</view>
			<view v-if="info.orderStatus=='上级驳回,待处理'" @click="reissueOrderHandle" class="btn-green">
				重新发起
			</view>
			<view v-if="info.orderStatus=='待上门'||info.orderStatus=='待服务'" @click="handleRoute()" class="btn-green">
				联系维修师
			</view>
			<view v-if="info.orderStatus=='待上门'||info.orderStatus=='待服务'" @click="phoneAuth" class="btn-green">
				<yk-authpup ref="authpup" type="top" @changeAuth="changeAuth" permissionID="CALL_PHONE"> </yk-authpup>
				联系客服
			</view>
		</view>

		<view class="btns" v-if="info.orderStatus=='待评价'||info.orderStatus=='已完成'">
			<view v-if="info.orderStatus=='待评价'||info.orderStatus=='已完成'" class="btn-white" @click="report('待评价')">
				生成维修报告
			</view>
			<view v-if="info.orderStatus=='待评价'||info.orderStatus=='已完成'" class="btn-white" @click="repairOrder">
				申请返修
			</view>
			<view v-if="info.orderStatus=='待评价'" class="btn-green" @click="appraiseHandle">
				评价
			</view>
		</view>

		<view v-if="info.orderStatus=='待支付'" class="btns">
			<view class="btn-white" @click="report('待支付')">
				生成维修报告
			</view>
			<view class="btn-green" @click='pay'>
				去支付
			</view>
		</view>

		<view v-if="info.orderStatus=='待验收'" class="btns">
			<!-- 	<view style="width:166rpx;" class="btn-white" @click='complaint'>
				投诉
			</view> -->
			<view style="width:166rpx;" class="btn-white" @click='resultShowModal=true'>
				驳回
			</view>
			<view style="width: 166rpx;" class="btn-green" @click='report("验收")'>
				验收
			</view>
		</view>




		<view v-if="info.orderStatus=='服务中【待客户审核】'" class="btns">
			<view class="btn-white" @click="rejectShowModal=true">
				驳回
			</view>
			<view class="btn-white" @click="show=true">
				取消订单
			</view>
			<view class="btn-green" @click="handles('确认')">
				确认维修方案
			</view>
		</view>


		<!-- 取消原因 -->
		<u-picker :show="show" :columns="columns" confirmColor='#A4D091' :closeOnClickOverlay='true'
			@close='show = false' @cancel='show = false' @confirm='cancelReason'></u-picker>

		<!-- 进度 -->
		<u-popup :overlayStyle="{'touch-action':'none'}" :show="showStep" @close="showStep=false" closeable>
			<view style="margin:70rpx 50rpx;">
				<view style="text-align: center;margin-bottom: 40rpx;font-weight: bold;">
					订单跟踪
				</view>
				<view class="step">
					<view v-for="(item,index) in step" :key='index' class="box">
						<view class="left">
							<view :class="[index==0?'circle':'circle-green']">

							</view>
							<view :class="[index==0?'line-xu':'line']" v-if="index!=step.length-1">

							</view>
						</view>
						<view class="right">
							<view class="top">
								<text :class="[index==0?'green':'']">{{item.name}}</text><text
									:class="[index==0?'green':'gray']" style="font-size: 27rpx;">{{item.time}}</text>
							</view>
							<view class="bottom">
								{{item.content}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>

		<!-- 返修 -->
		<u-modal :show="repairOrderShow" title="温馨提示" showCancelButton confirmColor='#A4D091'
			@cancel="repairOrderShow=false" @confirm="handles('返修')">
			<view style="width: 100%;text-align: center;">
				是否确认申请返修?
			</view>
		</u-modal>

		<!-- 拨打电话 -->
		<u-action-sheet round='20' :closeOnClickAction='false' @select='actionSelect' :closeOnClickOverlay='false'
			:actions="actionList" :show="showPhone"></u-action-sheet>

		<!-- 驳回理由 -->
		<u-modal :show="rejectShowModal" width="600rpx" title="驳回理由" showCancelButton confirmColor='#A4D091'
			@cancel="rejectShowModal=false" @confirm="handles('驳回')">
			<view style="width: 100%;display: flex;">
				驳回理由：
				<u--textarea v-model="reason" placeholder="请输入驳回理由"></u--textarea>
			</view>
		</u-modal>


		<!-- 维修结果确认驳回 -->
		<u-modal :show="resultShowModal" width="600rpx" title="驳回原因" showCancelButton confirmColor='#A4D091'
			@cancel="resultShowModal=false" @confirm="resultBackHandle()">
			<view style="width: 100%;display: flex;flex-direction: column;">
				<u--textarea v-model="reason" placeholder="请输入内容"></u--textarea>
				<view style="margin-top: 20rpx;">
					<view class="">
						<text style="color: red;">*</text> 视频/图片
					</view>
					<cl-upload :listStyle="{
				columnGap: '10rpx',
				columns:'3',
				rowGap:'10rpx'
				}" :imageFormData="{
					size:10
				}" :videoFromData="{
					size:10
				}" v-model="bohuiUrl" :headers="headers" :action="action" @onSuccess="onSuccesss" @input='onDelete'>
					</cl-upload>
				</view>

			</view>
		</u-modal>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	const {
		environment
	} = require('@/config/environment')
	import storage from '@/utils/storage'
	import * as order from '@/api/order.js'
	import upLoadFile from '../../../components/uploadFile/uploadFile.vue'
	import projectCard from '@/components/projectCard/projectCard.vue'
	import ykAuthpup from "@/components/yk-authpup/yk-authpup";
	import {
		callPhone
	} from '@/utils/phone.js'
	import {
		getDict
	} from '@/api/system.js'
	import {
		listByIds
	} from '@/api/oss.js'
	export default {
		components: {
			upLoadFile,
			projectCard,
			ykAuthpup
		},
		data() {
			return {
				big: false,
				bohuiUrl: [],
				action: environment.baseURL + '/system/oss/upload',
				headers: {
					token: storage.get('AccessToken')
				},
				actionList: [{
						name: '0571-88387761'
					},
					{
						name: '呼叫'
					},
					{
						name: '取消'
					},
				], //拨打电话
				showPhone: false, //底部电话显示
				rejectShowModal: false, //驳回理由弹出框
				resultShowModal: false, //维修结果确认驳回
				reason: '', //驳回理由
				repairOrderShow: false, //返修
				loadingText: '',
				pipeiStatus: false, //匹配中图标
				timeData: {},
				step: [],
				info: {}, //详细信息
				addressVo: {}, //地址信息
				showStep: false,
				show: false,
				columns: [
					[]
				],
				workerInfo: {}, //师傅信息
				dateDiff: 0,
				status: '', //服务状态
				content: '', //服务状态内容
				statusInfo: [{
						orderStatus: '待接单',
						status: '匹配师傅中',
						content: '正在为你匹配合适的维修师，请耐心等待',
					},
					{
						orderStatus: '待上门',
						status: '等待上门维修',
						content: '等待维修师上门维修',
					},
					{
						orderStatus: '服务中【审核通过】',
						status: '请确认维修方案及报价',
						content: '维修师已提供了维修方案及报价，请确认',
					},
					{
						orderStatus: '待验收',
						status: '维修师已维修完成',
						content: '维修师已维修完成，请确认维修结果',
					},
					{
						orderStatus: '待评价',
						status: '请评价本次服务',
						content: '服务已完成，请您对本次服务进行评价',
					},
					// {
					// 	orderStatus: '客户取消',
					// 	status: '订单已取消',
					// 	content: '订单取消并收取上门费',
					// },
					{
						orderStatus: '已完成',
						status: '评价已完成',
						content: '您已评价，谢谢您的支持',
					},
					{
						orderStatus: '师傅取消',
						status: '重新指派中',
						content: "师傅已取消,重新指派中"
					}
				],
				appraise: {},
				id: '', //订单id
				newProject: [], //新项目列表
				showMelList: [], //显示的材料格式
				melTotal: 0, //材料总钱数,
				isGet: false, //是否达到起步价
				workerType: undefined,
			};
		},
		onLoad(option) {
			console.log(option);
			this.id = option.id
			this.getList()
		},
		onShow() {
			this.getList()
		},
		computed: {
			newTotalPrice() {
				let total1 = 0
				total1 = this.newProject.reduce((pre, item) => {
					return pre + Number(item.projectPrice) * Number(item.projectNumber)
				}, 0)
				let total2 = this.melTotal
				let total = total1 + total2
				return total
			}
		},
		methods: {

			handleRoute() {
				let id = 'C2C' + this.info.workerId
				const url = `../../../subpkgChat/TUI-Chat/chat?conversationID=${id}`;
				uni.navigateTo({
					url
				});
			},

			acceptRefresh() {
				this.getList()
			},
			//倒数计时15分钟时间
			timeFn(d1) { //di作为一个变量传进来
				//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
				var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
				var dateEnd = new Date(); //获取当前时间
				var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
				//var dateDiff=1000000
				//	console.log(dateDiff);
				if (dateDiff > 900000) {
					this.dateDiff = 0
					this.pipeiStatus = true
				} else {
					this.dateDiff = Number((dateDiff - 900000).toString().substring(1))
				}
				//console.log(Number((dateDiff - 900000).toString().substring(1)));
			},
			getList() {
				//详情
				order.getOrderInfo(this.id).then(res => {
						console.log(res);
						if (res.data.addressVo != null) {
							this.addressVo = res.data.addressVo
							this.addressVo.addressRegion = this.addressVo.addressRegion.replace(/\//g, '')
							var reg = /^(\d{3})\d{4}(\d{4})$/;
							this.addressVo.showPhone = this.addressVo.phone.replace(reg, "$1****$2");

						}

						this.info = res.data
						this.isGet = Number(this.info.startingFree) > Number(this.info.preferentialPrice)
						console.log(this.isGet, '6811111111111111');
						this.statusInfo.forEach(item => {
							if (this.info.orderStatus == item.orderStatus) {
								console.log(this.info.orderStatus == item.orderStatus, item.orderStatus);
								this.status = item.status
								this.content = item.content
							}
						})
						if (this.status == '') {
							this.status = this.info.orderStatus
							this.content = this.info.orderStatus
							console.log(this.status, '7066666666666');
						}
						//师傅信息
						this.info.workerId != null && order.getWorkerInfo(this.info.workerId).then(res => {
							this.workerInfo = res.data
							switch (this.workerInfo.levelName) {
								case '一星匠人':
									this.workerInfo.value = 1
									break;
								case '二星匠人':
									this.workerInfo.value = 2
									break;
								case '三星匠人':
									this.workerInfo.value = 3
									break;
								case '四星匠人':
									this.workerInfo.value = 4
									break;
								case '五星匠人':
									this.workerInfo.value = 5
									break;
							}
						})
						console.log(this.info.orderStatus);
						if (this.info.orderStatus == '已完成') {
							console.log(1111);
							//获取评论
							order.appraiseList({
								orderId: this.id,
								pageNum: 1,
								pageSize: 10,
								appraiseStatus: 1
							}).then(res => {
								console.log(res);
								if (res.rows.length != 0) {
									res.rows[0].imgs = res.rows[0].appraiseImg != null ? res.rows[0]
										.appraiseImg
										.split(
											',') : []
									this.appraise = res.rows[0]
								}

								console.log(this.appraise);
							})
						}
						//获取追踪列表
						order.orderTrackList({
							orderId: this.id,
							requester: 'c'
						}).then(res => {
							//	console.log(res);
							this.step = []
							res.data.forEach(item => {
								this.step.push({
									name: item.trackStatus,
									time: item.trackTime,
									content: item.trackContent
								})
							})
							console.log(this.content);
							this.step.push({
								name: this.status,
								content: this.info.orderStatus == '待上门' ? this.content + ',预计时间' + this
									.info
									.expectTime : this.content,
							})
							console.log(this.step);
							this.step = this.step.reverse()
						})
						console.log(this.status);
						//算出倒数的时间
						this.info.orderStatus == '待接单' && this.timeFn(this.info.orderTime)

						//this.timeFn('2023-03-09 11:20:18')
						console.log(this.info.projectDataVoList[0].workerType, '8000000000000000');
						this.workerType = this.info.projectDataVoList[0].workerType
						this.info.projectDataVoList.forEach(item => {
							item.projectImg = item.projectImg != '' ? item.projectImg.split(',') : []
							// item.projectVideo = item.projectVideo != '' ? item.projectVideo.split(',') : []
							item.img = item.projectUrl != null ? item.projectUrl.split(',') : []
						})
					}),

					//取消原因
					getDict('basic_reason_cancellation').then(res => {
						console.log(res);
						let arr = []
						res.data.forEach(item => {
							arr.push(item.dictLabel)
						})
						this.columns = [arr]
					}),
					//新维修方案
					order.getNewProject(this.id).then(res => {
						console.log(res);
						res.data.forEach(item => {
							item.img = item.projectImg != null ? item.projectImg
								.split(',') : []
						})
						this.newProject = res.data

					})

				//新材料
				order.getNewMaterial(this.id).then(res => {
					console.log(res);
					let arr = []
					arr = res.data
					const map = new Map()
					console.log(this.melTotal);
					this.melTotal = arr.reduce((pre, item) => {
						return pre + Number(item.materialPrice) * Number(item.materialCount)
					}, 0)
					console.log(this.melTotal);
					arr.forEach((item, index, arr) => {
						//	console.log( Number(item.materialPrice) * Number(item.materialCount),'？？？？？？？');
						//	this.melTotal =this.melTotal+ Number(item.materialPrice) * Number(item.materialCount)
						//console.log(this.melTotal);
						item.materialSpecsList = JSON.parse(item.materialSpecs)
						// listByIds(item.materialImg).then(res => {
						// 	// item.img = res.data[0].url
						// 	console.log(res, 'imgggggggggggg');
						// 	this.$set(arr[index], 'img', res.data[0].url)
						// })
						if (item.materialImg != null) {
							// listByIds(item.materialImg).then(res => {
							// 	// item.img = res.data[0].url
							// 	this.$set(arr[index], 'img', res.data[0].url)
							// })
							item.img = item.materialImg.split(',')[0]
						}
						if (!map.has(item.classifyId)) {
							map.set(
								item.classifyId,
								arr.filter(a => a.classifyId == item.classifyId)
							)
						}
					})

					this.showMelList = Array.from(map).map(item => [...item[1]])
				})
			},
			//评价
			appraiseHandle() {
				console.log(this.info);
				this.info.newProject = this.newProject
				uni.navigateTo({
					url: '../appraise/appraise?info=' + encodeURIComponent(JSON.stringify(this.info))
				})
			},
			//投诉
			complaint() {
				console.log(this.info);
				this.info.newProject = this.newProject
				uni.navigateTo({
					url: '../complaint/complaint?item=' + encodeURIComponent(JSON.stringify(this.info))
				})
			},
			//重新发起
			reissueOrderHandle() {
				console.log(this.info);
				this.info.projectDataVoList.forEach(item => {
					item.startingFreeDiscount = this.info.startingFree
					item.startingFree = this.info.beforeStartingFree
					item.orderId = this.info.orderId
				})
				let info = {
					checkedList: this.info.projectDataVoList,
					isCar: true,
					isAgain: true,
					address: this.info.addressVo,

				}
				uni.navigateTo({
					url: '../submitOrder/submitOrder?item=' + encodeURIComponent(JSON.stringify(
						info))
				})
			},
			//支付
			pay() {
				uni.navigateTo({
					url: '../pay/pay?item=' + encodeURIComponent(JSON.stringify(this.info))
				})
			},
			//取消
			cancelReason(e) {
				console.log(e.value[0])
				order.cancelOrder({
					cancelReason: e.value[0],
					orderId: this.info.orderId
				}).then(res => {
					uni.showToast({
						title: '取消成功',
						duration: 2000
					});
					this.getList()
					this.dateDiff = 0
					this.pipeiStatus = true
					this.show = false
				})
			},
			//师傅详情
			workerDetailed() {
				let info = {
					workerId: this.info.workerId,
					info: this.workerInfo
				}
				uni.navigateTo({
					url: '../../center/workerDetailed/workerDetailed?info=' + JSON.stringify(info)
				})
			},
			billViewImage(e, list) {
				console.log(e);
				uni.previewImage({
					urls: list,
					current: e.currentTarget.dataset.url
				});
			},
			//倒计时
			onChange(e) {
				this.timeData = e
				if (e.days == 0 && e.hours == 0 && e.milliseconds == 0 && e.minutes == 0 && e.seconds == 0) {
					this.dateDiff = 0
					this.pipeiStatus = true
					this.getList()
				}
			},

			//生成维修报告
			report(type) {
				console.log(this.newProject);
				let name = type == '待评价' || type == '待支付' ? '维修报告' : '服务验收'
				this.info.addressVo = this.addressVo

				let info = {
					name: name,
					type: type,
					id: this.info.orderId,
					info: this.info,
					newProject: this.newProject,
					showMelList: this.showMelList,
					isGet: this.isGet
				}
				console.log(info);

				uni.navigateTo({
					url: '../accept/accept?info=' + JSON.stringify(info)
				})
			},
			phoneAuth() {
				console.log(1111111111);
				this.$refs['authpup'].open()

			},
			changeAuth() {
				this.showPhone = true
			},
			actionSelect(e) {
				console.log(e);
				if (e.name == '取消') {
					this.showPhone = false
				} else {
					// #ifdef APP-PLUS
					callPhone(e.name, 'app')
					// #endif
					// #ifdef MP-WEIXIN
					callPhone(e.name, 'wx')
					// #endif
					this.showPhone = false
				}
			},
			handles(type) {
				switch (type) {
					case '返修':
						console.log(this.info);
						order.repairOrder(this.info).then(res => {
							console.log(res);
							this.$refs.uToast.show({
								type: 'error',
								message: res.data.msg
							});
							this.repairOrderShow = false
							this.getList()
						})
						break;
					case '确认':
						order.confirmScenario(this.info).then(res => {
							uni.showToast({
								title: '确认成功',
								duration: 500
							});
							this.getList()
						})
						break;
					case '驳回':

						this.info.reason = this.reason
						this.overruleScenarioApi()
						this.rejectShowModal = false
						console.log(this.info);

						break;
				}
			},
			//驳回
			overruleScenarioApi() {
				console.log(this.info);

				order.overruleScenario(this.info).then(res => {
					uni.showToast({
						title: '驳回成功',
						duration: 1000
					});

					this.getList()
				})
			},
			//维修结果驳回
			resultBackHandle() {
				console.log(this.bohuiUrl.length == 0);
				if (this.bohuiUrl.length == 0) {
					uni.showToast({
						icon: 'error',
						title: '请传图片/视频',
						duration: 1000
					});
					s
					return
				}
				this.info.reason = this.reason
				this.info.url = this.bohuiUrl.toString()
				this.resultShowModal = false
				this.overruleScenarioApi()

			},
			onSuccesss(reslut) {
				console.log(reslut)
				this.bohuiUrl.push(reslut.data.url)
				//this.url=reslut.data.url

			},
			onDelete(reslut) {
				console.log(reslut)
				this.bohuiUrl = reslut.list
				//this.url=reslut.data.url

			},
			//返修订单
			repairOrder() {
				console.log(this.newProject);
				let info = {
					list: []
				}
				if (this.newProject.length != 0) {
					info.list = this.newProject
					info.type = 'new'

				} else {
					info.list = this.info.projectDataVoList
					info.type = 'old'

				}
				info.finish = this.info.deliveryVo,
					info.orderId = this.info.orderId
				uni.navigateTo({
					url: '../repairOrder/repairOrder?info=' + encodeURIComponent(JSON.stringify(info))
				})
			}


		}
	}
</script>


<style>
	page {
		background: #F5F9FA;
	}
</style>
<style lang="scss" scoped>
	.order-detail {
		.bg {
			background: #FFFFFF;
			padding: 20rpx 30rpx;
			margin-top: 20rpx;
		}

		.title {
			font-size: 31rpx;
			color: #3D3F3E;
			font-weight: bold;

			.img {
				align-items: center;
				display: flex;
				font-size: 24rpx;

			}
		}

		.status {
			//height: 250rpx;
			background: #FFFFFF;
			padding: 40rpx 30rpx;
			display: flex;

			.left {
				width: 98%;

				view:first-child {
					font-size: 36rpx;
					color: #3D3F3E;
					font-weight: bold;
				}

				view:nth-child(2) {
					margin-top: 14rpx;
					font-size: 25rpx;
					color: #A5A7A7;
				}
			}

		}

		.back {
			display: flex;
			align-items: center;
		}

		.worker {
			.info {
				display: flex;
				margin-top: 20rpx;
			}

			.logo {
				z-index: 10;
				background: #FFFFFF;
				border-radius: 7rpx;
				border: 2rpx solid #A4D091;
				font-size: 18rpx;
				color: #A4D091;
				padding: 6rpx 14rpx;
				margin-top: -15rpx;
			}
		}

		.project {
			.info-box {
				margin-top: 20rpx;
				display: flex;

				.font {
					width: 20%;
					font-size: 29rpx;
					font-weight: bold;
					color: #3D3F3E;
				}

				.right {
					width: 80%;
				}
			}

		}

		.mel-title {
			height: 72rpx;
			line-height: 72rpx;
			font-weight: bold;
			background: rgba(159, 214, 186, 0.2);
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
		}

		.mel_style {
			overflow: hidden;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			width: 95%;
			margin-right: 10rpx;
		}

		.info {
			.line {
				margin-top: 15rpx;
				font-size: 29rpx;
				color: #3D3F3E;

				text:first-child {
					width: 28%;
					display: inline-block;
				}

				text:nth-child(2) {
					width: 72%;
					display: inline-block;
					text-align: end;
					color: #A5A7A7;
					vertical-align: text-top;
				}
			}
		}

		.fanxiu {
			height: 36rpx;
			background: #FFFFFF;
			border-radius: 7rpx;
			border: 2rpx solid #A4D091;
			font-size: 22rpx;
			color: #A4D091;
			line-height: 36rpx;
			text-align: center;
			margin-right: 8rpx;
		}

		.btn-white,
		.btn-green {
			height: 85rpx;
			border-radius: 45rpx;
			text-align: center;
			line-height: 85rpx;
			font-size: 36rpx;
			padding: 0 40rpx;
		}

		.btn-white {
			background: #FFFFFF;
			border: 4rpx solid #A4D091;
			color: #A4D091;
		}

		.btn-green {
			background: #A4D091;
			color: #fff;
		}

		.btns {
			display: flex;
			justify-content: space-evenly;
			height: 150rpx;
			margin-top: 55rpx;
		}

		.step {
			height: 55vh;
			overflow: scroll;
			overscroll-behavior: none;

			.box {
				display: flex;

				.left {

					.circle,
					.circle-green {

						margin: 6rpx;
						border-radius: 50%;
					}

					.circle {
						width: 29rpx;
						height: 29rpx;
						border: 1px solid #A4D091;

					}

					.circle-green {
						width: 32rpx;
						height: 32rpx;
						background: #A4D091;
					}

					.line,
					.line-xu {
						height: 72rpx;
						margin: 10rpx 22rpx 10rpx 0;
					}

					.line {

						border-right: 2rpx solid #A4D091;

					}

					.line-xu {
						border-right: 2rpx dashed #A4D091;
					}
				}

				.right {
					margin-left: 10rpx;
					width: 100%;

					.top {
						display: flex;
						justify-content: space-between;
						font-size: 29rpx;

					}

					.bottom {
						font-size: 27rpx;
						color: #A5A7A7;
						margin-top: 10rpx
					}

					;

					.gray {
						color: #A5A7A7;
					}

					.green {
						color: #A4D091;
					}
				}
			}
		}

		.thumb-box {
			// height: 130rpx;
			margin-top: 20rpx;
			display: flex;
			align-items: center;

			.right {
				height: 100%;
				flex-direction: column;
				margin-left: 14rpx;
				width: 79%;
			}

			.flexCss {
				display: flex;
				justify-content: space-between;
			}


			.no-imgs {
				width: 130rpx;
				height: 130rpx;


				.img-text {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 100%;
					background: #F4F4F4;
					border-radius: 11rpx;

					text {
						font-size: 21rpx;
						color: #A4D091;
					}
				}


			}


		}

	}
</style>