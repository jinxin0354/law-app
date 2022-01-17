<template>
	<view class="flex flex-vertical wait-box" v-if="list.tui_pay.length > 0 ">
		<view class="wait-item flex flex-vertical" >
			<view class="wait-title">付款详情</view>
			<!--
				退款缺少弹窗
				弹框内容从 item.popup 读取 
			 -->
			<view class="flex flex-horizontal item " v-for="item in list.tui_pay" @click="itemClick(item)">
				<view class="item-money">¥{{item.money}}</view>
				<view class="flex flex-horizontal flex-1">
					<view class="flex flex-vertical">
						<text>{{item.new_name}}</text>
						<text>{{item.new_time}}</text>
					</view>
					<image v-if="item.type == 8 || item.type == 3 || item.type == 7" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-1"></view>
						<text class="status-text">{{item.status}}</text>
					</view>
				</view>
			</view>
			<view class="flex flex-horizontal item " v-for="item in list.pay_tui_apply" @click="itemClick(item)">
				<view class="item-money">¥{{item.money}}</view>
				<view class="flex flex-horizontal flex-1">
					<view class="flex flex-vertical">
						<text>{{item.new_name}}</text>
						<text>{{item.new_time}}</text>
					</view>
					<image v-if="item.type == 8 || item.type == 3 || item.type == 7" class="image-r" src="@/static/img/right.png" mode="widthFix"></image>
					<view class="flex flex-horizontal flex-1">
						<view class="flex flex-1"></view>
						<text class="status-text">{{item.status}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	props: ['info','list'],
	data() {
		return {
			
		};
	},
	created() {},
	methods: {
		itemClick(item) {
			this.$emit('popupShow',item)
		},
	}
};
</script>

<style>
	.status-text {
		text-align: right;
		color: #999;
	}
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 35px;
	}
	.item {
		margin-top: 12px;
		margin-bottom: 12px;
	}
</style>

<style lang="scss"></style>
