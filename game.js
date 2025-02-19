
const {Grid} = require('./grid');
const {CardMinion} = require('./cardMinion');
const PrepareEventPhase = require('./prepareEventPhase');
const PrepareEventPhase = require('./prepareEventPhase');
const Deck = require('./deck');
const DeckContainer = require('./deckContainer');
const ElementState = require('./elementState');
const CollisionDetector = require('./collisionDetector');


const grid = Grid.create(10,10,5,4,15,15);

//Create Decks

//Deck player 1
const villain = new CardMinion("villain", 23, 34, 45);


const mortimer = new CardMinion("mortimer", 3, 42, 28);

let cards = [villain, mortimer];
let deck1 = new Deck(cards, 'minion player 1');



//Deck player 2
const bishop = new CardMinion("bishop", 2, 34, 40);
// let cardMovement = new CardMovementDecorator(villain);
// let cardStates = new CardStateDecorator(villain);


const zachariah = new CardMinion("zachariah", 37, 42, 28);
// cardMovement = new CardMovementDecorator(mortimer);
// cardStates = new CardStateDecorator(mortimer);

cards = [bishop, zachariah];

let deck2 = new Deck(cards, 'minion player 2');
const decks = [deck1, deck2];

const deckContainer = new DeckContainer(decks);

console.log(deckContainer);

const prepareEventCardStatePlayer1 = ElementState.create("prepare event", deckContainer);
const colliderState                = ElementState.createCollider(deckContainer, grid);


//Collision Detector
const collisionDetector = new CollisionDetector(colliderState)



//Create event phase

const phase = new PrepareEventPhase(grid, prepareEventCardStatePlayer1, deckContainer, collisionDetector);
//phase.execute();


console.log(grid);




//console.log(villain);
