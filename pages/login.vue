<template>
	<view class="content">
		<view class="login-box">
			<input type="text" v-model="username_client" placeholder="请输入用户名" class="login-ipt" />
			<input type="password" v-model="password_client" placeholder="请输入密码" class="login-ipt" />
			<view class="ok-box"><button type="default" class="ok-btn" @click="login('client')">登录</button></view>
		</view>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
	</view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			username_client: '18820268653',
			password_client: '123456'
		};
	},
	onLoad() {},
	methods: {
		...mapMutations(['in_login']),
		login(type) {
			let account = '';
			let password = '';

			account = this.username_client;
			password = this.password_client;

			let formData = {
				account,
				password
			};
			this.$api('user.login', formData).then(res => {
				if (res.code == 1) {
					uni.setStorageSync('token', res.data.userinfo.token);
					this.in_login(res.data.userinfo);
					this.jump('/', { from: 'login'});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.content {
	padding: 30rpx;
	background-color: #ffffff;
}
.login-ipt {
	border: 1rpx solid #eeeeee;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #ffffff;
	margin-bottom: 30rpx;
	border-radius: 40rpx;
	box-sizing: border-box;
	padding: 10rpx 30rpx;
}
.ok-box {
	padding: 0;
	.ok-btn {
		margin-bottom: 20rpx;
	}
}
.login-box {
	margin-bottom: 100rpx;
}
</style>
