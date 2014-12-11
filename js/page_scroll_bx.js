/*
** 鍙橀噺鍊�
*/
	/*
	** 椤甸潰鍒囨崲鐨勬晥鏋滄帶鍒�
	*/
var Msize = $(".m-page").size(), 	//椤甸潰鐨勬暟鐩�
	page_n			= 1,			//鍒濆椤甸潰浣嶇疆
	initP			= null,			//鍒濆€兼帶鍒跺€�
	moveP			= null,			//姣忔鑾峰彇鍒扮殑鍊�
	firstP			= null,			//绗竴娆¤幏鍙栫殑鍊�
	newM			= null,			//閲嶆柊鍔犺浇鐨勬诞灞�
	p_b				= null,			//鏂瑰悜鎺у埗鍊�
	indexP			= null, 		//鎺у埗棣栭〉涓嶈兘鐩存帴鎵捐浆鍒版渶鍚庝竴椤�
	move			= null,			//瑙︽懜鑳芥粦鍔ㄩ〉闈�
	start			= true, 		//鎺у埗鍔ㄧ敾寮€濮�
	startM			= null,			//寮€濮嬬Щ鍔�
	position		= null,			//鏂瑰悜鍊�
	DNmove			= false,		//鍏朵粬鎿嶄綔涓嶈椤甸潰鍒囨崲
	mapS			= null,			//鍦板浘鍙橀噺鍊�
	canmove			= false,		//棣栭〉杩斿洖鏈€鍚庝竴椤�

	textNode		= [],			//鏂囨湰瀵硅薄
	winHeight       = $(window).height(),
	textInt			= 1;			//鏂囨湰瀵硅薄椤哄簭




/*
** 鍗曢〉鍒囨崲 鍚勪釜鍏冪礌fixed 鎺у埗body楂樺害
*/
	var v_h	= null;		//璁板綍璁惧鐨勯珮搴�

	function init_pageH(){
		var fn_h = function() {
			if(document.compatMode == "BackCompat")
				var Node = document.body;
			else
				var Node = document.documentElement;
			 return Math.max(Node.scrollHeight,Node.clientHeight);
		}
		var page_h = fn_h();
		var m_h = $(".m-page").height();
		page_h >= m_h ? v_h = page_h : v_h = m_h ;

		//璁剧疆鍚勭妯″潡椤甸潰鐨勯珮搴︼紝鎵╁睍鍒版暣涓睆骞曢珮搴�
		$(".m-page").height(v_h);
		$(".p-index").height(v_h);

	};
	init_pageH();



