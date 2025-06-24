let input = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");

btn.addEventListener("click", function(){
    let li = document.createElement("li");
    li.innerText = input.value;
    ul.appendChild(li);

    let del = document.createElement("button");
    del.innerText = "Delete";
    del.classList.add("delete");

    li.appendChild(del);
    console.log(input.value);
    input.value = "";
})

let delBtns = document.querySelectorAll(".delete");
for(delBtn of delBtns ){
    delBtn.addEventListener("click", function(){
        console.log("intem deleted!");
    })
}