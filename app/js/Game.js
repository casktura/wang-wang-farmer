var gardenAttr = {
	rowCount: 5,
	columnCount: 3,
	start: {
		x: 91,
		y: 245
	},
	end: {
		x: 635,
		y: 1130
	},
	blockWidth: 174,
	blockHeight: 181,
	blockScale: 0.95,
	next: {
		x: 0,
		y: 0
	},
	spacing: {
		x: 0,
		y: 0
	}
};

gardenAttr.spacing.x = Math.floor(((gardenAttr.end.x - gardenAttr.start.x) - (gardenAttr.blockWidth * gardenAttr.blockScale * gardenAttr.columnCount)) / (gardenAttr.columnCount - 1));
gardenAttr.spacing.y = Math.floor(((gardenAttr.end.y - gardenAttr.start.y) - (gardenAttr.blockHeight * gardenAttr.blockScale * gardenAttr.rowCount)) / (gardenAttr.rowCount - 1));

gardenAttr.next.x = (gardenAttr.blockWidth * gardenAttr.blockScale) + gardenAttr.spacing.x;
gardenAttr.next.y = (gardenAttr.blockHeight * gardenAttr.blockScale) + gardenAttr.spacing.y;

var plants = {
	tunip: {
		daysToGrown: 1,
		seedCost: 15,
		sellPrice: 25,
		frame: 1,
		name: "Tunip"
	},
	potato: {
		daysToGrown: 2,
		seedCost: 30,
		sellPrice: 50,
		frame: 4,
		name: "Potato"
	},
	corn: {
		daysToGrown: 3,
		seedCost: 45,
		sellPrice: 70,
		frame: 7,
		name: "Corn"
	},
	tomato: {
		daysToGrown: 4,
		seedCost: 100,
		sellPrice: 150,
		frame: 10,
		name: "Tomato"
	},
	pineapple: {
		daysToGrown: 5,
		seedCost: 170,
		sellPrice: 250,
		frame: 13,
		name: "Pineapple"
	}
};

var plantTypes = [
	"tunip",
	"potato",
	"corn",
	"tomato",
	"pineapple"
];

var inventory;

var selectedMenu = "";
var selectedSeed = "";

var Garden = function (x, y, game) {
	this.x = x;
	this.y = y;
	this.game = game;

	this.state = 0;
	this.days = 0;
	this.plantType = "";
	this.watered = false;

	this.soil = null;
	this.plant = null;
	this.button = null;
};

Garden.prototype = {
	run: function () {
		if (selectedMenu == "water-can" && this.watered == false) {
			this.game.wateringSound.play();

			this.watered = true;
			this.soil.frame = 1;
		} else if (selectedMenu == "harvest" && this.state == 2) {
			this.game.harvestSound.play();

			this.game.money += plants[this.plantType].sellPrice;
			this.plant.frame = 0;
			this.state = 0;
			this.plantType = "";

			this.game.coin.x = this.plant.centerX;
			this.game.coin.y = this.plant.centerY;
			this.game.coin.scale.set(1);
			this.game.coin.alpha = 1;
			this.game.add.tween(this.game.coin).to({x: this.game.moneyText.centerX, y: this.game.moneyText.centerY}, 1000, Phaser.Easing.Exponential.InOut, true);
			this.game.add.tween(this.game.coin).to({alpha: 0}, 1000, Phaser.Easing.Exponential.In, true);
			this.game.add.tween(this.game.coin.scale).to({x: 0.3, y: 0.3}, 1000, Phaser.Easing.Exponential.InOut, true).onComplete.add(this.game.updateStatus,this.game);
		} else if (selectedMenu == "inventory" && selectedSeed != "" && this.plantType == "") {
			this.game.plantingSound.play();

			inventory[selectedSeed]--;
			this.plantType = selectedSeed;
			this.plant.frame = plants[this.plantType].frame;

			if (inventory[selectedSeed] == 0) {
				selectedSeed = "";
				selectedMenu = "";
				this.game.selectedSeedText.text = "Seed: None";
			}
		}
	},
	endTurn: function () {
		if (this.watered) {
			this.watered = false;
			this.soil.frame = 0;

			if (this.plantType != "" && this.state < 2) {
				this.days++;

				if (this.days == plants[this.plantType].daysToGrown) {
					this.state++;
					this.days = 0;
					this.plant.frame = plants[this.plantType].frame + this.state;
				}
			}
		}
	}
};

