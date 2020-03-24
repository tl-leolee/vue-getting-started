new Vue({
    name: 'game',
    el: '#app',

    template: `
    <div id="app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
        <card :def="testCard" @play="handlePlay" />
        <transition name="hand">
            <hand :cards="testHand" v-if="!activeOverlay" @card-play="testPlayCard"/>
        </transition>
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
        },
        createTestHand() {
            const cards = []

            for (let i = 0; i < 5 ; i++) {
                cards.push(this.testDrawCard())
            }
            return cards;
        },
        testDrawCard() {
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]
            return {
                uid: cardUid++,
                id: randomId,
                def: cards[randomId]
            }
        },
        testPlayCard(card) {
            const idx = this.testHand.indexOf(card)
            this.testHand.splice(idx, 1);
        }
    },
    created() {
        this.testHand = this.createTestHand()
    }
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})