export default function bootState(){
    return{
        preload: function () {
            //load images for loading and stuff
        },
        create: function () {
            this.game.scale.scaleMode = window.Phaser.ScaleManager.NO_SCALE;
            this.game.scale.pageAlignHorizontally = true; this.game.scale.pageAlignVertically = true;
            this.game.state.start('load');
        }
    }
}