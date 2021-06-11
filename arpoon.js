export class Arpoon extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        
    }
    
    update(time){
        console.log(this.y);
        if (this.y<=200) {
            this.destroy();
            
        }
    }


    lunch(x, y){
        
        this.scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        //this.setBounce(1,1);
        this.x = x;
        this.y = y;
        this.setVelocity(0, -600);
        
    }
 
}
