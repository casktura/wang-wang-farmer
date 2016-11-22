WWFarmer.GameOver = function (game) {};

WWFarmer.GameOver.prototype = {
	init: function (days) {
		this.days = days;
	},
	create: function () {
		this.add.sprite(0, 0, "game-over");
		this.gameOverText = this.add.text(497, 648, this.days, {fill: "white", font: "80px"});
		this.gameOverText.anchor.set(0.5);

		this.input.onTap.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
