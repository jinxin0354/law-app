<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的投资人：</view>
			<view class="match-txt">
				您好！委托人电话{{ info.order.user_mobile }}的债权债务案件，已由{{ infoLawyer.address
				}}{{ infoLawyer.lawyer }}律师代理。如需获取案件资料，了解案件详情，请联系律师。感谢您的信任与支持！祝您圆满成功！
			</view>
			<view class="match-title">
				温馨提示：
				<text class="title-open blue" @click="isTipShow = !isTipShow">
					<template v-if="isTipShow">
						收起
					</template>
					<template v-else>
						展开
					</template>
				</text>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper">
						<image src="@/static/img/warning.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="txt-right green">服务流程：律师法院立案-律师向您申请投资费用-律师办案-回款后让律师指导委托人向您支付投资收益-未全额回款时让律师将您追加为共同执行人-法院终结执行-律师移交资料给您-律师和委托人确认服务完成-您确认服务完成。</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper">
						<image src="@/static/img/warning.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="txt-right green">请指引律师在其法力app上，点击“申请投资费用”按钮，代委托人向您申请支付案件受理费、公告费、异地被告身份证明查询费及律师费。</view>
			</view>
			<template v-if="isTipShow">
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper">
						<image src="@/static/img/warning.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="txt-right green">请您及时支付投资费用，避免逾期损害委托人权益，产生赔偿责任。</view>
			</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
						委托人回收款物后，请指引委托人在其法力app上，点击“付款给投资人”按钮，向您支付投资收益；或者您可点击“结算收益”按钮，向委托人申请支付投资收益。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">法院强制执行后，如未能全额回款的，请指引律师到法院将您追加为申请执行人，并取得追加您为申请执行人的《民事裁定书》。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
						您支付投资费用后，如律师或委托人申请解除委托的，请先与委托人和律师协商一致。如需要收回投资费用的，请指引律师在其法力app上，点击“退回投资费用”按钮办理。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
					如需要委托人赔偿损失的，请指引委托人在其法力app上，点击“付款给投资人”按钮办理；或者您可点击“结算收益”按钮，向委托人申请支付投资收益损失和投资费用损失。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
						案件办结后，在您审批服务完成时，请：<br/>1、核对是否已收齐律师快递的案件相关材料，并注意区分原件、复印件；<br/>2、与委托人结算完您应收的投资收益或投资收益损失或投资费用损失；
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
						如有疑问，请联系律师协助处理。
					</view>
				</view>
			</template>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active"
					@click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid )">办理详情</button>
				</template>
				<button class="service-item active" @click="$refs.popupSettleAccounts.open()">结算投资收益</button>
				<button class="service-item active"
					@click="jump('/pages/investor/user/inboxMessages', { order_id: order_id })">投资人收件信息</button>
			<!-- 	<button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button> -->
				<button class="service-item active"  @click="jumpToWeb">债权投资合同</button>
				<button class="service-item active" @click="
						initApprove();
						$refs.popupApproveServiceOk.open();
					" :disabled="disableApproveServiceOk">
					审批服务完成
				</button>
				<button class="service-item active" @click="$refs.popupApproveServiceRemove.open()"
					:disabled="disableApproveRemoveEntrust">审批服务解除</button>
			</view>
		</view>
		<!--待收信息-->
		<order-wait-receive-investor-settle-accounts v-if="Object.keys(info.order).length > 0" :info="info"
			@init="init" @popupShow="popupShow"></order-wait-receive-investor-settle-accounts>
			
		<!--待付信息-->
		<order-wait-pay-apply-invest-cost v-if="Object.keys(info.order).length > 0" :info="info" @init="init" 
		@popupShow="popupShow">
		</order-wait-pay-apply-invest-cost>
		<!--收款详情-->
		<order-invest-detail v-if="Object.keys(info.order.jie_pay).length > 0 || Object.keys(info.order.pay_text).length > 0 || Object.keys(info.order.pend_tui_apply).length > 0"  :detailLIst="info.order.jie_pay" title="收款详情"
			:info="info" @popupShow="popupShow"></order-invest-detail>
		<!-- <order-invest-tuihui v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_tui_apply" :info="info"
		@popupShow="popupShow"
		></order-invest-tuihui> -->
		<!--付款详情-->
		<order-invest-pay v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_apply" title="付款详情"
		@popupShow="popupShow"
			:info="info"></order-invest-pay>
	<!-- 	<order-wait-receive-investor-settle-accounts v-if="Object.keys(info.order).length > 0" :info="info"
		@init="init" @popupShow="popupShow"></order-wait-receive-investor-settle-accounts> -->
		<!-- 结算投资收益详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.jie_pay" title="结算投资收益"
			:info="info"></order-common-detail> -->
		<!-- 待付申请投资费用 -->
		<!-- <order-wait-pay-apply-invest-cost v-if="Object.keys(info.order).length > 0" :info="info" @init="init">
		</order-wait-pay-apply-invest-cost> -->
		<!-- 申请投资费用详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_apply" title="申请投资费用"
			:info="info"></order-common-detail> -->
		<!-- 待付申请投资人奖励 -->
		<!-- <order-wait-pay-invest-reward v-if="Object.keys(info.order).length > 0" :info="info" @init="init">
		</order-wait-pay-invest-reward> -->
		<!-- 投资人奖励详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.reward_pay"
			title="结算投资人奖励" :info="info"></order-common-detail> -->
		<!--退回投资费用详情-->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_tui_apply"
			title="退回投资费用" :info="info"></order-common-detail> -->
		<!-- 发票列表组件-->
		<order-invoice-invest v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-invest>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer"
			:random="new Date().getTime()"></order-lawyer-intro>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 审批服务解除弹出层 -->
		<uni-popup ref="popupApproveServiceRemove" type="center">
			<order-popup-common title="审批服务解除" style="padding-bottom: 50rpx;" @closePop="closePop('popupApproveServiceRemove')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con" style="margin-top: 53rpx;">
					<view style="height: 80rpx;display: flex;margin-left: 90rpx;" @click="shenpi_jiechu_one=!shenpi_jiechu_one">
						<image src="../../../static/img/icon/radio.png" v-if="shenpi_jiechu_one==false" style="width: 34rpx;height: 34rpx;"></image>
						<image src="../../../static/img/icon/radioed.png" v-if="shenpi_jiechu_one==true" style="width: 34rpx;height: 34rpx;"></image>
						<view style="margin-left: 10rpx;font-weight: 300;">我已与委托人、律师确认解除委托。</view>
					</view>
					<view style="height: 80rpx;display: flex;margin-left: 90rpx;" @click="shenpi_jiechu_two=!shenpi_jiechu_two">
						<image src="../../../static/img/icon/radio.png" v-if="shenpi_jiechu_two==false" style="width: 34rpx;height: 34rpx;"></image>
						<image src="../../../static/img/icon/radioed.png" v-if="shenpi_jiechu_two==true" style="width: 34rpx;height: 34rpx;"></image>
						<view style="margin-left: 10rpx;font-weight: 300;">律师已将全部投资费用原路退回给我。</view>
					</view>

				</scroll-view>
				<view class="service-list" style="padding-left: 20rpx;margin-top: 80rpx;" slot="popup-btn">
					<button class="service-item active flex1" style="font-size: 30rpx;"
						@click="$refs.popupSureRemoveEntrust.open()">确认服务解除</button>
					<button class="service-item active flex1" style="font-size: 30rpx;"
						@click="$refs.popupNoSureRemoveEntrust.open()">不确认服务解除</button>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 审批服务完成弹出层 -->
		<uni-popup ref="popupApproveServiceOk" type="center">
			<order-popup-common title="审批服务完成" style="background-color: #F5F5F5;" @closePop="closePop('popupApproveServiceOk')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view class="why-box">
						<view class="why-title">委托人主张的欠款本金</view>
						<view class="why-txts">{{ approveInfo.result }}</view>
					</view>
					<view class="why-box" v-if="approveInfo.return_type!=''">
						<view class="why-title">回款结果</view>
						<view class="why-txts" style="margin-bottom: 30rpx;">{{ approveInfo.return_type }}</view>
						<view class="why-title" v-if="approveInfo.return_money!='0.00'">回款总金额：<span style="font-weight: 300;">￥{{approveInfo.return_money}}</span></view>
						<view class="why-title" v-if="approveInfo.against_ben!='0.00'">冲销本金：<span style="font-weight: 300;">￥{{approveInfo.against_ben}}</span></view>
						<view class="why-title" v-if="approveInfo.against_else!='0.00'">冲销其他款项：<span style="font-weight: 300;">￥{{approveInfo.against_else}}</span></view>
					</view>
					<view class="why-box">
						<view class="why-title">律师已快递如下文件给我</view>
						<view class="xieyi" @click="is_kuaidi=!is_kuaidi">
							<image src="../../../static/img/icon/radio.png" v-if="is_kuaidi==false" style="width: 34rpx;height: 34rpx;"></image>
							<image src="../../../static/img/icon/radioed.png" v-if="is_kuaidi==true" style="width: 34rpx;height: 34rpx;"></image>
							<view class="" style="margin-left: 5rpx;font-weight: 400;">
								<view>原件一份</view>
								<text style="line-height: 55rpx;">
									<view v-for="i in approveInfo.is_send" style="font-size: 26rpx;">{{i}}</view>
								</text>
								
							</view>
						</view>
						<!-- <view class="why-txt">{{ approveInfo.is_send }}</view> -->
					</view>
					<view class="why-box">
						<view class="why-title">我确认如下事项</view>
						<view class="xieyi" style="height: 80rpx;" @click="is_service=!is_service">
							<image src="../../../static/img/icon/radio.png" v-if="is_service==false" style="width: 34rpx;height: 34rpx;"></image>
							<image src="../../../static/img/icon/radioed.png" v-if="is_service==true" style="width: 34rpx;height: 34rpx;"></image>
							<view style="margin-left: 10rpx;font-weight: 300;">我已与委托人、律师确认服务完成。</view>
						</view>
						<view class="xieyi" style="height: 80rpx;" @click="is_shouyi=!is_shouyi">
							<image src="../../../static/img/icon/radio.png" v-if="is_shouyi==false" style="width: 34rpx;height: 34rpx;"></image>
							<image src="../../../static/img/icon/radioed.png" v-if="is_shouyi==true" style="width: 34rpx;height: 34rpx;"></image>
							<view style="margin-left: 10rpx;font-weight: 300;">我已收完委托人支付的投资收益。</view>
						</view>
						<view class="xieyi" @click="is_jiangli=!is_jiangli">
							<image src="../../../static/img/icon/radio.png" v-if="is_jiangli==false" style="width: 34rpx;height: 34rpx;"></image>
							<image src="../../../static/img/icon/radioed.png" v-if="is_jiangli==true" style="width: 34rpx;height: 34rpx;"></image>
							<view style="margin-left: 10rpx;font-weight: 300;">我已向律师支付完投资人奖励。</view>
						</view>
					</view>
				</scroll-view>
				<view class="service-list" style="padding-left: 20rpx;margin-top: 40rpx; " slot="popup-btn">
					<button class="service-item flex1 submit" v-if="finish!='active'">确认服务完成</button>
					<button class="service-item flex1 submit active" v-else  @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1 submit"
						@click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</order-popup-common>
		</uni-popup>

		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')" @close="closePop('popupSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我不确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')" @close="closePop('popupNoSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>

		<!-- 确认解除委托弹出层 -->
		<uni-popup ref="popupSureRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我确认服务已经解除" :before-close="true"
				@confirm="sureRemoveEntrust(1, 'popupSureRemoveEntrust')" @close="closePop('popupSureRemoveEntrust')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认解除委托弹出层 -->
		<uni-popup ref="popupNoSureRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" :before-close="true" content="我不确认服务已经解除"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupNoSureRemoveEntrust')"></uni-popup-dialog>
		</uni-popup>
		<!-- 债券投资合同弹出层 -->
		<uni-popup ref="popupContract" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" :before-close="true" content="我不确认服务已经解除"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')" @close="closePop('popupContract')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 结算投资人收益弹出层 -->
		<uni-popup ref="popupSettleAccounts" type="center">

			<order-popup-statement title="结算收益" @closePop="closePop('popupSettleAccounts')">
				<view class="paddingbottom0" style="margin-bottom: 0rpx;" slot="popup-con">
				
					<order-popup-statement-contents @func="aaa" @funcs ="bbb" :touziren_pay="touziren_pay" :msgs = "msgs"/>
				
 				</view>
				
				<view class="ok-box" style="padding: 10rpx;" slot="popup-btn" >
					<text class="amount">合计
					<text class="blod red"> ¥ {{heji}}</text>
					</text>
					<button type="default" class="ok-btn" @click="
						
							confirmSettleAccounts();"
						
							>
						我要结算
					</button>
				</view>

			</order-popup-statement>
		</uni-popup>
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact"></order-invest-contact>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient"
			v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer"
			v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor"
			v-if="info.order.investor_mobile"></order-telephone>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
		<!--结算投资收益-->
		<!-- <invest-shouyi ref="investShouyi" :item="current_item"></invest-shouyi> -->
		<end-invest-profit ref="investShouyi" :item="current_item"></end-invest-profit>
		<!-- 结算投资人奖励 -->
		<settlement-popup ref="settlement" :item="current_item"></settlement-popup>
		<!-- 申请投资费用 -->
		<lawyer-apply-cost ref="lawyerApply" :item="current_item"></lawyer-apply-cost>
		<!-- 退回投资费用弹窗 -->
		<return-cost ref="returnCostTip" :item="current_item"></return-cost>
	</view>
