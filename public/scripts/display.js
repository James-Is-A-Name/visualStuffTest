

document.addEventListener("DOMContentLoaded",setupDisplayArea);

let mainDisplay;

function setupDisplayArea(){
    mainDisplay = new display();

    let loop = setInterval(() => {
        mainDisplay.moveItems()
        // mainDisplay.redrawItemsHTML()
        mainDisplay.redrawItemsSVG()
        
    }
    ,20)
}


var THISISBADx = 0;
var THISISBADy = 0;

function handleMotion(event) {

    //x is left right
    //y is updown
    //z is back froward 
    // console.log("x=",Math.floor(event.accelerationIncludingGravity.x*1000))
    // console.log("y=",Math.floor(event.accelerationIncludingGravity.y*1000))
    // console.log("z=",Math.floor(event.accelerationIncludingGravity.z*1000))
    
    if(event.accelerationIncludingGravity.x > 2){
        THISISBADx = -1;
        THISISBADy = 0;
    }
    else if(event.accelerationIncludingGravity.x < -2){
        THISISBADx = 1;
        THISISBADy = 0;
    }
    else{
        THISISBADx = 0;
        THISISBADy = 1;
    }
    
    // if(event.accelerationIncludingGravity.z > 2){
    //     THISISBADy = -1;
    // }
    // else if(event.accelerationIncludingGravity.z < -2){
    //     THISISBADy = 1;
    // }
    // else{
    //     THISISBADy = 0;
    // }
}
function handleOrientation(event) {


    // if(event.gamma > 10){
    //     THISISBADx = 1;
    // }
    // else if(event.gamma < -10){
    //     THISISBADx = -1;
    // }
    // else{
    //     THISISBADx = 0;
    // }
}

window.addEventListener('deviceorientation', handleOrientation);
window.addEventListener('devicemotion', handleMotion);

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
        this.setupItemsSVG()

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

        displayElement.appendChild(svgArea);
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

    moveItems(){
        this.items = this.items.map( itemData=> {
            itemData.x += Math.floor(itemData.xChange) * itemData.xPolarity;
            itemData.y += Math.floor(itemData.yChange) * itemData.yPolarity;

            itemData.yChange += (0.1*itemData.yPolarity*THISISBADy);
            if(itemData.yChange < 0){
                itemData.yChange = -itemData.yChange;
                itemData.yPolarity = -itemData.yPolarity;
            }
            
            
            itemData.xChange += (0.1*itemData.xPolarity*THISISBADx);
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
                    if(THISISBADy != 0){

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
                if(THISISBADx != 0){
                    itemData.xChange = Math.floor(itemData.xChange * (8+Math.random()) /10)
                    itemData.yChange = Math.floor(itemData.yChange * (8+Math.random()) /10)
                }
                itemData.xPolarity = 1;
            }
            else if(itemData.x >= this.width - itemData.width){
                itemData.x = this.width - itemData.width - 1;
                if(THISISBADx != 0){
                    itemData.xChange = Math.floor(itemData.xChange * (8+Math.random()) /10)
                    itemData.yChange = Math.floor(itemData.yChange * (8+Math.random()) /10)
                }
                itemData.xPolarity = -1;
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

            if(itemData.xPolarity < 0){
                rect.setAttribute("x",itemData.width/4);
            }
            else{
                rect.setAttribute("x",itemData.width/2);
            }
            if(itemData.yPolarity < 0){
                rect.setAttribute("y",itemData.width/4);
            }
            else{
                rect.setAttribute("y",itemData.width/2);
            }
        })
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