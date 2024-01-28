const tileContainer = document.querySelector(".tiles");
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors]
const tileCount = colorsPicklist.length;

console.log(colorsPicklist);

let revealedCount = 0;
let activeTile = null;
let awatingEndofMove = false;

function buildTile(color) {
    const element = document.createElement("div")
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-reveal", "false");
    element.addEventListener("click", () => {
        const revealed = element.getAttribute("data-revealed");
        if (
            awatingEndofMove 
            || revealed == "true"
            || element == activeTile
            )   {
            return;
        }

        element.style.backgroundColor = color;

        if (!activeTile){
            activeTile = element;
            return;
        }

        const colortoMatch = activeTile.getAttribute("data-color");
        if (colortoMatch == color){
            activeTile.setAttribute("data-revealed", "true")
            element.setAttribute("data-revealed", "true")
            activeTile = null;
            awatingEndofMove = false;
            revealedCount += 2;
            if (revealedCount == tileCount){
                alert("You Win!, Refresh to play again.");
            }
            return;
        }

        awatingEndofMove = true;

        setTimeout(() =>{
            element.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;
            awatingEndofMove = false;
            activeTile = null;
        }, 1000)
    });
    return element;
}

for (let i = 0; i < tileCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[randomIndex];
    const tile = buildTile(color);
    colorsPicklist.splice(randomIndex, 1);
    tileContainer.appendChild(tile)
    
}