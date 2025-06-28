let btn = document.querySelector('button');

btn.addEventListener("click",function(){
    let heading = document.querySelector('h1');
    let randomcolor = rndColor();

    heading.innerText = randomcolor;
    heading.style.color = randomColor;

    let div = document.querySelector("div");
    div.style.backgroundColor = randomcolor;
    console.log("value updated!");

})
function rndColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = `rgb(${r},${g},${b})`;
    return color;
}
