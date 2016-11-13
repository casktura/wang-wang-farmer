WWFarmer.Preload = function (game) {};

WWFarmer.Preload.prototype = {
	init: function () {
		this.loadingText = this.add.text(this.world.centerX, this.world.centerY, "Loading", {fill: "white"});
		this.loadingText.anchor.set(0.5);
	},
	preload: function () {
		this.load.pack("menu", "assets/AssetPack.json");
	},
	create: function () {
		this.state.start("Menu");
	}
};
