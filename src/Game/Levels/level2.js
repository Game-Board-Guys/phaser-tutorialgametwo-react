export default function level2State() {
    var map;
    var layer;

    var player;
    var controls = {};
    var playerSpeed = 150;
    var jumpTimer = 0;

    var button;

    var score;
    var scoreText;
    return {
        init: function (data) {
            score = (data.score || 0)
        },
        create: function () {
            this.stage.backgroundColor = '#fff';
            this.physics.arcade.gravity.y = 1400;

            /* below is map stuff */
            map = this.game.add.tilemap('map', 64, 64);
            map.addTilesetImage('tileset');
            layer = map.createLayer(0);
            layer.resizeWorld();
            map.setCollisionBetween(0, 4);
            map.setTileIndexCallback(5, this.resetPlayer, this)
            map.setTileIndexCallback(1, this.nextLevel, this)
            /* below is player */
            player = this.add.sprite(100, 1160, 'player')
            player.anchor.setTo(0.5, 0.5);

            player.animations.add('idle', [0, 1], 1, true);
            player.animations.add('jump', [2], 1, true);
            player.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);
            this.game.physics.arcade.enable(player);
            this.game.camera.follow(player);
            player.body.collideWorldBounds = true;

            controls = {
                right: this.input.keyboard.addKey(window.Phaser.Keyboard.D),
                left: this.input.keyboard.addKey(window.Phaser.Keyboard.A),
                up: this.input.keyboard.addKey(window.Phaser.Keyboard.W),
            };

            button = this.add.button(this.world.centerX - 95, this.world.centerY - 200, 'buttons', function () {
                console.log('pressed');
            }, this, 2, 1, 0);
            button.fixedToCamera = true;


            scoreText = this.game.add.text(20, 20, 'Score: 0', {
                font: '32px Arial', fill: '#000'
            })
            scoreText.fixedToCamera = true;

        },
        update: function () {
            this.game.physics.arcade.collide(player, layer);
            scoreText.text = 'Score: ' + score;
            player.body.velocity.x = 0;
            if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
                player.body.velocity.y = -600;
                jumpTimer = this.time.now + 750;
                player.animations.play('jump')
            } else if (controls.right.isDown) {
                player.animations.play('run');
                player.scale.setTo(1, 1);
                player.body.velocity.x += playerSpeed;
            } else if (controls.left.isDown) {
                player.animations.play('run');
                player.scale.setTo(-1, 1);
                player.body.velocity.x -= playerSpeed;
            }
            if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
                player.animations.play('idle');
            }

        },
        resetPlayer: function () {
            player.reset(100, 1160);
        },
        nextLevel: function () {
            this.game.state.start('level2', true, false, { score: score })
        }
    }
}