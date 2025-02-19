const { CardDecorator } = require("./cardDecorator");


class CardMovementDecorator extends CardDecorator {
    constructor(card)
    {
        super(card);
        this.x = 0;
        this.y = 0;
        this.v = 30;
       
    }

    move()
    {
        this.x += this.v * deltaTime;
        this.y += this.v * deltaTime;
    }
}

module.exports = {
    CardMovementDecorator
} 