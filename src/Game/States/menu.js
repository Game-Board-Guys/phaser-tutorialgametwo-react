export default function menuState() {

    return {
        create: function () {
            var btn1 = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'buttons', this.playGame)
        },
        update: function () {

        },
        playGame: function () {
            this.game.state.start('level1')
        }
    }
}