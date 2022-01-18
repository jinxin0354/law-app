<template>
	<view class="popup-bottom-box">
<view class="bot-con">
			<view class="od-box">
		<scroll-view scroll-top="0" scroll-y="true" style="height: 600rpx;">
			<view class="flex-item">
				<!-- 委托人案子以什么方式处理得  -->
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="require text">委托人的案子以什么方式处理的</view>
					</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item flex1" :class="moneyparams.chuli_type == '法院判决' ? 'active' : ''"
								@click="moneyparams.chuli_type = '法院判决'">法院判决</view>
							<view class="service-item flex1" :class="moneyparams.chuli_type == '和解/调解' ? 'active' : ''"
								@click="moneyparams.chuli_type = '和解/调解'">和解/调解</view>
							<view class="service-item flex1" :class="moneyparams.chuli_type == '其他方式' ? 'active' : ''"
								@click="moneyparams.chuli_type = '其他方式'">其他方式</view>
						</view>
					</view>
				</view>
				<!-- 委托人主张的欠款本金有多少获得支持 -->
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="require ">委托人主张的欠款本金有多少获得支持</view>
					</view>
					<view class="item-right">
						<view class="service-list">
							<view class="service-item flex1" :class="moneyparams.chuli_money == '全部支持' ? 'active' : ''"
								@click="chuli_moneys('全部支持')">全部支持</view>
							<view class="service-item flex1" :class="moneyparams.chuli_money == '部分支持' ? 'active' : ''"
								@click="chuli_moneys('部分支持')">部分支持</view>
							<view class="service-item flex1" :class="moneyparams.chuli_money == '全部不支持' ? 'active' : ''"
								@click="chuli_moneys('全部不支持')">全部不支持</view>
						</view>
					</view>
				</view>
				<!-- 第二部分输入框计算内容 -->
				<view v-for="(item,index) in swit_flg(moneyparams.chuli_money)" :key="index" class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						
						<view v-if="index==0" class="require">{{item}}
						</view>

						<view v-if="index==1" class="adi-symbol">
							<view class="adi">{{item}}</view>
							<view @click="$refs.direc.open('center')" class="symbol"></view>
						</view>

						<!-- <view class="require">委托人这次收回了多少钱</view> -->
					</view>
					<view v-if="moneyparams.chuli_money == '全部不支持'"  style="color: #d4d4d4;">
						<view class="" v-if="index!=1">
						(包括欠款本金、利息/违约金、立案受理费、律师费等)
						</view>
						
					</view>

					<view class="item-right" v-if="index==0">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"  @input="sendMsg" :value="jine3" :id="3"
								/>
						</view>

					</view>
					
					<view class="item-right" v-if="index==1">
						<view class="computer-text">
							<text class="text-icon">¥</text>
							<view class="text-cont">
								<text v-if="!moneyparams.price"> 待计算</text>
								<text v-else class="" style="color: #000000;"> {{moneyparams.price}}</text>
							</view>
						</view>
					</view>
				</view>
					
				

			</view>
			<view v-if="moneyparams.chuli_money =='全部不支持'" class="flex-item" style="margin-top: 15rpx;">
				<view v-for="(item,index) in swit_flg1(moneyparams.chuli_type)"  class="od-item flex-item-is">
					<view class="flex-item-lable">
						<view class="ico"  v-if="index>=2"></view>
						<!-- <view v-if="index<1" class="require">{{item}}</view> -->
						<!-- <view v-if="index==1">
							<text>{{item}}</text>
							<text class="red">*</text></view> -->
						<view v-if="index==2">{{item}}</view>
						<view v-else-if="index==3" class="adi-symbol">
							<view class="adi">{{item}}</view>
							<view @click="$refs.direc.open('center')" class="symbol"></view>
						</view>
			
					</view>
					<view class="item-right">
						<view class="item-right" v-if="index>=2">
							<view class="computer-text">
								<text class="text-icon">¥</text>
								<view class="text-cont" v-if="index==2">
									<!-- <text v-if="!moneyparams.price" style="color: #000000;">待计算</text> -->
									<view>{{touziren_pay}}</view>
									<text  class=""> {{info.order.area_name}}</text>
								</view>
								<view class="text-cont" v-if="index==3">
									<text v-if="!moneyparams.sunshi_money"> 待计算</text>
									<text v-else class="" style="color: #000000;" > {{moneyparams.sunshi_money}}</text>
								</view>
							</view>
						</view>
					<!-- 	<view v-else class="item-txt">
							<text class="input_icon">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"  @input="sendMsg"   :value="jine" :key="index" :id="index"
							/>
						</view> -->
					</view>
				</view> 
			
			</view>
			<!-- <view class="touziren-boxs" v-if="moneyparams.chuli_money == '全部不支持'" style="margin-top: 20rpx; width: 100%; height: 286rpx; background: #FFFFFF; margin-top: 20rpx;">
						
			</view> -->
			<!-- 第三部分部分支持  -->
			<view v-if="moneyparams.chuli_money =='部分支持'" class="flex-item" style="margin-top: 15rpx;">
				<view v-for="(item,index) in swit_flg1(moneyparams.chuli_type)"  class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view v-if="index<1" class="require">{{item}}</view>
						<view v-if="index==1"><text>{{item}}</text><text class="red">*</text></view>
						<view v-else-if="index==2">{{item}}</view>
						<view v-else-if="index==3" class="adi-symbol">
							<view class="adi">{{item}}</view>
							<view @click="$refs.direc.open('center')" class="symbol"></view>
						</view>

					</view>
					<view class="item-right">
						<view class="item-right" v-if="index>=2">
							<view class="computer-text">
								<text class="text-icon" style="color: #000000;">¥</text>
								<view class="text-cont" v-if="index==2">
									<!-- <text v-if="!moneyparams.price" style="color: #000000;">待计算</text> -->
									<view>{{touziren_pay}}</view>
									<text  class=""> {{info.order.area_name}}</text>
								</view>
								<view class="text-cont" v-if="index==3">
									<text v-if="moneyparams.sunshi_moneys"> 待计算</text>
									<text v-else class="" style="color: #000000;"  > {{moneyparams.sunshi_moneys}}</text>
								</view>
							</view>
						</view>
						<view v-else class="item-txt">
							<text class="input_icon">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"  @input="sendMsg"   :value="jine" :key="index" :id="index"
							/>
						</view>
					</view>
				</view> 

			</view>
			<!--第四部分 违约金-->
			<view class="od-item marginbottom10 flex-item" style="margin-top: 15rpx;">
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="adi-symbol">
							<view class="adi">委托人逾期付款的违约金*(如无,请填写0)</view>
							<view @click="$refs.direc.open('center')" class="symbol">
							</view>
						</view>
					</view>
					<view class="item-right">
						<view class="item-txt" style="margin-bottom: 30rpx;">

							<text class="input_icon red1">¥</text>
							<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder"   @input="sendMsg" :value="jine4" :id="4"
								/>

						</view>
					</view>
				</view>
			</view>
			<!-- <template slot="payOption"></template> -->

			
			<!-- <template slot="payOption2"></template> -->

			<!-- </service-popup-statement> -->
		</scroll-view>
		<view class="flex-item-i" style="margin-top: 20rpx;">
			<!-- <uni-data-checkbox value='[1]' multiple>我已与委托人确认付款金额</uni-data-checkbox> -->
			<view @click="flg_checks" class="checkbox-style" >
				<view class="check-style" style="display: flex; justify-content: center; align-items: center;">
					<view :class="flg_check?'check-style1':''" >
		
					</view>
				</view>
				<!-- <checkbox value="" color="#ffca00" class="check-style" /> -->
				我已与委托人确认付款金额
			</view>
		</view>
		<uni-popup ref="direc" type="center">
			<view class="popup-direc-box">

				<view class="bot-title">
					<view class="title-txt">计算方式说明</view>

					<view class="title-close" @click="close">

						<view class="image-wrapper">
							<image src="@/static/img/close.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">委托人这次应付投资收益</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text class="text_icon">委托人起诉的全部金额x30%</text>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="blod">委托人应付的投资费用损失为</view>
					</view>
					<view class="item-right">
						<view class="item-txt1">
							<view class="bt1">法院判决时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">(委托人原来主张的欠款本金-法院判决支持的欠款本金)÷委托人原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
						<view class="item-txt1">
							<view class="bt1">和解/调解时适用</view>
							<view class="dl1">
								<text class="input_icon">¥</text>
								<view class="text_icon">(委托人原来主张的欠款本金-和解时欠款方同意偿还的欠款本金)÷委托人原来主张的欠款本金×投资人已支付的投资费用</view>
							</view>
						</view>
					</view>
				</view>
				<view class="od-item flex-item-i">
					<view class="flex-item-lable">
						<view class="ico"></view>
						<view class="">委托人预期付款的违约金</view>
					</view>
					<view class="item-right">
						<view class="item-txt">
							<text class="input_icon">¥</text>
							<text>委托人未付款金额×万分之六×逾期天数</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

