/**********************
메인 공통 스크립트
**********************/

$(function(){
	mainSlider();
	alignDot();
	alignList();
	listTab();
	TabSlider();
	evSlider();
	ftSlider();
	quickOver();
	openLayerPopup();
});

//window 리사이징 
$(window).resize(function(){
	//move탭 리사이징
	alignList();
	var selected = $('.tabMenu > span.selected');
	var $idx  = $('.tabMenu > span').index(selected);
	var moveTab = $('.tabMenu .moveTab');
	moveTab.css({'left': moveTab.width()*$idx + 'px'});
	setTimeout(alignDot,100);
	
	$('.playController3 .slideBtn').removeClass('btn_play').addClass('btn_pause');
});

//메인 슬라이드
function mainSlider(){
	var mainBnr = $('.mainBnr');
	mainBnr.css({'display':'block'});
	
	//메인 배너 슬라이드
	mainBnr.slick({
		  dots: true,
		  dotsClass:'fraction-list',
		  infinite: true,
		  speed: 400,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  autoplay:true,
		  adaptiveHeight:true,
		  customPaging: function(slider, i) {
			var totalSlide = slider.slideCount,
				count = parseInt(totalSlide/4),
				$count = count + 1;
			
			if(totalSlide % 4 == 0){
				return $('<span>').html(i + 1 + ' / ' + count);
				
			}else{
				return $('<span>').html(i + 1 + ' / ' + $count);
				
			}
		  },
		  responsive: [
			{
		      breakpoint: 1307, //가로 사이즈 1307
		      settings: {
		    	arrows:false
		      }
		    }, 
		    {
		      breakpoint: 1170, //가로 사이즈 1170
		      settings: {
		    	arrows:false,
		        slidesToShow: 3,
		        slidesToScroll: 3,
		        customPaging: function(slider, i) {
					var totalSlide = slider.slideCount,
						count = parseInt(totalSlide/3),
						$count = count + 1;
					
					if(totalSlide % 3 == 0){
						return $('<span>').html(i + 1 + ' / ' + count);
						
					}else{
						return $('<span>').html(i + 1 + ' / ' + $count);
						
					}
				 }
		      }
		    },
		    {
		      breakpoint: 832, //가로 사이즈 832
		      settings: {
		    	arrows:false,
		        slidesToShow: 2,
		        slidesToScroll: 2,
		        customPaging: function(slider, i) {
					var totalSlide = slider.slideCount,
						count = parseInt(totalSlide/2),
						$count = count + 1;
					
					if(totalSlide % 2 == 0){
						return $('<span>').html(i + 1 + ' / ' + count);
						
					}else{
						return $('<span>').html(i + 1 + ' / ' + $count);
						
					}
				 }
		      }
		    }
		  ]
	});
	
	 slideController(3);
	 
	//메인 배너 리스트 on,off
	var bnrList = $('.mainBnr .slick-slide');
	bnrList.each(function(){
		var $target = $(this);
		// 자세히보기 on
		$target.on('mouseover focusin',function(){$target.addClass('view')});
		// 자세히보기 off
		$target.on('mouseleave',function(){$target.removeClass('view')});
		// 자세히 보기 버튼 포커스 아웃
		$target.find('.btn_more').on('focusout',function(){$target.removeClass('view')});
	});
}

//탭 슬라이드	
function TabSlider(){
	var $length = $('.tabContents .tabslide').length;
	for(i = 1; i <= $length; i++){
		var Tslider = $('#tabSlide0'+ i);
		var $item = Tslider.find('li');
		var item_Length = $item.length;			
		Tslider.slick({
			dots: true,
			infinite: true,
			arrows:false,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay:false
		});	
		if(item_Length <= 6) {	
			Tslider.find('.slick-dots').remove();
		}
		$item.each(function(){
			var link = $(this).find('.dirLink a');
			if(link.length < 2){
				link.css('width','100%');
			}
		});
	}
}
		
//중단 이벤트 슬라이드 배너
function evSlider(){
	var evBnr = $('.ev_bnr');
	var item_Length = evBnr.find('div').length;
	if(item_Length > 1){
		evBnr.slick({
			dots: true,
			dotsClass:'fraction-list',
			arrows:true,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay:true,
			customPaging: function(slider, i) {
			var totalSlide = slider.slideCount,
				count = parseInt(totalSlide);
			
				return $('<span>').html(i + 1 + ' / ' + count);
			}
		});
		slideController(1);
	}
}

//하단 이벤트 슬라이드 배너
function ftSlider(){
	var ftBnr = $('.ft_bnr');
	var item_Length = ftBnr.find('div').length;
	if(item_Length > 1){
		ftBnr.slick({
			dots: true,
			dotsClass:'fraction-list',
			arrows:true,
			speed: 400,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay:true,
			customPaging: function(slider, i) {
			var totalSlide = slider.slideCount,
				count = parseInt(totalSlide);
			
				return $('<span>').html(i + 1 + ' / ' + count);
			}
		});
		slideController(2);
	}
}

