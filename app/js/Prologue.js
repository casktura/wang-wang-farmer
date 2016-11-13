WWFarmer.Prologue = function (game) {};

WWFarmer.Prologue.prototype = {
	create: function () {
		this.add.text(0, 0, "This is Prologue Page", {fill: "white"});
		this.add.text(0, 50, "Tab to go to game page", {fill: "white"});
		this.input.onTap.add(this.toGame, this);
	},
	toGame: function () {
		this.state.start("Game");
	}
};
