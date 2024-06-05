jQuery(function($) { // この中であればWordpressでも「$」が使用可能になる
    /* ハンバーガーメニュー */
    $(function() {
        function addGlobalStyle(css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) {
                return;
            }
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
                $('.header').css('background-color', '#408F95');
                $('.header').css('transition', '0.6s');
            } else {
                $('body').removeClass('hidden');
                $('body').css('overflow', '');
                $('.header').css('background-color', '');
            }
            return false;
        });
        $('.header__nav-wrapper a').on('click', function() {
            $('.header__nav-wrapper').removeClass('js-active');
            $('.hamburger').removeClass('js-active');
            $('body').removeClass('hidden');
            $('body').css('overflow', '');
            $('.header').css('background-color', '');
        });
    });
    /* (MV)ローディングアニメーションとswiper */
    $(document).ready(function() {
        const $title = $('.mv__title');
        const $animationContainer = $('.mv__loading-inner');

        function initialShowAndHideTitle() {
            $title.addClass('js-visible--loading');
            setTimeout(() => {
                $title.removeClass('js-visible--loading').addClass('js-hidden');
                setTimeout(hideAnimationContainer, 300);
            }, 3000);
        }

        function showTitle() {
            setTimeout(() => {
                $title.removeClass('js-hidden').addClass('js-visible');
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
            const mvSwiper = new Swiper('.mv__swiper', {
                loop: true,
                speed: 1500,
                effect: 'fade',
                autoplay: {
                    delay: 2000,
                },
                slidesPerView: 1,
                roundLengths: true,
            });
        }
        initialShowAndHideTitle();
        $('.mv__loading-image--right').on('animationend', showTitle);
        $title.on('transitionend', function() {
            if ($title.hasClass('visible')) {
                hideAnimationContainer();
            }
        });
    });
    /* swiper・キャンペーンセクション */
    const campaignSwiper = new Swiper('.top-campaign__swiper', {
        loop: true,
        slidesPerView: 1.266,
        spaceBetween: 24,
        freeMode: true,
        enabled: true,
        speed: 600,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 1.4,
                spaceBetween: 24,
            },
            624: {
                slidesPerView: 2.2,
                spaceBetween: 32,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 32,
            },
            1024: {
                slidesPerView: 2.8,
                spaceBetween: 32,
            },
            1440: {
                slidesPerView: 3.4852,
                spaceBetween: 40,
            },
            1620: {
                slidesPerView: 4.2,
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
    $(window).scroll(function() {
        PageTopAnime();
    });
    $('#page-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    /* 画像に色幕のアニメーション(inview.js使用) */
    var box = $('.colorbox'),
        speed = 700;
    box.each(function() {
        $(this).append('<div class="js-color"></div>')
        var color = $(this).find($('.js-color')),
            image = $(this).find('img');
        var counter = 0;
        image.css('opacity', '0');
        color.css('width', '0%');
        color.on('inview', function() {
            if (counter == 0) {
                $(this).delay(200).animate({
                    'width': '100%'
                }, speed, function() {
                    image.css('opacity', '1');
                    $(this).css({
                        'left': '0',
                        'right': 'auto'
                    });
                    $(this).animate({
                        'width': '0%'
                    }, speed);
                })
                counter = 1;
            }
        });
    });
});