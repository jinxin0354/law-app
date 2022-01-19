<template>
	<view class="content">
		<view class="match-top-box" v-if="order_fee > 0">
			<view class="fontweightbold">退款金额</view>
			<view>退款至您平台账户，您可在"我的"-"余额"里查看</view>
			<view>
				<text class="marginright10">服务费用（除去优惠金额）</text>
				<text class="red">￥{{ info.order_money }}</text>
			</view>
			<view>
				<text class="marginright10">实退</text>
				<text class="red">￥{{ info.order_fee }}</text>
			</view>
		</view>
		<view class="why-box">
			<view class="why-title">取消原因（必选）</view>
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view class="why-radio">
						<radio :value="item.value" :checked="index === current" style="transform: scale(0.7);" color="#FFC801" />
						<view class="why-txt">{{ item.name }}</view>
						<view class="why-ipt-box" v-if="item.value == '5'"><input class="why-ipt" type="text" v-model="otherReason" placeholder="请输入" /></view>
					</view>
				</label>
			</radio-group>
			<view class="ok-box"><button type="default" class="ok-btn" :disabled="current == -1 ? true : false" @click="cancelOrder">立即取消</button></view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			items: [
				{
					value: '0',
					name: '还想再考虑下，具体考虑什么，我也不知道'
				},
				{
					value: '1',
					name: '不知道为啥定错了产品',
					checked: 'true'
				},
				{
					value: '2',
					name: '我想了想，还是更改订单换个律师好一点 '
				},
				{
					value: '3',
					name: '也没啥，只是想上来看看是不是真的能请律师  '
				},
				{
					value: '4',
					name: '价格倒没啥，就觉得产品似乎还可以再优化下  '
				},
				{
					value: '5',
					name: '其他'
				}
			],
			otherReason: '',
			current: -1,
			info: {},
			order_id: ''
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
			let res = await this.$api('index.cancel_order', formData);
			if (res.code == 1) {
				this.info = res.data;
			}
		},
		radioChange: function(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
		},
		async cancelOrder() {
			let reason;
			if (this.current == 5) {
				reason = this.otherReason;
			} else {
				reason = this.items[this.current].name;
			}
			let formData = {
				id: this.order_id,
				reason: reason,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.cancelOrder', formData);
			if (res.code == 1) {
				this.replace('/pages/client/user/order-cancel', { order_id: this.order_id });
			}
		}
	}
};
</script>

<style lang="scss">
.fontweightbold {
	font-weight: bold;
}
.marginright10 {
	margin-right: 10rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	padding: 30rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-radio {
		padding-bottom: 20rpx;
		display: flex;
		.why-txt {
			line-height: 50rpx;
		}
		.why-ipt-box {
			flex: 1;
			border-bottom: 1rpx solid #eee;
			vertical-align: bottom;
			margin-left: 20rpx;
			padding-bottom: 4rpx;
			padding-top: 6rpx;
		}
	}
}
.ok-box {
	padding-bottom: 0;
}
</style>
