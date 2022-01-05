<template>
	<view class="od-box" v-if="info.order.virtual && info.order.virtual.length > 0">
		<view class="od-title">律师解答录音</view>
		<view class="voice-item" v-for="(item, index) in virtualList">
			<view class="voice-left">解答</view>
			<template v-if="!item.isCreated">
				录音生成中，预计5分钟左右...
				<view class="voice-no-create" style="display: none;">
					<text class="txt-down">
						<uni-countdown
							:show-day="true"
							:day="item.remainTime.day"
							:hour="item.remainTime.hour"
							:minute="item.remainTime.minute"
							:second="item.remainTime.second"
							color="#f00"
							splitorColor="#f00"
							@timeup="timeup"
						></uni-countdown>
					</text>
					后生成录音
				</view>
			</template>
			<template v-else>
				<view class="voice-center">{{ item.start }}</view>
				<view class="voice-right" @click="playVirtual(item)">
					<view class="image-wrapper" v-if="item.isPlay"><image src="@/static/img/record-stop.png" mode="aspectFit"></image></view>
					<view class="image-wrapper" v-else><image src="@/static/img/record-play.png" mode="aspectFit"></image></view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
export default {
	props: ['info', 'random'],
	data() {
		return {
			virtualList: [],
			innerAudioContext: ''
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
		this.initAudio();
	},
	destroyed() {
		// 清除录音
		this.innerAudioContext.destroy();
	},
	methods: {
		init() {
			this.virtualList = this.info.order.virtual;
			this.virtualList.forEach((item, index) => {
				this.$set(item, 'isPlay', false);
				this.$set(item, 'remainTime', this.timeFn(item.end));
				if (item.remainTime.day >= 0 && item.remainTime.hour >= 0 && item.remainTime.minute >= 0 && item.remainTime.minute <= 10) {
					this.$set(item, 'isCreated', false);
				} else {
					this.$set(item, 'isCreated', true);
				}
			});
		},
		timeup() {
			this.$emit('init');
		},
		initAudio() {
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.onPlay(() => {
				console.log('开始播放');
			});
			this.innerAudioContext.onPause(() => {
				console.log('暂停播放');
				this.init();
			});
			this.innerAudioContext.onError(res => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
		},
		// 播放录音
		playVirtual(item) {
			this.innerAudioContext.src = item.url;
			// 测试音频
			// this.innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
			if (!item.isPlay) {
				this.init();
				item.isPlay = true;
				this.innerAudioContext.play();
			} else {
				item.isPlay = false;
				this.innerAudioContext.pause();
			}
		}
	}
};
</script>

<style lang="scss">
.voice-item {
	display: flex;
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	align-items: center;

	&:nth-last-of-type(1) {
		margin-bottom: 0;
	}

	.voice-left {
		min-width: 120rpx;
		margin-right: 30rpx;
	}

	.voice-center {
		flex: 1;
	}
	.voice-no-create {
		text-align: right;
		.txt-down {
			display: inline-block;
		}
	}

	.voice-right {
		width: 200rpx;
		text-align: right;
		.image-wrapper {
			float: right;
			width: 30rpx;
			height: 30rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
