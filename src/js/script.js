$(document).ready(function() {
    var swiper = new Swiper('.swiper-programs', {
        slidesPerView: 3,
        spaceBetween: 30,
        draggable: true,
        navigation: {
            nextEl: '.next-button-programs',
            prevEl: '.prev-button-programs',
        },
        breakpoints: {
            992: {
                slidesPerView: 1,
            },
            1200: {
                slidesPerView: 2,
                spaceBetween: 30
            }
        }
    });
    var swiper = new Swiper('.swiper-reviews', {
        slidesPerView: 5,
        spaceBetween: 30,
        draggable: true,
        navigation: {
            nextEl: '.next-button-reviews',
            prevEl: '.prev-button-reviews',
        },
        breakpoints: {
            560: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

    function showSection(section, isAnimate, isFixed) {
        if (!isFixed) {
            var direction = section.replace(/#/, '');
            var reqSection = $('.section').filter('[data-section="' + direction + '"]'),
                reqSectionPos = reqSection.offset().top;
        } else {
            var direction = section;
            var reqSection = $('.section').filter('[data-section="' + direction + '"]'),
                reqSectionPos = reqSection.offset().top;
        }
        if (isAnimate) {
            $('html, body').stop(true, true).animate({ scrollTop: reqSectionPos - 180 }, 300);
        }
    }

    $(window).scroll(function() {
        $('.section').each(function() {
            var $this = $(this),
                topPx = $this.offset().top - 300,
                bottomPx = topPx + $this.height(),
                wScroll = $(window).scrollTop(),
                arrow = $('#top');
            if (topPx < wScroll && bottomPx > wScroll) {
                var current = $this.data('section'),
                    reqLink = $('.fixedNav__item').filter('[data-target="' + current + '"]');
                reqLink.addClass('active').siblings().removeClass('active');
            }
            if (wScroll > 250) {
                arrow.fadeIn();
            } else {
                arrow.fadeOut();
            }
        })
    })
    $('.fixedNav__item').on('click', function(e) {
        showSection($(this).data('target'), true, true);
    });

    $('nav a').on('click', function(e) {
        showSection($(this).data('target'), true, false);
    });

    $('#top').on('click', function() {
        $('html, body').stop(true, true).animate({ scrollTop: 0 }, 500);
    })
    $(".fancybox").fancybox();

    var placemarks = [];
    $('.placemark-item').each(function(key, value) {
        coords = $(value).data('coords').split(',');
        lat = parseFloat(coords[0]);
        long = parseFloat(coords[1]);
        data = {
            coords: [lat, long]
        };
        placemarks.push(data);
    })
    if (placemarks.length != 0) {
        center = placemarks[0].coords;
        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map("map", {
                center: center,
                zoom: 15,
                controls: []
            });
            var placemark = [];
            $.each(placemarks, function(key, value) {
                placemark[key] = new ymaps.Placemark(value.coords, {});
                myMap.geoObjects.add(placemark[key]);
            })

            $('.placemark-item').click(function() {
                str = $(this).data('coords').split(',');
                center = [parseFloat(str[0]), parseFloat(str[1])];
                zoom = myMap.getZoom();
                myMap.setCenter(center, zoom, { duration: 500 });
            });
        }
    }
    $('.place-name').on('click', function() {
        var $this = $(this),
            item = $this.closest('li'),
            list = $this.closest('ul'),
            items = list.find('.placemark-item'),
            answer = item.find('.place-info'),
            otherContent = list.find('.place-info'),
            duration = 300;
        if (!item.hasClass('active')) {
            items.removeClass('active');
            item.addClass('active');
            otherContent.stop(true, true).slideUp(duration);
            answer.stop(true, true).slideDown(duration);
        } else {
            answer.stop(true, true).slideUp(duration);
            item.removeClass('active');
        }
    })
    $('select').styler();
    $('.phonemask').inputmask('+7(999)999-99-99');
    $(document).on('opening', '.remodal', function() {
        $('.wrapper').addClass('blured');
    });

    $(document).on('closing', '.remodal', function(e) {
        $('.wrapper').removeClass('blured');
    });
});