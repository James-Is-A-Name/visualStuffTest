

document.addEventListener("DOMContentLoaded",setupDisplayArea);

let mainDisplay;

function setupDisplayArea(){
    mainDisplay = new display();

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
        this.items.push(new visualItem(10,10,30,40));

        this.drawItems()
    }

    drawArea(){
        let displayElement = document.getElementById("displayElement");
        
        speak("testing an error");

        displayElement.style.border = "solid";

        displayElement.style.position = "relative";

        displayElement.style.width = this.width + "px";
        displayElement.style.height = this.height + "px";
    }

    drawItems(){
        let displayElement = document.getElementById("displayElement");

        speak(`items length is ${this.items.length}`)

        this.items.forEach(element => {

            speak(`one item`)

            let anItem = document.createElement("div");

            anItem.style.left = element.x + "px";
            anItem.style.top = element.y + "px";

            anItem.style.width = element.width + "px";
            anItem.style.height = element.height + "px";

            anItem.style.position = "absolute"

            anItem.style.border = "dashed";

            //This will just keep adding things so not the best
            displayElement.appendChild(anItem);
        });
    }
}




class visualItem{
    constructor(x = 100,y = x, width = 10, height = width){

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}