/*
**妯＄増鍒囨崲椤甸潰鐨勬晥鏋�
*/
	//缁戝畾浜嬩欢
	function changeOpen(e){
		$(".m-page").on('mousedown touchstart',page_touchstart);
		$(".m-page").on('mousemove touchmove',page_touchmove);
		$(".m-page").on('mouseup touchend mouseout',page_touchend);

	};

	//鍙栨秷缁戝畾浜嬩欢
	function changeClose(e){
		$(".m-page").off('mousedown touchstart');
		$(".m-page").off('mousemove touchmove');
		$(".m-page").off('mouseup touchend mouseout');

	};

	//寮€鍚簨浠剁粦瀹氭粦鍔�
	changeOpen();

	//瑙︽懜锛堥紶鏍囨寜涓嬶級寮€濮嬪嚱鏁�
	function page_touchstart(e){
		if (e.type == "touchstart") {
			initP = window.event.touches[0].pageY;
		} else {
			initP = e.y || e.pageY;
			mousedown = true;
		}
		firstP = initP;
	};

	//鎻掍欢鑾峰彇瑙︽懜鐨勫€�
	function V_start(val){
		initP = val;
		mousedown = true;
		firstP = initP;
	};

	//瑙︽懜绉诲姩锛堥紶鏍囩Щ鍔級寮€濮嬪嚱鏁�
	function page_touchmove(e){
		e.preventDefault();
		e.stopPropagation();
        var imgs = $(".m-img").length;

		//鍒ゆ柇鏄惁寮€濮嬫垨鑰呭湪绉诲姩涓幏鍙栧€�
		if(start||startM){
			startM = true;
			if (e.type == "touchmove") {
				moveP = window.event.touches[0].pageY;
			} else {
				if(mousedown) moveP = e.y || e.pageY;
			}
			page_n == 1 ? indexP = false : indexP = true ;	//true 涓轰笉鏄涓€椤� false涓虹涓€椤�
		}

		//璁剧疆涓€涓〉闈㈠紑濮嬬Щ鍔�
		if(moveP&&startM&&imgs>1){

			//鍒ゆ柇鏂瑰悜骞惰涓€涓〉闈㈠嚭鐜板紑濮嬬Щ鍔�
			if(!p_b){
				p_b = true;
				position = moveP - initP > 0 ? true : false;	//true 涓哄悜涓嬫粦鍔� false 涓哄悜涓婃粦鍔�
				if(position){
				//鍚戜笅绉诲姩
					if(indexP){
						newM = page_n - 1 ;
						$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						move = true ;
					}else{
						if(canmove){
							move = true;
							newM = Msize;
							$(".m-page").eq(newM-1).addClass("active").css("top",-v_h);
						}
						else move = false;
					}

				}else{
				//鍚戜笂绉诲姩
					if(page_n != Msize){
						if(!indexP) $('.audio_txt').addClass('close');
						newM = page_n + 1 ;
					}else{
						if(!gd){move = false; return};
						newM = 1 ;
					}
					$(".m-page").eq(newM-1).addClass("active").css("top",v_h);
					move = true ;
				}
			}

			//鏍规嵁绉诲姩璁剧疆椤甸潰鐨勫€�
			if(!DNmove){
				//婊戝姩甯﹀姩椤甸潰婊戝姩
				if(move){


					//绉诲姩涓缃〉闈㈢殑鍊硷紙top锛�
					start = false;
					var topV = parseInt($(".m-page").eq(newM-1).css("top"));
					$(".m-page").eq(newM-1).css({'top':topV+moveP-initP});

				    if(topV+moveP-initP>0){//鍚戜笂
					   var bn1 = winHeight-(topV+moveP-initP);
					   var bn2 = ((winHeight-bn1/4)/winHeight);
                       $(".m-page").eq(newM-2).attr("style","-webkit-transform:translate(0px,-"+bn1/4+"px) scale("+bn2+")");
				    }else{//鍚戜笅
					   var bn3 = winHeight+(topV+moveP-initP);
					   var bn4 = ((winHeight-bn3/4)/winHeight);
					   if(Msize!=newM){
                         $(".m-page").eq(newM).attr("style","-webkit-transform:translate(0px,"+bn3/4+"px) scale("+bn4+")");
					   }else{
						 $(".m-page").eq(0).attr("style","-webkit-transform:translate(0px,"+bn3/4+"px) scale("+bn4+")");
					   }
				    }
					initP = moveP;
				}else{
					moveP = null;
				}
			}else{
				console.log('2')
				moveP = null;
			}
		}
	};

	//瑙︽懜缁撴潫锛堥紶鏍囪捣鏉ユ垨鑰呯寮€鍏冪礌锛夊紑濮嬪嚱鏁�
	function page_touchend(e){

		//缁撴潫鎺у埗椤甸潰
		startM =null;
		p_b = false;


		//鍒ゆ柇绉诲姩鐨勬柟鍚�
		var move_p;
		position ? move_p = moveP - firstP > 100 : move_p = firstP - moveP > 100 ;
		if(move){
			//鍒囩敾椤甸潰(绉诲姩鎴愬姛)
			if( move_p && Math.abs(moveP) >5 ){
				$(".m-page").eq(newM-1).animate({'top':0},300,"easeOutSine",function(){
					/*
					** 鍒囨崲鎴愬姛鍥炶皟鐨勫嚱鏁�
					*/
					success();
					$(".m-page").attr("style","");
				})
			//杩斿洖椤甸潰(绉诲姩澶辫触)
			}else if (Math.abs(moveP) >=5){	//椤甸潰閫€鍥炲幓
				position ? $(".m-page").eq(newM-1).animate({'top':-v_h},100,"easeOutSine") : $(".m-page").eq(newM-1).animate({'top':v_h},100,"easeOutSine");
				$(".m-page").attr("style","");
				$(".m-page").eq(newM-1).removeClass("active");
				start = true;
				$(".m-page").attr("style","");
			}
		}
		/* 鍒濆鍖栧€� */
		initP		= null,			//鍒濆€兼帶鍒跺€�
		moveP		= null,			//姣忔鑾峰彇鍒扮殑鍊�
		firstP		= null,			//绗竴娆¤幏鍙栫殑鍊�
		mousedown	= null;			//鍙栨秷榧犳爣鎸変笅鐨勬帶鍒跺€�
	};
/*
** 鍒囨崲鎴愬姛鐨勫嚱鏁�
*/
	function success(){
		/*
		** 鍒囨崲鎴愬姛鍥炶皟鐨勫嚱鏁�
		*/
		//璁剧疆椤甸潰鐨勫嚭鐜�
		$(".m-page").eq(page_n-1).removeClass("show active").addClass("hide");
		$(".m-page").eq(newM-1).removeClass("active hide").addClass("show");


		//閲嶆柊璁剧疆椤甸潰绉诲姩鐨勬帶鍒跺€�
		page_n = newM;
		start = true;

		//鍒ゆ柇鏄笉鏄渶鍚庝竴椤碉紝鍑虹幇鎻愮ず鏂囧瓧
		if(page_n == Msize) {
			canmove = true;
			$('.u-arrow').hide();
		}else{
			$('.u-arrow').show();
		}

	}




/*
**璁惧鏃嬭浆鎻愮ず
*/
	$(function(){
		var bd = $(document.body);
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', _orientationchange, false);
		function _orientationchange() {
			scrollTo(0, 1);
			switch(window.orientation){
				case 0:		//妯睆
					bd.addClass("landscape").removeClass("portrait");
					init_pageH();
					break;
				case 180:	//妯睆
					bd.addClass("landscape").removeClass("portrait");
					init_pageH();
					break;
				case -90: 	//绔栧睆
					init_pageH();
					break;
				case 90: 	//绔栧睆
					init_pageH();
					bd.addClass("portrait").removeClass("landscape");
					break;
			}
		}
		$(window).on('load',_orientationchange);
	});




/*
** 椤甸潰鍔犺浇鍒濆鍖�
*/
	var input_focus = false;
	function initPage(){
		//鍒濆鍖栦竴涓〉闈�
		$(".m-page").addClass("hide").eq(page_n-1).addClass("show").removeClass("hide");
		//PC绔浘鐗囩偣鍑讳笉浜х敓鎷栨嫿
		$(document.body).find("img").on("mousedown",function(e){
			e.preventDefault();
		})
		//璋冭瘯鍥剧墖鐨勫昂瀵�
		if(RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)) $('.m-page').css('height','101%');
	}(initPage());


