<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的律师：</view>
			<view class="match-txt">您好！请先与委托人联系一下，避免委托人长时间等待，影响服务感受。感谢您的信任与支持！祝您圆满成功！</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper"><image src="@/static/img/warning.png" mode="aspectFit"></image></view>
				</view>
				<view class="txt-right">温馨提示：</view>
			</view>
			<view class="match-image-txt"><view class="txt-right green">请尝试以下方式与委托人沟通，先弄清问题再找答案，以便快速解决：</view></view>
			<view class="match-image-txt"><view class="txt-right green">1、先问委托人要律师帮他解决什么问题？/要实现什么结果？</view></view>
			<view class="match-image-txt"><view class="txt-right green">2、再问委托人卡在哪一步？遇到什么疑问/障碍无法解决？</view></view>
			<view class="match-image-txt"><view class="txt-right green">3、接下来再问委托人相关的事实经过/听委托人讲事情经过。</view></view>
			<view class="match-image-txt"><view class="txt-right green">4、最后给委托人答案。</view></view>
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
				<button
					class="service-item active"
					@click="
						cancelClock();
						$refs.orderTelephoneChange.$refs.popupTel.open();
					"
				>
					联系委托人
				</button>
				<button class="service-item active" :disabled="isLawyerServiceOk || isClientServiceOk" @click="$refs.popupServiceOk.open()">服务完成</button>
				<button class="service-item active" v-if="isLawyerServiceOk" style="width: 100%; margin-right: 0;" @click="urged">
					催促委托人确认完成
					<uni-countdown
						:show-day="true"
						:day="remainTime.day"
						:hour="remainTime.hour"
						:minute="remainTime.minute"
						:second="remainTime.second"
						color="#f00"
						splitorColor="#f00"
						backgroundColor="#FFC801"
						@timeup="timeup"
					></uni-countdown>
				</button>
				<button class="service-item active" v-if="isLawyerServiceOk || isLawyerRemoveEntrust" style="width: 100%; margin-right: 0;" @click="$refs.popupCancelServiceApply.open()">
					取消申请
				</button>
			</view>
			<template v-if="isClientServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 录音组件 -->
		<order-record v-if="Object.keys(info.order).length > 0" :info="info" @init="init" :random="new Date().getTime()"></order-record>
		<!-- 待收信息-->
		<order-wait-receive-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-receive-info>
		<!-- 收款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="收款详情" :info="info"></order-common-detail>
		<!-- 续费详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.xu_pay" title="续费详情" :info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :isBold="true" :img_src="info.order.desc_content"></order-unfold-product>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与委托人确认服务完成"
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
				:content="info.order.status == 4 ? '取消服务完成申请' : '取消服务解除申请'"
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
export default {
	mixins: [mixin],
	data() {
		return {
			info: {
				order: {}
			},
			order_id: '',
			isTipShow: false,
			ifOnShow: false, //电话挂断刷新页面，更新分钟数
			remainTime: {} //剩余时间
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
			if (this.info.order.lawyer_finish) {
				this.remainTime = this.timeFn(this.info.order.lawyer_finish);
			}
		},
		async confirmServiceOk() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.lawyer_sure', formData);
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
			let res = await this.$api('index.lawyer_sure_over', formData);
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
		async cancelClock() {
			if (this.info.order.lawyer_call == 1) {
				// 去掉闹钟提示
				let formDataCancelClock = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let resCancelClock = await this.$api('index.lawyer_alarm', formDataCancelClock);
			}
		},
		urged() {
			uni.showToast({
				title: '请联系委托人尽快确认，谢谢！',
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
			// 律师点服务完成
			if (this.info.order.status == 4) {
				url = 'index.lawyer_cancel';
			}
			// 律师点服务解除
			else if (this.info.order.status == 11) {
				url = 'index.lawyer_cancel_remove';
			}
			let res = await this.$api(url, formData);
			if (res.code == 1) {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
				this.init();
			}
		},
		timeup() {
			this.init();
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
