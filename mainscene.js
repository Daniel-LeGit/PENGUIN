import {Player} from './player.js'
import {Ball} from './ball.js'
import {Brick} from './brick.js'
import {Arpoon} from './arpoon.js'

export class MainScene extends Phaser.Scene {
    
    constructor() {
        super('MainScene');
    }

    init(){}

    preload(){}
    
    create(){

        /*
        let paddle_s = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height - 20,
            'paddle'
        )
        
        this.paddle = this.physics.add.existing(paddle_s);
        this.paddle.body.allowGravity = false;
        */
        
        this.gameStarted = 0;

        let bgimage = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, 'bkground');
        bgimage.setDisplaySize(this.game.config.width, this.game.config.height);
          
        this.level = 1;
        this.NrPlayers = 1;
        this.playerVelocity = 300;
        this.lives = [3, 0];
        this.score = [0, 0];

        this.scoreText=
        this.add.text( 30, 30,'SCORE',{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P1scoreText=
        this.add.text( 30, 60,`Player 1: ${this.score[0]}`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P2scoreText=
        this.add.text( 30, 90,`Player 2: ${this.score[1]}`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.livesText=
        this.add.text( this.game.config.width-240, 30,'LIVES',{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P1livesText=
        this.add.text( this.game.config.width-240, 60,`Player 1: ${this.lives[0]} lives left`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P2livesText=
        this.add.text( this.game.config.width-240, 90,`Player 2: ${this.lives[1]} lives left`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.bricks = this.physics.add.staticGroup();
        
        this.start_level(this.level);

        this.ball = [new Ball(
            this,
            128 + Phaser.Math.Between(0, this.game.config.width - 256),
            128,
            'ball'      
        )]
        this.ball[0].setDisplaySize(128, 128);        

        this.createPlayers(this.NrPlayers);
        this.createArpoons(this.NrPlayers);

        //this.paddle.setBall(this.ball);
        
        this.createAudioSources();
        this.backSound.play();

        this.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })

    }


    keydown(event){
        //console.log(event.keyCode);

        switch(event.keyCode)
        {
            // 1 Player : Key 1
            case 49: if (this.gameStarted==0) 
                     this.NrPlayers = 1; 
                     this.createPlayers(this.NrPlayers); 
                     this.createArpoons(this.NrPlayers); 
                     break;

            // 2 Players : Key 2
            case 50: if (this.gameStarted==0) 
                     this.NrPlayers = 2; 
                     this.createPlayers(this.NrPlayers); 
                     this.createArpoons(this.NrPlayers); 
                     break;

            // Player 1 Left: Key Q
            case 81: if (this.gameStarted==1 && this.lives[0]>0) 
                     this.player1.setVelocityX(-this.playerVelocity); 
                     break;
            // Player 1 Right: Key W
            case 87: if (this.gameStarted==1 && this.lives[0]>0) 
                     this.player1.setVelocityX(this.playerVelocity); 
                     break;
            // Player 1 Arpoon: Key Z
            case 90: if (this.gameStarted==1 && this.lives[0]>0) 
                     this.arpoon1.lunch(this.player1.x + this.player1.body.width/2, this.player1.y); 
                     break;

            // Player 2 Left: Key O
            case 79: if (this.gameStarted==1 && this.lives[1]>0) 
                     this.player2.setVelocityX(-this.playerVelocity); 
                     break;
            // Player 2 Right: Key P
            case 80: if (this.gameStarted==1 && this.lives[1]>0) 
                     this.player2.setVelocityX(this.playerVelocity); 
                     break;
            // Player 2 Arpoon: Key M
            case 77: if (this.gameStarted==1 && this.lives[1]>0) 
                     this.arpoon2.lunch(this.player2.x + this.player2.body.width/2, this.player2.y); 
                     break;

            // Escape Game: key ESC
            case 27: if (this.gameStarted==1) 
                     this.lives=[0, 0]; 
                     this.updateHUD(); 
                     break;
        }
    }


    createPlayers(players){
        this.lives[0] = 3;
        this.lives[1] = 0;

        if(this.player1 == undefined){
            this.player1 = new Player(
                this,
                this.game.config.width / 4,
                this.game.config.height - 64,
                'player1'        
            )
            this.player1.setDisplaySize(96, 96);
        }
        this.player1.setBall(this.ball);

        if (players == 1 && this.player2 != undefined){
            this.player2.destroy();
        }
        
        if (players == 2){
            this.lives[1] = 3;
            //console.log(this.player2);
            //if(this.player2 == undefined){
                this.player2 = new Player(
                    this,
                    this.game.config.width * 3/ 4,
                    this.game.config.height - 64,
                    'player2'        
                )
                this.player2.setDisplaySize(96, 96);
            //}
            //this.player2.enableBody();
            this.player2.setBall(this.ball);
        }

        this.updateHUD();

    }


    createArpoons(players){
        if(this.arpoon1 == undefined) {
            this.arpoon1 = new Arpoon(
                this,
                this.player1.x + this.player1.body.width/2,
                this.player1.y,
                'arpoon'      
            )
            this.arpoon1.setDisplaySize(16, 32);
        }

        if(players == 1 & this.arpoon2 != undefined){
            this.arpoon2.destroy();
        }

        if(players == 2){
            if(this.arpoon2 == undefined){
                this.arpoon2 = new Arpoon(
                    this,
                    this.player2.x + this.player2.body.width/2,
                    this.player2.y,
                    'arpoon'      
                )
                this.arpoon2.setDisplaySize(16, 32);
            }
        }
    }


    createAudioSources(){
        this.backSound = this.sound.add('BK', { volume:0.2, loop:true });
        
        //this.bollHitPlayer = this.sound.add('', { loop:false });
        //this.bollHitBrick = this.sound.add('', { loop:false });
        //this.arpoonFired = this.sound.add('', { loop:false });
        //this.arpoonHitBall = this.sound.add('', { loop:false });
        //this.catchPoints = this.sound.add('', { loop:false });
        //this.catchLives = this.sound.add('', { loop:false });
    }
    
    update(time){

        //if (this.ball[0].y<0) {
        //    this.player1.ball_launched = false;
        //}

        if (this.lives[0]>0) {
            this.player1.update(time);
        }
        if (this.NrPlayers>1 && this.lives[1]>0) {
            this.player2.update(time);
        }
        
    }
    

    lunchables(){
        this.gameStarted = 1;
        this.ball[0].lunch();
        
        this.physics.add.collider(this.ball, this.bricks, this.onCollisionBallBrick, null, this);
        this.physics.add.collider(this.player1, this.ball, this.onCollisionBallPlayer1, null, this);
        if (this.NrPlayers > 1) {
            this.physics.add.collider(this.player2, this.ball, this.onCollisionBallPlayer2, null, this);
        }
    }
    


    start_level(level){
        if (level == 1) {
            this.lives = [3, 3];
            this.score = [0, 0];
            this.createMap(level);
        }
        if (level == 2) {
            this.createMap(level);
        }
        if (level == 3) {
            this.createMap(level);
        }
        if (level == 4) {
            this.createMap(level);
        }
    }
    
    createMap(level){
        let hit_count = 0;
        let brick = undefined;

        for(let i = 0; i<this.bricks.length; i++){
            this.bricks.remove(i);
        }

        level=4;

        if (level==1) {
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 128, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 512, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
    	}

        if (level==2) {
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 128, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 320, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 512, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
    	}

        if (level==3) {
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 320, 240, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 128, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 512, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
    	}

        if (level==4) {
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 192, 240, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 384, 240, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 

            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 128, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 320, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
            
            hit_count = Phaser.Math.Between(1, 5);
            brick = new Brick (this, 512, 320, 'brick', hit_count).setOrigin(0,0);
            this.bricks.add(brick); 
    	}
    }
    
    onCollisionBallPlayer1(){
        //this.bollHitPlayer.play();
        //console.log(1);
        this.lives[0] = this.lives[0] - 1;
        this.updateHUD();
    }
   
    onCollisionBallPlayer2(){
        //this.bollHitPlayer.play();
        //console.log(2);
        this.lives[1] = this.lives[1] - 1;
        this.updateHUD();
    }
   
   
    updateHUD(){
        if (this.NrPlayers>1) {
            this.P2scoreText.visible = true;
            this.P2livesText.visible = true;
        } else {
            this.P2scoreText.visible = false;
            this.P2livesText.visible = false;
        }
        this.P1livesText.text = `Player 1: ${this.lives[0]} lives left`;
        this.P2livesText.text = `Player 2: ${this.lives[1]} lives left`;


        if (this.lives[0]<=0){
            this.arpoon1.destroy();
            this.player1.destroy();
        }
        if (this.NrPlayers>1 && this.lives[1]<=0){
            this.arpoon2.destroy();
            this.player2.destroy();
        
        }

        if (this.lives[0]<=0 && this.lives[1]<=0){
            this.ball[0].destroy();
            this.ItsOverText=
            this.add.text(this.game.config.width/2 - 200, this.game.config.height/2, 'GAME OVER',{
                fontFamily: 'Arial', 
                fontSize: 64,
                color: 'yellow', 
                align: 'center'
            }).setOrigin(0,0);
        }
    }
    
    onCollisionBallBrick(ball, brick){
        //this.bollHitBrick.play();       
        brick.hit();
        let posX=this.ball[0].x;
        let posY=this.ball[0].y;
        
        //this.ball.disableBody(true, true);

        //this.ball1 = new Ball(
        //    this,
        //    posX,
        //    posY,
        //    'ball'      
        //)
        //this.ball1.setDisplaySize(this.ball.width/2, this.ball.height/2);        

    }
    
    decreaseBrickCount(){
        
        //brick.hit();
        //this.score = this.score + 100;
        //this.scoreText.text = `Player 1: ${this.score}`; 

        //this.bricks_count--;
        //if(this.bricks_count <= 0){
            
            //this.scene.restart();
        //    this.paddle.ball_launched = false;
        //    this.createMap();
            
        //}
    }
    
}