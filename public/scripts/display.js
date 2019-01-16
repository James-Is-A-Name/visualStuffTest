

document.addEventListener("DOMContentLoaded",setupDisplayArea);

let mainDisplay;

function setupDisplayArea(){
    mainDisplay = new display();

    let loop = setInterval(() => {
        mainDisplay.moveItems()
        // mainDisplay.redrawItemsHTML()
        //mainDisplay.redrawItemsSVG()
        mainDisplay.redrawItemsCanvas()
        mainDisplay.redrawUserEntityCanvas()
    }
    ,20)
}




function speak(message){
    
    //Show where
    // const err = new Error().stack
    // console.log(err.split("\n")[2])
    
    console.log(message)
}

class display{
    constructor(){
        this.width = (document.documentElement.clientWidth - 30) || 100;
        this.height = (document.documentElement.clientHeight - 30) || 100;

        this.userEntity = {
            width: 200,
            height: 400,
            x: 0,
            y: this.height,
            xChange: 0,
            yChange: 0,
            xPolarity: 1,
            yPolarity: 1,
            xAccel: 0
        }

        this.drawArea();

        this.items = [];
        this.items.push(new visualItem(10,10,30,undefined,this.items.length));
        this.items.push(new visualItem(101,110,60,undefined,this.items.length));
        this.items.push(new visualItem(103,210,30,undefined,this.items.length));
        this.items.push(new visualItem(120,310,30,undefined,this.items.length));
        this.items.push(new visualItem(410,410,30,undefined,this.items.length));

        [1,2,3,4,5,6,7,8,9,10,11,12,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1].forEach( (val,i)=> {
            this.items.push(new visualItem(10*val,10+i*5,30+val,undefined,this.items.length));
        })

        // this.setupItemsHTML()
        //this.setupItemsSVG()

        this.xGrav = 0;
        this.yGrav = 1;


        this.upKeyPressed = false;
        this.leftKeyPressed = false;
        this.rightKeyPressed = false;
        window.addEventListener('devicemotion', (event) => {this.handleMotion(event,this)});

        // window.addEventListener('onkeydown', (event) => {this.handleUserKeyDown(event,this)});
        
        // document.onkeydown = (e)=>{alert("something")};
        document.onkeydown = (event) => {this.handleUserKeyDown(event,this)}
        document.onkeyup = (event) => {this.handleUserKeyUp(event,this)}
    }
    handleUserKeyUp(event,thisObject){
        
        switch (event.keyCode){
            case 37 : {
                if (thisObject.userEntity.xAccel == -1){
                    thisObject.leftKeyPressed = false;
                    if(thisObject.rightKeyPressed){
                        thisObject.userEntity.xAccel = 1;
                    }
                    else{
                        thisObject.userEntity.xAccel = 0;
                    }
                }
                break;
            }
            case 39 : {
                if (thisObject.userEntity.xAccel == 1){
                    thisObject.rightKeyPressed = false;
                    if(thisObject.leftKeyPressed){
                        thisObject.userEntity.xAccel = -1
                    }
                    else{
                        thisObject.userEntity.xAccel = 0
                    }
                }
                break;
            }
        }
    }
    
    handleUserKeyDown(event,thisObject){

        switch (event.keyCode){
            case 38 : {
                if(Math.abs(thisObject.userEntity.y) == thisObject.height - thisObject.userEntity.height){
                    thisObject.userEntity.yChange = 7;
                    thisObject.userEntity.yPolarity = -1;
                }
                break;
            }
            case 37 : {
                thisObject.userEntity.xAccel = -1;
                thisObject.leftKeyPressed = true;
                break;
            }
            case 39 : {
                thisObject.userEntity.xAccel = 1;
                thisObject.rightKeyPressed = true;
                break;
            }
        }
    }

