<template>
	<view class="popup-bottom-box">
		<view class="bot-title">
			<view class="title-txt">服务人员</view>
			<view class="title-close" @click="close">
				<view class="image-wrapper">
					<image src="@/static/img/close.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="bot-con">
			<view class="service-title require">挑选方式</view>
			<view class="service-list">
				<view class="service-item" :class="choose == '智能匹配' ? 'active' : ''" @click="choose = '智能匹配'">智能匹配
				</view>
			</view>
			<view class="service-title require">执业年限</view>
			<view class="service-list">
				<view class="service-item" :class="year == '全部' ? 'active' : ''" @click="year = '全部'">全部</view>
				<view class="service-item" v-if="serviceDuration != '15分钟'" :class="year == '执业3年起' ? 'active' : ''"
					@click="year = '执业3年起'">执业3年起</view>
				<view class="service-item" v-if="serviceDuration != '15分钟'" :class="year == '执业5年起' ? 'active' : ''"
					@click="year = '执业5年起'">执业5年起</view>
				<view class="service-item" v-if="serviceDuration != '15分钟'" :class="year == '执业10年起' ? 'active' : ''"
					@click="year = '执业10年起'">执业10年起</view>
			</view>
			<view class="service-title require">执业区域</view>
			<view class="od-box">
				<view class="od-item margin0">
					<view class="item-right">
						<!-- 15分钟不筛选服务人员 -->
						<template v-if="serviceDuration == '15分钟'">
							<view class="service-list">
								<view class="service-item active">全国</view>
							</view>
						</template>
						<!-- 其他都需要筛选服务人员 -->
						<template v-else>
							<view class="flex1 gray" v-if="practiceArea == '执业区域'" @click="changeArea()">
								<text v-if="selectArea == '执业区域'">请选择
									<template v-if="info.product.product == '刑事会见'">
										会见地点的
									</template>
									<template v-if="info.product.product == '管家'&& serviceGrade == '顶级'">
										您办事地点的
									</template>
									<template v-else-if="info.product.product == '问一下' || info.product.product == '陪聊'">
										预约地点的
									</template>
									律师，以便为您提供快速高效的服务和减少成本</text>
								<text v-else>{{ selectArea }}</text>
							</view>
							<view class="service-list inline-list margin0" v-else @click="changeArea()">
								<view class="service-item active flex1 margin0">
									<!-- <text v-if="practiceArea != '全国'">
										<template v-if="info.product.product == '刑事会见'">
											会见地点的
										</template>
										<template
											v-else-if="info.product.product == '问一下' || info.product.product == '陪聊'">
											预约地点的
										</template>
									</text> -->
									<text>
										{{ selectArea }}
									</text>
								</view>
							</view>
							<view class="item-nav">
								<image src="@/static/img/right.png" mode="aspectFit"></image>
							</view>
						</template>
					</view>
				</view>
			</view>
			<!-- 选择地区组件 -->
			<u-picker mode="region" v-model="showArea" :params="params" :default-region="defaultRegion"
				confirm-color="#FFC801" @confirm="regionConfirm"></u-picker>
		</view>
		<view class="ok-box"><button type="default" class="ok-btn" @click="confirm">确定</button></view>
		<!-- 提示弹出层 -->
		<uni-popup ref="orderCommonAreaTip" type="center">
			<order-popup-common title="温馨提示" @closePop="closePop('orderCommonAreaTip')">
				<template slot="popup-con">
					<view class="warm-tip-box" style="padding: 0 30rpx;">
						<view class="warm-tip-item">
							<view class="item-right">
								请选择
								<template v-if="info.product.product == '刑事会见'">
									会见地点
									<text class="red"
										v-if="serviceLocation != '另行协商' && meet_addr">（{{ meet_addr }}）</text>
								</template>
								<template v-else-if="info.product.product == '问一下' || info.product.product == '陪聊'">
									服务地点
									<text class="red"
										v-if="serviceLocation != '另行协商' && forwardLocation">（{{ forwardLocation.poiaddress.match(/.+?(省|市|自治区|自治州|县)/g).toString() }}）</text>
								</template>
								以内的律师，以便为您提供快速高效的服务和减少成本
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
		<!-- 预约地点超出弹出层 -->
		<uni-popup ref="popupOut" type="dialog">
			<uni-popup-dialog type="info" title="温馨提示" okTxt="返回重选" cancleTxt="愿意承担" content="" :before-close="true"
				@confirm="confirmOut" @close="closePop('popupOut');confirm();">
				<view class="warm-tip-box">
					<view class="warm-tip-item">
						<view class="item-right">
							您选择了
							<template v-if="info.product.product == '刑事会见'">
								会见地点
								<text class="red" v-if="serviceLocation != '另行协商' && meet_addr">（{{ meet_addr }}）</text>
							</template>
							<template v-else-if="info.product.product == '问一下' || info.product.product == '陪聊'">
								服务地点
								<text class="red"
									v-if="serviceLocation != '另行协商' && forwardLocation">（{{ forwardLocation.poiaddress.match(/.+?(省|市|自治区|自治州|县)/g).toString() }}）</text>
							</template>
							以外的执业律师，将产生如下事项：
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
	</view>
