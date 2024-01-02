// Create a new scene

let gameScene = new Phaser.Scene('Game');


// initiate scene parameters
gameScene.init = function() {

    // player speed
    this.playerSpeed = 3;

    // enemy speed
    this.enemySpeed = 1;


    // game boundaries
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
}


// Load assets
gameScene.preload = function () {
    // Load Images (can be named anything)
    this.load.image('background', './assets/sprites/background.png')
    this.load.image('player', './assets/sprites/Illidian-Idle(3).png')
    this.load.image('drake', './assets/sprites/AdultRedDragon.png')
    this.load.image('goal', './assets/sprites/treasure.png')
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
    // let player = this.add.sprite(70, 180, 'player');
    this.player = this.add.sprite(70, this.sys.game.config.height/2, 'player');


    // Multiply the size of the player sprite by 2 can also be setScale(2) as a shorthand 
    // player.setScale(2, 2);
    this.player.setScale(1.5, 1.5);



    // Create treasure sprite
    this.goal = this.add.sprite(this.sys.game.config.width-80, this.sys.game.config.height / 2, 'goal')
    // set scale of treasure
    this.goal.setScale(0.6);



    this.enemy = this.add.sprite(200, this.sys.game.config.height / 2, 'drake' )

    // flip the sprite across x
    // player.flipX = true;
    // flip the sprite across y
    // player.flipY = true;
    // console.log(player)
    console.log(this.player)

    console.log(this)
};

// create update method. up to 60 times per second.

gameScene.update = function(){


    // check user input
    if(this.input.activePointer.isDown) {
        // player sprite moves
        this.player.x += this.playerSpeed
    }

    // check for collision with the player and the treasure chest.
    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();
    // console.log(playerRect)

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect,treasureRect)){
        console.log('reached goal!')
        this.scene.restart();
        return;
    }

    // enemy movement
    this.enemy.y +=  this.enemySpeed;

    let conditionUp = this.enemySpeed < 0 && this.enemy.y <= this.enemyMinY;

    let conditionDown = this.enemySpeed > 0 && this.enemy.y >= this.enemyMaxY;
    
    // check if we haven't passed min Y || max Y add the first param to avoid getting stuck
    if(conditionUp || conditionDown){
        this.enemySpeed *=-1;
    }

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




// next will add moving enemies and keybindings

// possible animation

// working on second level after this first one is done

// Need to work on more assets