<template>
	<view class="content">
		<view class="od-box paddingbottom0">
			<view class="od-item">
				<view class="item-tip">付款人</view>
				<view class="item-right"><view class="item-txt">投资人</view></view>
			</view>
			<view class="od-item">
				<view class="item-tip require">申请事项</view>
				<view class="item-right">
					<view class="why-box">
						<checkbox-group @change="resultChange">
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue1" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												案件受理费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="case_money" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">缴纳截止日</view>
											<view class="arrow-right">
												<input class="why-ipt flex1" type="text" v-model="case_time" placeholder="请选择" disabled="" @click="jump('/pages/lawyer/user/dead-date')" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">案件受理费通知书</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" placeholder-class="placeholder" disabled="" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
									</view>
								</view>
							</label>
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue2" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												公告费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="announce_money" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">公告费缴费通知书</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
									</view>
								</view>
							</label>
							<label>
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue3" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												异地被告身份查询费
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="enquire" placeholder="限额600元" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
							<label v-if="apply_lawyer == 0">
								<view class="why-checkbox">
									<view class="checkbox-left"><checkbox color="#FFC801" style="transform: scale(0.7);" value="checkValue4" disabled="" checked="" /></view>
									<view class="checkbox-right">
										<view class="checkbox-item">
											<view class="why-txt">
												律师费用
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="lawyer" placeholder="请输入" placeholder-class="placeholder" /></view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">委托代理合同</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">委托人主体资料</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">起诉状（委托人已签章）</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt">立案受理通知书</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
									</view>
								</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要申请</button></view>
		<!-- 超出5000弹出层 -->
		<uni-popup ref="popupOver5000" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="现在协商"
				cancleTxt="已协商好"
				content=""
				:before-close="true"
				@confirm="
					closePop('popupOver5000');
					$refs.popupTel.open();
				"
				@close="
					closePop('popupOver5000');
					addInfo();
				"
			>
				<view class="">
					本案累计申请金额已超过
					<text class="red">5000</text>
					元， 需要投资人审批，请先与投资人协 商一致。
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			case_money: '',
			case_time: '',
			case: [],
			announce_money: '',
			announce: [],
			enquire: '',
			lawyer: '',
			contract: [],
			main: [],
			indictment: [],
			note: [],
			result: [],
			investor_mobile: '',
			apply_lawyer: 0 //是否申请投资费用1申请  0未申请过律师费
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
		if (params.investor_mobile) {
			this.investor_mobile = params.investor_mobile;
		}
		if (params.apply_lawyer) {
			this.apply_lawyer = Number(params.apply_lawyer);
		}
	},
	methods: {
		resultChange(e) {
			this.result = e.detail.value;
		},
		async confirm() {
			let sum = Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) + Number(this.lawyer);
			if (sum > 5000) {
				this.$refs.popupOver5000.open();
				return;
			}
			if (sum < 0.01) {
				uni.showToast({
					title: '申请投资费用需大于0',
					icon: 'none'
				})
				return;
			}
			this.addInfo();
		},
		async addInfo() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				case_money:Number(this.case_money),
				case_time: this.case_time,
				case: this.case,
				announce_money: Number(this.announce_money),
				announce: this.announce,
				enquire: Number(this.enquire),	
				lawyer: Number(this.lawyer),
				contract: this.contract,
				main: this.main,
				indictment: this.indictment,
				note: this.note
			};

			let res = await this.$api('index.lawyer_apply', formData);
			if (res.code == 1) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.init();
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 150rpx;
}
.result-ipt {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-checkbox {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.checkbox-left {
			width: 60rpx;
		}
		.checkbox-right {
			width: calc(100% - 60rpx);
			.checkbox-item {
				display: flex;
				margin-bottom: 20rpx;
				flex-wrap: wrap;
			}
			.why-ipt-box {
				flex: 1;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				vertical-align: bottom;
				margin-left: 20rpx;
				padding-bottom: 4rpx;
			}
		}
	}
}
.arrow-right {
	margin-top: 10rpx;
	width: 100%;
	border-bottom: none;
	display: flex;
	.arrow-img {
		margin-top: 10rpx;
		width: 26rpx;
		height: 26rpx;
	}
}
</style>
