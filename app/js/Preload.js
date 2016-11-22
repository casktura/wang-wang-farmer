WWFarmer.Preload = function (game) {};

WWFarmer.Preload.prototype = {
	init: function () {
		this.logoBackground = this.add.sprite(0, 0, "logo-background");
		this.logoBackground.alpha = 0.2;

		this.loadingText = this.add.sprite(this.world.centerX, 800, "loading-text");
		this.loadingText.anchor.set(0.5, 0);
		this.loadingText.scale.set(0.7);
		this.loadingText.animations.add("loading");
		this.loadingText.animations.play("loading", 2, true);
	},
	preload: function () {
		this.load.pack("menu", "assets/AssetPack.json");
		this.load.pack("prologue", "assets/AssetPack.json");
		this.load.pack("game", "assets/AssetPack.json");
		this.load.pack("game-over", "assets/AssetPack.json");
		this.load.pack("credit", "assets/AssetPack.json");
	},
	create: function () {
		this.add.tween(this.logoBackground).to({alpha: 1}, 1000, "Linear", true);
		this.add.tween(this.loadingText).to({alpha: 0}, 1000, "Linear", true).onComplete.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
