const {CardDecorator} = require('./cardDecorator')


const States = {
    NON_SELECTED: 0,
    SELECTED: 1,
    MOVING: 2,
    PLACED: 3

}
class CardMovement extends CardDecorator{
    constructor(card, state)
    {
        super(card);
        this.state = state;
    }

    setState(state)
    {
        card
    }


}

module.exports = {
    CardMovement
}