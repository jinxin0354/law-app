<template>
	<uni-popup ref="popupAddService">
		<service-popup-pay title="增加服务" btnText="我要下单" @closePop="closePop('popupAddService')" @confirmPay="confirmAddService">
			<template slot="payOption" v-if="info.order.pro_name == '问一下'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务方式</view>
					<view class="item-right"><view class="item-txt">线下面谈</view></view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务时长</view>
					<view class="item-right">
						<view class="service-list">
							<view
								class="service-item"
								:class="askIndex == index ? 'active' : ''"
								@click="
									askIndex = index;
									serviceDuration = item.serve_time;
								"
								v-for="(item, index) in askInfo"
							>
								{{ item.serve_time }}
							</view>
						</view>
					</view>
				</view>
			</template>
			<template slot="payOption" v-else-if="info.order.pro_name == '陪聊'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务内容</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item" :class="serviceContent == '陪您办事' ? 'active' : ''" @click="serviceContent = '陪您办事'">陪您办事</view>
							<view class="service-item" :class="serviceContent == '代您谈判' ? 'active' : ''" @click="serviceContent = '代您谈判'">代您谈判</view>
							<view class="service-item" :class="serviceContent == '代打电话' ? 'active' : ''" @click="serviceContent = '代打电话'">代打电话</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务时长</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item" :class="serviceDuration == '60分钟' ? 'active' : ''" @click="serviceDuration = '60分钟'">60分钟</view>
							<view class="service-item" :class="serviceDuration == '120分钟' ? 'active' : ''" @click="serviceDuration = '120分钟'">120分钟</view>
							<view class="service-item" :class="serviceDuration == '180分钟' ? 'active' : ''" @click="serviceDuration = '180分钟'">180分钟</view>
						</view>
					</view>
				</view>
			</template>
			<template slot="payOption" v-else-if="info.order.pro_name == '管家'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务内容</view>
					<view class="item-right">
						<view class="service-list service-list-two service-list-bottom">
							<view
								class="service-item"
								:class="serviceIndex == index ? 'active' : ''"
								@click="
									serviceIndex = index;
									serviceContent = item.content;
								"
								v-for="(item, index) in butlerInfo"
							>
								{{ item.content }}
							</view>
						</view>
					</view>
				</view>
				<view class="od-item marginbottom20" v-if="butlerInfo[serviceIndex]">
					<view class="item-tip">服务标准</view>
					<view class="item-right">
						<view class="item-txt">{{ butlerInfo[serviceIndex].standard }}</view>
					</view>
				</view>
				<view class="od-item marginbottom20" v-if="butlerInfo[serviceIndex]">
					<view class="item-tip">服务单价</view>
					<view class="item-right">
						<view class="item-txt red">￥{{ butlerInfo[serviceIndex].price }}</view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip">服务数量</view>
					<view class="item-right">
						<view class="item-right"><uni-number-box :min="1" v-model="serviceNum"></uni-number-box></view>
					</view>
				</view>
			</template>
			<template slot="payOption" v-else-if="info.order.pro_name == '代写文书'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">文书类型</view>
					<view class="item-right" @click="jump('/pages/client/order/write-type')">
						<view class="item-txt" v-if="document.length == 0">请选择</view>
						<view class="service-list inline-list" v-else>
							<view class="service-item active flex1" style="margin-right: 0;">{{ document }}</view>
						</view>
						<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">文书数量</view>
					<view class="item-right"><uni-number-box :min="1" v-model="docu_num"></uni-number-box></view>
				</view>
			</template>
			<template slot="payOption" v-else-if="info.order.pro_name == '判案'">
				<view class="od-item">
					<view class="item-tip require">案件数量</view>
					<view class="item-right"><uni-number-box :min="1" v-model="case_num"></uni-number-box></view>
				</view>
				<view class="od-item">
					<view class="item-tip">完成时间</view>
					<view class="item-right">
						<view class="item-txt">{{ docu_time_text }}</view>
					</view>
				</view>
			</template>
			<template slot="payOption" v-else-if="info.order.pro_name == '刑事会见'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">会见次数</view>
					<view class="item-right"><uni-number-box :min="1" v-model="meet_num"></uni-number-box></view>
				</view>
			</template>
			<view class="od-item" slot="payOption2">
				<view class="item-tip">律师费用</view>
				<view class="item-right">
					<view class="item-txt red">￥{{ lawPrice }}(8折)</view>
				</view>
			</view>
		</service-popup-pay>
	</uni-popup>
</template>

