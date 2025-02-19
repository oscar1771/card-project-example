const { CardDecorator } = require("./cardDecorator");

const States = {
    NOT_SELECTED:   0,
    HOVER:          1,
    SELECTED:       2,
    INACTIVE:       3,
    PLACED:         4
    //MOVING:         3,
    //PLACED:         4

}



class CardStateDecorator extends CardDecorator {
    constructor(card, deckID)
    {
        super(card);
        this.state = States.NOT_SELECTED;
        this.deckID = deckID;
        this.v = 30;
    }

    select()
    {
        this.state = States.SELECTED;
    }

    hover()
    {
        this.state = States.HOVER;
    }

    unselect()
    {
        this.state = States.NOT_SELECTED;
    }

    isSelected()
    {
        return this.state === States.SELECTED;
    }

    isHover()
    {
        return this.state === States.HOVER;
    }

    deactivate()
    {
        this.state = States.INACTIVE;
    }

    placed()
    {
        this.state = States.PLACED;
    }

    isPlaced()
    {
        return this.state === States.PLACED;
    }



    move()
    {
        this.card.x += this.v * deltaTime;
        this.card.y += this.v * deltaTime;
    }

}

module.exports = {
    CardStateDecorator
} 