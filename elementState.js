
const { CardMovementDecorator } = require('./cardMovementDecorat');
const { CardStateDecorator } = require('./cardMovementDecorator');
const { ColliderState } = require('./colliderState');




module.exports = class ElementState {

    constructor()
    {

    }


    static create(type, deckContainer) //Container con los decks del player asociado para la fase asociada
    {


        switch (type)
        {
            case "prepare event":
                createPrepareEventCardState(deckContainer);
                break;


        }
 
    }

    static createCollider(deckContainer, grid) //Container con los decks del player asociado para la fase asociada
    {
        createColliderState(deckContainer, grid);      
    }
 
    


    static createPrepareEventCardState(deckContainer)
    {
        const movementDecorators = [];
        const stateDecorators = [];
        
        for (let i = 0; i < deckContainer.length; ++i)
        {
            //Para cada deck creamos los 2 decorators
            const deck = deckContainer[i];
            for (let i = 0; i < deck.length; ++i)
            {
                const card = deck[i];
                const movementDecorator = new CardMovementDecorator(card);
                const stateDecorator = new CardStateDecorator(card, deck.id);
                movementDecorators.push(movementDecorator);
                stateDecorators.push(stateDecorator);
                
            }
        }

        return new PrepareEventCardState(movementDecorators, stateDecorators);
    }


    static createColliderState(deckContainer, grid)
    {
        const movementDecorators = [];
        const stateDecorators = [];
        
        for (let i = 0; i < deckContainer.length; ++i)
        {
            //Para cada deck creamos los 2 decorators
            const deck = deckContainer[i];
            for (let i = 0; i < deck.length; ++i)
            {
                const card = deck[i];
                const movementDecorator = new CardMovementDecorator(card);
                const stateDecorator = new CardStateDecorator(card, deck.id);
                movementDecorators.push(movementDecorator);
                stateDecorators.push(stateDecorator);
                
                
            }
        }

        return new ColliderState(movementDecorators, stateDecorators, grid);
    }
}