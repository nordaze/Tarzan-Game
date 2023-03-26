class Platform
{
    constructor(xPos,yPos,platformWidth,platformHeight,image){
        this.x = xPos
        this.y = yPos
        this.width = platformWidth
        this.height = platformHeight
        var options = {
            isStatic:true
           }
        this.body= Bodies.rectangle(this.x,this.y,this.width,this.height,options)
        this.image = loadImage(image)
    }

    show(){
        imageMode(CENTER);
        image(this.image, this.body.position.x, this.body.position.y,this.width,this.height);
        
    }
}

