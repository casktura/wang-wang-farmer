WWFarmer.Boot = function (game) {};

WWFarmer.Boot.prototype = {
	init: function () {
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
	preload: function () {
		this.load.pack("preload", "assets/AssetPack.json");
	},
	create: function () {
		this.state.start("Preload");
	}
};
