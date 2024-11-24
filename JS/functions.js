function createGallery(jsonData) {
    const topNode = document.getElementsByClassName("content")[0]
    let rootDiv = document.createElement("div");
    rootDiv.className = "root"

    //console.log("minor version: " + jsonData[0]["banners"][0]["minor_version"])
    //console.log(jsonData[0]["banners"][3]["characters"][0]["featured"])

    createVersionDiv(jsonData, rootDiv);

    topNode.append(rootDiv)
}

function createVersionDiv(jsonData, rootDiv) {
    for (const entry of jsonData) {

        const majorVersionNumber = entry["major_version"];
        const banners = entry["banners"];

        const version = "version-" + majorVersionNumber + "x";
        //console.log("major version: " + version)

        let versionDiv = document.createElement("div");
        versionDiv.id = version;
        versionDiv.className = "major";

        createBannerData(banners, majorVersionNumber, versionDiv);

        rootDiv.append(versionDiv);
    }
}

function createBannerData(banners, majorVersionNumber, versionDiv) {
    for (const entry of banners) {
        let minorDiv = document.createElement("div");
        minorDiv.id = "version-" + majorVersionNumber + "_" + entry["minor_version"];
        minorDiv.className = "minor";
        console.info("version-" + majorVersionNumber + "_" + entry["minor_version"])

        createCharacterData(entry, minorDiv);

        versionDiv.append(minorDiv);
    }
}

function createCharacterData(entry, minorDiv) {
    for (const characters of entry["characters"]) {
        const featuredCharacter = characters["featured"]
        const rerunCharacter = characters["rerun"]
        const fourStarCharacter = characters["featured4"]

        const featuredDiv = document.createElement("div");
        featuredDiv.className = "character featured";
        const rerunDiv = document.createElement("div");
        rerunDiv.className = "character rerun";

        const fourStarDiv = document.createElement("div");
        fourStarDiv.className = "character";

        if (featuredCharacter != null) {
            featuredDiv.append(createCharacterCard(featuredCharacter, 5));
            minorDiv.append(featuredDiv)
        }

        if (rerunCharacter != null) {
            for (const character of rerunCharacter) {
                console.info(character)
                rerunDiv.append(createCharacterCard(character, 5));
            }
            minorDiv.append(rerunDiv)
        }

        if (fourStarCharacter != null) {
            for (const character of fourStarCharacter) {
                //console.info(character)
                fourStarDiv.append(createCharacterCard(character, 4))
                minorDiv.append(fourStarDiv)
            }
        }
    }
}

function createCharacterCard(characterName, rarity) {
    const loc_5star = "images/characters/5_stars/" + characterName + ".webp";
    const loc_4star = "images/characters/4_stars/" + characterName + ".webp";
    const imgDiv = document.createElement("div");
    imgDiv.className = "characterCard rarity-" + rarity;

    let img = document.createElement("img");
    img.className="characterIcon"
    if (rarity === 4) {
        img.src = loc_4star;
    } else if (rarity === 5) {
        img.src = loc_5star;
    } else {
        console.log(rarity);
    }

    img.alt = characterName;

    imgDiv.append(img);
    return imgDiv;
}