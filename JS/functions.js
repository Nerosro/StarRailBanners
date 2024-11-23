function createGallery() {

    const characterArray = ["Firefly", "Sparkle", "Agaea"]
    let topDiv = document.createElement("div");
    topDiv.id="root"

    for(const character in characterArray) {
        topDiv.append(createCharacterCard(characterArray));
    }

    return topDiv;
}

function createCharacterCard(characterName) {
    const loc_5star = "images/characters/5_stars/" + characterName + ".webp";

    let img = document.createElement("img");
    img.src=loc_5star;
    img.alt=characterName;
    img.width=140*2;
    img.height=189*2;
    img.className="rarity-5";

    return img;
}