
const {Box} = require('./box');

class Grid {
    constructor(boxes)
    {
        this.boxes = boxes
    }

    static create(xInit, yInit, numX, numY, sizeX, sizeY)
    {
        const boxes = [];
        for (let i = 0; i < numX; ++i)
        {
            for (let j = 0; j < numY; ++j)
            {
                const box = new Box(xInit+i*sizeX, yInit+j*sizeY, sizeX, sizeY, 0);
                boxes.push(box);
            }

        }

        return new Grid(boxes);
    }


    applyHoverToBox(box)
    {
        this.box.hover();
    }

    anyBoxSelected()
    {
        for (let i = 0; i < this.boxes.length; ++i)
        {
            if (this.boxes[i].isSelected())
            {
                return boxes[i];
            }
        }

        return null;
    }

    
    setBoxFull(box)
    {
        this.box.full();
    }
    
}

module.exports = {
    Grid
}