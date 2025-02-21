


class Card {
    constructor(id, type, name, description)
    {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.x = 0;
        this.y = 0;
        
        
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    getPosition()
    {
        return {x: this.x, y: this.y}
    }

}

module.exports = {
    Card
}