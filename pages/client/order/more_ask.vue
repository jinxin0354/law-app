<template>
	<view class="content">
		<view class="ask-box">
			<view class="ask-item" v-for="(item, index) in question">
				<view class="item-title">
					<view class="title-ask"><image src="@/static/img/ask-icon6.png" mode="aspectFit"></image></view>
					<text class="title-word">{{ item.question }}</text>
				</view>
				<view class="item-noreply" v-if="item.answer.length == 0">暂无回复</view>
				<view class="" v-for="(items, indexs) in item.answer">
					<view class="" v-if="indexs == 0">
						<view class="item-user">
							<view class="user-answer"><image src="@/static/img/ask-icon7.png" mode="aspectFit"></image></view>
							<text class="user-info">用户 {{ items.username.replace(/(\d{3})\d*(\d{4})/, '$1****$2') }}</text>
							<text class="user-time">{{ items.createtime }}</text>
						</view>
						<view class="item-comment">
							<text class="comment-txt">{{ items.answer }}</text>
							<view class="" @click="changeZan(items.id)">
								<view class="comment-img" v-if="items.is_zan == 0">
									<image src="@/static/img/ask-icon2.png" style="transform:scale(0.9 )" mode="aspectFit"></image>
								</view>
								<view class="comment-img" v-else><image src="@/static/img/ask-icon3.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
							</view>

							<view class="comment-num">{{ items.zan }}</view>
						</view>
						<view class="" v-if="item.answer.length > 1">
							<view class="item-cut"></view>
							<view class="item-more" v-if="reply" @click="changeReply()">
								<view class="more-txt">更多回答</view>
								<view class="more-img"><image src="@/static/img/ask-icon1.png" mode="aspectFit"></image></view>
							</view>
						</view>
					</view>
					<view class="" v-if="indexs != 0" >
						<view class="" v-if="reply == false">
							<view class="item-user ml">
							<!-- 	<view class="user-answer"><image src="@/static/img/ask-icon7.png" mode="aspectFit"></image></view> -->
								<text class="user-info">用户 {{ items.username }}</text>
								<text class="user-time">{{ items.createtime }}</text>
							</view>
							<view class="item-comment" @click="changeZan(items.id)">
								<text class="comment-txt">{{ items.answer }}</text>
								<view class="" v-if="items.is_zan == 0">
									<view class="comment-img"><image src="@/static/img/ask-icon2.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
								</view>
								<view class="" v-if="items.is_zan == 1">
									<view class="comment-img"><image src="@/static/img/ask-icon3.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
								</view>

								<view class="comment-num">{{ items.zan }}</view>
							</view>
							<view class="item-cut"></view>
							<view class="nomore" v-if="indexs == item.answer.length - 1">
								<view class="item-more" @click="packUp()"><view class="more-txt">收起</view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item-fix"></view>
			<view class="ask-footer">
				<view class="footer-item">
					<view class="item-input"><input class="input-item" type="text" v-model="add_question" placeholder="您的回答，可以帮助很多人哦~" /></view>
					<view class="item-img" @click="addAnswer()"><image src="@/static/img/ask-icon9.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
