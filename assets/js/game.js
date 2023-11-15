// Create a new scene

let gameScene = new Phaser.Scene('Game');



// Load assets
gameScene.preload = function () {
    // Load Images (can be named anything)
    this.load.image('background', './assets/sprites/background.png')
    this.load.image('player', './assets/sprites/Illidian-Idle(2).png')
    this.load.image('drake', './assets/sprites/AdultRedDragon.png')
};


// Called once after preload

gameScene.create = function () {


    // sprites are rendered in order of when they are made, if player is before background you won't see player
    // let player = this.add.sprite(70, 180, 'player');
    // depth works like z index, the defaults is 0 and in this case it will allow it to display on top. 
    // player.depth = 1;
    // console.log(player)


    // create bg (sprite)
    let bg = this.add.sprite(0, 0, 'background');
    console.log(bg)

    //    change origin of top-left corner
    // bg.setOrigin(0, 0);
    bg.setPosition(640 / 2, 360 / 2)
    // bg.setPosition(1024/2, 768/2)

    let canvasW = this.sys.game.config.width;
    let canvasH = this.sys.game.config.height;


    // Create a player sprite.
    let player = this.add.sprite(70, 180, 'player');


    // Multiply the size of the player sprite by 2 can also be setScale(2) as a shorthand 
    player.setScale(2, 2);


    // flip the sprite across x
    // player.flipX = true;
    // flip the sprite across y
    // player.flipY = true;
    console.log(player)


    // Create enemy sprite
    // let enemy1 = this.add.sprite(250,180, 'drake')

    this.enemy1 = this.add.sprite(250,180, 'drake')
    
    
    // scales the enemy just a diff way to do it
    // enemy1.scaleX = 2;
    // enemy1.scaleY = 2;

    this.enemy1.scaleX = 2;
    this.enemy1.scaleY = 2;
    
    // set sprite angle methods
    // enemy1.angle = 45
    // enemy1.setAngle = 45


    // this.enemy1.angle(45);
    this.enemy1.setAngle(45);

    
    // use radius for rotation. Rotation based on origin. 
    
    // moves the origin and thus the rotation point.
    // enemy1.setOrigin(0,0);


    // Math.PI /4 same as 45 degrees.
    // enemy1.rotation = Math.PI 
    enemy1.setRotation(Math.PI / 4);


    // create second enemy
    let enemy2  = this.add.sprite(450,180, 'drake');

    // another method of resizing a sprite
    // enemy2.displayWidth = 200;
    console.log(this)
};

// create update method. up to 60 times per second.

gameScene.update = function(){

}



// Set the config of game
let config = {
    type: Phaser.AUTO, //phaser will use WebGL (first option) or Canvas (second option)
    width: 640,
    height: 360,
    scene: gameScene
};

// create a new game, pass config
let game = new Phaser.Game(config);