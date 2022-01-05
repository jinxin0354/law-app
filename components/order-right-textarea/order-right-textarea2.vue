<template>
	<view class="right-textarea">
		<textarea
			auto-height="true"
			class="textarea"
			placeholder-class="placeholder"
			maxlength="45"
			:focus="isFocus"
			:placeholder="placeholderTxt"
			v-model="requirement_copy"
			@blur="isFocus = false"
			@input="descInput"
		/>
		<view>{{ txtVal }}/500</view>
		<!-- <div class="applyInput cb mt3">
			<textarea placeholder="请输入" maxlength="500" @input="descInput" v-model="desc" />
			<span class="numberV">{{ txtVal }}/500</span>
		</div> -->
		<view class="textarea-tip">
			<view class="image-wrapper" @click="change"><image src="@/static/img/why.png" mode="aspectFit"></image></view>
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
			desc: ''
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

<style></style>
