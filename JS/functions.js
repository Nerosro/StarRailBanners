function createGallery() {

}

function createCharacterCard(characterName) {
    const root = document.getElementById("root");
    const loc_5star = "images/characters/5_stars/" + characterName + ".webp";

    let topDiv = document.createElement("div");
    let img = document.createElement("img");
    img.src=loc_5star;
    img.alt=characterName;
    img.width=140*2;
    img.height=189*2;
    img.className=".rarity-5";

    topDiv.append(img);
    root.append(topDiv);
}