<template>
	<view class="content">
		<view class="datum-box">
			<view class="datum-item">
				<view class="item-title">{{ info.title }}</view>
				<view class="item-name" @click="jump('/pages/client/user/lawyer-detail', { lawyerId: userInfo.id })">{{ userInfo.username }}律师</view>
				<view class="datum-img-box"><image class="item-image" :src="item.url" v-for="item in info.source" mode="widthFix"></image></view>
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
		return {
			info: {}
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad(params) {
		if (params.title && params.source) {
			this.info.title = params.title;
			this.info.source = JSON.parse(params.source);
			console.log(params);
			console.log(this.info.source);
		}
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
	padding-bottom: 95rpx;
}
.demo-txt {
	padding: 30rpx;
	line-height: 50rpx;
}
.datum-box {
	height: 100%;
	.datum-item {
		.datum-img-box {
			.item-image {
				width: 100%;
				display: block;
			}
		}

		.item-title {
			font-size: 34rpx;
			font-weight: bold;
			text-align: center;
			line-height: 32rpx;
			padding-top: 58rpx;
		}
		.item-name {
			flex: 1;
			font-size: 32rpx;
			text-align: right;
			line-height: 35rpx;
			color: #ffca00;
			margin: 29rpx 108rpx 50rpx 0;
		}
		.item-txt {
			text-indent: 2em;
			font-size: 32rpx;
			line-height: 70rpx;
			margin: 0 40rpx;
		}
		.item-nav {
			width: 683rpx;
			height: 212rpx;
			margin: 141rpx auto 56rpx;
			border: 2rpx #e6e6e6 solid;
			border-radius: 14rpx;
			display: flex;
			.nav-txt {
				width: 208rpx;
				height: 161rpx;
				font-size: 26rpx;
				margin: 25rpx 0 0 31rpx;
			}
			.nav-give {
				margin-left: 292rpx;
				.give-s,
				.give-z {
					width: 130rpx;
					height: 60rpx;
					font-size: 32rpx;
					background-color: #ffc900;
					color: #ffffff;
					margin-top: 30rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
				}
				.color {
					background-color: #f0f0f0;
				}
			}
		}
		.item-down {
			.item-download {
				width: 680rpx;
				height: 80rpx;
				margin: 0 auto;
				background-color: #ffc900;
				text-align: center;
				font-size: 32rpx;
				line-height: 80rpx;
				border-radius: 40rpx;
				color: #ffffff;
			}
		}
	}
}
.popup-Ensure-box {
	background-color: #ffffff;
	width: 520rpx;
	height: 274rpx;
	border-radius: 20rpx;
	.popup-txt {
		display: flex;
		justify-content: center;
		padding-top: 80rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}
	.popup-cut {
		height: 1rpx;
		width: 100%;
		background-color: #e0e0e0;
		margin-top: 63rpx;
	}
	.popup-sure {
		display: flex;
		justify-content: center;
		font-size: 32rpx;
		line-height: 30rpx;
		margin-top: 29rpx;
	}
}
.right-box {
	font-size: 32rpx;
	text-align: center;
	display: flex;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
	background-color: #ffffff;
	.right-item {
		flex: 1;
		font-size: 24rpx;
		text-align: center;
		margin-left: 20rpx;
		.image-wrapper {
			margin: 0 auto 20rpx;
			width: 50rpx;
			height: 50rpx;
			image {
				margin: auto;
				width: 100%;
				height: 100%;
			}
		}
	}
}
.other-reward-prize {
	width: 100% !important;
	margin-top: 20rpx;
	position: relative;
	.other-tip {
		font-size: 24rpx;
		left: 10rpx;
		position: absolute;
		top: 0rpx;
	}
	.ipt-border {
		padding-left: 160rpx;
	}
}
</style>
