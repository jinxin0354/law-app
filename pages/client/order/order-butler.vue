<template>
	<view class="content">
		<view class="od-box">
			<!-- 服务领域组件 -->
			<order-item-service ref="orderItemService" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service>
			<view class="od-item marginbottom20">
				<view class="item-tip require">服务期限</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item" :class="serviceDead == '季卡(90天)' ? 'active' : ''" @click="serviceDead = '季卡(90天)'">季卡</view>
						<view class="service-item" :class="serviceDead == '半年卡(180天)' ? 'active' : ''" @click="serviceDead = '半年卡(180天)'">半年卡</view>
						<view class="service-item" :class="serviceDead == '年卡(365天)' ? 'active' : ''" @click="serviceDead = '年卡(365天)'">年卡</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip require">服务级别</view>
				<view class="item-right">
					<view class="service-list inline-list service-list-bottom service-four">
						<view
							class="service-item marginbottom20"
							:class="serviceGrade == item.value_name ? 'active' : ''"
							@click="serviceGrade = item.value_name"
							v-for="(item, index) in serviceGradeList"
						>
							{{ item.value_name }}
						</view>
						<view class="service-tip-box" v-html="tipGrade"></view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<!-- 公用选项 -->
			<view class="od-item marginbottom20">
				<view class="item-tip require">服务人员</view>
				<view class="item-right" @click="$refs.popupService.open()">
					<view class="service-list inline-list">
						<view class="service-item active">智能匹配</view>
						<view class="service-item active">{{ practiceYear.replace('以上', '起') }}</view>
						<view class="service-item active" v-if="practiceArea.split(',').length > 1">
							<text class="text-ellipsis">{{ practiceArea.split(',')[1] }}</text>
						</view>
						<view class="service-item active" v-else>{{ practiceArea }}</view>
					</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip">服务报价</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item active">{{ offer_type }}</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">律师费用</view>
				<view class="item-right">
					<view class="service-list service-two">
						<view
							class="service-item"
							:class="price_type_text == item.price_type_text ? 'active' : ''"
							@click="
							product_price_id = item.id;
								price_type_text = item.price_type_text;
								money = item.price;
							"
							v-for="(item, index) in moneyList"
						>
							<text class="two-money">¥{{ item.total }}</text>
							<text class="two-tip">{{ item.price_type_text }}</text>
							<image v-if="item.price_type_text == '先用后付 无忧付'" class="noback" src="@/static/img/order-noback2.png" mode="aspectFit"></image>
							<image v-if="item.price_type_text == '边用边付 轻松付'" class="noback" src="@/static/img/order-noback3.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">项目资料</view>
				<view class="item-right" @click="jump('/pages/client/order/upload', { source: JSON.stringify(source) })">
					<view class="item-txt gray">您手上有的资料，都可上传</view>
					<view class="item-file" v-if="source.length > 0"><image src="@/static/img/order-file.png"></image></view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">我的要求</view>
				<view class="item-right">
					<order-right-textarea ref="myrequire"></order-right-textarea>
					<view class="item-nav"></view>
				</view>
			</view>
			<!-- 优惠券组件 -->
			<template v-if="price_type_text != '先用后付 无忧付'">
				<!-- 优惠券组件 -->
				<order-user-coupon :info="info" v-if="Object.keys(info.product).length > 0" @getCoupon="getCoupon"></order-user-coupon>
			</template>
			<template v-if="price_type_text != '先用后付 无忧付'">
				<!-- 付款方式组件 -->
				<order-item-pay-method ref="orderItemPayMethod" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-pay-method>
			</template>
			<view class="od-item">
				<view class="item-tip">服务保障</view>
				<view class="item-right" @click="$refs.orderServiceEnsure.$refs.popupEnsure.open()">
					<view class="item-txt green">
						<view class="text-ellipsis" style="width: 400rpx;">{{ info.product.tags }}</view>
					</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">服务方式</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="item-txt">{{ serviceType }}</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<!-- 服务范围组件 -->
			<order-item-service-desc :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service-desc>
		</view>
		<!-- 服务内容组件 -->
		<order-unfold title="服务内容">
			<view slot="unfold-con"><view class="" v-html="info.product.serve_content"></view></view>
		</order-unfold>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :img_src="info.product.desc_content"></order-unfold-product>

		<view class="od-box">
			<view class="od-item" @click="jump('/pages/client/order/ask', { id: info.product.id, product_name: info.product.product })">
				<view class="item-tip">问大家</view>
				<view class="item-right">
					<view class="item-txt">产品有疑问，进去问问用过的人吧</view>
					<view class="gray" style="line-height: 60rpx;" v-if="info.ques_count">{{ info.ques_count }}</view>
					<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
				</view>
			</view>
		</view>
		<view class="go-box">
			<view class="go-left">
				<view class="left-prize" v-if="price_type_text == '先用后付 无忧付'">￥0</view>
				<view class="left-prize" v-else>
					￥{{ money }}
					<text class="coupon-prize" v-if="sell">已优惠￥{{ sell }}</text>
				</view>
				<view class="left-tip">{{ price_type_text }}</view>
			</view>
			<view class="go-right"><button type="default" class="go-btn" @click="confirm">我要下单</button></view>
		</view>

		<!-- 服务人员弹出层 -->
		<uni-popup ref="popupService" type="bottom">
			<order-popup-service
				@closePop="closePop('popupService')"
				@chooseService="chooseService"
				:practiceChoose="practiceChoose"
				:practiceYear="practiceYear"
				:practiceArea="practiceArea"
				:serviceGrade="serviceGrade"
				:key="new Date().getTime()"
				:info="info"
			></order-popup-service>
		</uni-popup>
		<!-- 服务保障组件 -->
		<order-service-ensure ref="orderServiceEnsure" v-if="Object.keys(info.product).length > 0" :info="info"></order-service-ensure>
		<!-- 级别提示 -->
		<uni-popup ref="popupGrade" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupGrade')">
				<view class="popup-con" slot="popup-con"><view class="grade-box" v-html="tipGrade"></view></view>
			</order-popup-common-bottom>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>
