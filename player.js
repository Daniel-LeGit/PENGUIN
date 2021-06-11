export class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        this.setImmovable(true);
        
        //this.ball = undefined;
        this.ball_launched = false;

        this.arpoon_launched = false;
        
        this.velocity = 250;
        this.controls = scene.input.keyboard.createCursorKeys();
        
        
    }

    
    update(time){
        
        if(this.controls.left.isDown){
            
            this.setVelocityX(-this.velocity);
            
        }
        else if(this.controls.right.isDown){
            
            this.setVelocityX(this.velocity);
            
        }
        else{
            
            //this.setVelocityX(0);
            
        }
        
        //if(this.ball && !this.ball_launched){
            
        //    this.ball.setPosition(this.x, this.y - this.displayHeight);
            
        //}
        
        if(!this.ball_launched && this.controls.space.isDown){
            
            this.scene.gameStarted = 1;
            this.ball_launched = true;
            this.scene.lunchables();
            
        }

        //if(!this.arpoon_launched && this.controls.space.isDown){
            
            //this.arpoon_launched = true;
            //this.scene.arpoonlunch();
            
        //}
        

    }
    
    setBall(ball){
        
        this.ball = ball;
        
    }
    
}