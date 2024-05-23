
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

/* ハンバーガーメニュー */
$(function(){
  // ハンバーガーメニューのトリガー
  $('.btn-trigger').on('click', function() {
    $(this).toggleClass('active');
    $('.header__nav-wrapper').toggleClass('active');
    
    if ($(this).hasClass('active')) {
      // .activeクラスがついたらheader以外の要素を非表示にする
      $('body > *:not(header)').hide();
      // bodyのスクロールを禁止する
      $('body').css('overflow', 'hidden');
    } else {
      // .activeクラスが外れたらheader以外の要素を再表示する
      $('body > *:not(header)').show();
      // bodyのスクロールを許可する
      $('body').css('overflow', '');
    }
    
    return false;
  });

  // ナビゲーションリンクのクリックイベント
  $('.header__nav-wrapper a').on('click', function() {
    // .activeクラスを外してナビゲーションを非表示にする
    $('.header__nav-wrapper').removeClass('active');
    // ハンバーガーメニューの.activeクラスを外す
    $('.btn-trigger').removeClass('active');
    // header以外の要素を再表示する
    $('body > *:not(header)').show();
    // bodyのスクロールを許可する
    $('body').css('overflow', '');
  });
});



/* swiperスライダー */
const mySwiper = new Swiper('.swiper', {
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
    }
  },
});


});