    handleMotion(event,theObject) {
        if(event.accelerationIncludingGravity.x > 2){

            if(theObject.xGrav != -1){
                console.log("all fall left now")
            }

            theObject.xGrav = -1;
            theObject.yGrav = 0;
        }
        else if(event.accelerationIncludingGravity.x < -2){
            
            if(theObject.xGrav != 1){
                console.log("all fall rigth now")
            }

            theObject.xGrav = 1;
            theObject.yGrav = 0;
        }
        else{
            if(theObject.xGrav != 0){
                console.log("all fall down now")
            }
            theObject.xGrav = 0;
            theObject.yGrav = 1;
        }
    }


    drawArea(){
        let displayElement = document.getElementById("displayElement");
        
        speak("testing an error");

        displayElement.style.border = "solid";

        displayElement.style.position = "relative";

        displayElement.style.width = this.width + "px";
        displayElement.style.height = this.height + "px";



        //Setup SVG
        let svgNs = "http://www.w3.org/2000/svg";
        
        let svgArea = document.createElementNS(svgNs,"svg");
        svgArea.setAttributeNS(null,"id","svgArea");
        svgArea.setAttributeNS(null,"width",this.width);
        svgArea.setAttributeNS(null,"height",this.height);

        //was covering the canvas
        //displayElement.appendChild(svgArea);

        //Setup Canvas
        let canvasArea = document.createElement("canvas");
        canvasArea.setAttribute("id","canvasArea");
        canvasArea.setAttribute("width",this.width);
        canvasArea.setAttribute("height",this.height);
        canvasArea.style.position = "absolute";

        displayElement.appendChild(canvasArea)
    }

    setupItemsSVG(){
        let svgDisplayElement = document.getElementById("svgArea");
        let svgNs = "http://www.w3.org/2000/svg";

        speak(`items length is ${this.items.length}`)

        this.items.forEach(itemData => {

            if(itemData.itemId >= 0){
                let aThing = document.createElementNS(svgNs,"svg");

                let aCircle = document.createElementNS(svgNs,"circle");
                
                aThing.setAttributeNS(null,"id","svgItem-" + itemData.itemId);

                aThing.setAttributeNS(null,"x",itemData.x-1);
                aThing.setAttributeNS(null,"y",itemData.y-1);

                aThing.setAttributeNS(null,"width",itemData.width+2);
                aThing.setAttributeNS(null,"height",itemData.height+2);

                aCircle.setAttributeNS(null,"cx",itemData.width/2 + 1);
                aCircle.setAttributeNS(null,"cy",itemData.width/2 + 1);

                aCircle.setAttributeNS(null,"r",itemData.width/2);
                aCircle.setAttributeNS(null,"fill","red");
                aCircle.setAttributeNS(null,"stroke","black");

                aThing.appendChild(aCircle)

                let aRect = document.createElementNS(svgNs,"rect")
                
                aRect.setAttributeNS(null,"x",itemData.width/2);
                aRect.setAttributeNS(null,"y",itemData.width/2);

                aRect.setAttributeNS(null,"width",itemData.width/4);
                aRect.setAttributeNS(null,"height",itemData.width/4);

                aRect.setAttributeNS(null,"fill","white");
                aRect.setAttributeNS(null,"stroke","black");
                
                aThing.appendChild(aRect)

                //This will just keep adding things so not the best
                svgDisplayElement.appendChild(aThing);
            }
        });
    }

    setupItemsHTML(){
        let displayElement = document.getElementById("displayElement");

        speak(`items length is ${this.items.length}`)

        this.items.forEach(itemData => {

            if(itemData.itemId >= 0){
                let anItem = document.createElement("div");

                anItem.style.left = itemData.x + "px";
                anItem.style.top = itemData.y + "px";

                anItem.style.width = itemData.width + "px";
                anItem.style.height = itemData.height + "px";

                anItem.style.position = "absolute"

                anItem.style.border = "dashed";

                anItem.id = "item-"+itemData.itemId;

                //This will just keep adding things so not the best
                displayElement.appendChild(anItem);
            }
        });
    }

