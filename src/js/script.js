jQuery(function($) {
  /* ハンバーガーメニュー */
  $(function() {
      function addGlobalStyle(css) {
          var head, style;
          head = document.getElementsByTagName("head")[0];
          if (!head) {
              return;
          }
          style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = css;
          head.appendChild(style);
      }
      const css = `
      body.hidden > *:not(header) {
        opacity: 0;
        transition: opacity 0.6s;
      }
    `;
      addGlobalStyle(css);
      $(".js-hamburger").on("click", function() {
          $(this).toggleClass("js-active");
          $(".js-header__nav-wrapper").toggleClass("js-active");
          if ($(this).hasClass("js-active")) {
              $("body").addClass("hidden");
              $("body").css("overflow", "hidden");
              $(".header").css("background-color", "#408F95");
              $(".header").css("transition", "0.6s");
          } else {
              $("body").removeClass("hidden");
              $("body").css("overflow", "");
              $(".header").css("background-color", "");
          }
          return false;
      });
      $(".header__nav-wrapper a").on("click", function() {
          $(".header__nav-wrapper").removeClass("js-active");
          $(".hamburger").removeClass("js-active");
          $("body").removeClass("hidden");
          $("body").css("overflow", "");
          $(".header").css("background-color", "");
      });
      $(".header__logo a").on("click", function(e) {
          if ($(".header").hasClass("js-visible")) {
              e.preventDefault();
              $(".header__nav-wrapper").removeClass("js-active");
              $(".hamburger").removeClass("js-active");
              $("body").removeClass("hidden");
              $("body").css("overflow", "");
              $(".header").css("background-color", "");
              setTimeout(function() {
                  window.location.href = "/";
              }, 600);
          }
      });
  });
});

/* (MV)ローディングアニメーションとswiper */
$(document).ready(function() {
  const $title = $(".js-mv__title");
  const $animationContainer = $(".js-mv__loading-inner");
  const $header = $(".js-top-header");

  function initialShowAndHideTitle() {
      $title.addClass("js-visible--loading");
      setTimeout(() => {
          $title.removeClass("js-visible--loading").addClass("js-hidden");
      }, 3000);
  }

  function showTitle() {
      setTimeout(() => {
          $title.removeClass("js-hidden").addClass("js-visible");
      }, 1000);
  }

  function hideAnimationContainer() {
      setTimeout(() => {
          $animationContainer.fadeOut(2000, function() {
              $animationContainer.remove();
              startSwiper();
          });
      }, 2000);
  }

  function startSwiper() {
      const mvSwiper = new Swiper(".js-mv__swiper", {
          loop: true,
          speed: 1500,
          effect: "fade",
          autoplay: {
              delay: 2000,
          },
          slidesPerView: 1,
          roundLengths: true,
      });
  }

  function showHeader() {
      $header.addClass("js-visible").fadeIn(1000);
  }
  initialShowAndHideTitle();
  $(".mv__loading-image--right").on("animationend", function() {
      showTitle();
  });
  $title.on("transitionend", function() {
      if ($title.hasClass("js-visible")) {
          hideAnimationContainer();
          showHeader();
      }
  });
});

/* swiper・キャンペーンセクション */
const campaignSwiper = new Swiper(".js-campaign__swiper", {
  slidesPerView: "auto",
  spaceBetween: 24,
  loop: true,
  freeMode: true,
  navigation: {
      nextEl: ".campaign__swiper-button-next",
      prevEl: ".campaign__swiper-button-prev",
  },
  breakpoints: {
      768: {
          spaceBetween: 40,
      },
  },
});

//ページトップリンク
function PageTopAnime() {
  var scroll = $(window).scrollTop();
  var wH = window.innerHeight;
  var footerPos = $("#footer").offset().top;
  if (scroll >= 200) {
      $("#page-top").removeClass("RightOut").addClass("RightIn");
  } else {
      if ($("#page-top").hasClass("RightIn")) {
          $("#page-top").removeClass("RightIn").addClass("RightOut");
      }
  }
  if (scroll + wH >= footerPos + 16) {
      var pos = scroll + wH - footerPos + 16;
      $("#page-top").css("bottom", pos).removeClass("RightIn").addClass("RightOut");
  } else {
      if ($("#page-top").hasClass("RightIn")) {
          $("#page-top").css("bottom", "16px");
      }
  }
}
$(window).scroll(function() {
  PageTopAnime();
});
$("#page-top").click(function() {
  $("body,html").animate({
      scrollTop: 0,
  }, 500);
  return false;
});

