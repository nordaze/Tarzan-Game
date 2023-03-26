class Bucket{
    constructor(bucketX,bucketY,bucketW,bucketH,bucketImage){
        this.x = bucketX
        this.y = bucketY
        this.width = bucketW
        this.height = bucketH
        this.image = loadImage(bucketImage)
    }

    show(){
        imageMode (CENTER)
        image (this.image,this.x,this.y,this.width,this.height)
    }
}