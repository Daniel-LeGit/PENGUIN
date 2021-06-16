export class Player extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.playerNumber = 0;
        
        this.body.allowGravity = false;
        this.setCollideWorldBounds(true);

        this.setImmovable(true);
        
        //this.ball = undefined;
        this.arpoon_launched = false;
        
        this.velocity = 300;
    }


    setPlayer(player){
        this.playerNumber = player;
    }
    
    update(time){
        

    }
    
    
}