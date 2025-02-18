
const States = {
    NON_SELECTED: 0,
    HOVER: 1,
    SELECTED: 2,
    MOVING: 3,
    PLACED: 4

}



class Card {
    constructor(id, type)
    {
            this.id = id;
            this.type = type;
            this.x = x;
            this.y = y;
            this.v = 30;
            this.state = States.NON_SELECTED;

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
        this.state = States.NON_SELECTED;
    }

    isSelected()
    {
        return this.state === States.SELECTED;
    }

    isHover()
    {
        return this.state === States.HOVER;
    }

    move()
    {
        this.x += this.v * deltaTime;
    }
}

module.exports = {
    Card
} 