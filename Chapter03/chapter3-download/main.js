new Vue({
    name: 'game',
    el: '#app',

    template: `
    <div id="app" :class="cssClass">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" :players="players" />
        <div class="world">
            <div class="clouds">
                <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
            </div>
            <castle v-for="(player, index) in players" :player="player" :index="index" />
            <div class="land" />
        </div>
        <transition name="hand">
            <hand :cards="currentHand" v-if="!activeOverlay" @card-play="handlePlay" @card-leave-end="handleCardLeaveEnd"/>
        </transition>
        <transition name="fade">  
            <div class="overlay-background" v-if="activeOverlay" /> 
        </transition> 
        <transition name="zoom">
            <overlay v-if="activeOverlay" :key="activeOverlay" @close="handleOverlayClose">        
                <component 
                    :is="'overlay-content-' + activeOverlay"
                    :player="currentPlayer"
                    :opponent="currentOpponent"
                    :players="players"
                />      
            </overlay> 
        </transition>
    </div>
    `,

    data: state,
    computed: {
        testCard() {
            return cards.archers
        },
        cssClass() {
            return {
                'can-play': this.canPlay
            }
        }
    },
    methods: {
        handlePlay(card) {
            playcard(card)
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
        handleCardLeaveEnd() {
            applyCard()
        },
        handleOverlayClose() {
            overlayCloseHandlers[this.activeOverlay]()
        }
    },
    mounted() {
        beginGame()
    },
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})

requestAnimationFrame(animate);
function animate(time) {        
    requestAnimationFrame(animate);        
    TWEEN.update(time);      
}

function beginGame() {
    state.players.forEach(drawInitialHand)
    state.canPlay = true
}

function playcard(card) {
    console.log(state.canPlay, card)
    if (state.canPlay) {
        state.canPlay = false
        currentPlayingCard = card

        const idx = state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(idx, 1)

        addCardToPile(state.discardPile, card.id)
    }
}

function applyCard() {
    const card = currentPlayingCard
    applyCardEffect(card)
    // Wait a bit for the player to see what's going on      
    setTimeout(() => {        // Check if the players are dead        
        state.players.forEach(checkPlayerLost)
        if (isOnePlayerDead()) {          
            endGame()        
        } else {          
            nextTurn()        
        }      
    }, 700)
}


function endGame() {}

function nextTurn() {
    state.turn ++  
    state.currentPlayerIndex = state.currentOpponentId  
    state.activeOverlay = 'player-turn' 
}

function newTurn () {        
    state.activeOverlay = null        
    if (state.currentPlayer.skipTurn) {          
        skipTurn()        
    } else {          
        startTurn()        
    }      
}

function skipTurn () {        
    state.currentPlayer.skippedTurn = true        
    state.currentPlayer.skipTurn = false        
    nextTurn()
}

function startTurn () {        
    state.currentPlayer.skippedTurn = false        
    // If both player already had a first turn        
    if (state.turn > 2) {          
        // Draw new card          
        setTimeout(() => {            
            state.currentPlayer.hand.push(drawCard())            
            state.canPlay = true          
        }, 800)        
    } else {          
        state.canPlay = true        
    }      
} 

var overlayCloseHandlers = {        
    'player-turn' () {          
        if (state.turn > 1) {            
            state.activeOverlay = 'last-play'          
        } else {            
            newTurn()          
        }        
    },        
    'last-play' () {          
        newTurn()        
    },        
    'game-over' () {          
        // Reload the game          
        document.location.reload()        
    },      
} 