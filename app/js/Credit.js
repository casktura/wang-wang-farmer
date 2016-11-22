WWFarmer.Credit = function (game) {};

WWFarmer.Credit.prototype = {
	create: function () {
		this.add.sprite(0, 0, "credit");

		this.input.onTap.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
