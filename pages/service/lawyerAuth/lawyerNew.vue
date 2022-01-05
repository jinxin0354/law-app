<template>
	<view class="lawyerAuth">
		<u-navbar
			:custom-back="goBack"
			title="认证律师"
			:titleBold="true"
			:background="{ background: '#fff' }"
			title-color="#222222"
			back-icon-color="#222222"
			z-index="99999"
		></u-navbar>
		<view class="lawyer-top">
			<view class="lawyer-name">
				<text class="name">头像</text>
				<view class="dot">*</view>
			</view>
			<view class="lawyer-img">
				<view class="imgs" v-if="isDis == false">
					<template v-if="system == 'android'"   >
						<view  class="slot-btn" style="width: 500rpx;" @click="uploadPopup(1)">
							<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' "></u-image>
							<image style="width:100rpx;height:100rpx;border-radius: 10rpx;" width="100rpx" height="100rpx" :src="form.avatar+'?x-oss-process=image/resize,m_lfit,w_200,h_200'" v-else>
							
							</image>
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
							@on-choose-complete="getIm"
							 @on-remove="onRemove()"
							index="card_img_three"
							image-mode="aspectFill"
						>
							<view slot="addBtn" class="slot-btn"  hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' "></u-image>
								<u-image  width="100rpx" height="100rpx" :src="form.avatar +'?x-oss-process=image/resize,m_lfit,w_200,h_200'" v-else></u-image>
							</view>
						</u-upload>
					</template>
					
					
				</view>
				<view class="imgs" v-else>
					<view class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-image width="100rpx" height="100rpx" src="../../../static/img/header-primary.png" v-if="form.avatar == '' "></u-image>
						<u-image  width="100rpx" height="100rpx" :src="form.avatar " v-else></u-image>
					</view> 
				</view>
			</view>
		</view>
		<u-form :model="form" ref="uForm" style="margin-left: 30rpx;">
			<view class="lawyer-line">
				<view class="lawyer-item">
					<u-form-item label="执业律所" prop="name" label-width="136" :required="true">
						<u-input :clearable="false" style="margin-left: 94rpx;" :disabled="isDis" v-model="form.name" placeholder="请输入执业律所" @input="getForm()" />
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="律师证号" prop="num" label-width="136" :required="true">
						<u-input
							:disabled="isDis"
							style="margin-left: 94rpx;"
							v-model="form.num"
							:clearable="false"
							type="number"
							placeholder="请输入律师证号"
							@input="getForm()"
						/>
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="执业开始时间" prop="time" label-width="190" :required="true" right-icon="arrow-right">
						<u-input v-if="isDis" v-model="form.time" style="width:440rpx;margin-left: 40rpx;" disabled placeholder="点击选择执业开始时间" />
						<u-input v-else v-model="form.time" style="width:440rpx;margin-left: 40rpx;" @click="picktime" disabled placeholder="点击选择执业开始时间" />
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="执业区域" prop="area" label-width="136" :required="true" right-icon="arrow-right">
						<u-input v-if="isDis" style="width:440rpx;margin-left: 94rpx;" v-model="form.address" disabled placeholder="点击选择执业区域" />
						<u-input v-else style="width:440rpx;margin-left: 94rpx;" v-model="form.address" @click="areaPicker" disabled placeholder="点击选择执业区域" />
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="业务专长" prop="specal" label-width="136" :required="true" right-icon="arrow-right">
						<u-input v-if="isDis" style="width:440rpx;margin-left: 94rpx;" v-model="form.specal" disabled placeholder="点击选择业务专长" />
						<u-input v-else style="width:440rpx;margin-left: 94rpx;" @click="open()" v-model="form.specal" disabled placeholder="点击选择业务专长" />
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="律师证书" prop="certificate" label-width="136" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 94rpx;"
							v-model="form.cert_image == '' || form.cert_image == undefined ? '' : '已上传'"
							disabled
							@click="uploadCer"
							placeholder="点击上传律师证书"
						/>
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="身份证件" prop="idcard" label-width="136" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 94rpx;"
							v-model="form.card_image == '' || form.card_image == undefined ? '' : '已上传'"
							@click="upIdcard"
							disabled
							placeholder="点击上传身份证件"
						/>
					</u-form-item>
				</view>
				<view class="pact">
					<u-checkbox-group>
						<u-checkbox v-model="form.checked" :disabled="isDis" activeColor="#278A00" @change="pactCheck" shape="circle">
							<view class="tips">已阅读并同意履行</view>
						</u-checkbox>
					</u-checkbox-group>
					<view class="pact-tip" @click="goXieyi(1)">《服务商合作协议-律师》</view>
				</view>
			</view>
		</u-form>
		<view class="btn"><u-button v-if="isDis == false" :custom-style="customStyle" @click="save">提交审核</u-button></view>
		<u-picker v-model="timeshow" mode="time" @confirm="timeconfirm"></u-picker>
		<u-picker mode="region" v-model="areashow" :params="areaparams" @confirm="areaConfirm"></u-picker>
		<!-- <u-select v-model="tcshow" :list="tclist" @confirm="specalConfirm"></u-select> -->
		<!-- <u-toast ref="uToast" /> -->
		<!-- <multiple-select v-model="tcshow" :msg.sync="msg" :data="tclist" :default-selected="defaultSelected" @confirm="specalConfirm"></multiple-select> -->
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
			<view class="model-btn" v-if="check_state == 3"><u-button :custom-style="customStyle" shape="circle" @click="agin">重新认证</u-button></view>
			<view class="model-btn" v-if="check_state == 5" style="display: flex;">
				<u-button style="width: 40%;" :custom-style="customStyle" shape="circle" @click="sure">确认信息</u-button>
				<u-button style="width: 40%;background-color: #FFFFFF;color: #e02e34;border: #e02e34 1px solid;" :custom-style="customStyle" shape="circle" @click="modal1 = false">
					返回修改
				</u-button>
			</view>
		</u-modal>
		<!--业务专长弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view class="item-pop">
				<view class="item-top">
					<view class="item-left" @click="cancel()">取消</view>
					<view class="item-right" @click="sureYe()">确定</view>
				</view>
				<scroll-view class="" style="height: 400rpx;" scroll-y="true">
					<view class="item-txt" :class="[yeId.indexOf(item.value) != -1 ? 'item-color' : '']" v-for="(item, index) in tclist" :key="index" @click="specalConfirm(item.value, item.label)">
						{{ item.label }}
					</view>
				</scroll-view>
			</view>
		</uni-popup>
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
	</view>