//슬라이드 일시정지 버튼
function slideController(num){
	var playController = $('.playController' + num);
	playController.append('<span class="slideControl"><button class="slideBtn btn_pause"><em>일시정지</em></button></span>');

	playController.each(function(){
		var slideBtn = $(this).find('.slideBtn');
		slideBtn.on('click',function(){
			if($(this).hasClass('btn_pause') == true){
				playController.find('.slick-slider').slick('slickPause');
				$(this).removeClass('btn_pause').addClass('btn_play').html('<em>재생하기</em>');
			}else{
				playController.find('.slick-slider').slick('slickPlay');
				$(this).removeClass('btn_play').addClass('btn_pause').html('<em>일시정지</em>');
			}
		});
	});
}

//section02 퀵 메뉴 오버
function quickOver(){	
	var Q_list = $('#content-body .section02 ul li');
	Q_list.on('mouseover focusin',function(){$(this).addClass('over')});
	Q_list.on('mouseleave focusout',function(){$(this).removeClass('over')});
}

//section03 탭 메뉴  정렬
function alignList(){
	var $tabList = $('.tabMenu > span');
	var W = $tabList.width();
	$tabList.each(function(listIdx){
		$(this).css({'left':W * listIdx + 'px'});
	});
}

//section03 탭 메뉴 클릭 이벤트
function listTab(){
	var tabList = $('.tabMenu > span  a');
	tabList.on('click',function(ev){
		ev.preventDefault();
		var NUM = $(this).attr('href');
		var Contents = $('.section03 .tabContents' + NUM);
		var Contents_ = $('.section03 .tabContents').not(Contents);
		var idx = tabList.index(this);
		var moveTab = $('.tabMenu .moveTab');
		var posArea = $('.section03').offset().top;
		$(this).closest('span').addClass('selected');
		tabList.not($(this)).closest('span').removeClass('selected');		
		moveTab.stop().animate({ //move탭 이동
			'left': $(this).width()*idx + 'px'
		},300);
		
		Contents.fadeIn(0,function(){ //컨텐츠 보이기, 슬라이드 포지션 리셋
			$('.tabContents .tabslide').slick('setPosition',0);	
		});
		
		Contents_.fadeOut(0); //컨텐츠 가리기
		Contents_.find('.slick-dots li button').trigger('click'); //슬라이드 페이징 리셋
		$('body,html').animate({scrollTop:posArea - 100 + 'px'},0);
	});	
}

//슬라이드 페이징 가운데 정렬
function alignDot(){
	var dots = $('#content-body .slick-dots');
	dots.each(function(){
		var wid = $(this).width();
		$(this).css({'margin-left':-(wid + 30)/2 +'px'});
	});
}

//게시판 탭
function boardView(el,target){
	var bdtab = $('.main_contents .boardTap > li > a');
	var bdtab_ = bdtab.not($(target));
	var bdlist = $('.main_contents .boardArea .boardTap > li > div');
	var bdlistOn = $('.main_contents .boardArea .boardTap > li > div.' + el);
	
	bdlistOn.css({'display':'block'});
	bdlist.not($(bdlistOn)).css({'display':'none'});
	
	$(target).addClass('selected');
	bdtab_.removeClass('selected');
}

//쿠키 생성
function setCookie(cName, cValue, cDay){
	 var expire = new Date();
	 expire.setDate(expire.getDate() + cDay);
	 cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	 if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	 document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
	 cName = cName + '=';
	 var cookieData = document.cookie;
	 var start = cookieData.indexOf(cName);
	 var cValue = '';
	 if(start != -1){
		  start += cName.length;
		  var end = cookieData.indexOf(';', start);
		  if(end == -1)end = cookieData.length;
		  cValue = cookieData.substring(start, end);
	 }
	 return unescape(cValue);
}

//레이어 팝업
function openLayerPopup(){
	var l_pop = $('.layerPop'),
		popcheck = l_pop.find('#popcheck'),
	    dimmed = $('.dimmed_pop');
	
	if(getCookie('customerSurvey') == ''){
		l_pop.css('display','block');
		dimmed.css('display','block');
		$('#layout_cont').css({
			'height':dimmed.height(),
			'overflow':'hidden'
		});
	}
	
	$('.btnClose, .dimmed_pop, .popClose').on('click',function(e){
		e.preventDefault();
		if(popcheck.prop('checked') == true){
			setCookie('customerSurvey','Y',1);
		}
		l_pop.css('display','none');
		dimmed.css('display','none');
		$('#layout_cont').css({
			'height':'auto',
			'overflow':'visible'
		});
	});
}
