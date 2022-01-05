<template>
	<view class="legalAffairs">
		<u-navbar
			:custom-back="goBack"
			:titleBold="true"
			title="认证法务专员"
			:background="{ background: '#fff' }"
			title-color="#222"
			back-icon-color="#222"
			z-index="99999"
		></u-navbar>
		<view class="fawu-top">
			<view class="fawu-name">
				<text class="name">头像</text>
				<view class="dot">*</view>
			</view>
			<view class="fawu-img">
				<view class="imgs"  v-if="isDis == false">
					<template v-if="system == 'android'">
						<view  class="slot-btn"  @click="uploadPopup(1)">
							<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' || form.avatar == undefined"></u-image>
							<image style="width:100rpx;height:100rpx;border-radius: 10rpx;" width="100rpx" height="100rpx" :src="form.avatar" v-else></image>
						</view>
						</template>
						<template v-else>
							<u-upload
								ref="uUpload"
								:action="action"
								:custom-btn="true"
								:max-count="1"
								width="100"
								height="100"
								:auto-upload="false"
								on-oversize="onOversize"
								@on-uploaded="onSuccess"
								@on-choose-complete="getIm()"
								@on-remove="onRemove()"
								index="card_img_three"
								image-mode="aspectFill"
							>
								<view slot="addBtn" class="slot-btn"  hover-class="slot-btn__hover" hover-stay-time="150">
									<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' || form.avatar == undefined"></u-image>
									<image style="width:100rpx;height:100rpx;border-radius: 10rpx;" width="100rpx" height="100rpx" :src="form.avatar +'?x-oss-process=image/resize,m_lfit,w_200,h_200'" v-else></image>
								</view>
							</u-upload>
						</template>
					
				</view>
				<view class="imgs" v-else>
					<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' || form.avatar == undefined"></u-image>
						<u-image width="100rpx" height="100rpx" :src="form.avatar" v-else></u-image>
					</view>
				</view>
			</view>
		</view>
		<u-form :model="form" ref="uForm">
			<view class="fawu-line">
				<view class="fawu-item">
					<u-form-item label="执业律所" prop="name" label-width="130" :required="true">
						<u-input :disabled="isDis" style="margin-left: 60rpx;" :clearable="false" v-model="form.name" placeholder="请输入执业律所" @input="getForm()" />
					</u-form-item>
				</view>
				<view class="fawu-item">
					<u-form-item label="资格证号" prop="num" label-width="130" :required="true">
						<u-input
							:disabled="isDis"
							style="margin-left: 60rpx;"
							:clearable="false"
							v-model="form.num"
							type="number"
							@input="getForm()"
							placeholder="请输入资格证号"
						/>
					</u-form-item>
				</view>
				<view class="fawu-item">
					<u-form-item label="资格证书" prop="certificate" label-width="130" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 60rpx;"
							v-model="form.cert_image == '' || form.cert_image == undefined ? '' : '已上传'"
							@click="uploadCer"
							disabled
							placeholder="点击上传资格证书"
						/>
					</u-form-item>
				</view>
				<view class="fawu-item">
					<u-form-item label="身份证件" prop="idcard" label-width="130" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 60rpx;"
							v-model="form.card_image == '' || form.card_image == undefined ? '' : '已上传'"
							@click="upIdcard"
							disabled
							placeholder="点击上传身份证件"
						/>
					</u-form-item>
				</view>
				<!-- <view class="pact">
					<u-checkbox-group>
						<u-checkbox v-model="form.checked" :disabled="isDis" @change="pactCheck" shape="circle"><view class="tips">已阅读并同意履行</view></u-checkbox>
					</u-checkbox-group>
					<view class="pact-tip" @click="goXieyi(2)">《服务商合作协议-法务》</view>
				</view> -->
				<view class="pact">
					<u-checkbox-group>
						<u-checkbox v-model="form.checked" :disabled="isDis" activeColor="#278A00" @change="pactCheck" shape="circle"><view class="tips">已阅读并同意履行</view></u-checkbox>
					</u-checkbox-group>
					<view class="pact-tip" @click="goXieyi(2)">《服务商合作协议-法务》</view>
				</view>
			</view>
		</u-form>
		<!-- 加号弹出层 -->
		<uni-popup ref="popupAdd" type="bottom">
			<order-popup-common-bottom title="" @closePop="closePop('popupAdd')">
				<view class="popup-con" slot="popup-con">
					<view class="choose-box flex">
						<view class="choose-item flex1" @click="camera">
							<view class="image-wrapper">
								<image src="@/static/img/upload-camara.png" mode="aspectFit"></image>
							</view>
							拍照
						</view>
						<view class="choose-item flex1" @click="pickPhoto">
							<view class="image-wrapper">
								<image src="@/static/img/upload-image.png" mode="aspectFit"></image>
							</view>
							相册
						</view>
						<!-- <view class="choose-item flex1" @click="pickFile" v-show="isShowUpFile">
							<view class="image-wrapper"><image src="@/static/img/upload-file.png" mode="aspectFit"></image></view>
							文件
						</view> -->
					</view>
				</view>
			</order-popup-common-bottom>
		</uni-popup>
		<view class="btn"><u-button :custom-style="customStyle" @click="save" v-if="isDis == false">提交审核</u-button></view>
		<u-picker v-model="timeshow" mode="time" @confirm="timeconfirm"></u-picker>
		<u-picker mode="region" v-model="areashow" :params="areaparams" @confirm="areaConfirm"></u-picker>
		<!-- <u-select v-model="tcshow" :list="tclist" @confirm="specalConfirm"></u-select> -->
		<!-- <u-toast ref="uToast" /> -->
		<multiple-select v-model="tcshow" :data="tclist" @confirm="specalConfirm"></multiple-select>

		<!-- 审核中 -->
		<u-modal v-model="modal1" :show-confirm-button="false">
			<view class="model-content">
				<view class="model-img"><u-image width="160rpx" height="160rpx" :src="model.img" mode="aspectFit"></u-image></view>
				<view class="model-text">
					<text>{{ model.text1 }}</text>
					<text>{{ model.text2 }}</text>
				</view>
			</view>
			<view class="model-btn" v-if="check_state == 1"><u-button :custom-style="customStyle" shape="circle" @click="back">我知道了</u-button></view>
			<view class="model-btn" v-if="check_state == 3">
				<u-button :custom-style="customStyle" shape="circle" @click="agin">重新认证</u-button>
				<!-- <u-button v-else :custom-style="customStyle" shape="circle" @click="back">我知道了</u-button> -->
			</view>
			<view class="model-btn" v-if="check_state == 5" style="display: flex;">
				<u-button style="width: 40%;" :custom-style="customStyle" shape="circle" @click="sure">确认信息</u-button>
				<u-button style="width: 40%;background-color: #FFFFFF;color: #e02e34;border: #e02e34 1px solid;" :custom-style="customStyle" shape="circle" @click="modal1 = false">
					返回修改
				</u-button>
			</view>
		</u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { API_URL } from '@/env';
