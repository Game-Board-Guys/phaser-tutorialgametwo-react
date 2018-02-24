export default function loadState(){
    var preloadBar = null;
    return{
        preload: function () {
           //load images
             preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
            preloadBar.anchor.setTo(0.5, 0.5);
            this.time.advancedtiming = true;
            this.load.setPreloadSprite(preloadBar)

            

            this.load.tilemap('map', 'img/level1.csv');
            this.load.image('tileset', 'img/tileSet.png');
            this.load.spritesheet('player', 'img/player.png', 24, 26);

            this.load.spritesheet('buttons', 'img/button_sprite_sheet.png', 193, 71);

            this.load.image('drag', 'img/drag.png');
            this.load.image('bird', 'img/bird.png');
            this.load.image('nut', 'img/nut.png')
           //load audio
        },
        create: function () {
           this.game.state.start('menu')
        }
    }
}