<script>
export default {
	props: ['info'],
	data() {
		return {
			lawPrice: '',
			serviceDuration: '', //服务时长
			meet_num: 1, //会见次数
			docu_time_text: '', //完成时间
			case_num: 1, //案件数量
			document: [], //文书类型
			docu_num: 1, //文书数量
			butlerInfo: [], //管家信息
			serviceContent: '', //服务内容
			serviceStandard: '', //服务标准
			serviceSinglePrize: '', //服务单价
			serviceNum: 1, //服务数量
			serviceIndex: -1, //服务内容索引
			askInfo: [], //问一下信息
			askIndex: -1
		};
	},
	created() {
		this.initAddService();
	},
	watch: {
		serviceIndex(val) {
			if (this.info.order.pro_name == '管家') {
				this.lawPrice = this.butlerInfo[this.serviceIndex].bazhe;
			}
		},
		// 陪聊服务时长
		serviceDuration(val, oldVal) {
			if (this.info.order.pro_name == '陪聊') {
				this.getMoney();
			}
		},
		// 陪聊服务内容
		serviceContent(val, oldVal) {
			if (this.info.order.pro_name == '陪聊') {
				this.getMoney();
			}
		},
		// 问一下
		askIndex(val) {
			if (this.info.order.pro_name == '问一下') {
				this.lawPrice = this.askInfo[this.askIndex].bazhe;
			}
		},
		case_num(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		meet_num(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		docu_num(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		// 管家服务数量
		serviceNum(val, oldVal) {
			if (oldVal) {
				this.getMoneyButler();
			}
		}
	},
	methods: {
		async initAddService() {
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				product_name_id: this.info.order.server_name_id,
				num: 1
			};
			let res = await this.$api('index.add_list', formData);
			if (res.code == 1) {
				if (this.info.order.pro_name == '刑事会见') {
					this.lawPrice = res.data.add.bazhe;
				} else if (this.info.order.pro_name == '判案') {
					this.docu_time_text = this.info.order.docu_time_text;
					this.lawPrice = res.data.add.bazhe;
				} else if (this.info.order.pro_name == '代写文书') {
					this.lawPrice = res.data.add.bazhe;
				} else if (this.info.order.pro_name == '管家') {
					this.butlerInfo = res.data.add;
					this.serviceIndex = 0;
					this.lawPrice = res.data.add[0].bazhe;
					this.serviceContent = res.data.add[0].content;
				} else if (this.info.order.pro_name == '陪聊') {
					this.serviceDuration = res.data.add[0].serve_time;
					this.serviceContent = res.data.add[0].content;
					this.lawPrice = res.data.add[0].bazhe;
				} else if (this.info.order.pro_name == '问一下') {
					this.askInfo = res.data.add;
					this.askIndex = 0;
					this.serviceDuration = res.data.add[0].serve_time;
					this.serviceContent = res.data.add[0].serve_type;
					this.lawPrice = res.data.add[0].bazhe;
				}
			}
		},
		// 增加服务-支付
		async confirmAddService(payMethod) {
			this.$refs.popupAddService.close();
			let formData = {
				id: this.info.order.id,
				token: uni.getStorageSync('token'),
				type: 4,
				pay_type: payMethod,
				price: this.lawPrice
			};
			if (this.info.order.pro_name == '刑事会见') {
				formData = {
					...formData,
					origin: `会见次数:${ this.meet_num},付款方式:${payMethod}`,
					num: this.meet_num
				};
			} else if (this.info.order.pro_name == '判案') {
				formData = {
					...formData,
					origin: `案件数量:${this.case_num},完成时间:${this.docu_time_text},付款方式:${payMethod}`,
					num: this.case_num
				};
			} else if (this.info.order.pro_name == '代写文书') {
				formData = {
					...formData,
					origin: `文书类型:${this.document},文书数量:${this.docu_num},付款方式:${payMethod}`,
					num: this.docu_num
				};
			} else if (this.info.order.pro_name == '管家') {
				formData = {
					...formData,
					origin: `服务内容:${this.serviceContent},服务标准:${this.butlerInfo[this.serviceIndex].standard},服务单价:${this.butlerInfo[this.serviceIndex].price},服务数量:${this.serviceNum},付款方式:${payMethod}`,
					num: this.serviceNum
				};
			} else if (this.info.order.pro_name == '陪聊') {
				formData = {
					...formData,
					origin:`服务内容:${this.serviceContent},服务时长:${this.serviceDuration},付款方式:${payMethod}`
				};
			} else if (this.info.order.pro_name == '问一下') {
				formData = {
					...formData,
					origin: `服务方式:线下面谈,服务时长:${this.serviceDuration},付款方式:${payMethod}`
				};
			}

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
		async getMoney() {
			let formData = {
				token: uni.getStorageSync('token'),
				product_type_id: this.info.order.serve_type,
				product_id: this.info.order.pro_name,
				product_name_id: this.info.order.server_name_id,
				product_time_id: this.serviceDuration,
				content_id: this.serviceContent
			};
			if (this.info.order.pro_name == '判案') {
				formData = { ...formData, num: this.case_num };
			} else if (this.info.order.pro_name == '代写文书') {
				formData = { ...formData, num: this.docu_num };
			} else if (this.info.order.pro_name == '刑事会见') {
				formData = { ...formData, num: this.meet_num };
			}

			let res = await this.$api('index.product_price_name', formData);
			this.lawPrice = res.data[0].bazhe;
		},
		async getMoneyButler() {
			let formData = {
				token: uni.getStorageSync('token'),
				product_name_id: this.info.order.server_name_id,
				id: this.info.order.id, 
				num: this.serviceNum,
				type: '' 
			};

			let res = await this.$api('index.add_list', formData);
			this.butlerInfo = res.data.add;
			this.serviceIndex = this.serviceIndex;
			this.lawPrice = res.data.add[this.serviceIndex].bazhe;
			this.serviceContent = res.data.add[this.serviceIndex].content;
		}
	}
};
</script>

<style lang="scss"></style>
