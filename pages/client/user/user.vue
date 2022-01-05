<template>
	<view class="content">
		<law-top-nav title="个人中心"></law-top-nav>
		<view class="od-box">
			<view class="od-item">
				<view class="item-right" @click="jump('/pages/client/user/wallet')">
					<view class="item-img"><image src="@/static/img/wallet.png" mode="aspectFit"></image></view>
					<view class="item-txt">钱包</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-right" @click="toOrder">
					<view class="item-img"><image src="@/static/img/user-order.png" mode="aspectFit"></image></view>
					<view class="item-txt">订单</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-right" @click="jump('/pages/client/user/invite')">
					<view class="item-img"><image src="@/static/img/user-invite.png" mode="aspectFit"></image></view>
					<view class="item-txt">邀请好友</view>
					<view class="item-txt2">高达25%的提成</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		...mapMutations(['out_login']),
		loginOut() {
			this.out_login();
			this.$Router.replace('/');
		},
		toOrder() {
			if (this.userInfo.user_type == 1) {
				this.jump('/pages/client/user/order');
			} else if (this.userInfo.user_type == 2) {
				this.jump('/pages/specialist/user/receive-order');
			} else if (this.userInfo.user_type == 3) {
				this.jump('/pages/lawyer/user/receive-order');
			}else if (this.userInfo.user_type == 4) {
				this.jump('/pages/lawyer/user/receive-order');
			}
		}
	}
};
</script>

<style lang="scss">
.content{
	padding-top: 88rpx;
}
.od-box {
	padding: 0 30rpx;
	.item-right {
		.item-circle {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: 1rpx solid #ccc;
			margin-right: 20rpx;
			text-align: center;
			line-height: 80rpx;
		}
		.item-img {
			width: 32rpx;
			margin-right: 20rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.item-txt {
			line-height: 92rpx;
		}
		.item-txt2 {
			line-height: 92rpx;
		}
	}
}
</style>
