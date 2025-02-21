
const {Grid} = require('./grid');
const {CardMinion} = require('./cardMinion');
const PrepareEventPhase = require('./prepareEventPhase');
const PrepareEventPhase = require('./prepareEventPhase');
const Deck = require('./deck');
const DeckContainer = require('./deckContainer');
const CardView = require('./cardView');



module.exports = class Game {
    constructor(deckContainer1, deckContainer2, phase1, phase2)
    {
        this.deckContainer1 = deckContainer1;
        this.deckContainer2 = deckContainer2;
        this.phase1 = phase1;
        this.phase2 = phase2;
    }

    static create()
    {
        const grid = Grid.create(10,10,5,4,15,15);

        //Create Decks

        //Deck player 1
        const villain = new CardMinion("villain", 23, 34, 45);
        const mortimer = new CardMinion("mortimer", 3, 42, 28);

        let cards = [villain, mortimer];
        let deck1 = new Deck(cards, 'minion player 1');

        //Deck player 2
        const bishop = new CardMinion("bishop", 2, 34, 40);
        const zachariah = new CardMinion("zachariah", 37, 42, 28);
        const dicerius = new CardMinion("dicerius", 137, 142, 128);

        
        cards = [bishop, zachariah];
        let deck2 = new Deck(cards, 'minion player 2');
        let deck3 = new Deck([dicerius], 'enemy player 2');

        
        const decks1 = [deck1, deck2];
        const decks2 = [deck2, deck3];

        const deckContainer1 = new DeckContainer(decks1);
        const deckContainer2 = new DeckContainer(decks2);
       
        
        console.log(deckContainer1);
        const mouseInput = newMouseInput();

        //Creamos card views para los containers
        deckContainer1 = createCardViews(deckContainer1);
        deckContainer2 = createCardViews(deckContainer2);

        //Create event phases for players 1 and 2
        const phase1 = new PrepareEventPhase(grid, deckContainer1, mouseInput);
        const phase2 = new PrepareEventPhase(grid, deckContainer2, mouseInput);

        return new Game(deckContainer1, deckContainer2, phase1, phase2);
    }

    createCardViews(deckContainer, imageSetSmall, imageSetBig)
    {
        const returnContainer = [];
                   
        for (let i = 0; i < deckContainer.length; ++i)
        {
            //Para cada deck creamos los 2 decorators
            const deck = deckContainer[i];
            const newDeck = [];
            for (let i = 0; i < deck.length; ++i)
            {
                const card = deck[i];
                
                const view = new CardView.create(card, imageSetSmall, imageSetBig);
                newDeck.push(view);

                
            }
            
            returnContainer.push(newDeck);

        }      
           
    }

    execute()
    {
        this.phase1.execute();
        this.phase2.execute();


        this.render();
        
    }

    
}


