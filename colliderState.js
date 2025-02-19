




module.exports = class ColliderState extends ElementState{

    constructor(movementDecorators,stateDecorators, grid) 
    {
        super();
        this.movementDecorators = movementDecorators;
        this.stateDecorators = stateDecorators;
        this.grid = grid;
    }

}