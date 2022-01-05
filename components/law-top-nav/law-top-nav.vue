<template>
	<view class="fixedTop">
		<view class="top-nav-box">
			<view class="nav-back" @click="navBack()">
				<view class="image-wrapper"><image src="@/static/img/write-back.png" mode="aspectFit"></image></view>
			</view>
			<view class="nav-txt flex1">{{ title }}</view>
			<view class="nav-right">
				<template v-if="title == '邀请好友'">
					<view class="nar-right-txt" @click="jump('/pages/client/user/my_invite')">我的邀请</view>
				</template>
				<template v-else>
					<view class="image-wrapper2" @click="$refs.telephoneServiceTel.$refs.popupTel.open()"><image src="@/static/img/index-kf.png" mode="aspectFit"></image></view>
				</template>
			</view>
			<slot></slot>
		</view>

		<!-- 客服组件 -->
		<order-telephone name="如有技术问题请联系" phoneNumber="18820268653" ref="telephoneServiceTel"></order-telephone>
	</view>
</template>

<script>
export default {
	props: ['title'],
	data() {
		return {};
	},
	created() {},
	methods: {
		navBack() {
			if (this.title == '邀请好友') {
				uni.navigateBack({
					delta: 1
				});
			} else {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.onBackPress();
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('onBackPress', {}, res => {});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.top-nav-box {
	background: $uni-color-primary;
	color: #ffffff;
	text-align: center;
	position: relative;
	height: 88rpx;
	line-height: 88rpx;
	font-size: 32rpx;
	display: flex;
	width: 100%;
	.nav-txt {
		font-size: 32rpx;
	}
	.nav-back {
		width: 88rpx;
		height: 88rpx;
		position: absolute;
		top: 0;
		left: 0;
		.image-wrapper {
			margin-left: 14rpx;
			box-sizing: border-box;
			width: 34rpx;
			height: 34rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.nav-right {
		display: flex;
		padding-right: 20rpx;
		position: absolute;
		top: 0;
		right: 0;
		.image-wrapper {
			margin-top: 10rpx;
			margin-right: 20rpx;
			width: 70rpx;
			height: 70rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.image-wrapper2 {
			margin-top: 15rpx;
			width: 50rpx;
			height: 50rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nar-right-txt {
			font-size: 32rpx;
		}
	}
}
</style>
