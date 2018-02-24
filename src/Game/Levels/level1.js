export default function level1State() {
    var map;
    var layer;

    var player;
    var controls = {};
    var playerSpeed = 150;
    var jumpTimer = 0;

    var button;
    var score = 0;
    var scoreText;

    var drag;
    var enemy1;

    var shootTime = 0;
    var nuts;
    var respawn;
    return {
        create: function () {
            this.stage.backgroundColor = '#fff';
            this.physics.arcade.gravity.y = 1300;

            respawn = this.game.add.group();

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
                shoot: this.input.keyboard.addKey(window.Phaser.Keyboard.SPACEBAR),
            };

            button = this.add.button(this.world.centerX - 95, this.world.centerY - 200, 'buttons', function () {
                console.log('pressed');
            }, this, 2, 1, 0);
            button.fixedToCamera = true;

            scoreText = this.game.add.text(20, 20, 'Score: 0', {
                font: '32px Arial', fill: '#000'
            })
            scoreText.fixedToCamera = true;

            drag = this.add.sprite(player.x, player.y, 'drag');
            drag.anchor.setTo(0.5, 0.5);
            drag.inputEnabled = true;
            drag.input.enableDrag(true);

            enemy1 = new this.EnemyBird(0, this.game, player.x + 400, player.y - 200);


            nuts = this.game.add.group();
            nuts.enableBody = true;
            nuts.physicsBodyType = window.Phaser.Physics.ARCADE;
            nuts.createMultiple(5, 'nut');
            nuts.setAll('anchor.x', 0.5);
            nuts.setAll('anchor.y', 0.5);
            nuts.setAll('scale.x', 0.5);
            nuts.setAll('scale.y', 0.5);
            nuts.setAll('outOfBoundsKill', true)
            nuts.setAll('checkWorldBounds', true)

        },
        update: function () {
            this.game.physics.arcade.collide(player, layer);
            this.game.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);

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
            if (this.checkOverlap(nuts, enemy1.bird)) {
                enemy1.bird.kill();
            }
            if (controls.shoot.isDown) {
                this.shootNut();
            }

        },
        resetPlayer: function () {
            player.reset(100, 1160);
        },
        nextLevel: function () {
            this.game.state.start('level2', true, false, { score: score })
        },
        updateScore: function () {

            map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
            score += 10;
        },
        EnemyBird: function (index, game, x, y) {
            this.bird = game.add.sprite(x, y, 'bird');
            this.bird.anchor.setTo(0.5, 0.5);
            this.bird.name = index.toString();
            game.physics.enable(this.bird, window.Phaser.Physics.ARCADE);
            this.bird.body.immovable = true;
            this.bird.body.collideWorldBounds = true;
            this.bird.body.allowGravity = false;

            this.birdTween = game.add.tween(this.bird).to({
                y: this.bird.y + 100
            }, 2000, 'Linear', true, 0, 100, true);
        },
        checkOverlap: function (spriteA, spriteB) {
            var boundsA = spriteA.getBounds();
            var boundsB = spriteB.getBounds();

            return window.Phaser.Rectangle.intersects(boundsA, boundsB)
        },
        shootNut: function () {
            if (this.time.now > shootTime) {
                var nut = nuts.getFirstExists(false);
                if (nut) {
                    nut.reset(player.x, player.y);

                    nut.body.velocity.y = -600;
                    shootTime = this.time.now + 900;
                }
            }
        }
    }
}