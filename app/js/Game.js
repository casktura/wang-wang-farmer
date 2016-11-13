WWFarmer.Game = function (game) {};

WWFarmer.Game.prototype = {
	create: function () {
		this.add.text(0, 0, "This is Game Page", {fill: "white"});
		this.add.text(0, 50, "Tab to go to game over", {fill: "white"});
		this.input.onTap.add(this.toGameOver, this);
	},
	toGameOver: function () {
		this.state.start("GameOver");
	}
};
