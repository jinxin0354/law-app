<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">您好！很荣幸接受您的委托，法务专员正在审查您的订单，稍后将尽快与您联系。我们将全心全意为您提供优质的服务，感谢您的信任与支持！</view>
			<!-- <view class="match-image-txt">
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
			</view> -->
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneFawu.$refs.popupTel.open()">联系法务专员</button>
				<button class="service-item active" :disabled="isClientServiceOk || isSpecialistServiceOk" @click="$refs.popupServiceOk.open">法务服务完成</button>
				<button
					class="service-item active"
					:disabled="isClientServiceOk || isSpecialistServiceOk"
					@click="jump('/pages/client/user/to-cancel', { money: info.order.money, order_id: order_id })"
				>
					取消订单
				</button>
				<button class="service-item active" v-if="isClientServiceOk" style="width: 100%; margin-right: 0;" @click="callLaw">催促法务专员确认完成</button>
			</view>
			<template v-if="isSpecialistServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;" @click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<order-telephone name="法务专员" :phoneNumber="info.order.fawu_mobile" ref="telephoneFawu"
			v-if="info.order.fawu_mobile"></order-telephone>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'">
			<template slot="case-edit">
				<text class="gray" style="color: #f20000;">(请叫一下法务专员为您填写)</text>
			</template>
		</order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order">
			<template slot="detail-edit">
				<text class="gray" style="color: #f20000;">（如需更改，请叫一下法务专员帮您修改）</text>
			</template>
		</order-detail>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="是"
				cancleTxt="否"
				content="我已与法务确认服务完成"
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
		},
		async confirmServiceOk() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.u_sure_legal', formData);
			if (res.code == 1) {
				this.isClientServiceOk = true;
				this.$refs.popupServiceOk.close();
			}
		},
		async sureServiceOk(status, pop) {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				status: status
			};
			let res = await this.$api('index.u_sure_legal_over', formData);
			if (res.code == 1) {
				if (pop == 'popupSureServiceOk') {
					this.closePop('popupSureServiceOk');
					this.replace('/pages/client/user/match', {
						order_id: this.order_id
					});
				} else if (pop == 'popupNoSureServiceOk') {
					this.closePop('popupNoSureServiceOk');
					this.isClientServiceOk = false;
					this.isSpecialistServiceOk = false;
				}
			}
		},
		async callLaw() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.u_call_legal', formData);
			if (res.code == 1) {
				uni.showToast({
					title: '法力平台已催促法务专员，请稍等片刻。',
					icon: 'none',
					duration:3000,
				});
			}
		},
		urged() {
			uni.showToast({
				title: '请点击按钮“叫一下法务”，谢谢！',
				icon: 'none'
			});
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
