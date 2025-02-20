
//const {CardMinion} = require('./cardMinion');
const {CardMovementDecorator} = require('./cardMovementDecorator');
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
    constructor(grid, deckContainer, mouseInput)
    {
        this.grid = grid;
        this.handDeckMovement = [];
        this.prepareDeckMovememt = [];
        this.deckContainer = deckContainer;
        this.state = 0;
        this.mouseInput = mouseInput;
        
    }


    static create(grid, deckContainer, mouseInput)
    {      
        return new PrepareEventPhase(grid, deckContainer, mouseInput);
    }


    createDecorators(deckContainer)
    {
        const handDecorators = [];
        const prepareDecorators = [];
        
        for (let i = 0; i < deckContainer.length; ++i)
        {
            //Para cada deck creamos los 2 decorators
            const deck = deckContainer[i];
            for (let i = 0; i < deck.length; ++i)
            {
                const card = deck[i];
               
                const decorator = new CardMovementDecorator(card, deck);
                if (deck.deckID === Decks.HAND)
                {                  
                    handDecorators.push(decorator);       
                }
                else if (deck.deckID === Decks.PREPARE)
                {         
                    prepareDecorators.push(decorator);
                }
            }
        }

        this.handDeckMovement = handDecorators;
        this.prepareDeckMovememt = prepareDecorators;
        
    }


    execute()
    {
        let phaseEnded = false;
        this.createDecorators();
        this.resetCardStates(); //Ponemos los estados de cartas a NO_SELECTED
        
        //Inputs de ratón y colisiones con cartas y grids
        this.mouseInput.calculateCollisionBetweenMouseAndDeck(handDeckMovement);
        this.mouseInput.calculateCollisionBetweenMouseAndGrid(handDeckMovement, grid);


        //State machine de acciones
        this.updatePlayerActions();

        this.updateDecks();
        phaseEnded = this.checkIfPhaseEnded();
        return phaseEnded;
        
        
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



    anyCardMouseInputOnHand()
    {
        let cardState = 0; //Not over.
        let card;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            cardState = this.handDeckMovement[i];
            if (cardState.isOnTop)
            {
                if (cardState.isClicked)
                {
                    cardState = 2; //Selected
                }
                else
                {
                    cardState = 1; //Hover
                }
                
            }

        }

        return {card, cardState}
    }

    anyCardCollidedWith()
    {
        let cardState = 0; //Not over.
        let card;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            cardState = this.handDeckMovement[i];
            if (cardState.isOnTop)
            {
                if (cardState.isClicked)
                {
                    cardState = 2; //Selected
                }
                else
                {
                    cardState = 1; //Hover
                }
                
            }

        }

        return {card, cardState}
    }


    anyGridMouseInputOnTarget()
    {
        let boxState = 0; //Not over.
        let box;
        for (let i = 0; i < this.grid.length; ++i)
        {
            boxState = this.grid[i];
            if (boxState.isOnTop)
            {
                if (boxState.isClicked)
                {
                    boxState = 2; //Selected
                }
                else
                {
                    boxState = 1; //Hover
                }
                
            }

        }

        return {box, boxState}
    }


    anyGridSelectedOnTarget()
    {
        let box = null;
        for (let i = 0; i < this.grid.length; ++i)
        {
            const box = this.grid[i];
            if (box.isSelected())
            {
                break;
            }
        }

        return box;
    }

    anyCardSelectedOnHand()
    {
        let card = null;
        for (let i = 0; i < this.handDeckMovement.length; ++i)
        {
            card = this.handDeckMovement[i];
            
            if (card.isSelected())
            {
                break;
            }
        }

        return card;
    }

    calculateCollisionBetweenCardAndBox(card, box)
    {
        if (card.x === grid.x)
        {
            return true;
        }

        return false;
    }


    updatePlayerActions()
    {
        let card;
        let cardState;
        switch (state)
        {
            case Actions.NO_CARD_SELECTED:
                let result = this.anyCardMouseInputOnHand();
                card = result.card;
                cardState = result.cardState;
                
                if (cardState === 1) //Mouse HOVER
                {
                    card.hover();
                }
                else if (cardState === 2) //Mouse selected
                {
                    card.selected();
                    card = Actions.SELECTED_CARD;
                }
                else //Mouse not hover
                {
                    card.unselect();
                }

                break;

            case Actions.SELECTED_CARD:
                result = this.anyCardMouseInputOnHand();
                card = result.card;
                cardState = result.cardState;
                if (cardState === 2)  //Si la volvemos a seleccionar
                {
                    card.unselect();
                    card = Actions.NO_CARD_SELECTED;
                }

                result = this.anyGridMouseInputOnTarget();
                box = result.box;
                boxState = result.boxState;
                if (boxState === 2)
                {
                    box.select();
                    this.state = Actions.MOVE_CARD;
                    
                }

                break;

            case Actions.MOVE_CARD:
                //Extramos el box seleccionado y la card seleccionada
                box = this.anyGridSelectedOnTarget();
                card = this.anyCardSelectedOnHand();

                //box y card van a ser !== null seguro
                const isCollision = this.cardCollidedWithBox(card, box);
                if (!isCollision) //Si no hay colision de la carta con el grid destino
                {
                    this.card.move();
                    this.card.unselect(); //Opcional
                }
                else
                {   
                    //Hay colision. La carta ha llegado a su destino       
                    this.card.place(box)
                    this.state = States.END;
                    this.box.full();
                }
                break; 
            
            case Actions.END:
                
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

    }

    checkIfPhaseEnded()
    {
        return this.state === States.END;
    }

    
    
}




