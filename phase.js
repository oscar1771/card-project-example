
const {CardMinion} = require('./cardMinion');
const {CardMovement} = require('./cardMovement');
const {Grid} = require('./grid');

const States = {
    NO_CARD_SELECTED: 0,
    SELECTED_CARD: 1,
    SELECT_TARGET_GRID: 2,
    MOVE_CARD: 3,
    PLACED_CARD: 4,

}



module.exports = class Phase {
    constructor(grid, card)
    {
        this.grid = grid;
        this.card = card;
        this.state = 0
    }

    execute()
    {
        this.updateStates();
        //calculateCollisionsBetweenMouseAndCards();
        //calculateCollisionsBetweenMouseAndGrids();
        this.updateDecks();
        
    }

    updateStates()
    {
        switch (state)
        {
            case States.NO_CARD_SELECTED:

            //Verificamos que podamos seleccionar una carta.
                //if (this.deckContainer.isAnyCardSelected())
                if (this.card.isSelected())
                {
                    this.state = States.SELECTED_CARD;
                }
                

                break;
            case States.SELECTED_CARD:
                const selectedBox = this.grid.anyBoxSelected();
                //const selectedCard = this.deckContainer.anyCardSelected();
                if (selectedBox !== null)
                {
                    this.state = States.MOVE_CARD;
                    
                }
                else if (selectedCard === null) //No se ha seleccionado ninguna 
                {
                    this.state = States.NO_CARD_SELECTED;
                }
                break;
            case States.MOVE_CARD:
                if (this.card.notPlaced()) //Si no hay colision de la carta con el grid destino
                {
                    this.card.move();
                }
                else
                {
                    //Colocamos la carta y 
                    this.card.placed();
                    this.grid.setBoxFull(selectedBox);
                }
                
                break; 
            
            case States.PLACED_CARD:
                break;
            

        }
    }

    updateDecks()
    {
        //Cogemos todas las cartas que estén en el contenedor de ORIGEN y estén en el estado PLACED.
        //Las borramos del Deck de origen y las añadimos al deck de destino
        let position = this.deckContainer.getPositionOfPlacedCardInDeck(ORIGIN);

        if (position !== -1)
        {
            this.deckContainer.removeCardFromPositionInDeck(position, ORIGIN);
            this.deckContainer.addCardToDeck(TARGET);
        }

    }
    
}




