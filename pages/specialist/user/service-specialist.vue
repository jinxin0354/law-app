<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的法务专员：</view>
			<view class="match-txt">您好！请先与委托人联系一下，指引委托人在“订单详情”-“项目资料”处，先上传资料，以便协助其全面审查订单。祝您圆满成功！感谢您的信任与支持！</view>

			<view class="service-list">
				<button class="service-item active" @click="callVirtualTel">联系委托人</button>
				<button class="service-item active" :disabled="isSpecialistServiceOk || isClientServiceOk"
					@click="$refs.popupServiceOk.open()">法务服务完成</button>
				<button class="service-item active" :disabled="isSpecialistServiceOk || isClientServiceOk"
					@click="jump('/pages/specialist/user/to-cancel', { order_id: order_id })">
					取消订单
				</button>
				<button class="service-item active" v-if="isSpecialistServiceOk" style="width: 100%; margin-right: 0;"
					@click="urged">催促委托人确认完成</button>
			</view>
			<template v-if="isClientServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;"
						@click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'">
			<template slot="case-edit">
				<view class="gray">(先联系委托人，确认信息后，再填写)</view>
				<button type="default" class="ok-btn" @click="$refs.popupCase.open()">编辑</button>
			</template>
		</order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order" :key="new Date().getTime()">
			<template slot="detail-edit">
				<view class="gray" style="width: 200rpx;">（如需更改订单，请先联系委托人再更改）</view>
				<button type="default" class="ok-btn" @click="$refs.popupChangeOrder.open()"
					v-if="!isEdit">更改订单</button>
				<button type="default" class="ok-btn" @click="$refs.popupChangeOrder.open()" v-else>催促委托人确认并付款</button>
			</template>
		</order-detail>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我已与委托人确认服务完成,以便帮我尽快匹配律师" :before-close="true"
				@confirm="confirmServiceOk" @close="closePop('popupServiceOk')"></uni-popup-dialog>
		</uni-popup>
		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')" @close="closePop('popupSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我不确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')" @close="closePop('popupNoSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 我的身份 -->
		<u-select v-model="showIdent" mode="mutil-column-auto" :list="infoIdent" @confirm="confirmIdent"
			confirm-color="#FFC801"></u-select>
		<!-- 编辑案件主体弹窗 -->
		<uni-popup ref="popupCase" type="center">
			<order-popup-common title="案件主体信息" @closePop="closePop('popupCase')">
				<scroll-view class="popup-con" scroll-y="true" slot="popup-con">
					<view class="od-box" style="padding-top: 0;">
						<view class="od-title"><text class="gray">(先联系委托人，确认信息后，再填写)</text></view>
						<view class="case-title">委托人诉求{{requirement}}</view>
						<view class="od-item marginbottom10">
							<view class="item-right">
								<order-right-textarea v-model="requirement" ref="myrequire"
									placeholderTxt="请填写委托人要律师帮Ta实现什么结果" :requirement="requirement"
									></order-right-textarea>
							</view>
							<!-- :key="new Date().getTime()" -->
						</view>
						<view class="case-title">委托人</view>
						<view class="od-item">
							<view class="item-tip require">身份</view>
							<view class="item-right" @click="showIdent = true">
								<view class="service-list inline-list" v-if="my_ident.label">
									<view class="service-item active" style="width: 200rpx;">{{ my_ident.label }}</view>
								</view>
								<view class="item-txt gray" v-else>请选择</view>
								<view class="item-nav">
									<image src="@/static/img/right.png" mode="aspectFit"></image>
								</view>
							</view>
						</view>
						<view class="od-item marginbottom10">
							<view class="item-tip require">姓名</view>
							<view class="item-right">
								<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
										placeholder-class="placeholder" v-model="clientInfo.self_name" /></view>
							</view>
						</view>
						<view class="od-item marginbottom10">
							<view class="item-tip require">证件号码</view>
							<view class="item-right">
								<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
										placeholder-class="placeholder" v-model="clientInfo.self_code" /></view>
							</view>
						</view>
						<view class="od-item marginbottom10">
							<view class="item-tip require">联系电话</view>
							<view class="item-right">
								<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
										placeholder-class="placeholder" v-model="clientInfo.self_tel" /></view>
							</view>
						</view>
						<template v-for="(item, index) in otherInfoLIst">
							<view class="case-title">
								对方当事人<!-- {{ index + 1 }} -->
								<view class="title-del" @click="deleteOtherInfo(index)">
									<view class="image-wrapper">
										<image src="@/static/img/delete.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>
							<view class="od-item marginbottom10">
								<view class="item-tip require">姓名</view>
								<view class="item-right">
									<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
											placeholder-class="placeholder" v-model="item.dui_name" /></view>
								</view>
							</view>
							<view class="od-item marginbottom10">
								<view class="item-tip require">证件号码</view>
								<view class="item-right">
									<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
											placeholder-class="placeholder" v-model="item.dui_code" /></view>
								</view>
							</view>
							<view class="od-item marginbottom10">
								<view class="item-tip require">联系电话</view>
								<view class="item-right">
									<view class="item-txt"><input type="text" class="ipt" value="" placeholder="请输入"
											placeholder-class="placeholder" v-model="item.dui_tel" /></view>
								</view>
							</view>
						</template>
						<view class="service-list" style="margin-bottom: 0;">
							<view class="service-item active" style="width: 300rpx; margin: auto;" @click="addOther">
								增加对方当事人</view>
						</view>
					</view>
				</scroll-view>
				<view class="ok-box" slot="popup-btn"><button type="default" class="ok-btn"
						@click="confirmSave">确定</button></view>
			</order-popup-common>
		</uni-popup>
		<!-- 确认修改订单弹出层 -->
		<uni-popup ref="popupChangeOrder" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我已与委托人确认更改订单" :before-close="true"
				@confirm="changeOrder" @close="closePop('popupChangeOrder')"></uni-popup-dialog>
		</uni-popup>
		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient"
			v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer"
			v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor"
			v-if="info.order.investor_mobile"></order-telephone>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
	import {
		mixin
	} from '@/common/mixins/specialist_order_state.js';
	import {
		share_coupon
	} from '@/common/mixins/share_coupon.js';
	export default {
		mixins: [mixin, share_coupon],
		data() {
			return {
				info: {
					order: {}
				},
				order_id: '',
				requirement: '', //委托人诉求
				showIdent: false,
				infoIdent: [], //我的身份选择
				my_ident: '', //我的身份
				clientInfo: {
					self_name: '', //姓名
					self_code: '', //证件号码
					self_tel: '' //联系电话
				},
				otherInfoLIst: [{
					dui_name: '', //姓名
					dui_code: '', //证件号码
					dui_tel: '' //联系电话
				}],
				isEdit: false //法务是否已经修改了订单
			};
		},
		onLoad(params) {
			if (params.order_id) {
				this.order_id = params.order_id;
				this.init();
			}
		},
		onShow() {
			console.log('show');
			this.init();
		},
		methods: {
			async init() {
			console.log("init")
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.orderDetail', formData);
				this.info = res.data;
				this.getOrderState(this.info);

				let formDataIdent = {
					token: uni.getStorageSync('token')
				};
				let resIdent = await this.$api('index.ident', formDataIdent);
				this.infoIdent = resIdent.data;

				// 案件主体初始化
				this.requirement = this.info.order.requirement;
				this.my_ident = {
					value: this.info.order.my_ident,
					label: this.info.order.my_ident_text
				};
				this.clientInfo = {
					self_code: this.info.order.self_code,
					self_name: this.info.order.self_name,
					self_tel: this.info.order.self_tel
				};
				if (this.info.order.dui) {
					this.otherInfoLIst = this.info.order.dui;
				}
			},
			async confirmServiceOk() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.legal_sure', formData);
				if (res.code == 1) {
					this.isSpecialistServiceOk = true;
					this.$refs.popupServiceOk.close();
				}
			},
			async sureServiceOk(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.legal_sure_over', formData);
				if (res.code == 1) {
					console.log(res)
					if (pop == 'popupSureServiceOk') {
						this.closePop('popupSureServiceOk');
						this.replace('/pages/specialist/user/service-ok', {
							order_id: this.order_id
						});
					} else if (pop == 'popupNoSureServiceOk') {
						this.closePop('popupNoSureServiceOk');
						this.isClientServiceOk = false;
						this.isSpecialistServiceOk = false;
					}
				}
			},
			async callVirtualTel() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.virtual_tel', formData);
				if (res.code == 1) {
					let phoneNumber = res.data.middleNumber;
					const nav = navigator.userAgent;
					if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
						phone.call(phoneNumber);
					} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
						this.$bridge.callhandler('call', phoneNumber, data => {});
					}
				}
			},
			urged() {
				uni.showToast({
					title: '请联系委托人尽快确认，谢谢！',
					icon: 'none'
				});
			},
			confirmIdent(e) {
				this.my_ident = e[2];
			},
			addOther() {
				this.otherInfoLIst.push({
					dui_name: '',
					dui_code: '',
					dui_tel: ''
				});
			},
			async confirmSave() {
				if (!this.my_ident.value) {
					uni.showToast({
						title: '请选择委托人身份',
						icon: 'none'
					});
					return;
				}
				if (!this.clientInfo.self_name) {
					uni.showToast({
						title: '请输入委托人姓名',
						icon: 'none'
					});
					return;
				}
				if (!this.clientInfo.self_code) {
					uni.showToast({
						title: '请输入委托人证件号码',
						icon: 'none'
					});
					return;
				}
				if (!this.clientInfo.self_tel) {
					uni.showToast({
						title: '请输入委托人联系电话',
						icon: 'none'
					});
					return;
				}
				for (let i = 0; i < this.otherInfoLIst.length; i++) {
					if (!this.otherInfoLIst[i].dui_name) {
						uni.showToast({
							title: '请输入对方当事人姓名',
							icon: 'none'
						});
						return;
					}
					if (!this.otherInfoLIst[i].dui_name) {
						uni.showToast({
							title: '请输入对方当事人证件号码',
							icon: 'none'
						});
						return;
					}
					if (!this.otherInfoLIst[i].dui_name) {
						uni.showToast({
							title: '请输入对方当事人联系电话',
							icon: 'none'
						});
						return;
					}
				}
				let formData = {
					id: this.info.order.id,
					token: uni.getStorageSync('token'),
					requirement: this.$refs.myrequire.requirement_copy,
					my_ident: this.my_ident.value,
					self_name: this.clientInfo.self_name,
					self_tel: this.clientInfo.self_tel,
					self_code: this.clientInfo.self_code,
					dui: JSON.stringify(this.otherInfoLIst)
				};
				let res = await this.$api('index.edit_ident', formData);
				this.closePop('popupCase');
				this.init();
			},
			deleteOtherInfo(index) {
				if (index > 0) {
					this.otherInfoLIst.splice(index, 1);
				} else {
					uni.showToast({
						title: '至少有一个对方当事人',
						icon: 'none'
					});
				}
			},
			changeOrder() {
				this.closePop('popupChangeOrder');
				let params = {
					order_id: this.info.order.id,
					product_id: this.info.order.id,
					area_id: this.info.order.fali_serve_area_id,
					product_name: this.info.order.pro_name,
					bearFees: this.info.order.price_type,
					type: 'change'
				};
				this.jump('/pages/client/order/order-court-own', params);
			}
		}
	};
</script>

<style lang="scss">
	.content {
		padding-bottom: 30rpx;
	}

	.textaligncenter {
		text-align: center;
	}

	.case-title {
		margin-bottom: 10rpx;
		position: relative;
		padding-left: 30rpx;

		.title-del {
			.image-wrapper {
				width: 35rpx;
				height: 35rpx;

				image {
					vertical-align: middle;
					width: 100%;
					height: 100%;
				}
			}

			float: right;
		}

		&::before {
			content: '';
			position: absolute;
			width: 10rpx;
			height: 25rpx;
			background-color: $uni-color-primary;
			border-radius: 40rpx;
			left: 0;
			top: 8rpx;
		}
	}

	.gray {
		width: 400rpx !important;
		margin-left: 10rpx;
	}
</style>
