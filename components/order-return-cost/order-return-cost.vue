<template>
	<uni-popup ref="returnCost" type="center">
		<order-popup-common title="结算投资人奖励" @closePop="closePop('returnCost')">
			<view slot="popup-con" >
				<scroll-view scroll-y="" style="max-height: 570px;">
					<view class="flex flex-vertical" style="padding: 0 16px;">
						<view class="flex flex-horizontal flex-center-v">
							<text class="font-15">付款人</text>
							<text class="font-15" style="margin-left: 75px;">投资人</text>
						</view>
						<view class="flex flex-horizontal flex-center-v" style="margin-top: 20px;">
							<text class="font-15">投资人收益金额<text style="color: red;">*</text></text>
							<text style="margin-left: 10px;">¥</text>
							<view class="input-b">
								<input class="why-ipt" type="number" v-model="money" placeholder="投资人此次收到多少钱" placeholder-class="placeholder" />
							</view>
						</view>
						<text class="font-15" style="margin-top: 30px;">委托人回款的银行流水<text style="color: red;">*</text></text>
						<!-- <upload-add-list :list="proof" @change="listChange($event,'proof')"></upload-add-list> -->
						<upload-add-list :list="proof" @change="listChangeProof"></upload-add-list>
						<!-- 
						<view class="arrow-right" style="margin-top: 10px;"  @click="$refs.uploadAdd.$refs.popupAdd.open()">
							<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 100px;height: 100px;"></image>
						</view> -->
						<text class="font-15" style="margin-top: 30px;">委托人向投资人支付投资收益的付款记录<text style="color: red;">*</text></text>
						<!-- <upload-add-list :list="image" @change="listChangeImage($event,'image')"></upload-add-list> -->
						<upload-add-list :list="image" @change="listChangeImage"></upload-add-list>
						
						<!-- 
						<view class="arrow-right" style="margin-top: 10px;"  @click="$refs.uploadAdd.$refs.popupAdd.open()">
							<image  src="@/static/img/icon/icon_upload.png" mode="aspectFit" style="width: 100px;height: 100px;"></image>
						</view> -->
						<view class="flex flex-horizontal flex-center-v" style="margin-top: 24px;">
							<text class="font-15">您的奖励金额<text style="color: red;">*</text></text>
							<text style="margin-left: 10px;">¥</text>
							<view  class="">
								<input class="why-ipt font-13" type="number" v-model="price" disabled="" placeholder="投资人收益金额x10%" placeholder-class="placeholder" />
							</view>
						</view>
						<text class="flex flex-self-center" style="margin-top: 30px;">我已与投资人核对了奖励金额</text>
						<button class="ok-btn button flex flex-center"  @click="confirm">
							我要结算
						</button>
					</view>
				</scroll-view>
			</view>
		</order-popup-common>
	</uni-popup>
</template>

<script>
export default {
	props: ['orderId'],
	data() {
		return {
			money: '',//收益金额
			proof: [],//银行流水
			image: [],//付款记录
			price: '',//奖励金额
		};
	},
	created() {
		
	},
	watch:{
		money(){
			if(this.money){
				this.price = Number(this.money * 0.1).toFixed(2)
			} else {
				this.price = ""
			}
		}
	},
	methods: {
		listChange(e,type) {
			this[type] = e
		},
		listChangeProof(e){
			this.proof = e
		},
		listChangeImage(e) {
			this.image = e
		},
		getUrlParams(list) {
			let newArr = []
			list.filter(e=>{
				newArr.push(e.url)
			})
			return newArr.join(',')
		},
		async confirm(){
			// TODO银行流水和付款记录
			let formData = {
				id: this.orderId,
				token: uni.getStorageSync('token'),
				money: this.money,
				proof: this.getUrlParams(this.proof) ,
				image: this.getUrlParams(this.image),
				price: this.price,
				type:3
			};
			
			let res = await this.$api('index.money', formData);
			if (res.code == 1) {
				this.closePop('returnCost')
				// let pages = getCurrentPages();
				// let prevPage = pages[pages.length - 2];
				// prevPage.$vm.init();
				// uni.navigateBack({
				// 	delta: 1
				// });
			}
		}
	}
};
</script>

<style>
	.button {
		width: 180px;
		margin-top: 23px;
		margin-bottom: 21px;
		border-radius: 19px;
		height: 38px;
	}
	.input-b{
		border-bottom: 1px solid #000000;
		width: 150px;
	}
</style>

<style lang="scss"></style>
