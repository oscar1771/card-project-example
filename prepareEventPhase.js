
//const {CardMinion} = require('./cardMinion');
//const {CardMovementDecorator} = require('./cardMovement');
//const {Grid} = require('./grid');

const Actions = {
    NO_CARD_SELECTED: 0,
    SELECTED_CARD: 1,
    SELECT_TARGET_GRID: 2,
    MOVE_CARD: 3,
    END: 4,

}

const Decks = {
    HAND: 0,
    PREPARE: 1,
    MINION: 2
}


module.exports = class PrepareEventPhase {
    constructor(grid, deckContainer, handDeckMovement, prepareDeckMovement, collisionDetector)
    {
        this.grid = grid;
        //this.cardStates = cardStates;
        //this.cardMovement = cardMovement;
        this.handDeckMovement = handDeckMovement;
        //this.handDeckState = handDeckState;
        this.prepareDeckMovememt = prepareDeckMovement;
        this.deckContainer = deckContainer;


        
        this.state = 0;
        // this.movementDecorators = movementDecorators;
        // this.stateDecorators = stateDecorators;
        this.collisionDetector = collisionDetector;
        //this.selectedCardMovement = null;
        
    }


    static create(grid, cardState, deckContainer, collisionDetector)
    {

        const handDeckMovement = [];
        //const handDeckState = [];
        const prepareDeckMovement = [];

        const movementDecorators = cardState.movementDecorators;
        //const stateDecorators = cardState.stateDecorators;

        for (let i = 0; i < movementDecorators.length; ++i)
        {
            const cardState = movementDecorators[i];
            if (stateDecorators[i].deckID === Decks.HAND)
            {
                handDeckMovement.push(cardState);
            }
            else if (stateDecorators[i].deckID === Decks.PREPARE)
            {
                prepareDeckMovement.push(cardState);
            }
        }

        // for (let i = 0; i < movementDecorators.length; ++i)
        // {
        //     const cardState = stateDecorators[i];
        //     if (stateDecorators[i].deckID === Decks.HAND)
        //     {
        //         handDeckMovement.push(cardState);
        //     }
            
        // }

        return new PrepareEventPhase(grid, deckContainer, handDeckMovement, prepareDeckMovement, collisionDetector);
    }

    execute()
    {
        let phaseEnded = false;
        this.resetStates(); //Ponemos los estados de cartas a NO_SELECTED
        this.readAndUpdateSelectedCard(); //Leemos si hay una carta seleccionada y actualizamos el estado.
        this.updatePlayerActions();
        //calculateCollisionsBetweenMouseAndCards();
        //calculateCollisionsBetweenMouseAndGrids();
        this.updateDecks();
        phaseEnded = this.checkIfPhaseEnded();
        return phaseEnded;
        
        
    }

    readAndUpdateSelectedCard()
    {
        const state = false;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            const cardState = this.handDeckMovement[i];
            if (cardState.isSelected())
            {
                this.selectedCardMovement = cardState;
            }

        }

        return state;
    }



    anyCardPlacedOnTargetGrid()
    {
        let cardState;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            cardState = this.handDeckMovement[i];
            if (cardState.isPlaced())
            {
                break;
            }

        }

        return cardState;
    }



    anyCardSelectedOnHand()
    {
        let cardState;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            cardState = this.handDeckMovement[i];
            if (cardState.isSelected())
            {
                break;
            }

        }

        return cardState;
    }

    // getCardStateSelectedOnHand()
    // {
    //     const returnState = null;
    //     for (let i = 0; i < this.handDeckState.length; ++i)
    //     {
    //         const cardState = this.handDeckState[i];
    //         if (cardState.isSelected())
    //         {
    //             returnState = cardState;
    //             break;
    //         }

    //     }

    //     return returnState;
    // }

    updatePlayerActions()
    {
        switch (state)
        {
            case Actions.NO_CARD_SELECTED:


                if (this.anyCardSelectedOnHand() !== null)
                {
                    this.state = Actions.SELECTED_CARD;
                }
                break;

            case Actions.SELECTED_CARD:
                const selectedBox = this.grid.anyBoxSelected();
                const selectedCard = this.anyCardSelectedOnHand();
               
                if (selectedBox !== null)
                {
                    this.state = Actions.MOVE_CARD;
                    selectedCard.deactivate(); //Desactivamos la carta para poder seleccionarla

                    
                }
                else if (selectedCard === null) //No se ha seleccionado ninguna 
                {
                    this.state = Actions.NO_CARD_SELECTED;
                }
                break;

            case Actions.MOVE_CARD:
                const selectedBox = this.grid.anyBoxSelected();
                const placedCard = this.anyCardPlacedOnTargetBox(selectedBox);
                if (placedCard === null) //Si no hay colision de la carta con el grid destino
                {
                    this.cardMovement.move();
                }
                else
                {               
                    this.cardMovement.setBoxCoordinates(selectedBox)
                    this.state = States.END;
                }
                break; 
            
            case Actions.END:
                //this.cardStates.placed(); //Ponemos la carta en estado PLACED
                this.grid.setBoxFull(selectedBox);
                break;
            

        }
    }

    updateDecks()
    {
        //Cogemos todas las cartas que estén en el contenedor de ORIGEN y estén en el estado PLACED.
        //Las borramos del Deck de origen y las añadimos al deck de destino

        const placedCard = null;
        for (let i = 0; i < this.handDeckState.length; ++i)
        {
            let cardState = this.handDeckState[i];
            if (cardState.placed())
                placedCard = cardState;

        }

        //Añadimos la carta al deck de prepare
        this.deckContainer.addCardToDeck(placedCard, Decks.PREPARE);

        //Borramos la carta del deck Actual 
        this.deckContainer.removeCard(placedCard)


        // let position = this.deckContainer.getPositionOfPlacedCardInDeck(ORIGIN);

        // if (position !== -1)
        // {
        //     this.deckContainer.removeCardFromPositionInDeck(position, ORIGIN);
        //     this.deckContainer.addCardToDeck(TARGET);
        // }

    }

    checkIfPhaseEnded()
    {
        return this.state === States.END;
    }

    
    
}




