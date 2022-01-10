<template>
	<view class="od-item marginbottom20">
		<view class="item-tip" @click="openPopup">服务领域<image  src="@/static/img/order-ques.png" mode=""
				style="width: 30rpx;height: 30rpx"></image>
		</view>
		<view class="item-right" @click="openServiceArea()">
			<view class="service-list inline-list">
				<view class="service-item active">{{ area_name }}</view>
			</view>
			<text class="cjg blue" v-if="info.product.product == '管家'"
				@click.stop="jump('/pages/client/order/cang')">藏经阁</text>
			<view class="item-nav">
				<image src="@/static/img/right.png" mode="aspectFit"
					v-if="info.product.product != '刑事会见' && info.product.product != '打官司'"></image>
			</view>
		</view>
		<!-- 服务领域组件 -->
		<order-service-area ref="orderServiceArea" :info="info" v-if="Object.keys(info.product).length > 0"
			@confirm="confirm"></order-service-area>
            <uni-popup ref="popupArea" type="bottom">
                <view class="popup-bottom-box">
                	<view class="bot-title">
                		<view class="title-txt">服务领域选择说明</view>
                		<view class="title-close" @click="close">
                			<view class="image-wrapper">
                				<image src="@/static/img/close.png" mode="aspectFit"></image>
                			</view>
                		</view>
                	</view>
                    <scroll-view scroll-y="true" class="bot-con">
                        <view class="bot-title-box">
                            <view class="icon-box"></view>
                            <view class="title-text-box">快速指引</view>
                        </view>
                        <view class="bot-content-box">
                            如果欠款余额在书面文件或聊天里有确认过的，请选“<span>债权债务</span>”。<br />
                            如果欠款余额还没有在书面文件或聊天里确认过，或者是非欠款的其他合同类纠纷，请选“<span>合同事务</span>”。<br />
                            如果是人身/财产/名誉侵害纠纷，请选“<span>侵权赔偿</span>”。<br />
                            如果是打假纠纷、商标/专利/著作权纠纷、网站侵权纠纷，请选“<span>知识产权</span>”。<br />	
                            如果是公司内部纠纷的，请选“<span>公司经营</span>”。<br />
                            如果是涉及房屋或土地的，请选“<span>房产土地</span>”。
                        </view>
                        <view class="line-box"></view>
                        <view class="bot-title-box">
                            <view class="icon-box"></view>
                            <view class="title-text-box">债权债务</view>
                        </view>
                        <view class="bot-content-box">
                            包括借款、货款、加工费、装修款、质保金、物业管理费、理财款、债权债务转让等。
                        </view>
                        <view class="bot-title-box">
                            <view class="icon-box"></view>
                            <view class="title-text-box">合同事务</view>
                        </view>
                        <view class="bot-content-box">
                            包括赠与、转让店铺、加盟代理、买卖、仓储保管、融资租赁、中介服务、雇佣、劳务、运输等业务往来合同事务，业务商务谈判，业务履约追踪，业务合同管理等。
                        </view>
                        <view class="bot-title-box">
                            <view class="icon-box"></view>
                            <view class="title-text-box">侵权赔偿</view>
                        </view>
                        <view class="bot-content-box">
                            包括人身伤害、财产损害、产品质量损害、交通事故、名誉权、隐私权、精神损害等。
                        </view>
                        <view class="bot-title-box">
                            <view class="icon-box"></view>
                            <view class="title-text-box">知识产权</view>
                        </view>
                        <view class="bot-content-box">
                            包括打假纠纷，商标/专利/著作权纠纷，网站侵权纠纷,商标申请、续期、变更、转让等，专利认定、申请、许可使用等，著作权保护、转让、许可等，知识产权管理制度，商业秘密保护，知识产权归属、行政决定/处罚等。
                        </view>
                        </scroll-view>
                        <view class="bot-save">
                            <view class="save-box" @click="close">朕知道了</view>
                        </view>
                    </view>
            </uni-popup>
	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {
				area_name: ''
			};
		},
		created() {
			this.area_name = this.info.product.area.area_name;
		},
		methods: {
			async confirm(current_area) {
				this.area_name = current_area.area_name;
				this.$bus.$emit('changeDesc', current_area);
				this.$emit('changeMeet', current_area)
			},
			openServiceArea() {
				if (this.info.product.product != '刑事会见' && this.info.product.product != '打官司') {
					this.$refs.orderServiceArea.$refs.popupChooseServiceArea.open();
				}
			},
            openPopup(){
              this.$refs.popupArea.open();
            },
            close(){
                this.closePop('popupArea')
            }
		}
	};
</script>

<style lang="scss">
	.cjg {
		padding: 0 40rpx;
		position: absolute;
		right: 0rpx;
		height: 62rpx;
		line-height: 62rpx;
	}

	.od-box .od-item .item-tip {
		font-size: 26rpx;
		width: 200rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 20rpx;
	}

	.service-list {
		display: flex;
		align-items: center;
	}
    .service-list .service-item.active {
    	color: #F9B804;
    	font-size: 26rpx;
    	background-color: #FFFFFF;
    	border-radius: 0;
    	margin-left: 10rpx;
    }
    .popup-bottom-box {
    	background-color: #ffffff;
    	overflow: auto;
    	// border-top-left-radius: 26rpx;
    	// border-top-right-radius: 26rpx;
    
    	.bot-title {
    		display: flex;
    		align-items: center;
    
    		.title-txt {
    			flex: 1;
    			text-align: center;
    			padding: 20rpx;
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
    
    	.bot-con {
    		padding: 0 30rpx;
            height: 800rpx;
            width: calc(100% - 60rpx);
            // overflow-y: scroll;
    		.service-list {
    			margin-bottom: 20rpx;
    		}
            .bot-title-box{
                display: flex;
                align-items: center;
                height: 45rpx;
                .icon-box{
                    width: 12rpx;
                    height: 30rpx;
                    background: #FFC900;
                    opacity: 1;
                    border-radius: 6rpx;
                }
                .title-text-box{
                    margin-left: 5rpx;
                    height: 45rpx;
                    font-size: 32rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #000000;
                    opacity: 1;
                }
            }
            .bot-content-box{
                margin: 10rpx 0rpx 10rpx 17rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(0,0,0,0.6);
                opacity: 1;
                span{
                    color: #000;
                    font-weight: 600;
                }
            }
            .line-box{
                width: 100%;
                height: 1rpx;
                border: 1px solid #D5D5D5;
                background-color: #D5D5D5;
                margin: 15rpx 0rpx;
            }
    	}
        .bot-save{
            width: 100%;
            height: 102rpx;
            background: rgba(255, 255, 255, 0.39);
            box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.16);
            opacity: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .save-box{
               width: 60%;
                height: 60rpx;
                border-radius: 30rpx;
                background-color: #F9B804;
                color: #fff;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
