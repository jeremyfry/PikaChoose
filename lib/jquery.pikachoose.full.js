/*
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);


/*  10/14/2011
		PikaChoose
	Jquery plugin for photo galleries
    Copyright (C) 2011 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
(function($) {
    /**
     * Creates a slideshow for all matched elements.
     *
     * @example $("#pikame").PikaChoose();
     * @input needed <ul id="pikame"><li><img src="first.jpg"><span>Caption</span></li><li><img src="second.jpg"><span>Caption</span></li></ul>
     *
     * @method PikaChoose
     * @return $
     * @param o {Hash|String} A set of key/value pairs to set as configuration properties or a method name to call on a formerly created instance.
     */
 	var defaults = {
		autoPlay: true,
		speed: 5000,
		text: { play: "", stop: "", previous: "Previous", next: "Next", loading: "Loading" },
		transition:[1],
		showCaption: true,
		IESafe: false,
		showTooltips: false,
		carousel: false,
		carouselVertical: false,
		animationFinished: null,
		buildFinished: null,
		bindFinished: null,
		startOn: 0,
		thumbOpacity: 0.4,
		hoverPause: false,
		animationSpeed: 600,
		fadeThumbsIn: false,
		carouselOptions: {}
	};
   
    $.fn.PikaChoose = function(o) {
		return this.each(function() {
			$(this).data('pikachoose', new $pc(this, o));
		});
	};
	
	/**
     * The PikaChoose object.
     *
     * @constructor
     * @class pikachoose
     * @param e {HTMLElement} The element to create the carousel for.
     * @param o {Object} A set of key/value pairs to set as configuration properties.
     * @cat Plugins/PikaChoose
     */
    $.PikaChoose = function(e, o) {
		this.options    = $.extend({}, defaults, o || {});
		this.list     	= null;
		this.image  	= null;
		this.anchor		= null;
		this.caption	= null;
		this.imgNav		= null;
		this.imgPlay 	= null;
		this.imgPrev	= null;
		this.imgNext 	= null;
		this.textNext	= null;
		this.textPrev	= null;
		this.previous  	= null;
		this.next 		= null;
		this.aniWrap	= null;
		this.aniDiv		= null;
		this.aniImg		= null;
		this.thumbs		= null;
		this.transition	= null;
		this.active		= null;
		this.tooltip	= null;
		this.animating	= false;
		this.stillOut 	= null;
		this.counter	= null;
		this.timeOut	= null;
		if(typeof(this.options.data) != "undefined"){
			//user passed a data source
			e = $("<ul></ul>").appendTo(e);
			$.each(this.options.data,function(){
				if(typeof(this.link) != "undefined"){ 
					var tmp = $("<li><a href='"+this.link+"'><img></a></li>").appendTo(e);
					if(typeof(this.title) != "undefined"){ tmp.find('a').attr('title',this.title); }
				}else{
					var tmp = $("<li><img></li>").appendTo(e);
				}
				if(typeof(this.caption) != "undefined"){ tmp.append("<span>"+this.caption+"</span>"); }
				if(typeof(this.thumbnail) != "undefined"){ 
					tmp.find('img').attr('ref',this.image); 
					tmp.find('img').attr('src',this.thumbnail); 
				}else{
					tmp.find('img').attr('src',this.image); 
				}
			});
		}
		if(e.nodeName.toUpperCase() == 'UL' || e.nodeName.toUpperCase() == 'OL' || e instanceof  jQuery) {
            this.list = $(e);
			this.list.hide();
            this.build();
            this.bindEvents();
        }else{
        	return;
        }
		
		var y = 0;
		var x = 0;
		for(var t = 0; t<25;t++){
			var a = '<div col="'+y+'" row="'+x+'"></div>';
			this.aniDiv.append(a);
			y++;
			if(y == 5){
				x++;
				y=0;
			}
		}

    };//end PikaChoose function(e, o)
    
    var $pc = $.PikaChoose;
        $pc.fn = $pc.prototype = {
        pikachoose: '4.3.6'
    };
	
	$.fn.pikachoose = $.fn.PikaChoose;

    $pc.fn.extend = $pc.extend = $.extend;

    $pc.fn.extend({
        /**
         * Builds the gallery structure.
         *
         * @method build
         * @return undefined
         */
        build: function() {
        	this.step 		= 0; //transition step count
       	//create the structure for pikachoose
			this.wrap 		= $("<div class='pika-stage'></div>").insertBefore(this.list);
			this.image 		= $("<img>").appendTo(this.wrap);
			this.imgNav 	= $("<div class='pika-imgnav'></div>").insertAfter(this.image);
			this.imgPlay 	= $("<a></a>").appendTo(this.imgNav);
			this.counter 	= $("<span class='pika-counter'></span>").appendTo(this.imgNav);
			if(this.options.autoPlay){ this.imgPlay.addClass('pause'); }else{ this.imgPlay.addClass('play'); }
			this.imgPrev 	= $("<a class='previous'></a>").insertAfter(this.imgPlay);
			this.imgNext 	= $("<a class='next'></a>").insertAfter(this.imgPrev);
			this.caption 	= $("<div class='caption'></div>").insertAfter(this.imgNav).hide();
			this.tooltip 	= $("<div class='pika-tooltip'></div>").insertAfter(this.list).hide();
			this.aniWrap	= $("<div class='pika-aniwrap'></div>").insertAfter(this.caption);
			this.aniImg		= $("<img>").appendTo(this.aniWrap).hide();
			this.aniDiv		= $("<div class='pika-ani'></div>").appendTo(this.aniWrap);
			this.textNav 	= $("<div class='pika-textnav'></div>").insertAfter(this.aniWrap);
			this.textPrev 	= $("<a class='previous'>"+this.options.text.previous+"</a>").appendTo(this.textNav);
			this.textNext	= $("<a class='next'>"+this.options.text.next+"</a>").appendTo(this.textNav);
			this.list.addClass('pika-thumbs');
        	this.list.children('li').wrapInner("<div class='clip' />");
			this.thumbs = this.list.find('img');
			this.loader = $("<div class='pika-loader'></div>").appendTo(this.wrap).hide().html(this.options.text.loading);
			this.active		= this.thumbs.eq(this.options.startOn);
			//fill in info for first image
			this.finishAnimating({'source':this.active.attr('ref') || this.active.attr('src'),'caption':this.active.parents('li:first').find('span:first').html(), 'clickThrough':this.active.parent().attr('href') || "", 'clickThroughTitle':this.active.parent().attr('title') || ""});

			//process all the thumbnails
			var self = this;
			this.thumbs.each(function(){
				self.createThumb($(this),self);
			});
			//thubnails must fade in before jcarousel is called or we get that awesome no width/height error
			if(this.options.fadeThumbsIn){
				this.list.fadeIn();
			}else{
				this.list.show();
			}
			if(this.options.carousel){
				//default options for carousel
				var carouselDefaults = {vertical:this.options.carouselVertical, initCallback: function(carousel){
					jQuery(carousel.list).find('img').click(function(e,x) {
						if(typeof(x) !== 'undefined' && x.how == "auto"){
							if(self.options.autoPlay == false){
								return false;
							}
						}
						var clicked = parseInt(jQuery(this).parents('.jcarousel-item').attr('jcarouselindex'));
						var last = (jQuery(this).parents('ul').find('li:last').attr('jcarouselindex') == clicked-1) ? true : false;
						if(!last){
							clicked = (clicked-2<=0) ? 0 : clicked-2;
						}
						clicked++;
						carousel.scroll(clicked);
					});
				}};
				var carouselOptions = $.extend({}, carouselDefaults, this.options.carouselOptions || {});
				this.list.jcarousel(carouselOptions);
			}
			if(typeof(this.options.buildFinished) == 'function'){
	     		this.options.buildFinished(this);
	     	}
		}, //end setup
        /**
         * proccesses thumbnails
         *
         * @method createThumb
         * @return undefined
         */
        createThumb: function(ele) {
        	var self = ele;
			var that = this;
        	self.hide();
        	
			//store all the data with the image
        	$.data(ele[0],'clickThrough',self.parent('a').attr('href') || "");
        	$.data(ele[0],'clickThroughTitle',self.parent('a').attr('title') || "");
        	if(self.parent('a').length > 0){ self.unwrap(); }
        	$.data(ele[0],'caption',self.next('span').html() || "");
			self.next('span').remove();
        	$.data(ele[0],'source',self.attr('ref') || self.attr('src'));
			
			//gets each items index to iterate through them. Thanks to Tushar for the fix.
			$.data(ele[0],'order',self.closest('ul').find('li').index(self.parents('li')));
    		//pass data so it can enter the load scope
    		var data = $.data(ele[0]);
    		$('<img />').bind('load',{data:data},function(){
	    		if(typeof(that.options.buildThumbStart) == 'function'){
		     		that.options.buildThumbStart(that);
		     	}
    			//in this scope self refers to the image
				var img = $(this);
				var w = this.width;
				var h = this.height;
				if(w===0){w = img.attr("width");}
				if(h===0){h = img.attr("height");}
				//grab a ratio for image to user defined settings
				var ph = parseInt(self.parents('.clip').css('height').slice(0,-2));
				var pw = parseInt(self.parents('.clip').css('width').slice(0,-2));
				if(pw == 0){
					//failsafe for IE8
					pw = self.parents('li:first').outerWidth();
				}
				if(ph == 0){
					//failsafe for IE8
					ph = self.parents('li:first').outerHeight();
				}
				var rw = pw/w;
				var rh = ph/h;
				//determine which has the smallest ratio (thus needing
				//to be the side we use to scale so our whole thumb is filled)
				var ratio;
				if(rw<rh){
					//we'll use ratio later to scale and not distort
					ratio = rh;
					var left = ((w*ratio- pw)/2)*-1;
					left = Math.round(left);
					self.css({left:left});
				}else{
					ratio = rw;
					self.css({top:0});
				}
				//use those ratios to calculate scale
				var width = Math.round(w*ratio);
				var height = Math.round(h*ratio);
				self.css("position","relative");
				var imgcss={
					width: width+"px",
					height: height+"px"
				};
				self.css(imgcss);
				self.hover(
					function(e){
						clearTimeout(that.stillOut);
						$(this).stop(true,true).fadeTo(250,1);
						if(!that.options.showTooltips){ return; }
						that.tooltip.show().stop(true,true).html(data.caption).animate({top:$(this).parent().position().top, left:$(this).parent().position().left, opacity: 1.0},'fast');
					},
					function(e){
						if(!$(this).hasClass("active")){$(this).stop(true,true).fadeTo(250,that.options.thumbOpacity);
						that.stillOut = setTimeout(that.hideTooltip,700);
					}}
				);

				
				if(data.order == that.options.startOn){
					self.fadeTo(250,1);
					self.addClass('active');
					self.parents('li').eq(0).addClass('active');
				}else{
					self.fadeTo(250,that.options.thumbOpacity);
				}
				if(typeof(that.options.buildThumbFinish) == 'function'){
		     		that.options.buildThumbFinish(that);
		     	}
    		}).attr('src',self.attr('src'));
        },//end createThumb
		/**
         * proccesses thumbnails
         *
         * @method bindEvents
         * @return undefined
         */
        bindEvents: function() {
        	this.thumbs.bind('click',{self:this},this.imgClick);
        	this.imgNext.bind('click',{self:this},this.nextClick);
        	this.textNext.bind('click',{self:this},this.nextClick);
        	this.imgPrev.bind('click',{self:this},this.prevClick);
        	this.textPrev.bind('click',{self:this},this.prevClick);
        	this.imgPlay.bind('click',{self:this},this.playClick);
        	this.wrap.bind('mouseenter',{self:this},function(e){
        		e.data.self.imgNav.stop(true,true).fadeTo('slow', 1.0);
				if(e.data.self.options.hoverPause == true){
					clearTimeout(e.data.self.timeOut);
				}
        	});
        	this.wrap.bind('mouseleave',{self:this},function(e){
        		e.data.self.imgNav.stop(true,true).fadeTo('slow', 0.0);
				if(e.data.self.options.autoPlay == true && e.data.self.options.hoverPause){
					e.data.self.timeOut = setTimeout((function(self){
						return function(){ self.nextClick(); };
					})(e.data.self), e.data.self.options.speed);
				}
        	});
			this.tooltip.bind('mouseenter',{self:this},function(e){
				clearTimeout(e.data.self.stillOut);
			});
			this.tooltip.bind('mouseleave',{self:this},function(e){
				e.data.self.stillOut = setTimeout(e.data.self.hideTooltip,700);
			});
			if(typeof(this.options.bindsFinished) == 'function'){
	     		this.options.bindsFinished(this);
	     	}
        },//end bind event
		/**
         * hides tooltip
         *
         * @method hideTooltip
         * @return undefined
         */
		hideTooltip: function (e){
			$(".pika-tooltip").animate({opacity:0.01});
		},
        /**
         * handles gallery after aclick occurs. and sets active classes
         *
         * @method imgClick
         * @return undefined
         */
	     imgClick: function(e,x) {
	     	var self = e.data.self;
			var data = $.data(this);
	     	if(self.animating){return;}
     		if(typeof(x) == 'undefined' || x.how != "auto"){
	     		//arrive here if natural click
	     		if(self.options.autoPlay){
	     			self.imgPlay.trigger('click');
	     		}
			}else{
				if(self.options.autoPlay == false){
					return false;
				}
			}
			//check if the src is the same as the current photo or if they're using user thumb
			if($(this).attr('src') !== $.data(this).source){
				self.loader.fadeIn('fast');
			}
			self.caption.fadeOut('slow');
	     	self.animating = true;
	     	self.active.fadeTo(300,self.options.thumbOpacity).removeClass('active');
			self.active.parents('.active').eq(0).removeClass('active');
	     	self.active = $(this);
	     	self.active.addClass('active').fadeTo(200,1);
	     	self.active.parents('li').eq(0).addClass('active');
	 		$('<img />').bind('load', {self:self,data:data}, function(){
	 			self.loader.fadeOut('fast');
				//in this scope self referes to the PikaChoose object
				self.aniDiv.css({height:self.image.height(),width:self.image.width()}).fadeIn('fast');
				self.aniDiv.children('div').css({'width':'20%','height':'20%','float':'left'});
		
				//decide our transition
				var n = 0;
				if(self.options.transition[0] == -1){	
					//random
					n = Math.floor(Math.random()*7)+1;
				}else{
					n = self.options.transition[self.step];
					self.step++;
					if(self.step >= self.options.transition.length){self.step=0;}
				}
				if(self.options.IESafe && $.browser.msie){ n = 1; }
				self.doAnimation(n,data);
				
			}).attr('src',$.data(this).source);//end image preload
	     },//end bindEvents
	     doAnimation: function(n,data){
	     		var self = this; //self in this scope refers to PikaChoose object. Needed for callbacks on animations
				self.image.stop(true,false);
				self.caption.stop().fadeOut();
				var aWidth = self.aniDiv.children('div').eq(0).width();
				var aHeight = self.aniDiv.children('div').eq(0).height();
				var img = new Image();
				$(img).attr('src',data.source);
				if(img.height != self.image.height() || img.width != self.image.width()){
					//Your images are not the same height? Well you get limited on transitions
					if(n != 0 && n != 1 && n != 7){
						n = 1;
					}
				}
				self.aniDiv.css({height:img.height,width:img.width});
				self.aniDiv.children().each(function(){
					//position myself absolutely
					var div = $(this);
					var xOffset = Math.floor(div.parent().width()/5)*div.attr('col');
					var yOffset = Math.floor(div.parent().height()/5)*div.attr('row');
					div.css({
						'background':'url('+data.source+') -'+xOffset+'px -'+yOffset+'px',
						'width':'0px',
						'height':'0px',
						'position':'absolute',
						'top':yOffset+'px',
						'left':xOffset+'px',
						'float':'none'
					});
				});//end ani_divs.children.each
				self.aniDiv.hide();
				self.aniImg.hide();
				
	     		switch(n){
					case 0:
						//fade out then in
						self.image.stop(true,true).fadeOut(self.options.animationSpeed,function(){
							self.image.attr('src',data.source).fadeIn(self.options.animationSpeed,function(){
								self.finishAnimating(data);
							});
						});
	
						break;
					case 1:
						//full frame fade
						self.aniDiv.hide();
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						$.when(
							self.image.fadeOut(self.options.animationSpeed),
							self.aniImg.eq(0).fadeIn(self.options.animationSpeed)).done(function(){
							self.finishAnimating(data);
						});
	
						break;
					case 2:
						self.aniDiv.show().children().hide().each(function(index){  
							//animate out as blocks 
							var delay = index*30;
							$(this).css({opacity: 0.1}).show().delay(delay).animate({opacity: 1,"width":aWidth,"height":aHeight},200,'linear',function(){
								if(self.aniDiv.find("div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 3:
						self.aniDiv.show().children("div:lt(5)").hide().each(function(index){
							var delay = $(this).attr('col')*100;
							$(this).css({opacity:0.1,"width":aWidth}).show().delay(delay).animate({opacity:1,"height":self.image.height()},self.options.animationSpeed,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;							
					case 4:
						self.aniDiv.show().children().hide().each(function(index){
							if(index>4){ return; }
							var delay = $(this).attr('col')*10;
							aHeight = self.gapper($(this), aHeight);
							$(this).css({opacity:0.1,"height":"100%"}).show().animate({opacity:1,"width":aWidth},self.options.animationSpeed,'linear',function(){
								if(self.aniDiv.find(" div").index(this) == 4){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 5:
						self.aniDiv.show().children().show().each(function(index){
							var delay = index*Math.floor(Math.random()*5)*7;
							aHeight = self.gapper($(this), aHeight);
							
							if($(".animation div").index(this) == 24){
								delay = 600;
							}
							$(this).css({"height":aHeight,"width":aWidth,"opacity":.01}).delay(delay).animate({"opacity":1},self.options.animationSpeed,function(){
								if(self.aniDiv.find(" div").index(this) == 24){
									self.finishAnimating(data);
								}
							});
						});
						break;
					case 6:
						//full frame slide
						self.aniDiv.height(self.image.height()).hide().css({'background':'url('+data.source+') top left no-repeat'});
						self.aniDiv.children('div').hide();
						self.aniDiv.css({width:0}).show().animate({width:self.image.width()},self.options.animationSpeed,function(){
							self.finishAnimating(data);
							self.aniDiv.css({'background':'transparent'});
						});
						break;
					case 7:
						//side in slide
						self.wrap.css({overflow:'hidden'});
						self.aniImg.height(self.image.height()).hide().attr('src',data.source);
						self.aniDiv.hide();
						self.image.css({position:'relative'}).animate({left:"-"+self.wrap.outerWidth()+"px"});
						self.aniImg.show();
						self.aniWrap.css({left:self.wrap.outerWidth()}).show().animate({left:"0px"},self.options.animationSpeed,function(){
							self.finishAnimating(data);
						});
						break;
				}

	     },//end doAnimation
	     finishAnimating: function(data){
     		this.animating = false;
			this.image.attr('src',data.source);
			this.image.css({left:"0"});
			this.image.show();
			var self = this;
			$('<img />').bind('load',function(){
				self.aniImg.hide();
				self.aniDiv.hide();
			}).attr('src',data.source);
     		var cur = this.list.find('img').index(this.active);
     		cur++;
     		var total = this.list.find('img').length;
     		this.counter.html(cur+"/"+total);
			if(data.clickThrough != ""){
				if(this.anchor == null){
					this.anchor	= this.image.wrap("<a>").parent();
				}
				this.anchor.attr('href',data.clickThrough);
				this.anchor.attr('title',data.clickThroughTitle);
			}else{
	        	if(this.image.parent('a').length > 0){ this.image.unwrap(); }
				this.anchor = null;
			}
     		if(this.options.showCaption && data.caption != "" && data.caption != null){
     			this.caption.html(data.caption).fadeTo('slow',1);
     		}
     		if(this.options.autoPlay == true){
     			var self = this;
     			this.timeOut = setTimeout((function(self){
					return function(){ self.nextClick(); };
				})(this), this.options.speed, this.timeOut);
     		}
     		
     		if(typeof(this.options.animationFinished) == 'function'){
	     		this.options.animationFinished(this);
	     	}
	     },//end finishedAnimating
		 gapper: function(ele, aHeight){
			if(ele.attr('row') == 9 && ele.attr('col') == 0){
				//last row, check the gap and fix it!
				var gap = ani_divs.height()-(aHeight*9);
				return gap;
			}
			return aHeight;
		 },
		 nextClick : function(e){
			var how = "natural";
		 	try{
				var self = e.data.self;
				if(typeof(e.data.self.options.next) == 'function'){
					e.data.self.options.next(this);
				}
			}catch(err){
				var self = this;
				how = "auto";
			}
			var next = self.active.parents('li:first').next().find('img');
			if(next.length == 0){next = self.list.find('img').eq(0);};
		 	next.trigger('click',{how:how});
		 },
		 prevClick : function(e){
			if(typeof(e.data.self.options.previous) == 'function'){
	     		e.data.self.options.previous(this);
	     	}
			var self = e.data.self;
			var prev = self.active.parents('li:first').prev().find('img');
			if(prev.length == 0){prev = self.list.find('img:last');};
		 	prev.trigger('click');
		 },
		 playClick: function(e){
		 	var self = e.data.self;
		 	self.options.autoPlay = !self.options.autoPlay;
			self.imgPlay.toggleClass('play').toggleClass('pause');
			if(self.options.autoPlay){ self.nextClick(); }
		 }
	}); //end extend

})(jQuery);