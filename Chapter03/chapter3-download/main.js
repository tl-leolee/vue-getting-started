new Vue({
    name: 'game',
    el: '#app',

    template: `
    <div id="app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players"/>
        <card :def="testCard" @click.native="handlePlay"/>
    </div>
    `,

    data: state,
    computed: {
        testCard() {
            return cards.archers
        }
    },
    methods: {
        handlePlay() {
            console.log('You played a card!')
        }
    }
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})