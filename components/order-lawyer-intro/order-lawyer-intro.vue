<template>
	<view class="lawyer-box">
		<view class="lawyer-title" @click="jump('/pages/client/user/lawyer-detail', { lawyerId: infoLawyer.user_id })">
			<view class="title-left">服务律师</view>
			<view class="title-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
		</view>
		<view class="lawyer-con">
			<view class="lawyer-left">
				<view class="image-wrapper"><image :src="infoLawyer.image" mode="widthFix"></image></view>
			</view>
			<view class="lawyer-right">
				<view class="lawyer-name">
					<view class="name-left">{{ infoLawyer.lawyer }}</view>
					<view class="title-year">
						<view class="year-img"><image src="@/static/img/lawyer-list-icon5.png" mode="aspectFit"></image></view>
						<view class="year-num">执业{{ infoLawyer.years }}年</view>
					</view>
					<view class="name-right" @click="collect">
						<view class="image-wrapper" v-if="infoIsFavor.is_favor == 0"><image src="@/static/img/collect.png" mode="aspectFit"></image></view>
						<view class="image-wrapper" v-else><image src="@/static/img/collected.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="lawyer-item">
					<view class="item-left">
						<view class="image-wrapper"><image src="@/static/img/person.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-txt">
						<text class="item-txt" v-for="item in infoLawyer.area" :key="item.id">{{ item.area_name }}</text>
					</view>
				</view>
				<view class="lawyer-item">
					<view class="item-left">
						<view class="image-wrapper"><image src="@/static/img/locat.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-txt">{{ infoLawyer.province }}{{ infoLawyer.city }}</view>
				</view>
				<view class="lawyer-item">
					<view class="item-left">
						<view class="image-wrapper"><image src="@/static/img/address.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-txt">{{ infoLawyer.address }}</view>
				</view>
				<view class="lawyer-item">
					<view class="item-left">
						<view class="image-wrapper"><image src="@/static/img/code.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-txt">{{ infoLawyer.code }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['infoLawyer','random'],
	data() {
		return {
			infoIsFavor: {}
		};
	},
	watch: {
		random(val, oldVal) {
			if (oldVal) {
				this.init();
			}
		}
	},
	created() {
		this.init();
	},
	methods: {
		async init() {
			let formData = {
				lawyer: this.infoLawyer.user_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.isFavor', formData);
			if (res.code == 1) {
				this.infoIsFavor = res.data;
			}
		},
		async collect() {
			let formData = {
				id: this.infoLawyer.user_id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.lawyerFavor', formData);
			if (res.code == 1) {
				this.init();
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.lawyer-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	padding: 30rpx;
	.lawyer-title {
		display: flex;
		font-weight: bold;
		margin-bottom: 20rpx;
		.title-left {
			flex: 1;
		}
		.title-nav {
			width: 16rpx;
			padding-top: 6rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.lawyer-con {
		display: flex;
	}
	.lawyer-left {
		font-weight: bold;
		width: 100rpx;
		margin-right: 30rpx;
		.image-wrapper {
			width: 100rpx;
			height: 100rpx;
			border-radius: 20rpx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	.lawyer-right {
		flex: 1;
		.lawyer-name {
			display: flex;
			margin-bottom: 20rpx;
			justify-content: space-between;
			.name-left {
				font-size: 16px;
				font-weight: bold;
				margin-right: 10px;
			}
			.name-right {
				padding-left: 10rpx;
				.image-wrapper {
					width: 30rpx;
					height: 30rpx;
					image {
						vertical-align: middle;
						width: 100%;
						height: 100%;
					}
				}
			}
			.name-center {
				flex: 1;
			}
		}
		.lawyer-tip {
			margin-bottom: 20rpx;
			color: #666666;
			font-size: 26rpx;
		}
		.lawyer-item {
			margin-bottom: 10rpx;
			display: flex;
			.item-left {
				margin-right: 10rpx;
				.image-wrapper {
					width: 30rpx;
					height: 30rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.item-txt {
				color: #aaa;
				font-size: 26rpx;
				flex: 1;
			}
		}
	}
}
</style>
