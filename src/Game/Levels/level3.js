export default function level1State() {
    return {
        create: function () {
            var textStuff = this.game.add.text(0, 0, 'Hello World', {font: '22px Arial', fill: '#fff'})
        },
        update: function () {

        }
    }
}