WWFarmer.Game = function (game) {};

WWFarmer.Game.prototype = {
	init: function () {
		this.money = 50;
		this.days = 1;

		inventory = {
			tunip: 0,
			potato: 0,
			corn: 0,
			tomato: 0,
			pineapple: 0
		};

		this.gardens = [];
	},
	create: function () {
		this.playStageDemo = this.add.sprite(0, 0, "garden-background");
		this.createMenu();
		this.placeGarden();

		this.createInventoryPopUp();
		this.createShopPopUp();
		this.createLoanSharkPopUp();

		this.coin = this.add.sprite(0, 0, "coin");
		this.coin.scale.set(0.3);
		this.coin.anchor.set(0.5);
		this.coin.alpha = 0;

		this.plantingSound = this.add.sound("planting-sound", 0.75);
		this.plantingSound.allowMultiple = true;

		this.wateringSound = this.add.sound("watering-sound");
		this.wateringSound.allowMultiple = true;

		this.harvestSound = this.add.sound("harvest-sound", 0.4);
		this.harvestSound.allowMultiple = true;
	},
	toGameOver: function () {
		this.state.start("GameOver");
	},
	placeGarden: function () {
		var buttonOffSet = Math.floor(7 * gardenAttr.blockScale);

		for (var K = 0; K < gardenAttr.rowCount; K++) {
			for (var L = 0; L < gardenAttr.columnCount; L++) {
				var garden = new Garden(gardenAttr.start.x + (L * gardenAttr.next.x), gardenAttr.start.y + (K * gardenAttr.next.y), this);
				garden.soil = this.add.sprite(garden.x, garden.y, "soil", 0);
				garden.soil.scale.set(gardenAttr.blockScale);

				garden.plant = this.add.sprite(garden.soil.centerX, garden.soil.centerY, "plant", 0);
				garden.plant.anchor.set(0.5);
				garden.plant.scale.set(gardenAttr.blockScale);

				garden.button = this.add.button(garden.x - buttonOffSet, garden.y - buttonOffSet, "soil-select-button", garden.run, garden, 1, 0, 1, 0);
				garden.button.scale.set(gardenAttr.blockScale);

				this.gardens.push(garden);
			}
		}
	},
	createMenu: function () {
		var menuWidth = Math.floor((697 - 21) / 5);
		var menuHeight = 121 - 21;
		var x = 21;
		this.inventoryButton = this.add.sprite(x, 21, "inventory");
		this.inventoryButton.width = menuWidth;
		this.inventoryButton.height = menuHeight;
		this.inventoryButton.inputEnabled = true;
		this.inventoryButton.events.onInputDown.add(this.menuPressed, this, 0, "inventory");
		x += menuWidth;

		this.waterCanButton = this.add.sprite(x, 21, "water-can");
		this.waterCanButton.width = menuWidth;
		this.waterCanButton.height = menuHeight;
		this.waterCanButton.inputEnabled = true;
		this.waterCanButton.events.onInputDown.add(this.menuPressed, this, 0, "water-can", 0);
		x += menuWidth;

		this.harvestButton = this.add.sprite(x, 21, "harvest");
		this.harvestButton.width = menuWidth;
		this.harvestButton.height = menuHeight;
		this.harvestButton.inputEnabled = true;
		this.harvestButton.events.onInputDown.add(this.menuPressed, this, 0, "harvest", 0);
		x += menuWidth;

		this.shopButton = this.add.sprite(x, 21, "shop");
		this.shopButton.width = menuWidth;
		this.shopButton.height = menuHeight;
		this.shopButton.inputEnabled = true;
		this.shopButton.events.onInputDown.add(this.menuPressed, this, 0, "shop");
		x += menuWidth;

		this.endTurnButton = this.add.sprite(x, 21, "end-turn");
		this.endTurnButton.width = menuWidth;
		this.endTurnButton.height = menuHeight;
		this.endTurnButton.inputEnabled = true;
		this.endTurnButton.events.onInputDown.add(this.menuPressed, this, 0, "end-turn");

		this.moneyText = this.add.text(100, 1210, "", {fill: "white"});
		this.daysText = this.add.text(300, 1210, "", {fill: "white"});
		this.updateStatus();

		this.selectedSeedText = this.add.text(450, 1210, "", {fill: "white"});
		this.selectedSeedText.text = "Seed: None";
	},
	updateStatus: function () {
		this.moneyText.text = "Money: " + this.money;
		this.daysText.text = "Days: " + this.days;
	},
	menuPressed: function (object, pointer, pressedMenu) {
		if (selectedMenu == "water-can" && pressedMenu == "water-can") {
			selectedMenu = "";
			this.waterCanButton.frame = 0;
		} else if (selectedMenu == "harvest" && pressedMenu == "harvest") {
			selectedMenu = "";
			this.harvestButton.frame = 0;
		} else {

			selectedMenu = "";
			selectedSeed = "";
			this.waterCanButton.frame = 0;
			this.harvestButton.frame = 0;
			this.selectedSeedText.text = "Seed: None";

			if (pressedMenu == "water-can") {
				selectedMenu = "water-can";
				this.waterCanButton.frame = 1;
			} else if (pressedMenu == "harvest") {
				selectedMenu = "harvest";
				this.harvestButton.frame = 1;
			} else if (pressedMenu == "inventory") {
				this.openInventory();
			} else if (pressedMenu == "shop") {
				this.openShop();
			} else if (pressedMenu == "end-turn") {
				this.preEndTurn();
			}
		}
	},
	preEndTurn: function () {
		this.add.tween(this.world).to({alpha: 0}, 250, Phaser.Easing.Exponential.InOut, true).onComplete.add(this.endTurn, this);
	},
	endTurn: function () {
		var gardensCount = gardenAttr.rowCount * gardenAttr.columnCount;
		for (var K = 0; K < gardensCount; K++) {
			this.gardens[K].endTurn();
		}

		this.days++;

		if (this.days % 10 == 0) {
			this.openLoanShark();
		}

		this.updateStatus();

		this.add.tween(this.world).to({alpha: 1}, 500, Phaser.Easing.Exponential.InOut, true);
	},
	createInventoryPopUp: function () {
		this.inventoryPopUp = this.add.sprite(this.world.centerX, -1, "inventory-pop-up");
		this.inventoryPopUp.scale.set(0);
		this.inventoryPopUp.inputEnabled = true;

		var selectButton = this.inventoryPopUp.addChild(this.make.button(501, 186, "inventory-select-button", this.selectTunip, this, 1, 0, 1, 0));
		selectButton.anchor.set(0.5);
		this.inventoryTunip = this.inventoryPopUp.addChild(this.make.text(320, 186, "", {fill: "black", font: "80px"}));
		this.inventoryTunip.anchor.set(0.5);

		selectButton = this.inventoryPopUp.addChild(this.make.button(501, 301, "inventory-select-button", this.selectPotato, this, 1, 0, 1, 0));
		selectButton.anchor.set(0.5);
		this.inventoryPotato = this.inventoryPopUp.addChild(this.make.text(320, 309, "", {fill: "black", font: "80px"}));
		this.inventoryPotato.anchor.set(0.5);

		selectButton = this.inventoryPopUp.addChild(this.make.button(501, 422, "inventory-select-button", this.selectCorn, this, 1, 0, 1, 0));
		selectButton.anchor.set(0.5);
		this.inventoryCorn = this.inventoryPopUp.addChild(this.make.text(320, 415, "", {fill: "black", font: "80px"}));
		this.inventoryCorn.anchor.set(0.5);

		selectButton = this.inventoryPopUp.addChild(this.make.button(501, 534, "inventory-select-button", this.selectTomato, this, 1, 0, 1, 0));
		selectButton.anchor.set(0.5);
		this.inventoryTomato = this.inventoryPopUp.addChild(this.make.text(320, 546, "", {fill: "black", font: "80px"}));
		this.inventoryTomato.anchor.set(0.5);

		selectButton = this.inventoryPopUp.addChild(this.make.button(501, 659, "inventory-select-button", this.selectPineapple, this, 1, 0, 1, 0));
		selectButton.anchor.set(0.5);
		this.inventoryPineapple = this.inventoryPopUp.addChild(this.make.text(320, 653, "", {fill: "black", font: "80px"}));
		this.inventoryPineapple.anchor.set(0.5);

		var closeButton = this.inventoryPopUp.addChild(this.make.button(600, 20, "close-button", this.closeInventory, this));
		closeButton.anchor.set(0.5);
	},
	openInventory: function () {
		this.inventoryTunip.text = inventory.tunip;
		this.inventoryPotato.text = inventory.potato;
		this.inventoryCorn.text = inventory.corn;
		this.inventoryTomato.text = inventory.tomato;
		this.inventoryPineapple.text = inventory.pineapple;

		this.add.tween(this.inventoryPopUp).to({x: 50, y: 50}, 250, "Linear", true);
		this.add.tween(this.inventoryPopUp.scale).to({x: 1, y: 1}, 250, "Linear", true);
	},
	selectTunip: function () {
		if (inventory.tunip == 0)
			return;

		selectedSeed = "tunip";
		this.closeInventory();
	},
	selectPotato: function () {
		if (inventory.potato == 0)
			return;

		selectedSeed = "potato";
		this.closeInventory();
	},
	selectCorn: function () {
		if (inventory.corn == 0)
			return;

		selectedSeed = "corn";
		this.closeInventory();
	},
	selectTomato: function () {
		if (inventory.tomato == 0)
			return;

		selectedSeed = "tomato";
		this.closeInventory();
	},
	selectPineapple: function () {
		if (inventory.pineapple == 0)
			return;

		selectedSeed = "pineapple";
		this.closeInventory();
	},
	closeInventory: function () {
		if (selectedSeed != "") {
			selectedMenu = "inventory";
			this.selectedSeedText.text = "Seed: " + plants[selectedSeed].name;
		}

		this.add.tween(this.inventoryPopUp).to({x: this.world.centerX, y: -1}, 250, "Linear", true);
		this.add.tween(this.inventoryPopUp.scale).to({x: 0, y: 0}, 250, "Linear", true);
	},
	createShopPopUp: function () {
		this.shopPopUp = this.add.sprite(this.world.centerX, -1, "shop-pop-up");
		this.shopPopUp.scale.set(0);
		this.shopPopUp.inputEnabled = true;

		var buyButton = this.shopPopUp.addChild(this.make.button(501, 186, "shop-buy-button", this.buyTunip, this, 1, 0, 1, 0));
		buyButton.anchor.set(0.5);
		buyButton = this.shopPopUp.addChild(this.make.button(501, 301, "shop-buy-button", this.buyPotato, this, 1, 0, 1, 0));
		buyButton.anchor.set(0.5);
		buyButton = this.shopPopUp.addChild(this.make.button(501, 422, "shop-buy-button", this.buyCorn, this, 1, 0, 1, 0));
		buyButton.anchor.set(0.5);
		buyButton = this.shopPopUp.addChild(this.make.button(501, 534, "shop-buy-button", this.buyPotato, this, 1, 0, 1, 0));
		buyButton.anchor.set(0.5);
		buyButton = this.shopPopUp.addChild(this.make.button(501, 659, "shop-buy-button", this.buyPineapple, this, 1, 0, 1, 0));
		buyButton.anchor.set(0.5);

		var closeButton = this.shopPopUp.addChild(this.make.button(600, 20, "close-button", this.closeShop, this));
		closeButton.anchor.set(0.5);
	},
	openShop: function () {
		this.add.tween(this.shopPopUp).to({x: 50, y: 50}, 250, "Linear", true);
		this.add.tween(this.shopPopUp.scale).to({x: 1, y: 1}, 250, "Linear", true);
	},
	buyTunip: function () {
		if ( this.money >= plants.tunip.seedCost) {
			inventory.tunip++;
			this.money -= plants.tunip.seedCost;
			this.updateStatus();
		}
	},
	buyPotato: function () {
		if ( this.money >= plants.potato.seedCost) {
			inventory.potato++;
			this.money -= plants.potato.seedCost;
			this.updateStatus();
		}
	},
	buyCorn: function () {
		if ( this.money >= plants.corn.seedCost) {
			inventory.corn++;
			this.money -= plants.corn.seedCost;
			this.updateStatus();
		}
	},
	buyPotato: function () {
		if ( this.money >= plants.tomato.seedCost) {
			inventory.tomato++;
			this.money -= plants.tomato.seedCost;
			this.updateStatus();
		}
	},
	buyPineapple: function () {
		if ( this.money >= plants.pineapple.seedCost) {
			inventory.pineapple++;
			this.money -= plants.pineapple.seedCost;
			this.updateStatus();
		}
	},
	closeShop: function () {
		this.add.tween(this.shopPopUp).to({x: this.world.centerX, y: -1}, 250, "Linear", true);
		this.add.tween(this.shopPopUp.scale).to({x: 0, y: 0}, 250, "Linear", true);
	},
	createLoanSharkPopUp: function () {
		this.loanSharkPopUp = this.add.sprite(this.world.centerX, -1, "loan-shark-pop-up");
		this.loanSharkPopUp.scale.set(0);
		this.loanSharkPopUp.inputEnabled = true;

		this.loanSharkMoney = this.loanSharkPopUp.addChild(this.make.text(430, 245, "", {fill: "black"}));
		this.loanSharkMoney.anchor.set(0.5);
		this.loanSharkPayment = this.loanSharkPopUp.addChild(this.make.text(430, 355, "", {fill: "black"}));
		this.loanSharkPayment.anchor.set(0.5);
		this.loanSharkNetMoney = this.loanSharkPopUp.addChild(this.make.text(430, 465, "", {fill: "black"}));
		this.loanSharkNetMoney.anchor.set(0.5);

		var closeButton = this.loanSharkPopUp.addChild(this.make.button(460, 1020, "loan-shark-button", this.closeLoanShark, this));
		closeButton.anchor.set(0.5);
	},
	openLoanShark: function () {
		this.loanSharkMoney.text = this.money;
		var payment = Math.floor(this.days / 10) * 50;
		this.money -= payment;
		this.loanSharkPayment.text = payment;
		this.loanSharkNetMoney.text = this.money;

		this.add.tween(this.loanSharkPopUp).to({x: 50, y: 50}, 250, "Linear", true);
		this.add.tween(this.loanSharkPopUp.scale).to({x: 1, y: 1}, 250, "Linear", true);
	},
	closeLoanShark: function () {
		if (this.money < 0) {
			this.state.start("GameOver", true, false, this.days);
		}
		this.add.tween(this.loanSharkPopUp).to({x: this.world.centerX, y: -1}, 250, "Linear", true);
		this.add.tween(this.loanSharkPopUp.scale).to({x: 0, y: 0}, 250, "Linear", true);
	},
};
