// Create a new scene

let gameScene = new Phaser.Scene('Game');
// Set the config of game
let config = {
    type: Phaser.AUTO, //phaser will use WebGL (first option) or Canvas (second option)
    height: 360,
    scene: gameScene
};

// create a new game, pass config
let game = new Phaser.Game(config);