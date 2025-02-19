

const Decks = {
    HAND: 0,
    //HAND_2: 1,
    PREPARE: 1,
    //PREPARE_2: 3
}
module.exports = class DeckContainer {
    constructor(decks)
    {
        this.decks = decks;
    }

    static createFrom(decks)
    {
        return new DeckContainer(decks);
    }


    removeCard(cardToRemove)
    {
        for (let i = 0; i < this.decks.length; ++i)
        {
            const deck = this.decks[i];
            for (let j = 0; j < deck.length; ++j)
            {
                const card = this.deck[i];
                if (cardToRemove === card)
                {
                    deck.splice(j, 1);
                }
            }

        }
    }


    addCardToDeck(cardToAdd, idDeck)
    {
        decks[isDeck].push(cardToAdd);
    }

    
}
