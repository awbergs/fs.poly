(function (d) {
    if (!d.documentElement.requestFullscreen) {
        var $d = $(d);
        var elementKey;

        if (d.documentElement.msRequestFullscreen) {
            Element.prototype.requestFullscreen = Element.prototype.msRequestFullscreen;
            Document.prototype.exitFullscreen = Document.prototype.msExitFullscreen;
            d.fullscreenEnabled = d.msFullscreenEnabled;
            elementKey = "msFullscreenElement";
        } else if (d.documentElement.webkitRequestFullscreen) {
            Element.prototype.requestFullscreen = Element.prototype.webkitRequestFullscreen;
            Document.prototype.exitFullscreen = Document.prototype.webkitExitFullscreen;
            d.fullscreenEnabled = d.webkitFullscreenEnabled;
            elementKey = "webkitFullscreenElement";
        } else if (d.documentElement.mozRequestFullScreen) {
            Element.prototype.requestFullscreen = Element.prototype.mozRequestFullScreen;
            Document.prototype.exitFullscreen = Document.prototype.mozCancelFullScreen;
            d.fullscreenEnabled = d.mozFullScreenEnabled;
            elementKey = "mozFullScreenElement";
        } else {
            Element.prototype.requestFullscreen = function () {
                $(this).css({
                    "position": "fixed",
                    "top": 0,
                    "left": 0,
                    "width": "100%",
                    "height": "100%",
                    "z-index": 999
                });

                d.fullscreenElement = this;
                $d.trigger("fullscreenchange");

                $d.on("keypress.fs", function (e) {
                    if (e.keyCode === 27) {
                        d.exitFullscreen();
                    }
                });
            };

            Document.prototype.exitFullscreen = function () {
                $d.off("keypress.fs");

                if (d.fullscreenElement) {
                    $(d.fullscreenElement).css({
                        "position": "",
                        "top": "",
                        "left": "",
                        "width": "",
                        "height": "",
                        "z-index": ""
                    });

                    this.fullscreenElement = null;
                    $d.trigger("fullscreenchange");
                }
            };
        }

        $d.on({
            "MSFullscreenChange webkitfullscreenchange mozfullscreenchange": function () {
                d.fullscreenElement = d[elementKey];
                $d.trigger("fullscreenchange");
            },
            "MSFullScreenError webkitfullscreenerror mozfullscreenerror": function () {
                d.fullscreenElement = d[elementKey];
                $d.trigger("fullscreenerror");
            }
        });
    }
})(document);
