<template>
	<view class="content">
		<view class="match-top-box">
			<view class="match-title">尊敬的委托人：</view>
			<view class="match-txt">
				您好！{{ infoLawyer.address }}{{ infoLawyer.lawyer }}律师很荣幸接受您的委托，我们将全心全意为您提供优质的服务！感谢您的信任与支持！</view>
			<view class="match-title">
				温馨提示：
				<text class="title-open blue" @click="isTipShow = !isTipShow">
					<template v-if="isTipShow">
						收起
					</template>
					<template v-else>
						展开
					</template>
				</text>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper">
						<image src="@/static/img/warning.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="txt-right green">请先联系律师帮您审查案件的胜诉率，再让律师向投资人申请投资费用。</view>
			</view>
			<view class="match-image-txt">
				<view class="txt-left">
					<view class="image-wrapper">
						<image src="@/static/img/warning.png" mode="aspectFit"></image>
					</view>
				</view>
				<view class="txt-right green">请到法力app“办公”页面的群聊里，查看办案全流程，与律师沟通，跟进律师工作，考核办案质量。</view>
			</view>
			<template v-if="isTipShow">
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">请联系律师在其法力app上，点击“申请投资费用”按钮，代您向投资人申请支付案件受理费、公告费、异地被告身份证明查询费及律师费。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">在您回收款物后5日内，请点击“付款给投资人”按钮，向投资人支付投资收益，避免产生迟延支付滞纳金。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">
						进入法院执行程序后，请联系律师将投资人追加为共同申请执行人，并将追加投资人为申请执行人的《民事裁定书》交给投资人。投资人享有法院裁判文书中确定的债权金额的30％。
					</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">案件办结后，请联系律师快递案件的相关材料给投资人，以免造成违约产生赔偿责任。</view>
				</view>
				<view class="match-image-txt">
					<view class="txt-left">
						<view class="image-wrapper">
							<image src="@/static/img/warning.png" mode="aspectFit"></image>
						</view>
					</view>
					<view class="txt-right green">请详细阅读律师给您的委托代理合同。</view>
				</view>
				<view class="match-image-txt" v-if="info.order.pro_name == '打官司'">
					<view class="txt-left">
					</view>
					<view class="txt-right green">如有疑问，请联系您的律师帮您处理。</view>
				</view>
			</template>
			<view class="service-list">
				<button class="service-item active" @click="$refs.telephoneLawyer.$refs.popupTel.open()">联系律师</button>
				<button class="service-item active"
					@click="$refs.telephoneInvestor.$refs.popupTel.open()">联系投资人</button>
				<template>
					<button class="service-item active" @click="navToProDetail(info.order.project_id)">项目详情</button>
				</template>
				<button class="service-item active"
					@click="jump('/pages/client/user/invoice', { order_id: order_id, isInvestor: true })">开发票</button>
				<button class="service-item active" @click="$refs.payToInvestor.open()">付款给投资人</button>
				<button class="service-item active"
					@click="$refs.investInboxMessage.$refs.popupInbo.open()">投资人收件信息</button>
				<button class="service-item active" @click="$refs.investContact.$refs.popupBond.open()">债权投资合同</button>
				<button class="service-item active"
					:disabled="isClientServiceOk || isLawyerServiceOk || disableServiceOk"
					@click="$refs.popupServiceOk.open">服务完成</button>
				<button class="service-item active" @click="removeEntrust"
					:disabled="isClientRemoveEntrust || isLawyerRemoveEntrust || disableRemoveEntrust">解除委托</button>
				<button class="service-item active" style="width: 100%; margin-right: 0;"
					v-if="!isTimeOver && remainTime" @click="$refs.orderChangeLawyer.$refs.popupChangeLawyer.open()">
					<uni-countdown :show-day="false" :hour="remainTime.hour" :minute="remainTime.minute"
						:second="remainTime.second" color="#f00" splitorColor="#f00" backgroundColor="#FFC801"
						@timeup="timeup"></uni-countdown>
					无理由更换律师
				</button>
				<button class="service-item active" v-if="isClientServiceOk & !isLawyerServiceOk"
					style="width: 100%; margin-right: 0;" @click="$refs.telephoneLawyer.$refs.popupTel.open()">
					催促律师确认完成
				</button>
				<button class="service-item active" v-if="isClientServiceOk" style="width: 100%; margin-right: 0;"
					@click="$refs.telephoneInvestor.$refs.popupTel.open()">
					催促投资人确认完成
				</button>
				<button class="service-item active" v-if="isClientRemoveEntrust & !isLawyerRemoveEntrust"
					style="width: 100%; margin-right: 0;" @click="$refs.telephoneLawyer.$refs.popupTel.open()">
					催促律师确认解除
				</button>
				<button class="service-item active" v-if="isClientRemoveEntrust" style="width: 100%; margin-right: 0;"
					@click="$refs.telephoneInvestor.$refs.popupTel.open()">
					催促投资人确认解除
				</button>
			</view>
			<template v-if="isLawyerRemoveEntrust && !isClientRemoveEntrust">
				<view class="service-list">
					<button class="service-item active flex1"
						@click="$refs.popupSureRemoveEntrust.open()">确认解除委托</button>
					<button class="service-item active flex1" style="margin-right: 0;"
						@click="$refs.popupNoSureRemoveEntrust.open()">不确认解除委托</button>
				</view>
			</template>
			<template v-if="isLawyerServiceOk && !isClientServiceOk">
				<view class="service-list">
					<button class="service-item active flex1" @click="$refs.popupSureServiceOk.open()">确认服务完成</button>
					<button class="service-item active flex1" style="margin-right: 0;"
						@click="$refs.popupNoSureServiceOk.open()">不确认服务完成</button>
				</view>
			</template>
		</view>
		<!-- 待付信息 -->
		<order-wait-pay-info v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-wait-pay-info>
		<!-- 付款详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.pay_text" title="付款详情"
			:info="info"></order-common-detail>
		<!-- 待付结算投资收益 -->
		<order-wait-pay-investor-settle-accounts v-if="Object.keys(info.order).length > 0" :info="info" @init="init">
		</order-wait-pay-investor-settle-accounts>
		<!-- 结算投资收益详情 -->
		<order-common-detail v-if="Object.keys(info.order).length > 0" :detailLIst="info.order.jie_pay" title="结算投资收益"
			:info="info"></order-common-detail>
		<!-- 发票列表组件-->
		<order-invoice-list v-if="Object.keys(info.order).length > 0" :info="info" @init="init"></order-invoice-list>
		<!-- 律师简介 -->
		<order-lawyer-intro v-if="Object.keys(infoLawyer).length > 0" :infoLawyer="infoLawyer"
			:random="new Date().getTime()"></order-lawyer-intro>
		<!-- 案件主体信息 -->
		<order-case :info="info" :key="new Date().getTime() + 'case'" v-if="info.order.pro_name == '打官司'"></order-case>
		<!-- 订单详情  -->
		<order-detail ref="orderAllDetail" :info="info.order"></order-detail>
		<!-- 解除委托-未付款弹出层 -->
		<uni-popup ref="popupRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" title="" okTxt="我知道了" cancleTxt="" content="" :before-close="true"
				@confirm="closePop('popupRemoveEntrust')">
				<view class="warm-tip-box">
					<view class="warm-tip-item">为保障您及您好友推荐本平台应得的奖励，请按照以下流程解除和退款：</view>
					<view class="warm-tip-item">
						<view class="item-left">1</view>
						<view class="item-right">在本平台“办公”→“信息”→本订单“委托人协作团队”群聊里，与律师确定解除和退款事宜，保留聊天记录；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">2</view>
						<view class="item-right">在“待付信息”里，付清剩余律师费用；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">3</view>
						<view class="item-right">再次点击“解除委托”按钮，发起解除；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">4</view>
						<view class="item-right">联系律师，确认解除委托；</view>
					</view>
					<view class="warm-tip-item">
						<view class="item-left">5</view>
						<view class="item-right">律师确认后，您将进入“服务解除”页面。如需退款的，可在该页面点击“申请退款”按钮办理。</view>
					</view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 解除委托-已付款弹出层 -->
		<uni-popup ref="popupEntrustOk" type="dialog">
			<!-- <uni-popup-dialog
				type="info"
				title=""
				okTxt="是"
				cancleTxt="否"
				content="我已与律师、投资人确认解除委托1"
				:before-close="true"
				@confirm="confirmEntrustOk"
				@close="closePop('popupEntrustOk')"
			></uni-popup-dialog> -->
			<uni-popup-dialog type="info" title="解除委托" okTxt="确认" cancleTxt="取消" :showClose="true" :before-close="true"
				@confirm="confirmReason" @close="closePop('popupEntrustOk')">
				<view class="dialog-tip">解除原因</view>
				<textarea placeholder="把解除原因告诉律师吧，让律师改进工作！" :focus="true" placeholder-class="placeholder"
					class="dialog-textarea" v-model="reason" />
				<view class="dialog-tip" style="margin-top: 10rpx;">我已与律师、投资人确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 解除委托-原因弹出层 -->
		<uni-popup ref="popupReason" type="dialog">
			<uni-popup-dialog type="info" title="解除委托" okTxt="确认" :showClose="true" :before-close="true"
				@confirm="confirmReason">
				<view class="dialog-tip">解除原因</view>
				<textarea placeholder="把解除原因告诉律师吧，让律师改进工作！" :focus="true" placeholder-class="placeholder"
					class="dialog-textarea" v-model="reason" />
			</uni-popup-dialog>
		</uni-popup>
		<!-- 确认解除委托弹出层 -->
		<uni-popup ref="popupSureRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" :before-close="true"
				@confirm="sureRemoveEntrust(1, 'popupSureRemoveEntrust')" @close="closePop('popupSureRemoveEntrust')">
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view class="dialog-tip-line">我确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认解除委托弹出层 -->
		<uni-popup ref="popupNoSureRemoveEntrust" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" :before-close="true"
				@confirm="sureRemoveEntrust(2, 'popupNoSureRemoveEntrust')"
				@close="closePop('popupNoSureRemoveEntrust')">
				<view class="dialog-tip">解除委托原因：</view>
				<view class="dialog-tip">{{ info.order.lawyer_remove }}</view>
				<view class="dialog-tip-line">我不确认解除委托</view>
			</uni-popup-dialog>
		</uni-popup>
		<!-- 服务完成弹出层 -->
		<uni-popup ref="popupServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我已与律师、投资人确认服务完成" :before-close="true"
				@confirm="confirmServiceOk" @close="closePop('popupServiceOk')"></uni-popup-dialog>
		</uni-popup>
		<!-- 确认服务完成弹出层 -->
		<uni-popup ref="popupSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(1, 'popupSureServiceOk')" @close="closePop('popupSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 不确认服务完成弹出层 -->
		<uni-popup ref="popupNoSureServiceOk" type="dialog">
			<uni-popup-dialog type="info" okTxt="是" cancleTxt="否" content="我不确认服务已经完成" :before-close="true"
				@confirm="sureServiceOk(2, 'popupNoSureServiceOk')" @close="closePop('popupNoSureServiceOk')">
			</uni-popup-dialog>
		</uni-popup>
		<!-- 付款给投资人弹出层 -->
		<uni-popup ref="payToInvestor" type="center">
			<scroll-view scroll-top="0" scroll-y="true">
				<service-popup-statement title="结算收益" btnText="我要结算" @closePop="closePop('payToInvestor')"
					@confirmPay="confirmPayToInvestor">
					<template slot="payOption">
						<view class="flex-item">
							<!-- 委托人案子以什么方式处理得 -->
							<view class="od-item flex-item-i">
								<view class="flex-item-lable">
									<view class="ico"></view>
									<view class="require text">您的案子以什么方式处理的</view>
								</view>
								<view class="item-right">
									<view class="service-list">
										<view class="service-item flex1"
											:class="moneyparams.chuli_type == '法院判决' ? 'active' : ''"
											@click="moneyparams.chuli_type = '法院判决'">法院判决</view>
										<view class="service-item flex1"
											:class="moneyparams.chuli_type == '和解/调解' ? 'active' : ''"
											@click="moneyparams.chuli_type = '和解/调解'">和解/调解</view>
										<view class="service-item flex1"
											:class="moneyparams.chuli_type == '其他方式' ? 'active' : ''"
											@click="moneyparams.chuli_type = '其他方式'">其他方式</view>
									</view>
								</view>
							</view>
							<!-- 委托人主张的欠款本金有多少获得支持 -->
							<view class="od-item flex-item-i">
								<view class="flex-item-lable">
									<view class="ico"></view>
									<view class="require ">您主张的欠款本金有多少获得支持</view>
								</view>
								<view class="item-right">
									<view class="service-list">
										<view class="service-item flex1"
											:class="moneyparams.chuli_money == '全部支持' ? 'active' : ''"
											@click="moneyparams.chuli_money = '全部支持'">全部支持</view>
										<view class="service-item flex1"
											:class="moneyparams.chuli_money == '部分支持' ? 'active' : ''"
											@click="moneyparams.chuli_money = '部分支持'">部分支持</view>
										<view class="service-item flex1"
											:class="moneyparams.chuli_money == '全部不支持' ? 'active' : ''"
											@click="moneyparams.chuli_money = '全部不支持'">全部不支持</view>
									</view>
								</view>
							</view>
							<!-- 第二部分输入框计算内容 -->
							<view v-for="(item,index) in swit_flg(moneyparams.chuli_money)" class="od-item flex-item-i">
								<view class="flex-item-lable">
									<view class="ico"></view>
									<!-- swit_flg(moneyparams.chuli_money)[0] -->
									<view v-if="index==0" class="require">{{item}}
									</view>
									
									<view v-if="index==1" class="adi-symbol">
										<view class="adi">{{item}}</view>
										<view @click="$refs.direc.open('center')" class="symbol"></view>
									</view>
									
									<!-- <view class="require">委托人这次收回了多少钱</view> -->
								</view>
								<view v-if="moneyparams.chuli_money == '全部不支持'" style="color: #d4d4d4;">(包括欠款本金、利息/违约金、立案受理费、律师费等)</view>
								
								<view class="item-right" v-if="index==0">
									<view  class="item-txt">
										<text class="input_icon">¥</text>
										<input type="number" class="ipt-border" placeholder="输入金额" placeholder-class="placeholder" v-model="moneyparams.money" />
									</view>
									<!-- <view  class="ipt-border">
										<text class="input_icon">¥</text>
										<text  v-if="!moneyparams.price" > 待计算</text>
										<text v-else class=""> {{moneyparams.price*0.3}}</text>
									</view> -->
								</view>
								<view class="item-right" v-if="index==1">
									<view  class="computer-text">
										<text class="text-icon">¥</text>
										<view class="text-cont">
											<text  v-if="!moneyparams.price" > 待计算</text>
											<text v-else class=""> {{moneyparams.price*0.3}}</text>
										</view>
									</view>
								</view>
							</view>
							<!-- <view class="od-item marginbottom10">
							<view class="item-tip require">回款凭证</view>
							<view class="item-right">
								<view class="item-txt gray">请上传您回款的银行流水</view>
								<view class="item-nav"><image src="@/static/img/right.png" mode="aspectFit"></image></view>
							</view>
						</view> -->

						</view>
						<!-- 第三部分部分支持 修改 -->
						<view v-if="moneyparams.chuli_money =='部分支持'" class="flex-item" style="margin-top: 15rpx;">
							<view v-for="(item,index) in swit_flg1(moneyparams.chuli_type)" class="od-item flex-item-i">
								<view class="flex-item-lable">
									<view class="ico"></view>
									<view v-if="index<1" class="require">{{item}}</view>
									<view v-if="index==1" ><text>{{item}}</text>
									<text class="red">*</text></view>
									<view v-else-if="index==2" >{{item}}</view>
									<view v-else-if="index==3" class="adi-symbol">
										<view class="adi">{{item}}</view>
										<view @click="$refs.direc.open('center')" class="symbol"></view>
									</view>
									
								</view>
								<view class="item-right">
									<view class="item-right" v-if="index>=2">
										<view  class="computer-text">
											<text class="text-icon">¥</text>
											<view class="text-cont" v-if="index==2">
												<text  v-if="!moneyparams.price" style="color: #000000;" >999</text>
												<text v-else class=""> {{}}</text>
											</view>
											<view class="text-cont" v-if="index==3">
												<text  v-if="!moneyparams.price" > 待计算</text>
												<text v-else class=""> {{moneyparams.price*0.3}}</text>
											</view>
										</view>
									</view>
									<view v-else class="item-txt">
										<text class="input_icon">¥</text>
										<input  type="number" class="ipt-border" placeholder="输入金额"
											placeholder-class="placeholder" v-model="moneyparams.money" />
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
										<view class="adi">您逾期付款的违约金*(如无,请填写0)</view>
										<view @click="$refs.direc.open('center')" class="symbol">
										</view>
									</view>
								</view>
								<view class="item-right">
									<view class="item-txt" style="margin-bottom: 30rpx;">
										
										<text class="input_icon red1">¥</text>
										<input type="number" class="ipt-border" placeholder="输入金额"
											placeholder-class="placeholder" v-model="moneyparams.weiyue_money" />
											
									</view>
								</view>
							</view>
						</view>

						<!-- <view class="od-item marginbottom10">
							<view class="item-tip require">付款事由</view>
							<view class="item-right">
								<view class="item-txt flex">
									第
									<input type="number" class="ipt-border" placeholder-class="placeholder" placeholder="" v-model="payToInvestorInfo.origin" style="width: 100rpx;" />
									次回款支付投资收益
								</view>
							</view>
						</view> -->
						<!-- <template></template> -->

						<!-- 	<template v-else-if="moneyNature == '其他费用'">
						<view class="od-item marginbottom10">
							<view class="item-tip require">付款金额</view>
							<view class="item-right">
								<view class="item-txt">
									<input type="number" class="ipt-border" placeholder="委托人这次收回的钱×30%" placeholder-class="placeholder" v-model="payToInvestorInfo.price" />
								</view>
							</view>
						</view>
						<view class="od-item marginbottom10">
							<view class="item-tip require">付款事由</view>
							<view class="item-right">
								<view class="item-txt flex">
									第
									<input type="number" class="ipt-border" placeholder-class="placeholder" placeholder="" v-model="payToInvestorInfo.origin" style="width: 100rpx;" />
									次回款支付投资收益
								</view>
							</view>
						</view>
					</template> -->
					</template>
					<template slot="payOption2">
						<view class="flex-item-i">
							<!-- <uni-data-checkbox value='[1]' multiple>我已与委托人确认付款金额</uni-data-checkbox> -->
							<view @click="flg_check=!flg_check" class="checkbox-style" >
								<view class="check-style">
									<view :class="flg_check?'check-style1':''">
										
									</view>
								</view>
								<!-- <checkbox value="" color="#ffca00" class="check-style" /> -->
								我已与委托人确认付款金额
							</view>
						</view>
					</template>

				</service-popup-statement>
			</scroll-view>
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
							<view class="blod">您这次应付投资收益</view>
						</view>
						<view class="item-right">
							<view class="item-txt">
								<text class="input_icon">¥</text>
								<text class="text_icon">您这次收回的钱x30%</text>
							</view>
						</view>
					</view>
					<view class="od-item flex-item-i">
						<view class="flex-item-lable">
							<view class="ico"></view>
							<view class="blod">您应付的投资费用损失为</view>
						</view>
						<view class="item-right">
							<view class="item-txt">
								<view class="bt1">法院判决时适用</view>
								<view class="dl1">
									<text class="input_icon">¥</text>
									<view class="text_icon">(您原来主张的欠款本金-法院判决支持的欠款本金)÷您原来主张的欠款本金×投资人已支付的投资费用</view>
								</view>
							</view>
							<view class="item-txt">
								<view class="bt1">和解/调解时适用</view>
								<view class="dl1">
									<text class="input_icon">¥</text>
									<view class="text_icon">(您原来主张的欠款本金-和解时欠款方同意偿还的欠款本金)÷您原来主张的欠款本金×投资人已支付的投资费用</view>
								</view>
							</view>
						</view>
					</view>
					<view class="od-item flex-item-i">
						<view class="flex-item-lable">
							<view class="ico"></view>
							<view class="">您逾期付款的违约金</view>
						</view>
						<view class="item-right">
							<view class="item-txt">
								<text class="input_icon">¥</text>
								<text class="text_icon">您未付款金额×万分之六×逾期天数</text>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</uni-popup>

		<!-- 打电话组件 -->
		<order-telephone name="委托人" :phoneNumber="info.order.user_mobile" ref="telephoneClient"
			v-if="info.order.user_mobile"></order-telephone>
		<order-telephone name="律师" :phoneNumber="info.order.lawyer_mobile" ref="telephoneLawyer"
			v-if="info.order.lawyer_mobile"></order-telephone>
		<order-telephone name="投资人" :phoneNumber="info.order.investor_mobile" ref="telephoneInvestor"
			v-if="info.order.investor_mobile"></order-telephone>
		<!-- 债券投资合同组件-->
		<order-invest-contact ref="investContact"></order-invest-contact>
		<!-- 投资人收件信息组件 -->
		<order-invest-inbox-message ref="investInboxMessage" :infoInbo="infoInbo"></order-invest-inbox-message>
		<!-- 无理由更换律师组件 -->
		<order-change-lawyer ref="orderChangeLawyer" v-if="Object.keys(info.order).length > 0" :info="info">
		</order-change-lawyer>
		<!-- 全局通用组件 -->
		<law-common ref="lawCommon"></law-common>
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
					price: "",
					weiyue_money: ""
				},
				flg_check:false
			};
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
			close() {
				this.$refs.direc.close()
			},
			swit_flg(n2) {
				n2 = n2 != '全部不支持' ? '1' : '0'

				let obj = {
					'0': ['您起诉金额总和是多少', '您应付的投资收益损失为'],
					'1': ['您这次收回了多少钱', '您这次应付投资收益']
				}
				return obj[n2]
			},
			swit_flg1(n) {
				console.log(n);
				let str ='您与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
				switch (n) {
					case '法院判决':
						str = '法院判决支持的欠款本金金额是多少'
						break;
					case '和解/调解':
						str = '您与欠款方和解时,欠款方同意偿还的欠款本金金额是多少'
						// n=1;
						break;
					case '其他方式':
						n = 2;
						break;
					default:
						console.log(4);
						break;
				}
				let arr = [
					'您原来主张的欠款本金金额是多少',
					str,
					'投资人已支付的费用',
					 '您应付的投资费用损失为'
				]
				return arr
			},
			async init() {
				let formData = {
					id: this.order_id,
					token: uni.getStorageSync('token')
				};
				let res = await this.$api('index.orderDetail', formData);
				this.info = res.data;
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
	.checkbox-style{
		// transform: scale(0.7);
		display: flex;
		align-items: center;
		// margin-top: 25rpx;
		align-content: center;
		.check-style{
			width: 30rpx;
			height: 30rpx;
			border: 1rpx solid #6b6b6b;
			position: relative;
			margin-right:9rpx;
			margin-top: 4rpx;
			// padding: 0.4rpx;
			border-radius: 50%;
			.check-style1{
				position: absolute;
				top: 3rpx;
				left: 3rpx;
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
					// margin-left: 19rpx;
					// align-content: center;
					//付款文字样式
					.input_icon {
						position: absolute;
						font-size: 18rpx;
						top: 8rpx;
						left: 19rpx;
						z-index: 8;
					}
					.ipt-border {
						flex: 1;
						margin-top: 10rpx;
						// border: none;
						height: 25rpx;
						text-indent: 30rpx;
						color: #d4d4d4;
					}
				}
				.computer-text{
					display: flex;
					position: relative;
					// margin-left: 10rpx;
					align-items: center;
					margin-bottom:30rpx;
					// color: #d4d4d4;
					.text-icon{
						color: #f00;
						position: absolute;
						font-size: 18rpx;
						top: 12rpx;
						left: 19rpx;
						margin-right: 7rpx;
						z-index: 8;
					}
					.text-cont{
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
	}
.red1{
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
			.flex-item-lable {

				// margin-top:20rpx;
				.blod {
					font-weight: bold;
					// margin-top: 10rpx;
					margin-bottom: 10rpx;
				}
			}

			.item-right {
				margin-top: 10rpx;
				margin-bottom: 20rpx;
				color: #848484;
			}
		}

		.item-right {
			.item-txt {
				// color: red;
				margin-left: 19rpx;

				// margin-bottom: 20rpx;
				// margin-top: 10rpx;
				.dl1 {
					display: flex;

				}

				// z-index: 7rpx;
			}

			.input_icon {
				margin-left: 7rpx;
			}

			.text_icon {
				margin-left: 10rpx;
			}
		}


	}

.radio{
				width: 25rpx;
				height: 25rpx;
			}
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
				background: url(../../../static/img/question.png);
				background-size: cover;
				width: 30rpx;
				height: 30rpx;
			}
		}

	}



	//下半部分圆角矩形
	
</style>
