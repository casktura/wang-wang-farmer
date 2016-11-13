WWFarmer.Credit = function (game) {};

WWFarmer.Credit.prototype = {
	create: function () {
		this.add.text(0, 0, "This is Credit Page", {fill: "white"});
		this.add.text(0, 50, "Tab to go to menu", {fill: "white"});
		this.input.onTap.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
