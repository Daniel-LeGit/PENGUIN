export class Ball extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);

        this.launched = false;

        this.allowGravity = false;
        this.immovable = true;
        //this.setVelocity (0,0);
        
        this.initial_velocity = {
            
            min: {
                
                x: -250,
                y: -500  
                
            },
            max: {
                
                x: 250,
                y: -800
            }
            
        }
        
    }
    
    update(time){
     
        
    }
    
    lunch(){
        
        if (!this.launched){
            this.scene.physics.add.existing(this);
            this.setCollideWorldBounds(true);
            this.setBounce(1,1);
            
            this.setVelocity(
            
                Phaser.Math.Between(
            
                    this.initial_velocity.min.x,
                    this.initial_velocity.max.x
            
                ),
            
                Phaser.Math.Between(
            
                    this.initial_velocity.min.y,
                    this.initial_velocity.max.y
            
                )
            
            );
     
            this.launched = true;
        }

       
    }

    
}