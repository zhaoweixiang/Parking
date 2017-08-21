new function (){
		var _this =  this ;
		_this.width = 750; // 设置默认最大宽度
		_this.fontSize = 100; // 默认字体大小
		_this.widthProportion =  function (){
			var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_this.width;return p>1?1:p<0.5?0.5:p;
		};
		_this.changePage =  function (){
			document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_this.widthProportion()*_this.fontSize+"px !important");
		};
		_this.changePage();
		window.addEventListener('resize', function (){_this.changePage();}, false );
};

