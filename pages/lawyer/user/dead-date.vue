<template>
	<view class="content">
		<view class="time-top">
			<view class="top-title require">选择日期</view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :date="date" :start-date="startDate" :showMonth="false" @change="change" />
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			date: getTomorrowDate(), //选中日期，法力中选中的为明天
			startDate: getTomorrowDate(), //开始日期，法力中从开始日期从明天开始
			time: ''
		};
	},
	onReady() {
	},
	onLoad() {},
	methods: {
		change(e) {
			this.date = e.fulldate;
		},
		bindTimeChange(e) {
			this.time = e.target.value;
		},
		confirm() {
			let res = this.date;
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			prePage.$vm.onDatetimeChange(res);
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
function getTomorrowDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate() + 1;
	var hours = date.getHours();
	return year + '-' + formatZero(month) + '-' + formatZero(day);
}
function formatZero(n) {
	if (n >= 0 && n <= 9) {
		return '0' + n;
	} else {
		return n;
	}
}
</script>

<style lang="scss">
.time-top {
	background-color: #ffffff;
	border-radius: 26rpx;
	overflow: hidden;
	margin-bottom: 20rpx;
	.top-title {
		padding: 30rpx 30rpx 0;
		font-weight: bold;
	}
}
.time-bot {
	background-color: #ffffff;
	border-radius: 26rpx;
	padding: 30rpx;
	.bot-title {
		margin-bottom: 20rpx;
		font-weight: bold;
	}
	.picker-time {
		background-color: #eeeeee;
		border-radius: 20rpx;
		width: 400rpx;
		.time-ipt {
			box-sizing: border-box;
			height: 70rpx;
			padding: 0 20rpx;
			letter-spacing: 10rpx;
			text-align: center;
			line-height: 70rpx;
		}
	}
}
</style>
