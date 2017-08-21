
// 默认地址前缀
//var default_url = 'http://123.57.29.16:9000/w3/wechat/'; //w3为测试；w2为正式
var default_url = '/w2/wechat/';
// var default_url = '/s1/';
//var tob_url='/sym_ips/s1/';
var tob_url='/ips/s1/';
//var tob_pps_url='/pps/s1/';
var tob_pps_url='/pps/s1/';
var block_tag=false;

// 从cookie中获取token
function isToken(){
	var token = $.cookie('token');
	return token;
}

function goPage(opt,url){
  sessionStorage.setItem("opt",JSON.stringify(opt));
  window.location.href=url+"?"+Math.random();
}

function goPage2(opt,url){
  sessionStorage.setItem("opt",JSON.stringify(opt));
  window.location.href=url+"?"+Math.random();
}

function hrefChange2(href){
	window.location.href=href;
}



function hrefChange(href){
	window.location.href=href+"?"+Math.random();
}

function hrefChange_D(href,prId){
	window.location.href=href+"?parkRecordId="+prId+"&"+Math.random();
}

//获取url参数
function getParameter(name) { 
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null;
}

function convertArray(o) { //主要是推荐这个函数。它将jquery系列化后的值转为name:value的形式。 
	var v = {}; 
	for (var i in o) { 
	if (typeof (v[o[i].name]) == 'undefined') v[o[i].name] = o[i].value; 
	else v[o[i].name] += "," + o[i].value; 
	} 
	return v; 
}

// 弹出提示框
function popBox(obj){
	$(".notice").html(obj).show();
	$(".notice").after('<div class="notice_shade"></div>');
	//$("body").append('<div class="notice_shade"></div>');
	var timer = setTimeout(function() {
		$(".notice").fadeOut();
		$(".notice_shade").remove();
		clearTimeout(timer);
	}, 3000);
}

// 必用闭包的方式，防止外部调用内部的参数与方法，只向外部暴露一个入口方法
(function($) {
	// 默认参数
	var default_Options = {
		type: 'post',
		dataType: 'json',
		async: true,
		headers: {},
		data: {},
		sucfun: function(msg) {
			if (msg.code == '0000') {
				popBox('操作成功！');
			} else {
				popBox(msg.msg);
			}
		},
		errfun: function(msg) {
			popBox('登录失效，请重新登录');
			hrefChange('login.html')
			//window.location.href='login.html';
		},
		failfun: function(a) {
			popBox('网络异常，请稍后重试');
		}
	};

	// 创建ajax方法，接受参数
	var performAjax = {
		validate: function(opt) {
			// TODO 这里可以写一些参数的验证
			return true;
		},
		run: function(param) {
			$.extend(default_Options, param);
			var isok = this.validate(default_Options);
			if (!isok) {
				return;
			}
			//console.log(default_Options)
			$.ajax({
				url: default_Options.url,
				type: default_Options.type,
				dataType: default_Options.dataType,
				async: default_Options.async, //使用同步的方式,true为异步方式
				data: default_Options.data, //这里使用json对象
				headers: default_Options.headers,
				success: function(msg) {
					default_Options.sucfun(msg);
				},
				error: function(e) {
					default_Options.errfun(e)
				},
				fail: function() {
					default_Options.failfun();
				}
			});
		}

	}

	// 将方法注册为jquery方法，方便直接调用，例如：$.invokeAjax({/*这里是内部参数*/});
	$.extend({
		invokeAjax: function(param) {
			performAjax.run(param)
		}
	});

})(jQuery);

function selfBlock(){
	while(block_tag==false){
		sleep(1000);
	}
}

// 判断openId是否存在
function isOpenId(){
	// var openId = $.cookie('openid');
	var pageUrl = window.location.href;
	//$.cookie('pageUrl',pageUrl, { expires: 7,path: '/' });
	// if(openId == undefined){
		$.invokeAjax({
			url:default_url+'session/get',
			data:{'param':'{}'},
			async:false,
			sucfun:function(msg){
				if(msg.code == '0000'){
					var opid = msg.data.openId;
					if(opid == null || opid == ''){
						window.location.href=default_url+'session/set?urlback='+pageUrl;
					}else{
						block_tag=true;
						$.cookie('openid',opid, { expires: 7,path: '/' });
						$.cookie('isBind',msg.data.isBind, { expires: 7,path: '/' });
						$.cookie('token',msg.data.token, { expires: 7,path: '/' });
						var isBind = $.cookie('isBind');
						if(isBind != 1){
							window.location.href='login.html';
						}
					}
				}else{
					popBox(msg.msg); 
				}
			}
		});
	// }else{
	// 	var isBind = $.cookie('isBind');
	// 	if(isBind != 1){
	// 		window.location.href='login.html';
	// 	}
	// }
}

/*function updateToken(){
	$.invokeAjax({
		url:default_url+'session/updateToken',
		data:{'param':'{}'},
		async:false,
		sucfun:function(msg){
			if(msg.code == '0000'){
				var token = msg.data.token;
				$.cookie('token',token, { expires: 7,path: '/' });
			}
			
		}
	});
}*/
function updateToken(){
	alert('登录失效，请重新登录');
	var isBind = 0;
	var token = "";
	$.cookie('isBind',isBind, { expires: 7,path: '/' });
	$.cookie('token',token, { expires: 7,path: '/' });
	window.location.href='login.html';
	
}
