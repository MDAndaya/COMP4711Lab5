
// localStorage.clear();

/**
 * Pull array of artists from localstorage.
 */
if (artists = JSON.parse(localStorage.getItem('artists'))) {
    for (var i = 0; i < artists.length; i++) {
        let a = artists[i];
        addArtist(a.name, a.about, a.imageurl);
    }
}

clearSearch();

/**
 * Creates input boxes and input button.
 */
function createArtistParams() {

    if (document.querySelector('#add-div') != null) {
        document.querySelector('#add-div').remove();
        return;
    }

    let addDiv = document.createElement("div");
    addDiv.setAttribute("id", "add-div");

    let fieldName = document.createElement("input");
    fieldName.setAttribute("id", "field-name");
    fieldName.setAttribute("placeholder", "Artist Name")
    fieldName.setAttribute("maxlength", "40")

    let fieldAbout = document.createElement("input");
    fieldAbout.setAttribute("id", "field-about");
    fieldAbout.setAttribute("placeholder", "About Artist")
    fieldAbout.setAttribute("maxlength", "40");

    let fieldImage = document.createElement("input");
    fieldImage.setAttribute("id", "field-image");
    fieldImage.setAttribute("placeholder", "Image URL")

    let addButton = document.createElement("input");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "Add")
    addButton.setAttribute("class", "add-button");
    addButton.setAttribute("onclick", "addArtistButton()");

    addDiv.appendChild(fieldName);
    addDiv.appendChild(fieldAbout);
    addDiv.appendChild(fieldImage);
    addDiv.appendChild(addButton);

    let top = document.getElementById("top").appendChild(addDiv);
}

/**
 * Adds artist to artists array saved to local storage and creates card to
 * add to container.
 */
function addArtistButton() {
    let name = document.getElementById("field-name").value;
    let about = document.getElementById("field-about").value;
    let imageurl = document.getElementById("field-image").value;

    if (name != "" &&
        about != "" &&
        imageurl != "") {

        // Adds artists to list.
        addArtist(name, about, imageurl);

        document.querySelector('#add-div').remove();
    }
}

/**
 * 
 * @param {Name of artist} name 
 * @param {About the artist} about 
 * @param {URL for artist image} imageurl 
 */
function addArtist(name, about, imageurl) {

    let card = document.createElement("div");
    card.setAttribute("class", "flex-item hover");

    let image = document.createElement("img");
    image.setAttribute("src", imageurl);
    image.setAttribute("onerror", "this.onerror=null;this.src='images/silhouette.jpg';")

    let description = document.createElement("div");
    description.setAttribute("class", "description");

    let boldnode = document.createElement("strong");

    let nametext = document.createTextNode(name);

    let br = document.createElement("br");

    let span = document.createElement("span");

    let abouttext = document.createTextNode(about);

    let delButton = document.createElement("input");
    delButton.setAttribute("class", "del-button");
    delButton.setAttribute("type", "button");
    delButton.setAttribute("value", "delete");
    delButton.setAttribute("onclick", "deleteNode(this)");

    span.appendChild(abouttext);
    boldnode.appendChild(nametext);
    description.appendChild(boldnode);
    description.appendChild(br);
    description.appendChild(span);
    card.appendChild(image);
    card.appendChild(description);
    card.appendChild(delButton);

    let container = document.getElementById("flex-container").appendChild(card);
    saveAllArtists();
}


function saveAllArtists() {

    // element to search through
    let element = document.getElementById("flex-container");

    let artists = [];

    var children = element.childNodes;
    for (let i = 1; i < children.length; i++) {

        let item = children[i];
        let name;
        let about;
        let imageurl;

        name = item.getElementsByClassName("description")[0].getElementsByTagName("strong")[0].textContent;
        about = item.getElementsByClassName("description")[0].getElementsByTagName("span")[0].textContent;
        imageurl = item.getElementsByTagName("img")[0].getAttributeNode("src").value;

        let a = { "name": name, "about": about, "imageurl": imageurl };
        artists.push(a);
    }

    localStorage.setItem('artists', JSON.stringify(artists));
}

function deleteNode(child) {
    child.parentNode.remove();
    saveAllArtists();
}

function search() {

    // element to search through
    let element = document.getElementById("flex-container");

    // name to search for
    let targetName = document.getElementById("search-bar").value;

    // if target is empty, clear all filters
    if (targetName === "") {
        clearSearch();
        return;
    }
    var children = element.childNodes;
    for (let i = 1; i < children.length; i++) {

        let item = children[i];

        let name;

        name = item.getElementsByClassName("description")[0].getElementsByTagName("strong")[0].textContent;

        console.log("target name: " + targetName + ", " + "found: " + name);

        if (name.toLowerCase().includes(targetName.toLowerCase())) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    }
}

function clearSearch() {

    console.log("clearing");

    // element to search through
    let element = document.getElementById("flex-container");

    var children = element.childNodes;
    for (let i = 1; i < children.length; i++) {
        let item = children[i];
        item.style.display = "flex";
    }
}