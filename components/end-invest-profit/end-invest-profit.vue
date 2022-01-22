<template>
	<uni-popup ref="investShou" type="center">
		<order-popup-common :title="topTitle" @closePop="closePop('investShou')">
			<view>
			
			</view>
			<view slot="popup-con" >
				<view class="flex flex-vertical" style="font-size: 15px;">
					<view class="flex flex-horizontal flex-center-v item">
						<text >{{shenfen}}的案子以什么方式处理的</text>
						<view class="flex flex-1"></view>
						<text>{{item.chuli_type}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text >{{shenfen}}主张的欠款本金有多少获得支持</text>
						<view class="flex flex-1"></view>
						<text >{{item.chuli_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item">
						<text >{{shenfen}}这次收回了多少钱</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.new_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" @click="$refs.direc.open()">
						<text >{{shenfen}}这次应付投资收益</text>
						<view class="symbol"></view>
						<view class="flex flex-1"></view>
						<text class="money-text">¥{{item.heji_money}}</text>
					</view>
					
					<view class="flex flex-horizontal flex-center-v item" v-if="item.chuli_money == '部分支持'">
						<text >{{shenfen}}原来主张的欠款本金金额是多少</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.yuan_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.chuli_type == '和解/调解'">
						<text >{{shenfen}}与欠款方和解时，欠款方同意偿还的欠款本金金额是多少</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.hejie_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.chuli_money == '部分支持' && item.chuli_type == '法院判决'">
						<text >法院判决支持的欠款本金金额是多少</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.hejie_money}}</text>
					</view>
					
					<view class="flex flex-horizontal flex-center-v item" v-if="item.chuli_money == '部分支持' && item.chuli_type == '其他方式'">
						<text >最后获得支持的欠款本金金额是多少</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.hejie_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" v-if="item.chuli_money != '全部支持'">
						<text >投资人已支付的投资费用</text>
						<view class="flex flex-1"></view>
						<text >¥{{item.touzi_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" @click="$refs.direc.open()" v-if="item.chuli_money != '全部支持'">
						<text >{{shenfen}}应付的投资费用损失为</text>
						<view class="symbol"></view>
						<view class="flex flex-1"></view>
						<text class="money-text">¥{{item.sunshi_money}}</text>
					</view>
					<view class="flex flex-horizontal flex-center-v item" @click="$refs.direc.open()">
						<text >{{shenfen}}逾期付款的违约金</text>
						<view class="symbol"></view>
						<view class="flex flex-1"></view>
						<text class="money-text">¥{{item.weiyue_money}}</text>
					</view>
				</view>
			</view>
			<view slot="popup-btn" class="flex flex-center" style="padding: 10px 0;" @click="closePop('investShou')">
				<view class="comfir-btn flex flex-center" style="width: 180px;height: 38px;border-radius: 38px;">我知道了</view>
			</view>
		</order-popup-common>
		<uni-popup ref="direc" type="center">
			<view class="popup-direc-box">
				<view class="bot-title">
					<view class="title-txt">计算方式说明</view>
		
					<view class="title-close" @click="close">
		
						<view class="image-wrapper">
							<image src="@/static/img/close.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">{{shenfen}}这次应付投资收益</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text class="text_icon">{{shenfen}}起诉的全部金额x30%</text>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">{{shenfen}}应付的投资费用损失为</view>
					</view>
					<view class="item-right">
						<view class="item-txt1">
							<view class="bt1">法院判决时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">({{shenfen}}原来主张的欠款本金-法院判决支持的欠款本金)÷{{shenfen}}原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
						<view class="item-txt1">
							<view class="bt1">和解/调解时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">({{shenfen}}原来主张的欠款本金-和解时欠款方同意偿还的欠款本金)÷{{shenfen}}原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="">{{shenfen}}预期付款的违约金</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text>{{shenfen}}未付款金额×万分之六×逾期天数</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</uni-popup>
</template>

<script>
	export default {
		props: ['item'],
		data() {
			return { 
				tipGrade: '',
				topTitle: '付款给投资人',
				is_weituo:0,
				shenfen:'您',
				};
		},
		created() {
			console.log(22);
			let userinfo = uni.getStorageSync('userInfo');
			this.is_weituo = userinfo.is_touziren;
			if(this.is_weituo == 1){
				this.shenfen = '委托人'
				this.topTitle = '结算投资收益';
			}
		},
		methods: {
			close() {
				this.$refs.direc.close()
			},
		}
	}
</script>

<style>
	.image-icon {
		width: 37rpx;
		height: 34rpx;
	}
	.item {
		padding:10px 15px;
	}
	.item >text:first-child {
		width: 70%;
	}
	
	.image-r {
		width: 9px;
		height: 14px;
		margin-left: 7.5px;
	}
	.symbol {
		z-index: 99;
		background: url(@/static/img/question.png);
		// background: red;
		background-size: cover;
		width: 30rpx;
		height: 30rpx;
	}
</style>
<style lang="scss">
	.popup-direc-box {
		background: #FFFFFF;
		width: 660rpx;
		padding: 30rpx;
		border-radius: 30rpx;
	
		.bot-title {
			display: flex;
			align-items: center;
			
			.title-txt {
				flex: 1;
				text-align: center;
				padding: 20rpx;
				font-size: 28rpx;
				font-weight: bold;
			}
	
			.title-close {
				width: 80rpx;
				height: 80rpx;
				text-align: center;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
	
				.image-wrapper {
					width: 26rpx;
					height: 26rpx;
					vertical-align: middle;
	
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
	
	
	
		}
	
		.flex-item-i {
			flex-direction: column;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 27rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			
	
			.item-right {
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				color: #848484;
				.item-txt {
					// color: red;
					margin-left: 20rpx;
					.input_icon{
						// margin-left: 7rpx;
						margin-right: 7rpx;
					}
				}
				.item-txt1{
					margin-left: 18rpx;
					.bt1{
						
					}
					.dl1 {
						display: flex;
						// margin-left: 19rpx;
						// flex-direction: column;
						.input_icon {
							margin-left: 2rpx;
						}
						.text_icon {
							margin-left: 7rpx;
						}
					}
				}
			}
		}
	}
</style>