    collidesWithEntity(item){

        let xDiff = item.x - this.userEntity.x
        let yDiff = item.y - this.userEntity.y


        //Currently simplifies the circle to a a square hitbox
        if(xDiff > -item.width && xDiff < this.userEntity.width){
            if(yDiff > -item.height && yDiff < this.userEntity.height){
                return true;
            }
        }

        return false
    }
    getreflectDirection(item){

        let xDiff = item.x - this.userEntity.x
        let yDiff = item.y - this.userEntity.y

        let xDirection = 0;
        let yDirection = 0;


        //still simplifying to a square
            //lazy redirect happening
        if(xDiff < 0){
            xDirection = -1;
        }
        else if(xDiff > this.userEntity.width - item.width){
            xDirection = 1;
        }
        
        if(yDiff > this.userEntity.height){
            yDirection = 1;
        }
        else if(yDiff <  item.height){
            yDirection = -1;
        }

        return {xDirection,yDirection}
    }


    moveItems(){
        if(this.xGrav != 0){
            console.log("xgrav seen as ",this.xGrav)
        }

        
        /* ENTITY THINGS HERE */
        
        let userEntity = this.userEntity
        userEntity.x += Math.floor(userEntity.xChange) * userEntity.xPolarity;
        userEntity.y += Math.floor(userEntity.yChange) * userEntity.yPolarity;
        
        if(Math.abs(userEntity.y) == this.height - userEntity.height){
            if(userEntity.xAccel != 0){
                userEntity.xChange += userEntity.xAccel * userEntity.xPolarity;

                if(userEntity.xChange > 10){
                    userEntity.xChange = 10
                }
            }
            else if(userEntity.xChange > 0.9){
                userEntity.xChange -= 1
            }
            else{
                userEntity.xChange = 0
            }
        }
        

        userEntity.yChange += (0.1*userEntity.yPolarity*this.yGrav);
        if(userEntity.yChange < 0){
            userEntity.yChange = -userEntity.yChange;
            userEntity.yPolarity = -userEntity.yPolarity;
        }

        if(userEntity.xChange < 0){
            userEntity.xChange = -userEntity.xChange;
            userEntity.xPolarity = -userEntity.xPolarity;
        }

        if(userEntity.y < 0){
            userEntity.y = 0
        }
        if(userEntity.y > this.height-this.userEntity.height){
            userEntity.y = this.height-this.userEntity.height
            userEntity.yChange = 0
        }
        if(userEntity.x < 0){
            userEntity.x = 0
            userEntity.xChange = 0
        }
        if(userEntity.x > this.width-userEntity.width){
            userEntity.x = this.width-this.userEntity.width
            userEntity.xChange = 0
        }
        /* ENTITY THINGS HERE */



        this.items = this.items.map( itemData=> {
            itemData.x += Math.floor(itemData.xChange) * itemData.xPolarity;
            itemData.y += Math.floor(itemData.yChange) * itemData.yPolarity;

            itemData.yChange += (0.1*itemData.yPolarity*this.yGrav);
            if(itemData.yChange < 0){
                itemData.yChange = -itemData.yChange;
                itemData.yPolarity = -itemData.yPolarity;
            }
            
            
            itemData.xChange += (0.1*itemData.xPolarity*this.xGrav);
            if(itemData.xChange < 0){
                itemData.xChange = -itemData.xChange;
                itemData.xPolarity = -itemData.xPolarity;
            }

            if(itemData.y < 0){
                itemData.y = 0;
                itemData.yPolarity = 1;
            }
            else if(itemData.y >= this.height - itemData.height){

                itemData.y = this.height - itemData.height - 1;
                itemData.yPolarity = -1;
                
                if(Math.random() > 0.5){
                    if(this.yGrav != 0){

                        itemData.xChange = Math.floor(Math.random() * 10)
                        itemData.yChange = Math.floor(Math.random() * 15 + 1)

                        if(Math.random() > 0.90){
                            itemData.xPolarity *= -1;
                        }
                    }
                }
            }

            if(itemData.x < 0){
                itemData.x = 0;
                if(this.xGrav != 0){
                    itemData.xChange = Math.floor(itemData.xChange * (8+Math.random()) /10)
                    itemData.yChange = Math.floor(itemData.yChange * (8+Math.random()) /10)
                }
                itemData.xPolarity = 1;
            }
            else if(itemData.x >= this.width - itemData.width){
                itemData.x = this.width - itemData.width - 1;
                if(this.xGrav != 0){
                    itemData.xChange = Math.floor(itemData.xChange * (8+Math.random()) /10)
                    itemData.yChange = Math.floor(itemData.yChange * (8+Math.random()) /10)
                }
                itemData.xPolarity = -1;
            }

            /* Entity hit things here */
            
            if(this.collidesWithEntity(itemData)){
                let reflect = this.getreflectDirection(itemData);

                if(reflect.xDirection != 0){
                    itemData.xPolarity = reflect.xDirection;
                    if(itemData.xChange < userEntity.xChange){
                        itemData.xChange += userEntity.xChange;
                    }
                }
                if(reflect.yDirection != 0){
                    itemData.yPolarity = reflect.yDirection;
                    if(itemData.yChange < userEntity.yChange){
                        itemData.yChange += userEntity.yChange;
                    }
                }
            }

            return itemData;
        })
    }

