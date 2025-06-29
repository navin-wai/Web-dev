const button = document.getElementById("getFactBtn");
const factParagraph = document.getElementById("fact");

button.addEventListener("click", function () {
    const url = "https://catfact.ninja/fact";

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            factParagraph.innerText = data.fact;
        })
        .catch((err) => {
            factParagraph.innerText = "Failed to load fact 😿";
            console.error(err);
        });
});