</view>
</view>
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
				remainTime: {}, //剩余时间
				isTimeOver: true, //倒计时结束
				infoLawyer: {},
				reason: '',
				isTipShow: false,
				infoInbo: {}, //投资人收件信息信息
				payToInvestorInfo: {}, //付款给投资人信息
				moneyNature: '法院判决', //款项性质
				moneyNature1: "全部支持",
				moneyparams: {
					chuli_type: "法院判决",
					chuli_money: "全部支持",
					money: "",
					moneys:"",
					price: "",
					prices:"",
					sunshi_money:"",
					sunshi_moneys:"待计算",
					weiyue_money: ""
				},
				flg_check: false,
				jine:'',
				jine1:'',
				jine2:'',
				jine3:'',
				jine4:'',
				touziren_pay:0,
				weiyues:'',
				getMoneys:"",
			};
		},
		computed:{
			getMoney(){
				if(this.getMoneys!=''){
					let money=this.getMoneys*0.3
					this.moneyparams.price=money.toFixed(2)
					return money.toFixed(2)
				}
			},
			hejiMoney(value){
				console.log(this.moneyparams.price)
				console.log(this.weiyues)
				
				var heji = parseFloat(this.moneyparams.price) + parseFloat(this.weiyues)
				console.log(heji)
				return heji.toFixed(2)
				// console.log(this.weiyue,'weiyue')
				// console.log(this.moneyparams,'this.heji')
				
			},
			
			// getSunshiMoney(){
			// 	if(this.moneyparams.yuan_money!=''&&this.moneyparams.hejie_money!=''&&
			// 	this.moneyparams.touzi_money!=''){
			// 		let money=this.moneyparams.yuan_money-this.moneyparams.hejie_money
			// 		money=(money/this.moneyparams.yuan_money*this.moneyparams.touzi_money).toFixed(2)
			// 		this.moneyparams.sunshi_money=money
			// 		return money
			// 	}
			// },
			// getTotalMoney(){
			// 	if(this.moneyparams.price!=''&& this.moneyparams.weiyue_money!=''){
			// 		let money=this.moneyparams.price +this.moneyparams.weiyue_money
			// 		if(this.moneyparams.sunshi_money!='' && this.moneyparams.chuli_type=='法院判决' && this.moneyparams.chuli_money!='全部支持') money=money+this.moneyparams.sunshi_money
			// 		this.moneyparams.total_money=parseFloat(money).toFixed(2)
			// 		return parseFloat(money).toFixed(2)
			// 	}else{
			// 		return 0
			// 	}
			// }
		},
		onLoad(params) {
			if (params.order_id) {
				this.order_id = params.order_id;
				this.init();
			}
		},

		methods: {
			// direction(){

			// },
			weiyue(e){
				var value = e.detail.value
				console.log(value,'value')
				
				console.log(				this.moneyparams,'this.weiyue')
				if(this.moneyparams.chuli_money=="全部支持"||this.moneyparams.chuli_money=="法院判决"||this.moneyparams.money!=''){
					console.log('aaa')
					this.hejiMoney
					var heji_money = this.hejiMoney
					this.$emit('func',heji_money)
		
					
				}else if(this.moneyparams.chuli_money=="部分支持"||this.moneyparams.chuli_money=="法院判决"){
					
					
				}
			},
			getMsg(e){
				var value = e.detail.value
				this.moneyparams.money = value
				this.getMoney
				// console.log(e.detail.value)
				
			},
			chuli_moneys(value){
				if(value=="全部支持"){
					this.moneyparams.chuli_money = "全部支持"
					
				}else if(value=="部分支持"){
						this.moneyparams.chuli_money = "部分支持"
				}else if(value=="全部不支持"){
						this.moneyparams.chuli_money = "全部不支持"
				}
				if(this.moneyparams.moneys!=''){
					this.moneyparams.moneys = ""
				}
				this.jine = ''
				this.jine1 = ''
				this.jine2 = ''
				this.jine3 = ''
				this.jine4 = ''
				this.moneyparams.price = ""
				var data = {
					heji_money:0
				}
				this.$emit('func',data)
			},
			flg_checks(){
				if(this.flg_check==true){
					this.flg_check=false
				}else if(this.flg_check==false){
						this.flg_check=true
				}
				var flg_check=this.flg_check
				
				this.$emit('funcs',flg_check)
				console.log(this.flg_check)
			},
			close() {
				this.$refs.direc.close()
			},
			sendMsg(e){
				console.log(this.moneyparams.price,'price')
				var index = e.currentTarget.id
				if(index==0){
					this.jine1 = e.detail.value
				}
				if(index==1){
					this.jine2 = e.detail.value
				}
				if(index==3){
					this.jine3 = e.detail.value
				}
				if(index==4){
					this.jine4 = e.detail.value
				}
				
				if(this.moneyparams.chuli_money=='部分支持'){
					
			if(this.jine1!=''){
				if(this.jine2!=''){
					console.log(this.jine1,'jiin1')
					console.log(this.jine2,'jinn2')
					if(this.moneyparams.chuli_type=='法院判决'){
						var a = parseFloat(this.jine1) - parseFloat(this.jine2)
						this.moneyparams.sunshi_moneys = a/this.jine1*this.touziren_pay
						console.log(this.moneyparams.sunshi_moneys,'shunshimoney')
					}
					if(this.moneyparams.chuli_type=='和解/调节'){
						var a = parseFloat(this.jine1) - parseFloat(this.jine2)
						this.moneyparams.sunshi_moneys = a/this.jine1*this.touziren_pay
					}
				}
				
			}
			
			
			
			
			
			
					if(this.jine1==''||this.jine2==''||this.jine3==''||this.jine4==''){
					this.heji = 0
					}else{
						// if(this.moneyparams.chuli_type=='法院判决'){
						// 	var a = parseFloat(this.jine1) - parseFloat(this.jine2)
						// 	this.moneyparams.sunshi_money = a/this.jine1*this.touziren_pay
						// }
						// if(this.moneyparams.chuli_type=='和解/调节'){
						// 	var a = parseFloat(this.jine1) - parseFloat(this.jine2)
						// 	this.moneyparams.sunshi_money = a/this.jine1*this.touziren_pay
						// }
						console.log(this.moneyparams.sunshi_money,'jine3')
						this.heji = parseFloat(this.jine3*0.3) + parseFloat(this.moneyparams.sunshi_money)+parseFloat(this.jine4)
					}
					console.log(this.heji,'hejis')
					var jine3 = this.jine3*0.3
				
					this.moneyparams.price =jine3.toFixed(2)
				var data= {
					type:3,
					chuli_money:this.moneyparams.chuli_money,
					money:this.jine3,
					chuli_type:this.moneyparams.chuli_type,
					price:this.moneyparams.price*0.3,
					yuan_money:this.jine1,
					hejie_money:this.jine2,//和解时穿的参数
					touzi_money:this.touziren_pay,
					sunshi_monet:this.sunshi_money,
					weiyue_money:this.jine4,
					heji_money:this.heji,
					
				
				}
				
					
					 this.$emit('func',data)
				}
			if(this.moneyparams.chuli_money=='全部支持'){
			console.log('quanbuzhichi')
			console.log(this.jine3,'jine3')
				if(this.jine3!=''){
					var jine3 = this.jine3*0.3
					console.log(jine3,'333333333')
					this.moneyparams.price = jine3.toFixed(2)
				}
				if(this.jine3==''||this.jine4==''){
				this.heji = 0
				}else{
					this.heji =parseFloat(this.moneyparams.price) + parseFloat(this.jine4)
				}
				console.log(this.moneyparams.price,'jksadhjdhauisduiajkdhaiujk')
				var data= {
					type:3,
					chuli_money:this.moneyparams.chuli_money,
					money:this.jine3,
					chuli_type:this.moneyparams.chuli_type,
					price:this.moneyparams.price,
					yuan_money:this.jine1,
					hejie_money:this.jine2,//和解时穿的参数
					touzi_money:this.touziren_pay,
					sunshi_monet:this.sunshi_money,
					weiyue_money:this.jine4,
					heji_money:this.heji,
					
				}
				console.log(data,'datassss')
				 this.$emit('func',data)
				
			}
			if(this.moneyparams.chuli_money=='全部不支持'){
				if(this.jine3!=''){
					var jine3 = this.jine3*0.3
					this.moneyparams.price = jine3.toFixed(2)
				
				}
				if(this.jine3==''||this.jine4==''){
				this.heji = 0
				}else{
				
					this.heji =parseFloat(this.moneyparams.price) + parseFloat(this.jine4)
				}
				
					var data= {
						type:3,
						chuli_money:this.moneyparams.chuli_money,
						money:this.jine3,
						chuli_type:this.moneyparams.chuli_type,
						price:this.moneyparams.price*0.3,
						yuan_money:this.jine1,
						hejie_money:this.jine2,//和解时穿的参数
						touzi_money:this.touziren_pay,
						sunshi_monet:this.sunshi_money,
						weiyue_money:this.jine4,
						heji_money:this.heji,
					
					}
					
					 this.$emit('func',data)
			}
		
				console.log(this.heji,'heji')	
				
			},
			
			swit_flg(n2) {
				n2 = n2 != '全部不支持' ? '1' : '0'

				let obj = {
					'0': ['委托人起诉金额的总和是多少', '委托人应付的投资收益损失为'],
					'1': ['委托人这次收回了多少钱', '委托人这次应付投资收益']
				}
				return obj[n2]
			},
			swit_flg1(n) {
				let str = '您与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
				switch (n) {
					case '法院判决':
						str = '法院判决支持的欠款本金金额是多少'
						break;
					case '和解/调解':
						str = '委托人与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
						n=1;
						break;
					case '其他方式':
						n = 2;
						break;
					default:
						console.log(4);
						break;
				}
				let arr = ['委托人原来主张的欠款本金金额是多少',
					str,
					'投资人已支付的投资费用', '委托人应付的投资费用损失为'
				]
				return arr
			},
			async init() {
				
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.orderDetail', formData);
				console.log(res.data.order.touziren_pay,'touzirenopay')
				this.info = res.data;
				this.touziren_pay = res.data.order.touziren_pay
				this.getOrderState(this.info);

				let d = this.get15MinutesLater(this.info.order.lawyer_time);
				this.remainTime = this.timeFn(d);
				if (this.remainTime.hour > 0 || this.remainTime.minute > 0 || this.remainTime.second > 0) {
					this.isTimeOver = false;
				}

				let formDataLawyer = {
					id: this.info.order.lawyer,
					token: uni.getStorageSync('token')
				};
				let resLawyer = await this.$api('index.lawyerDetail', formDataLawyer);
				this.infoLawyer = resLawyer.data;

				if (this.info.order.investor_id) {
					let formDataInbo = {
						id: this.info.order.investor_id,
						token: uni.getStorageSync('token')
					};
					let resInbo = await this.$api('index.investor_address', formDataInbo);
					if (resInbo.code == 1) {
						this.infoInbo = resInbo.data;
					}
				}
			},
			confirmEntrustOk() {
				this.$refs.popupEntrustOk.close();
				this.$refs.popupReason.open();
			},
			async confirmReason() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					reason: this.reason
				};
				let res = await this.$api('index.u_remove_lawyer', formData);
				if (res.code == 1) {
					this.isClientRemoveEntrust = true;
					this.disableServiceOk = true;
					this.$refs.popupReason.close();
					this.$refs.popupEntrustOk.close();
				}
			},
			async sureRemoveEntrust(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.u_lawyer_remove', formData);
				if (res.code == 1) {
					if (pop == 'popupSureRemoveEntrust') {
						this.closePop('popupSureRemoveEntrust');
						this.isClientRemoveEntrust = true;
						this.isLawyerRemoveEntrust = true;
					} else if (pop == 'popupNoSureRemoveEntrust') {
						this.closePop('popupNoSureRemoveEntrust');
						this.isClientRemoveEntrust = false;
						this.isLawyerRemoveEntrust = false;
						this.disableServiceOk = false;
					}
				}
			},
			// 15分钟倒计时结束
			timeup() {
				this.isTimeOver = true;
			},
			// TODO 解除委托判断是否支付
			removeEntrust() {
				if (this.info.order.pend_text.length > 0) {
					this.$refs.popupRemoveEntrust.open();
				} else {
					this.$refs.popupEntrustOk.open();
				}
			},
			async confirmServiceOk() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.u_sure_lawyer', formData);
				if (res.code == 1) {
					this.isClientServiceOk = true;
					this.disableRemoveEntrust = true;
					this.$refs.popupServiceOk.close();
				}
			},
			async sureServiceOk(status, pop) {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					status: status
				};
				let res = await this.$api('index.u_sure_lawyer_over', formData);
				if (res.code == 1) {
					if (pop == 'popupSureServiceOk') {
						this.closePop('popupSureServiceOk');
						this.isClientServiceOk = true;
						this.isLawyerServiceOk = true;
					} else if (pop == 'popupNoSureServiceOk') {
						this.closePop('popupNoSureServiceOk');
						this.isClientServiceOk = false;
						this.isLawyerServiceOk = false;
						this.disableRemoveEntrust = false;
						this.disableServiceOk = false;
					}
				}
			},
			async confirmPayToInvestor(payMethod) {
				this.closePop('payToInvestor');
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token'),
					type: 1, //1 = 付费给投资人 2= 投资人退款请求 3 = 投资人请求结算 4 添加服务 5 包年包月的续费 6付款给律师
					pay_type: payMethod
				};
				// TODO回款凭证
				// if (this.moneyNature == '投资收益') {
				// 	formData = {
				// 		...formData,
				// 		money: this.payToInvestorInfo.money,
				// 		price: this.payToInvestorInfo.price,
				// 		origin: '第' + this.payToInvestorInfo.origin + '次回款支付投资收益',
				// 		nature: this.moneyNature,
				// 		proof: []
				// 	};
				// } else if (this.moneyNature == '其他费用') {
				// 	formData = {
				// 		...formData,
				// 		money: '',
				// 		price: this.payToInvestorInfo.price,
				// 		origin: '第' + this.payToInvestorInfo.origin + '次回款支付投资收益',
				// 		nature: this.moneyNature,
				// 		proof: []
				// 	};
				// }

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
						this.init();
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
		padding-bottom: 30rpx;
	}
