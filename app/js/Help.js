WWFarmer.Help = function (game) {};

WWFarmer.Help.prototype = {
	create: function () {
		this.add.sprite(0, 0, "help");

		this.input.onTap.add(this.toMenu, this);
	},
	toMenu: function () {
		this.state.start("Menu");
	}
};
