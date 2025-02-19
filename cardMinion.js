
const {Card} = require('./card');


class CardMinion extends Card {
    constructor(id, attack, defense, hp)
    {
        super(id, "minion");
        this.attack = attack;
        this.defense = defense;
        this.hp = hp
    }
}

module.exports = {
    CardMinion
}