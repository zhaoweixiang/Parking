$(function() {
	var check_pass_word = '';
	var passwords = $('#password').get(0);
	var temp_rePass_word = '';
	$(function() {
		var div1 = '\
        <div id="key" style="background-color:#d1d5da;width:100%;bottom:0px;">\
		<ul class="write"  id="keyboard" style="font-size:20px;">\
				<li class="tab_sure"><span class="sure">确定</span></li>\
				<li class="symbol tab_left"><span class="off">京</span></li>\
                <li class="symbol"><span class="off">津</span></li>\
                <li class="symbol"><span class="off">沪</span></li>\
                <li class="symbol btn_number_"><span class="off">渝</span></li>\
                <li class="symbol"><span class="off">蒙</span></li>\
                <li class="symbol"><span class="off">新</span></li>\
                <li class="symbol btn_number_"><span class="off">藏</span></li>\
                <li class="symbol"><span class="off">宁</span></li>\
                <li class="symbol"><span class="off">桂</span></li>\
                <li class="symbol btn_number_ tab_right"><span class="off">贵</span></li>\
				<li class="symbol tab_left"><span class="off">云</span></li>\
                <li class="symbol"><span class="off">黑</span></li>\
                <li class="symbol btn_number_"><span class="off">吉</span></li>\
                <li class="symbol"><span class="off">辽</span></li>\
                <li class="symbol"><span class="off">晋</span></li>\
                <li class="symbol btn_number_"><span class="off">冀</span></li>\
                <li class="symbol"><span class="off">青</span></li>\
                <li class="symbol"><span class="off">鲁</span></li>\
                <li class="symbol btn_number_ tab_right"><span class="off">豫</span></li>\
				<li class="symbol"><span class="off">苏</span></li>\
                <li class="symbol one_tab"><span class="off">皖</span></li>\
                <li class="symbol"><span class="off">浙</span></li>\
                <li class="symbol btn_number_"><span class="off">闽</span></li>\
                <li class="symbol"><span class="off">赣</span></li>\
                <li class="symbol"><span class="off">湘</span></li>\
                <li class="symbol btn_number_"><span class="off">鄂</span></li>\
                <li class="symbol"><span class="off">粤</span></li>\
                <li class="symbol"><span class="off">琼</span></li>\
                <li class="symbol btn_number_ three_tab"><span class="off">甘</span></li>\
                <li class="symbol"><span class="off">陕</span></li>\
                <li class="symbol"><span class="off">川</span></li>\
                <li class="symbol btn_number_"><span class="off">港</span></li>\
                <li class="symbol"><span class="off">澳</span></li>\
                <li class="delete lastitem"><img class="del" src="../images/tjcl_kb_del.png"></li>\
            </ul>\
			</div>\
			';
		var div2 = '\
        <div id="key" style="background-color:#A8A8A8;width:100%;bottom:0px;">\
            <ul class="number"  id="keyboard" style="font-size:20px;">\
				<li class="tab_sure"><span class="sure">确定</span></li>\
				<li class="symbol tab_left"><span class="off">0</span></li>\
                <li class="symbol"><span class="off">1</span></li>\
                <li class="symbol"><span class="off">2</span></li>\
                <li class="symbol btn_number_"><span class="off">3</span></li>\
                <li class="symbol"><span class="off">4</span></li>\
                <li class="symbol"><span class="off">5</span></li>\
                <li class="symbol btn_number_"><span class="off">6</span></li>\
                <li class="symbol"><span class="off">7</span></li>\
                <li class="symbol"><span class="off">8</span></li>\
				<li class="symbol btn_number_ tab_right"><span class="off">9</span></li>\
				<li class="symbol tab_left"><span class="off">Q</span></li>\
                <li class="symbol"><span class="off">W</span></li>\
                <li class="symbol"><span class="off">E</span></li>\
                <li class="symbol btn_number_"><span class="off">R</span></li>\
                <li class="symbol"><span class="off">T</span></li>\
                <li class="symbol"><span class="off">Y</span></li>\
                <li class="symbol btn_number_"><span class="off">U</span></li>\
                <li class="symbol"><span class="off">I</span></li>\
                <li class="symbol"><span class="off">O</span></li>\
                <li class="symbol btn_number_ tab_right"><span class="off">P</span></li>\
				<li class="symbol tab_left"><span class="off">A</span></li>\
                <li class="symbol"><span class="off">S</span></li>\
                <li class="symbol"><span class="off">D</span></li>\
                <li class="symbol btn_number_"><span class="off">F</span></li>\
                <li class="symbol"><span class="off">G</span></li>\
                <li class="symbol"><span class="off">H</span></li>\
                <li class="symbol btn_number_"><span class="off">J</span></li>\
                <li class="symbol"><span class="off">K</span></li>\
                <li class="symbol"><span class="off">Z</span></li>\
                <li class="symbol btn_number_ tab_right"><span class="off">X</span></li>\
                <li class="symbol last_line"><span class="off">C</span></li>\
                <li class="symbol"><span class="off">V</span></li>\
                <li class="symbol btn_number_"><span class="off">B</span></li>\
				<li class="symbol"><span class="off">N</span></li>\
                <li class="symbol"><span class="off">M</span></li>\
                <li class="symbol"><span class="off">L</span></li>\
                <li class="delete lastitem"><img class="del" src="../images/tjcl_kb_del.png"></li>\
            </ul>\
        </div>\
        ';
		
		var character, index = 0;
		$("input.pass").attr("disabled", true);
		$("#password").attr("disabled", true);
		$("#keyboardDIV").html(div2);	
		function heiFun(){
			if(window.screen.height > 568){
				$("#keyboardDIV #key").css("position","absolute");
				$("#bodyHei").height("100%")
				$("#bodyHei").css("overflow","hidden");
			}else{
				
				$("#keyboardDIV #key").css("position","static");
				var headTop = $(".imgCar").height()+60;
				$("html,body").animate({scrollTop:headTop},100);
			}		
		}
		window.addEventListener('load', function() {
			heiFun()
		})
		$("#password input").attr("disabled",false);
		$("#password input").click(function(){	
			$(".pass").removeClass("curr");
			var index = $("#password input").index(this);
			$("#password input").eq(index).addClass("curr");
			if(index == 0) {				
				$("#keyboardDIV").html(div1);
				heiFun();
				$("#keyboardDIV").show()
				$("#keyboard li").bind("click",b())	
			} else {
				$("#keyboardDIV").show();
				$("#keyboardDIV").html(div2);
				heiFun();
				$("#keyboard li").bind("click",b())	//bind事件和js中有冲突				
			}	
		})
		function b() {
			$('#keyboard li .sure').click(function(){
				  if(window.screen.height > 568){
					  $("#key").animate({height:"0"},500);								
				  }else{
					  var keyHei = $("#key").height();
					  $("#key").animate({'margin-top':"500px"},1,function(){
						  $("#key").fadeOut('fast');
						  });				  
				  }					
			})
			$('#keyboard li').click(function() {				
				if($(this).hasClass('delete')) {
				    temp_rePass_word = ""	
					var index = $("#password input.curr").index();							
					$(passwords.elements[index-- % 7]).val('');
					$("#password input").eq(index).addClass("curr").siblings("input").removeClass("curr");
					$("#cg_confirm").addClass("wx_btn_no");					
					$("#passText").html("")
					if(index == 0) {
						$("#keyboardDIV").html(div1);
						$("#keyboard li").bind("click",b());
						heiFun();
					} else {
						$("#keyboardDIV").html(div2)
						$("#keyboard li").bind("click",b());	//bind事件和js中有冲突
						heiFun();				
					}	
					return false;
				}
				if($(this).hasClass('cancle')) {
					parentDialog.close();
					return false;
				}
				if($(this).hasClass('symbol') || $(this).hasClass('tab')) {
					character = $(this).text();
					var index = $("#password input.curr").index();
					$(passwords.elements[index++ % 7]).val(character);
					$(passwords.elements[index]).addClass("curr").siblings().removeClass("curr");
					if(index == 0) {
						$("#keyboardDIV").html(div1);
						$("#keyboard li").bind("click",b());
						heiFun();
					} else {
						$("#keyboardDIV").html(div2)
						$("#keyboard li").bind("click",b())	//bind事件和js中有冲突
						heiFun();				
					}
					var showFlag = true;
					for(var i = 0; i< $(passwords.elements).length; i++)
						if($(passwords.elements[6]).val() != '') {					
								if($(passwords.elements[i]).val()!=''){
								    temp_rePass_word += $(passwords.elements[i]).val();																				
								}else{									
									$("#cg_confirm").addClass("wx_btn_no");	
									//$("#cg_confirm").unbind('click');
									showFlag = false;
									temp_rePass_word= '';	
									return false;							
								}
							showFlag = true;
							$("#passText").html(temp_rePass_word);						
						}else{
							showFlag = false;
							temp_rePass_word= '';
							return false;
						}
				    }
					if(showFlag){
						$("#key").animate({height:"0"},500);				
						$("#cg_confirm").removeClass("wx_btn_no");	
						//$("#cg_confirm").attr('disabled',false);
						$("#cg_confirm").bind('click');
						
					}
					temp_rePass_word = ""
					//return false;

			});
		}
		b()
	});
	(function() {
		function tabForward(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.value.length === target.maxLength) {
				var form = target.form;
				for(var i = 0, len = form.elements.length - 1; i < len; i++) {
					if(form.elements[i] === target) {
						if(form.elements[i++]) {
							form.elements[i++].focus();
						}
						break;
					}
				}
			}
		}
		var form = document.getElementById("password");
		form.addEventListener("keyup", tabForward, false);		
	})();
})