WWFarmer.Prologue = function (game) {};

WWFarmer.Prologue.prototype = {
	create: function () {
		this.add.sprite(0, 0, "prologue");

		this.input.onTap.add(this.toGame, this);
	},
	toGame: function () {
		this.state.start("Game");
	}
};
