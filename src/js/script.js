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

/* ギャラリーのモーダル */
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

/* FAQアコーディオン */
$(document).ready(function () {
$(".faq-box__function").click(function () {
    $(this).next(".faq-box__answer").slideToggle();
    $(this).toggleClass("js-close");
});
});

/* (トップページMV)ローディングアニメーションとswiper */
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

/* ページトップリンク */
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

/* インフォメーション・タブ */
function getHashID(hashIDName) {
    if (hashIDName) {
        $('.tab').find('a').each(function() {
            var idName = $(this).attr('href');
            if (idName === hashIDName) {
                var btnElm = $(this);
                $('.tab__btn').removeClass("active");
                btnElm.addClass("active");
                $(".information-card").removeClass("is-active");
                $(hashIDName).addClass("is-active");
            }
        });
    }
}
$('.tab__btn').on('click', function() {
    var idName = $(this).attr('href');
    $('.tab__btn').removeClass("active");
    $(this).addClass("active");
    getHashID(idName);
    return false;
});
$(window).on('load', function() {
    $('.tab__btn:first-of-type').addClass("active");
    $('.information-card:first-of-type').addClass("is-active");
    var hashName = location.hash;
    getHashID(hashName);
});

/*サイドバー・アーカイブ情報のトグル */
$(document).ready(function() {
    const firstYear = $('.sidebar__archive-list').first();
    firstYear.find('.sidebar__archive-months').show();
    firstYear.find('.sidebar__archive-year').on('click', function(e) {
        e.preventDefault();
        firstYear.find('.sidebar__archive-months').slideToggle();
        firstYear.toggleClass('js-open');
    });

    const secondYear = $('.sidebar__archive-list').eq(1);
    secondYear.find('.sidebar__archive-months').hide();
    secondYear.find('.sidebar__archive-year').on('click', function(e) {
        e.preventDefault();
        secondYear.find('.sidebar__archive-months').slideToggle();
        secondYear.toggleClass('js-open');
    });
});

/* コンタクトフォーム */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const consentCheckbox = document.getElementById('consentCheckbox');
    setupEventListeners();

    function setupEventListeners() {
        consentCheckbox.addEventListener('change', handleConsentChange);
        const requiredFields = form.querySelectorAll('.form__required');
        requiredFields.forEach(field => setupFieldInputListener(field));
        form.addEventListener('submit', handleSubmit);
    }

    function handleConsentChange() {
        const isChecked = this.checked;
        submitButton.disabled = !isChecked;
        submitButton.classList.toggle('btn--disabled', !isChecked);
    }

    function setupFieldInputListener(requiredField) {
        const fieldContainer = requiredField.closest('dl');
        const input = fieldContainer.querySelector('input, textarea, select');
        if (input) {
            input.addEventListener('input', function() {
                validateField(input, fieldContainer);
            });
        }
    }

    // function validateField(input, fieldContainer) {
    //     if (input.value.trim()) {
    //         input.classList.remove('form__error');
    //         fieldContainer.classList.remove('form__item--error');
    //     } else {
    //         input.classList.add('form__error');
    //         fieldContainer.classList.add('form__item--error');
    //     }
    // }

    // function handleSubmit(event) {
    //     event.preventDefault();
    //     let hasError = false;
    //     resetErrors();
    //     hasError = validateRequiredFields();
    //     hasError = validateCheckGroups() || hasError;
    //     hasError = validateConsentCheckbox() || hasError;
    //     if (hasError) {
    //         form.classList.add('form--error');
    //         window.scrollTo(0, 0);
    //     } else {
    //         form.classList.remove('form--error');
    //         form.submit();
    //     }
    // }

    // function resetErrors() {
    //     form.classList.remove('form--error');
    //     form.querySelectorAll('.form__item--error').forEach(item => item.classList.remove('form__item--error'));
    //     form.querySelectorAll('.form__error').forEach(input => input.classList.remove('form__error'));
    // }

    // function validateRequiredFields() {
    //     let hasError = false;
    //     const requiredFields = form.querySelectorAll('.form__required');
    //     requiredFields.forEach(field => {
    //         const fieldContainer = field.closest('dl');
    //         const input = fieldContainer.querySelector('input, textarea, select');
    //         if (input) {
    //             const isEmpty = !input.value.trim();
    //             const isEmailInvalid = input.type === 'email' && !input.value.includes('@');
    //             if (isEmpty || isEmailInvalid) {
    //                 input.classList.add('form__error');
    //                 fieldContainer.classList.add('form__item--error');
    //                 hasError = true;
    //             }
    //         }
    //     });
    //     return hasError;
    // }

    // function validateCheckGroups() {
    //     let hasError = false;
    //     const checkGroups = form.querySelectorAll('.form__check');
    //     checkGroups.forEach(group => {
    //         const checkboxes = Array.from(group.querySelectorAll('input[type="checkbox"]'));
    //         const hasChecked = checkboxes.some(checkbox => checkbox.checked);
    //         if (!hasChecked) {
    //             group.classList.add('form__item--error');
    //             group.querySelectorAll('label').forEach(label => label.classList.add('form__item--error'));
    //             hasError = true;
    //         } else {
    //             group.classList.remove('form__item--error');
    //             group.querySelectorAll('label').forEach(label => label.classList.remove('form__item--error'));
    //         }
    //     });
    //     return hasError;
    // }

    // function validateConsentCheckbox() {
    //     const isConsentChecked = consentCheckbox.checked;
    //     if (!isConsentChecked) {
    //         consentCheckbox.closest('p').classList.add('form__item--error');
    //     } else {
    //         consentCheckbox.closest('p').classList.remove('form__item--error');
    //     }
    //     return !isConsentChecked;
    // }
});

