requirejs.config({
	'paths': {
		'jquery': ['../lib/jquery-1.11.2.min']
	}
});
require(
	[
		'jquery', 'initWorld', './ui/ui', './ui/showPerformanceData', './debug/nansDetector'
	],
	//回调函数，当前面指定的模块加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块
	function($, initWorld, ui, showPerformanceData, nansDetector) {
		var world = initWorld();
		var uiObj = ui(world);
		uiObj.init();
		(function () {
			var lastFrameTime = new Date().getTime();
			(function loop() {
				var time = new Date().getTime();
				var dt = (time - lastFrameTime);
				dt = dt > 100 ? 20 : dt;
				lastFrameTime = time;

				world.nextStep(dt);
				nansDetector(world.particles);
				showPerformanceData(world, dt);
				uiObj.render();
				requestAnimationFrame(loop);
			})();
		})();
	}
);
