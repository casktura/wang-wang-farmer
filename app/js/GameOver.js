WWFarmer.GameOver = function (game) {};

WWFarmer.GameOver.prototype = {
	create: function () {
		this.add.text(0, 0, "This is Game Over Page", {fill: "white"});
		this.add.text(0, 50, "Tab to go to menu", {fill: "white"});
		this.input.onTap.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
