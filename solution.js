const lib = ["C1","D1 flat","D1","E1 flat","E1","F1","G1 flat","G1","A1 flat","A1","H1 flat","H1","C2","D2 flat","D2","E2 flat","E2","F2","G2 flat","G2","A2 flat","A2","H2 flat","H2"]
const piano = document.querySelector('.keys').children;

const lines = document.querySelector(".target").querySelectorAll(".line");

//const partia = [];
const longPartia = [];
for (let i=0; i<lines.length; i++) {
    //const classes = [];
    for(let j=0; j<lines[i].children.length; j++) {
        const currentClass = lines[i].children[j].classList.value.slice(7);
        //classes.push(currentClass);
        longPartia.push(currentClass);
    }
    //partia.push(classes);
}

//console.log(partia);
//console.log(longPartia);

let i = 0;
const len = longPartia.length;
const interval = setInterval(() => {
    if (i > len) clearInterval(interval);
    const item = longPartia[i];
    console.log(item);
    const index = lib.findIndex(libItem => item === libItem);
    if (index >= 0) piano[index].click();
    i++;
},350);
