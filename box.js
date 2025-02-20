 class Box {
    constructor(x, y, sizeX, sizeY, state)
    {
      this.x = x;
      this.y = y;
      this.sizeX = sizeX;
      this.sizeY = sizeY;
      this.state = state;
      this.mouseState = 0;
      this.collidedCard = null;
    }

    free()
    {
        this.state = 0;
    }

    full()
    {
        this.state = 1;
    }

    unselect()
    {
        this.mouseState = 0;
    }

    select()
    {
        this.mouseState = 2;
    }

    hover()
    {
        this.mouseState = 1;
    }


    isSelected()
    {
        return this.mouseState === 2;
    }

    isHover()
    {
        return this.mouseState === 1;
    }

    
 }

 module.exports = {
   Box
 }