<template>
	<view class="content">
		<view class="od-box paddingbottom0">
			<view class="od-item">
				<view class="item-tip font-15" style="line-height: 30px;">付款人</view>
				<view class="item-right">
					<view class="item-txt font-15" style="margin-left: 32px;">投资人</view>
				</view>
			</view>
			<view class="od-item" style="margin-top: 19px;">
				<view class="item-tip require font-15">申请事项</view>
				<view class="item-right">
					<view class="why-box">
						<checkbox-group @change="resultChange">
							<view class="flex flex-horizontal">
								<label>
									<view class="why-checkbox">
										<view class="checkbox-left">
											<image v-if="result.indexOf('checkValue1') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
											<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
											<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue1" checked="" />
										</view>
									</view>
								</label>
								<view class="checkbox-right">
									<view class="flex flex-vertical">
										<view class="flex flex-horizontal flex-center-v">
											<text class="font-15">案件受理费</text>
											<text style="margin-left: 10px;">￥</text>
											<view class="" style="border-bottom: 1px solid #000000;width: 70px;">
												<input class="why-ipt" pattern="[0-9]*" type="number" :disabled="result.indexOf('checkValue1') == -1" v-model="case_money" placeholder="请输入"  placeholder-class="placeholder" />
											</view>
										</view>
										<view class="flex flex-horizontal flex-center-v" style="margin-top: 7.5px;">
											<text>缴纳截止日</text>
											<image src="@/static/img/icon/calendar.png" mode="aspectFit" style="width: 15px;height: 15px;margin-left: 10px;"></image>
											<input class="why-ipt" style="margin-left: 5px;width: 120px;" type="text" v-model="case_time" placeholder="请选择" disabled="" @click="jump('/pages/lawyer/user/dead-date')" />
										</view>
										<text  style="margin-top: 7.5px;">案件受理费缴纳通知书 <text style="color: red;">*</text></text>
										<upload-add-list :list="case_list" @change="listChange($event,'case_list')" @click="photoType = 'case_list'"></upload-add-list>
										<!-- <upload-add-list :list="case_list" @change="caseList"></upload-add-list> -->
										
										<!-- <image @click="jump('/pages/client/order/upload', { source: JSON.stringify(source) })" src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;margin-top: 10px;"></image> -->
									</view>
								</view>
							</view>
							<view class="flex flex-horizontal" style="margin-top: 10px;">
								<label>
									<view class="why-checkbox">
										<view class="checkbox-left">
											<image v-if="result.indexOf('checkValue2') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
											<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
											<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue2" checked="" />
										</view>
									</view>
								</label>
								<view class="flex flex-vertical flex-1">
									<view class="flex flex-horizontal flex-center-v">
										<text class="font-15">公告费</text>
										<text style="margin-left: 10px;">￥</text>
										<view class="" style="border-bottom: 1px solid #000000;width: 70px;">
											<input class="why-ipt" type="number" pattern="[0-9]*" :disabled="result.indexOf('checkValue2') == -1" v-model="announce_money" placeholder="请输入" placeholder-class="placeholder" />
										</view>
									</view>
									<text style="margin-top: 7.5px;">公告费缴费通知书 <text style="color: red;">*</text></text>
									<upload-add-list key="announce_list" :list="announce_list" @change="listChange($event,'announce_list')" @click="photoType = 'announce_list'"></upload-add-list>
									<!-- <image @click="jump('/pages/client/order/upload')" src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;margin-top: 10px;"></image> -->
								</view>
							</view>
							<view class="flex flex-horizontal" style="margin-top: 10px;">
								<label>
									<view class="why-checkbox">
										<view class="checkbox-left">
											<image v-if="result.indexOf('checkValue3') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
											<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
											<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue3" checked="" />
										</view>
									</view>
								</label>
								<view class="flex flex-vertical flex-1">
									<view class="flex flex-horizontal flex-center-v">
										<text class="font-15">异地被告身份查询费</text>
										<text style="margin-left: 10px;">￥</text>
										<view class="" style="border-bottom: 1px solid #000000;width: 70px;">
											<input class="why-ipt" type="number" pattern="[0-9]*" :disabled="result.indexOf('checkValue3') == -1" v-model="enquire" placeholder="限额600元" placeholder-class="placeholder" />
										</view>
									</view>
								</view>
							</view>
							<view class="flex flex-horizontal" style="margin-top: 10px;" v-if="apply_lawyer == 0">
								<label >
									<view class="why-checkbox">
										<view class="checkbox-left">
											<image v-if="result.indexOf('checkValue4') == -1" class="check-img" src="@/static/img/icon/icon_check.png" mode="aspectFit"></image>
											<image v-else class="check-img" src="@/static/img/icon/icon_checked.png"  mode="aspectFit"></image>
											<checkbox color="#FFC801" style="transform: scale(0.7);display: none;" value="checkValue4"  checked="" />
										</view>
									</view>
								</label>
								<view class="checkbox-right flex-1">
									<view class="flex flex-vertical">
										<view class="flex flex-horizontal flex-center-v">
											<text class="font-15">律师费</text>
											<text style="margin-left: 10px;">￥</text>
											<view class="" style="width: 70px;">
												<input class="why-ipt" type="number" pattern="[0-9]*" v-model="lawyer" placeholder="请输入" disabled="" placeholder-class="placeholder" />
											</view>
										</view>
									</view>
									<view class="checkbox-item">
										<view class="why-txt">委托代理合同 <text style="color: red;">*</text></view>
										<upload-add-list key="contract_list" :list="contract_list" @change="listChange($event,'contract_list')" @click="photoType = 'contract_list'"></upload-add-list>
										<!-- <view class="arrow-right"   @click="addPhoto(3)">
											<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;"></image>
											<!-- <input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" /> -->
											<!-- <image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image> -->
										<!-- </view> -->
									</view>
									<view class="checkbox-item">
										<view class="why-txt">委托人主体资料 <text style="color: red;">*</text></view>
										<upload-add-list key="main_list" :list="main_list" @change="listChange($event,'main_list')"  @click="photoType = 'main_list'"></upload-add-list>
										
										<!-- <view class="arrow-right"   @click="addPhoto(4)">
											<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;"></image>
											<!-- <input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" /> -->
											<!-- <image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image> -->
										<!-- </view> -->
									</view>
									<view class="checkbox-item">
										<view class="why-txt">起诉状（委托人已签章） <text style="color: red;">*</text></view>
										<upload-add-list key="indictment_list" :list="indictment_list" @change="listChange($event,'indictment_list')" @click="photoType = 'indictment_list'"></upload-add-list>
										
										<!-- <view class="arrow-right"   @click="addPhoto(5)">
											<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;"></image>
											<!-- <input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" /> -->
											<!-- <image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image> -->
										<!-- </view> -->
									</view>
									<view class="checkbox-item">
										<view class="why-txt">立案受理通知书 <text style="color: red;">*</text></view>
										<upload-add-list key="note_list" :list="note_list" @change="listChange($event,'note_list')" @click="photoType = 'note_list'"></upload-add-list>
										
										<!-- <view class="arrow-right"   @click="addPhoto(6)">
											<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 80px;height: 80px;"></image>
											<!-- <input class="why-ipt flex1" type="text" placeholder="请上传资料" disabled="" placeholder-class="placeholder" /> -->
											<!-- <image class="arrow-img" src="@/static/img/right.png" mode="aspectFit"></image> -->
										<!-- </view> --> 
									</view>
								</view>
							</view>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
		<view class="ok-box fixed"><button type="default" class="ok-btn" @click="confirm">我要申请</button></view>
		<!-- 超出5000弹出层 -->
		<uni-popup ref="popupOver5000" type="dialog">
			<uni-popup-dialog
				type="info"
				okTxt="现在协商"
				cancleTxt="已协商好"
				content=""
				:before-close="true"
				@confirm="
					closePop('popupOver5000');
					$refs.popupTel.open();
				"
				@close="
					closePop('popupOver5000');
					addInfo();
				"
			>
				<view class="">
					本案累计申请金额已超过
					<text class="red">5000</text>
					元， 需要投资人审批，请先与投资人协 商一致。
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
	// import { orderUpload } from '@/components/order-upload/order-upload.vue'
	
