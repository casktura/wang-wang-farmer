WWFarmer.Menu = function (game) {};

WWFarmer.Menu.prototype = {
	create: function () {
		this.logoBackground = this.add.sprite(0, 0, "logo-background");

		this.startButton = this.add.button(this.world.centerX, 650, "start-button", this.toPrologue, this, 1, 0, 1, 0);
		this.startButton.anchor.set(0.5);
		this.startButton.scale.set(2.25);
		this.startButton.alpha = 0;
		this.add.tween(this.startButton).to({alpha: 1}, 500, "Linear", true);

		this.helpButton = this.add.button(this.world.centerX, 830, "help-button", this.toHelp, this, 1, 0, 1, 0);
		this.helpButton.anchor.set(0.5);
		this.helpButton.scale.set(2.25);
		this.helpButton.alpha = 0;
		this.add.tween(this.helpButton).to({alpha: 1}, 500, "Linear", true);

		this.creditButton = this.add.button(this.world.centerX, 1010, "credit-button", this.toCredit, this, 1, 0, 1, 0);
		this.creditButton.anchor.set(0.5);
		this.creditButton.scale.set(2.25);
		this.creditButton.alpha = 0;
		this.add.tween(this.creditButton).to({alpha: 1}, 500, "Linear", true);
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
