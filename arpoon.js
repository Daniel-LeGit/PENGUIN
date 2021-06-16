export class Arpoon extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.playerNumber = 0;
        
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);
        
        this.setImmovable(true);        
    }
    
    update(time){
        //console.log(this.y);
        if (this.y<=32) {
            this.scene.repositionHarpoon(this.playerNumber);            
        }
    }

    setPlayer(player){
        this.playerNumber = player;
    }
    
    lunch(x, y){
        this.x = x;
        this.y = y;
        this.setVelocity(0, -600);
    }
 
}
