function createGallery(jsonData) {
    const topNode = document.getElementsByClassName("content")[0]
    let rootDiv = document.createElement("div");
    rootDiv.className = "root"
    rootDiv.id = "root"

    createVersionDiv(jsonData, rootDiv);

    topNode.append(rootDiv)
}

function createVersionDiv(jsonData, rootDiv) {
    //const characterName = jsonData[0]["v1.0"]["banner_1"][0]
    //const characterData = jsonData[1][characterName]
    //console.log(characterName)
    //console.log(characterData)
    //console.info(jsonData)
    //console.info(jsonData[0])

    for (let major = 1; major <= 3; major++) {
        const {collapseButton, versionDiv} = createHtmlElements(major);

        for (let minor = 0; minor <= 8; minor++) {
            const version = "v" + major + "." + minor;
            //console.log(version);
            const versionData = jsonData[0][version]
            if (versionData !== undefined) {
                const banner1 = versionData["banner_1"];
                const banner2 = versionData["banner_2"];
                //console.info(banner1)
                //console.info(banner2)

                createBannerData(jsonData, banner1, banner2, major, minor, versionDiv);
            }
        }
        rootDiv.append(collapseButton);
        rootDiv.append(versionDiv);
    }
}

function createHtmlElements(versionNumber) {
    const collapseButton = document.createElement("button");
    collapseButton.className = "button text";
    collapseButton.setAttribute("data-bs-toggle", "collapse")
    collapseButton.setAttribute("data-bs-target", "#" + versionNumber)
    collapseButton.innerHTML = "Banners during version " + versionNumber + ".X"

    const versionDiv = document.createElement("div");
    versionDiv.id = versionNumber;
    versionDiv.className = "major collapse";
    versionDiv.setAttribute("data-bs-parent", "#root")

    return {collapseButton, versionDiv};
}



function createBannerData(jsonData, banner1, banner2, majorVersionNumber, minorVersionNumber, versionDiv) {

    const version = "v" + majorVersionNumber + "." + minorVersionNumber;
    let minorDiv = document.createElement("div");
    minorDiv.id = version
    minorDiv.className = "minor";
    //console.info("version-" + majorVersionNumber + "_" + minorVersionNumber)

    createVersionHeader(version, minorDiv)
    createCharacterData(jsonData, banner1, minorDiv, version, 1);
    createCharacterData(jsonData, banner2, minorDiv, version, 2);

    versionDiv.append(minorDiv);
}

function createVersionHeader(version, minorDiv) {
    const versionDiv = document.createElement("div")
    const versionText = document.createElement("p")
    versionText.innerText = version;
    versionText.className = "text rotated"
    versionDiv.className = "version"

    versionDiv.append(versionText)
    minorDiv.append(versionDiv)
}
function createCharacterData(jsonData, characters, minorDiv, version, bannerNumber) {
    const bannerDiv = document.createElement("div")
    bannerDiv.className = "banner banner" + bannerNumber;

    const featuredDiv = document.createElement("div");
    featuredDiv.className = "character featured";
    const rerunDiv = document.createElement("div");
    rerunDiv.className = "character rerun";
    const fourStarDiv = document.createElement("div");
    fourStarDiv.className = "character fourStar";

    for (const character of characters) {
        const currentCharacter = jsonData[1][character]

        createBannerType(currentCharacter, version, bannerDiv, featuredDiv, rerunDiv, fourStarDiv)

    }
    minorDiv.append(bannerDiv);
}

function createBannerType(characterData, version, bannerDiv, featuredDiv, rerunDiv, fourStarDiv) {

    const rarity = characterData["rarity"];
    const initialVersion = characterData["firstBanner"];

    if (rarity === 5) {
        if (initialVersion === version) {
            featuredDiv.append(createCharacterCard(characterData, rarity));
            bannerDiv.append(featuredDiv);
        } else {
            rerunDiv.append(createCharacterCard(characterData, rarity));
            bannerDiv.append(rerunDiv);
        }
    } else if (rarity === 4) {
        fourStarDiv.append(createCharacterCard(characterData, rarity));
        bannerDiv.append(fourStarDiv);
    } else {
        console.warn("Something went wrong, rarity=" + rarity)
        console.warn(characterData)
    }

}

function createCharacterCard(character, rarity) {
    const loc_5star = "images/characters/5_stars/" + character.name + ".webp";
    const loc_4star = "images/characters/4_stars/" + character.name + ".webp";
    const imgDiv = document.createElement("div");
    imgDiv.className = "characterCard rarity-" + rarity;

    let img = document.createElement("img");
    img.className = "characterIcon"
    if (rarity === 4) {
        img.src = loc_4star;
    } else if (rarity === 5) {
        img.src = loc_5star;
    } else {
        console.log(rarity);
    }

    img.alt = character["name"];

    imgDiv.append(img);
    return imgDiv;
}