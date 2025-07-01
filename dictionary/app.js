let btn = document.querySelector("button");
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
btn.addEventListener("click", async () => {
    let letter = document.querySelector("input").value;
    let h2 = document.querySelector("h2");

    h2.innerText = `Your Word : ${letter}`;

    let meaning = await word(letter);
    console.log(meaning);

    let h3 = document.querySelector("h3");
    h3.innerText = `Phonetic: ${meaning.phonetic}\n\n` +
        meaning.definitions.map((def, i) => `Definition ${i + 1}: ${def}`).join('\n') +
        `\n\nSynonyms: ${meaning.synonyms.join(", ") || "None"}` +
        `\nAntonyms: ${meaning.antonyms.join(", ") || "None"}`;

    let audioUrl = meaning.audio;
    if (audioUrl) {

        let audioBtn = document.querySelector("#play-audio");

        audioBtn.style.display = "inline-block";
        audioBtn.onclick = () => {
            let audio = new Audio(audioUrl);
            audio.play();
        };
    } else {
        document.querySelector("#play-audio").style.display = "none"; // Hide if no audio
    }

})
let name = "apple";
async function word(letter) {
    try {

        let res = await axios.get(url + letter);
        let data = res.data[0];

        let definitions = data.meanings[0].definitions.slice(0, 2).map(def => def.definition);
        let synonyms = data.meanings[0].definitions[0].synonyms || [];
        let antonyms = data.meanings[0].definitions[0].antonyms || [];
        let audio = data.phonetics[0]?.audio || "";
        let phonetic = data.phonetics[0]?.text || "Not available";

        return {
            definitions,
            synonyms,
            antonyms,
            phonetic,
            audio,
        };

    } catch (err) {
        console.log(err);
        return {
            definitions: [],
            synonyms: [],
            antonyms: [],
            phonetic: "Not available"
        };
    }
}
