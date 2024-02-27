// Create a new scene

let gameScene = new Phaser.Scene('Game');


// initiate scene parameters
gameScene.init = function() {

    // player speed
    this.playerSpeed = 3;

    // enemy speed
    // this.enemySpeed = 1.2;
    this.enemyMinSpeed = .9;
    this.enemyMaxSpeed = 1.8;


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


    // Create a player sprite.-------------------------------
    // let player = this.add.sprite(70, 180, 'player');
    this.player = this.add.sprite(70, this.sys.game.config.height/2, 'player');


    // Multiply the size of the player sprite by 2 can also be setScale(2) as a shorthand 
    // player.setScale(2, 2);
    this.player.setScale(1.5, 1.5);



    // Create treasure sprite----------------------------------------------
    this.goal = this.add.sprite(this.sys.game.config.width-80, this.sys.game.config.height / 2, 'goal')
    // set scale of treasure
    this.goal.setScale(0.6);

    
    // Create Enemy Sprite------------------------
    
    // Group of enemy sprites can create multiple at once
    this.enemies = this.add.group({
        key: 'drake',
        repeat: 4,
        setXY: {
            // set initial positions
            x: 134,
            y: 100,
            // set the space between each
            stepX: 85,
            stepY: 20
        }
    });
    // this.enemy = this.add.sprite(200, this.sys.game.config.height / 2, 'drake' )
    
    
    // // easy way to add enemy sprite to this.enemies group
    // this.enemies.add(this.enemy);

    // A way to set the scale of all of a group of enemies
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4)


    // set speed of all sprites in group through essentially a for loop

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        // if I wanted to flip
        // enemy.flipX = true;
        
           // 50/50 chance depending on number will be up or down
    let dir = Math.random() < 0.5 ? 1 : -1;
        // set the speed
        let speed= this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed

    }, this)

    // gets an array of all the sprite elemtns
    // console.log(this.enemies.getChildren())

    /* flip the sprite across x
    player.flipX = true;
     flip the sprite across y
     player.flipY = true;
     console.log(player) */


    // Set enemy speed
    // 50/50 chance depending on number will be up or down
    // let dir = Math.random() < 0.5 ? 1 : -1;

    // speed calculation                                
    // let speed= this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    // this.enemy.speed = dir * speed
    // console.log(this.player)

    // console.log(this)
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
        // this.scene.manager.bootScene(this);
        return;
    }


    // get enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    // let playerRect = this.player.getBounds();
    for(var i= 0; i < numEnemies; i++){
         // enemy movement
    enemies[i].y +=  enemies[i].speed;

    let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;

    let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
    
    // check if we haven't passed min Y || max Y add the first param to avoid getting stuck
    if(conditionUp || conditionDown){
        enemies[i].speed *=-1;
    }


       // check for collision with the player and the drakes.
      
       let enemyRect = enemies[i].getBounds();
       // console.log(playerRect)
   
       if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect,enemyRect)){
           console.log('Game Over!!')
           this.scene.restart();
           // this.scene.manager.bootScene(this);
           return;
       }
   
    }

    // enemy movement
    // this.enemy.y +=  this.enemy.speed;

    // let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;

    // let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;
    
    // // check if we haven't passed min Y || max Y add the first param to avoid getting stuck
    // if(conditionUp || conditionDown){
    //     this.enemy.speed *=-1;
    // }

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