export default {
	data() {
		return {
			order_id: '',
			case_money: '',
			case_time: '',
			case: [],
			announce_money: '',
			announce: [],
			source:[],
			enquire: '',
			lawyer: '1500',
			contract: [],
			case_list:[],
			announce_list: [],
			contract_list: [],
			main_list: [],
			indictment_list: [],
			note_list: [],
			main: [],
			indictment: [],
			note: [],
			addType: 1,
			result: ['checkValue1',
			'checkValue2',
			'checkValue3',
			'checkValue4'
			],
			photoType: 'case_list',
			investor_mobile: '',
			apply_lawyer: 0 //是否申请投资费用1申请  0未申请过律师费
		};
	},
	onLoad(params) {
		if (params.order_id) {
			this.order_id = params.order_id;
		}
		if (params.investor_mobile) {
			this.investor_mobile = params.investor_mobile;
		}
		if (params.apply_lawyer) {
			this.apply_lawyer = Number(params.apply_lawyer);
		}
		window.fileOk = this.fileOk;
		window.photoOk = this.photoOk;
	},
	methods: {
		fileOk(res) {
			console.log('fileOk',res);
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
			this[this.photoType].concat(tempList)
			uni.hideLoading()
		},
		//接收图片
		photoOk(res) {
			console.log('photoOk',res);
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
			this[this.photoType].concat(tempList)
			uni.hideLoading()
		},
		caseList(e) {
			this.case_list = e
		},
		listChange(e,type) {
			this[type] = e
		},
		onDatetimeChange(e){
			this.case_time = e
		},
		resultChange(e) {
			this.result = e.detail.value;
		},
		getUrlParams(list) {
			let newArr = []
			list.filter(e=>{
				newArr.push(e.url)
			})
			return newArr.join(',')
		},
		async confirm() {
			
			if (this.result.length == 0) {
				uni.showToast({
					title: '请选择申请事项',
					icon: 'none'
				})
				return;
			}
			
			let sum = Number(this.case_money) + Number(this.announce_money) + Number(this.enquire) + Number(this.lawyer);
			if (sum > 5000) {
				this.$refs.popupOver5000.open();
				return;
			}
			if (sum < 0.01) {
				uni.showToast({
					title: '申请投资费用需大于0',
					icon: 'none'
				})
				return;
			}
			if (this.result.indexOf('checkValue1') != -1) {
				if (this.case_list.length <= 0) {
					uni.showToast({
						title: '案件受理费缴纳通知书为必填项',
						icon: 'none'
					})
					return;
				}
			}
			
			if (this.result.indexOf('checkValue2') != -1) {
				if (this.announce_list.length <= 0) {
					uni.showToast({
						title: '公告费缴费通知书为必填项',
						icon: 'none'
					})
					return;
				}
			}
			
			if (this.apply_lawyer == 0) {
				if (this.result.indexOf('checkValue4') != -1) {
					if (this.contract_list.length <= 0) {
						uni.showToast({
							title: '委托代理合同为必填项',
							icon: 'none'
						})
						return;
					}
					
					if (this.main_list.length <= 0) {
						uni.showToast({
							title: '委托人主体资料为必填项',
							icon: 'none'
						})
						return;
					}
					
					if (this.indictment_list.length <= 0) {
						uni.showToast({
							title: '起诉状（委托人已签章）为必填项',
							icon: 'none'
						})
						return;
					}
					
					if (this.note_list.length <= 0) {
						uni.showToast({
							title: '立案受理通知书为必填项',
							icon: 'none'
						})
						return;
					}
				}
			}
			
			this.addInfo();
		},
		async addInfo() {
			let formData = {
				id: this.order_id,
				token: uni.getStorageSync('token'),
				case_money:Number(this.case_money),
				case_time: this.case_time,
				announce_money: Number(this.announce_money),
				announce: this.getUrlParams(this.announce_list),
				enquire: Number(this.enquire),	
				case: this.getUrlParams(this.case_list),
				contract: this.getUrlParams(this.contract_list),
				main: this.getUrlParams(this.main_list),
				indictment: this.getUrlParams(this.indictment_list),
				note: this.getUrlParams(this.note_list),
			};
			
			if (this.apply_lawyer == 0 && this.result.indexOf('checkValue4') != -1) {
				formData.lawyer =  Number(this.lawyer)
			}

			let res = await this.$api('index.lawyer_apply', formData);
			if (res.code == 1) {
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.init();
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
};
</script>


<style lang="scss">
	.check-img {
		width: 15px;
		height: 15px;
		margin-left: 7.5px;
		margin-top:4px;
	}
	.why-txt {
		margin-top: 7.5px;
	}
.content {
	padding-bottom: 150rpx;
}
.result-ipt {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.why-box {
	background-color: #ffffff;
	border-radius: 26rpx;
	margin-bottom: 20rpx;
	.why-title {
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	.why-checkbox {
		padding-bottom: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.checkbox-left {
			width: 60rpx;
		}
		.checkbox-right {
			width: calc(100% - 60rpx);
			.checkbox-item {
				display: flex;
				margin-bottom: 20rpx;
				flex-wrap: wrap;
			}
			.why-ipt-box {
				flex: 1;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				vertical-align: bottom;
				margin-left: 20rpx;
				padding-bottom: 4rpx;
			}
		}
	}
}
.arrow-right {
	margin-top: 10rpx;
	width: 100%;
	border-bottom: none;
	display: flex;
	.arrow-img {
		margin-top: 10rpx;
		width: 26rpx;
		height: 26rpx;
	}
}
</style>
