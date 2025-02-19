
const { CardMovementDecorator } = require('./cardMovementDecorat');
const { CardStateDecorator } = require('./cardMovementDecorator');


module.exports = class PrepareEventCardState extends ElementState {

    constructor(movementDecorators, stateDecorators) 
    {
        super();
        this.movementDecorators = movementDecorators;
        this.stateDecorators = stateDecorators;
    }

}