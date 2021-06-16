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
        this.load.image('life','./images/Peng_Helth.png');
        this.load.image('points','./images/Peng_Point.png');

        // background, ball hits player, ball hits brick, arpoon fired, arpoon hits ball, catch points, catch life
        this.load.audio('BK','./sounds/BK.mp3');
        this.load.audio('BallPlayerHit1','./sounds/PlayerVoice1.mp3');
        this.load.audio('BallPlayerHit2','./sounds/PlayerVoice3.mp3');
        this.load.audio('BallPlayerHit3','./sounds/PlayerVoice4.mp3');
        this.load.audio('BallPlayerHit4','./sounds/PlayerVoice5.mp3');
        this.load.audio('BallPlayerHit5','./sounds/PlayerVoice6.mp3');
        this.load.audio('BallBrickHit','./sounds/hittingorjumpingball.mp3');
        this.load.audio('ArpoonShot','./sounds/Arpoon.mp3');
        this.load.audio('ArpoonHitBall','./sounds/hittingorjumpingball.mp3');
        this.load.audio('CatchPoints','./sounds/gotpoint.mp3');
        this.load.audio('CatchLife','./sounds/gotaliving.mp3');

    }
    
}