</template>

<script>
	export default {
		props: {
			serviceDuration: '',
			practiceChoose: '',
			practiceYear: '',
			practiceArea: '',
			info: {},
			forwardLocation: '', //问一下，陪聊 的预约地点
			serviceLocation: '', //问一下，陪聊 的服务地点
			meet_addr: '', //刑事会见，的会见地点
			serviceGrade: '', //管家，服务级别

		},
		data() {
			return {
				choose: '', //挑选方式
				year: '', //执业年限
				area: '', //执业区域
				selectArea: '', //已选择区域
				defaultRegion: ['广东省', '深圳市'],
				showArea: false,
				params: {
					province: true,
					city: true,
					area: false
				}
			};
		},
		created() {
			this.choose = this.practiceChoose;
			this.year = this.practiceYear;
			this.area = this.practiceArea;
			this.selectArea = this.practiceArea;
			if (this.info.product.product == '管家' && this.serviceGrade != '顶级') {
				this.selectArea = '具体区域';
			}
			if (this.area != '全国' && this.area != '执业区域') {
				this.defaultRegion = this.practiceArea.split(',');
				if (this.defaultRegion.length == 1) {
					this.defaultRegion.push('市辖区')
				}
			}
		},
		methods: {
			close() {
				this.$emit('closePop');
			},
			// 切换执业区域
			changeArea() {
				if (this.info.product.product == '问一下' || this.info.product.product == '陪聊' || this.info.product.product ==
					'刑事会见') {
					this.$refs.orderCommonAreaTip.open();
				} else {
					this.showArea = true;
				}
			},
			// 选择地区确定按钮
			regionConfirm(res) {
				if (res.city.label == '市辖区') {
					this.selectArea = res.province.label;
				} else {
					this.selectArea = res.province.label + ',' + res.city.label;
				}
				if (this.practiceArea != '全国' && this.practiceArea != '执业区域' && this.serviceLocation != '另行协商') {
					if (this.info.product.product == '刑事会见' && this.meet_addr != this.selectArea) {
						this.$refs.popupOut.open();
					} else if (this.info.product.product == '问一下' && this.forwardLocation.cityname != this.selectArea) {
						this.$refs.popupOut.open();
					} else if (this.info.product.product == '陪聊' && this.serviceLocation != this.selectArea) {
						this.$refs.popupOut.open();
					} 
					
					// else if (this.info.product.product != '刑事会见' && this.practiceArea != this.selectArea) {
					// 	this.$refs.popupOut.open();
					// }
				}
			},
			//预约地点超出弹出层确定按钮
			confirmOut() {
				this.$refs.popupOut.close();
				this.showArea = true;
			},
			// 确定
			confirm() {
				let obj = {
					choose: this.choose,
					year: this.year
				};
				if (this.selectArea == '全国') {
					obj = {
						...obj,
						area: this.area
					};
				} else {
					obj = {
						...obj,
						area: this.selectArea
					};
				}
				this.$emit('chooseService', obj);
				this.$emit('closePop');
			}
		}
	};
</script>

<style lang="scss">
	.service-title {
		margin-bottom: 20rpx;
		position: relative;
		font-weight: bold;

		&.require::after {
			content: '*';
			position: absolute;
			color: #f00;
			font-weight: normal !important;
			font-size: 30rpx;
		}
	}

	.popup-bottom-box {
		background-color: #ffffff;
		overflow: auto;
		border-top-left-radius: 26rpx;
		border-top-right-radius: 26rpx;

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

			.service-list {
				margin-bottom: 20rpx;
			}
		}
	}

	.od-box {
		margin: 0;
		padding: 0;
	}
</style>
