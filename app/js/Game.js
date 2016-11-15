WWFarmer.Game = function (game) {};

WWFarmer.Game.prototype = {
	create: function () {
		this.playStageDemo = this.add.sprite(0, 0, "play-stage-demo");

		this.input.onTap.add(this.toGameOver, this);
	},
	toGameOver: function () {
		this.state.start("GameOver");
	}
};
