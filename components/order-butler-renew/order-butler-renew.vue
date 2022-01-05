<template>
	<uni-popup ref="popupRenew">
		<service-popup-pay title="管家续期" btnText="确认" @closePop="closePop('popupRenew')" @confirmPay="confirmRenew">
			<template slot="payOption">
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务期限</view>
					<view class="item-right">
						<view class="service-list margin0 padding0">
							<view class="service-item" :class="serviceDead == '季卡(90天)' ? 'active' : ''" @click="serviceDead = '季卡(90天)'">季卡</view>
							<view class="service-item" :class="serviceDead == '半年卡(180天)' ? 'active' : ''" @click="serviceDead = '半年卡(180天)'">半年卡</view>
							<view class="service-item" :class="serviceDead == '年卡(365天)' ? 'active' : ''" @click="serviceDead = '年卡(365天)'">年卡</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务级别</view>
					<view class="item-right">
						<view class="service-list inline-list service-list-bottom">
							<view
								class="service-item marginbottom20"
								:class="serviceGrade == '初级' ? 'active' : ''"
								@click="
									serviceGrade = '初级';
									getGradeTip();
								"
							>
								初级
							</view>
							<view
								class="service-item marginbottom20"
								:class="serviceGrade == '中级' ? 'active' : ''"
								@click="
									serviceGrade = '中级';
									getGradeTip();
								"
							>
								中级
							</view>
							<view
								class="service-item marginbottom20"
								:class="serviceGrade == '高级' ? 'active' : ''"
								@click="
									serviceGrade = '高级';
									getGradeTip();
								"
							>
								高级
							</view>
							<view
								class="service-item marginbottom20"
								:class="serviceGrade == '顶级' ? 'active' : ''"
								@click="
									serviceGrade = '顶级';
									getGradeTip();
								"
							>
								顶级
							</view>
						</view>
					</view>
				</view>
			</template>
			<view class="od-item marginbottom20" slot="payOption2">
				<view class="item-tip">律师费用</view>
				<view class="item-right">
					<view class="item-txt red">￥{{ lawPrice }}（8折）</view>
				</view>
			</view>
		</service-popup-pay>
		<!-- 级别提示 -->
		<uni-popup ref="popupGrade" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupGrade')">
				<view class="popup-con" slot="popup-con">
					<view class="grade-box" v-html="tipGrade"></view>
				</view>
			</order-popup-common-bottom>
		</uni-popup>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			serviceGrade: '', //服务级别
			serviceDead: '', //服务期限
			lawPrice: '',
			tipGrade: '', //点级别提示
		};
	},
	created() {
		this.initHandpay();
	},
	watch: {
		// 服务期限
		serviceDead(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		// 服务级别
		serviceGrade(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		}
	},
	methods: {
		async getMoney() {
			let formData = {
				token: uni.getStorageSync('token'),
				product_type_id: this.info.order.serve_type,
				product_id: this.info.order.pro_name,
				product_name_id: this.info.order.server_name_id,
				server_dead: this.serviceDead,
				server_grade: this.serviceGrade
			};
			let res = await this.$api('index.product_price_name', formData);
			this.lawPrice = res.data[0].price;
		},
		//管家续期-初始化
		async initHandpay() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				product_name_id: this.info.order.server_name_id,
				type: 2
			};
			let res = await this.$api('index.add_list', formData);
			if (res.code == 1) {
				this.serviceGrade = res.data.add[0].server_grade;
				this.serviceDead = res.data.add[0].server_dead;
				this.lawPrice = res.data.add[0].bazhe;
			}
		},
		// 管家续期-支付
		async confirmRenew(payMethod) {
			this.$refs.popupRenew.close();
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				type: 5, //1 = 付费给投资人 2= 投资人退款请求 3 = 投资人请求结算 4 添加服务 5 包年 包月 管家 的续费 6付款给律师
				pay_type: payMethod,
				price: this.lawPrice,
				origin: `服务期限:${this.serviceDead},服务级别:${this.serviceGrade},付款方式:${payMethod}`
			};
			let res = await this.$api('index.money', formData);
			if (res.code == 1) {
				let formDataPay = {
					order_id: res.data.order_id,
					payMethod: payMethod,
					fen: '',
					pay_type: 2
				};
				let resPay = await this.$pay(formDataPay);
				if (resPay == 1) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.$emit('init');
				}
			}
		},
		async getGradeTip() {
			this.$refs.popupGrade.open();
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

<style lang="scss"></style>
