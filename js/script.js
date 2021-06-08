//preloader

$(window).on('load', function () {
    $('#preloader').addClass('hide');
    $('body').addClass('ready');
});

$(document).ready(function () {
    let app = new Vue({
        el: '#youtube-vue',
        data: {
            view1: false,
            view2: false,
            view3: false,
            view4: false,
        },
    });

    $(window).on('load scroll', function () {
        //active nav elements when user scrolled
        const $sections = $('.section-scroll');
        $sections.each(function (i, el) {
            let top = $(el).offset().top - 100;
            let bottom = top + $(el).height();
            let scroll = $(window).scrollTop();
            let id = $(el).attr('id');
            if (scroll > top && scroll < bottom) {
                changeActiveNav(id);
            }
            //correct active contacts
            if ($(window).height() > ($('.contacts').height() + $('.footer').height() + 200)) {
                if (scroll >= ($(document).height() - $(window).height())) {
                    changeActiveNav('contacts');
                }
            }
        });
        //fixed header
        if (this.scrollY > 0) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    });
    function changeActiveNav(id) {
        $('a.active').removeClass('active');
        $('a[data-scroll="#' + id + '"]').addClass('active');
    };

    const SwiperAbout = new Swiper('.about__slider', {
        loop: true,
        effect: 'slide',
        autoHeight: true,
        speed: 500,
        preloadImages: false,
        lazy: {
            loadOnTransitionStart: false,
            loadPrevNext: false,
        },
        watchSlidesProgress: true,
        watchSlidesVisiility: true,
        navigation: {
            nextEl: '.about-next',
            prevEl: '.about-prev',
        },
        pagination: {
            el: '.about-pagination',
            type: 'progressbar',
        }
    });
    const SwiperModal = new Swiper('.modal__slider', {
        loop: true,
        effect: 'slide',
        autoHeight: true,
        speed: 1000,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
            nextEl: '.modal__btn--next',
            prevEl: '.modal__btn--prev',
        },
    });
    const SwiperReviews = new Swiper('.reviews__slider', {
        loop: true,
        effect: 'slide',
        autoHeight: true,
        speed: 500,
        slidesPerView: 1,
        navigation: {
            nextEl: '.reviews-next',
            prevEl: '.reviews-prev',
        },
        pagination: {
            el: '.reviews-pagination',
            type: 'progressbar',
        }
    });

    //accordeon
    $('.accordeon__trigger').click(function () {
        $('.accordeon__trigger').not($(this)).removeClass('active');
        $('.accordeon__content').not($(this).next()).slideUp(300);
        $(this).toggleClass('active').next().slideToggle(300);
    });

    //smooth scroll to anchor
    $('[data-scroll]').on('click', function (event) {
        closeMobileNav();
        $('.burger').removeClass('active');
        elementId = $(this).data('scroll');
        elementOffset = $(elementId).offset().top;
        $('html, body').animate({
            scrollTop: elementOffset - 40 + 'px'
        });
        event.preventDefault();
    });

    //burger
    let nav = $('.header__nav');
    $('.burger').on('click', function (event) {
        event.stopPropagation();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.header').addClass('mobileFixed');
            nav.addClass('active');
            $('body').addClass('no-scroll');
        } else {
            closeMobileNav();
        }
    });

    //close nav to click other place
    $(document).click(function (e) {
        if (!$('.burger').is(e.target) && !nav.is(e.target) && nav.has(e.target).length === 0 && !$('.header').is(e.target)) {
            $('.burger').removeClass('active');
            closeMobileNav();
        };
    });

    function closeMobileNav() {
        $('.header').removeClass('mobileFixed');
        nav.removeClass('active');
        $('body').removeClass('no-scroll');
    }
    //--------------------------modals-------------------
    const modalCalls = $('[data-modal]'),
        modal = $('.modal'),
        modalCloseBtn = $('[data-close]');

    // // openModal
    modalCalls.on('click', function (event) {
        setTimeout(() => {
            if ($('body').hasClass('no-scroll')) {
            } else {
                $('body').addClass('no-scroll');
            }
            modal.addClass('show');
        }, 0)
        setTimeout(() => {
            $('.modal__window').addClass('show');
        }, 400);
        event.preventDefault();
        SwiperModal.slideTo($(this).attr('data-modal'));
    });


    // //remove modal 
    const removeModal = () => {
        $('.modal__window').removeClass('show');
        setTimeout(() => {
            $(modal).removeClass('show');
        }, 400);
    };
    modalCloseBtn.on('click', function (event) {
        removeModal();
        $('body').removeClass('no-scroll');
        event.preventDefault();
    });
    modal.on('click', function () {
        removeModal();
        $('body').removeClass('no-scroll');

    });
    $('.modal__window').on('click', function (event) {
        event.stopPropagation();
    });

    //Filter=====================================

    let filter = $('[data-filter]');
    filter.on('click', function (event) {
        event.preventDefault();

        filter.removeClass('decorated');
        $(this).addClass('decorated');
        let cat = $(this).data('filter');
        if (cat === 'all') {
            $('[data-category]').fadeIn(700);
            $('[data-category]').addClass('showInModal');
        } else {
            $('[data-category]').each(function () {
                let dataCat = $(this).data('category');
                if (dataCat != cat) {
                    $(this).fadeOut(500);
                    $(this).removeClass('showInModal');
                } else {
                    $(this).addClass('showInModal');
                    setTimeout(() => {
                        $(this).fadeIn(500);
                    }, 500);
                }
            })
        }
    });
});
