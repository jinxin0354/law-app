<template>
	<view class="content">
		<view class="od-box">
			<!-- 服务领域组件 -->
			<order-item-service ref="orderItemService" :info="info" v-if="Object.keys(info.product).length > 0">
			</order-item-service>
			<view class="od-item marginbottom20">
				<view class="item-tip">办案阶段</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item" :class="meet_stage == '公安机关' ? 'active' : ''"
							@click="meet_stage = '公安机关'">公安机关</view>
						<view class="service-item" :class="meet_stage == '人民检察院' ? 'active' : ''"
							@click="meet_stage = '人民检察院'">人民检察院</view>
						<view class="service-item" :class="meet_stage == '人民法院' ? 'active' : ''"
							@click="meet_stage = '人民法院'">人民法院</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip">涉嫌罪名</view>
				<view class="item-right">
					<view class="item-txt">
						<input class="ipt" placeholder="拘留通知书上，写的是啥罪名？" placeholder-class="placeholder"
							v-model="accusation" @input="search" @blur="blur" @click="search" />
						<scroll-view class="search-box" scroll-y="" v-show="isFocus">
							<view class="search-item" v-for="(item, index) in searchList" @click="
									accusation = item.accusation;
									isFocus = false;
								">
								{{ item.accusation }}
							</view>
						</scroll-view>
						<view class="link-tip blue" @click="$refs.popupRule.open()"><text>法规</text></view>
					</view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip require">会见地点</view>
				<view class="item-right" @click="meetChange()">
					<template v-if="meet_addr">
						<view class="service-list inline-list">
							<view class="service-item active" style="width: 100%; margin-right: 0;">{{ meet_addr }}
							</view>
						</view>
					</template>
					<template v-else>
						<view class="item-txt">
							<input auto-height="true" class="ipt" placeholder="拘留通知书上，写人关在哪个看守所？"
								placeholder-class="placeholder" v-model="meet_addr" disabled="" />
						</view>
					</template>

					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="od-item marginbottom10">
				<view class="item-tip require">会见次数</view>
				<view class="item-right">
					<uni-number-box :min="1" v-model="meet_num"></uni-number-box>
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
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="od-item marginbottom20">
				<view class="item-tip">服务报价</view>
				<view class="item-right">
					<view class="service-list inline-list">
						<view class="service-item active">平台统一价</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip require">律师费用</view>
				<view class="item-right">
					<view class="service-list service-two">
						<view class="service-item" :class="price_type_text == item.price_type_text ? 'active' : ''"
							@click="
							product_price_id = item.id;
								price_type_text = item.price_type_text;
								money = item.total;
							" v-for="(item, index) in moneyList">
							<text class="two-money">¥{{ item.total }}</text>
							<text class="two-tip">{{ item.price_type_text }}</text>
							<image v-if="item.price_type_text == '先用后付 无忧付'" class="noback"
								src="@/static/img/order-noback2.png" mode="aspectFit"></image>
							<image v-if="item.price_type_text == '边用边付 轻松付'" class="noback"
								src="@/static/img/order-noback3.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">项目资料</view>
				<view class="item-right"
					@click="jump('/pages/client/order/upload', { source: JSON.stringify(source) })">
					<view class="item-txt gray">您手上有的资料，都可上传</view>
					<view class="item-file" v-if="source.length > 0">
						<image src="@/static/img/order-file.png"></image>
					</view>
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
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
				<order-user-coupon :info="info" v-if="Object.keys(info.product).length > 0" @getCoupon="getCoupon">
				</order-user-coupon>
			</template>
			<template v-if="price_type_text != '先用后付 无忧付'">
				<!-- 付款方式组件 -->
				<order-item-pay-method ref="orderItemPayMethod" :info="info"
					v-if="Object.keys(info.product).length > 0"></order-item-pay-method>
			</template>
			<view class="od-item">
				<view class="item-tip">服务保障</view>
				<view class="item-right" @click="$refs.orderServiceEnsure.$refs.popupEnsure.open()">
					<view class="item-txt green">
						<view class="text-ellipsis" style="width: 400rpx;">{{ info.product.tags }}</view>
					</view>
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">服务方式</view>
				<view class="item-right">
					<view class="item-txt">{{ serviceType }}</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<view class="od-item">
				<view class="item-tip">会见时间</view>
				<view class="item-right">
					<view class="item-txt">根据法律规定，律师接受委托后，需与看守所预约好时间，才可会见。</view>
					<view class="item-nav"></view>
				</view>
			</view>
			<!-- 服务范围组件 -->
			<order-item-service-desc :info="info" v-if="Object.keys(info.product).length > 0"></order-item-service-desc>
		</view>
		<!-- 服务内容组件 -->
		<order-unfold title="服务内容">
			<view slot="unfold-con">
				<view class="" v-html="info.product.serve_content"></view>
			</view>
		</order-unfold>
		<!-- 产品说明组件 -->
		<order-unfold-product title="产品说明" :img_src="info.product.desc_content"></order-unfold-product>

		<view class="od-box">
			<view class="od-item"
				@click="jump('/pages/client/order/ask', { id: info.product.id, product_name: info.product.product })">
				<view class="item-tip">问大家</view>
				<view class="item-right">
					<view class="item-txt">产品有疑问，进去问问用过的人吧</view>
					<view class="gray" style="line-height: 60rpx;" v-if="info.ques_count">{{ info.ques_count }}</view>
					<view class="item-nav">
						<image src="@/static/img/right.png" mode="aspectFit"></image>
					</view>
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
			<order-popup-service @closePop="closePop('popupService')" @chooseService="chooseService"
				:practiceChoose="practiceChoose" :practiceYear="practiceYear" :practiceArea="practiceArea"
				:meet_addr="meet_addr" :key="new Date().getTime()" :info="info"></order-popup-service>
		</uni-popup>
		<!-- 服务保障组件 -->
		<order-service-ensure ref="orderServiceEnsure" v-if="Object.keys(info.product).length > 0" :info="info">
		</order-service-ensure>
		<!-- 选择地区组件 -->
		<u-picker mode="region" v-model="showArea" :params="params" :default-region="defaultRegion"
			confirm-color="#FFC801" @confirm="regionConfirm"></u-picker>
		<!-- 法规弹窗 -->
		<uni-popup ref="popupRule" type="bottom">
			<order-popup-common-bottom title="法规" @closePop="closePop('popupRule')">
				<view class="popup-con" slot="popup-con">
					<view class="od-box marginbottom0">
						<view class="od-item marginbottom10" v-for="item in rules" @click="download(item)">
							<view class="item-right">
								<view class="item-txt">{{ item.name }}</view>
								<view class="item-nav">
									<image src="@/static/img/right.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</order-popup-common-bottom>
		</uni-popup>
		<!-- 预约地点超出弹出层 -->
		<uni-popup ref="popupOut" type="dialog">
			<uni-popup-dialog type="info" title="温馨提示" okTxt="返回重选" cancleTxt="愿意承担" content="" :before-close="true"
				@confirm="confirmOut" @close="closeOut">
				<view class="warm-tip-box">
					<view class="warm-tip-item">
						<view class="item-right">
							您选择了律师执业区域
							<text class="red">（{{ practiceArea }}）</text>
							以外的会见地点，将产生如下事项：
						</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">律师出差异地办事，将产生交通费、住宿费、办公费等；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">律师需要提前安排出差时间，而且对当地环境不熟悉，办事效率可能会受到影响。</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-right">您是否愿意接受并承担相关费用？</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		
		<!-- 预约地点不一致弹出层 -->
		<uni-popup ref="orderCommonAreaTip" type="center">
			<order-popup-common title="温馨提示" @closePop="closePop('orderCommonAreaTip')">
				<template slot="popup-con">
					<view class="warm-tip-box" style="padding: 0 30rpx;">
						<view class="warm-tip-item">
							<view class="item-right">
								请选择律师执业区域<text class="red">（{{ practiceArea }}）</text>以内的会见地点，以便为您提供快速高效的服务和减少成本 
							</view>
						</view>
					</view>
					<view class="ok-box" slot="popup-btn">
						<button type="default" class="ok-btn" @click="
								closePop('orderCommonAreaTip');
								showArea = true;
							">
							朕知道了
						</button>
					</view>
				</template>
			</order-popup-common>
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
				serviceType: '', //服务方式
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
				meet_stage: '', //办案阶段
				accusation: '', //涉案罪名
				meet_num: 1, //会见次数
				meet_addr: '', //会见地点
				searchList: [],
				current_coupon: {}, //选中的优惠券
				offer_type: '', //服务报价
				isTxtOne: true, //显示一行
				defaultRegion: ['广东省', '深圳市'], //选择会见地点
				showArea: false,
				params: {
					province: true,
					city: true,
					area: false
				},
				isFocus: false, //法规聚焦
				rules: [], //法规
				sell: '', //优惠价格
				product_price_id: '', //律师费用方式
				fali_source: ''
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
			meet_num(val, oldVal) {
				if (oldVal) {
					this.getMoney();
				}
			},
			practiceYear(val, oldVal) {
				if (oldVal) {
					this.getMoney();
				}
			},
			meet_stage(val, oldVal) {
				if (oldVal) {
					this.getMoney();
				}
			},
			// 会见地点
			meet_addr(val, oldVal) {
				this.practiceArea = val;
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
				this.practiceArea = '执业区域';
				this.moneyList = res.data.list.price_type;
				this.price_type_text = res.data.product.price_type_text;
				this.offer_type = res.data.product.pay_type_text;
				this.meet_stage = res.data.product.meet_stage;
				this.accusation = res.data.product.accusation;
				this.product_price_id = res.data.product.id;

				this.getRule();
			},
			async getMoney() {
				let formData = {
					token: uni.getStorageSync('token'),
					product_type_id: this.serviceType,
					product_id: this.product_name,
					product_name_id: this.practiceYear,
					meet_stage: this.meet_stage,
					num: this.meet_num,
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
				if (!this.meet_addr) {
					uni.showToast({
						title: '请选择会见地点',
						icon: 'none'
					});
					return;
				}
				let formData = {
					token: uni.getStorageSync('token'),
					product_id: this.product_name,
					fali_serve_area_id: this.$refs.orderItemService.area_name,
					server_type_id: this.serviceType,
					server_name_id: this.practiceYear,
					offer_type: this.offer_type,
					money_type: money_type,
					money: this.money,
					pay_type: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod : '',
					source: this.source,
					requirement: this.$refs.myrequire.requirement_copy,
					meet_stage: this.meet_stage,
					accusation: this.accusation,
					server_address: this.meet_addr,
					meet_num: this.meet_num,
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
							payMethod: this.$refs.orderItemPayMethod ? this.$refs.orderItemPayMethod.payMethod :
								'',
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
			async search() {
				this.isFocus = true;
				let formData = {
					key: this.accusation,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.accusation', formData);
				if (res.code == 1) {
					this.searchList = res.data;
				}
			},
			blur() {
				setTimeout(() => {
					this.isFocus = false;
				}, 500);
			},
			// 选择地区确定
			regionConfirm(res) {
				this.temp_addr = res.province.label + ',' + res.city.label;
				this.defaultRegion = this.temp_addr.split(',');
				if (this.practiceArea != '执业区域' && this.practiceArea != this.temp_addr) {
					this.$refs.popupOut.open();
				} else {
					this.meet_addr = this.temp_addr;
				}
			},
			//返回重选
			confirmOut() {
				this.$refs.popupOut.close();
				this.showArea = true;
			},
			// 愿意承担
			closeOut() {
				this.closePop('popupOut');
				this.meet_addr = this.temp_addr;
			},
			async getRule() {
				let formData = {
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.fagui', formData);
				this.rules = res.data;
			},
			async download(item) {
				const nav = navigator.userAgent;
				if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
					phone.loadOffice(item.image);
				} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
					this.$bridge.callhandler('loadOffice', item.image, data => {});
				}
			},
			meetChange() {
				if (this.practiceArea == '执业区域') {
					this.showArea = true
				}
				else{
					this.$refs.orderCommonAreaTip.open();
				}
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

	.search-box {
		height: 600rpx;
		width: calc(100% - 200rpx);
		position: absolute;
		left: 150rpx;
		top: 80rpx;
		z-index: 10;
		background-color: #ffffff;
		padding: 0 20rpx;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		border-radius: 26rpx;

		.search-item {
			padding-top: 10rpx;
			border-bottom: 1rpx solid #eeeeee;
			padding-bottom: 10rpx;
		}
	}
</style>
