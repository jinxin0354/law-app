<template>
	<view class="content">
		<view class="ask-box">
			<view class="ask-item" v-for="(item, index_question) in dataList">
				<view class="item-title">
					<view class="title-ask"><image src="@/static/img/ask-icon6.png" mode="aspectFit"></image></view>
					<text
						class="title-word"
						@click="
							currentItem = item;
							$refs.popupSecend.open();
						"
					>
						{{ item.question }}
					</text>
					<text
						class="title-speak"
						@click="
							currentItem = item;
							questionFocus = true;
							replayType = 1;
						"
					>
						我说一句
					</text>
				</view>
				<!-- 暂无回复 -->
				<view class="item-noreply" v-if="item.answer.length == 0">暂无回复</view>
				<!-- 回复列表状态 -->
				<view v-if="item.answer.length > 0" :class="!item.isOpen ? 're-height' : ''">
					<view class="replay-item" v-for="(item_answer, index_answer) in item.answer">
						<view class="item-user">
							<view class="user-answer"><image src="@/static/img/ask-icon7.png" mode="aspectFit"></image></view>
							<text class="user-info">用户 {{ item_answer.username.replace(/(\d{3})\d*(\d{4})/, '$1****$2') }}</text>
							<text class="user-time">{{ item_answer.createtime }}</text>
						</view>
						<!-- 答案 -->
						<view
							class="item-comment"
							@click="
								currentItem = item_answer;
								$refs.popupThird.open();
							"
						>
							<text class="comment-txt">{{ item_answer.answer }}</text>
							<view class="comment-right" @click.stop="changeAnswerZan(item_answer, index_question)">
								<view class="comment-img" v-if="item_answer.is_zan == 0"><image src="@/static/img/ask-icon2.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
								<view class="comment-img" v-else><image src="@/static/img/ask-icon3.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
								<view class="comment-num">{{ item_answer.zan }}</view>
							</view>
						</view>
						<!-- 答案的评论列表 -->
						<view class="answer-child" v-for="(item_answer_child, index_answer_child) in item_answer.child">
							<view class="item-user">
								<view class="user-answer"></view>
								<text class="user-info">用户 {{ item_answer.username.replace(/(\d{3})\d*(\d{4})/, '$1****$2') }}</text>
								<text class="user-time">{{ item_answer.createtime }}</text>
							</view>
							<view class="item-comment">
								<text class="comment-txt">{{ item_answer_child.answer }}</text>
								<view class="comment-right" @click.stop="changeAnswerChildZan(item_answer_child, index_answer, index_question)">
									<view class="comment-img" v-if="item_answer_child.is_zan == 0">
										<image src="@/static/img/ask-icon2.png" style="transform:scale(0.9 )" mode="aspectFit"></image>
									</view>
									<view class="comment-img" v-else><image src="@/static/img/ask-icon3.png" style="transform:scale(0.9 )" mode="aspectFit"></image></view>
									<view class="comment-num">{{ item_answer_child.zan }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<template v-if="item.answer.length > 1 || (item.answer.length > 0 && item.answer[0] && item.answer[0].child.length > 0)">
					<view class="item-cut"></view>
					<view class="item-more" @click="changeReply(item)" v-if="!item.isOpen">
						<view class="more-txt">更多回答</view>
						<view class="more-img"><image src="@/static/img/ask-icon1.png" mode="aspectFit"></image></view>
					</view>
					<view class="item-more" @click="changeReply(item)" v-else>
						<view class="more-txt">收起</view>
						<view class="more-img" :class="item.isOpen ? 'rotate' : ''"><image src="@/static/img/ask-icon1.png" mode="aspectFit"></image></view>
					</view>
				</template>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
			<view class="item-fix"></view>
			<view class="ask-footer">
				<view class="footer-item">
					<view class="item-input">
						<input class="input-item" type="text" v-model="bottom_ipt" placeholder="我来问问,看大伙怎么说" :focus="questionFocus" @blur="questionFocus = false" />
					</view>
					<view class="item-img" @click="bottomReplay()"><image src="@/static/img/ask-icon9.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<!-- 点击问题的弹窗 -->
		<uni-popup ref="popupSecend" type="center">
			<order-popup-common title="" @closePop="closePop('popupSecend')">
				<view class="secendBox" slot="popup-con">
					<view
						class="secendItem"
						@click="
							copy(currentItem.question);
							$refs.popupSecend.close();
						"
					>
						复制
					</view>
					<view
						class="secendItem"
						@click="
							$refs.popupSecend.close();
							questionFocus = true;
							replayType = 1;
						"
					>
						我说一句
					</view>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 点击评论的弹窗 -->
		<uni-popup ref="popupThird" type="center">
			<order-popup-common title="" @closePop="closePop('popupThird')">
				<view class="secendBox" slot="popup-con">
					<view
						class="secendItem"
						@click="
							copy(currentItem.answer);
							$refs.popupThird.close();
						"
					>
						复制
					</view>
					<view
						class="secendItem"
						@click="
							$refs.popupThird.close();
							questionFocus = true;
							replayType = 2;
						"
					>
						回复
					</view>
				</view>
			</order-popup-common>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import uniCopy from '@/common/utils/js_sdk/xb-copy/uni-copy.js';
export default {
	data() {
		return {
			id:'',
			reply: false, //显示更多回复
			more: true, //更多回答
			is_reply: true, //评论
			answer_id: '', //要回复的问题id，

			bottom_ipt: '',
			questionFocus: false,
			page: 1, //分页加载
			loadingType: 'more', //加载更多状态
			dataList: [],
			currentItem: {},
			replayType: 0 ,//回复类型，0：提问题，1评论问题 2 回复评论
			product_name:''
		};
	},
	onNavigationBarButtonTap(e) {
		if (e.index == 1) {
			this.goShare();
		}
	},
	onLoad(params) {
		if (params.id && params.product_name) {
			this.id = params.id;
			this.product_name = params.product_name;
			this.init();
		}
	},
	methods: {
		init() {
			this.loadData('refresh');
		},
		//带下拉刷新和上滑加载
		async loadData(type = 'add', loading) {
			if (type === 'add') {
				if (this.loadingType === 'nomore') {
					return;
				}
				this.loadingType = 'loading';
			} else if (type === 'refresh') {
				this.loadingType = 'loading';
				this.page = 1;
				this.dataList = [];
			} else {
				this.loadingType = 'more';
			}

			let formData = {
				id:this.id,
				page: this.page
			};
			let res = await this.$api('index.question', formData);
			if (res.code == 1) {
				let dataList = res.data.question;
				dataList.forEach((item, index) => {
					this.$set(item, 'isOpen', false);
				});
				this.page++;
				this.dataList = this.dataList.concat(dataList);

				this.loadingType = res.data.current_page >= res.data.total_page ? 'nomore' : 'more';

			}
		},
		//更多回答
		changeReply(data) {
			this.dataList.forEach((item, index) => {
				if (item.id == data.id) {
					item.isOpen = !item.isOpen;
				}
			});
		},
		//答案点赞
		async changeAnswerZan(item_answer, index_question) {
			let formData = {
				id: item_answer.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.zanAnswer', formData);
			if (res.code == 1) {
				this.dataList[index_question].answer.forEach((item, index) => {
					if (item.id == item_answer.id) {
						if (res.msg == '点赞成功') {
							item.is_zan = 1;
							item.zan++;
						} else {
							item.is_zan = 0;
							item.zan--;
						}
					}
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},
		async changeAnswerChildZan(item_answer_child, index_answer, index_question) {
			let formData = {
				id: item_answer_child.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.zanAnswer', formData);
			if (res.code == 1) {
				this.dataList[index_question].answer[index_answer].child.forEach((item, index) => {
					if (item.id == item_answer_child.id) {
						if (res.msg == '点赞成功') {
							item.is_zan = 1;
							item.zan++;
						} else {
							item.is_zan = 0;
							item.zan--;
						}
					}
				});
				uni.showToast({
					title: res.msg,
					icon: 'none'
				});
			}
		},

		//底部提交按钮
		async bottomReplay() {
			if (!this.bottom_ipt) {
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				});
				return;
			}

			if (this.replayType == 0) {
				let formData = {
					id:this.id,
					question: this.bottom_ipt,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.addQuestion', formData);
				if (res.code == 1) {
					this.bottom_ipt = '';
					this.init();
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			} else if (this.replayType == 1 || this.replayType == 2) {
				let formData = {
					token: uni.getStorageSync('token'),
					type: this.replayType,
					id: this.currentItem.id,
					answer: this.bottom_ipt
				};
				let res = await this.$api('index.answer', formData);
				if (res.code == 1) {
					this.bottom_ipt = '';
					this.init();
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			}
			this.replayType = 0;
		},
		copy(str) {
			uniCopy({
				content: str,
				success: res => {
					uni.showToast({
						title: res,
						icon: 'none'
					});
				},
				error: e => {
					uni.showToast({
						title: e,
						icon: 'none',
						duration: 3000
					});
				}
			});
		},
		goShare() {
			let shareInfo = {
				title: `关于${this.product_name}的评论都在这儿，您参考下`,
				content: '都是用过的人反馈的信息，整体比较靠谱，可以参考一下',
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/order/ask?id=${this.id}&product_name=${this.product_name}`
			};
		
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.share(JSON.stringify(shareInfo));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('share', shareInfo, data => {
					// 处理返回数据
					console.log(data, '我走了这里');
				});
			}
		},
		
	},
	//加载更多
	onReachBottom() {
		this.loadData();
	}
};
</script>

<style lang="scss">
.ask-box {
	.ask-item {
		background-color: #ffffff;
		margin: 0 20rpx 20rpx;
		border-radius: 20rpx;
		.item-noreply {
			height: 50rpx;
			color: #aaa;
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
				line-height: 50rpx;
				margin-top: 24rpx;
			}
			.title-speak {
				color: #ffa800;
				font-size: 30rpx;
				line-height: 28rpx;
				margin: 32rpx 24rpx 0 0;
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
				color: #aaa;
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
			.comment-right {
				display: flex;
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
				color: #aaa;
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
		z-index: 8;
		.footer-item {
			display: flex;
			.item-input {
				display: flex;
				height: 68rpx;
				background-color: #f3f3f4;
				flex: 1;
				border-radius: 34rpx;
				margin: 19rpx 0 0 19rpx;
				align-item_answer: center;
				.input-item {
					height: 68rpx;
					width: 100%;
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
.secendBox {
	padding: 30rpx;
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-top: -50rpx;
	.secendItem {
		font-size: 30rpx;
		line-height: 80rpx;
	}
}
.re-height {
	height: 106rpx;
	overflow: hidden;
}
.answer-child {
	padding-left: 60rpx;
}
</style>
