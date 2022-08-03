window.console = window.console || function() {
   var e = {};
   e.log = e.warn = e.debug = e.info = e.error = e.time = e.dir = e.profile = e.clear = e.exception = e.trace = e.assert = function() {};
   return e
}();

/*$(document).ready(function() {
   var e =  '<div class="switcher-container">'+
               '<h2>Color Style<a href="#"><i class="fa fa-cog fa-spin"></i></a></h2>'+
               '<div class="selector-box">'+
                  '<div class="clearfix"></div>'+
                  '<div class="color-box">'+
                     '<a id="color-1" class="styleswitch color current"></a>'+
                     '<a id="color-2" class="styleswitch color"></a>'+
                     '<a id="color-3" class="styleswitch color"></a>'+
                     '<a id="color-4" class="styleswitch color"></a>'+
                     '<a id="color-5" class="styleswitch color"></a>'+
                  '</div>'+
                  '<div class="clearfix"></div>'+
               '</div>'+
            '</div>';
   $('body').append(e);
   switchColor.loadEvent();
   switchAnimate.loadEvent();
});*/

var switchColor = {
   colorObj: {
      colorCookie: "colorCookie",
      switchClass: ".styleswitch",
      currentClass: "current",
      headLink: "head link[id=colors]",
      colorItem: ".color-box a.styleswitch",
      reset: "#reset",
      defaultColor: "color-1"
   },
   loadEvent: function() {
      var e = switchColor.colorObj;
      if ($.cookie(e.colorCookie)) {
         switchColor.setColor($.cookie(e.colorCookie))
      } else {
         switchColor.setColor(e.defaultColor)
      }
      $(e.colorItem).on("click", function() {
         var e = $(this).attr("id");
         switchColor.setColor(e)
      });
      $(e.reset).click(function () {
         switchColor.setColor(e.defaultColor)
      })
   },
   setColor: function(e) {
      var t = switchColor.colorObj;
      $.cookie(t.colorCookie, e);
      /*$(t.headLink).attr("href", "css/color-themes/" + e + ".css");*/

      $(t.headLink).attr("href", "css/color-themes/color-1.css");
      var logo = '';

      var retina = window.devicePixelRatio > 1 ? true : false;

      var number = e.match(/\d/g)

      if(retina) {
         logo = '../img/logo-' + number + '@2x.png';
         if(e === t.defaultColor){
            logo = '../img/logo@2x.png'
         }

         $('#site-header .main-logo, .footer .logo').find('img').attr({src:logo,width:'198',height:'44'});
      }
      else {
         logo = '../img/logo-' + number + '.png';
         if(e === t.defaultColor){
            logo = '../img/logo.png'
         }
         
         $('#site-header .main-logo, .footer .logo').find('img').attr('src',logo);
      }
      $(t.switchClass).removeClass(t.currentClass);
      $("#" + e).addClass(t.currentClass);
    }
};

var switchAnimate = {
   loadEvent: function() {
      $(".switcher-container h2 a").click(function(e) {
         var t = $(".switcher-container");

         if (t.css("right") === "-240px") {
            $(".switcher-container").animate({ right: "0"}, 300, 'easeInOutExpo')
         } else {
            $(".switcher-container").animate({ right: "-240px" }, 300, 'easeInOutExpo')
         }

         e.preventDefault();
     })
   }
};