import multipleSelect from '@/components/momo-multipleSelect/momo-multipleSelect';
export default {
	components: {
		multipleSelect
	},
	data() {
		return {
			userid:'',
			modal1: false,
			customStyle: {
				'background-color': '#e02e24',
				color: '#fff',
				'margin-bottom': '20rpx',
				width: '90%'
			},
			model: {
				img: require('@/static/img/z7.png'),
				text1: '1已提交申请，请等待平台审核',
				text2: '感谢您的新人与支持'
			},
			timeshow: false,
			action: API_URL + '/api/common/upload',
			form: {
				cert1_image: '',
				cardface_image: '',
				avatar: '',
				name: '',
				num: '',
				cert_image: '',
				card_image: '',
				checked: false
			},
			areashow: false,
			tcshow: false,
			areaparams: {
				province: true,
				city: true,
				area: false
			},
			tclist: [],
			check_state: 0,
			rules: {
				name: [
					{
						required: true,
						message: '请输入执业律所',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				num: [
					{
						required: true,
						message: '请输入律师证号',
						trigger: ['change', 'blur']
					}
				],
				time: [
					{
						required: true,
						message: '请选择执业时间',
						trigger: ['change', 'blur']
					}
				],
				address: [
					{
						required: true,
						message: '请选择执业区域',
						trigger: ['change', 'blur']
					}
				],
				specal: [
					{
						required: true,
						message: '请选择业务专长',
						trigger: ['change', 'blur']
					}
				],
				cert1_image: [
					{
						required: true,
						message: '请上传律师证书',
						trigger: ['change', 'blur']
					}
				],
				cardface_image: [
					{
						required: true,
						message: '请上传身份证件',
						trigger: ['change', 'blur']
					}
				]
			},
			certifi: '',
			xieyiurl: '',
			isDis: false,
			readOnly: false,
			isShowUpFile: true, //IOS 不能上传文件，不显示此按钮
			thisphoto: null, //当前上传的是第几个图片
			system:getApp().globalData.system
		};
	},

	onLoad(e) {
		this.yewu(), this.xieyi();
		this.fawudetail();
		console.log("omload")
		console.log(this.form)
	},
	created() {
		this.isShow = true;
		window.fileOk = this.fileOk;
		window.photoOk = this.photoOk;
		window.sourceOk = this.sourceOk;
	},
	onShow() {
		let userinfo = uni.getStorageSync('userInfo');
		this.userid = userinfo.id;
		if (this.isShow) {
			console.log(this.isShow);
			if (uni.getStorageSync('fawuFrom'+this.userid)) {
				console.log('aaa');
				var data = uni.getStorageSync('fawuFrom'+this.userid);
				this.form = data;
			}
		}
	},
	methods: {
		getForm() {
			uni.setStorageSync('fawuFrom'+this.userid, this.form);
		},
		goXieyi(type) {
			uni.navigateTo({
				url: '../xieyi/xieyi?type=' + type
			});
		},
		goBack() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		getState() {},
		getIm() {
			this.$refs.uUpload.upload();
		},
		picktime() {
			this.timeshow = true;
		},

		//跳转上传律师证书
		uploadCer() {
			uni.navigateTo({
				url: '/pages/service/legalAffairs/upload-legalAffairs'
			});
		},
		//跳转上传身份证件
		upIdcard() {
			uni.navigateTo({
				url: '/pages/service/legalAffairs/upload-idcard'
			});
		},
		agin() {
			this.modal1 = false;
		},
		back() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		yewu() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.yewu', params).then(res => {
				console.log(res);
				if (res.code == 1) {
					let arr = res.data.map(res => {
						return {
							value: res.id,
							label: res.area_name
						};
					});
					this.tclist = arr;
				}
			});
		},
		xieyi() {
			// let params = {
			// 	token: uni.getStorageSync('token')
			// };
			// this.$api('index.xieyi', params).then(res => {
			// 	this.xieyiurl = res.data.lvshi;
			// });
		},
		// 协议点击
		pactCheck(e) {
			console.log(e)
		this.form.checked = e.value;
		uni.setStorageSync('fawuFrom'+this.userid, this.form);
			
		},
		// 认证状态
		fawudetail() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.fawudetail', params).then(res => {
				//重置填写的数据
				//保存过信息取接口数据
				if (res.data != '' && res.data.code != null) {
					if (res.data.is_six == 2) {
						this.isDis = true;
					}
					this.form.avatar = res.data.lawyer_avatar;
					this.form.name = res.data.lawyer;
					this.form.num = res.data.code;
					this.form.cardface_image = res.data.cardface_image;
					this.form.cardback_image = res.data.cardback_image;
					this.form.cert1_image = res.data.cert1_image;
					this.form.cert2_image = res.data.cert2_image;
					this.form.cert_image = '已上传';
					this.form.card_image = '已上传';
					this.form.checked = true;
					uni.setStorageSync('fawuFrom'+this.userid, this.form);
				} else {

					uni.setStorageSync('fawuFrom'+this.userid,{});
					
					//填写的。未保存的数据
					// if (uni.getStorageSync('fawuFrom')) {
					// 	this.form = uni.getStorageSync('fawuFrom');
					// }
				}
			});
		},
		//移除图片
		onRemove() {
			var lawyerData = uni.getStorageSync('lawyerFrom'+this.userid);
				this.form.avatar = '';
				uni.setStorageSync('lawyerFrom'+this.userid, this.form);
			
		},
		sure() {
			if (uni.getStorageSync('fawuFrom'+this.userid)) {
				this.form = uni.getStorageSync('fawuFrom'+this.userid);
			}
			let formData = {
				token: uni.getStorageSync('token'),
				lawyer_avatar: this.form.avatar,
				lawyer: this.form.name,
				code: this.form.num,
				cardface_image: this.form.cardface_image,
				cardback_image: this.form.cardback_image,
				cert1_image: this.form.cert1_image,
				cert2_image: this.form.cert2_image
			};
			this.$api('index.fawu', formData).then(res => {
				if (res.code == 1) {
					// uni.setStorageSync('fawuFrom', {});
					this.model = true;
					this.model = {
						img: require('@/static/img/z7.png'),
						text1: '已提交申请，请等待平台审核',
						text2: '感谢您的信任与支持'
					};
					this.check_state = 1;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		// 保存
		save() {
			if (!this.form.checked) {
				uni.showToast({
					title: '请先同意用户协议',
					duration: 1000,
					icon: 'none'
				});
			} else {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						console.log(this.form);
						console.log(this.form.avatar);
						if (this.form.avatar == '' || this.form.avatar == undefined) {
							uni.showToast({
								title: '请上传头像',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.name == '' || this.form.name == undefined) {
							uni.showToast({
								title: '请填写执业律所',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.num == '' || this.form.num == undefined) {
							uni.showToast({
								title: '请填写资格证号',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.cert1_image == '' || this.form.cert1_image == undefined) {
							uni.showToast({
								title: '请上传资格证书',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.cardface_image == '' || this.form.cardface_image == undefined) {
							uni.showToast({
								title: '请上传身份证件',
								duration: 1000,
								icon: 'none'
							});
						} else {
							this.check_state = 5;
							this.modal1 = true;
							this.model = {
								img: require('@/static/img/z7.png'),
								text1: '通过认证后,间隔六个月以上',
								text2: '才能再次修改认证信息哟~'
							};
						}
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		onSuccess(data, index, lists, name) {
			uni.showLoading({
				title: '上传图片中'
			});
			let avatar = data.map(res => res.response.data)[0].url;
			this.form.avatar = avatar;
			this.getForm();
			uni.hideLoading();
		},
		// ------------------------------------------------
		uploadPopup(e) {
			console.log(e);
			this.thisphoto = e
			// this.form.avatar  = 'https://oss.bigchun.com/fali/uploads/20211203/24409be2f6d8b663d8f37ba50417cd59.jpg'
			this.$refs.popupAdd.open()
		},
		//接收文件
		fileOk(res) {
			let tempList = [];
			res.forEach((item, index) => {
				tempList.push(JSON.parse(item));
			});
			this.source = this.source.concat(tempList);
		},
		//接收图片
		photoOk(res) {
			let that = this
			if(res=='nothing'){
				uni.hideLoading()
				return;
			}
			
			// uni.showToast({
			// 	title: '上传完成',
			// 	duration: 1000,
			// 	icon: 'none'
			// });
			console.log('that.form');
			console.log(that.form);
			console.log('that.form.avatar');
			console.log(that.form.avatar);
			that.form.avatar  = JSON.parse(res).url
			if(that.form.avatar!=''){
					uni.hideLoading()
			}
			that.getForm();
			if (uni.getStorageSync('fawuFrom'+this.userid)) {
				console.log('aaa');
				var data = uni.getStorageSync('fawuFrom'+this.userid);
				this.form = data;
			}
			console.log({avatar:that.form.avatar});
			console.log( JSON.parse(res).url)
		
		},
		// 打开摄像头
		camera() {
			const nav = navigator.userAgent;
			
			this.closePop('popupAdd')
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				uni.showLoading({
					title:'上传中'
				})
				phone.camera();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('camera', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
		//选择照片
		pickPhoto() {
			
			this.closePop('popupAdd')
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickPhoto('1');
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickPhoto', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
		// 选择文件
		pickFile() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.pickFile(1);
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('pickFile', 1, data => {
					let tempList = this.trimSpace(data);
					this.source = this.source.concat(tempList);
				});
			}
		},
	}
};
</script>

<style lang="scss">
.u-form-item--left__content--required {
	right: 0 !important;
}
.fawu-top {
	display: flex;
	height: 140rpx;
	justify-content: space-between;
	padding: 0 20rpx;
	align-items: center;

	.fawu-name {
		font-size: 32rpx;
		display: flex;
		align-items: center;

		.name {
			font-size: 30rpx;
		}

		.dot {
			color: red;
			height: 40rpx;
			font-size: 30rpx;
			padding-left: 10rpx;
		}
	}

	.fawu-img {
		.imgs {
			width: 500rpx;
			height: 100rpx;
			border-radius: 100rpx;
			display: flex;
			justify-content: flex-end;
			.slot-btn {
				width: 500rpx;
				display: flex;
				justify-content: flex-end;
			}
			// background-color: red;
		}
	}
}

.fawu-item {
	width: 100%;
	height: 100rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;

	.item-left {
		display: flex;
		align-items: center;
		width: 220rpx;

		.dot {
			color: red;
			height: 40rpx;
			font-size: 40rpx;
			padding-left: 10rpx;
		}
	}

	.item-center {
		flex: 1;
	}

	.item-right {
		justify-content: flex-end;
	}
}

.pact {
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	height: 100rpx;

	.tips {
		width: 100%;
		display: flex;
	}

	.pact-tip {
		color: blue;
	}
}

.btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
}
.model-content {
	width: 100%;
	height: 320rpx;
	.model-img {
		width: 100%;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.model-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 34rpx;
		font-weight: 700;
	}
}
.model-btn {
	width: 80%;
	height: 120rpx;
	margin-left: 10%;
	margin-bottom: 20rpx;
}
.choose-box {
		padding: 0 30rpx;
	
	.choose-item {
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			text-align: center;

			.image-wrapper {
				margin: auto;
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
