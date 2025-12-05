function createGallery(jsonData) {
    const topNode = document.getElementsByClassName("content")[0]
    let rootDiv = document.createElement("div");
    rootDiv.className = "root"
    rootDiv.id = "root"

    createVersionDiv(jsonData, rootDiv);

    topNode.append(rootDiv)

    createMapLegend();
    // console.info(window.screen.width)
    // console.info(window.screen.height)
}

function createVersionDiv(jsonData, rootDiv) {
    // console.info(jsonData) // {BannerHistory, CharacterData, Locations}
    // console.info(jsonData[0])
    // console.info(jsonData[1])

    const arrayVersions = jsonData[0]
    const characterJsonData = jsonData[1]
    const locationData = jsonData[2]

    for (const major in arrayVersions) {
        const majorVersion = arrayVersions[major]
        // console.log(majorVersion)
        const {collapseButton, versionDiv} = createHtmlElements(major, locationData);

        for (const version in majorVersion) {
            // console.log(version)
            const versionData = majorVersion[version]
            // console.log(versionData)

            if (versionData !== undefined) {
                createBannerData(characterJsonData, version, versionDiv, versionData);
            }
        }
        rootDiv.append(collapseButton);
        rootDiv.append(versionDiv);
    }
}

function createHtmlElements(versionNumber, locationData) {
    const collapseButton = document.createElement("button");
    collapseButton.className = "button text";
    collapseButton.setAttribute("data-bs-toggle", "collapse")
    collapseButton.setAttribute("data-bs-target", "#" + versionNumber)
    collapseButton.innerHTML = locationData[versionNumber]

    const versionDiv = document.createElement("div");
    versionDiv.id = versionNumber;
    versionDiv.className = "major collapse";
    versionDiv.setAttribute("data-bs-parent", "#root")

    return {collapseButton, versionDiv};
}

function createBannerData(charactersData, version, versionDiv, characterList) {
    // console.log(characterList)

    let minorDiv = document.createElement("div");
    minorDiv.id = version
    minorDiv.className = "minor";
    //console.info("version-" + majorVersionNumber + "_" + minorVersionNumber)

    createVersionHeader(version, minorDiv)
    createCharacterData(charactersData, minorDiv, version, characterList);

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

function createCharacterData(charactersData, minorDiv, version, characterList) {
    // console.log(characterList)
    for (let banner = 0; banner < characterList.length; banner++) {
        // console.log(banner)
        const bannerDiv = document.createElement("div")
        bannerDiv.className = "banner banner" + banner;

        const featuredDiv = document.createElement("div");
        featuredDiv.className = "character featured";
        bannerDiv.append(featuredDiv);

        const rerunDiv = document.createElement("div");
        rerunDiv.className = "character rerun";
        bannerDiv.append(rerunDiv);

        const fourStarDiv = document.createElement("div");
        fourStarDiv.className = "character fourStar";
        bannerDiv.append(fourStarDiv);

        for (const character of characterList[banner]) {
            // console.log(character)
            const currentCharacter = charactersData[character]
            createBannerType(currentCharacter, version, bannerDiv)
        }
        minorDiv.append(bannerDiv);
    }
}

function createBannerType(characterData, version, bannerDiv) {
    const featuredDiv = bannerDiv.childNodes[0]
    const rerunDiv = bannerDiv.childNodes[1]
    const fourStarDiv = bannerDiv.childNodes[2]

    const rarity = characterData["rarity"];
    const initialVersion = characterData["firstBanner"];

    if (rarity === 5) {
        if (initialVersion === version) {
            featuredDiv.append(createCharacterCard(characterData, rarity));
        } else {
            rerunDiv.append(createCharacterCard(characterData, rarity));
        }
    } else if (rarity === 4) {
        fourStarDiv.append(createCharacterCard(characterData, rarity));
    } else {
        console.warn("Something went wrong, rarity = " + rarity)
        console.warn(characterData)
    }
}

function createCharacterCard(character, rarity) {
    const loc_5star = "images/characters/5_stars/" + character.name + ".webp";
    const loc_4star = "images/characters/4_stars/" + character.name + ".webp";
    const imgDiv = document.createElement("div");
    imgDiv.className = "characterCard rarity-" + rarity;
    if (character.firstBanner.indexOf("Collab") > 0) {
        // console.warn("Special collaboration banner character detected")
        imgDiv.className = "characterCard rarity-" + rarity + "-special";
    }

    const characterDiv = document.createElement("div");
    characterDiv.className = "character-Image";

    let imgCharacter = document.createElement("img");
    imgCharacter.className = "characterIcon"
    if (rarity === 4) {
        imgCharacter.src = loc_4star;
    } else if (rarity === 5) {
        imgCharacter.src = loc_5star;
    } else {
        console.log(rarity);
    }
    imgCharacter.alt = character["name"];

    let iconDiv = createIcons(character);
    characterDiv.append(imgCharacter);

    imgDiv.append(characterDiv);
    imgDiv.append(iconDiv);
    return imgDiv;
}

function createIcons(character) {
    const path = "images/paths/" + character.path + ".webp"
    const element = "images/elements/" + character.element + ".webp"

    const iconDiv = document.createElement("div");
    iconDiv.className = "floating-icon";

    let iconPath = document.createElement("img");
    iconPath.className = "pathIcon"
    iconPath.src = path;

    let iconElement = document.createElement("img");
    iconElement.className = "elementIcon"
    iconElement.src = element;

    iconDiv.append(iconElement);
    iconDiv.append(iconPath);
    return iconDiv;
}

function createMapLegend() {
    const rarityList = new Map([
        ["rarity-5", "New 5-star character, available the first time"],
        ["rerun", "Returning 5-star character"],
        ["rarity-5-special", "Special characters, reserved for collab events. Characters will likely not return"],
        ["rarity-4", "4-star characters featured with the 5-star character banner"]
    ]);

    const anchorDiv = document.getElementsByClassName("mapLegend")[0]
    const backgroundDiv = document.createElement("div");

    for (let [key, value] of rarityList) {

        // console.info(key + " " + value)
        const entryDiv = document.createElement("div");
        entryDiv.className = "entryDiv"
        const colorCodeDiv = document.createElement("div");
        colorCodeDiv.className = "legend " + key
        const explanationDiv = document.createElement("p");
        explanationDiv.innerText = value

        entryDiv.appendChild(colorCodeDiv);
        entryDiv.appendChild(explanationDiv);

        backgroundDiv.appendChild(entryDiv);
    }

    anchorDiv.appendChild(backgroundDiv);
}