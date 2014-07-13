console.log('This would be the main JS file.');
/*-----------------------------
 *  kissy配置
 *-----------------------------*/
KISSY.config({
    packages: {
        timothy: {
            base: '../src',
            tag: '**',
            debug: true
        }
    }
});

KISSY.use("timothy/timothy, timothy/components/dataInterchange", function(S, Timothy) {
    console.log('loaded timothy: ', arguments);
    // console.log('something???');
});