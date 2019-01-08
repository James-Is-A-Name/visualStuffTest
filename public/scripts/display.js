

document.addEventListener("DOMContentLoaded",setupDisplayArea);

let mainDisplay;

function setupDisplayArea(){
    mainDisplay = new display();

    let loop = setInterval(() => {
        mainDisplay.moveItems()
        mainDisplay.redrawItemsHTML()
    }
    ,20)
}

function speak(message){
    
    const err = new Error().stack

    console.log(err.split("\n")[2])
    
    console.log(message)
}

class display{
    constructor(){
        this.width = (document.documentElement.clientWidth - 30) || 100;
        this.height = (document.documentElement.clientHeight - 30) || 100;

        this.drawArea();

        this.items = [];
        this.items.push(new visualItem(10,10,30,40,this.items.length));
        this.items.push(new visualItem(101,110,60,40,this.items.length));
        this.items.push(new visualItem(103,210,30,40,this.items.length));
        this.items.push(new visualItem(120,310,30,40,this.items.length));
        this.items.push(new visualItem(410,410,30,40,this.items.length));

        [1,2,3,4,5,6,7,8,9,10,11,12,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1].forEach( (val,i)=> {
            this.items.push(new visualItem(10*val,10+i*5,30+val,50-val,this.items.length));
        })

        this.setupItemsHTML()
    }

    drawArea(){
        let displayElement = document.getElementById("displayElement");
        
        speak("testing an error");

        displayElement.style.border = "solid";

        displayElement.style.position = "relative";

        displayElement.style.width = this.width + "px";
        displayElement.style.height = this.height + "px";
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
            itemData.x += itemData.xChange * itemData.xPolarity;
            itemData.y += itemData.yChange * itemData.yPolarity;

            if(itemData.y < 0){
                itemData.y = 0;
                itemData.yPolarity = 1;
            }
            else if(itemData.y >= this.height - itemData.height){

                itemData.y = this.height - itemData.height - 1;
                itemData.yPolarity = -1;
                
                if(Math.random() > 0.5){
                    itemData.xChange = Math.floor(Math.random() * 10)
                    itemData.yChange = Math.floor(Math.random() * 10 + 1)

                    if(Math.random() > 0.90){
                        itemData.xPolarity *= -1;
                    }
                }
            }

            if(itemData.x < 0){
                itemData.x = 0;
                itemData.xPolarity = 1;
            }
            else if(itemData.x >= this.width - itemData.width){
                itemData.x = this.width - itemData.width - 1;
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