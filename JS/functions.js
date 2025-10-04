function createGallery(jsonData) {
    const topNode = document.getElementsByClassName("content")[0]
    let rootDiv = document.createElement("div");
    rootDiv.className = "root"
    rootDiv.id = "root"

    createVersionDiv(jsonData, rootDiv);

    topNode.append(rootDiv)

    createMapLegend();

    console.info(window.screen.width)
    console.info(window.screen.height)
}

function createVersionDiv(jsonData, rootDiv) {
    //const characterName = jsonData[0]["v1.0"]["banner_1"][0]
    //const characterData = jsonData[1][characterName]
    //console.log(characterName)
    //console.log(characterData)
    //console.info(jsonData)
    console.info(jsonData[0])

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

            try {
                const version = "v" + major + "." + minor + "_extra";
                if (jsonData[0][version]) {
                    //console.log(Special banner: version);
                    const versionData = jsonData[0][version]
                    const specialBanner = versionData["banner_1"];
                    createBannerData(jsonData, specialBanner, null, major, minor, versionDiv);
                }
            } catch (error) {
                console.log("No special banner found")
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

    let version = "v" + majorVersionNumber + "." + minorVersionNumber;
    if (banner2 == null) {
        version = version + "_extra";
    }
    let minorDiv = document.createElement("div");
    minorDiv.id = version
    minorDiv.className = "minor";
    //console.info("version-" + majorVersionNumber + "_" + minorVersionNumber)

    createVersionHeader(version, minorDiv)
    createCharacterData(jsonData, banner1, minorDiv, version, 1);
    if (banner2 != null) {
        createCharacterData(jsonData, banner2, minorDiv, version, 2);
    }

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
        console.warn("Something went wrong, rarity = " + rarity)
        console.warn(characterData)
    }
}

function createCharacterCard(character, rarity) {
    const loc_5star = "images/characters/5_stars/" + character.name + ".webp";
    const loc_4star = "images/characters/4_stars/" + character.name + ".webp";
    const imgDiv = document.createElement("div");
    imgDiv.className = "characterCard rarity-" + rarity;
    if(character.firstBanner.indexOf("_extra")>0){
        //console.warn("event character detected")
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

    for (let [key, value] of rarityList){

        console.info(key + " " + value)
        const entryDiv = document.createElement("div");
        entryDiv.className= "entryDiv"
        const colorCodeDiv = document.createElement("div");
        colorCodeDiv.className="legend " + key
        const explanationDiv = document.createElement("p");
        explanationDiv.innerText= value

        entryDiv.appendChild(colorCodeDiv);
        entryDiv.appendChild(explanationDiv);

        backgroundDiv.appendChild(entryDiv);
    }

    anchorDiv.appendChild(backgroundDiv);
}