.bot-con {
		width: 660rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f5f5f5;
		.service-list {
			margin-bottom: 20rpx;
		}
		.od-box {
			padding: 0;
			
			// height: 800rpx;
			background: #f5f5f5;
		}
	}
	.popup-bottom-box {
		background-color: #F5f5f5;
		// height: 1270rpx;
		overflow: auto;
		border-radius: 26rpx;
	}

	.checkbox-style {
		// transform: scale(0.7);
		display: flex;
		align-items: center;
		// margin-top: 25rpx;
		// align-content: center;
		

		.check-style {
			width: 30rpx;
			height: 30rpx;
			border: 3rpx solid #707070;
			position: relative;
			margin-right: 9rpx;
			margin-top: 4rpx;
			// padding: 0.4rpx;
			border-radius: 50%;

			.check-style1 {
				width: 22rpx;
				height: 22rpx;
				background: #ffca00;
				border: none;
				border-radius: 50%;
			}
		}
	}


	//第一个弹窗的内容
	.flex-item {
		flex-direction: column;
		// padding: 30rpx;
		width: 100%;
		background: #FFFFFF;
		border-radius: 24rpx;

		//每一项内容
		.flex-item-i {
			flex-direction: column;
			// margin-top: 30rpx;
			// margin-bottom: 30rpx;
			padding: 30rpx 30rpx 0 30rpx;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 27rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			

			.item-right {

				//圆角选项
				.service-list {
					margin-top: 24rpx;

					.service-item {
						border-radius: 50rpx;
					}
				}

				//带付款图标的input空间
				.item-txt {
					position: relative;
					display: flex;
					align-content: center;
					
					// align-content: center;
					//付款文字样式
					.input_icon {
						position: absolute;
						font-size: 18rpx;
						top: 10rpx;
						left: 10rpx;
						z-index: 8;
					}

					.ipt-border {
						flex: 1;
						margin-top: 10rpx;
						// border: none;
						height: 25rpx;
						text-indent: 24rpx;
						color: #000;
					}
				}

				.computer-text {
					display: flex;
					position: relative;
					// margin-left: 10rpx;
					align-items: center;
					margin-bottom: 30rpx;

					// color: #d4d4d4;
					.text-icon {
						color: #f00;
						position: absolute;
						font-size: 18rpx;
						top: 16rpx;
						left: 10rpx;
						margin-right: 7rpx;
						z-index: 8;
					}

					.text-cont {
						// flex: 1;
						margin-top: 10rpx;
						// border: none;
						margin-left: 50rpx;
						// text-indent: 24rpx;
						color: #aaaaaa;
					}
				}

			}
		}
	}

	.red1 {
		color: #F00;
	}

	//第二个弹窗内容

	.popup-direc-box {
		background: #FFFFFF;
		width: 660rpx;
		padding: 30rpx;
		border-radius: 30rpx;

		.bot-title {
			display: flex;
			align-items: center;
			
			.title-txt {
				flex: 1;
				text-align: center;
				padding: 20rpx;
				font-size: 28rpx;
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

		.flex-item-i {
			flex-direction: column;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 28rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			

			.item-right {
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				color: #848484;
				.item-txt {
					// color: red;
					margin-left: 20rpx;
					.input_icon{
						// margin-left: 7rpx;
						margin-right: 7rpx;
					}
				}
				.item-txt1{
					margin-left: 18rpx;
					.bt1{
						
					}
					.dl1 {
						display: flex;
						// margin-left: 19rpx;
						// flex-direction: column;
						.input_icon {
							margin-left: 2rpx;
						}
						.text_icon {
							margin-left: 7rpx;
						}
					}
				}
			}
		}
	}
.flex-item-is {
			flex-direction: column;
			// margin-top: 30rpx;
			// margin-bottom: 30rpx;
			padding: 10rpx 30rpx 0 30rpx;
			//每一项内容的上部
			.flex-item-lable {
				position: relative;
				// height: 33rpx;
				display: flex;
				align-content: center;
				line-height: 33rpx;
				// height: 33rpx;
			
				// margin-bottom: 10rpx;
				//矩形图标
				.ico {
					width: 13rpx;
					height: 33rpx;
					background: #ffc900;
					border-radius: 50rpx;
					margin-right: 7rpx;
				}
			
				.text {}
			
				// 标题文字
				.adi-symbol {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: space-between;
			
					// 标题文字
					.adi {
						color: #FF5353;
						font-size: 27rpx;
					}
			
					// 问号图标
					.symbol {
						z-index: 99;
						background: url(@/static/img/question.png);
						// background: red;
						background-size: cover;
						width: 30rpx;
						height: 30rpx;
					}
				}
			
			}
			
			

			.item-right {

				//圆角选项
				.service-list {
					margin-top: 24rpx;

					.service-item {
						border-radius: 50rpx;
					}
				}

				//带付款图标的input空间
				.item-txt {
					position: relative;

					// align-content: center;
					//付款文字样式
					.input_icon {
						position: absolute;
						font-size: 18rpx;
						top: 9rpx;
						left: 10rpx;
						z-index: 8;
					}

					.ipt-border {
						flex: 1;
						margin-top: 10rpx;
						// border: none;
						height: 25rpx;
						text-indent: 24rpx;
						color: #000;
					}
				}

				.computer-text {
					display: flex;
					position: relative;
					// margin-left: 10rpx;
					align-items: center;
					margin-bottom: 30rpx;

					// color: #d4d4d4;
					.text-icon {
						color: #f00;
						position: absolute;
						font-size: 18rpx;
						top: 16rpx;
						left: 10rpx;
						margin-right: 7rpx;
						z-index: 8;
					}

					.text-cont {
						// flex: 1;
						margin-top: 10rpx;
						// border: none;
						margin-left: 40rpx;
						// text-indent: 24rpx;
						color: #aaaaaa;
					}
				}

			}
		}
</style>
