/**
 * @module data interchange
 * @author: hengtian
 * @time: 2014/7/12
 */
KISSY.add('timothy/components/dataInterchange', function(S, DOM, Event, Timothy) {
    var Interchange;
    var G = {
        cache: {},
        settings: {
            attr: 'interchange',
            queries: {
                'default': 'only screen',
                small: Timothy.mediaQueries['mq-small'],
                medium: Timothy.mediaQueries['mq-medium'],
                large: Timothy.mediaQueries['mq-large'],
                landscape: 'only screen and (orientation: landscape)',
                portrait: 'only screen and (orientation: portrait)',
                retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
            }
        }
    };
    /*============================
     * @desc: 每个替换节点对应一个InterchangeNode对象
     * @params: {config}
     *      --- config.el: 替换的元素 HTMLElement
     *============================*/
    function InterchangeNode(config) {
        var self = this;
        if (!(self instanceof InterchangeNode)) {
            return new InterchangeNode(config);
        }
        self.config = config;
        self._init(config);
        return this;
    }
    S.augment(InterchangeNode, {
        _init: function(config) {
            var self = this;
            S.mix(self, Event.Target);
            S.mix(self, config);
            if (!self.checkIdOrSetId()) {
                return;
            }
            self.checkNodeType();
            self.parseAttr();
            self.bindEvent();
        },
        checkIdOrSetId: function() {
            var self = this;
            var idAttrName = 'data-interchangeid';
            var id = DOM.data(self.el, idAttrName);
            if (id) {
                return false;
            }
            //--set id
            self._id = S.guid();
            DOM.data(self.el, idAttrName, self._id);
            return true;
        },
        checkNodeType: function() {
            var self = this;
            self.isImageNode = false;
            if (/IMG/.test(self.el.nodeName)) {
                self.isImageNode = true;
            }
        },
        parseAttr: function() {
            var self = this;
            var el = self.el;
            var attr = DOM.attr(self.el, 'data-' + G.settings.attr);
            var raw = attr.match(/\((.*?)\)/ig);
            var scenarois = {};
            S.each(raw, function(it) {
                var reg = /\((.*?):(.*?)\)/gi;
                var query = reg.exec(it);
                if (query && query.length === 3) {
                    scenarois[S.trim(query[2])] = S.trim(query[1]);
                }
            });
            self.scenarois = scenarois;
        },
        bindEvent: function() {
            var self = this;
            Interchange.on('resize', function(matchMedia) {
                // console.log('resize');
                self.load();
            });
        },
        replace: function(path) {
        	var self = this;
        	var el = self.el;
            if (/IMG/.test(el.nodeName)) {
                var originPath = el.src;
                if (new RegExp(path, 'i').test(originPath)) return;
                el.src = path;
                Interchange.fire('replace', el, path)
            }
        },
        load: function() {
        	var self = this;
            var medias = getCurrentMedia();
            var scenarois = self.scenarois;
            for (var attr in medias){
            	if(medias[attr] && scenarois[attr]){
            		self.replace(scenarois[attr]);
            		//--找到匹配的就返回
            		//--todo－－优先级匹配
            		return;
            	}
            }
        }
    });
    /*==========================
     * @desc : Interchange 控制InterchangeNode
     *        控制window的resize以及throttle控制
     *==========================*/
    function Interchange(el) {
        if (this instanceof Interchange) {
            return Interchange(el);
        }
        return new InterchangeNode({
            el: el
        });
    }
    S.mix(Interchange, Event.Target);
    Interchange.init = function() {
        var attr = G.settings.attr;
        var nodes = DOM.query('[data-' + attr + ']');
        nodes = Array.prototype.slice.call(nodes, 0);
        // this.count = nodes.length;
        // this.loaded = 0;
        this.processNode(nodes);
        this.bindResizeEvent();
    }
    Interchange.processNode = function(nodes) {
        S.each(nodes, function(node) {
            var interchangeNode = new InterchangeNode({
                el: node
            });
            interchangeNode.load();
        });
    }
    Interchange.bindResizeEvent = function() {
        var self = this;
        var prevMedia = {};
        Event.on(window, 'resize', S.throttle(function() {
            var currentMedia = getCurrentMedia();
            if (!equal(currentMedia, prevMedia)) {
                Interchange.fire('resize', currentMedia);
            }
            prevMedia = currentMedia;
        }, 50, this));
        return self;

        function equal(a, b) {
            for (var attr in G.settings.queries) {
                if (!b[attr] || b[attr] !== a[attr]) {
                    return false;
                }
            }
            return true;
        }
    }

    function getCurrentMedia() {
        var mediaHash = {};
        S.each(G.settings.queries, function(val, key) {
            mediaHash[key] = matchMedia(val).matches;
        });
        return mediaHash;
    }
    
    Event.on(window, 'load', function() {
        Interchange.init();

    });
    return Interchange;
}, {
    requires: ['dom', 'event', 'timothy/timothy']
})