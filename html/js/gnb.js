/**********************
상단 공통 스크립트
**********************/

document.createElement('header');
document.createElement('section');

$(function(){
	//gnb 메뉴 마우스 오버,포커스
	var cateMenu = $('#topArea .cate-list > li');
	cateMenu.each(function(){
		var target = $(this);
		target.on('mouseover focusin',function(){cateOn(this,'on')});
		target.on('mouseleave',function(){cateOn(this,'off')});
		target.on('focusout',function(){
			target.removeClass('on');
		});
		cateMenu.last().on('focusout',function(){cateOn(this,'off')});
	});
	IsList();
	M_sub();
	IsDropDown();
});

//리사이징
$(window).resize(function(){
	var winWid = $(window).width();
	if(winWid > 769){
		$('#layout_cont').css({'overflow-y':'visible','height':'auto'});
		$('#m_subMenu').css({'right':'-100%'});
		$('.dimmed_bk').remove();
		$('.m-quick-list').css('bottom','-44px');
	}
});

//gnb 서브메뉴 on,off
function cateOn(t,opt){
	var listBg = $('#topArea .list_bg');
	var subMenu = $('#topArea .cate-list > li').find('> div');
	if(opt == 'on'){
		$(t).addClass('on');
		subMenu.show();
		listBg.show();
	}else{
		$(t).removeClass('on');
		subMenu.hide();
		listBg.hide();	
	}
}

//스크롤시 상단고정
$(window).on('scroll',function(){
	var Pos = $('#topArea .topMenu').height();
	var Top = $('#topArea'); //공통 상단 
	var subTop = $('.sub-content-nav'); //서브페이지 상단
	if($(this).scrollTop() > Pos){
		Top.addClass('fixed');
		subTop.css({'position':'fixed','top':'95px','left':'0','z-index':'1008'});
	}else{
		Top.removeClass('fixed');
		subTop.css({'position':'static','top':'0','z-index':'10'});
	}	
});	

//모바일 햄버거 메뉴 on,off
function M_menuOn(dir){
	var m_subMenu = $('#m_subMenu');
	var m_subList = m_subMenu.find('.m-cate-list > li.selected');
	var $layout = $('#layout_cont');
	var $hT = m_subMenu.height();
	var bg_bk = $('.dimmed_bk');
	var m_quick = $('.m-quick-list');
	if(dir == 'off'){
		m_quick.stop().animate({
			'bottom':'-44px'
		},300);
		m_subMenu.stop().delay(300).animate({
			'right':'-100%'
		},{
			duration:300,
			complete:function(){
				m_subMenu.scrollTop(0);
				m_subList.removeClass('selected');
				m_subList.find('ul').slideUp('fast');
			}
		});
		$layout.css({'overflow-y':'visible','height':'auto'});
	}else{
		m_subMenu.stop().animate({
			'right':'0'
		},{
			duration:400,
			complete:function(){
				m_quick.stop().animate({
					'bottom':0
				},300);
			}
		});
		$layout.css({'overflow-y':'hidden','height':$hT});
	}
}

//모바일 서브메뉴 리스트 on,off
function M_sub(){
	var cateName1 = $('#m_subMenu .m-cate-list > li > span');
	var $2depth = $('#m_subMenu .m-cate-list > li > ul');
	
	var cateName2 = $2depth.find('a');
	var $3depth = $2depth.find('ul');
	
	cateName1.each(function(){ //2depth	
		$(this).on('click',function(){
			var evTg = $(this);
			var idx = cateName1.index(this);
			var posTp = 50*idx;
			var cateTg = evTg.next('ul');
			
			if(idx > 0){
				$('#m_subMenu').stop().delay('300').animate({scrollTop:posTp + 200 + 'px'},300);
			}else {
				$('#m_subMenu').stop().delay('300').animate({scrollTop:0},300);
			}
			
			if(cateTg.css('display') == 'block'){
				cateTg.slideUp('300',function(){
					evTg.closest('li').removeClass('selected').removeClass('active');
				});
			}else{
				cateTg.slideDown('300',function(){
					evTg.closest('li').addClass('selected');
				});
				$2depth.not(cateTg).slideUp('300');
				cateName1.not(evTg).closest('li').removeClass('selected').removeClass('active');
				
				$3depth.slideUp('300');
				cateName2.removeClass('selected');
				cateName2.closest('li').removeClass('active');
			}
		});
	});
	
	cateName2.each(function(){ //3depth	
		$(this).on('click',function(ev){
			var evTg2 = $(this);
			var cateTg2 = evTg2.next('ul');
			
			if(cateTg2.length > 0){
				ev.preventDefault();
				if(cateTg2.css('display') == 'block'){
					cateTg2.slideUp('300',function(){
						evTg2.removeClass('selected');
						evTg2.closest('li').removeClass('active');
					});
				}else{
					cateTg2.slideDown('300',function(){
						evTg2.addClass('selected');
					});
					$3depth.not(cateTg2).slideUp('300');
					cateName2.not(evTg2).removeClass('selected');
					cateName2.not(evTg2).closest('li').removeClass('active');
				}	
			}
		});
	});
}

//2depth 각 리스트에 3depth 유무 체크
function IsList(){
	var $2depthList = $('#m_subMenu .m-cate-list > li > ul > li');
	$2depthList.each(function(){
		if($(this).find('ul').length < 1){
			$(this).children('a').removeClass('isList');
		}	
	});	
}

//Dropdown 메뉴
function IsDropDown(){
	var target = $('.isDropDown');
	var link = target.children('a');
	var list = target.children('ul');
	var last = list.find('a').last();
	
	link.on('click',function(e){
		e.preventDefault();
		if(list.css('display') == 'block'){
			list.stop().slideUp(300,function(){
				link.removeClass('on');
			});
		}else{
			list.stop().slideDown(300,function(){
				link.addClass('on');
			});
		}	
	});
	last.on('focusout',function(){
		list.stop().slideUp(300,function(){
			link.removeClass('on');
		});
	})
}
