function createGallery(jsonData) {
    const topNode = document.getElementsByClassName("content")[0]
    let rootDiv = document.createElement("div");
    rootDiv.id = "root";
    rootDiv.className = "card"

    const characterData = parseJSONObject(jsonData)

    let majorVersionNumber = Object.keys(characterData);

    for (let i = 0; i < majorVersionNumber.length; i++) {
        let characters = characterData[majorVersionNumber[i]];
        let versionDiv = document.createElement("div");
        versionDiv.id = "version_" + majorVersionNumber[i];

        for (let j = 0; j < characters.length; j++) {
            const span = document.createElement("span")
            span.append(
                createCharacterCard(characters[j])
            );
            versionDiv.append(span)
        }
        rootDiv.append(versionDiv);
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

/*Will return an object that looks like below
        {
            "1":[
                character1,
                character2,
                character3,
                etc
            ],
            "2":[
                character1,
                character2,
                character3,
                etc
            ]
        }
    */
function parseJSONObject(json) {
    let versionObject = {};
    for (let i = 0; i < json.bannerHistory.length; i++) {
        let majorVersion = json.bannerHistory[i].version.charAt(0);
        if (versionObject[majorVersion] == null || versionObject[majorVersion] === undefined)
            versionObject[majorVersion] = [];

        let characters = json.bannerHistory[i].characters;

        for (let j = 0; j < characters.length; j++) {
            if (characters[j].featured !== undefined && characters[j].featured != null) {
                versionObject[majorVersion].push(characters[j].featured)
            }
            // let rerun = characters[j].rerun;
            // if (rerun != undefined && rerun != null){
            //     versionObject[majorVersion].push(...rerun);
            // }
        }
    }
    return versionObject;
}
