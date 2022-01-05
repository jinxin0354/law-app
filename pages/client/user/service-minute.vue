<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！{{ infoLawyer.address }}{{ infoLawyer.lawyer }}律师很荣幸接受您的委托，我们将全心全意为您提供优质的服务！感谢您的信任与支持！</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right red">请注意虚拟手机号来电，请勿拦截或拒接</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right red">请确认您的手机号与您现在登录本软件的账号一致，否则将无法拨打或接听虚拟电话</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/time-green.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right">
					还可咨询
					<text class="red">{{ info.order.expire }}</text>
				</view>
			</view>
			<view class="service-list">
				<button class="service-item active" @click="$refs.orderTelephoneChange.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active" :disabled="isClientServiceOk || isLawyerServiceOk" @click="$refs.popupServiceOk.open">服务完成</button>
				<button class="service-item active" @click="jump('/pages/client/user/invoice', { order_id: order_id })">开发票</button>
				<button class="service-item active" v-if="isClientServiceOk" style="width: 100%; margin-right: 0;" @click="callLaw">催促律师确认完成</button>
				<button class="service-item active" v-if="isClientServiceOk || isClientRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.popupCancelServiceApply.open()">
					取消申请
				</button>
				<view class="service-item active" @click="callLaw">
					叫一下律师
					<image class="noback2" src="@/static/img/zhanxian.png" style="right: -100rpx;" mode="heightFix"></image>
				</view>
			</view>
			<template v-if="isLawyerServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0" :info="info" @init="init" :random="new Date().getTime()"></order-record>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer" :random="new Date().getTime()"></order-lawyer-intro>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与律师确认服务完成"
				:before-close="true"
				@confirm="confirmServiceOk"
				@close="closePop('popupServiceOk')"
			></uni-popup-dialog>
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
		<!-- 取消申请弹出层 -->
		<uni-popup ref="popupCancelServiceApply" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				:content="info.order.status == 14 ? '取消服务完成申请' : '取消服务解除申请'"
				:before-close="true"
				@confirm="
					closePop('popupCancelServiceApply');
					cancleApplyService();
				"
				@close="closePop('popupCancelServiceApply')"
			></uni-popup-dialog>
		</uni-popup>
		<!-- 虚拟电话组件-->
		<order-telephone-change :info="info" ref="orderTelephoneChange" v-if="Object.keys(info.order).length > 0"></order-telephone-change>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mixin } from '@/common/mixins/face_order_state.js';
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
			ifOnShow: false //刷新页面
		};
	},
	onHide() {
		this.ifOnShow = true;
	},
	onShow() {
		if (this.ifOnShow) {
			this.init();
		}
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
		async confirmServiceOk() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.u_sure_lawyer', formData);
			if (res.code == 1) {
				this.$refs.popupServiceOk.close();
				this.init();
			}
		},
		async sureServiceOk(status, pop) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.u_sure_lawyer_over', formData);
			if (res.code == 1) {
				if (pop == 'popupSureServiceOk') {
					this.closePop('popupSureServiceOk');
					this.init();
				} else if (pop == 'popupNoSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					this.init();
				}
			}
		},
		async callLaw() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.u_call_lawyer', formData);
			if (res.code == 1) {
				uni.showToast({
					title: '法力平台已催促服务律师，请稍等片刻',
					icon: 'none'
				});
			}
		},
		urged() {
			uni.showToast({
				title: '请点击按钮“叫一下律师”，谢谢！',
				icon: 'none'
			});
		},
		// 委托人取消申请服务完成，服务解除
		async cancleApplyService() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let url = '';
			// 委托人点服务完成
			if (this.info.order.status == 14) {
				url = 'index.u_cancel_sure_lawyer';
			}
			// 委托人点服务解除
			else if (this.info.order.status == 10) {
				url = 'index.u_cancel_remove_lawyer';
			}
			let res = await this.$api(url, formData);
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

.ok-box {
	padding: 0;
}

.service-list {
	padding-top: 20rpx;
	margin-bottom: -10px;
}
</style>
