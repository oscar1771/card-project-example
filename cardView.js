


module.exports = class CardView extends CardDecorator {
    constructor(card, imageSetSmall, imageSetBig, sizeXsmall, sizeYsmall, sizeXbig, sizeYbig)
    {
        super(card);
        this.x = 0;
        this.y = 0;
        
        this.imageSetSmall = imageSetSmall;
        this.imageSetBig = imageSetBig;
        
        this.sizeXsmall = sizeXsmall;
        this.sizeYsmall = sizeYsmall;
        this.sizeXbig = sizeXbig;
        this.sizeYbig = sizeYbig;
        


    }

    static create(card, imageSetSmall, imageSetBig)
    {
        return new CardView(card, imageSetSmall, imageSetBig, 32, 45, 230, 300)
    }
}