
const {Grid} = require('./grid');
const {CardMinion} = require('./cardMinion');
const Phase = require('./phase');


const grid = Grid.create(10,10,5,4,15,15);
const villain = new CardMinion("villain", 23, 34, 45);
const 

const phase = new Phase(grid, villain);
phase.execute();


console.log(grid);

console.log(villain);
