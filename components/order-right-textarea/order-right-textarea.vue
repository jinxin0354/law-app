<template>
	<view class="right-textarea">
		<view class="textarea-left">
			<textarea
				ref="orderTextarea"
				:focus="isFocus"
				class="textarea"
				:placeholder="placeholderTxt"
				placeholder-class="placeholder"
				v-model="requirement_copy"
				@blur="
					isFocus = false;
					seHeight = false;
				"
				maxlength="30"
				@input="descInput"
				@click="seHeight = true"
				:class="seHeight == true ? 'myHeight' : ''"
			/>
			<!-- <view class="word-num" v-if="seHeight == true">{{ txtVal }}/30</view> -->
		</view>
		 <view class="textarea-tip">
			<view class="image-wrapper" @click="change"><image src="@/static/img/edit-icon.png" mode="aspectFit"></image></view>
			<view class="tip-demo" v-if="isFocus">
				<view style="font-weight: bold; font-size: 28rpx; ">范例</view>
				<view>我要陈冠希还我借款200元</view>
				<view>我要彭于晏赔偿我人身损害费300元</view>
				<view>我要阿里巴巴给我货款30万元</view>
				<view>我要与林志玲离婚，要抚养权，分财产</view>
				<view>柳岩告我，要我赔偿精神损失费，没有道理，要求打赢</view>
			</view>
		</view> 
	</view>
</template>

<script>
export default {
	props: {
		requirement: {
			type: String,
			default: ''
		},
		placeholderTxt: {
			type: String,
			default: '您要律师帮您实现什么结果'
		}
	},
	data() {
		return {
			requirement_copy: '',
			isFocus: false,
			txtVal: 0,
			seHeight: false
		};
	},
	created() {
		this.requirement_copy = this.requirement;
	},
	destroyed() {},
	mounted() {},
	methods: {
		change() {
			this.isFocus = !this.isFocus;
		},
		descInput() {
			this.txtVal = this.requirement_copy.length;
		}
	}
};
</script>

<style lang="scss">
.word-num {
	position: absolute;
	right: 100;
	bottom: 100;
	color: #AAAAAA;
	line-height: 60rpx;
}
.textarea {
	height: 60rpx !important;
}
.myHeight {
	height: 120rpx !important;
}
</style>