    redrawItemsHTML(){
        let displayElement = document.getElementById("displayElement");

        let childElemnts = displayElement.childNodes;

        childElemnts.forEach( itemInfo =>{
            let id = itemInfo.id
            
            let item = document.getElementById(id);
            
            let itemData = this.items[id.substring(5)];

            item.style.left = itemData.x + "px";
            item.style.top = itemData.y + "px";
            item.style.width = itemData.width + "px";
            item.style.height = itemData.height + "px";
        })
    }
    
    redrawItemsSVG(){
        let displayElement = document.getElementById("svgArea");


        let childElemnts = displayElement.childNodes;


        childElemnts.forEach( itemInfo =>{
            let id = itemInfo.id
            
            let item = document.getElementById(id);
            
            let itemData = this.items[id.substring(8)];
            
            item.setAttribute("x" ,itemData.x);
            item.setAttribute("y", itemData.y);

            let rect = item.childNodes[1];

            let xDirect = Math.abs(itemData.xChange);
            let yDirect = Math.abs(itemData.yChange);

            let range = 5;
            if(xDirect > range){
                xDirect = range
            }
            if(yDirect > range){
                yDirect = range
            }
            xDirect *= itemData.xPolarity
            yDirect *= itemData.yPolarity
            rect.setAttribute("x",itemData.width*3/8 + itemData.width/(range * 4) * xDirect);
            rect.setAttribute("y",itemData.height*3/8 + itemData.height/(range * 4) * yDirect);
        })
    }
    redrawItemsCanvas(){
        let displayElement = document.getElementById("canvasArea");

        let canvasArea = displayElement.getContext("2d");

        canvasArea.clearRect(0,0,this.width,this.height)

        this.items.forEach( (item) => {
            canvasArea.beginPath();
            canvasArea.arc(item.x+item.width/2,item.y+item.width/2,item.width/2,0,2*Math.PI);

            if(this.collidesWithEntity(item)){
                canvasArea.fillStyle = "red";
                canvasArea.fill();
            }
            canvasArea.stroke();
        } )
    }

    redrawUserEntityCanvas(){
        let displayElement = document.getElementById("canvasArea");

        let canvasArea = displayElement.getContext("2d");

        canvasArea.beginPath();
        canvasArea.rect(this.userEntity.x,this.userEntity.y,this.userEntity.width,this.userEntity.height);
        canvasArea.fillStyle = "green";
        canvasArea.fill();
        canvasArea.stroke();
    }
}




class visualItem{
    constructor(x = 100,y = x, width = 10, height = width, itemId = -1){

        this.itemId = itemId;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xChange = 1;
        this.yChange = 1;
        this.xPolarity = 1;
        this.yPolarity = 1;
    }
}