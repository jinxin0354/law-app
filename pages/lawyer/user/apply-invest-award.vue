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
											<view class="why-txt require">
												投资人收益金额
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" v-model="money" placeholder="投资人此次收到多少钱" placeholder-class="placeholder" /></view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt require">委托人回款的银行流水</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" placeholder-class="placeholder" disabled="" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt require">委托人向投资人支付投资收益的付款记录</view>
											<view class="arrow-right" @click="jump('/pages/client/order/upload')">
												<input class="why-ipt flex1" type="text" placeholder="请上传资料" placeholder-class="placeholder" disabled="" />
												<image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image>
											</view>
										</view>
										<view class="checkbox-item">
											<view class="why-txt require gray">
												您的奖励金额
												<text>￥</text>
											</view>
											<view class="why-ipt-box"><input class="why-ipt" type="number" disabled="" v-model="price" placeholder="投资人收益金额X10%" placeholder-class="placeholder" /></view>
										</view>
									</view>
								</view>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要结算</button></view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			order_id: '',
			money: '',//收益金额
			proof: '',//银行流水
			image: '',//付款记录
			price: '',//奖励金额
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
	},
	watch:{
		money(){
			if(this.money){
				this.price = this.money * 0.1
			}
		}
	},
	methods: {
		resultChange(e) {
			this.result = e.detail.value;
		},
		async confirm() {
			// TODO银行流水和付款记录
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				money: this.money,
				proof:this.proof,
				image:this.image,
				price: this.price,
				type:3
			};

			let res = await this.$api('index.money', formData);
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
