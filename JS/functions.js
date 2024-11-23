function createGallery() {

    const topNode = document.getElementsByClassName("content")[0]
    const characterArray = ["Firefly", "Sparkle", "Agaea"]
    let rootDiv = document.createElement("div");
    rootDiv.id = "root card";

    for (const character in characterArray) {
        const span = document.createElement("span")
        span.append(
            createCharacterCard(characterArray[character])
        );
        rootDiv.append(span)
    }

    topNode.append(rootDiv);
}

function createCharacterCard(characterName) {
    const loc_5star = "images/characters/5_stars/" + characterName + ".webp";
    const imgDiv = document.createElement("div");
    imgDiv.className = "rarity-5";

    let img = document.createElement("img");
    img.src = loc_5star;
    img.alt = characterName;
    img.width = 140 * 2;
    img.height = 189 * 2;

    imgDiv.append(img);
    return imgDiv;
}