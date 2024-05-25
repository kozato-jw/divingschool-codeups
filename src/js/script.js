
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

/* ハンバーガーメニュー */
$(function(){
  $('.btn-trigger').on('click', function() {
    $(this).toggleClass('active');
    $('.header__nav-wrapper').toggleClass('active');
    
    if ($(this).hasClass('active')) {
      $('body > *:not(header)').hide();
      $('body').css('overflow', 'hidden');
    } else {
      $('body > *:not(header)').show();
      $('body').css('overflow', '');
    }
    
    return false;
  });

  $('.header__nav-wrapper a').on('click', function() {
    $('.header__nav-wrapper').removeClass('active');
    $('.btn-trigger').removeClass('active');
    $('body > *:not(header)').show();
    $('body').css('overflow', '');
  });
});



// /* swiperスライダー */

// /* MVセクション */
// const mvSwiper = new Swiper('.mv_swiper', {
//   loop: true,
//   speed: 1500,
//   effect: 'fade',
//   autoplay: {
//     delay: 2000,
// },
//   slidesPerView: 1,
//   roundLengths: true,
// });

// /* キャンペーンセクション */
// const campaignSwiper = new Swiper('.top-campaign__swiper', {
//   loop: true,
//   slidesPerView: 1.316,
//   spaceBetween: 24,
//   roundLengths: true,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     // 768px以上の場合
//     768: {
//       slidesPerView: 3.3,
//       spaceBetween: 40,
//     },
//   },
// });



//ページトップリンク
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  var wH = window.innerHeight;
  var footerPos = $('#footer').offset().top;

  if (scroll >= 200) {
    $('#page-top').removeClass('RightOut').addClass('RightIn');
  } else {
    if ($('#page-top').hasClass('RightIn')) {
      $('#page-top').removeClass('RightIn').addClass('RightOut');
    }
  }

  if (scroll + wH >= footerPos + 16) {
    var pos = (scroll + wH) - footerPos + 16;
    $('#page-top').css('bottom', pos).removeClass('RightIn').addClass('RightOut');
  } else {
    if ($('#page-top').hasClass('RightIn')) {
      $('#page-top').css('bottom', '16px');
    }
  }
}

$(window).scroll(function () {
  PageTopAnime();
});

$('#page-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  }, 500);
  return false;
});







/* 画像に色幕のアニメーション(inview.js使用) */
var box = $('.js-colorbox'),
    speed = 700;  
box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
        if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
                  image.css('opacity','1');
                  $(this).css({'left':'0' , 'right':'auto'});
                  $(this).animate({'width':'0%'},speed);
                })
            counter = 1;
          }
    });
});




});


