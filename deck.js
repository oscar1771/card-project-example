

const Decks = {
    HAND: 0,
    PREPARE: 1,
    MINION: 2
}
module.exports = class Deck {
    constructor(cards, id)
    {
        this.cards = cards;
        this.id = id; //HAND, PREPARE, 
       
        
    }

    static createFrom(cards, id)
    {
        return new Deck(cards, id);
    }

    
}