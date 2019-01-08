

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
                let aCircle = document.createElementNS(svgNs,"circle");
                
                aCircle.setAttributeNS(null,"id","svgItem-" + itemData.itemId);
                aCircle.setAttributeNS(null,"cx",itemData.x);
                aCircle.setAttributeNS(null,"cy",itemData.y);
                aCircle.setAttributeNS(null,"r",itemData.width);

                aCircle.setAttributeNS(null,"fill","red");
                aCircle.setAttributeNS(null,"stroke","black");

                //This will just keep adding things so not the best
                svgDisplayElement.appendChild(aCircle);
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
    
    redrawItemsSVG(){
        let displayElement = document.getElementById("svgArea");

        // let anSVGCircle = document.getElementById("svgItem-1");

        // if(anSVGCircle){
        //     console.log("rect is ",anSVGCircle.cx.animVal.value)

        //     anSVGCircle.setAttribute("cx", anSVGCircle.cx.animVal.value + 1);
        // }

        let childElemnts = displayElement.childNodes;


        childElemnts.forEach( itemInfo =>{
            let id = itemInfo.id
            
            let item = document.getElementById(id);
            
            let itemData = this.items[id.substring(8)];
            

            item.setAttribute("cx" ,itemData.x);
            item.setAttribute("cy", itemData.y);
            item.setAttribute("r", itemData.width);
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