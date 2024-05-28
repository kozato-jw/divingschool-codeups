
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

/* ハンバーガーメニュー */
$(function() {
  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }

  const css = `
    body.hidden > *:not(header) {
      opacity : 0;
      transition: opacity 0.6s;
    }
  `;
  addGlobalStyle(css);


  $('.hamburger').on('click', function() {
    $(this).toggleClass('js-active');
    $('.header__nav-wrapper').toggleClass('js-active');
    
    if ($(this).hasClass('js-active')) {
      $('body').addClass('hidden');
      $('body').css('overflow', 'hidden');
    } else {
      $('body').removeClass('hidden');
      $('body').css('overflow', '');
    }
    
    return false;
  });

  $('.header__nav-wrapper a').on('click', function() {
    $('.header__nav-wrapper').removeClass('js-active');
    $('.hamburger').removeClass('js-active');
    $('body').removeClass('hidden');
    $('body').css('overflow', '');
  });
});



/* swiperスライダー・MVセクション */
// const mvSwiper = new Swiper('.mv__swiper', {
//   loop: true,
//   speed: 1500,
//   effect: 'fade',
//   autoplay: {
//     delay: 2000,
//   },
//   slidesPerView: 1,
//   roundLengths: true,
// });

/*  swiperスライダー・キャンペーンセクション */
const campaignSwiper = new Swiper('.top-campaign__swiper', {
  loop: true,
  slidesPerView: 1.266,
  spaceBetween: 24,
  freeMode:true,
  enabled:true,
  speed:600,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2.5,
      spaceBetween: 32,
    },
    1024:{
      slidesPerView: 2.8,
      spaceBetween: 32,
    },
    1440: {
      // slidesPerView: 3.5,
      slidesPerView: 3.4852,
      spaceBetween: 40,
    },
  },
});




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
var box = $('.colorbox'),
    speed = 700;  
box.each(function(){
    $(this).append('<div class="js-color"></div>')
    var color = $(this).find($('.js-color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
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


