
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



/* swiperスライダー */

/* MVセクション */
const mvSwiper = new Swiper('.mv_swiper', {
  loop: true,
  speed: 1500,
  effect: 'fade',
  autoplay: {
    delay: 2000,
},
  slidesPerView: 1,
  roundLengths: true,
});

/* キャンペーンセクション */
const campaignSwiper = new Swiper('.top-campaign__swiper', {
  loop: true,
  slidesPerView: 1.316,
  spaceBetween: 24,
  roundLengths: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    // 768px以上の場合
    768: {
      slidesPerView: 3.3,
      spaceBetween: 40,
    },
  },
});

});


