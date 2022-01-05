<template>
	<view class="content">
		<view class="od-box">
			<!-- 服务领域组件 -->
			<order-item-service ref="orderItemService" :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service>
			<view class="od-item marginbottom20">
				<view class="item-tip require">服务内容</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item" :class="serviceContent == '陪您办事' ? 'active' : ''" @click="serviceContent = '陪您办事'">陪您办事</view>
						<view class="service-item" :class="serviceContent == '代您谈判' ? 'active' : ''" @click="serviceContent = '代您谈判'">代您谈判</view>
						<view class="service-item" :class="serviceContent == '代打电话' ? 'active' : ''" @click="serviceContent = '代打电话'">代打电话</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip require">服务时长</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item" :class="serviceDuration == '60分钟' ? 'active' : ''" @click="serviceDuration = '60分钟'">60分钟</view>
						<view class="service-item" :class="serviceDuration == '120分钟' ? 'active' : ''" @click="serviceDuration = '120分钟'">120分钟</view>
						<view class="service-item" :class="serviceDuration == '180分钟' ? 'active' : ''" @click="serviceDuration = '180分钟'">180分钟</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<template v-if="serviceContent != '代打电话'">
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务时间</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="serviceTime == '另行协商' ? 'active' : ''" @click="serviceTime = '另行协商'">另行协商</view>
							<view class="service-item" v-if="!forwardTime || serviceTime == '另行协商'" @click="jump('/pages/client/order/forward-time', { serviceDuration: serviceDuration })">
								预约时间
							</view>
							<view class="service-item active" style="flex:1; margin-right: 0;" v-else @click="jump('/pages/client/order/forward-time', { serviceDuration: serviceDuration })">
								<view class="text-ellipsis">{{ forwardTime }}</view>
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
				<view class="od-item marginbottom20">
					<view class="item-tip require">服务地点</view>
					<view class="item-right">
						<view class="service-list inline-list">
							<view class="service-item" :class="serviceLocation == '另行协商' ? 'active' : ''" @click="serviceLocation = '另行协商'">另行协商</view>
							<view class="service-item" v-if="!forwardLocation || serviceLocation == '另行协商'" @click="jump('/pages/client/order/map')">预约地点</view>
							<view class="service-item active" style="flex:1; margin-right: 0;" v-else @click="jump('/pages/client/order/map')">
								<view class="text-ellipsis">{{ forwardLocation.poiname }}</view>
							</view>
						</view>
						<view class="item-nav"></view>
					</view>
				</view>
			</template>

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
				:forwardLocation="forwardLocation"
				:serviceLocation="serviceLocation"
				:key="new Date().getTime()"
				:info="info"
			></order-popup-service>
		</uni-popup>
		<!-- 服务保障组件 -->
		<order-service-ensure ref="orderServiceEnsure" v-if="Object.keys(info.product).length > 0" :info="info"></order-service-ensure>
		<!-- 预约地点超出弹出层 -->
		<uni-popup ref="popupOut" type="dialog">
			<uni-popup-dialog type="info" title="温馨提示" okTxt="返回重选" cancleTxt="愿意承担" content="" :before-close="true" @confirm="confirmOut" @close="closePop('popupOut')">
				<view class="warm-tip-box">
					<view class="warm-tip-item">
						<view class="item-right">
							您选择了
							<text v-if="info.product.product == '刑事会见'">会见地点</text>
							<text v-else>服务地点</text>
							<text class="red">（{{ practiceArea }}）</text>
							以外的执业律师，将产生如下事项：
						</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">律师出差异地办事，将产生交通费、住宿费、办公费等；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">律师需要提前安排出差时间，而且对当地环境不熟悉，办事效率可能会受到影响。 您是否愿意接受并承担相关费用？</view>
					</view>
				</view>
			</uni-popup-dialog>
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
			serviceContent: '', //服务内容
			serviceDuration: '', //服务时长
			serviceLocation: '另行协商', //服务地点
			forwardLocation: '', //预约地点
			serviceTime: '另行协商', //服务时间
			forwardTime: '', //预约时间
			serviceType: '', //服务方式
			current_coupon: {}, //选中的优惠券
			offer_type: '', //服务报价
			mapRes: '', //地图选择地址
			sell: '', //优惠价格
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
		// 服务时长
		serviceDuration(val, oldVal) {
			if (oldVal) {
				this.getMoney();
				// 改变服务时间
				this.serviceTime = '另行协商';
				this.forwardTime = null;
			}
		},
		// 服务内容
		serviceContent(val, oldVal) {
			if (oldVal) {
				this.getMoney();
			}
		},
		serviceLocation(val, oldVal) {
			if (val == '另行协商') {
				this.practiceArea = '执业区域';
			}
		},
		// 服务人员-服务地点
		practiceArea(val, oldVal) {
			if (val != '执业区域') {
				this.getIsOUt();
			}
		},
		// 选择地点
		mapRes(val) {
			let temp_str = val.poiaddress;
			let reg = /.+?(省|市|自治区|自治州|县)/g;
			this.practiceArea = temp_str.match(reg).toString();
			this.getIsOUt();
		}
	},
	methods: {
		async init() {
			let formData = {
				id: this.product_id,
				area_id: this.area_id
			};
			if (uni.getStorageSync('token')) {
				formData = { ...formData, token: uni.getStorageSync('token') };
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
			this.serviceContent = res.data.product.content;
			this.serviceDuration = res.data.product.product_time;
			this.offer_type = res.data.product.pay_type_text;
			this.practiceArea = '执业区域';
			this.product_price_id = res.data.product.id;
		},
		async getMoney() {
			//获取服务方式
			let formDataChangeType = {
				token: uni.getStorageSync('token'),
				content_id: this.serviceContent
			};
			let resChangeType = await this.$api('index.change_type', formDataChangeType);
			this.serviceType = resChangeType.data.serve_type;

			let formData = {
				token: uni.getStorageSync('token'),
				product_type_id: this.serviceType,
				product_id: this.product_name,
				product_name_id: this.practiceYear,
				product_time_id: this.serviceDuration,
				content_id: this.serviceContent,
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
		getIsOUt() {
			if (this.mapRes && this.practiceArea != '全国' && this.mapRes.cityname != this.practiceArea.split(',')[1]) {
				this.$refs.popupOut.open();
			}
		},
		// 超出，预约地点
		confirmOut() {
			this.$refs.popupOut.close();
			this.jump('/pages/client/order/map');
		},
		async getServiceType() {
			let formData = {
				token: uni.getStorageSync('token'),
				content_id: this.serviceContent
			};
			let res = await this.$api('index.change_type', formData);
			this.serviceType = res.data.serve_type;
		},
		chooseService(obj) {
			this.practiceChoose = obj.choose;
			this.practiceYear = obj.year;
			this.practiceArea = obj.area;
		},
		onAddressChange(res) {
			this.mapRes = res;
			console.log(res);
			this.serviceLocation = '预约地点';
			this.forwardLocation = res;
		},
		onDatetimeChange(res) {
			this.serviceTime = '预约时间';
			this.forwardTime = res;
		},
		dialogConfirm() {
			this.$refs.popupOut.close();
		},
		confirm() {
			this.addOrder(this.price_type_text);
		},
		async addOrder(money_type) {
			let formData = {
				token: uni.getStorageSync('token'),
				product_id: this.product_name,
				fali_serve_area_id: this.$refs.orderItemService.area_name,
				server_type_id: this.serviceType,
				server_content: this.serviceContent,
				server_time_id: this.serviceDuration,
				server_name_id: this.practiceYear,
				offer_type: this.offer_type,
				money_type: money_type,
				money: this.money,
				pay_type: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
				source: this.source,
				requirement: this.$refs.myrequire.requirement_copy,
				coupon_id: this.current_coupon ? this.current_coupon.id : '',
				profession: this.practiceArea,
				longitude: JSON.stringify(this.forwardLocation),
				product_price_id: this.product_price_id,
				fali_source: this.fali_source
			};

			if (this.serviceContent != '代打电话') {
				let server_time_text;
				let server_address;
				if (this.serviceTime == '预约时间') {
					server_time_text = this.forwardTime;
				} else {
					server_time_text = this.serviceTime;
				}
				if (this.serviceLocation == '预约地点') {
					server_address = this.forwardLocation.poiname;
				} else {
					server_address = this.serviceLocation;
				}

				formData = {
					...formData,
					server_time_text: server_time_text,
					server_address: server_address
				};
			}

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
		}
	}
};
</script>

<style lang="scss">
.content {
	padding-bottom: 122rpx;
}
.paddingtop20 {
	padding-top: 20rpx;
}
</style>