/* 画像に色幕のアニメーション(inview.js使用) */
var box = $(".js-colorbox"),
  speed = 700;
box.each(function() {
  $(this).append('<div class="js-color"></div>');
  var color = $(this).find($(".js-color")),
      image = $(this).find("img");
  var counter = 0;
  image.css("opacity", "0");
  color.css("width", "0%");
  color.on("inview", function() {
      if (counter == 0) {
          $(this).delay(200).animate({
              width: "100%",
          }, speed, function() {
              image.css("opacity", "1");
              $(this).css({
                  left: "0",
                  right: "auto",
              });
              $(this).animate({
                  width: "0%",
              }, speed);
          });
          counter = 1;
      }
  });
});

/* モーダル */
$(document).ready(function() {
    $('.gallery__image img').on('click', function() {

        var imgSrc = $(this).attr('src');
        $('.modal img').attr('src', imgSrc);
        $('header').hide();
        $('.modal').fadeIn();
    });

    $('.modal').on('click', function() {

        $(this).fadeOut(function() {
            $('header').show();
        });
    });
});

/* インフォメーション・タブ */
function getHashID(hashIDName) {
    if (hashIDName) {
        $('.tab').find('a').each(function() {
            var idName = $(this).attr('href');
            if (idName === hashIDName) {
                var btnElm = $(this); // 現在の .tab__btn 要素を取得
                $('.tab__btn').removeClass("active"); // 他の .tab__btn から .active を削除
                btnElm.addClass("active"); // クリックされた .tab__btn に .active を追加
                $(".information-card").removeClass("is-active");
                $(hashIDName).addClass("is-active");
            }
        });
    }
}

$('.tab__btn').on('click', function() {
    var idName = $(this).attr('href');
    $('.tab__btn').removeClass("active"); // 他の .tab__btn から .active を削除
    $(this).addClass("active"); // クリックされた .tab__btn に .active を追加
    getHashID(idName);
    return false;
});

$(window).on('load', function() {
    $('.tab__btn:first-of-type').addClass("active");
    $('.information-card:first-of-type').addClass("is-active");
    var hashName = location.hash;
    getHashID(hashName);
});



document.addEventListener('DOMContentLoaded', function() {
    const yearLinks = document.querySelectorAll('.js-sidebar__archive-year');

    yearLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // すべての年リンクから js-active クラスを削除
            yearLinks.forEach(link => {
                link.classList.remove('js-active');
            });

            // クリックされた年リンクに js-active クラスを付与
            this.classList.add('js-active');

            // すべての月リストから js-active クラスを削除
            document.querySelectorAll('.js-sidebar__archive-months').forEach(monthList => {
                monthList.classList.remove('js-active');
            });

            // クリックされた年リンクの次の月リストに js-active クラスを付与
            const monthList = this.nextElementSibling;
            if (monthList && monthList.classList.contains('js-sidebar__archive-months')) {
                monthList.classList.add('js-active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-box');
  
    // 初期状態で最初の答えを開いた状態にする
    const firstAnswer = faqItems[0].querySelector('.faq-box__answer');
    const firstQuestion = faqItems[0].querySelector('.faq-box__function');
    firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    firstQuestion.classList.add('open');
  
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-box__function');
      const answer = item.querySelector('.faq-box__answer');
  
      question.addEventListener('click', function() {
        // 他の全ての答えを閉じ、openクラスを削除
        faqItems.forEach(i => {
          const ans = i.querySelector('.faq-box__answer');
          const que = i.querySelector('.faq-box__function');
          if (ans !== answer) {
            ans.style.maxHeight = '0';
            que.classList.remove('open');
          }
        });
  
        // クリックされた答えを開閉し、openクラスを追加/削除
        if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.classList.add('open');
        } else {
          answer.style.maxHeight = '0';
          question.classList.remove('open');
        }
      });
    });
  });
  
