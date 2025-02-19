module.exports = class CollisionDetector {
    constructor(grid, stateDecorators)
    {
       
        this.stateDecorators = stateDecorators;
        
        this.grid = grid;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    static create(grid, cardState)
    {
        return new PrepareEventPhase(grid, cardState.stateDecorators);
    }

    calculateCollisionBetweenMouseAndCard(){
        
        const state = false;

        //Deseleccionamos todas
        for (let i = 0; i < this.length; ++i)
        {
            stateDecorators[i].unselect();
        }
        
        //Seleccionamos la que se clique
        for (let i = 0; i < this.length; ++i)
        {
            const cardState = stateDecorators[i];
            if (mouseX === cardState.card.x && isClicked)
            {
                //Hay colision. La seleccionamos
                cardState.selected();

            }
            
            
        }

        return state;

    }


}