WWFarmer.Menu = function (game) {};

WWFarmer.Menu.prototype = {
	create: function () {
		var topPadding = 200;
		this.gameName = this.add.text(this.world.centerX, topPadding, "Wang Wang Farmer", {fill: "white"});
		this.gameName.anchor.set(0.5);

		this.startButton = this.add.button(this.world.centerX, topPadding + 100, "start-button", this.toPrologue, this, 1, 0, 1, 0);
		this.startButton.anchor.set(0.5);

		this.helpButton = this.add.button(this.world.centerX, topPadding + 200, "help-button", this.toHelp, this, 1, 0, 1, 0);
		this.helpButton.anchor.set(0.5);

		this.creditButton = this.add.button(this.world.centerX, topPadding + 300, "credit-button", this.toCredit, this, 1, 0, 1, 0);
		this.creditButton.anchor.set(0.5);
	},
	toPrologue: function () {
		this.state.start("Prologue");
	},
	toHelp: function () {
		this.state.start("Help");
	},
	toCredit: function () {
		this.state.start("Credit");
	}
};
