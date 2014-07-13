/**
 * @module: timothy main
 * @author: 6174/hengtian
 * @email: xuejia.cxj@alibaba-inc.com
 * @data: 2014/7/12
 */
KISSY.add("timothy/timothy", function(S, DOM) {
    var Timothy = {};
    var head = DOM.get('head');
    initTimothy();

    function initTimothy() {
        resetMatchMediaMethod();
        setMediaQuerySize();
        setTimothyStylesheet();
    }
    /*-----------------------------
     *  重定义matchMedia
     *  https://github.com/paulirish/matchMedia.js
     *-----------------------------*/
    function resetMatchMediaMethod() {
        window.matchMedia = window.matchMedia || (function(doc) {
            "use strict";
            var bool, docElem = doc.documentElement,
                refNode = docElem.firstElementChild || docElem.firstChild,
                // fakeBody required for <FF4 when executed in <head>
                fakeBody = doc.createElement("body"),
                div = doc.createElement("div");
            div.id = "mq-test-1";
            div.style.cssText = "position:absolute;top:-100em";
            fakeBody.style.background = "none";
            fakeBody.appendChild(div);
            return function(q) {
                div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
                docElem.insertBefore(fakeBody, refNode);
                bool = div.offsetWidth === 42;
                docElem.removeChild(fakeBody);
                return {
                    matches: bool,
                    media: q
                };
            };
        }(document));
    }
    /*-----------------------------
     *  设置mediaQuerys信息
     *  media query信息存放在css类中
     *-----------------------------*/
    function setMediaQuerySize() {
        var arr = ['mq-small', 'mq-medium', 'mq-large'];
        var mediaQueries = {};
        S.each(arr, function(it) {
            var meta = DOM.create('<meta class="' + it + '"/>')
            DOM.append(meta, head);
            var str = DOM.css(meta, 'font-family');
            str = str.replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '');
            mediaQueries[it] = str;
        });
        Timothy.mediaQueries = mediaQueries;
        return;
    }

    function removeQuotes(string) {
        return string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }
    /*-----------------------------
     *  设置timothy管理的style， 放置在head中
     *  其目的式为了可以通过js控制media相关的样式
     */
    function setTimothyStylesheet() {
        var styleEl = DOM.create('<style></style>'),
            stylesheet;
        styleEl.appendChild(document.createTextNode(""));
        DOM.append(styleEl, head);
        Timothy.stylesheet = stylesheet = styleEl.sheet;

        Timothy.addRule = function(selector, rules, media) {
            var ruleStr = selector + '{' + rules + '}';
            if (media) {
                var query = Timothy.mediaQuerys[media];
                var mediaRule = '@media ' + query + '{' + ruleStr + '}';
                stylesheet.insertRule(mediaRule, stylesheet.length);
            } else {
                stylesheet.insertRule(ruleStr, stylesheet.length)
            }
        }
    }
    return Timothy;
}, {
    requires: ['dom']
});