</template>

<script>
	import {
		mixin
	} from '@/common/mixins/specialist_order_state.js';
	import {
		share_coupon
	} from '@/common/mixins/share_coupon.js'; 
	
	export default {
		mixins: [mixin, share_coupon],
		
		data() {
			return {
				info: {
					order: {}
				},
				current_item:{},
				order_id: '',
				infoLawyer: {},
				reason: '',
				isLinkClient: false, //是否联系委托人
				isTipShow: false,
				resultLIst4: [{
						name: '我已与委托人、律师确认服务完成。'
					},
					{
						name: '我已收完委托人支付的投资收益。'
					},
					{
						name: '我已向律师支付完投资人奖励。'
					}
				],
				result4: [],
				approveInfo: {}, //审批信息
				func:'',
				heji:0,
				touziren_pay:0,
				jiesuan:{},
				settleAccountsInfo: {}, //结算投资人收益
				is_kuaidi:false,
				is_jiangli:false,
				is_service:false,
				is_shouyi:false,
				flg_check:false,
				msgs:false,
				shenpi_jiechu_one:false,//审批解除同意按钮1
				shenpi_jiechu_two:false,//审批解除同意按钮2
				
			};
		},
		computed:{
			finish(){
				if(this.is_kuaidi==true&&this.is_jiangli==true&&
				this.is_service==true&& this.is_shouyi==true){
					return 'active';
				}
				
			}
		},
		onLoad(params) {
			if (params.order_id) {
				this.order_id = params.order_id;
				this.init();
			}
		},
	
		methods: {
			popupShow(item) {
				// console.log('post');
				// console.log(item);
				if (item.type == 8) {
					this.current_item = item
					this.$refs.returnCostTip.$refs.returnCost.open()
				} else if (item.type == 3 || item.type == 1) {
					this.current_item = item
					this.$refs.investShouyi.$refs.investShou.open()
					// this.current_item = item
					// this.$refs.investShouyi.$refs.investShou.open()
				} else if (item.type == 7) {
					this.current_item = item.popup
					this.$refs.lawyerApply.$refs.lawyerApply.open()
				} else if (item.type == 2) {
					// 退款弹窗
					this.current_item = item.popup
					this.$refs.lawyerTui.$refs.lawyerApply.open()
				} else if (item.shou_type == 2) {
					this.current_item = item 
					this.$refs.lawyerQing.$refs.lawyerApply.open()
				}
			},
			async jumpToWeb() {
				let url = this.info.order.zhaiquan_hetong;
				console.log(url);
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.loadOffice(url);
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('loadOffice', url, data => {});
				}
			},
			aaa(data){
				this.heji = data.heji_money
				this.jiesuan = data
			},
			bbb(data){
				this.flg_check = data
			},
			async init() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.orderDetail', formData);
				this.info = res.data;
				
				this.touziren_pay = res.data.order.touziren_pay;
				this.getOrderState(this.info);

				let formDataLawyer = {
					id: this.info.order.lawyer,
					token: uni.getStorageSync('token')
				};
				let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
				this.infoLawyer = resLawyer.data;
			},
			removeEntrust() {
				if (this.info.order.pend_text.length > 0) {
					this.$refs.popupRemoveEntrust.open();
				} else {
					this.$refs.popupEntrustOk.open();
				}
			},
			async sureRemoveEntrust(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.t_sure_remove', formData);
				if (res.code == 1) {
					if (pop == 'popupSureRemoveEntrust') {
						this.closePop('popupSureRemoveEntrust');
						this.replace('/pages/investor/user/service-ok', {
							order_id: this.order_id
						});
					} else if (pop == 'popupNoSureRemoveEntrust') {
						this.closePop('popupNoSureRemoveEntrust');
						this.disableApproveRemoveEntrust = true;
					}
				}
			},
			async sureServiceOk(status, pop) {
				if(status==1){
					if(this.is_service==false || this.is_jiangli==false||this.is_shouyi==false){
						uni.showToast({
							title:'我确认如下事项,需全选',
							icon:'none'
						})
						return
					}
				}
				
				this.closePop('popupApproveServiceOk');
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.t_sureOrder', formData);
				if (res.code == 1) {
					if (pop == 'popupSureServiceOk') {
						this.closePop('popupSureServiceOk');
						this.replace('/pages/investor/user/service-ok', {
							order_id: this.order_id
						});
					} else if (pop == 'popupNoSureServiceOk') {
						this.closePop('popupNoSureServiceOk');
						this.disableApproveServiceOk = true;
						this.disableApproveRemoveEntrust = true;
					}
				}
			},
			resultChange4(e) {
				this.result4 = e.detail.value;
			},
			async initApprove() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.t_sure_h5', formData);
				if (res.code == 1) {
					var info=res.data;
					if(info.is_send!='') {
						let kuai=info.is_send.split(',')
						kuai.shift()
						info.is_send=kuai;
					}
					
					this.approveInfo = info;
				}
			},
			async confirmSettleAccounts() {
				
			
				if(this.heji==0){
					uni.showToast({
						title:"请填写金额！",
						icon:"none"
					})
				}else{
					if(this.flg_check==false){
						uni.showToast({
							title:"请点击我已与委托人确认付款金额！",
							icon:'none'
						})
					}else{
						var id = this.order_id
						var token =  uni.getStorageSync('token')
						this.jiesuan.id = id
						this.jiesuan.token = token
					
						// let formData = {
						// 	id: this.order_id,
						// 	token: uni.getStorageSync('token'),
						// 	type: 3,
						// 	money: this.settleAccountsInfo.money,
						// 	price: this.settleAccountsInfo.price,
						// 	origin: '第' + this.settleAccountsInfo.origin + '次回款收益'
						// };
						let res = await this.$api('index.money', this.jiesuan);
						if (res.code == 1) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							this.closePop('popupSettleAccounts')
							
							this.heji=0;
							this.init();
						}else{
							uni.showToast({
								title:res.msg,
								icon:"none"
							})
						}
					}
				
				}
			
		
			}
		}
	};
