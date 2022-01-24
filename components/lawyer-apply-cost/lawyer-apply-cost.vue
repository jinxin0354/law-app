<template>
	<uni-popup ref="lawyerApply" type="center">
		<order-popup-common title="申请投资费用" @closePop="closePop('lawyerApply')">
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;">
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">付款人</text>
						<text>投资人</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">案件受理费</text>
						<text class="money-text">¥{{item.case_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text class="flex flex-1">缴纳截止日期</text>
						<image class="image-icon" src="@/static/img/icon/calendar.png" mode="widthFix"></image>
						<text style="margin-left: 5px;">{{item.case_time}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.case != ''" @click="clickPhoto(item.case)">
						<text class="flex flex-1">案件受理费缴纳通知书</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.announce_money > 0">
						<text class="flex flex-1">公告费</text>
						<text class="money-text">¥{{item.announce_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.announce != ''" @click="clickPhoto(item.announce)">
						<text class="flex flex-1">公告费缴纳通知书</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.enquire > 0">
						<text class="flex flex-1">异地被告身份查询费</text>
						<text class="money-text">¥{{item.enquire}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.lawyer > 0">
						<text class="flex flex-1">律师费</text>
						<text class="money-text">¥{{item.lawyer}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item"  v-if="item.contract != ''" @click="clickPhoto(item.contract)">
						<text class="flex flex-1">委托代理合同</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.main != ''" @click="clickPhoto(item.main)">
						<text class="flex flex-1">委托人主体资料</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.indictment != ''" @click="clickPhoto(item.indictment)">
						<text class="flex flex-1">起诉状（委托人已签章）</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
					
					<view class="flex flex-horizontal flex-center-v item"  v-if="item.note != ''" @click="clickPhoto(item.note)">
						<text class="flex flex-1">立案受理通知书</text>
						<image class="image-icon" src="@/static/img/icon/list_icon.png" mode="widthFix"></image>
						<image class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('lawyerApply')">
				<view class="comfir-btn flex flex-center" style="width: 180px;height: 38px;border-radius: 38px;">我知道了</view>
			</view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
	export default {
		props: ['item'],
		methods: {
			clickPhoto(photo) {
				if (photo == '') {
					uni.showToast({
						title: '暂无图片',
						icon: 'none'
					})
					return
				}
				uni.previewImage({
					urls: photo.split(','),
					indicator: 'number',
					loop:true
				})
			}
		}
	}
</script>

<style>
	.image-icon {
		width: 37rpx;
		height: 34rpx;
	}
	.item {
		height: 40px;
		padding: 0 15px;
	}
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 7.5px;
	}
</style>