export default {
	data() {
		return {
			question: [], //问答列表
			reply: false, //显示更多回复
			more: true, //更多回答
			add_question: '', //问题,
			is_reply: true, //评论
			answer_id: '' ,//要回复的问题id，
		};
	},
	onLoad(options) {
		this.answer_id = options.id;
		this.init();
	},
	methods: {
		init() {
			let that = this;
			let formData = {
				token: uni.getStorageSync('token'),
				id: this.answer_id
			};
			that.$api('index.question_detail', formData).then(res => {
				this.question = res.data;
				
			});
		},
		//更多回答
		changeReply(data) {
			this.reply = false;
		},
		//收起
		packUp(data) {
			this.reply = true;
		},
		//点赞
		changeZan(data) {
			let formData = {
				id: data,
				token: uni.getStorageSync('token')
			};
			this.$api('index.zanAnswer', formData).then(res => {
				this.init();
			});
		},
		addAnswer() {
			let formData = {
				token: uni.getStorageSync('token'),
				type: 1,
				id: this.answer_id,
				answer: this.add_question
			};
			if (this.add_question != '') {
				this.$api('index.answer', formData).then(res => {
					this.init();
				});
			}
			this.add_question = '';
			this.is_reply = true;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f6f6f6;
}
.content {
	position: relative;
}
.ask-box {
	.ask-item {
		background-color: #ffffff;
		margin: 0 20rpx 20rpx;
		border-radius: 20rpx;
		.item-noreply {
			height: 50rpx;
			color: #999999;
			font-size: 28rpx;
			line-height: 26rpx;
			margin-left: 76rpx;
		}
		.item-title {
			display: flex;
			// margin-top: 26rpx;
			margin: 26rpx 0 33rpx 0;
			.title-ask {
				width: 38rpx;
				height: 38rpx;
				margin: 33rpx 20rpx 0 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.title-word {
				flex: 1;
				color: #000000;
				font-weight: bold;
				font-size: 34rpx;
				line-height: 32rpx;
				margin-top: 35rpx;
			}
			.title-speak {
				color: #ffa800;
				font-size: 30rpx;
				line-height: 28rpx;
				margin: 38rpx 24rpx 0 0;
			}
		}
		.ml {
			margin-top: 20rpx;
			margin-left: 76rpx;
		}
		.item-user {
			display: flex;
			.user-answer {
				display: flex;
				width: 38rpx;
				height: 39rpx;
				image {
					width: 100%;
					height: 100%;
				}
				margin: 0rpx 18rpx 0 22rpx;
			}
			.user-info {
				flex: 1;
				color: #999999;
				font-size: 28rpx;
				line-height: 26rpx;
				margin-top: 10rpx;
			}
			.user-time {
				flex: 1;
				color: #8c8c8c;
				font-size: 24rpx;
				line-height: 19rpx;
				margin: 10rpx 22rpx 0 0;
				text-align: right;
			}
			.img-answer {
				background-color: #ffffff;
			}
		}
		.item-comment {
			display: flex;
			.nomore {
				flex: 1;
				background-color: #000000;
			}
			.comment-txt {
				flex: 1;
				font-size: 28rpx;
				line-height: 29rpx;
				margin: 27rpx 0 20rpx 80rpx;
			}
			.comment-img {
				width: 33rpx;
				height: 35rpx;
				margin: 23rpx 8px 0 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.img-right {
				margin-right: 50rpx;
			}
			.comment-num {
				color: #ffa800;
				font-size: 28rpx;
				line-height: 22rpx;
				margin: 35rpx 24rpx 0 0;
			}
		}
		.comment-answer {
			margin-left: 171rpx;
			.answer-user {
				font-size: 28rpx;
				line-height: 26rpx;
				margin: 40rpx 0 28rpx 0;
				color: #8c8c8c;
			}
			.answer-info {
				display: flex;
				.answer-txt {
					flex: 1;
					font-size: 28rpx;
					line-height: 28rpx;
				}
				.answer-img {
					width: 33rpx;
					height: 35rpx;
					margin-right: 50rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.comment-cut {
			margin: 39rpx auto 0;
			width: 663rpx;
			height: 1rpx;
			background-color: #f6f6f6;
		}
		.item-reply {
			display: flex;
			.reply-info {
				font-size: 28rpx;
				line-height: 27rpx;
				color: #ffa800;
				margin: 30rpx 8rpx 44rpx 81rpx;
			}
			.reply-img {
				width: 12rpx;
				height: 22rpx;
				margin-top: 22rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.item-cut {
			margin: 0 auto;
			width: 663rpx;
			height: 1rpx;
			background-color: #f6f6f6;
		}
		.item-more {
			display: flex;
			justify-content: center;
			.more-txt {
				font-size: 28rpx;
				line-height: 27rpx;
				margin: 27rpx 11rpx 34rpx 0rpx;
				color: #999999;
			}
			.more-img {
				width: 32rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.item-fix {
		height: 106rpx;
	}
	.ask-footer {
		width: 100%;
		height: 106rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: 0;
		z-index: 1000;
		.footer-item {
			display: flex;
			.item-input {
				display: flex;
				height: 68rpx;
				background-color: #f3f3f4;
				flex: 1;
				border-radius: 34rpx;
				margin: 19rpx 0 0 19rpx;
				align-items: center;
				.input-item {
					width: 560rpx;
					margin-left: 35rpx;
					font-size: 30rpx;
				}
			}
			.item-img {
				width: 45rpx;
				height: 45rpx;
				margin: 30rpx 37rpx 0 29rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
