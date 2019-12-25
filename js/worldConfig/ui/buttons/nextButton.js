define(['jquery'], function ($) {
	return {
    nextStep: function (world) {
      if(world.getStatus()===false)//暂停状态下可用
      {
        world.nextStep(20);
      }
    }
  }
});