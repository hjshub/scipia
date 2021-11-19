
//자료실 개편 - archive

'use strict';

$(function(){
	$refArchive().Init();
});


function refArchive(){
	var conTents = $('.refCotents'),
		detail = $('.refCotentsDetail'),
		list = conTents.find('.refList-item'),
		sort = conTents.find('.refSort'),
		sort_a = sort.find('button'),
		Item = list.find('li'),
		cxT = Item.find('> .cxt'),
		imgList_a = detail.find('.Imglist a'),
		videoList_a = detail.find('.Playlist a'),
		videoList_sp = detail.find('.Playlist span'),
		wideImg = detail.find('.wideImg'),
		playArea = detail.find('.playArea'),
		currentInfo = detail.find('.currentInfo'),
		currentWrapper = currentInfo.find('> div'),
		$caption = currentWrapper.find('.caption'),
		seLect = sort.find('select'),
		$trg1,$trg2,$trg3,$trgST,$trgCxt,$option,$val,$idx,$ImgSrc,$href,$title,Url,
		
		SortView = function(){ // 자료실 리스트 영역 스타일 변경
			/*
			cxT.each(function(){
				$trgCxt = $(this);
				if(!$trgCxt.find('> span').length){
					$trgCxt.find('.view_ico').removeClass('mrT');
				}
			});
			*/
		
			sort_a.on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				
				$(this).addClass('on');
				sort_a.not($(this)).removeClass('on');
			});
		},
		
		relatedImgView = function(){ // 자료실 상세 관련이미지 썸네일
			if(imgList_a.length){
				$ImgSrc = imgList_a.first().find(' > img').attr('src');
				imgList_a.first().addClass('selected');
				wideImg.append('<div><img src='+ $ImgSrc +' alt="큰 이미지" /></div>');
			}
			imgList_a.on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				
				$trg2 = $(this),
				$ImgSrc = $trg2.find(' > img').attr('src');
				
				$trg2.addClass('selected');
				imgList_a.not($trg2).removeClass('selected');
				
				wideImg.find('img')
				.attr('src',$ImgSrc);
			});
		},
		
		activeVideo = function(){ // 자료실 상세 동영상 리스트
			if(videoList_a.length){
				$href = videoList_a.first().attr('href'),
				$title = videoList_a.first().attr('title'),
				Url = $href.substr(1);
				
				videoList_a.first().closest('dd').addClass('active');
				$(playArea[0]).append('<iframe'+
						' src="https://www.youtube.com/embed/'+ Url +
						'?autoplay=0&modestbranding=1&showinfo=0&rel=0" title="'+ $title +'" frameborder="0"'+
						' allowfullscreen></iframe>'+
						'');
				
				$(playArea[0]).css('z-index',999);
			}
			
			videoList_a.on('click',function(e){
				e.preventDefault();
				e.stopPropagation();
				
				$trg3 = $(this),
				$href = $trg3.attr('href'),
				$title = $trg3.attr('title'),
				Url = $href.substr(1),
				$idx = videoList_a.index($trg3);
				
				var cwr = currentWrapper.eq($idx),
					$playArea = playArea.eq($idx);
				
				$trg3.closest('dd').addClass('active');
				videoList_a.not($trg3).closest('dd').removeClass('active');
				
				cwr.show();
				currentWrapper.not(cwr).hide();
				
				item_dot();
				
				$playArea.html('<iframe'+
						' src="https://www.youtube.com/embed/'+ Url +
						'?autoplay=0&modestbranding=1&showinfo=0&rel=0" title="'+ $title +'" frameborder="0"'+
						' allowfullscreen></iframe>'+
						'');
				playArea.not($playArea).html('');
				$playArea.css('z-index',999);
				playArea.not($playArea).css('z-index',1);
				
			});
		},

		startImgSlide = function(){
			//관련이미지 썸네일 이미지 슬라이드
			$('#Imglist').slick({
				  dots: false,
				  infinite: true,
				  speed: 400,
				  slidesToShow: 4,
				  slidesToScroll: 4,
				  autoplay:false,
				  adaptiveHeight:true,
				  arrows:true,
				  
				  responsive: [
				    {
				      breakpoint: 640, //가로 사이즈 640
				      settings: {
				        slidesToShow: 3,
				        slidesToScroll: 3
				      }
				    },
				    {
				      breakpoint: 480, //가로 사이즈 480
				      settings: {
				        slidesToShow: 2,
				       slidesToScroll: 2
				      }
				    }
				  ]
			});
		},
		
		item_dot = function(){ // 자료실 상세 비디오 리스트 영역 말 줄임 처리
			var TextDot = [videoList_sp,$caption];
			for(var t = 0; t < TextDot.length; t++){
				TextDot[t].dotdotdot({
					fallbackToLetter: true,
					watch: true
				});
			}
		},
		
		Init = function(){
			SortView();
			relatedImgView();
			activeVideo();
			item_dot();
		};
		
		return {
			Init : Init,
			startImgSlide : startImgSlide
		};
}

function $refArchive (){
	var refArchive_ = new refArchive();

	return refArchive_
}

$(window).on({
	'load' : function(){
		if(window.innerWidth <= 768){
			$refArchive().startImgSlide();
		}
	},
	'resize' : function(){
		var ImgSlider = $('#Imglist'),
		currentItem = ImgSlider.find('.slick-current'),
		currentImg = currentItem.find('img').attr('src');
	
		if(window.innerWidth <= 768){
			if(!ImgSlider.hasClass('slick-slider')){ // 관련이미지 썸네일 이미지 슬라이드로 변경
				startImgSlide();
				setTimeout(function(){
					ImgSlider.slick('setPosition',0); // 시간 차 를 두고 슬라이드 포지션 리셋
				},100);
			}else {
				currentItem.find('> a').addClass('selected'); // 윈도우 리사이징시 현재 슬라이드 맨 앞 리스트 클래스 추가
				ImgSlider.find('li').not(currentItem).find('> a').removeClass('selected');
				$('.wideImg').find('img').attr('src',currentImg);
			}
		}else {
			if(ImgSlider.hasClass('slick-slider')){
				setTimeout(function(){ // 이미지 슬라이드 destroy
					ImgSlider
					.slick('unslick')
					.find('> li').removeAttr('tabindex style')
					.find('a').removeAttr('tabindex');
				},100);
			}
		}
	}
});
