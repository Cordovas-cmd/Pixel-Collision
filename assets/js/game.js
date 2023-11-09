// Create a new scene

let gameScene = new Phaser.Scene('Game');



// Load assets
gameScene.preload = function() {
    // Load Images (can be named anything)
    this.load.image('background', './assets/sprites/background.png')
    this.load.image('player', './assets/sprites/player.png')
};


// Called once after preload

gameScene.create = function() {
    // create bg (sprite)
   let bg = this.add.sprite(0, 0, 'background');

//    change origin of top-left corner
        // bg.setOrigin(0, 0);
        bg.setPosition(640/2, 360/2)
        // bg.setPosition(1024/2, 768/2)
        
        let canvasW = this.sys.game.config.width; 
        let canvasH = this.sys.game.config.height; 
        console.log(canvasW, canvasH)

        console.log(bg)
        console.log(this)
};
// Set the config of game
let config = {
    type: Phaser.AUTO, //phaser will use WebGL (first option) or Canvas (second option)
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass config
let game = new Phaser.Game(config);