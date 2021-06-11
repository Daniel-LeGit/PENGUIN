export class Brick extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, hit_count) {
        super(scene, x, y, texture);
        
        this.setOrigin(0);
        
        scene.add.existing(this);
        //scene.physics.add.existing(this);
        
        this.hit_count = hit_count;
        this.setDisplaySize(128,32);
        
        //this.physics.add.existing(this);
        
        //this.body.allowGravity = false;
        //this.setImmovable(true);            
    }
        
    
    update(time){
        
    }
    
    hit(){
        this.hit_count--;
        
        if(this.hit_count == 0){
            this.scene.decreaseBrickCount();
            this.destroy();
        }
    }
    
}