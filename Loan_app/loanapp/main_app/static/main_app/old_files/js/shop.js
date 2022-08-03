;(function($) {

    'use strict'

   
    var shopTabs = function () {
        $('.shop-tabs').each(function() {
                $(this).find('.wc-tab').hide();
                $(this).find('.wc-tab:first').show();

                $(this).find('.wc-tabs li').on('click', function(e) {
                    var idx = $(this).index();
                    var content = $(this).closest('.shop-tabs').find('.wc-tab').eq(idx);

                    $(this).addClass('active').siblings().removeClass('active');
                    content.fadeIn('slow').siblings('.wc-tab').hide();

                    e.preventDefault();
                });
        });
    };


    var   cartQuantity = function () {

        $('.quantity').on('click', '.max', function(e) {
            var count = parseInt($(this).parent().children(".qty").val(), 10);
            if (!isNaN(count)) {
                $(this).parent().children(".qty").val(count + 1);
            }
            return false;
        });

        $('.quantity').on('click', '.min', function(e) {
            var count = parseInt($(this).parent().children(".qty").val(), 10);
            if (!isNaN(count) && count > 0) {
                $(this).parent().children(".qty").val(count - 1);
            }
            return false;
        });
    };

    var imageZoom = function (){
        
            $('.zoo-item').ZooMove();
    };

    var startRating = function () {
        $('#stars li').on('mouseover', function(){
        var countStar = parseInt($(this).data('value'), 10);

        $(this).parent().children('li.star').each(function(e){
              if (e < countStar) {
                $(this).addClass('hover');
              }
              else {
                $(this).removeClass('hover');
              }
            });
        
        })

        .on('mouseout', function(){
            $(this).parent().children('li.star').each(function(e){
              $(this).removeClass('hover');
            });
        });

       $('#stars li').on('click', function(){
            var countStar = parseInt($(this).data('value'), 10);
            var stars = $(this).parent().children('li.star');
            var i;
            for (i = 0; i < 5; i++) {
              $(stars[i]).removeClass('selected');
            }
            
            for (i = 0; i < countStar; i++) {
              $(stars[i]).addClass('selected');
            }
        });
    };

    var linkClick = function (){
        $('.default-links li span .enter-login').on('click', function(){
            $(this).parents('.default-links').children('li').children('div.wrap-content-login').slideToggle();
        });

        $('.default-links li span .enter-code').on('click', function(){
            var a = $(this).parents('.default-links');
            $(this).parents('.default-links').children('li').children('div.coupon-wrap').slideToggle();
        });
    };

    var billClick = function (){
       
        $('.shop-account-creat .check-create .input-checkbox').on('click', function(){
            
            $(this).parents('.shop-account-creat').children('.acount-pass').slideToggle();
        });

        $('.shiping-wrap .ship-add .input-checkbox').on('click', function(){
            $(this).parents('.shiping-wrap').children('.shiping').slideToggle();
        });
    };

    // Dom Ready
    $(function() {
        shopTabs();
        cartQuantity();
        imageZoom();
        startRating();
        linkClick();
        billClick();
     });

})(jQuery);

