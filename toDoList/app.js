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
    
    del.addEventListener("click", function(){
        li.remove(); 
        console.log("item deleted!");
    });

    li.appendChild(del);
    input.value = "";
});