/* カテゴリータブとナビメニューからのダイレクトリンク */

$(document).ready(function() {
  // 初回ロード時にページのハッシュをチェックするために、window.loadイベントを使う
  $(window).on('load', function() {
    let hash = window.location.hash;
    if (hash && $(`[data-tab="${hash.replace('#', '')}"]`).length) {
      activateTab(hash.replace('#', ''));
    } else {
      activateTab('tab-1'); // 初回ロード時は「all」（tab-1）を表示
    }
  });

  // category__btnクリック時の処理
  $('.category__btn').on('click', function(e) {
    e.preventDefault();
    let tabId = $(this).data('tab');
    
    // 同じタブが押されたか確認
    if ($(this).hasClass('active')) {
      // ハッシュを一時的に削除してから再度設定する
      window.location.hash = ''; // ハッシュをリセット
      window.location.hash = tabId; // 再設定して強制的にスクロールをトリガー
      scrollToTop(); // スクロールのみ発生
    } else {
      activateTab(tabId);
      window.location.hash = tabId; // URLのハッシュを更新
      scrollToTop(); // タブ切り替え時もスクロール
    }
  });

  // 外部リンクで特定タブにアクセスした場合の対応（URLハッシュが変わったとき）
  $(window).on('hashchange', function() {
    let hash = window.location.hash.replace('#', '');
    if ($(`[data-tab="${hash}"]`).length) {
      activateTab(hash);
      scrollToTop(); // ハッシュ変更時にトップにスクロール
    }
  });

  // タブの表示・非表示とactiveクラスの管理
  function activateTab(tabId) {
    // すべてのボタンからactiveクラスを外す
    $('.category__btn').removeClass('active');
    
    // クリックされたボタンにactiveクラスを追加
    $(`[data-tab="${tabId}"]`).addClass('active');
    
    // すべてのカードを非表示にする
    $('.campaign-card, .voice-card').css('display', 'none'); // .hide()の代わりに瞬時に非表示
    
    // 対応するcampaign-cardのみ表示
    if (tabId === 'tab-1') {
      // "all" タブの場合はすべて表示
      $('.campaign-card, .voice-card').css('display', 'block'); // .show()の代わりに瞬時に表示
    } else {
      // 指定のクラスを持つカードを表示
      $(`.js-${tabId}`).css('display', 'block'); // 瞬時に表示
    }
  }

  // トップにスムーススクロールする関数
  function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 300); // 300ms かけてトップにスクロール
  }
});





