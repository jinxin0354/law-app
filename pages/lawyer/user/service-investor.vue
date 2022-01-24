<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！请先与委托人联系一下，避免委托人长时间等待，影响服务感受。感谢您的信任与支持！祝您圆满成功！</view>
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
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right green">服务流程：法院立案-向投资人申请投资费用-与欠款方谈和解尽快结案-回款后指导委托人向投资人支付投资收益-未全额回款时将投资人追加为共同执行人-法院终结执行-移交资料给委托人和投资人-委托人和投资人确认服务完成。</view>
			</view>
			
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right green">请先帮委托人审查案件的胜诉率，再向投资人申请投资费用，避免造成委托人的损失。</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right green">请到法力app“办公”页面的群聊里，查看办案流程、办案指引、办案文书模板及常用话术，高效、快捷办案。</view>
			</view>
			<template v-if="isTipShow">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">如需查询异地被告的身份证明，请下载“无讼”app，在“律师协作-异地查档”里办理。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">取得《案件受理费交纳通知书》后，您可点击“申请投资费用”按钮，向投资人领取案件受理费、公告费、异地被告身份查询费及律师费。每个案件投资费用限额4400.00元，如超出限额的，请先与投资人协商好再申请。投资人不同意承担的，请指引委托人及时支付，避免产生违约。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">委托人回收款物后5日内，请联系委托人在其法力app上，点击“付款给投资人”按钮，向投资人支付投资收益，避免逾期产生迟延支付滞纳金。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">
						执行阶段未能全额回款的，请将投资人追加为共同申请执行人，并将追加投资人为申请执行人的《民事裁定书》交给投资人。投资人享有执行所依据的司法裁判文书中确定的债权金额的30％。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">申请的投资费用超出实际支出有余的，请点击“退回投资费用”按钮，将多余的投资费用原路退回给投资人，避免增加委托人的负担。</view>
				</view>
			</template>

			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<button class="service-item active" @click="$refs.telephoneInvestor.$refs.popupTel.open()">联系投资人</button>
				<template v-if="info.order.pro_name != '问一下'">
					<!-- <button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button> -->
					 <button class="service-item active" v-if="info.order.usergroupid" @click="navToChat(info.order.usergroupid)">办理详情</button>
				</template>
				<button
					class="service-item active"
					:disabled="isLawyerServiceOk || isClientServiceOk || disableServiceOk"
					@click="jump('/pages/lawyer/user/apply-service-ok', { order_id: order_id })"
				>
					服务完成
				</button>
				<button class="service-item active" :disabled="isClientRemoveEntrust || isLawyerRemoveEntrust || disableRemoveEntrust" @click="$refs.popupApplyServiceRemove.open()">
					解除委托
				</button>
				<button
					class="service-item active"
					@click="jump('/pages/lawyer/user/apply-invest-cost', { order_id: order_id, investor_mobile: info.order.investor_mobile, apply_lawyer: info.order.apply_lawyer,apply_pay:info.order.apply_pay,is_apply_pay: info.order.is_apply_pay})"
				>
				
					申请投资费用
				</button>
				<button class="service-item active" @click="jump('/pages/lawyer/user/return-invest-cost', { order_id: order_id })">退回投资费用</button>
				<button class="service-item active" @click="$refs.investInboxMessage.$refs.popupInbo.open()">投资人收件信息</button>
				<!-- <button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button> -->
				<button class="service-item active" @click="jumpToWeb">债权投资合同</button>
				<!-- <button class="service-item active" style="width: 100%; margin-right: 0;" @click="jump('/pages/lawyer/user/apply-invest-award', { order_id: order_id })" >
					结算投资人奖励
				</button> -->
			<!-- 	<button class="service-item active" style="width: 100%; margin-right: 0;" @click="$refs.returnCost.$refs.returnCost.open()">
					结算投资人奖励
				</button> -->
				<button
					class="service-item active"
					v-if="isLawyerServiceOk & !isClientServiceOk"
					style="width: 100%; margin-right: 0;"
					@click="$refs.telephoneClient.$refs.popupTel.open()"
				>
					催促委托人确认完成
				</button>
				<button class="service-item active" v-if="isLawyerServiceOk" style="width: 100%; margin-right: 0;" @click="$refs.telephoneInvestor.$refs.popupTel.open()">
					催促投资人确认完成
				</button>
				<button
					class="service-item active"
					v-if="isLawyerRemoveEntrust & !isClientRemoveEntrust"
					style="width: 100%; margin-right: 0;"
					@click="$refs.telephoneClient.$refs.popupTel.open()"
				>
					催促委托人确认解除
				</button>
				<button class="service-item active" v-if="isLawyerRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.telephoneInvestor.$refs.popupTel.open()">
					催促投资人确认解除
				</button>
			</view>
			<template v-if="isClientRemoveEntrust && !isLawyerRemoveEntrust">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureRemoveEntrust.open()">确认解除委托</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureRemoveEntrust.open()">不确认解除委托</button>
				</view>
			</template>
			<template v-if="isClientServiceOk && !isLawyerServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="jump('/pages/lawyer/user/apply-service-oks', { order_id: order_id })">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 待收信息 -->
		<order-detail-payment v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-payment>
		<!-- 收款详情 -->
		<order-detail-collection v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-collection>
		<!-- 待付信息 -->
		<order-detail-pay v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-pay>
		<!-- 付款详情 -->
		<order-detail-nopay v-if="Object.keys(info.order).length > 0" :list="info.order" @popupShow="popupShow"></order-detail-nopay>
		<!--滞纳金-->
		<order-detail-zhina v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-detail-zhina>
		<!-- 待收申请投资费用详情 -->
		<!-- <order-wait-receive-apply-invest-cost v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-apply-invest-cost> -->
		<!-- 申请投资费用详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_apply" title="申请投资费用" :info="info"></order-common-detail> -->
		<!-- 待收结算投资人奖励 -->
		<!-- <order-wait-receive-invest-reward v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-invest-reward> -->
		<!-- 结算投资人奖励详情 -->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.reward_pay" title="结算投资人奖励" :info="info"></order-common-detail> -->
		<!--退回投资费用详情-->
		<!-- <order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_tui_apply" title="退回投资费用" :info="info"></order-common-detail> -->
		<!-- 发票列表组件-->
		<order-invoice-invest v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-invest>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'" v-if="info.order.pro_name == '打官司'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 解除委托-未付款弹出层 -->
		<uni-popup ref="popupRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" title="" okTxt="我知道了" cancleTxt="" content="" :before-close="true" @confirm="closePop('popupRemoveEntrust')">
				<view class="warm-tip-box">
					<view class="warm-tip-item">为保障您及您好友推荐本平台应得的奖励，请按照以下流程解除和退款：</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">在本平台“办公”→“信息”→本订单“委托人协作团队”群聊里，与委托人确定解除事宜，保留聊天记录；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">在“待收信息”里，收齐剩余律师费用；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">3</view>
						<view class="item-right">再次点击“解除委托”按钮，发起解除；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">4</view>
						<view class="item-right">联系委托人，确认解除委托；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">5</view>
						<view class="item-right">委托人确认后，您将进入“服务解除”页面。如需退款的，可在该页面点击“退款”按钮办理。</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 我要收款弹出层 -->
		<uni-popup ref="popupReceipt" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与委托人确认付款事宜"
				:before-close="true"
				@confirm="
					$refs.popupReceipt.close();
					isReceipt = true;
				"
				@close="closePop('popupReceipt')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 确认解除委托弹出层 -->
		<uni-popup ref="popupSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt=""
				title="确认解除委托"
				:before-close="true"
				:showClose="true"

				@close="closePop('popupSureRemoveEntrust')"
			>
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view style="display: flex;font-size: 30rpx;margin-top: 30rpx;width: 100%;" @click="queren_jiechu_weitui_one=!queren_jiechu_weitui_one">
					<image src="../../../static/img/icon/radio.png" v-if="queren_jiechu_weitui_one==false"  style="width: 34rpx;height: 34rpx;"></image>
					<image src="../../../static/img/icon/radioed.png" v-if="queren_jiechu_weitui_one==true" style="width: 34rpx;height: 34rpx;"></image>
					<view style="margin-left: 10rpx;">我已与委托人、投资人确认解除委托。</view>
				</view>
				<view style="display: flex;font-size: 30rpx;margin-top: 20rpx;width: 100%;" @click="queren_jiechu_weitui_two=!queren_jiechu_weitui_two">
					<image src="../../../static/img/icon/radio.png" v-if="queren_jiechu_weitui_two==false"  style="width: 34rpx;height: 34rpx;"></image>
					<image src="../../../static/img/icon/radioed.png" v-if="queren_jiechu_weitui_two==true" style="width: 34rpx;height: 34rpx;"></image>
					<view style="margin-left: 10rpx;">我已将全部投资费用原路退回给投资人</view>
				</view>
				<view class="btns" :class="queren_jiechu_weitui_three==true?'btnss':''" @click="sureRemoveEntrust(1, 'popupSureRemoveEntrust')">我要确认</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认解除委托弹出层 -->
		<uni-popup ref="popupNoSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:before-close="true"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupNoSureRemoveEntrust')"
			>
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view class="dialog-tip-line">我不确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')"
				@close="closePop('popupSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我不确认服务已经完成"
				:before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')"
				@close="closePop('popupNoSureServiceOk')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 申请解除委托弹出层 -->
		<uni-popup ref="popupApplyServiceRemove" type="center">
			<order-popup-common title="申请解除委托" @closePop="closePop('popupApplyServiceRemove')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view class="ck-box" style="padding: 15px 24px;">
						<!-- <checkbox-group>
							<label class="ck-item">
								<checkbox color="#FFC801" style="transform: scale(0.7)" :checked="true" :disabled="true" />
								我已与委托人、投资人确认解除委托。
							</label>
							<label class="ck-item">
								<checkbox color="#FFC801" style="transform: scale(0.7)" :checked="true" :disabled="true" />
								我已将全部投资费用原路退回给投资人
							</label>
						</checkbox-group> -->
						<view class="dialog-tip">解除原因</view>
						<view class="dialog-textarea border-box" style="height: 80px;border: 1px solid #eee;border-radius: 10px;padding: 15px;">
							<!-- style="width: calc(100% - 40rpx);" -->
							<textarea class="border-box" placeholder="请输入解除事由" style="height: 100rpx;width: calc(100%);height: calc(100%);" :focus="true" placeholder-class="placeholder" v-model="reason" />
						</view>
						<checkbox-group  @change="resultChange" style="margin-top: 10px;">
							<label class="ck-item flex-center-v">
								<image v-if="result.indexOf('checkValue1') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
								<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
								<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue1" :checked="false" :disabled="false" />
								我已与委托人、投资人确认解除委托。
							</label>
							<label class="ck-item flex-center-v">
								<image v-if="result.indexOf('checkValue2') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
								<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
								<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue2" :checked="false" :disabled="false" />
								我已将全部投资费用原路退回给投资人。
							</label>
						</checkbox-group>
					</view>
				</scroll-view>
				<view class="service-list" style="padding-left: 20rpx; " slot="popup-btn">
					<button class="service-item active button " :style="result.length == 2 && reason.length > 0 ? '' : 'background-color:#F2F2F2;color:#999;border-color:#f2f2f2;'" @click="confirmEntrustOk">我要申请</button>
					</view>
			</order-popup-common>
		</uni-popup>
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact"></order-invest-contact>
		<order-return-cost ref="returnCost" @init="init()" :orderId="order_id"></order-return-cost>
		
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
		<!-- 投资人收件信息组件 -->
		<order-invest-inbox-message ref="investInboxMessage" :infoInbo="infoInbo"></order-invest-inbox-message>
		
		<!-- 退回投资费用弹窗 -->
		<return-cost ref="returnCostTip" :item="current_item"></return-cost>
		<!-- 结算投资人奖励 -->
		<settlement-popup ref="settlement" :item="current_item"></settlement-popup>
		<!-- 申请投资费用 -->
		<lawyer-apply-cost ref="lawyerApply" :item="current_item"></lawyer-apply-cost>
		<!-- 律师请款 -->
		<lawyer-qing ref="lawyerQing" :item="current_item"></lawyer-qing>
		<!-- 律师退款 -->
		<lawyer-tuikuan ref="lawyerTui" :item="current_item"></lawyer-tuikuan>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
		
		
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/specialist_order_state.js';
import { share_coupon } from '@/common/mixins/share_coupon.js';
export default {
	mixins: [mixin, share_coupon],
	data() {
		return {
			info: {
				order: {}
			},
			current_item: {},
			result: [],
			order_id: '',
			reason: '',
			isLinkInvestor: false, //是否联系投资人
			isTipShow: false,
			infoInbo: {},
			isReceipt: false ,//是否显示我要付款按钮
			queren_jiechu_weitui_one:false,//确认解除委托弹框的单选1
			queren_jiechu_weitui_two:false,//确认解除委托弹框的单选2
			
		};
	},
	computed:{
		queren_jiechu_weitui_three(){
			if(this.queren_jiechu_weitui_one==true&&this.queren_jiechu_weitui_two==true){
				return true;
			}else{
				return false;
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
			if (item.type == 8) {
				this.current_item = item
				this.$refs.returnCostTip.$refs.returnCost.open()
			} else if (item.type == 3) {
				this.current_item = item
				this.$refs.settlement.$refs.settlement.open()
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
		async showTip() {
			uni.showToast({
				title: "已发送给投资人，请联系投资人确认",
				icon: 'none'
			})
		},
		async jumpToWeb() {
			let url = this.info.order.zhaiquan_hetong
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.loadOffice(url);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('loadOffice', url, data => {});
			}
		},
		resultChange(e) {
			this.result = e.detail.value;
		},
		async init() { 
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.orderDetail', formData);
			this.info = res.data;
			this.getOrderState(this.info);

			if (this.info.order.investor_id) {
				let formDataInbo = {
					id: this.info.order.investor_id,
					token: uni.getStorageSync('token')
				};
				let resInbo = await this.$api('index.investor_address', formDataInbo);
				if (resInbo.code == 1) {
					this.infoInbo = resInbo.data;
				}
			}
		},
		async confirmEntrustOk() {
			if (this.reason.length == 0 || this.result.length < 2) {
				return
			}
			
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				reason: this.reason
			};
			let res = await this.$api('index.lawyer_remove', formData);
			if (res.code == 1) {
				this.$refs.popupApplyServiceRemove.close();
				this.isLawyerRemoveEntrust = true;
				this.disableServiceOk = true;
			}
		},
		async sureRemoveEntrust(status, pop) {
			if(status==1){
				if(this.queren_jiechu_weitui_one!=true||this.queren_jiechu_weitui_two!=true){
					uni.showToast({
						title:'需先同意以下内容',
						icon:'none',
						duration:1000
					})
					return;
				}
			}
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.lawyer_sure_remove', formData);
			if (res.code == 1) {
				if (pop == 'popupSureRemoveEntrust') {
					this.closePop('popupSureRemoveEntrust');
					this.isClientRemoveEntrust = true;
					this.isLawyerRemoveEntrust = true;
				} else if (pop == 'popupNoSureRemoveEntrust') {
					this.closePop('popupNoSureRemoveEntrust');
					this.isClientRemoveEntrust = false;
					this.isLawyerRemoveEntrust = false;
					this.disableRemoveEntrust = false;
					this.disableServiceOk = false;
				}
			}
		},
		removeEntrust() {
			if (this.info.order.pend_text.length > 0) {
				this.$refs.popupRemoveEntrust.open();
			} else {
				this.$refs.popupEntrustOk.open();
			}
		},
		async sureServiceOk(status, pop) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.lawyer_sure_over', formData);
			if (res.code == 1) {
				if (pop == 'popupSureServiceOk') {
					this.closePop('popupSureServiceOk');
					this.isClientServiceOk = true;
					this.isLawyerServiceOk = true;
				} else if (pop == 'popupNoSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					this.isClientServiceOk = false;
					this.isLawyerServiceOk = false;
					this.disableRemoveEntrust = false;
					this.disableServiceOk = false;
				}
			}
		}
	}
};
</script>

<style lang="scss">
	.button {
		width: 180px ;
		height: 38px;
		margin: auto ;
		margin-bottom: 10px;
	}
.content {
	padding-bottom: 30rpx;
}
.check-img {
		width: 15px;
		height: 15px;
		// margin-left: 7.5px;
		// margin-top:4px;
		margin-right: 5px;
	}
//下半部分圆角矩形
	.service-item {
		border-radius: 50rpx;
	}
	
	.btns{
		width: 360rpx;
		height: 76rpx;
		border-radius: 38rpx;
		background: #F2F2F2;
		color: #999999;
		font-size: 30rpx;
		line-height: 76rpx;
		text-align: center;
		margin-top: 56rpx;
	}
	.btnss{
		background: #FFC900;
		color: white;
	}
</style>
