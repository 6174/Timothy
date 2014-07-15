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

KISSY.use("\
	dom, event,\
	timothy/timothy,\
	timothy/components/animo,\
	timothy/components/dataInterchange,\
	timothy/components/inview\
	", function(S, DOM, Event, Timothy, Animo, Interchange, Inview) {

	var AnimBtnGroup = DOM.get('#AnimaButtonGroup');
	var tmallJiang = DOM.get("#TmallJiang");

	Event.delegate(AnimBtnGroup, 'click', '.button', function(ev){
		var target = ev.target;
		var type = DOM.attr(target, 'data-animo');
		var str = 'blur,focus';
		if(str.indexOf(type) != -1){
			new Animo(tmallJiang, type);
			return;
		}
		// console.log(type, target);
		new Animo(tmallJiang, { animation: type } , function(){
			console.log('finish anim: ' + type);
		});
	});


    // console.log('loaded timothy: ', Animo);
    // console.log('something???');
});

 