<template>
	<view class="content">
		<view class="lawyer-box">
			<view class="lawyer-con">
				<view class="lawyer-left">
					<view class="image-wrapper">
						<image :src="infoLawyer.image" mode="widthFix" @click="imageClick(infoLawyer.image)"></image>
					</view>
				</view>
				<view class="lawyer-right">
					<view class="lawyer-name">
						<view class="name-left">{{ infoLawyer.lawyer }}律师 执业{{ infoLawyer.years }}年</view>
					</view>
					<view class="lawyer-item">
						<view class="item-left">
							<view class="image-wrapper">
								<image src="@/static/img/lawer-loc.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="item-txt">{{ infoLawyer.province }}{{ infoLawyer.city }} | {{ infoLawyer.address }}
						</view>
						<view class="name-right" v-if="!isShare" @click="collect">
							<view class="image-wrapper" v-if="!isCollect">
								<image src="@/static/img/collect.png" mode="aspectFit"></image>
							</view>
							<view class="image-wrapper" v-if="isCollect">
								<image src="@/static/img/collected.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="lawyer-item">
						<view class="item-left">
							<view class="image-wrapper">
								<image src="@/static/img/lawer-per.png" mode="aspectFit"></image>
							</view>
						</view>
						<view class="item-txt">{{ infoLawyer.code }}</view>
					</view>
					<view class="lawyer-item">
						<image src="@/static/img/renzheng01.png" mode="widthFix" class="renzheng"></image>
						<image src="@/static/img/renzheng02.png" mode="widthFix" class="renzheng"></image>
						<image src="@/static/img/renzheng03.png" mode="widthFix" class="renzheng"></image>
					</view>
					<view class="lawyer-item">
						{{ infoLawyer.sign }}
					</view>
				</view>
			</view>
		</view>
		<view class="detail-item" :class="showDown ? 'paddingbottom0' : ''">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon1.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">律师简介</view>
				<view class="item-tip">
					<text class="tip-item" v-if="infoLawyer.sex == 1">男</text>
					<text class="tip-item" v-else-if="infoLawyer.sex == 2">女</text>
					<text class="tip-item" v-else>未设置</text>
					<template v-if="infoLawyer.birth">
						<text class="tip-item">|</text>
						<text class="tip-item">{{ infoLawyer.birth }}</text>
					</template>
					<template v-if="infoLawyer.animal">
						<text class="tip-item">|</text>
						<text class="tip-item">{{ infoLawyer.animal }}</text>
					</template>
					<template v-if="infoLawyer.constellation">
						<text class="tip-item">|</text>
						<text class="tip-item">{{ infoLawyer.constellation }}</text>
					</template>
					<view class="item-language" v-if="infoLawyer.language">
						<text class="item-text" :class="{color:index%2!=0}"
							v-for="(item,index) in infoLawyer.language">{{item}}</text>
					</view>
				</view>

				<view class="item-intro intro_txt" :class="isDown ? 'text-ellipsis3' : ''">{{ infoLawyer.desc }}</view>
			</view>
			<view class="item-down" v-if="showDown" @click="down">
				<view class="image-wrapper" v-if="isDown">
					<image src="@/static/img/down.png" mode="aspectFit"></image>
				</view>
				<view class="image-wrapper" v-if="!isDown">
					<image src="@/static/img/up.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
        <view class="detail-item" :class="showDown ? 'paddingbottom0' : ''">
        	<view class="item-left">
        		<view class="image-wrapper">
        			<image src="@/static/img/unit-icon.png" mode="aspectFit"></image>
        		</view>
        	</view>
        	<view class="item-right">
        		<view class="item-title">常去办事单位</view>
        		<view class="item-intro intro_txt" :class="isDown ? 'text-ellipsis3' : ''">{{infoLawyer.danwei}}</view>
                </view>
                </view>
		<view class="detail-item">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon2.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">擅长领域</view>
				<view class="od-box">
					<view class="od-item" v-for="item in infoLawyer.area" :key="item.id">
						<view class="item-right" @click="goNext(item)">
							<view class="item-txt">{{ item.area_name }}</view>
							<view class="item-nav">
								<image src="@/static/img/right.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="detail-item">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon3.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">项目经验</view>
				<view class="item-intro" v-html="infoLawyer.experience"></view>
			</view>
		</view>
		<view class="detail-item">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon4.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">教育背景</view>
				<view class="item-intro" v-html="infoLawyer.education"></view>
			</view>
		</view>
		<view class="detail-item">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon5.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">社会职务</view>
				<view class="item-intro" v-html="infoLawyer.position"></view>
			</view>
		</view>
		<view class="detail-item">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon6.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right">
				<view class="item-title">资质与奖励</view>
				<view class="item-intro" v-html="infoLawyer.qualifications"></view>
			</view>
		</view>
		<view class="detail-item detail2-item" style="border-radius: 0;margin-bottom:0;">
			<view class="item-left">
				<view class="image-wrapper">
					<image src="@/static/img/lawer-detail-icon6.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-right" @click="jump('/pages/client/user/evaluate-list', { lawyerId: lawyerId,type:'share' })">
				<view class="item-title">
					<view class="title-txt">用户评价</view>
					<view class="title-tip">更多评价（{{ infoEvaluat.total }}）</view>
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="evaluat-item" v-for="(item, index) in dataList" v-if="index < 3">
			<view class="evaluat-top">
				<view class="top-left">
					<image :src="item.avator" mode="widthFix"></image>
				</view>
				<view class="top-right">
					<view class="top-phone">{{ item.username }}</view>
					<view class="top-tip">{{ item.createtime }}</view>
				</view>
			</view>
			<law-rate size="40" :value="item.star" margin="10" :disabled="true"></law-rate>
			<view class="service-list">
				<button class="service-item"
					v-for="(item_evaluat, index_evaluat) in item.evaluate">{{ item_evaluat }}</button>
			</view>
			<view class="evaluat-bottom" v-if="!isShare">
				<view class="bottom-left" @click="jump('/pages/client/index/list', { id: item.product_id })">
					TA使用了
					<image class="bottom-area-nav" :src="item.product_image"></image>
					{{ item.product_title }}
					<image class="bottom-right-nav" src="@/static/img/right.png" mode="aspectFit"></image>
				</view>
				<view class="bottom-right" @click="collectEvaluat(item, index)">
					<image src="@/static/img/cjg-zan-gray.png" v-if="!item.is_zan"></image>
					<image src="@/static/img/cjg-zan.png" v-else></image>
					<view class="bottom-right-txt">有用{{ item.zan }}</view>
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
				isDown: false,
				showDown: false,
				isCollect: false,
				lawyerId: '',
				infoLawyer: {},
				dataList: [],
				infoEvaluat: {},
                isShare: this.$route.query.type ? true : false
			};
		},
        onShow(){
            this.init();
        },
		onLoad(params) {
			if (params.lawyerId) {
				this.lawyerId = params.lawyerId;
				this.init();
			}
		},
		onReady() {
			// 超过三行，显示向下按钮。注意：在获取律师简介数据后，再执行
			uni.getSystemInfo({
				success: res => {
					let pixelRatio = res.pixelRatio;
					let info = uni.createSelectorQuery().select('.intro_txt');
					info
						.boundingClientRect(data => {
							let lineheight = 50; //每行元素行高
							let linenum = 3; //超过三行，显示向下按钮
							if (data.height > (lineheight / pixelRatio) * linenum) {
								this.showDown = true;
								this.isDown = true;
							} else {
								this.showDown = false;
							}
						})
						.exec();
				}
			});
		},
		methods: {
			async init() {
				let formData = {
					lawyer: this.lawyerId,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.isFavor', formData);
				if (res.code == 1) {
					if (res.data.is_favor == 1) {
						this.isCollect = true;
					}else{
                        this.isCollect = false;
                    }
				}

				let formDataLawyer = {
					id: this.lawyerId,
					token: uni.getStorageSync('token')
				};
				let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
				this.infoLawyer = resLawyer.data;
                    let formDataEvaluat = {
                        page: 1,
                        token: uni.getStorageSync('token'),
                        id: this.lawyerId
                    };
                    let resEvaluat = await this.$api('index.evaluate_list', formDataEvaluat);
                    if (resEvaluat.code == 1) {
                        this.infoEvaluat = resEvaluat.data;
                        this.dataList = resEvaluat.data.order_evaluate;
                    }    
			},
			down() {
				this.isDown = !this.isDown;
			},
			//前往案例
			goNext(item) {
				console.log(item)
				uni.navigateTo({
					url: `../../service/suit/zhian?area=${item.area_name_text}&id=${item.id}&user_id=${this.lawyerId}`
				})
			},
			async collect() {
				let formData = {
					id: this.lawyerId,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.lawyerFavor', formData);
				if (res.code == 1) {
					this.isCollect = !this.isCollect;
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			},
			async collectEvaluat(current_item, current_index) {
				let formData = {
					id: current_item.id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.evaluate_zan', formData);
				if (res.code == 1) {
					this.dataList.forEach((item, index) => {
						if (item.id == current_item.id) {
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
            imageClick(item){
                // uni.previewImage({
                //     urls: [item],
                //     longPressActions: {
                //         itemList: ['发送给朋友', '保存图片', '收藏'],
                //         success: function(data) {
                //             console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                //         },
                //         fail: function(err) {
                //             console.log(err.errMsg);
                //         }
                //     }
                // });
                let previewImages = [];
                previewImages.push(item);
                this.previewImages(previewImages);
            }
		}
	};
</script>

<style lang="scss">
	.return-box {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;

		.image-wrapper {
			width: 30rpx;
			height: 30rpx;
			padding: 30rpx;

			image {
				transform: rotate(180deg);
				vertical-align: middle;
				width: 100%;
				height: 100%;
			}
		}
	}

	.detail-item {
		background-color: #ffffff;
		border-radius: 26rpx;
		margin-bottom: 20rpx;
		padding: 30rpx;
		display: flex;
		flex-wrap: wrap;
		&.paddingbottom0 {
			padding-bottom: 0;
		}

		.item-left {
			.image-wrapper {
				width: 30rpx;
				height: 30rpx;
				margin-right: 20rpx;
				margin-top: 6rpx;
				image {
					vertical-align: middle;
					width: 100%;
					height: 100%;
				}
			}
		}

		.item-right {
			flex: 1;
			.item-title {
				display: flex;
				font-weight: bold;
				flex: 1;
				line-height: 60rpx;
				.title-tip {
					color: #999999;
					font-size: 24rpx;
					font-weight: normal;
				}

				.title-txt {
					flex: 1;
				}

				.item-nav {
					width: 16rpx;
					margin-left: 20rpx;

					image {
						width: 100%;
						height: 100%;
						vertical-align: middle;
					}
				}
			}

			.item-tip {
				border-bottom: 1rpx solid #eeeeee;
				padding-bottom: 20rpx;
				margin-bottom: 20rpx;

				.tip-item {
					margin-right: 10rpx;

					&:nth-last-of-type(1) {
						border-right: none;
					}
				}

				.item-language {
					width:100%;
					margin-right: 30rpx;
					margin-top: 18rpx;
					font-size: 22rpx;
					display: flex;
					flex-wrap: wrap;
					.item-text {
						margin: 5rpx;
						font-size: 22rpx;
						padding: 5rpx;
						color: #0088FF;
						background-color:rgba(39, 181, 255, 0.3);
						border-radius: 4rpx;
					}

					.color {
						color: #FF6600;
						background-color:rgba(255, 172, 77, 0.3);
					}
				}
			}

			.item-intro {
				line-height: 60rpx;
			}

			.od-box {
				padding: 0;
			}
		}

		.item-down {
			width: 100%;
			padding: 10rpx 0 30rpx;

			.image-wrapper {
				width: 30rpx;
				height: 30rpx;
				margin: auto;

				image {
					vertical-align: middle;
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.od-box {
		margin-bottom: 0;
	}

	.lawyer-box {
		background: url(@/static/img/lawer-bg.png);
		background-repeat: no-repeat;
		background-size: contain;
		padding: 300rpx 30rpx 30rpx;
		background-color: #ffffff;
		border-bottom-left-radius: 26rpx;
		border-bottom-right-radius: 26rpx;
		margin-bottom: 20rpx;

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
				color: #ffffff;
				display: flex;
				margin-bottom: 20rpx;

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
					font-size: 26rpx;
					flex: 1;
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
			}
		}
	}

	.renzheng {
		width: 140rpx;
		margin-right: 20rpx;
	}

	.evaluat-item {
		background-color: #ffffff;
		//border-radius: 26rpx;
		padding: 30rpx;
		//margin-bottom: 20rpx;
		border-bottom:1rpx solid #f6f6f6;
		.evaluat-top {
			display: flex;
			margin-bottom: 10rpx;

			.top-left {
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.top-right {
				display: flex;
                flex-direction: column;
                justify-content: space-between;
				.top-phone {
					font-size: 32rpx;
					margin-bottom: 6rpx;
				}

				.top-tip {
					font-size: 24rpx;
					color: #aaaaaa;
				}
			}
		}

		.evaluat-bottom {
			display: flex;
			justify-content: space-between;

			.bottom-left {
				display: flex;
				align-items: center;
				background-color: #fff9e1;
				padding: 8rpx;

				.bottom-area-nav {
					display: inline-block;
					width: 30rpx;
					height: 30rpx;
					margin: 0 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.bottom-right-nav {
					width: 30rpx;
					height: 30rpx;
					margin: 0 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.bottom-right {
				width: 120rpx;
				text-align: center;

				image {
					width: 30rpx;
					height: 30rpx;
				}

				.bottom-right-txt {
					font-size: 24rpx;
				}
			}
		}
	}
</style>
