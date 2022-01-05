/**
 * 接口列表文件
 */
export default {
	// 登录
	user: {
		login: {
			url: '/api/user/login',
			auth: false,
			method: 'POST'
		}
	},
	// 滞纳金
	latefee: {
		detail: {
			url: '/api/latefee/detail',
			auth: true,
			method: 'POST'
		},
		applay_reduction: {
			url: '/api/latefee/applay_reduction',
			auth: true,
			method: 'POST'
		},
		calculation: {
			url: '/api/latefee/calculation',
			auth: true,
			method: 'POST'
		},
		setreply: {
			url: '/api/latefee/setreply',
			auth: true,
			method: 'POST'
		},
		applay_detail: {
			url: '/api/latefee/applay_detail',
			auth: true,
			method: 'POST'
		},
		applay_list: {
			url: '/api/latefee/applay_list',
			auth: true,
			method: 'POST'
		}
	},
	// 藏经阁
	shelf: {
		addShelf: {
			url: '/api/shelf/addShelf',
			auth: true,
			method: 'POST'
		},
		shelfDetail: {
			url: '/api/shelf/shelfDetail',
			auth: false,
			method: 'POST'
		}
	},
	index: {
		index: {
			url: '/api/index/index',
			auth: false,
			method: 'POST'
		},
		//充值
		addorder: {
			url: '/api/recharge/addorder',
			auth: false,
			method: 'POST'
		},
		lawyeredit: {
			url: '/api/auth/lawyeredit',
			auth: false,
			method: 'POST'
		},
		lawyerstips: {
			url: '/api/index/lawyerstips',
			auth: false,
			method: 'POST'
		},

		xieyi2: {
			url: '/api/auth/xieyi2',
			auth: false,
			method: 'POST'
		},
		tips: {
			url: '/api/index/tips',
			auth: false,
			method: 'POST'
		},

		area: {
			url: '/api/index/area',
			auth: true,
			method: 'POST'
		},
		product: {
			url: '/api/index/product',
			auth: false,
			method: 'POST'
		},
		serveArea: {
			url: '/api/index/serveArea',
			auth: false,
			method: 'POST'
		},
		order: {
			url: '/api/index/order',
			auth: true,
			method: 'POST'
		},
		product_price_name: {
			url: '/api/index/product_price_name',
			auth: true,
			method: 'POST'
		},
		addOrder_name: {
			url: '/api/index/addOrder_name',
			auth: true,
			method: 'POST'
		},
		orderDetail: {
			url: '/api/index/orderDetail',
			auth: true,
			method: 'POST'
		},
		cancelOrder: {
			url: '/api/index/cancelOrder',
			auth: true,
			method: 'POST'
		},
		myOrder: {
			url: '/api/index/myOrder',
			auth: true,
			method: 'POST'
		},
		document: {
			url: '/api/index/document',
			auth: true,
			method: 'POST'
		},
		new_order: {
			url: '/api/index/new_order',
			auth: false,
			method: 'POST'
		},
		lawyerDetail: {
			url: '/api/index/lawyerDetail',
			auth: true,
			method: 'POST'
		},
		lawyerFavor: {
			url: '/api/index/lawyerFavor',
			auth: false,
			method: 'POST'
		},
		question: {
			url: '/api/index/question',
			auth: false,
			method: 'POST'
		},
		zanAnswer: {
			url: '/api/index/zanAnswer',
			auth: true,
			method: 'POST'
		},
		addQuestion: {
			url: '/api/index/addQuestion',
			auth: true,
			method: 'POST'
		},
		answer: {
			url: '/api/index/answer',
			auth: true,
			method: 'POST'
		},
		l_getOrder: {
			url: '/api/index/l_getOrder',
			auth: true,
			method: 'POST'
		},
		my_order: {
			url: '/api/index/my_order',
			auth: true,
			method: 'POST'
		},
		u_call_lawyer: {
			url: '/api/index/u_call_lawyer',
			auth: true,
			method: 'POST'
		},
		u_sure_lawyer: {
			url: '/api/index/u_sure_lawyer',
			auth: true,
			method: 'POST'
		},
		lawyer_sure_over: {
			url: '/api/index/lawyer_sure_over',
			auth: true,
			method: 'POST'
		},
		lawyer_sure: {
			url: '/api/index/lawyer_sure',
			auth: true,
			method: 'POST'
		},
		u_sure_lawyer_over: {
			url: '/api/index/u_sure_lawyer_over',
			auth: true,
			method: 'POST'
		},
		isFavor: {
			url: '/api/index/isFavor',
			auth: false,
			method: 'POST'
		},
		receipt: {
			url: '/api/index/receipt',
			auth: true,
			method: 'POST'
		},
		add_receipt: {
			url: '/api/index/add_receipt',
			auth: true,
			method: 'POST'
		},
		del_receipt: {
			url: '/api/index/del_receipt',
			auth: true,
			method: 'POST'
		},
		open_receipt: {
			url: '/api/index/open_receipt',
			auth: true,
			method: 'POST'
		},
		receipt_over: {
			url: '/api/index/receipt_over',
			auth: true,
			method: 'POST'
		},
		change_lawyer: {
			url: '/api/index/change_lawyer',
			auth: true,
			method: 'POST'
		},
		u_remove_lawyer: {
			url: '/api/index/u_remove_lawyer',
			auth: true,
			method: 'POST'
		},
		lawyer_remove: {
			url: '/api/index/lawyer_remove',
			auth: true,
			method: 'POST'
		},
		lawyer_sure_remove: {
			url: '/api/index/lawyer_sure_remove',
			auth: true,
			method: 'POST'
		},
		u_lawyer_remove: {
			url: '/api/index/u_lawyer_remove',
			auth: true,
			method: 'POST'
		},
		case_ident: {
			url: '/api/index/case_ident',
			auth: true,
			method: 'POST'
		},
		change_area: {
			url: '/api/index/change_area',
			auth: true,
			method: 'POST'
		},
		receiptDetail: {
			url: '/api/index/receiptDetail',
			auth: true,
			method: 'POST'
		},
		wx_ali: {
			url: '/api/index/wx_ali',
			auth: false,
			method: 'POST'
		},
		change_stage: {
			url: '/api/index/change_stage',
			auth: true,
			method: 'POST'
		},
		f_getOrder: {
			url: '/api/index/f_getOrder',
			auth: true,
			method: 'POST'
		},
		legal_sure_over: {
			url: '/api/index/legal_sure_over',
			auth: true,
			method: 'POST'
		},
		legal_sure: {
			url: '/api/index/legal_sure',
			auth: true,
			method: 'POST'
		},
		u_call_legal: {
			url: '/api/index/u_call_legal',
			auth: true,
			method: 'POST'
		},
		u_sure_legal: {
			url: '/api/index/u_sure_legal',
			auth: true,
			method: 'POST'
		},
		u_sure_legal_over: {
			url: '/api/index/u_sure_legal_over',
			auth: true,
			method: 'POST'
		},
		legal_cancel: {
			url: '/api/index/legal_cancel',
			auth: true,
			method: 'POST'
		},
		shelf: {
			url: '/api/index/shelf',
			auth: true,
			method: 'POST'
		},
		shelf_detail: {
			url: '/api/index/shelf_detail',
			auth: false,
			method: 'POST'
		},
		user: {
			url: '/api/index/user',
			auth: true,
			method: 'POST'
		},
		ident: {
			url: '/api/index/ident',
			auth: true,
			method: 'POST'
		},
		edit_ident: {
			url: '/api/index/edit_ident',
			auth: true,
			method: 'POST'
		},
		t_sureOrder: {
			url: '/api/index/t_sureOrder',
			auth: true,
			method: 'POST'
		},
		t_sure_remove: {
			url: '/api/index/t_sure_remove',
			auth: true,
			method: 'POST'
		},
		t_sure_h5: {
			url: '/api/index/t_sure_h5',
			auth: true,
			method: 'POST'
		},
		investor: {
			url: '/api/index/investor',
			auth: true,
			method: 'POST'
		},
		del_investor: {
			url: '/api/index/del_investor',
			auth: true,
			method: 'POST'
		},
		add_investor: {
			url: '/api/index/add_investor',
			auth: true,
			method: 'POST'
		},
		contract: {
			url: '/api/index/contract',
			auth: true,
			method: 'POST'
		},
		lawyer_collect: {
			url: '/api/index/lawyer_collect',
			auth: true,
			method: 'POST'
		},
		lawyer_cancel_collect: {
			url: '/api/index/lawyer_cancel_collect',
			auth: true,
			method: 'POST'
		},
		accusation: {
			url: '/api/index/accusation',
			auth: true,
			method: 'POST'
		},
		user_back: {
			url: '/api/index/user_back',
			auth: true,
			method: 'POST'
		},
		lawyer_collect: {
			url: '/api/index/lawyer_collect',
			auth: true,
			method: 'POST'
		},
		lawyer_cancel_collect: {
			url: '/api/index/lawyer_cancel_collect',
			auth: true,
			method: 'POST'
		},
		money: {
			url: '/api/index/money',
			auth: true,
			method: 'POST'
		},
		//我的邀请
		my_invite: {
			url: '/api/index/my_invite',
			auth: true,
			method: 'POST'
		},
		add_list: {
			url: '/api/index/add_list',
			auth: true,
			method: 'POST'
		},
		//邀请码短信邀请
		sms: {
			url: '/api/index/sms',
			auth: true,
			method: 'POST'
		},
		//通过邀请码获取手机号
		my_inviteCode: {
			url: '/api/index/my_inviteCode',
			auth: false,
			method: 'POST'
		},
		//领劵
		add_reg: {
			url: '/api/index/add_reg',
			auth: false,
			method: 'POST'
		},
		lawyer_apply: {
			url: '/api/index/lawyer_apply',
			auth: true,
			method: 'POST'
		},
		lawyer_back: {
			url: '/api/index/lawyer_back',
			auth: true,
			method: 'POST'
		},
		cancel_money: {
			url: '/api/index/cancel_money',
			auth: true,
			method: 'POST'
		},
		investor_addr: {
			url: '/api/index/investor_addr',
			auth: true,
			method: 'POST'
		},
		investor_address: {
			url: '/api/index/investor_address',
			auth: true,
			method: 'POST'
		},
		//新人领劵弹窗
		is_coupon: {
			url: '/api/index/is_coupon',
			auth: true,
			method: 'POST'
		},
		//我的优惠券
		my_coupon: {
			url: '/api/index/my_coupon',
			auth: true,
			method: 'POST'
		},
		cancel_apply: {
			url: '/api/index/cancel_apply',
			auth: true,
			method: 'POST'
		},
		friend_pay: {
			url: '/api/index/friend_pay',
			auth: false,
			method: 'POST'
		},
		virtual_tel: {
			url: '/api/index/virtual_tel',
			auth: true,
			method: 'POST'
		},
		shelf_zan: {
			url: '/api/index/shelf_zan',
			auth: true,
			method: 'POST'
		},
		question_detail: {
			url: '/api/question/question_detail',
			auth: true,
			method: 'POST'
		},
		shelf_upload: {
			url: '/api/shelf/shelf_upload',
			auth: true,
			method: 'POST'
		},
		shelf_reward: {
			url: '/api/shelf/shelf_reward',
			auth: true,
			method: 'POST'
		},
		shelf_log: {
			url: '/api/shelf/shelf_log',
			auth: true,
			method: 'POST'
		},
		able: {
			url: '/api/index/able',
			auth: true,
			method: 'POST'
		},
		change_type: {
			url: '/api/index/change_type',
			auth: true,
			method: 'POST'
		},
		cancel_order: {
			url: '/api/index/cancel_order',
			auth: true,
			method: 'POST'
		},
		user: {
			url: '/api/index/user',
			auth: true,
			method: 'POST'
		},
		get_coupon: {
			url: '/api/index/get_coupon',
			auth: true,
			method: 'POST'
		},
		wx_login: {
			url: '/api/index/wx_login',
			auth: false,
			method: 'POST'
		},
		wx_code: {
			url: '/api/index/wx_code',
			auth: false,
			method: 'POST'
		},
		change_dead: {
			url: '/api/product/change_dead',
			auth: false,
			method: 'POST'
		},
		change_tag: {
			url: '/api/product/change_tag',
			auth: false,
			method: 'POST'
		},
		lawyer_alarm: {
			url: '/api/order/lawyer_alarm',
			auth: false,
			method: 'POST'
		},
		share: {
			url: '/api/product/share',
			auth: false,
			method: 'POST'
		},
		fagui: {
			url: '/api/product/fagui',
			auth: false,
			method: 'POST'
		},
		coupon_share: {
			url: '/api/coupon/coupon_share',
			auth: false,
			method: 'POST'
		},
		get_coupon: {
			url: '/api/coupon/get_coupon',
			auth: false,
			method: 'POST'
		},
		change_wen: {
			url: '/api/index/change_wen',
			auth: false,
			method: 'POST'
		},
		cancel_receipt: {
			url: '/api/receipt/cancel_receipt',
			auth: true,
			method: 'POST'
		},
		evaluate: {
			url: '/api/evaluate/evaluate',
			auth: true,
			method: 'POST'
		},
		order_evaluate: {
			url: '/api/evaluate/order_evaluate',
			auth: true,
			method: 'POST'
		},
		evaluate_list: {
			url: '/api/evaluate/evaluate_list',
			auth: false,
			method: 'POST'
		},
		evaluate_zan: {
			url: '/api/evaluate/evaluate_zan',
			auth: true,
			method: 'POST'
		},
		u_cancel_sure_lawyer: {
			url: '/api/order/u_cancel_sure_lawyer',
			auth: true,
			method: 'POST'
		},
		u_cancel_remove_lawyer: {
			url: '/api/order/u_cancel_remove_lawyer',
			auth: true,
			method: 'POST'
		},
		lawyer_cancel: {
			url: '/api/order/lawyer_cancel',
			auth: true,
			method: 'POST'
		},
		lawyer_cancel_remove: {
			url: '/api/order/lawyer_cancel_remove',
			auth: true,
			method: 'POST'
		},
		change_offer: {
			url: '/api/product/change_offer',
			auth: true,
			method: 'POST'
		},
		get_offer: {
			url: '/api/product/get_offer',
			auth: true,
			method: 'POST'
		},
		add_shelf: {
			url: '/api/shelf/add_shelf',
			auth: true,
			method: 'POST'
		},
		money_Log: {
			url: '/api/index/money_Log',
			auth: true,
			method: 'POST'
		},
		selects: {
			url: '/api/product/selects',
			auth: false,
			method: 'POST'
		},
		notice: {
			url: '/api/notice/notice',
			auth: false,
			method: 'POST'
		},
		read_notice: {
			url: '/api/notice/read_notice',
			auth: false,
			method: 'POST'
		},
		get_mobile: {
			url: '/api/index/get_mobile',
			auth: false,
			method: 'POST'
		},
		serveArea: {
			url: '/api/index/serveArea',
			auth: false,
			method: 'POST'
		},
		withdraw: {
			url: '/api/index/withdraw',
			auth: true,
			method: 'POST'
		},
		yewu: {
			url: '/api/auth/yewu',
			auth: true,
			method: 'POST',
			//业务专长列表
		},
		lawyer: {
			url: '/api/auth/lawyer',
			auth: true,
			method: 'POST',
			//律师认证
		},
		xieyi: {
			url: '/api/auth/xieyi',
			auth: false,
			method: 'POST',
			//协议
		},
		lawyerdetail: {
			url: '/api/auth/lawyerdetail',
			auth: false,
			method: 'POST',
			//认证状态
		},
		touziren: {
			url: '/api/auth/touziren',
			auth: true,
			method: 'POST',
			//认证状态
		},

		touzirendetail: {
			url: '/api/auth/touzirendetail',
			auth: true,
			method: 'POST',
			//认证状态
		},
		fawu: {
			url: '/api/auth/fawu',
			auth: true,
			method: 'POST',
			//认证状态
		},
		fawudetail: {
			url: '/api/auth/fawudetail',
			auth: true,
			method: 'POST',
			//认证状态
		},
		indexcase: {
			url: '/api/cases/index',
			auth: true,
			method: 'POST',
			//领域列表
		},
		savacase: {
			url: '/api/cases/savacase',
			auth: true,
			method: 'POST',
			//诉讼案例上传
		},
		caselists: {
			url: '/api/cases/lists',
			auth: true,
			method: 'POST',
			//诉讼案例上传
		},
		act: {
			url: '/api/cases/act',
			auth: true,
			method: 'POST',
			//点赞转发收藏
		},
		delup: {
			url: '/api/cases/delup',
			auth: true,
			method: 'POST',
			//点赞转发收藏
		},
		delfav: {
			url: '/api/cases/delfav',
			auth: true,
			method: 'POST',
			//点赞转发收藏
		},
		casesdetail: {
			url: '/api/cases/detail',
			auth: false,
			method: 'POST',
			//点赞转发收藏
		}
	}
};