</template>

<script>
import { API_URL } from '@/env';
import multipleSelect from '@/components/momo-multipleSelect/momo-multipleSelect';
import { mapState, mapGetters, mapActions } from 'vuex';
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
				color: '#fff'
			},
			model: {
				img: require('@/static/img/z7.png'),
				text1: '已提交申请，请等待平台审核',
				text2: '感谢您的新人与支持'
			},
			timeshow: false,
			action: API_URL + '/api/common/upload',
			form: {
				cert1_image: '',
				cardface_image: '',
				avatar: '',
				cert_image: '',
				card_image: '',
				checked: false,
				specal:'',
				area:''
			},
			isDis: false,
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
			isShow: false,
			defaultSelected: [], //默认选中项
			msg: 'false', //超过三个置空
			yeArr: [], //业务专长文字
			yeId: [] ,//业务专长id
			readOnly: false,
			isShowUpFile: true, //IOS 不能上传文件，不显示此按钮
			thisphoto: null, //当前上传的是第几个图片
			system:getApp().globalData.system
		};
	},
	computed: {
		...mapGetters(['lawyerCert'])
	},

	beforeDestroy() {
		console.log('退出');
	},
	onLoad() {
		this.lawyerdetail();
		this.yewu();
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
		let user_id = this.userid;
		 if (this.isShow) {
			console.log(uni.getStorageSync('lawyerFrom'+user_id));
			if ( JSON.stringify(uni.getStorageSync('lawyerFrom'+user_id)) != '{}') {
				console.log('aaa');
				var data = uni.getStorageSync('lawyerFrom'+user_id);
				console.log('data');
				console.log(data);
				if(data){
					this.form = data;
				}
			}
		 }
	},
	methods: {
		//判断首页弹窗是否显示
		// getInfo() {
		// 	this.$api('index.tips', { token: uni.getStorageSync('token') }).then(res => {
		// 		if (res.data.is_read == 0) {
		// 			localStorage.showInfo = true;
		// 		}
		// 	});
		// },
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
		getIm() {
			this.$refs.uUpload.upload();
		},
		getForm() {
			uni.setStorageSync('lawyerFrom'+this.userid, this.form);
			if (uni.getStorageSync('lawyerFrom'+this.userid)) {
				var data = uni.getStorageSync('lawyerFrom'+this.userid);
				this.form = data;
					console.log(this.form)
					console.log("getform")
			}
		},
		picktime() {
			this.timeshow = true;
		},
		// 确认时间
		timeconfirm(e) {
			console.log(e);
			this.form.time = e.year + '-' + e.month + '-' + e.day;
			this.getForm();
		},
		//选择区域
		areaPicker() {
			console.log('aaaa');
			this.areashow = true;
		},
		// 确认选择区域
		areaConfirm(e) {
			console.log(e);
			this.form.province = e.province.label;
			this.form.city = e.city.label;
			this.form.address = e.province.label + '-' + e.city.label;
			console.log(this.form);
			this.getForm();
		},
		open() {
			// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			this.$refs.popup.open('bottom');
		},
		cancel() {
			this.$refs.popup.close();
		},
		sureYe() {
			var data=this.yeArr.toString()
			this.form.specal=data
			this.form.area=this.yeId.toString()
			console.log(this.form);
			this.getForm()
			this.$refs.popup.close();
			
		},
		//确认选择业务专长
		specalConfirm(id, value) {
			if (this.yeArr.indexOf(value) == -1) {
				if (this.yeArr.length == 3) {
					uni.showToast({
						title: '最多选择三个领域',
						icon: 'none'
					});
					return;
				}
				this.yeArr.push(value);
				this.yeId.push(id);
			} else {
				const num = this.yeArr.indexOf(value);
				this.yeArr.splice(num, 1);
				this.yeId.splice(num, 1);
			}
			
			
		},
		//跳转上传律师证书
		uploadCer() {
			uni.navigateTo({
				url: '/pages/service/lawyerAuth/upload-certificate'
			});
		},
		//跳转上传身份证件
		upIdcard() {
			uni.navigateTo({
				url: '/pages/service/lawyerAuth/upload-idcard'
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
				// this.yeId.push(this.tclist[0].value)
				// this.yeArr.push(this.tclist[0].label)
			});
		},
		xieyi() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.xieyi', params).then(res => {
				this.xieyiurl = res.data.lvshi;
			});
		},
		// 协议点击
		pactCheck(e) {
			this.form.checked = e.value;
			uni.setStorageSync('lawyerFrom'+this.userid, this.form);
		},
		// 认证状态
		lawyerdetail() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.lawyerdetail', params).then(res => {
				console.log(res);
				this.check_state = res.data.is_six;
				if (res.data.is_six == 2) {
					this.isDis = true;
				}
				//重置填写的数据
				console.log(uni.getStorageSync('lawyerFrom')+this.userid); //保存过信息取接口数据
				if (res.data != '' && res.data.code != null) {
					this.form.avatar = res.data.lawyer_avatar;
					this.form.name = res.data.lawyer;
					this.form.num = res.data.code;
					this.form.time = res.data.work_time;
					this.form.address = res.data.province_text + '-' + res.data.city_text;
					this.form.specal = res.data.area_text;
					this.form.cardface_image = res.data.cardface_image;
					this.form.cardback_image = res.data.cardback_image;
					this.form.cert1_image = res.data.cert1_image;
					this.form.cert2_image = res.data.cert2_image;
					this.form.cert3_image = res.data.cert3_image;
					if (this.form.cert1_image != '' && this.form.cert2_image != '') {
						this.form.cert_image = '已上传';
					} else {
						this.form.cert_image = '';
					}
					if (this.form.cardface_image != '' && this.form.cardback_image != '') {
						this.form.card_image = '已上传';
					} else {
						this.form.card_image = '';
					}

					this.form.province = res.data.province;
					this.form.city = res.data.city;
					this.form.checked = true;
					uni.setStorageSync('lawyerFrom'+this.userid, this.form);
				}else if(JSON.stringify(uni.getStorageSync('lawyerFrom'+this.userid)) != '{}'){
					
				} else {
					uni.setStorageSync('lawyerFrom'+this.userid, {});
				}
			});
		},
		sure() {
			var data = uni.getStorageSync('lawyerFrom'+this.userid);
			this.form = data;
			let formData = {
				token: uni.getStorageSync('token'),
				lawyer_avatar: this.form.avatar,
				lawyer: this.form.name,
				code: this.form.num,
				work_time: this.form.time,
				province: this.form.province,
				city: this.form.city,
				area: this.form.area,
				cardface_image: this.form.cardface_image,
				cardback_image: this.form.cardback_image,
				cert1_image: this.form.cert1_image,
				cert2_image: this.form.cert2_image,
				cert3_image: this.form.cert3_image
			};
			this.$api('index.lawyer', formData).then(res => {
				console.log(res);
				if (res.code == 1) {
					// uni.setStorageSync('lawyerFrom', {});
					this.modal1 = true;
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
			console.log('保存');
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
								title: '请填写律师证号',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.time == '' || this.form.time == undefined) {
							uni.showToast({
								title: '请选择执业开始时间',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.address == '' || this.form.address == undefined) {
							uni.showToast({
								title: '请选择执业区域',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.specal == '' || this.form.specal == undefined) {
							uni.showToast({
								title: '请选择业务专长',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.cert_image == '' || this.form.cert_image == undefined) {
							uni.showToast({
								title: '请上传律师证书',
								duration: 1000,
								icon: 'none'
							});
						} else if (this.form.card_image == '' || this.form.card_image == undefined) {
							uni.showToast({
								title: '请上传身份证件',
								duration: 1000,
								icon: 'none'
							});
						} else {
							this.modal1 = true;
							this.check_state = 5;
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
		//移除图片
		onRemove() {
			var lawyerData = uni.getStorageSync('lawyerFrom'+this.userid);
				this.form.avatar = '';
				uni.setStorageSync('lawyerFrom'+this.userid, this.form);
			
		},
		onSuccess(data, index, lists, name) {
			uni.showLoading({
				title: '上传图片中'
			});
			console.log('1111');
			let avatar = data.map(res => res.response.data)[0].url;
			this.form.avatar = avatar;
			console.log('222');
			this.getForm();
			uni.hideLoading();
		},
		// ------------------------------------------------
		uploadPopup(e) {
			console.log(e);
			this.thisphoto = e
			// this.form.avatar  = 'http://img4.cache.netease.com/photo/0001/2009-10-01/5KI1QL2T0UQ20001.jpg'
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
			console.log("photoOk接收图片"+res)
			if(res=='nothing'){
				that.form.avatar=''
				that.getForm();
				uni.hideLoading()
				return;
			}else{
				console.log("上传中")
				console.log('X2');
				console.log('form.avatar'+that.form.avatar)
				that.form.avatar  = JSON.parse(res).url
				if(that.form.avatar!=''){
					uni.hideLoading()
					uni.showToast({
						title: '上传完成',
						duration: 1000,
						icon: 'none'
					});
				}
				console.log('X3');
				that.getForm();
				if (uni.getStorageSync('lawyerFrom'+this.userid)) {
					console.log('aaa');
					var data = uni.getStorageSync('lawyerFrom'+this.userid);
					this.form = data;
				}
				console.log( JSON.parse(res).url)
			}
			
		
		
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
				uni.showLoading({
					title:'上传中'
				})
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

<style lang="scss" scoped>
.lawyer-top {
	display: flex;
	height: 140rpx;
	justify-content: space-between;
	padding: 0 20rpx;
	align-items: center;
	margin-left: 30rpx;
	.lawyer-name {
		font-size: 32rpx;
		display: flex;
		align-items: center;

		.name {
			font-size: 30rpx;
		}

		.dot {
			color: red;
			height: 40rpx;
			font-size: 40rpx;
			padding-left: 10rpx;
		}
	}

	.lawyer-img {
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

.lawyer-item {
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
	.u-form-item--left__content__label {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #0077aa;
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
	height: 300rpx;
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
	height: 100rpx;
	margin-left: 10%;
}
.item-pop {
	width: 100%;
	height: 590rpx;
	background-color: #ffffff;
	.item-top {
		height: 90rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 2rpx solid #c8c7cc;
		margin-bottom: 20rpx;
		.item-left {
			width: 100rpx;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
		}
		.item-right {
			width: 100rpx;
			height: 90rpx;
			text-align: center;
			line-height: 90rpx;
			color: #2979ff;
		}
	}
	// .item-main {
	// 	height: 500rpx;
	// 	overflow-y: auto;
	// 	padding: 30rpx;
	// }
	.item-txt {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
	}
}.choose-box {
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
	.item-color {
		color: #ffc801;
	}

</style>
