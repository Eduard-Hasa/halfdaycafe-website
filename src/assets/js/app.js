// use select for tab navigation
    $('.menu-select').on('change', function (event) {
        var value = $(this).val();
        $('[href="' + value + '"]').tab('show'); 
    });


// Enable strict mode
"use strict";

// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};

// check if element exist
function exist(el) {
    if (jQuery(el).length > 0) {
        return true;
    } else {
        return false;
    }
}

// AOS animation plugin initialization
if ( typeof AOS != 'undefined' ) {
    AOS.init({
        once: true,
        offset: 80,
        disable: 'mobile'
    });
}



jQuery(document).ready(function ($) {


    /*---------------------------
                                Plugins Initialization / Plugins settings
    ---------------------------*/

    // inject svg icons
    if ( exist('.inject-me') ) {
        var mySVGsToInject = document.querySelectorAll('img.inject-me');
        SVGInjector(mySVGsToInject);
    }


    // typing effect
    if ( exist('[data-typed]') ) {
        $('[data-typed]').each(function(index, el) {
            new Typed(el, {
                strings: JSON.parse( $(el).attr('data-strings')),
                typeSpeed: 40,
                backSpeed: 40,
                backDelay: 1e3,
                loop: !0
            })
        });
    }


    // fancybox
    if ( exist('.fancybox') || exist('[data-fancybox]') ) {

        $('.fancybox, [data-fancybox]').fancybox({
            loop: true
        });

        var openPopup = function (popup) {
            $.fancybox.open([{
                src: popup,
                type: 'inline',
                opts: {}
            }], {
                loop: false
            });    
        }

    }


    // sticky elements on scroll
    if ( exist('[data-sticky]') ) {
        $('[data-sticky]').each(function(index, el) {
            var options = $.parseJSON($(this).attr('data-sticky'));
            var sticky = $(this).stickySidebar( options );
        }); 
    }


    // custom scrollbar
    if ( exist('.custom-scrollbar') ) {
        $('.custom-scrollbar').each(function(){
            var ps = new PerfectScrollbar($(this)[0]); 
        });
    }


    // datepicker
    if ( exist('.datetimepicker') ) {
        $('.datetimepicker').datetimepicker({
            defaultDate: new Date(),
            defaultTime:'05:00'
        });
    }


    // parallax animation
    if ( exist('.jarallax') ) {
        $('.jarallax').jarallax({
            speed: 0.2
        });
    }


    // highlight code (for documentation)
    if ( exist('code') ) {
        hljs.initHighlightingOnLoad();
    }


    // Masonry
    $('.masonry-grid').each(function (index, el) {
        var settings = $(this).attr('data-mansory');

        if ( typeof $.fn.imagesLoaded == 'function' ) {

            var $grid = $(this).imagesLoaded( function(){
                $grid.masonry(settings);
            });

        } else {

            var $grid = $(this).masonry(settings);

        }

        $grid.on('layoutComplete', function (event) {
            event.preventDefault();

            if (typeof AOS != 'undefined') {
                AOS.refresh();
            }
        });
    });


    // Slick Slider
    $('[data-slick]').on('init', function (event, slick) {
        event.preventDefault();

        if (typeof AOS != 'undefined') {
            AOS.refresh();
        };

        if ( $(this).find('[data-slick-fancybox]').length > 0 ) {
            var slider = $(this);
            var fancyboxItems = slider.find('[data-slick-fancybox]');
            fancyboxItems.on('click', function(event) {
                event.preventDefault();
                var currentIndex = $(this).attr('data-fancybox-index');
                var gallery = slider.find('.slick-slide').not('.slick-cloned').find('[data-slick-fancybox]');
                
                var fancyboxInstance = $.fancybox.open( gallery, {
                    animationEffect: 'zoom-in-out',
                    hash: false,
                    loop: true,
                }, currentIndex );

            });
        }
    });

    $('[data-slick]').on('init breakpoint', function(event, slick) {
        event.preventDefault();
        var centerClass = 'slick-center-mode';
        var arrowsClass = 'slick-arrows';

        if ( slick.activeBreakpoint && 'centerMode' in slick.breakpointSettings[slick.activeBreakpoint] ) {
            if ( slick.breakpointSettings[slick.activeBreakpoint].centerMode ) {
                slick.$slider.addClass(centerClass);
            } else {
                slick.$slider.removeClass(centerClass);
            }
        } else {
            if ( slick.options.centerMode ) {
                slick.$slider.addClass(centerClass);
            } else {
                slick.$slider.removeClass(centerClass);
            }    
        }

        if ( slick.activeBreakpoint && 'arrows' in slick.breakpointSettings[slick.activeBreakpoint] ) {
            if ( slick.breakpointSettings[slick.activeBreakpoint].arrows ) {
                slick.$slider.addClass(arrowsClass);
            } else {
                slick.$slider.removeClass(arrowsClass);
            }
        } else {
            if ( slick.options.arrows ) {
                slick.$slider.addClass(arrowsClass);
            } else {
                slick.$slider.removeClass(arrowsClass);
            }  
        }
    }); 


    if ( exist('[data-slick]') || exist('.slick-slider') ) {
        $('[data-slick]').slick();
    }


    // Google Map
    $('.google-map').each(function (index, el) {

        if (typeof google != 'undefined') {
            var map;
            var lat = $(this).data('lat');
            var long = $(this).data('lng');
            var icon = $(this).data('icon');
            var zoom = $(this).data('zoom');

            var shift = 22 * Math.pow(0.533, zoom);

            var mapCenterCoord = new google.maps.LatLng(lat, long);
            var mapMarkerCoord = new google.maps.LatLng(lat, long);

            var styles = [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ];
            var mapOptions = {
                center: mapCenterCoord,
                zoom: zoom,
                //draggable: false,
                disableDefaultUI: true,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: ''
                
            };

            map = new google.maps.Map($(this)[0], mapOptions);

            var styledMapType = new google.maps.StyledMapType(styles, {
                name: 'Styled'
            });

            map.mapTypes.set('Styled', styledMapType);
            map.setMapTypeId('Styled');

            var markerImage = new google.maps.MarkerImage(icon);
            var marker = new google.maps.Marker({
                icon: markerImage,
                position: mapMarkerCoord,
                map: map,
                title: "Site Title"
            });

            $(window).resize(function () {
                map.setCenter(mapCenterCoord);
            });
        } else {
            console.warn('Please, add Google Maps API javascript file to your page.');
        }
    });


    // plyr video 
    if ( exist('.plyr-video') ) {
        var players = Plyr.setup('.plyr-video');
    }



    /*---------------------------
                                Template Function
    ---------------------------*/

    // loading screen
    if ( exist('.loading-screen') ) {
        $('.loading-screen .progress-bar').width('100%');

        setTimeout(function(){
            $('.loading-screen').addClass('loaded');
        }, 1400);
    }


    // add additional class to navbar-fika-side-nav on expand; add class to body
    $('.navbar-toggler').on('click', function () {
        if ($(this).attr('aria-expanded') === 'false') {
            $(this).closest('.navbar').find('.navbar-fika-side-nav').addClass('expanded');
            $('body').addClass('expanded-menu');
        } else {
            $(this).closest('.navbar').find('.navbar-fika-side-nav').removeClass('expanded');
            $('body').removeClass('expanded-menu');
        }
    });


    // add class to elements on scroll
    $(function () {
        var $document = $(document),
            $element = $('.navbar-sticky'),
            className = 'fixed';

        $document.scroll(function () {
            $element.toggleClass(className, $document.scrollTop() >= 1);
        });
    });


    // page anchors
    $('.anchor').on('click', function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 800);
        return false;
    });


    // Features block calculate padding
    $('.features').each(function (index, el) {

        var setPadding = function (el) {
            var container = $(el);
            var list = container.find('.features__list');
            var image = container.find('.features__image');

            var listHeight = list.outerHeight();
            var imageHeight = image.height();


            if (imageHeight > listHeight) {
                container.css({
                    'padding-top': (imageHeight - listHeight) / 2,
                    'padding-bottom': (imageHeight - listHeight) / 2,
                });
            } else {
                container.css({
                    'padding-top': 0,
                    'padding-bottom': 0,
                });
            }
        };

        setPadding(el);

        $(window).on('resize orientationchange', function (event) {
            setPadding(el);
        });
    });


    // instagram feed
    if(exist('.instagram-widget')) {

        // default settings
        var inst_token          = '14052072768.a22b79d.66806f09ed6d4539876dec157ea7e42f', 
            inst_Widgets        = $('.instagram-widget'), // container inside which instagram images will be placed
            inst_defaultNumber  = 6, // max 20, according to the instagram API restrictions
            inst_defaultSize    = 'thumbnail', // thumbnail, small, standard
            inst_defaultItemWrapper = '<div></div>', // 
            inst_defaultItemLink = 'instagram', // fancybox, instagram, no-link
            inst_images         = [];
        
        $.ajax({
            url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + inst_token + '&count=20',
            type: 'GET',
            success: function(data){

                // save all images
                inst_images = data.data;
                console.log(data);

                // got through each widget and append images depending on settings
                inst_Widgets.each(function(){

                    var num     = $(this).attr('data-inst-num') || inst_defaultNumber,
                        size    = $(this).attr('data-inst-size') || inst_defaultSize,
                        linkWrapper = $(this).attr('data-inst-wrapper') || inst_defaultItemWrapper,
                        link    = $(this).attr('data-inst-link') || inst_defaultItemLink;

                        // validate number
                        if(num > 20) { num = inst_defaultNumber; } 
                        if(num > inst_images.length) { num = inst_images.length; }

                        // prepare size names
                        if (size == 'small') { size = 'low_resolution'; }  
                        else if (size == 'standard') {  size = 'standard_resolution'; } 
                        else { size = inst_defaultSize; }
        
                    // append link with image
                    for (var i=0; i < num; i++) {

                        var src     = inst_images[i].images[size].url,
                            srcFull = inst_images[i].images['standard_resolution'].url,
                            caption = inst_images[i].caption,
                            imgLink = inst_images[i].link;
                            
                        if (link == 'fancybox') {
                            $(linkWrapper).appendTo($(this)).append('<a href="' + srcFull + '" class="inst-image d-block text-center" data-fancybox="instagram-gallery"><img src="' + src + '" alt="' + caption + '"></a>');
                        } else if (link == 'no-link') {
                            $(linkWrapper).appendTo($(this)).append('<div class="inst-image text-center"><img src="' + src + '" alt="' + caption + '"></div>');
                        } else {
                            $(linkWrapper).appendTo($(this)).append('<a href="' + imgLink + '" class="inst-image d-block text-center" target="_blank"><img src="' + src + '" alt="' + caption + '"></a>');
                        }

                    }

                    // if slick slider
                    if ($(this).hasClass('slick-slider') || $(this).attr('data-slick')) {
                        $(this).slick('unslick').slick();
                    }
        
                })

            },

            error: function(data){
                console.log(data); // send the error notifications to console
            }
        });

    }




}); // end file