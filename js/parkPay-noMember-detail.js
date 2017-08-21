var opt = sessionStorage.getItem('opt');
var o = JSON.parse(opt);
var outtime = 300;
var preExitTime = "";
$(function() {
	var timer = setInterval(function(){
		if(outtime == 0){
			clearInterval(timer);
			layer.open({
		    content: '支付超时，请重新获取订单信息',
		    btn: '知道了',
		    yes: function(index){				
		    window.location.href ="pay_pay.html";
		    }
		  });
		}else{
			outtime--;
		}
	},1000);
	$('[name=plateNumber]').text(o.plateNumber);
	$('[name=needMoney]').text(Number(o.needMoney));

	var pageUrl = window.location.href;

	$.ajax({
		type: "post",
		data: {
			'param': '{"data":{"href":"' + pageUrl + '"}}'
		},
		url: default_url + "pay/authorize",
		dateType: "json",
		success: function(data) {
			var d = JSON.parse(data);
			if (d.status == true) {
				var authConfig = d.data.authConfig;
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: authConfig.appid, // 必填，公众号的唯一标识
					timestamp: authConfig.timestamp, // 必填，生成签名的时间戳
					nonceStr: authConfig.noncestr, // 必填，生成签名的随机串
					signature: authConfig.signature, // 必填，签名，见附录1
					jsApiList: ["chooseWXPay", "closeWindow"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				wx.error(function(res) {
					//popBox("all message:"+res.err_msg);
				});
			} else {
				layer.open({
			    content: 'config获取失败！',
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
			  });
			  window.history.back();
			}
		},
		fail: function() {
			/*layer.open({
		    content: 'config获取失败！',
		    skin: 'msg',
		    time: 2 //2秒后自动关闭
		  });
		  window.history.back();*/
		 /*layer.open({
		    content: 'config获取失败！',
		    btn: '知道了',
		    
		   	yes: function(index){
			   layer.close(index)
		       window.location.href = pageUrl;
		    }
		 })*/
		 layer.open({
		    content: 'config获取失败！',
		    skin: 'msg',
		    time: 2, //2秒后自动关闭
			end:function(){				
				window.location.href = pageUrl;
				return false;
			}
		  });
		},
		error: function(err) {
			if (err.status == 910){
				updateToken();
			}else{
				layer.open({
				content: '网络错误！',
					skin: 'msg',
					time: 2, //2秒后自动关闭
					end:function(){				
						window.location.href = pageUrl;
						return false;
					}
			  });
				/*layer.open({
			    content: '网络错误！',
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
			  });
			  window.history.back();*/
			}
			
		}
	});
})

//调用微信JS api 支付
function jsApiCall(pay_param) {
	wx.chooseWXPay({
		timestamp: pay_param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: pay_param.nonceStr, // 支付签名随机串，不长于 32 位
		package: pay_param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		//signType: pay_param.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		signType: pay_param.signType,
		paySign: pay_param.paySign, // 支付签名
		success: function(res) {
			// 去后台确认是否支付成功
			hrefChange("payOk-noMember.html");
		},
		fail: function(res) {
			$('.btn-orange').removeClass('disabled');
			layer.open({
		    content: '支付失败！',
		    skin: 'msg',
		    time: 2 //2秒后自动关闭
		  });
		  window.location.href = pageUrl;
		},
		cancel: function(res) {
			$('.btn-orange').removeClass('disabled');
			layer.open({
		    content: '您已取消支付！',
		    skin: 'msg',
		    time: 2 //2秒后自动关闭
		  });
		  location.reload();
		}
	});
}

function callpay(pay_param) {
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', jsApiCall);
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		}
	} else {
		jsApiCall(pay_param);
	}
}

// 获取系统时间"yyyy-MM-dd HH:MM:SS"
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
	return currentdate;
}

// 支付
function pay() {
	if(outtime == 0){
		layer.open({
	    content: '支付超时，重新计算费用！',
	    btn: '我知道了',
		yes: function(index){
				
		window.location.href ="parkPay-noMember.html";


	   }
	  });
		return;
	}
	if( !(o.predictExitTime) ){
		preExitTime = getNowFormatDate();
	}else{
		preExitTime = o.predictExitTime;
	}
	var param = {
		data: {
			parkRecordId: o.parkRecordId,
			predictExitTime: preExitTime,
			orderMoney: o.orderMoney,
			payType: 1,
			needMoney: o.needMoney,
			source: 'wechat',
			openId: $.cookie('openid')
			// openId:'oSCygw5_kxvzJT8imvRBPmi5ZVek'
		}
	}
	$.ajax({
		type: "post",
		data: {
			'param': JSON.stringify(param)
		},
		url: default_url + "tobOrder/tobNotMemberPay",
		dateType: "json",
		success: function(data) {
			layer.close(0);
			var d = JSON.parse(data);
			if (d.status == true) {
				var paymentConfig = d.data;
				if (paymentConfig == "" || paymentConfig == null) {
					layer.open({
						content: '支付成功！',
						btn: '我知道了',
						yes: function(index) {
							location.reload();
						}
					});
					return;
				}
				callpay(paymentConfig);
			} else {
				/*$('.btn-orange').removeClass('disabled');
				layer.open({
			    content: d.msg,
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
			  });
			  window.location.href='parkPay-noMember.html';*/
			 
			  layer.open({
				content: d.msg ,
				skin: 'msg',
				time: 2, //2秒后自动关闭
				end:function(){				
					window.location.href = 'parkPay-noMember.html';
					return false;
				}
			  });
			}
		},
		fail: function() {
			$('.btn-orange').removeClass('disabled');
			layer.open({
		    content: '网络异常，请稍后重试！',
		    skin: 'msg',
		    time: 2 //2秒后自动关闭
		  });
		},
		error: function(err) {
			$('.btn-orange').removeClass('disabled');
			if (err.status == 910) {
				updateToken();
			} else {
				layer.open({
			    content: '网络错误！',
			    skin: 'msg',
			    time: 2 //2秒后自动关闭
			  });
			  window.history.back();
			}
		}
	});
}

// 确认支付
/*$('.btn-orange').click(function(){
	if(o.needMoney == 0){
		layer.open({
			content: '尚未产生停车费！',
			btn: '我知道了',
			yes: function(index) {
				window.location.href = 'parkPay-noMember.html';
			}
		});
		return;
	}
	$(this).addClass('disabled');
	pay();
});
*/
/*确认支付*/
$('.btn-orange').on('touchstart',function(e){
	$(this).addClass('disabled');
	//loading带文字
	layer.open({
	  type: 2
	  ,shadeClose: false
	  ,content: '正在支付中'
	});
	e.preventDefault();
})
$('.btn-orange').on('touchend',function(e){
	if(o.needMoney == 0){
		layer.open({
			content: '尚未产生停车费！',
			btn: '我知道了',
			yes: function(index) {
				window.location.href = 'pay_pay.html';
			}
		});
		return;
	}
//	$(this).addClass('disabled');
	pay();
});