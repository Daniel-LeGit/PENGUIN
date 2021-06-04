import {Paddle} from './paddle.js'
import {Ball} from './ball.js'
import {Brick} from './brick.js'

export class MainScene extends Phaser.Scene {
    
    constructor() {
        
        super('MainScene');
        
    }

    init(){
        
        this.bored = {
            width: 8,
            height: 3,
            tile_size: {
                width: 64,
                height: 32,             
            },
            head_space:8
        }
        
        //this.bricks_count = 0;
        
    }

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
        

        this.bgimage = this.add.sprite(this.game.config.width * 0.5, this.game.config.height * 0.5, 'bkground');
        this.bgimage.setDisplaySize(this.game.config.width, this.game.config.height);
          
        this.level = 1;
        this.lives = 3;

        this.bricks = this.physics.add.staticGroup();
        
        this.createMap(2);
        
        this.paddle = new Paddle(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 64,
            'paddle'        
        )
        this.paddle.setDisplaySize(64, 96);
        
        this.ball = new Ball(
            this,
            128 + Phaser.Math.Between(0, this.game.config.width - 256),
            128,
            'ball'      
        )
        this.ball.setDisplaySize(128, 128);

       
        //this.paddle.setBall(this.ball);

        this.score = 0;

        this.scoreText=
        this.add.text( 30, 30,`Score: ${this.score}`,{
            
            fontFamily: 'Arial', 
            fontSize: 24,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0,0);

        this.livesText=
        this.add.text( this.game.config.width-140, 30,`${this.lives} lives left`,{
            
            fontFamily: 'Arial', 
            fontSize: 24,
            color: '#fff', 
            align: 'center'
            
        }).setOrigin(0,0);
        

    }
    
    update(time){
        
        if (this.ball.y>this.paddle.y) {
            this.paddle.ball_launched = false;
            

        }

        this.paddle.update(time);
        
    }
    
    lunchables(){
        
        this.ball.lunch();
        this.physics.add.collider(this.paddle, this.ball, this.onCollisionBallPaddle, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.onCollisionBallBrick, null, this);
        
    }
    
    start_level(level){
        if (level == 1) {
            this.lives = 3;
            this.score = 0;
            this.createMap(2);
        }
        if (level == 2) {
            this.createMap(6);
        }
        if (level == 3) {
            this.createMap(10);
        }
        if (level == 4) {
            this.createMap(10);
        }
    }
    
    createMap(nrBricks){
        
        let start_y = this.bored.tile_size.height * this.bored.head_space;
        let start_x = (this.game.config.width*0.5) - (this.bored.width * this.bored.tile_size.width)* 0.5;
        
        let textures =  ['el_Y', 'el_R', 'el_G', 'el_B', 'el_P'];
        let bricks_count = 0;
        
        while (bricks_count < nrBricks){
            for(let w = 0; w < this.bored.width && bricks_count < nrBricks; ++w){
                for(let h = 0; h < this.bored.height  && bricks_count < nrBricks; ++h){
                    if (Phaser.Math.Between(1, 5)==1){
                        let hit_count = Phaser.Math.Between(1, 5);
                    
                        let brick = new Brick (this, start_x + w * this.bored.tile_size.width, start_y + h * this.bored.tile_size.height, textures[hit_count-1], hit_count);
                        this.bricks.add(brick);
                        bricks_count = bricks_count + 1;    

                    }
                }
            }
    
        }
        
    }
    
    onCollisionBallPaddle(){       

        this.lives = this.lives - 1;
        this.livesText.text = `${this.lives} lives left`;

        if (this.lives<=0){
            this.ball.disableBody(true, true);
            this.paddle.disableBody(true, true);
            this.scoreText.text = `GAME OVER - Final Score: ${this.score}`;
        }
    }
    
    onCollisionBallBrick(ball, brick){       
        brick.hit();
    }
    
    decreaseBrickCount(){
        
        //brick.hit();
        this.score = this.score + 100;
        this.scoreText.text = `Score: ${this.score}`; 

        //this.bricks_count--;
        //if(this.bricks_count <= 0){
            
            //this.scene.restart();
        //    this.paddle.ball_launched = false;
        //    this.createMap();
            
        //}
    }
    
}