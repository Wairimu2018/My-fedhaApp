;(function($) {

    'use strict'

    var portfolioCube = function() {
        if ( $().cubeportfolio ) {
            $('.wprt-portfolio-grid').each(function() {
                var
                $this = $(this),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                item4 = $this.data("column4"),
                gapH = Number($this.data("gaph")),
                gapV = Number($this.data("gapv")),
                filter = $this.data("filter");

                if ( !filter ) { filter = '*'; }
                else { filter = '.' + filter; }

                $(this).find('#projects').cubeportfolio({
                    filters: '#project-filter',
                    layoutMode: 'grid',
                    defaultFilter: filter,
                    animationType: 'quicksand',
                    gapHorizontal: gapH,
                    gapVertical: gapV,
                    showNavigation: true,
                    showPagination: true,
                    gridAdjustment: 'responsive',
                    rewindNav: false,
                    auto: false,
                    mediaQueries: [{
                        width: 1500,
                        cols: item
                    }, {
                        width: 1100,
                        cols: item
                    }, {
                        width: 800,
                        cols: item2
                    }, {
                        width: 550,
                        cols: item3
                    }, {
                        width: 320,
                        cols: item4
                    }],
                    caption: ' ',
                    displayType: 'bottomToTop',
                    displayTypeSpeed: 100
                });
            });
        }
    };

    var portfolioOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-portfolio-slider').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var carouselBoxOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-carousel-box').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                loop = $this.data("loop"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: loop,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var newsOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-news').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var teamOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-team').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

    var imagesOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-image-slider').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

        var partnerOwl = function() {
        if ( $().owlCarousel ) {
            $('.wprt-partner-slider').each(function(){
                var
                $this = $(this),
                auto = $this.data("auto"),
                item = $this.data("column"),
                item2 = $this.data("column2"),
                item3 = $this.data("column3"),
                gap = Number($this.data("gap"));

                $this.find('.owl-carousel').owlCarousel({
                    loop: false,
                    margin: gap,
                    nav: true,
                    navigation : true,
                    pagination: true,
                    autoplay: auto,
                    autoplayTimeout: 5000,
                    responsive: {
                        0:{
                            items:item3
                        },
                        600:{
                            items:item2
                        },
                        1000:{
                            items:item
                        }
                    }
                });
            });
        }
    };

     var galleriesFlex = function() {
        if ( $().flexslider ) {
            $('.wprt-galleries').each(function(){
                var iw = $(this).data("width");
                var im = $(this).data("margin");

                $(this).children('#wprt-carousel').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    itemWidth: 140,
                    itemMargin: 17,
                    asNavFor: $(this).children('#wprt-slider')
                });
                $(this).children('#wprt-slider').flexslider({
                    animation: "slide",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    sync: $(this).children('#wprt-carousel')
                });
            });
        }
    };

    var toggles = function() {
        var args = {easing:'easeOutExpo', duration:300};

        $('.toggle-item.active').find('.toggle-content').show();
        $('.toggle-heading').on('click', function () {
            if ( !$(this).parent().is('.active') ) {
                $(this).parent().toggleClass('active')
                    .children('.toggle-content').slideToggle(args)
                .parent().siblings('.active').removeClass('active')
                    .children('.toggle-content').slideToggle(args);
            } else {
                $(this).parent().toggleClass('active');
                $(this).next().slideToggle(args);
            }
        });
    };

    var tabs = function() {
        $('.wprt-tabs').each( function(){
            
            $(this).children('.tab-content').children('div').hide();
            $(this).children('.tab-content').children('.content-1').show();

            $(this).on('click', 'li', function(e){
                var 
                currList = $(this).index(),
                currContent = $(this).parents('.wprt-tabs').children('.tab-content').children('div').eq(currList);
                $(this).addClass('active').siblings('li').removeClass('active');
                currContent.addClass('active').show().siblings().hide();
                e.preventDefault();
            })
        })
    };

    var popupImages = function() {
        if ( $().magnificPopup ) {
            $('.wprt-galleries, .wprt-images-grid, .project-related, .wprt-image-slider, .wprt-portfolio-slider').each(function () {
                $(this).find('.zoom-popup').magnificPopup({
                     // delegate: 'a',
                      type: 'image',
                      removalDelay: 500, //delay removal by X to allow out-animation
                      callbacks: {
                        beforeOpen: function() {
                          // just a hack that adds mfp-anim class to markup 
                           this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                           this.st.mainClass = this.st.el.attr('data-effect');
                        }
                      },
                      closeOnContentClick: true,
                      midClick: true //
                });
            });
        };
    };

    var spacer = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            if ( matchMedia( 'only screen and (max-width: 767px)' ).matches )
                mode = 'smobile';

            $('.wprt-spacer').each(function(){
                if ( mode == 'desktop' ) {
                    $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                } else if ( mode == 'mobile' ) {
                    $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                } else {
                    $(this).attr('style', 'height:' + $(this).data('smobi') + 'px')
                }
            })

        });
    };

    var contentBox = function() {
        $(window).on('load resize', function() {
            var mode = 'desktop';

            if ( matchMedia( 'only screen and (max-width: 991px)' ).matches )
                mode = 'mobile';

            $('.wprt-content-box').each(function(){
                var margin = $(this).data('margin');
                var smargin = $(this).data('mobimargin');

                if ( smargin ) {
                    if ( mode == 'desktop' ) {
                        $(this).attr('style', 'margin:' + margin)
                    } else if ( mode == 'mobile' ) {
                        $(this).attr('style', 'margin:' + smargin)
                    }
                }
            })
        });
    };

    var progressBar = function() {
        if ( $().waypoint ) {
            $('.progress-bar').on('on-appear', function() {
                $(this).each(function() {
                    var percent = parseInt($(this).data('percent'));

                    $(this).find('.progress-animate').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");

                    $(this).parent('.wprt-progress').find('.perc').addClass('show').animate({
                        "width": percent + '%'
                    },1000, "easeInCirc");
                });
            });
        }
    };

    var counter = function() {
        if ( $().countTo ) {
            $('.wprt-counter').on('on-appear', function() {
                $(this).find('.number').each(function() {
                    var to = $(this).data('to'),
                        speed = $(this).data('speed');
                        
                    $(this).countTo({
                        to: to,
                        speed: speed
                    });
                });
            });
        }
    };

    var animation = function() {
        $('.wprt-animation-block').each( function() {
            var el = $(this),
            animate = el.data('animate'),
            duration = el.data('duration'),
            delay = el.data('delay'),
            position = el.data('position');

            el.css({
                '-webkit-animation-delay':      delay,
                'animation-delay':              delay,
                '-webkit-animation-duration':   duration,
                'animation-duration':           duration
            });
        
            el.waypoint(function() {
                el.addClass('animated').addClass(animate);
                },{
                    triggerOnce: true,
                    offset: position
            });
        });
    };

    var popupVideo = function() {
        if ( $().magnificPopup ) {
            $('.popup-video').magnificPopup({
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false,
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">'+
                            '<div class="mfp-close"></div>'+
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                          '</div>',

                    srcAction: 'iframe_src',
                }
            });
        };
    };

    //Price Fillter
    function pricefill () {
        if($('.range-slider-price').length){

            var priceRange = document.getElementById('range-slider-price');

            noUiSlider.create(priceRange, {
                start: [ 20, 300 ],
                limit: 500,
                behaviour: 'drag',
                connect: true,
                range: {
                    'min': 20,
                    'max': 500
                }
            });

            var nodes = [
                document.getElementById('max'), 
                document.getElementById('min')
            ];

            priceRange.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
                nodes[handle].innerHTML = '$' + values[handle];
            });
        }
    }

    var parallax = function() {
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        /*
         * Please note that background attachment fixed doesn't work on iOS
         */ 
        if (!iOS) {
            $('.parallax').css({backgroundAttachment:'fixed'});
        } else {
            $('.parallax').css({backgroundAttachment:'scroll'});
        }

        if ( $().parallax && matchMedia( 'only screen and (min-width: 867px)' ).matches ) {
            $('.row-testimonials-1').parallax("50%", 0.4);
            $('.row-testimonials-2').parallax("50%", 0.4);
        }
    };

    var ajaxContactForm = function() {
        if ( $().validate ) {        
            $('.contact-form').each(function() {
                $(this).validate({
                    submitHandler: function( form ) {
                        var
                        $form = $(form),
                        str = $form.serialize();

                        $.ajax({
                            type: "POST",
                            url:  $form.attr('action'),
                            data: str,
                            beforeSend: function () {
                                $form.find('.wprt-alert').remove();
                            },
                            success: function( msg ) {
                                var result, cls;

                                if ( msg == 'Success' ) {
                                    result = 'Your message has been sent. Thank you!';
                                    cls = 'success';
                                } else {
                                    result = 'Error sending email.';
                                    cls = 'error';
                                }

                                $form.prepend(
                                    $('<div />', {
                                        'class': 'wprt-alert ' + cls,
                                        'text' : result
                                    }).append(
                                        $('<a class="remove" href="#"><i class="fa fa-close"></i></a>')
                                    )
                                );

                                $form.find(':input').not('.submit').val('');
                            }
                        });
                    }
                });
            });
        }
        $(document).on('click', '.wprt-alert .remove', function(e) {
            $(this).parent().slideUp();

            e.preventDefault();
        })
    };

    var googleMap = function() {
        if ( $().gmap3 ) {
            $('.gmap').each(function() {
                var $this = $(this),
                lat = $this.data('lat'),
                lng = $this.data('lng'),
                icon = $this.data('icon'),
                zoom = $this.data('zoom'),
                scrollwheel = $this.data('scrollwheel'),
                center = [lat, lng];

                $this.gmap3({
                    center: center,
                    zoom: zoom,
                    scrollwheel: scrollwheel
                })
                .marker({
                    position: center,
                    icon: 'http://maps.google.com/mapfiles/marker_green.png'
                });
            });
        }
    };

    var inViewport = function() {
        $('[data-in-viewport="yes"]').waypoint(function() {
            $(this).trigger('on-appear');
        }, { offset: '90%', triggerOnce: true });

        $(window).on('load', function() {
            setTimeout(function() {
                $.waypoints('refresh');
            }, 100);
        });
    };

    // Dom Ready
    $(function() {
        portfolioCube();
        portfolioOwl();
        carouselBoxOwl();
        newsOwl();
        teamOwl();
        imagesOwl();
        partnerOwl();
        galleriesFlex();
        toggles();
        tabs();
        popupImages();
        spacer();
        contentBox();
        progressBar();
        counter();
        animation();
        popupVideo();
        pricefill();
        parallax();
        ajaxContactForm();
        googleMap();
        inViewport()
     });

})(jQuery);

