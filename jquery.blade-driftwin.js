/*!
 * Blade Drift Window - v1.0.0 - 2016-08-10
 * jQuery Plug-in
 * http://github.com/panfeng-pf/blade-driftwin
 * Copyright (c) 2016 Blade Pan; Licensed Apache 2.0
 * Dependency: jQuery (test with jQuery v1.11.2)
 */
(function($) {
	/*==============================================
	 * drift window
	 *==============================================
	 */
	$.fn.bladeDriftWin = function(options) {
		var opts = $.extend({}, $.fn.bladeDriftWin.defaults, options);
		return this.each(function() {
			var jsDriftWin = this;
			
			jsDriftWin.style.position = 'absolute';
			jsDriftWin.style['z-index'] = '999';
			
			var runtime = {
				x: opts.xInit,
				y: opts.yInit,
				xDir: 1,
				yDir: 1
			};
			drift(jsDriftWin, opts, runtime);
			
			var genInterval = function() {
				return setInterval(function() {
					drift(jsDriftWin, opts, runtime);
				}, opts.interval);
			};
			
			var interval = genInterval();
			jsDriftWin.onmouseover = function(){
				clearInterval(interval);
			};
			jsDriftWin.onmouseout = function(){
				interval = genInterval();
			};
		});
	};
	
	/*==============================================
	 * default options
	 *==============================================
	 */
	$.fn.bladeDriftWin.defaults = {
		xStep: 1,
		yStep: 1,
		
		xInit: 0,
		yInit: 0,
		
		interval: 20 //ms
	};
	
	/*==============================================
	 * private
	 *==============================================
	 */
	var drift = function(jsDriftWin, opts, runtime) {
		var driftWinWidth = jsDriftWin.offsetWidth;
		var driftWinHeight = jsDriftWin.offsetHeight;
		
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		
		var minX = window.scrollX;
		var minY = window.scrollY;
		
		var maxX = minX + winW;
		var maxY = minY + winH;
		
		var left = runtime.x + minX;
		var top = runtime.y + minY;
		
		jsDriftWin.style.left = left + 'px';
		jsDriftWin.style.top = top + 'px';
		
		runtime.x += opts.xStep * runtime.xDir;
		if(runtime.x + driftWinWidth + minX >= maxX) {
			runtime.xDir = -1;
		}
		if(runtime.x + minX <= minX) {
			runtime.xDir = 1;
		}
		
		runtime.y += opts.yStep * runtime.yDir;
		if(runtime.y + driftWinHeight + minY >= maxY) {
			runtime.yDir = -1;
		}
		if(runtime.y + minY <= minY) {
			runtime.yDir = 1;
		}
	};
})(jQuery);