</script>

<style lang="scss">
	.content {
		padding-bottom: 30rpx;
	}
.ok-box{
	background: #f5f5f5;
	display: flex;
	margin-left: 30rpx;
	justify-content: space-between;
	align-items: center;
.amount{
	font-size: 32rpx;
.red{
	color:#f00;
}
.blod{
	font-weight: bold;
}
}}
	.why-box {
		background-color: #ffffff;
		border-radius: 26rpx;
		padding: 30rpx;
		margin-bottom: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		.why-title {
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.why-txts {
			width: 180rpx;
			height: 60rpx;
			background-color: #FFC900;
			color: white;
			line-height: 60rpx;
			text-align: center;
			border-radius: 38rpx;
			font-size: 28rpx;
		}
		.xieyi{
			display: flex;
			align-items: flex-start;
		}
		
	}
	.submit{
		background-color: #F5F5F5;
		border: 1rpx solid #999999;
		border-radius: 38rpx;
		color: #000000;
	}
	.ok-btn{
		margin-right: 42rpx;
		width: 300rpx;
		height: 60rpx;
		background: #FFC900;
		border: 1rpx solid #FFC900;
		opacity: 1;
		border-radius: 38rpx;
		font-size: 30rpx;
		font-family: PingFang-SC-Medium;
		color: #FFFFFF;
		text-align: center;
		line-height: 60rpx;
	}
	//下半部分圆角矩形
	.service-item {
		border-radius: 50rpx;
		height: 76rpx;
		
	}
</style>
