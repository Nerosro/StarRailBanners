function createGallery() {

}

function createCharacterCard(characterName) {
    const loc_5star = "/../images/characters/5_stars/" + characterName + ".webp";

    let topDiv = document.createElement("div");
    let img = document.createElement("img");
    img.src=loc_5star;
    img.alt=characterName;
    img.x=140*2;
    img.y=189*2;

    topDiv.append(img);
    return topDiv
}