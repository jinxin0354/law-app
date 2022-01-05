<template>
	<view class="investors">
		<u-navbar
			:custom-back="goBack"
			title="认证投资人"
			:titleBold="true"
			:background="{ background: '#fff' }"
			title-color="#222222"
			back-icon-color="#222222"
			z-index="99999"
		></u-navbar>
		<u-form :model="form" ref="uForm">
			<view class="lawyer-line">
				<view class="lawyer-item">
					<u-form-item label="公司名称" prop="name" label-width="130" :required="true">
						<u-input style="margin-left: 60rpx;" :disabled="isDis"  v-model="form.name" :clearable="false" placeholder="请输入公司名称" @input="getForm()" />
					</u-form-item>
				</view>

				<view class="lawyer-item">
					<u-form-item label="营业执照" label-width="130" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 60rpx;"
							v-model="form.cert_image == '' || form.cert_image == undefined ? '' : '已上传'"
							@click="uploadCer"
							disabled
							placeholder="点击上传营业执照"
						/>
					</u-form-item>
				</view>
				<view class="lawyer-item">
					<u-form-item label="身份证件" prop="idcard" label-width="130" :required="true" right-icon="arrow-right">
						<u-input
							style="width:440rpx;margin-left: 60rpx;"
							v-model="form.card_image == '' || form.card_image == undefined ? '' : '已上传'"
							@click="upIdcardq"
							disabled
							placeholder="点击上传法定代表人身份证"
						/>
					</u-form-item>
				</view>
				<view class="pact">
					<u-checkbox-group>
						<u-checkbox v-model="form.checked" @change="pactCheck" :disabled="isDis" activeColor="#278A00" shape="circle">
							<view class="tips">
								已阅读并同意履行
							</view>
						</u-checkbox>
					</u-checkbox-group>
					<view class="pact-tip" @click="goXieyi(3)">《服务商合作协议-投资人》</view>
				</view>
			</view>
		</u-form>
		<view class="btn" ><u-button :custom-style="customStyle" @click="save" v-if="isDis == false">提交审核</u-button></view>
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
export default {
	data() {
		return {
			userid:'',
			isDis:false,
			checked: false,
			customStyle: {
				'background-color': '#e02e24',
				color: '#fff',
				'margin-bottom': '20rpx',
				width: '90%'
			},
			timeshow: false,
			xieyiurl: '',
			modal1: false,
			check_state: 0,
			model: {
				img: require('@/static/img/z7.png'),
				text1: '已提交申请，请等待平台审核',
				text2: '感谢您的新人与支持'
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入公司名称',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				]
			},
			form: {
				cert1_image: '',
				cardface_image: '',
				cardback_image: '',
				cert_image: '',
				card_image: '',
				name: '',
				checked:false
			},
			flag: 0,
			isShow: false
		};
	},

	onReady() {
		console.log('ready');
		this.$refs.uForm.setRules(this.rules);
	},
	onBackPress() {
		// uni.setStorageSync('touzirenFrom', {});
	},
	onLoad(e) {
		this.xieyi();
		this.touzirendetail();
	},

	created() {
		this.isShow = true;
	},
	onShow() {
		let userinfo = uni.getStorageSync('userInfo');
		this.userid = userinfo.id;
		 if (this.isShow) {
			console.log(this.isShow);
			console.log(uni.getStorageSync('touzirenFrom')+this.userid);
			if (JSON.stringify(uni.getStorageSync('touzirenFrom')+this.userid) != '{}') {
				console.log('aaa');
				var data = uni.getStorageSync('touzirenFrom'+this.userid);
				if(data){
					this.form = data;
				}
				console.log(this.form)
			}
		 }
	},
	methods: {
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
		getForm() {
			uni.setStorageSync('touzirenFrom'+this.userid, this.form);
		},
		back() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		picktime() {
			this.timeshow = true;
		},
		xieyi() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.xieyi', params).then(res => {
				console.log(res);
				this.xieyiurl = res.data.touziren;
			});
		},
		//跳转上传营业执照
		uploadCer() {
			uni.navigateTo({
				url: '/pages/service/investors/upload-business'
			});
		},
		//跳转上传身份证件
		upIdcardq() {
			console.log(uni.getStorageSync('touzirenFrom'+this.userid));
			uni.navigateTo({
				url: '/pages/service/investors/upload-idcard'
			});
		},
		// 协议点击
		pactCheck(e) {
			this.form.checked = e.value;
			this.getForm()
		},
		touzirendetail() {
			let params = {
				token: uni.getStorageSync('token')
			};
			this.$api('index.touzirendetail', params).then(res => {
				console.log(res)
		      if(res.data.is_six==2){
				  this.isDis=true
			  }
				console.log(uni.getStorageSync('touzirenFrom'+this.userid));
				//保存过信息取接口数据
				if (res.data != '' && res.data.name != null) {
						this.form.cert_image = '已上传';
						this.form.cert1_image = res.data.cert1_image;
						this.form.cert2_image = res.data.cert2_image;
						this.form.cert3_image = res.data.cert3_image;
						this.form.card_image = '已上传';
						this.form.cardface_image = res.data.cardface_image;
						this.form.cardback_image = res.data.cardback_image;
						this.form.name = res.data.name;
						this.form.checked=true
						console.log("aaaa")
						uni.setStorageSync('touzirenFrom'+this.userid, this.form);
				}else if(JSON.stringify(uni.getStorageSync('touzirenFrom'+this.userid)) != '{}'){
					uni.setStorageSync('touzirenFrom'+this.userid, {});
				} else {
					uni.setStorageSync('touzirenFrom'+this.userid, {});
					// this.form=uni.getStorageSync('touzirenFrom');
					//填写的。未保存的数据
					
				}
			});
		},
		agin() {
			this.modal1 = false;
		},
		// back() {
		// 	// this.$Router.back(1)
		// 	this.modal1 = false;
		// },
		sure() {
			var data=uni.getStorageSync('touzirenFrom'+this.userid);
			this.form=data
			let params = {
				token: uni.getStorageSync('token'),
				name: this.form.name,
				cardface_image: this.form.cardface_image,
				cardback_image: this.form.cardback_image,
				cert1_image: this.form.cert1_image
			};
			console.log(params);
			this.$api('index.touziren', params).then(res => {
				
				if (res.code == 1) {
					// uni.setStorageSync('touzirenFrom', {});
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
		back() {
			const nav = navigator.userAgent;
			if (nav.indexOf('Android') > -1 || nav.indexOf('Adr') > -1) {
				phone.onBackPress();
			} else if (!!nav.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
				this.$bridge.callhandler('onBackPress', {}, res => {});
			}
		},
		// 保存
		save() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('验证通过');
					if (this.form.name == '' || this.form.name == undefined) {
						uni.showToast({
							title: '请输入公司名称',
							duration: 1000,
							icon: 'none'
						});
					} else if (this.form.cert_image == '' || this.form.cert_image == undefined) {
						uni.showToast({
							title: '请上传营业执照',
							duration: 1000,
							icon: 'none'
						});
					} else if (this.form.card_image == '' || this.form.card_image == undefined) {
						uni.showToast({
							title: '请上传法定代表人身份证',
							duration: 1000,
							icon: 'none'
						});
					} else if (!this.form.checked) {
						uni.showToast({
							title: '请先同意用户协议',
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
	}
};
</script>

<style lang="scss" scoped>
.lawyer-top {
	display: flex;
	height: 140rpx;
	justify-content: space-between;
	padding: 0 20rpx 0 0;
	align-items: center;

	.lawyer-name {
		font-size: 32rpx;
		display: flex;
		align-items: center;

		.name {
			font-size: 30rpx;
		}

		.dot {
			color: #fa3534;
			height: 30rpx;
			font-size: 30rpx;
			padding-left: 10rpx;
		}
	}

	.lawyer-img {
		.imgs {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
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
</style>
