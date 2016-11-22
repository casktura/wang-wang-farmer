window.onload = function () {
	var game = new Phaser.Game(720, 1280, Phaser.AUTO, "game");

	game.state.add("Boot", WWFarmer.Boot);
	game.state.add("Preload", WWFarmer.Preload);
	game.state.add("Menu", WWFarmer.Menu);
	game.state.add("Prologue", WWFarmer.Prologue);
	game.state.add("Game", WWFarmer.Game);
	game.state.add("GameOver", WWFarmer.GameOver);
	game.state.add("Help", WWFarmer.Help);
	game.state.add("Credit", WWFarmer.Credit);

	game.state.start("Boot");
};

var WWFarmer = {
	bgSound: null,
	bgSoundPlay: true
};
