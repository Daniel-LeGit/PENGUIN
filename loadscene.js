export default class LoadScene extends Phaser.Scene {
    
    constructor() {
        
        super('LoadScene');
        
    }
    
    create(){
        
        this.scene.start('MainScene');
        this.input.mouse.disableContextMenu();
    }
    
    preload(){
        
        this.load.image('ball', './images/ballBlue.png');
        this.load.image('el_B', './images/blue.png');
        this.load.image('el_G', './images/green.png');
        this.load.image('el_P', './images/purple.png');
        this.load.image('el_R', './images/red.png');
        this.load.image('el_Y', './images/yellow.png');
        this.load.image('paddle', './images/player.gif');
        this.load.image('bkground','./images/background.gif')
    }
    
}