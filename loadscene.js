export default class LoadScene extends Phaser.Scene {
    
    constructor() {
        
        super('LoadScene');
        
    }
    
    create(){
        
        this.scene.start('MainScene');
        this.input.mouse.disableContextMenu();
    }
    
    preload(){
        
        this.load.image('ball', './images/Peng_Boll.png');
        this.load.image('brick', './images/Peng_bricks.png');
        this.load.image('player1', './images/Peng_P1.png');
        this.load.image('player2', './images/Peng_P2.png');
        this.load.image('bkground','./images/background.png');
        this.load.image('arpoon','./images/Peng_BoneArpoon.png');

        // background, ball hits player, ball hits brick, arpoon fired, arpoon hits ball, catch points, catch life
        this.load.audio('BK','./sounds/BK.mp3');

    }
    
}