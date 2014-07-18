(function (d) {
    var fsMap = {
        'msRequestFullscreen': {
            'r': 'msRequestFullscreen',
            'x': 'msExitFullscreen',
            'e': 'msFullscreenEnabled',
            'k': 'msFullscreenElement'
        },
        'webkitRequestFullscreen': {
            'r': 'webkitRequestFullscreen',
            'x': 'webkitExitFullscreen',
            'e': 'webkitFullscreenEnabled',
            'k': 'webkitFullscreenElement'
        },
        'mozRequestFullScreen': {
            'r': 'mozRequestFullScreen',
            'x': 'mozCancelFullScreen',
            'e': 'mozFullScreenEnabled',
            'k': 'mozFullScreenElement'
        }
    };

    if (!d.documentElement.requestFullscreen) {
        var $d = $(d), elementKey, map;

        for (var key in fsMap) {
            if (d.documentElement.hasOwnProperty(key)) {
                map = fsMap[key];
            }
        }

        if (map) {
            Element.prototype.requestFullscreen = Element.prototype[map.r];
            d.constructor.prototype.exitFullscreen = d.constructor.prototype[map.x];
            d.fullscreenEnabled = d[map.e];
            elementKey = map.k;
        } else {
            Element.prototype.requestFullscreen = function () {
                $(this).css({
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'width': '100%',
                    'height': '100%',
                    'z-index': 999
                });

                d.fullscreenElement = this;
                $d.trigger('fullscreenchange');

                $d.on('keypress.fs', function (e) {
                    if (e.keyCode === 27) {
                        d.exitFullscreen();
                    }
                });
            };

            d.constructor.prototype.exitFullscreen = function () {
                $d.off('keypress.fs');

                if (d.fullscreenElement) {
                    $(d.fullscreenElement).css({
                        'position': '',
                        'top': '',
                        'left': '',
                        'width': '',
                        'height': '',
                        'z-index': ''
                    });

                    this.fullscreenElement = null;
                    $d.trigger('fullscreenchange');
                }
            };

            d.isCustomFullScreen = 1;
        }

        $d.on({
            'MSFullscreenChange webkitfullscreenchange mozfullscreenchange': function () {
                d.fullscreenElement = d[elementKey];
                $d.trigger('fullscreenchange');
            },
            'MSFullScreenError webkitfullscreenerror mozfullscreenerror': function () {
                d.fullscreenElement = d[elementKey];
                $d.trigger('fullscreenerror');
            }
        });
    }
})(document);
