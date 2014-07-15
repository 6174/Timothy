/**
 * @module: kissy version of animo
 * @author: 6174/hengtian
 */
KISSY.add('timothy/components/animo', function(S, DOM, Event) {
	//--kissy 2 jQuery sim
    var $ = {
        extend: function(a, b) {
            return S.mix(a, b);
        },
        merge: function(arr1, arr2){
        	return arr1 = arr1.concat(arr2);
        }
    };
    var body = DOM.get('body');
    /**
     * animo is a powerful little tool that makes managing CSS animations extremely easy. Stack animations, set callbacks, make magic.
     * Modern browsers and almost all mobile browsers support CSS animations (http://caniuse.com/css-animation).
     *
     * @author Daniel Raftery : twitter/ThrivingKings
     * @version 1.0.2
     */
    function animo(element, options, callback, other_cb) {
        // Default configuration
        var defaults = {
            duration: 1,
            animation: null,
            iterate: 1,
            timing: "linear",
            keep: false
        };
        // Browser prefixes for CSS
        this.prefixes = ["", "-moz-", "-o-animation-", "-webkit-"];
        // Cache the element
        this.element = element;
        this.bare = element;
        // For stacking of animations
        this.queue = [];
        // Hacky
        this.listening = false;
        // Figure out where the callback is
        var cb = (typeof callback == "function" ? callback : other_cb);
        // Options can sometimes be a command
        switch (options) {
            case "blur":
                defaults = {
                    amount: 3,
                    duration: 0.5,
                    focusAfter: null
                };
                this.options = $.extend(defaults, callback);
                this._blur(cb);
                break;
            case "focus":
                this._focus();
                break;
            case "rotate":
                defaults = {
                    degrees: 15,
                    duration: 0.5
                };
                this.options = $.extend(defaults, callback);
                this._rotate(cb);
                break;
            case "cleanse":
                this.cleanse();
                break;
            default:
                this.options = $.extend(defaults, options);
                this.init(cb);
                break;
        }
    }
    animo.prototype = {
        // A standard CSS animation
        init: function(callback) {
            var $me = this;
            // Are we stacking animations?
            if (Object.prototype.toString.call($me.options.animation) === '[object Array]') {
                $.merge($me.queue, $me.options.animation);
            } else {
                $me.queue.push($me.options.animation);
            }
            $me.cleanse();
            $me.animate(callback);
        },
        // The actual adding of the class and listening for completion
        animate: function(callback) {
        	var el = this.element;

            DOM.addClass(el, 'animated');
            DOM.addClass(el, this.queue[0]);
		    DOM.data(el, "animo", this.queue[0]);

            var ai = this.prefixes.length;
            // Add the options for each prefix
            while (ai--) {
				DOM.css(el, this.prefixes[ai] + "animation-duration", this.options.duration + "s");
                DOM.css(el, this.prefixes[ai] + "animation-iteration-count", this.options.iterate);
                DOM.css(el, this.prefixes[ai] + "animation-timing-function", this.options.timing);
            }
            var $me = this,
                _cb = callback;
            if ($me.queue.length > 1) {
                _cb = null;
            }

            // Listen for the end of the animation
            this._end("AnimationEnd", function() {
                // If there are more, clean it up and move on
                if (DOM.hasClass(el, $me.queue[0])) {
                    if (!$me.options.keep) {
                        $me.cleanse();
                    }
                    $me.queue.shift();
                    if ($me.queue.length) {
                        $me.animate(callback);
                    }
                }
            }, _cb);
        },
        cleanse: function() {
        	var el = this.element;
			DOM.removeClass(el, 'animated');
            DOM.removeClass(el, this.queue[0]);
            DOM.removeClass(el, DOM.data(el, "animo"));
            var ai = this.prefixes.length;
            while (ai--) {
                DOM.css(el, this.prefixes[ai] + "animation-duration", "");
                DOM.css(el, this.prefixes[ai] + "animation-iteration-count", "");
                DOM.css(el, this.prefixes[ai] + "animation-timing-function", "");
                DOM.css(el, this.prefixes[ai] + "transition", "");
                DOM.css(el, this.prefixes[ai] + "transform", "");
                DOM.css(el, this.prefixes[ai] + "filter", "");
            }
        },
        _blur: function(callback) {
        	var el = this.element;
            if (/IMG/.test(el.nodeName)){
                var svg_id = "svg_" + (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1);
                var filter_id = "filter_" + (((1 + Math.random()) * 0x1000000) | 0).toString(16).substring(1);
                var svgel = DOM.create('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" id="' + svg_id + '" style="height:0;position:absolute;top:-1000px;"><filter id="' + filter_id + '"><feGaussianBlur stdDeviation="' + this.options.amount + '" /></filter></svg>');
                DOM.append(svgel, body);
                var ai = this.prefixes.length;
                while (ai--) {
                    DOM.css(el, this.prefixes[ai] + "filter", "blur(" + this.options.amount + "px)");
                    DOM.css(el, this.prefixes[ai] + "transition", this.options.duration + "s all linear");
                }
                DOM.css(el, "filter", "url(#" + filter_id + ")");
                DOM.data(el, "svgid", svg_id);
            } else {
                var color = DOM.css(el, 'color');
                var ai = this.prefixes.length;
                // Add the options for each prefix
                while (ai--) {
					DOM.css(el, this.prefixes[ai] + "transition", "all " + this.options.duration + "s linear");
                }
                DOM.css(el, "text-shadow", "0 0 " + this.options.amount + "px " + color);
                DOM.css(el, "color", "transparent");
            }
            this._end("TransitionEnd", null, callback);
            var $me = this;
            if (this.options.focusAfter) {
                var focus_wait = window.setTimeout(function() {
                    $me._focus();
                    focus_wait = window.clearTimeout(focus_wait);
                }, (this.options.focusAfter * 1000));
            }
        },
        _focus: function() {
        	var el = this.element;
            var ai = this.prefixes.length;
            if (/IMG/.test(el.nodeName)) {
                while (ai--) {
                    DOM.css(el, this.prefixes[ai] + "filter", "");
                    DOM.css(el, this.prefixes[ai] + "transition", "");
                }
                var $svg = DOM.get('#' + DOM.data(el, 'svgid'));
                DOM.remove($svg);
            } else {
                while (ai--) {
                    DOM.css(el, this.prefixes[ai] + "transition", "");
                }
                DOM.css(el, "text-shadow", "");
                DOM.css(el, "color", "");
            }
        },
        _rotate: function(callback) {
        	var el = this.element;
            var ai = this.prefixes.length;
            // Add the options for each prefix
            while (ai--) {
                DOM.css(el, this.prefixes[ai] + "transition", "all " + this.options.duration + "s linear");
                DOM.css(el, this.prefixes[ai] + "transform", "rotate(" + this.options.degrees + "deg)");
            }
            this._end("TransitionEnd", null, callback);
        },
        _end: function(type, todo, callback) {
        	var el = this.element;
            var $me = this;
            var binding = type.toLowerCase() + " webkit" + type + " o" + type + " MS" + type;
			Event.on(el, binding, function() {
                Event.detach(el, binding);

                if (typeof todo == "function") {
                    todo();
                }

                if (typeof callback == "function") {
                    callback($me);
                }
            });
        }
    };

    return animo;
}, {
    requires: ['dom', 'event']
});