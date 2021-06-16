import {Player} from './player.js'
import {Ball} from './ball.js'
import {Brick} from './brick.js'
import {Arpoon} from './arpoon.js'
import {Helth} from './helth.js'
import {Points} from './points.js'

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
        // array with player's lives and score
        this.lives = [3, 3];
        this.score = [0, 0];

        //this.ballhit = 0;
        this.ballsize = 128;

        this.scoreText=
        this.add.text( 30, 30,'SCORE',{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P1scoreText=
        this.add.text( 30, 60,`P1: ${this.score[0]}`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P2scoreText=
        this.add.text( 30, 90,`P2: ${this.score[1]}`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.livesText=
        this.add.text( this.game.config.width-180, 30,'LIVES',{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P1livesText=
        this.add.text( this.game.config.width-180, 60,`P1: ${this.lives[0]} lives left`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.P2livesText=
        this.add.text( this.game.config.width-180, 90,`P2: ${this.lives[1]} lives left`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);

        this.bricks = this.physics.add.staticGroup();

        this.levelText=
        this.add.text( this.game.config.width/2 - 50, 30,`LEVEL ${this.level}`,{
            fontFamily: 'Arial', 
            fontSize: 24,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);        

        this.balls = this.physics.add.group({allowGravity:false});  
        
        this.catchablesHelth = this.physics.add.group();
        this.catchablesPoints = this.physics.add.group();
        
        // call function to create the players and their harpoons
        this.createPlayers(this.NrPlayers);

        this.createAudioSources();
        this.backSound.play();

        this.input.keyboard.on('keydown', e => {
            this.keydown(e);
        })

        this.infoText=
        this.add.text(this.game.config.width/2 - 230, this.game.config.height/2 - 100,'PRESS (1) OR (2) PLAYER(S)',{
            fontFamily: 'Arial', 
            fontSize: 36,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);   
        this.infoText2=
        this.add.text(this.game.config.width/2 - 200, this.game.config.height/2 - 50,'PLAYER 1 KEYS: Q, W, Z',{
            fontFamily: 'Arial', 
            fontSize: 36,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);   
        this.infoText3=
        this.add.text(this.game.config.width/2 - 200, this.game.config.height/2,'PLAYER 2 KEYS: O, P, M',{
            fontFamily: 'Arial', 
            fontSize: 36,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);   
        this.infoText4=
        this.add.text(this.game.config.width/2 - 300, this.game.config.height/2 + 50,'PRESS (SPACE) TO START PLAYING',{
            fontFamily: 'Arial', 
            fontSize: 36,
            color: 'yellow', 
            align: 'center'
        }).setOrigin(0,0);   



    }


    keydown(event){
        //console.log(event.keyCode);
        

        switch(event.keyCode)
        {
            // 1 Player : Key 1
            case 49: if (this.gameStarted==0) {
                         this.NrPlayers = 1;
                         this.createPlayers(this.NrPlayers);
                     } 
                     break;

            // 2 Players : Key 2
            case 50: if (this.gameStarted==0) {
                         this.NrPlayers = 2; 
                         this.createPlayers(this.NrPlayers); 
                     }
                     break;

                
            // Player 1 Left: Key Q
            case 81: if (this.gameStarted==1 && this.lives[0]>0){
                        this.player1.setVelocityX(-this.playerVelocity); 
                     } 
                     break;
            // Player 1 Right: Key W
            case 87: if (this.gameStarted==1 && this.lives[0]>0) {
                        this.player1.setVelocityX(this.playerVelocity); 
                     }
                     break;
            // Player 1 Arpoon: Key Z
            case 90: if (this.gameStarted==1 && this.lives[0]>0 && this.player1.arpoon_launched == false) {
                        this.arpoon1.visible = true;
                        this.player1.arpoon_launched = true;
                        this.arpoonFired.play();
                        this.arpoon1.lunch(this.player1.x + this.player1.body.width/2 - 30, this.player1.y - 30); 
                     }
                     break;

                
            // Player 2 Left: Key O
            case 79: if (this.gameStarted==1 && this.lives[1]>0) {
                        this.player2.setVelocityX(-this.playerVelocity); 
                     }
                     break;
            // Player 2 Right: Key P
            case 80: if (this.gameStarted==1 && this.lives[1]>0) {
                         this.player2.setVelocityX(this.playerVelocity);    
                     }
                     break;
            // Player 2 Arpoon: Key M
            case 77: if (this.gameStarted==1 && this.lives[1]>0 && this.player2.arpoon_launched == false) {
                         this.arpoon2.visible = true;
                         this.player2.arpoon_launched = true;
                         this.arpoonFired.play();
                         this.arpoon2.lunch(this.player2.x + this.player2.body.width/2 - 30, this.player2.y - 30); 
                     }
                     break;

                
            // Start Game: key Space Bar
            case 32: if (this.gameStarted==0) {
                         this.startGame();
                     }
                     break;

                
            // Escape Game: key ESC
            case 27: if (this.gameStarted==1) {
                        this.lives=[0, 0]; 
                        this.updateHUD(); 
                     }
                     break;
        }
    }


    createPlayers(players){
        
        // create player1 and arpoon1 if it doesn't exist
        if(this.player1 == undefined){
            this.player1 = new Player(
                this,
                this.game.config.width / 4,
                this.game.config.height - 64,
                'player1'        
            )
            this.player1.setDisplaySize(96, 96);
            this.player1.setPlayer(1);

            if(this.arpoon1 == undefined) {
                this.arpoon1 = new Arpoon(
                    this,
                    this.player1.x + this.player1.body.width/2 - 30,
                    this.player1.y - 30,
                    'arpoon'
                )
                this.arpoon1.setDisplaySize(32, 32);
                this.arpoon1.setPlayer(1);
            }
            this.arpoon1.visible = false;
        }

        
        // create player2 and arpoon2 if it doesn't exist
        if (this.player2 != undefined){
            this.player2.destroy();
            this.arpoon2.destroy();
        }
        
        if (players == 2){
            this.player2 = new Player(
                this,
                this.game.config.width * 3/ 4,
                this.game.config.height - 64,
                'player2'        
            )
            this.player2.setDisplaySize(96, 96);
            this.player2.setPlayer(2);

            this.arpoon2 = new Arpoon(
                this,
                this.player2.x + this.player2.body.width/2 - 30,
                this.player2.y - 30,
                'arpoon'
            )
            this.arpoon2.setDisplaySize(32, 32);
            this.arpoon2.setPlayer(2);
            this.arpoon2.visible = false;
        }
        

        this.NrPlayers = players;
        this.updateHUD();
    }

    repositionHarpoon(player){
        
        if (player==1){
            this.arpoon1.visible = false;
            this.arpoon1.x = this.player1.x + this.player1.body.width/2 - 30;
            this.arpoon1.y = this.player1.y - 30;
            this.player1.arpoon_launched = false;
        }

        if (player==2){
            this.arpoon2.visible = false;
            this.arpoon2.x = this.player2.x + this.player2.body.width/2 - 30;
            this.arpoon2.y = this.player2.y - 30;
            this.player2.arpoon_launched = false;
        }
    }



    createAudioSources(){
        this.backSound = this.sound.add('BK', { volume:0.2, loop:true });
        this.bollHitPlayer1 = this.sound.add('BallPlayerHit1', { loop:false });
        this.bollHitPlayer2 = this.sound.add('BallPlayerHit2', { loop:false });
        this.bollHitPlayer3 = this.sound.add('BallPlayerHit3', { loop:false });
        this.bollHitPlayer4 = this.sound.add('BallPlayerHit4', { loop:false });
        this.bollHitPlayer5 = this.sound.add('BallPlayerHit5', { loop:false });
        this.bollHitBrick = this.sound.add('BallBrickHit', { loop:false });
        this.arpoonFired = this.sound.add('ArpoonShot', { loop:false });
        this.arpoonHitBoll = this.sound.add('ArpoonHitBall', { loop:false });
        this.catchPoints = this.sound.add('CatchPoints', { loop:false });
        this.catchLives = this.sound.add('CatchLife', { loop:false });
    }
    
    update(time){

        //if (this.ball[0].y<0) {
        //    this.player1.ball_launched = false;
        //}

        if (this.lives[0] > 0 && this.player1 != undefined) {
            this.player1.update(time);
            if (this.player1.arpoon_launched) {
                this.arpoon1.update(time);
            }
        }
        if (this.NrPlayers > 1 && this.lives[1] > 0 && this.player2 != undefined) {
            this.player2.update(time);
            if (this.player2.arpoon_launched) {
                this.arpoon2.update(time);
            }            
        }
        
    }
    

    startGame(){
        this.infoText.visible = false;
        this.infoText2.visible = false;
        this.infoText3.visible = false;
        this.infoText4.visible = false;
        this.score = [0, 0];
        this.lives[0] = 3;
        this.lives[1] = 0;
        this.level = 1;
        
        this.start_level(this.level);
        
        this.physics.add.collider(this.balls, this.bricks, this.onCollisionBallBrick, null, this);

        this.physics.add.collider(this.player1, this.balls, this.onCollisionBallPlayer, null, this);
        this.physics.add.collider(this.arpoon1, this.balls, this.onCollisionBallArpoon, null, this);
        this.physics.add.collider(this.player1, this.catchablesHelth, this.onCollisionPlayerHelth, null, this);
        this.physics.add.collider(this.player1, this.catchablesPoints, this.onCollisionPlayerPoints, null, this);

        if (this.NrPlayers > 1) {
            this.lives[1] = 3;
            this.physics.add.collider(this.player2, this.balls, this.onCollisionBallPlayer, null, this);
            this.physics.add.collider(this.arpoon2, this.balls, this.onCollisionBallArpoon, null, this);
            this.physics.add.collider(this.player2, this.catchablesHelth, this.onCollisionPlayerHelth, null, this);
            this.physics.add.collider(this.player2, this.catchablesPoints, this.onCollisionPlayerPoints, null, this);
        }

        //this.ballhit = 0;
        this.balls.getChildren().forEach(b=>b.lunch());
        this.gameStarted = 1;
        this.updateHUD();
    }
    


    start_level(level){

        if (level == 1) {
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

        let ball = new Ball(
            this,
            this.ballsize + Phaser.Math.Between(0, this.game.config.width - this.ballsize * 2),
            128,
            'ball'      
        )
        ball.setDisplaySize(this.ballsize, this.ballsize);
        this.balls.add(ball);        
        this.balls.getChildren().forEach(b=>b.lunch());

        this.ballsToCatch = 7;
    }
    
    createMap(level){
        let hit_count = 0;
        let brick = undefined;

        for(let i = 0; i<this.bricks.length; i++){
            this.bricks.remove(i);
        }

        //level=4;

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

    
    onCollisionBallPlayer(player, ball){

        this.playOuch();
        //console.log(1);
        if (player.playerNumber == 1) {
            this.lives[0] = this.lives[0] - 1;
        }
    
        if (player.playerNumber == 2) {
            this.lives[1] = this.lives[1] - 1;
        }
    
        this.updateHUD();
    
    }

    playOuch() {
        let whichSound = Phaser.Math.Between(1, 5);

        if (whichSound == 1) {
            this.bollHitPlayer1.play();
        }

        if (whichSound == 2) {
            this.bollHitPlayer2.play();
        }

        if (whichSound == 3) {
            this.bollHitPlayer3.play();
        }

        if (whichSound == 4) {
            this.bollHitPlayer4.play();
        }

        if (whichSound == 5) {
            this.bollHitPlayer5.play();
        
        }
    
    
    }

    onCollisionBallArpoon(arpoon, ball) {
        
        // test if any player fired the arpoon
        if ((arpoon.playerNumber == 1 && this.player1.arpoon_launched) || (arpoon.playerNumber == 2 && this.player2.arpoon_launched) ){

            this.arpoonHitBoll.play();
            this.repositionHarpoon(arpoon.playerNumber);
            
            if (arpoon.playerNumber==1) {
                this.score[0] = this.score[0] + 100;
            }
            if (arpoon.playerNumber==2) {
                this.score[1] = this.score[1] + 100;
            }
    
            // save the current ball's position and size
            let bx = ball.x;
            let by = ball.y;
            let bw = ball.displayWidth;
            let bh = ball.displayHeight;
            
            ball.destroy();
            this.ballsToCatch = this.ballsToCatch - 1;
    
            // if not divided 3 times yet, create 2 new balls with half the size
            if (bw > this.ballsize / 3) {
                bw = bw / 2;
                bh = bh / 2;
                //console.log(bw, bh);
                let ball1 = new Ball(
                    this,
                    bx,
                    by,
                    'ball'      
                )
                ball1.setDisplaySize(bw, bh); 
                this.balls.add(ball1);
        
                let ball2 = new Ball(
                    this,
                    bx,
                    by,
                    'ball'      
                )
                ball2.setDisplaySize(bw, bh);  
                this.balls.add(ball2);
        
                this.balls.getChildren().forEach(b=>b.lunch());    
            }
    
            this.updateHUD();
        }


    }
   
   
    onCollisionPlayerHelth(player, life){
        life.destroy();

        this.catchLives.play();
        //console.log(1);
        if (player.playerNumber == 1) {
            this.lives[0] = this.lives[0] + 1;
        }
    
        if (player.playerNumber == 2) {
            this.lives[1] = this.lives[1] + 1;
        }
    
        this.updateHUD();
    
    }


    onCollisionPlayerPoints(player, points){
        points.destroy();

        this.catchPoints.play();
        //console.log(1);
        if (player.playerNumber == 1) {
            this.score[0] = this.score[0] + 500;
        }
    
        if (player.playerNumber == 2) {
            this.score[1] = this.score[1] + 500;
        }
    
        this.updateHUD();
    
    }

    
    updateHUD(){
        
        // destroy players with no lives
        if (this.lives[0]<=0){
            this.arpoon1.destroy();
            this.player1.destroy();
        }
        if (this.NrPlayers>1 && this.lives[1]<=0){
            this.arpoon2.destroy();
            this.player2.destroy();      
        }

        if (this.ballsToCatch <=0 ) {
            
            // if not finished on 4th level, continue to the next level
            if (this.level < 4) {
                this.balls.getChildren().forEach(b=>b.destroy());
                this.level = this.level + 1;
                this.start_level (this.level);
            } else {
                
                // YOU FINISHED THE GAME!
                if (this.lives[0]>0){
                    this.arpoon1.destroy();
                    this.player1.destroy();
                }
                if (this.NrPlayers>1 && this.lives[1]>0){
                    this.arpoon2.destroy();
                    this.player2.destroy();      
                }
                this.gameStarted = 0;
                this.balls.getChildren().forEach(b=>b.destroy());
                this.ItsOverText=
                this.add.text(this.game.config.width/2 - 260, this.game.config.height/2, 'GAME FINISHED',{
                    fontFamily: 'Arial', 
                    fontSize: 64,
                    color: 'yellow', 
                    align: 'center'
                }).setOrigin(0,0);                
            }
        }

        if (this.NrPlayers>1) {
            this.P2scoreText.visible = true;
            this.P2livesText.visible = true;
            this.P2scoreText.text = `P2: ${this.score[1]}`;
            this.P2livesText.text = `P2: ${this.lives[1]} lives left`;
        } else {
            this.P2scoreText.visible = false;
            this.P2livesText.visible = false;
        }
        this.P1scoreText.text = `P1: ${this.score[0]}`;
        this.P1livesText.text = `P1: ${this.lives[0]} lives left`;
        this.levelText.text = `LEVEL ${this.level}`;
        
        // if both players lost all lives, TOUGH LUCK!!!! DEAD!!!!!!
        if (this.lives[0]<=0 && this.lives[1]<=0){
            this.gameStarted = 0;
            this.balls.getChildren().forEach(b=>b.destroy());
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
        this.bollHitBrick.play();     
        
        if (brick.hit_count==1) {
            let bx=brick.x;
            let by=brick.y;

            // drop a life or points on a destroyed brick
            
            let rolete = Phaser.Math.Between(1, 3);

            if (rolete==1){
                let life = new Helth(
                    this,
                    bx,
                    by,
                    'life'      
                )
                life.setDisplaySize(32, 32);  
                this.catchablesHelth.add(life);
            }

            if (rolete>=2){
                let points = new Points(
                    this,
                    bx,
                    by,
                    'points'      
                )
                points.setDisplaySize(32, 32);  
                this.catchablesPoints.add(points);
            }


        }

        brick.hit();
     

    }

    
}