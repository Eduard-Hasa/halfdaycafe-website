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



    /*---------------------------
                                Theme Function
    ---------------------------*/

    // loading screen
    if ( exist('.loading-screen') ) {
        $('.loading-screen .progress-bar').width('100%');

        setTimeout(function(){
            $('.loading-screen').addClass('loaded');
        }, 1400);
    }


    // add additional class to navbar-fika-side-nav on expand; add class to body
    $('.navbar-toggler').click(function () {
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
    $('.anchor').click(function () {
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


}); // end file
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEVuYWJsZSBzdHJpY3QgbW9kZVxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbi8vIEdsb2JhbCBwYXJhbWV0ZXJzXHJcbndpbmRvdy5wYXJhbXMgPSB7XHJcbiAgICBpc01vYmlsZTogL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxyXG4gICAgaXNJT1M6IC9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxyXG59O1xyXG5cclxuLy8gY2hlY2sgaWYgZWxlbWVudCBleGlzdFxyXG5mdW5jdGlvbiBleGlzdChlbCkge1xyXG4gICAgaWYgKGpRdWVyeShlbCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEFPUyBhbmltYXRpb24gcGx1Z2luIGluaXRpYWxpemF0aW9uXHJcbmlmICggdHlwZW9mIEFPUyAhPSAndW5kZWZpbmVkJyApIHtcclxuICAgIEFPUy5pbml0KHtcclxuICAgICAgICBvbmNlOiB0cnVlLFxyXG4gICAgICAgIG9mZnNldDogODAsXHJcbiAgICAgICAgZGlzYWJsZTogJ21vYmlsZSdcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xyXG5cclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBsdWdpbnMgSW5pdGlhbGl6YXRpb24gLyBQbHVnaW5zIHNldHRpbmdzXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuICAgIC8vIGluamVjdCBzdmcgaWNvbnNcclxuICAgIGlmICggZXhpc3QoJy5pbmplY3QtbWUnKSApIHtcclxuICAgICAgICB2YXIgbXlTVkdzVG9JbmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcuaW5qZWN0LW1lJyk7XHJcbiAgICAgICAgU1ZHSW5qZWN0b3IobXlTVkdzVG9JbmplY3QpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyB0eXBpbmcgZWZmZWN0XHJcbiAgICBpZiAoIGV4aXN0KCdbZGF0YS10eXBlZF0nKSApIHtcclxuICAgICAgICAkKCdbZGF0YS10eXBlZF0nKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbCkge1xyXG4gICAgICAgICAgICBuZXcgVHlwZWQoZWwsIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZ3M6IEpTT04ucGFyc2UoICQoZWwpLmF0dHIoJ2RhdGEtc3RyaW5ncycpKSxcclxuICAgICAgICAgICAgICAgIHR5cGVTcGVlZDogNDAsXHJcbiAgICAgICAgICAgICAgICBiYWNrU3BlZWQ6IDQwLFxyXG4gICAgICAgICAgICAgICAgYmFja0RlbGF5OiAxZTMsXHJcbiAgICAgICAgICAgICAgICBsb29wOiAhMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBmYW5jeWJveFxyXG4gICAgaWYgKCBleGlzdCgnLmZhbmN5Ym94JykgfHwgZXhpc3QoJ1tkYXRhLWZhbmN5Ym94XScpICkge1xyXG5cclxuICAgICAgICAkKCcuZmFuY3lib3gsIFtkYXRhLWZhbmN5Ym94XScpLmZhbmN5Ym94KHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2YXIgb3BlblBvcHVwID0gZnVuY3Rpb24gKHBvcHVwKSB7XHJcbiAgICAgICAgICAgICQuZmFuY3lib3gub3Blbihbe1xyXG4gICAgICAgICAgICAgICAgc3JjOiBwb3B1cCxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmxpbmUnLFxyXG4gICAgICAgICAgICAgICAgb3B0czoge31cclxuICAgICAgICAgICAgfV0sIHtcclxuICAgICAgICAgICAgICAgIGxvb3A6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pOyAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBzdGlja3kgZWxlbWVudHMgb24gc2Nyb2xsXHJcbiAgICBpZiAoIGV4aXN0KCdbZGF0YS1zdGlja3ldJykgKSB7XHJcbiAgICAgICAgJCgnW2RhdGEtc3RpY2t5XScpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0gJC5wYXJzZUpTT04oJCh0aGlzKS5hdHRyKCdkYXRhLXN0aWNreScpKTtcclxuICAgICAgICAgICAgdmFyIHN0aWNreSA9ICQodGhpcykuc3RpY2t5U2lkZWJhciggb3B0aW9ucyApO1xyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gY3VzdG9tIHNjcm9sbGJhclxyXG4gICAgaWYgKCBleGlzdCgnLmN1c3RvbS1zY3JvbGxiYXInKSApIHtcclxuICAgICAgICAkKCcuY3VzdG9tLXNjcm9sbGJhcicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoJCh0aGlzKVswXSk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBkYXRlcGlja2VyXHJcbiAgICBpZiAoIGV4aXN0KCcuZGF0ZXRpbWVwaWNrZXInKSApIHtcclxuICAgICAgICAkKCcuZGF0ZXRpbWVwaWNrZXInKS5kYXRldGltZXBpY2tlcih7XHJcbiAgICAgICAgICAgIGRlZmF1bHREYXRlOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICBkZWZhdWx0VGltZTonMDU6MDAnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHBhcmFsbGF4IGFuaW1hdGlvblxyXG4gICAgaWYgKCBleGlzdCgnLmphcmFsbGF4JykgKSB7XHJcbiAgICAgICAgJCgnLmphcmFsbGF4JykuamFyYWxsYXgoe1xyXG4gICAgICAgICAgICBzcGVlZDogMC4yXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIGhpZ2hsaWdodCBjb2RlIChmb3IgZG9jdW1lbnRhdGlvbilcclxuICAgIGlmICggZXhpc3QoJ2NvZGUnKSApIHtcclxuICAgICAgICBobGpzLmluaXRIaWdobGlnaHRpbmdPbkxvYWQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gTWFzb25yeVxyXG4gICAgJCgnLm1hc29ucnktZ3JpZCcpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xyXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQodGhpcykuYXR0cignZGF0YS1tYW5zb3J5Jyk7XHJcblxyXG4gICAgICAgIGlmICggdHlwZW9mICQuZm4uaW1hZ2VzTG9hZGVkID09ICdmdW5jdGlvbicgKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGdyaWQgPSAkKHRoaXMpLmltYWdlc0xvYWRlZCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICRncmlkLm1hc29ucnkoc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZ3JpZCA9ICQodGhpcykubWFzb25yeShzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGdyaWQub24oJ2xheW91dENvbXBsZXRlJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIEFPUyAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgQU9TLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIFNsaWNrIFNsaWRlclxyXG4gICAgJCgnW2RhdGEtc2xpY2tdJykub24oJ2luaXQnLCBmdW5jdGlvbiAoZXZlbnQsIHNsaWNrKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBBT1MgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgQU9TLnJlZnJlc2goKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoICQodGhpcykuZmluZCgnW2RhdGEtc2xpY2stZmFuY3lib3hdJykubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlciA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBmYW5jeWJveEl0ZW1zID0gc2xpZGVyLmZpbmQoJ1tkYXRhLXNsaWNrLWZhbmN5Ym94XScpO1xyXG4gICAgICAgICAgICBmYW5jeWJveEl0ZW1zLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9ICQodGhpcykuYXR0cignZGF0YS1mYW5jeWJveC1pbmRleCcpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGdhbGxlcnkgPSBzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJykubm90KCcuc2xpY2stY2xvbmVkJykuZmluZCgnW2RhdGEtc2xpY2stZmFuY3lib3hdJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBmYW5jeWJveEluc3RhbmNlID0gJC5mYW5jeWJveC5vcGVuKCBnYWxsZXJ5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uRWZmZWN0OiAnem9vbS1pbi1vdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhhc2g6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvb3A6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LCBjdXJyZW50SW5kZXggKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJ1tkYXRhLXNsaWNrXScpLm9uKCdpbml0IGJyZWFrcG9pbnQnLCBmdW5jdGlvbihldmVudCwgc2xpY2spIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBjZW50ZXJDbGFzcyA9ICdzbGljay1jZW50ZXItbW9kZSc7XHJcbiAgICAgICAgdmFyIGFycm93c0NsYXNzID0gJ3NsaWNrLWFycm93cyc7XHJcblxyXG4gICAgICAgIGlmICggc2xpY2suYWN0aXZlQnJlYWtwb2ludCAmJiAnY2VudGVyTW9kZScgaW4gc2xpY2suYnJlYWtwb2ludFNldHRpbmdzW3NsaWNrLmFjdGl2ZUJyZWFrcG9pbnRdICkge1xyXG4gICAgICAgICAgICBpZiAoIHNsaWNrLmJyZWFrcG9pbnRTZXR0aW5nc1tzbGljay5hY3RpdmVCcmVha3BvaW50XS5jZW50ZXJNb2RlICkge1xyXG4gICAgICAgICAgICAgICAgc2xpY2suJHNsaWRlci5hZGRDbGFzcyhjZW50ZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGljay4kc2xpZGVyLnJlbW92ZUNsYXNzKGNlbnRlckNsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggc2xpY2sub3B0aW9ucy5jZW50ZXJNb2RlICkge1xyXG4gICAgICAgICAgICAgICAgc2xpY2suJHNsaWRlci5hZGRDbGFzcyhjZW50ZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGljay4kc2xpZGVyLnJlbW92ZUNsYXNzKGNlbnRlckNsYXNzKTtcclxuICAgICAgICAgICAgfSAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggc2xpY2suYWN0aXZlQnJlYWtwb2ludCAmJiAnYXJyb3dzJyBpbiBzbGljay5icmVha3BvaW50U2V0dGluZ3Nbc2xpY2suYWN0aXZlQnJlYWtwb2ludF0gKSB7XHJcbiAgICAgICAgICAgIGlmICggc2xpY2suYnJlYWtwb2ludFNldHRpbmdzW3NsaWNrLmFjdGl2ZUJyZWFrcG9pbnRdLmFycm93cyApIHtcclxuICAgICAgICAgICAgICAgIHNsaWNrLiRzbGlkZXIuYWRkQ2xhc3MoYXJyb3dzQ2xhc3MpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2xpY2suJHNsaWRlci5yZW1vdmVDbGFzcyhhcnJvd3NDbGFzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIHNsaWNrLm9wdGlvbnMuYXJyb3dzICkge1xyXG4gICAgICAgICAgICAgICAgc2xpY2suJHNsaWRlci5hZGRDbGFzcyhhcnJvd3NDbGFzcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzbGljay4kc2xpZGVyLnJlbW92ZUNsYXNzKGFycm93c0NsYXNzKTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgfSk7IFxyXG5cclxuXHJcbiAgICBpZiAoIGV4aXN0KCdbZGF0YS1zbGlja10nKSB8fCBleGlzdCgnLnNsaWNrLXNsaWRlcicpICkge1xyXG4gICAgICAgICQoJ1tkYXRhLXNsaWNrXScpLnNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIEdvb2dsZSBNYXBcclxuICAgICQoJy5nb29nbGUtbWFwJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZ29vZ2xlICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHZhciBtYXA7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSAkKHRoaXMpLmRhdGEoJ2xhdCcpO1xyXG4gICAgICAgICAgICB2YXIgbG9uZyA9ICQodGhpcykuZGF0YSgnbG5nJyk7XHJcbiAgICAgICAgICAgIHZhciBpY29uID0gJCh0aGlzKS5kYXRhKCdpY29uJyk7XHJcbiAgICAgICAgICAgIHZhciB6b29tID0gJCh0aGlzKS5kYXRhKCd6b29tJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2hpZnQgPSAyMiAqIE1hdGgucG93KDAuNTMzLCB6b29tKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXBDZW50ZXJDb29yZCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsb25nKTtcclxuICAgICAgICAgICAgdmFyIG1hcE1hcmtlckNvb3JkID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbmcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2U5ZTllOVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMTdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5zdHJva2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDI5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2VpZ2h0XCI6IDAuMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmZmZmZmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMThcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDE2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Y1ZjVmNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDIxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2kucGFya1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZGVkZWRlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMjFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAzNlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzMzMzMzM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMuaWNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpZ2h0bmVzc1wiOiAxOVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnkuZmlsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmVmZWZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMjBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LnN0cm9rZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZmVmZWZlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogMTdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3ZWlnaHRcIjogMS4yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgY2VudGVyOiBtYXBDZW50ZXJDb29yZCxcclxuICAgICAgICAgICAgICAgIHpvb206IHpvb20sXHJcbiAgICAgICAgICAgICAgICAvL2RyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgICAgIHN0eWxlczogJydcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCgkKHRoaXMpWzBdLCBtYXBPcHRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZWRNYXBUeXBlID0gbmV3IGdvb2dsZS5tYXBzLlN0eWxlZE1hcFR5cGUoc3R5bGVzLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAnU3R5bGVkJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1hcC5tYXBUeXBlcy5zZXQoJ1N0eWxlZCcsIHN0eWxlZE1hcFR5cGUpO1xyXG4gICAgICAgICAgICBtYXAuc2V0TWFwVHlwZUlkKCdTdHlsZWQnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXJrZXJJbWFnZSA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXJJbWFnZShpY29uKTtcclxuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogbWFya2VySW1hZ2UsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbWFwTWFya2VyQ29vcmQsXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlNpdGUgVGl0bGVcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihtYXBDZW50ZXJDb29yZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignUGxlYXNlLCBhZGQgR29vZ2xlIE1hcHMgQVBJIGphdmFzY3JpcHQgZmlsZSB0byB5b3VyIHBhZ2UuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZW1lIEZ1bmN0aW9uXHJcbiAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuICAgIC8vIGxvYWRpbmcgc2NyZWVuXHJcbiAgICBpZiAoIGV4aXN0KCcubG9hZGluZy1zY3JlZW4nKSApIHtcclxuICAgICAgICAkKCcubG9hZGluZy1zY3JlZW4gLnByb2dyZXNzLWJhcicpLndpZHRoKCcxMDAlJyk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnLmxvYWRpbmctc2NyZWVuJykuYWRkQ2xhc3MoJ2xvYWRlZCcpO1xyXG4gICAgICAgIH0sIDE0MDApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBhZGQgYWRkaXRpb25hbCBjbGFzcyB0byBuYXZiYXItZmlrYS1zaWRlLW5hdiBvbiBleHBhbmQ7IGFkZCBjbGFzcyB0byBib2R5XHJcbiAgICAkKCcubmF2YmFyLXRvZ2dsZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuYXR0cignYXJpYS1leHBhbmRlZCcpID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLm5hdmJhcicpLmZpbmQoJy5uYXZiYXItZmlrYS1zaWRlLW5hdicpLmFkZENsYXNzKCdleHBhbmRlZCcpO1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2V4cGFuZGVkLW1lbnUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5uYXZiYXInKS5maW5kKCcubmF2YmFyLWZpa2Etc2lkZS1uYXYnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdleHBhbmRlZC1tZW51Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIGFkZCBjbGFzcyB0byBlbGVtZW50cyBvbiBzY3JvbGxcclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcclxuICAgICAgICAgICAgJGVsZW1lbnQgPSAkKCcubmF2YmFyLXN0aWNreScpLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUgPSAnZml4ZWQnO1xyXG5cclxuICAgICAgICAkZG9jdW1lbnQuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJGVsZW1lbnQudG9nZ2xlQ2xhc3MoY2xhc3NOYW1lLCAkZG9jdW1lbnQuc2Nyb2xsVG9wKCkgPj0gMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gcGFnZSBhbmNob3JzXHJcbiAgICAkKCcuYW5jaG9yJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3AgLSA1MFxyXG4gICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIEZlYXR1cmVzIGJsb2NrIGNhbGN1bGF0ZSBwYWRkaW5nXHJcbiAgICAkKCcuZmVhdHVyZXMnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcclxuXHJcbiAgICAgICAgdmFyIHNldFBhZGRpbmcgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoZWwpO1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IGNvbnRhaW5lci5maW5kKCcuZmVhdHVyZXNfX2xpc3QnKTtcclxuICAgICAgICAgICAgdmFyIGltYWdlID0gY29udGFpbmVyLmZpbmQoJy5mZWF0dXJlc19faW1hZ2UnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXN0SGVpZ2h0ID0gbGlzdC5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2VIZWlnaHQgPSBpbWFnZS5oZWlnaHQoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoaW1hZ2VIZWlnaHQgPiBsaXN0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiAoaW1hZ2VIZWlnaHQgLSBsaXN0SGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3BhZGRpbmctYm90dG9tJzogKGltYWdlSGVpZ2h0IC0gbGlzdEhlaWdodCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAncGFkZGluZy10b3AnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICdwYWRkaW5nLWJvdHRvbSc6IDAsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldFBhZGRpbmcoZWwpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBzZXRQYWRkaW5nKGVsKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbn0pOyAvLyBlbmQgZmlsZSJdfQ==
