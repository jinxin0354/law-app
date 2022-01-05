<template>
	<view class="content">
		<view class="time-top">
			<view class="top-title require">选择日期</view>
			<!-- 插入模式 -->
			<uni-calendar class="uni-calendar--hook" :date="date" :start-date="startDate" :showMonth="false" @change="change" />
		</view>
		<view class="time-bot">
			<view class="bot-title require">选择时间段</view>

			<view class="flex">
				<input type="text" class="picker-time" v-model="time" placeholder="请选择" disabled @click="showTime = true" />
				<view class="picker-tip">请在08:30-12:00、14:00-18:00之间选择</view>
			</view>

			<view class="check-time" v-if="this.time">开始时间：{{ this.time }}，结束时间：{{ this.endTime }}</view>
			<u-picker mode="time" v-model="showTime" :params="params" confirm-color="#FFC801" @confirm="confirmTime"></u-picker>
		</view>
		<view class="ok-box"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
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
			weeks: '周' + '天一二三四五六'.charAt(new Date().getDay()),
			time: '',
			showTime: false,
			params: {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true,
				second: false
			},
			serviceDuration: '',
			endTime: '' //结束时间
		};
	},
	onReady() {
		this.$nextTick(() => {
			this.showCalendar = true;
		});
	},
	onLoad(params) {
		if (params.serviceDuration) {
			this.serviceDuration = params.serviceDuration;
		}
	},
	methods: {
		change(e) {
			this.date = e.fulldate;
			this.weeks = e.lunar.ncWeek;
		},
		confirmTime(e) {
			this.time = e.hour + ':' + e.minute;
			this.endTime = this.getMinutesLater(this.date + ' ' + this.time);
		},
		confirm() {
			if (!this.time) {
				uni.showToast({
					icon: 'none',
					title: '请选择时间段'
				});
				return;
			}
			let res = this.date + ' ' + this.weeks + ' ' + this.time + '-' + this.endTime;
			let pages = getCurrentPages();
			let prePage = pages[pages.length - 2];
			prePage.$vm.onDatetimeChange(res);
			uni.navigateBack({
				delta: 1
			});
		},
		getMinutesLater(d) {
			let date = new Date(d.replace(/-/g, '/'));
			date.setMinutes(date.getMinutes() + parseInt(this.serviceDuration));
			return date.getHours() + ':' + date.getMinutes();
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
	padding-top: 30rpx;
	.top-title {
		padding: 0 30rpx 0;
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
		width: 160rpx;
		box-sizing: border-box;
		height: 70rpx;
		padding: 0 20rpx;
		text-align: center;
		line-height: 70rpx;
		margin-right: 10rpx;
	}
	.picker-tip{
		color: #f00;
		line-height: 70rpx;
	}
}

.ok-box {
	background-color: transparent;
}
.check-time {
	margin-top: 20rpx;
}
</style>
