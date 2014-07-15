/**
 * @module: timothy component: inview
 * @author: 6174/hentian
 * @time: 2014/7/14
 */
KISSY.add('timothy/components/inview', function(S, DOM, Event) {
    /*===========================
 	 * @param: els -> HTMLCollection
 	 * @usage:
 	 *  <div data-inview="(inclass: a, b,c), 
 	 					  (outclass: e, f, g), 
 	 					  (offsettop: 100), 
 	 					  (offsetbottom: 120)"</div>
 	 * <div data-inview="(inclass: a, b,c), 
 	 					  (offset: 100)"
 	 					  </div>
 	 * <div data-inview="(inclass: a, b,c), 
 	 					  (offset: 100),
						  (target: #target)
 	 					  "
 	 					  </div>
     *
     *===========================*/
    var G = {
        attr: 'data-inview',
        offset: 100
    };

    function Inview(el) {
        var self = this;
        if (!(self instanceof Inview)) {
            return new Invew(el);
        }
        if (!el) {
            return;
        }
        this.el = el;
        DOM.data(el, 'data-isinview', 'true');
        self._init();
    }
    S.augment(Inview, {
        _init: function() {
            var self = this;
            self.parseAttr();
        },
        parseAttr: function() {
            var self = this;
            var attr = DOM.attr(self.el, G.attr);
            var raw = attr.match(/\((.*?)\)/ig);
            var config = {};
            S.each(raw, function(it) {
                var reg = /\((.*?):(.*?)\)/gi;
                var query = reg.exec(it);
                if (query && query.length === 3) {
                    config[S.trim(query[1])] = S.trim(query[2]);
                }
            });
            config['inclass'] = config['inclass'] ? config['inclass'].replace(/,/gi, ' ') : '';
            config['outclass'] = config['outclass'] ? config['outclass'].replace(/,/gi, ' ') : '';
            config['offsettop'] = Number(config['offsettop'] || config['offset'] || G.offset);
            config['offsetbottom'] = Number(config['offsetbottom'] || config['offset'] || G.offset);
            if (config['target']) {
                self.targetEl = DOM.query(config['target']);
            }
            self.config = config;
            return this;
        },
        toggleClass: function(type) {
            var self = this;
            var prevType = self.prevType || '';
            var target = self.targetEl || self.el;
            if (type != prevType) {
                // console.log('change to', type)
                DOM.removeClass(target, self.config['inclass'] + ' ' + self.config['outclass']);
                DOM.addClass(target, self.config[type]);
            }
            self.prevType = type;
        }
    });
    var winHeight = DOM.height(window);
    var prevScroll = 0,
        currentScroll = 0;
    S.mix(Inview, {
        watchers: [],
        inviewLaLa: function() {
            var self = this;
            var inviewEls = DOM.query('[' + G.attr + ']');
            inviewEls = Array.prototype.slice.call(inviewEls, 0);
            S.each(inviewEls, function(el) {
                //--is a inview elements
                if (DOM.data(el, 'data-isinview')) {
                    return;
                }
                self.watchers.push(new Inview(el));
            });
        },
        scrollHandler: function() {
            var scrollTop = DOM.scrollTop(window);
            prevScroll = currentScroll;
            currentScroll = scrollTop;
            //--judge scroll direction
            var deltaScroll = currentScroll - prevScroll;
            if (Math.abs(deltaScroll) < 2) {
                return;
            }
            S.each(this.watchers, function(watcher) {
                var el = watcher.el;
                var target = watcher.targetEl || watcher.el;
                //--do nothing when element is hidden
                if (DOM.css(el, 'display') === 'none') {
                    return;
                }
                //--offset rectangle
                var elOffsetTop = DOM.offset(el).top;
                var elOffsetHeight = DOM.height(el);
                var deltaTop = watcher.config['offsettop'];
                var deltaBottom = watcher.config['offsetbottom'];
                //--below top
                var belowTop = elOffsetTop - scrollTop - deltaTop;
                // (elOffsetTop - winHeight) > (scrollTop - deltaBottom);
                //--above bottom
                var aboveBottom = winHeight - deltaBottom - elOffsetHeight - (elOffsetTop - scrollTop);
                if ((belowTop + elOffsetHeight) < 0) {
                    return;
                }
                if ((aboveBottom + elOffsetHeight) < 0) {
                    return;
                }
                //--already in viewport
                if (belowTop > 0 && aboveBottom > 0) {
                    watcher.toggleClass('inclass');
                    return;
                }
                //--scroll out
                if (belowTop <= 0 && deltaScroll > 0) {
                    watcher.toggleClass('outclass');
                    return;
                }
                if (aboveBottom <= 0 && deltaScroll <= 0) {
                    watcher.toggleClass('outclass');
                    return;
                }
                //--scroll in
                if (belowTop > 0 && deltaScroll <= 0) {
                    watcher.toggleClass('inclass');
                    return;
                }
                if (aboveBottom < 0 && deltaScroll > 0) {
                    watcher.toggleClass('inclass');
                    return;
                }
            });
        }
    });
    Event.on(window, 'scroll', S.throttle(function(ev) {
        Inview.scrollHandler();
    }, 50));
    Event.on(window, 'resize', S.throttle(function() {
        winHeight = DOM.height(window);
        Inview.scrollHandler();
    }, 50));
    Event.on(window, 'load', function() {
        Inview.inviewLaLa();
        Inview.scrollHandler();
    });
    return Inview;
}, {
    requires: ['dom', 'event']
});