<script>
export default {
	data() {
		return {
			info: {
				list: {},
				product: {}
			},
			practiceChoose: '智能匹配', //挑选方式
			practiceYear: '全部', //执业年限
			practiceArea: '全国', //执业区域
			product_id: '', //七个产品id
			product_name: '', //七个产品名称
			area_id: '', //服务领域id
			requirement: '', //我的要求
			tags: '', //服务保障
			serve_content: '', //服务内容
			desc_content: '', //产品说明
			money: '', //律师费
			moneyList: [], //律师费列表
			source: [], //项目资料
			price_type_text: '', //律师费 付款方式
			serviceType: '', //服务方式
			serviceGrade: '', //服务级别
			serviceDead: '', //服务期限
			offer_type: '', //服务报价
			isTxtOne: true, //显示一行
			tipGrade: '', //点级别提示
			current_coupon: {}, //选中的优惠券
			sell: '', //优惠价格
			serviceGradeList: [] ,//服务级别
			product_price_id: '' ,//律师费用方式
			fali_source:''
		};
	},
	created() {
		// 安卓
		window.payOk = this.payOk;
	},
	onLoad(params) {
		if (params.product_id && params.area_id && params.product_name) {
			this.product_id = params.product_id;
			this.area_id = params.area_id;
			this.product_name = params.product_name;
			this.init();
		}
	},
	watch: {
		// 执业年限
		practiceYear(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		// 服务期限
		serviceDead(val, oldVal) {
			if (oldVal) {
				this.getMoney();
				this.getGradeTip();
			}
		},
		// 服务级别
		serviceGrade(val, oldVal) {
			if (oldVal) {
				this.getMoney();
				this.getGradeTip();
			}
			if (val == '顶级') {
				this.practiceArea = '执业区域';
			}
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.product_id,
				area_id: this.area_id
			};
			if (uni.getStorageSync('token')) {
				formData = {
					...formData,
					token: uni.getStorageSync('token')
				};
			}
			let res = await this.$api('index.new_order', formData);

			this.info = res.data;
			this.money = res.data.product.price;
			this.serviceType = res.data.product.product_type;
			this.practiceChoose = res.data.product.choose;
			this.practiceYear = res.data.product.product_name;
			this.practiceArea = res.data.product.profession_name;
			this.moneyList = res.data.list.price_type;
			this.price_type_text = res.data.product.price_type_text;
			this.serviceGrade = res.data.product.grade;
			this.serviceDead = res.data.product.dead;
			this.offer_type = res.data.product.pay_type_text;
			this.serviceGradeList = res.data.list.grade;
			// 获取服务级别提示
			this.getGradeTip();
			this.product_price_id = res.data.product.id;
		},
		async getMoney() {
			let formData = {
				token: uni.getStorageSync('token'),
				product_type_id: this.serviceType,
				product_id: this.product_name,
				product_name_id: this.practiceYear,
				server_dead: this.serviceDead,
				server_grade: this.serviceGrade,
				coupon_id: this.current_coupon ? this.current_coupon.id : ''
			};
			let res = await this.$api('index.product_price_name', formData);
			this.moneyList = res.data;
			this.money = res.data[0].price;
			this.price_type_text = res.data[0].price_type_text;
			this.sell = res.data[0].sell;
		},
		// 优惠券
		getCoupon(current_coupon) {
			this.current_coupon = current_coupon;
			this.getMoney();
		},
		chooseService(obj) {
			this.practiceChoose = obj.choose;
			this.practiceYear = obj.year;
			this.practiceArea = obj.area;
		},
		confirm() {
			this.addOrder(this.price_type_text);
		},
		async addOrder(money_type) {
			let formData = {
				token: uni.getStorageSync('token'),
				product_id: this.product_name,
				fali_serve_area_id: this.info.product.area.area_name,
				server_type_id: this.serviceType,
				server_name_id: this.practiceYear,
				offer_type: this.offer_type,
				money_type: money_type,
				money: this.money,
				pay_type: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
				source: this.source,
				requirement: this.$refs.myrequire.requirement_copy,
				server_dead: this.serviceDead,
				server_grade: this.serviceGrade,
				coupon_id: this.current_coupon ? this.current_coupon.id : '',
				profession: this.practiceArea,
				product_price_id: this.product_price_id,
				fali_source: this.fali_source
			};

			let res = await this.$api('index.addOrder_name', formData);
			if (res.code == 1) {
				this.order_id = res.data.order_id;
				if (money_type == '先用后付 无忧付') {
					this.replace('/pages/client/user/match', {
						order_id: this.order_id
					});
				} else {
					let formDataPay = {
						order_id: this.order_id,
						payMethod: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
						fen: '',
						pay_type: 1
					};
					let resPay = await this.$pay(formDataPay);
					if (resPay == 1) {
						this.replace('/pages/client/user/match', {
							order_id: this.order_id
						});
					}
				}
			}
		},
		payOk(res) {
			// 安卓0 支付成功，-1 支付失败， -2取消支付
			if (res == '0') {
				this.replace('/pages/client/user/match', {
					order_id: this.order_id
				});
			}
		},
		async getGradeTip() {
			// this.$refs.popupGrade.open();
			let formData = {
				serve_grade: this.serviceGrade,
				serve_dead: this.serviceDead,
				token: uni.getStorageSync('token')
			};
			let res = await this.$api('index.change_dead', formData);
			this.tipGrade = res.data.value_text;
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 122rpx;
}

.pay-list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;

	.pay-item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		text-align: center;
		width: calc((100% - 20rpx) / 2);
		margin-bottom: 20rpx;

		&:nth-of-type(2n) {
			margin-right: 0;
		}

		&.active {
			background-color: rgba(255, 200, 1, 0.2);
			border-color: $uni-color-primary;
		}

		.image-wrapper {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			margin-right: 10rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.paddingtop20 {
	padding-top: 20rpx;
}

.cjg {
	flex: 1;
	text-align: right;
	line-height: 70rpx;
}
.service-four {
	.service-item:nth-of-type(3) {
		margin-right: 20rpx;
	}
	.service-item:nth-of-type(4) {
		margin-right: 0;
	}
	.service-item {
		width: calc((100% - 60rpx) / 4);
	}
}
</style>
