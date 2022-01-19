<template>
	<view>
		<view class="od-box" v-if="info">
			<view class="od-title">
				订单详情
				<slot name="detail-edit"></slot>
			</view>
			<view class="od-item" @click="jump('/pages/client/index/list', { id: info.product_id })">
				<view class="item-right">
					<view class="item-txt">{{ info.pro_title }}</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<!-- 项开始 -->
			<view class="od-item">
				<view class="item-tip">服务领域</view>
				<view class="item-right">
					<view class="item-txt">{{ info.area_name }}</view>
				</view>
			</view>
			<template v-if="info.pro_name == '问一下'">
				<view class="od-item">
					<view class="item-tip">服务方式</view>
					<view class="item-right">
						<view class="item-txt">{{ info.serve_type }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务时长</view>
					<view class="item-right">
						<view class="item-txt">{{ info.serve_time }}</view>
					</view>
				</view>
				<template v-if="info.serve_type == '线下面谈'">
					<view class="od-item">
						<view class="item-tip">服务时间</view>
						<view class="item-right">
							<view class="item-txt">{{ info.server_time_text }}</view>
						</view>
					</view>
					<view class="od-item">
						<view class="item-tip">服务地点</view>
						<view class="item-right" v-if="info.server_address == '另行协商'"><view class="item-txt">另行协商</view></view>
						<view class="item-right" @click="$refs.popupSelectMaps.open()" v-else>
							<view class="forward-box" style="line-height: 60rpx; padding-top: 0;">
								<view class="forward-left">
									<view class="image-wrapper"><image src="@/static/img/order-locat.png" mode="aspectFit"></image></view>
								</view>
								<view class="forward-txt text-ellipsis">{{ info.server_address }}</view>
							</view>
						</view>
					</view>
				</template>
			</template>
			<template v-if="info.pro_name == '陪聊'">
				<view class="od-item">
					<view class="item-tip">服务内容</view>
					<view class="item-right">
						<view class="item-txt">{{ info.server_content }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务时长</view>
					<view class="item-right">
						<view class="item-txt">{{ info.serve_time }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务时间</view>
					<view class="item-right">
						<view class="item-txt">{{ info.server_time_text }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务地点</view>
					<view class="item-right" v-if="info.server_address == '另行协商'"><view class="item-txt">另行协商</view></view>
					<view class="item-right" @click="$refs.popupSelectMaps.open()" v-else>
						<view class="forward-box" style="line-height: 60rpx;padding-top: 0;">
							<view class="forward-left">
								<view class="image-wrapper"><image src="@/static/img/order-locat.png" mode="aspectFit"></image></view>
							</view>
							<view class="forward-txt text-ellipsis">{{ info.server_address }}</view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '管家'">
				<view class="od-item">
					<view class="item-tip">服务期限</view>
					<view class="item-right">
						<view class="item-txt">{{ info.server_dead }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务级别</view>
					<view class="item-right" @click="getGradeTip()">
						<view class="item-txt">{{ info.server_grade }}管家</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '代写文书'">
				<view class="od-item">
					<view class="item-tip">文书类型</view>
					<view class="item-right">
						<view class="item-txt">{{ info.document.toString() }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">文书数量</view>
					<view class="item-right">
						<view class="item-txt">{{ info.docu_num }}份</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">完成时间</view>
					<view class="item-right">
						<view class="item-txt">{{ info.docu_time_text }}</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '判案'">
				<view class="od-item">
					<view class="item-tip">案件阶段</view>
					<view class="item-right">
						<view class="item-txt">{{ info.meet_stage }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">我的身份</view>
					<view class="item-right">
						<view class="item-txt">{{ info.case_ident }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">案件数量</view>
					<view class="item-right">
						<view class="item-txt">{{ info.case_num }}</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '刑事会见'">
				<view class="od-item">
					<view class="item-tip">办案阶段</view>
					<view class="item-right">
						<view class="item-txt">{{ info.meet_stage }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">涉嫌罪名</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.accusation">{{ info.accusation }}</view>
						<view class="item-txt" v-else>具体请询问委托人</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">会见地点</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.server_address">{{ info.server_address }}</view>
						<view class="item-txt" v-else>具体请询问委托人</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">会见次数</view>
					<view class="item-right">
						<view class="item-txt">{{ info.meet_num }}</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '打官司'">
				<view class="od-item">
					<view class="item-tip">费用承担</view>
					<view class="item-right">
						<view class="item-txt">{{ info.price_type }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">涉案金额</view>
					<view class="item-right">
						<view class="item-txt">{{ info.qiankuan }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">案件进度</view>
					<view class="item-right">
						<view class="item-txt">{{ info.jindu }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">我的身份</view>
					<view class="item-right">
						<view class="item-txt">{{ info.self_ident }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">对方类型</view>
					<view class="item-right">
						<view class="item-txt">{{ info.dui_ident }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">对方失信</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.is_believe == 1">否</view>
						<view class="item-txt" v-else-if="info.is_believe == 0">是</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">对方正在被法院执行中</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.is_fayuan_zhixing == 1">否</view>
						<view class="item-txt" v-else-if="info.is_fayuan_zhixing == 0">是</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">审理机构</view>
					<view class="item-right">
						<view class="item-txt">{{ info.organization }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">审理地点</view>
					<view class="item-right">
						<view class="item-txt">{{ info.server_address }}</view>
					</view>
				</view>
			</template>

			<view class="od-item">
				<view class="item-tip">服务人员</view>
				<view class="item-right">
					<view class="item-txt">
						智能匹配
						<template v-if="info.profession && info.profession.split(',').length > 1">
							{{ info.profession.split(',')[1] }}
						</template>
						<template v-else>
							{{ info.profession }}
						</template>
						<template v-if="info.server_name_id == '全部'">
							全部执业年限的专业律师
						</template>
						<template v-else>
							{{ info.server_name_id }}的专业律师
						</template>
					</view>
				</view>
			</view>
			<template v-if="info.pro_name == '打官司'">
				<view class="od-item">
					<view class="item-tip">律师服务语言</view>
					<view class="item-right">
						<view class="item-txt">{{ info.lang }}</view>
					</view>
				</view>
				<view class="od-item">
					<view class="item-tip">服务阶段</view>
					<view class="item-right">
						<view class="item-txt">{{info.lawsuit}} {{ info.stage }}</view>
					</view>
				</view>
			</template>
			<view class="od-item">
				<view class="item-tip">服务报价</view>
				<view class="item-right">
					<view class="item-txt">{{ info.offer_type }}</view>
				</view>
			</view>
            <!-- info.price_type=='自费' -->
            <view class="od-item" v-if="info.price_type=='自费'">
            	<view class="item-tip">报价方式</view>
            	<view class="item-right">
            		<view class="item-txt">{{ info.offer }}</view>
            	</view>
            </view>
            <view class="od-item" v-if="info.price_type=='自费'">
            	<view class="item-tip">付款时间</view>
            	<view class="item-right">
            		<view class="item-txt">{{ info.pay_time }}</view>
            	</view>
            </view>
			<template v-if="info.pro_name == '打官司'">
			<view class="od-item">
				<view class="item-tip">律师费用金额</view>
				<view class="item-right">
					<view class="item-txt">{{info.fee_money}}</view>
				</view>
			</view>
			</template>
			<template v-if="info.pro_name != '打官司'">
			<view class="od-item">
				<view class="item-tip">律师费用</view>
				<view class="item-right">
					<view class="item-txt">{{info.fee_money}}</view>
				</view>
			</view>
			</template>
			<template v-if="info.pro_name == '打官司' && info.price_type == '投资人支付(不用还)'">
				<view class="od-item">
					<view class="item-tip">投资人承担</view>
					<view class="item-right"><view class="item-txt">律师费+立案受理费+公告费+异地被告身份查询费</view></view>
				</view>
				<view class="od-item">
					<view class="item-tip">投资人收益</view>
					<view class="item-right"><view class="item-txt">您案件债权总额的30%，回款后7日内支付给投资人，不回款不用付。</view></view>
				</view>
			</template>
			<!-- <view class="od-item" v-if="info.pro_name != '打官司'">
				<view class="item-tip">律师费用</view>
				<view class="item-right">
					<view class="item-txt">￥{{ info.fee_money }}</view>
				</view>
			</view> -->
			<view class="od-item" v-if="info.days_time">
				<view class="item-tip">应付时间</view>
				<view class="item-right">
					<view class="item-txt">{{ info.days_time }}</view>
				</view>
			</view>
			<template v-if="!(info.pro_name == '问一下' && info.serve_time == '15分钟')">
				<view class="od-item">
					<view class="item-tip">项目资料</view>
					<view
						class="item-right"
						@click="jump('/pages/client/order/project-data-info', { card_images: info.card_images,liaotian_images:info.liaotian_images,jietiao_images: info.jietiao_images,cuishou_images:info.cuishou_images,other_images:info.other_images,huan_images:info.huan_images,type:info.price_type=='自费'? 2 : 1 })"
					>
						<view class="item-txt">查看资料</view>
						<!-- <view class="item-file" v-if="info.source.length > 0"><image src="@/static/img/order-file.png"></image></view> -->
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
					<!-- <view class="item-right" v-else><view class="item-txt">无</view></view> -->
				</view>
				<view class="od-item">
					<view class="item-tip">我的要求</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.requirement">{{ info.requirement }}</view>
						<view class="item-txt" v-else>无</view>
					</view>
				</view>
			</template>
			<template v-if="info.price_type != '投资人支付(不用还)'">
			<view class="od-item">
				<view class="item-tip">优惠券</view>
				<view class="item-right">
					<view class="item-txt">{{ info.coupon_id }}</view>
				</view>
			</view>
			<view class="od-item" v-if="info.pay_type">
				<view class="item-tip">付款方式</view>
				<view class="item-right">
					<view class="item-txt">{{ info.pay_type }}</view>
				</view>
			</view>
			</template>
			<template v-if="info.pro_name == '问一下'">
				<view class="od-item">
					<view class="item-tip">接通方式</view>
					<view class="item-right">
						<view class="item-txt">{{ info.server_tel }}</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name != '问一下'">
			<template v-if="info.pro_name != '打官司'">
				<view class="od-item">
					<view class="item-tip">服务方式</view>
					<view class="item-right">
						<view class="item-txt">{{ info.serve_type }}</view>
					</view>
				</view>
			</template>
			</template>
			<template v-if="info.pro_name == '代写文书' || info.pro_name == '判案'">
				<view class="od-item">
					<view class="item-tip">完成时间</view>
					<view class="item-right">
						<view class="item-txt">{{ info.docu_time_text }}</view>
					</view>
				</view>
			</template>
			<template v-if="info.pro_name == '刑事会见'">
				<view class="od-item">
					<view class="item-tip">会见时间</view>
					<view class="item-right"><view class="item-txt">根据法律规定，律师接受委托后，需与看守所预约好时间，才可会见。</view></view>
				</view>
			</template>
			<!-- <template v-if="info.pro_name == '打官司'">
				<view class="od-item">
					<view class="item-tip">其他费用</view>
					<view class="item-right">
						<view class="item-txt" v-if="info.price_type == '投资人支付(不用还)'">国家费用（或有）</view>
						<view class="item-txt" v-else>国家费用</view>
					</view>
				</view>
			</template> -->
			<template v-if="info.pro_name != '打官司'">
			<view class="od-item">
				<view class="item-tip">服务范围</view>
				<view class="item-right">
					<view class="item-txt">{{ info.area_title }}</view>
				</view>
			</view>
			</template>
			<!-- 项结束 -->
			<view class="od-item">
				<view class="item-tip">服务内容</view>
				<view class="item-right" @click="jump('/pages/client/user/item-detail', { name: '服务内容', content: info.serve_content })">
					<view class="item-txt">查看服务内容</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">产品说明</view>
				<view class="item-right" @click="jump('/pages/client/user/item-detail', { name: '产品说明', content: info.desc_content })">
					<view class="item-txt">查看产品说明</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip colorblack">实付金额</view>
				<view class="item-right">
					<view class="item-txt colorred" v-if="info.price_type == '投资人支付(不用还)'">￥投资人支付</view>
					<view class="item-txt colorred" v-else>￥{{ info.money }}</view>
				</view>
			</view>
		</view>
		<view class="od-box" v-if="info">
			<view class="od-title">订单信息</view>
			<view class="od-item">
				<view class="item-tip">订单号</view>
				<view class="item-right">
					<view class="item-txt">{{ info.order_sn }}</view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">下单时间</view>
				<view class="item-right">
					<view class="item-txt">{{ info.createtime }}</view>
				</view>
			</view>
		</view>
		<!-- 分享券 -->
		<view class="share-conpon-box" @click="$refs.popupShareConpon.open()" v-if="info && info.is_share"><image src="@/static/img/share-btn.png" mode="widthFix"></image></view>
		<!-- 分享券弹出层 -->
		<uni-popup ref="popupShareConpon" type="center">
			<view class="popup-conpon-box">
				<view class="popup-conpon-top"><image src="@/static/img/share-conpon-con.png" mode="widthFix"></image></view>
				<view class="popup-conpon-bot" @click="goShareCoupon"><image src="@/static/img/share-conpon-wx.png" mode="widthFix"></image></view>
				<view class="popup-conpon-close" @click="$refs.popupShareConpon.close()"><image src="@/static/img/share-close.png" mode="widthFix"></image></view>
			</view>
		</uni-popup>
		<!-- 导航 -->
		<uni-popup ref="popupSelectMaps" type="bottom">
			<order-popup-common-bottom title="导航到此地点" @closePop="closePop('popupSelectMaps')">
				<view class="popup-con" slot="popup-con">
					<view class="od-box marginbottom0">
						<view class="od-item marginbottom10" @click="openlocate('gaode')">
							<view class="item-right">
								<view class="item-txt">高德地图</view>
								<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
							</view>
						</view>
						<view class="od-item marginbottom10" @click="openlocate('baidu')">
							<view class="item-right">
								<view class="item-txt">百度地图</view>
								<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
							</view>
						</view>
						<view class="od-item marginbottom10" @click="goShare()">
							<view class="item-right">
								<view class="item-txt">分享给好友</view>
								<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
							</view>
						</view>
					</view>
				</view>
			</order-popup-common-bottom>
		</uni-popup>
		<!-- 级别提示 -->
		<uni-popup ref="popupGrade" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupGrade')">
				<view class="popup-con" slot="popup-con"><view class="grade-box" v-html="tipGrade"></view></view>
			</order-popup-common-bottom>
		</uni-popup>
	</view>
</template>

<script>
export default {
	props: {
		info: {}
	},
	data() {
		return {
			inviteCode: '',
			tipGrade: ''
		};
	},
	created() {},
	methods: {
		openlocate(type) {
			let params = this.info.longitude;
			params = {
				...params,
				type: type
			};
			console.log(JSON.stringify(params));

			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.navigation(JSON.stringify(params));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('navigation', params, data => {});
			}
		},
		goShare() {
			let shareInfo = {
				title: this.info.longitude.poiname,
				content: this.info.longitude.poiaddress,
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/order/weixin-map?lat=${this.info.longitude.latlng.lat}&lng=${this.info.longitude.latlng.lng}&name=${
					this.info.longitude.poiname
				}&address=${this.info.longitude.poiaddress}`
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
		// 成功唤起微信分享后,调用
		async shareOk() {
			let formData = {
				id: this.info.id,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.coupon_share', formData);
			if (res.code == 1) {
				this.$refs.popupShareConpon.close();
				this.info.is_share = 0;
			}
		},
		goShareCoupon() {
			let shareInfo = {
				title: '好友送福利, 200元优惠券快来领，手快有, 手慢无 ',
				content: '打赏律师 想问就问事成才结款 效果有保障邀朋友 解烦忧 赚收益',
				imageUrl: `${this.$API_URL}/source/go.png`,
				path: `${this.$VIEW_URL}/#/pages/client/user/accept-share-coupon?order_id=${this.info.id}`
			};
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.share(JSON.stringify(shareInfo));
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('share', shareInfo, data => {
					// 处理返回数据
					this.shareOk();
				});
			}
		},
		async getGradeTip() {
			this.$refs.popupGrade.open();
			let formData = {
				serve_grade: this.info.server_grade,
				serve_dead: this.info.server_dead,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.change_dead', formData);
			this.tipGrade = res.data.value_text;
		}
	}
};
</script>

<style lang="scss">
.share-conpon-box {
	position: fixed;
	right: 30rpx;
	bottom: 30rpx;
	color: #ffffff;
	width: 100rpx;
	image {
		width: 100%;
	}
}
.popup-conpon-box {
	width: 480rpx;
	height: 450rpx;
	background: url(@/static/img/share-conpon-bg.png);
	background-size: 100%;
	.popup-conpon-top {
		padding: 100rpx 28rpx 0rpx;
		image {
			width: 100%;
		}
	}
	.popup-conpon-bot {
		width: 60rpx;
		margin: auto;
		image {
			width: 100%;
		}
	}
	.popup-conpon-close {
		width: 40rpx;
		margin: 40rpx auto 0;
		image {
			width: 100%;
		}
	}
}
.od-title{
	display: flex;
}
.item-tip{
	margin-top: 11rpx;
}
</style>
