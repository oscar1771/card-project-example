module.exports = class MouseInput {
    constructor()
    {
       
        //this.stateDecorators = stateDecorators;
        
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseClicked = false;

    }


    calculateCollisionBetweenMouseAndDeck(deck){
        
        const state = false;

        //Deseleccionamos todas
        for (let i = 0; i < deck.length; ++i)
        {
            const cardState = deck[i];
            cardState.isClicked = false;
            cardState.isOnTop = false;
        }
        
        //Seleccionamos la que se clique
        for (let i = 0; i < deck.length; ++i)
        {
            const cardState = deck[i];
            if (this.mouseX === cardState.card.x)
            {
                cardState.isOnTop = true;

                if (mouseClicked)
                    //Hay colision. La seleccionamos
                    cardState.isClicked = true
                
                    
            }
        }

        return state;

    }

    calculateCollisionBetweenMouseAndGrid(grid){

        //Deseleccionamos todas
        for (let i = 0; i < grid.length; ++i)
        {
            const box = grid[i];
            box.isClicked = false;
            box.isOnTop = false;
        }
        
        //Seleccionamos la que se clique
        for (let i = 0; i < grid.length; ++i)
        {
            const box = grid[i];
            if (this.mouseX === box.x)
            {
                box.isOnTop = true;

                if (this.mouseClicked)
                    //Hay colision. La seleccionamos
                    box.isClicked = true
                
                    
            }
        }

        return state;

    }





}