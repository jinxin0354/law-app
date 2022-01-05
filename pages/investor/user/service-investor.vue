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
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right green">请指引律师在其法力app上，点击“申请投资费用”按钮，代委托人向您申请支付案件受理费、公告费、异地被告身份证明查询费及律师费。</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right green">请您及时支付投资费用，避免逾期损害委托人权益，产生赔偿责任。</view>
			</view>
			<template v-if="isTipShow">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">
						委托人回收款物后，请指引委托人在其法力app上，点击“付款给投资人”按钮，向您支付投资收益；或者您可点击“结算投资收益”按钮，向委托人申请支付投资收益。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">委托人向您支付投资收益后，请指引律师在其法力app上，点击“结算投资人奖励”按钮，向您申请支付投资人奖励。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">法院强制执行后，如未能全额回款的，请指引律师到法院将您追加为申请执行人，并取得追加您为申请执行人的《民事裁定书》。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">
						您支付投资费用后，如律师或委托人申请解除委托的，请先与委托人和律师协商一致。如需要收回投资费用的，请指引律师在其法力app上，点击“退回投资费用”按钮办理。如需要委托人支付赔偿的，请指引委托人在其法力app上，点击“付款给投资人”按钮办理。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
					</view>
					<view class="txt-right green">
						案件办结后，在您审批服务完成时，请：1、核对是否已收齐律师快递的案件相关材料，并注意区分原件、复印件；2、与委托人结算完您应收的投资收益；3、与律师结算完您应付的投资人奖励。如有疑问，请联系律师协助处理。
					</view>
				</view>
			</template>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneClient.$refs.popupTel.open()">联系委托人</button>
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<template v-if="info.order.pro_name != '问一下'">
					<button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button>
				</template>
				<button class="service-item active" @click="$refs.popupSettleAccounts.open()">结算投资收益</button>
				<button class="service-item active" @click="jump('/pages/investor/user/inboxMessages', { order_id: order_id })">投资人收件信息</button>
				<button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button>
				<button
					class="service-item active"
					@click="
						initApprove();
						$refs.popupApproveServiceOk.open();
					"
					:disabled="disableApproveServiceOk"
				>
					审批服务完成
				</button>
				<button class="service-item active" @click="$refs.popupApproveServiceRemove.open()" :disabled="disableApproveRemoveEntrust">审批服务解除</button>
			</view>
		</view>
		<!-- 待收投资收益 -->
		<order-wait-receive-investor-settle-accounts v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-investor-settle-accounts>
		<!-- 结算投资收益详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.jie_pay" title="结算投资收益" :info="info"></order-common-detail>
		<!-- 待付申请投资费用 -->
		<order-wait-pay-apply-invest-cost v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-apply-invest-cost>
		<!-- 申请投资费用详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_apply" title="申请投资费用" :info="info"></order-common-detail>
		<!-- 待付申请投资人奖励 -->
		<order-wait-pay-invest-reward v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-invest-reward>
		<!-- 投资人奖励详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.reward_pay" title="结算投资人奖励" :info="info"></order-common-detail>
		<!--退回投资费用详情-->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_tui_apply" title="退回投资费用" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 审批服务解除弹出层 -->
		<uni-popup ref="popupApproveServiceRemove" type="center">
			<order-popup-common title="审批服务解除" @closePop="closePop('popupApproveServiceRemove')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<checkbox-group class="ck-box">
						<label class="ck-item">
							<checkbox color="#FFC801" style="transform: scale(0.7)" :checked="true" :disabled="true" />
							我已与委托人、律师确认解除委托。
						</label>
						<label class="ck-item">
							<checkbox color="#FFC801" style="transform: scale(0.7)" :checked="true" :disabled="true" />
							律师已将全部投资费用原路退回给我。
						</label>
					</checkbox-group>
				</scroll-view>
				<view class="service-list" style="padding-left: 20rpx; " slot="popup-btn">
					<button class="service-item active flex1" @click="$refs.popupSureRemoveEntrust.open()">确认服务解除</button>
					<button class="service-item active flex1" @click="$refs.popupNoSureRemoveEntrust.open()">不确认服务解除</button>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 审批服务完成弹出层 -->
		<uni-popup ref="popupApproveServiceOk" type="center">
			<order-popup-common title="审批服务完成" @closePop="closePop('popupApproveServiceOk')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view class="why-box">
						<view class="why-title">诉讼结果</view>
						<view class="why-txt">{{ approveInfo.result }}</view>
					</view>
					<view class="why-box">
						<view class="why-title">回款结果</view>
						<view class="why-txt">{{ approveInfo.sure }}</view>
					</view>
					<view class="why-box">
						<view class="why-title">律师已快递如下文件给我</view>
						<view class="why-txt">{{ approveInfo.is_send }}</view>
					</view>
					<view class="why-box">
						<view class="why-title">我确认如下事项</view>
						<checkbox-group @change="resultChange4">
							<label class="" v-for="(item, index) in resultLIst4" :key="item.value">
								<view class="why-radio">
									<checkbox :value="item.name" style="transform: scale(0.7);" color="#FFC801" />
									<view class="why-txt">{{ item.name }}</view>
								</view>
							</label>
						</checkbox-group>
					</view>
				</scroll-view>
				<view class="service-list" style="padding-left: 20rpx; " slot="popup-btn">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</order-popup-common>
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

		<!-- 确认解除委托弹出层 -->
		<uni-popup ref="popupSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我确认服务已经解除"
				:before-close="true"
				@confirm="sureRemoveEntrust(1, 'popupSureRemoveEntrust')"
				@close="closePop('popupSureRemoveEntrust')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 不确认解除委托弹出层 -->
		<uni-popup ref="popupNoSureRemoveEntrust" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:before-close="true"
				content="我不确认服务已经解除"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupNoSureRemoveEntrust')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 债券投资合同弹出层 -->
		<uni-popup ref="popupContract" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:before-close="true"
				content="我不确认服务已经解除"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupContract')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 结算投资人收益弹出层 -->
		<uni-popup ref="popupSettleAccounts" type="center">
			<order-popup-common title="结算投资人收益" @closePop="closePop('popupSettleAccounts')">
				<view class="od-box paddingbottom0" style="margin-bottom: 0;" slot="popup-con">
					<view class="od-item marginbottom10">
						<view class="item-tip require" style="width: 240rpx;">付款人</view>
						<view class="item-right"><view class="item-txt">委托人</view></view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require" style="width: 240rpx;">委托人回款金额</view>
						<view class="item-right">
							<view class="item-txt">
								<input type="number" class="ipt-border" placeholder="委托人此次收回了多少钱" placeholder-class="placeholder" v-model="settleAccountsInfo.money" />
							</view>
						</view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require" style="width: 240rpx;">我的收益</view>
						<view class="item-right">
							<view class="item-txt">
								<input type="number" class="ipt-border" placeholder="委托人此次收到的钱×30%" placeholder-class="placeholder" v-model="settleAccountsInfo.price" />
							</view>
						</view>
					</view>
					<view class="od-item marginbottom10">
						<view class="item-tip require" style="width: 240rpx;">请款事由</view>
						<view class="item-right">
							<view class="item-txt flex">
								第
								<input type="number" class="ipt-border" placeholder-class="placeholder" placeholder="" v-model="settleAccountsInfo.origin" style="width: 100rpx;" />
								次回款收益
							</view>
						</view>
					</view>
					<view class="od-item ">
						<view class="item-tip" style="width: 240rpx;"></view>
						<view class="item-right">
							<view class="item-txt flex">
								我已与委托人确认付款金额
							</view>
						</view>
					</view>
				</view>
				<view class="ok-box" style="padding: 10rpx;" slot="popup-btn">
					<button
						type="default"
						class="ok-btn"
						@click="
							closePop('popupSettleAccounts');
							confirmSettleAccounts();
						"
					>
						我要结算
					</button>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact"></order-invest-contact>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient" v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer" v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor" v-if="info.order.investor_mobile"></order-telephone>
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
			order_id: '',
			infoLawyer: {},
			reason: '',
			isLinkClient: false, //是否联系委托人
			isTipShow: false,
			resultLIst4: [
				{
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
			settleAccountsInfo: {} //结算投资人收益
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
			this.init();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.orderDetail', formData);
			this.info = res.data;
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
					this.replace('/pages/investor/user/service-ok', { order_id: this.order_id });
				} else if (pop == 'popupNoSureRemoveEntrust') {
					this.closePop('popupNoSureRemoveEntrust');
					this.disableApproveRemoveEntrust = true;
				}
			}
		},
		async sureServiceOk(status, pop) {
			if (this.result4.length < 3) {
				uni.showToast({
					title: '我确认如下事项,需全选',
					icon: 'none'
				});
				return;
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
					this.replace('/pages/investor/user/service-ok', { order_id: this.order_id });
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
				this.approveInfo = res.data;
			}
		},
		async confirmSettleAccounts() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				type: 3,
				money: this.settleAccountsInfo.money,
				price: this.settleAccountsInfo.price,
				origin: '第' + this.settleAccountsInfo.origin + '次回款收益'
			};
			let res = await this.$api('index.money', formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.init();
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 30rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	padding: 0 30rpx 0;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-radio {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.why-txt {
		}
		.why-ipt-box {
			flex: 1;
			border-bottom: 1rpx solid #eee;
			vertical-align: bottom;
			margin-left: 20rpx;
			padding-bottom: 4rpx;
		}
	}
}
</style>
