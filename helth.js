export class Helth extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = true;
        this.setCollideWorldBounds(true);
        
        this.setImmovable(true);        
    }

    create(){

    }
    
    update(time){
 
    }
 
}