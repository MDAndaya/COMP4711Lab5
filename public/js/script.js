loadArtists();

function loadArtists(search = '') {
    clearUI();

    try {
        let url = 'https://mdandayaartistapp.herokuapp.com/loadartists/' + search;
        fetch(url,
            {
                method: 'GET'
            })
            .then((res) => { return res.json(); })
            .then((artists) => {
                console.log("getting all artists");
                console.log(artists);

                for (var i = 0; i < artists.length; i++) {
                    let a = artists[i];
                    addArtistToUI(a.name, a.about, a.imageurl);
                }
            });
    } catch (error) {
        console.log('error in getArtists()');
    }
}

function clearUI() {
    var container = document.getElementById('flex-container');
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function search() {
    var target = document.getElementById("search-bar").value;
    loadArtists(target);
}

function saveArtist(name, about, imageurl) {

    var a = { "name": name, "about": about, "imageurl": imageurl };

    try {
        let url = 'https://mdandayaartistapp.herokuapp.com/saveartist';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        })
            .then((res) => {
                loadArtists();
            });

    } catch (error) {
        console.log('error in saveArtist()');
    }
}

/**
 * Generates input nodes to create a new artist card.
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
    addButton.setAttribute("onclick", "addButton()");

    addDiv.appendChild(fieldName);
    addDiv.appendChild(fieldAbout);
    addDiv.appendChild(fieldImage);
    addDiv.appendChild(addButton);

    let top = document.getElementById("top").appendChild(addDiv);
}

/**
 * Collects parameters for artist card and sends to addArtistToUI() function.
 */
function addButton() {
    let name = document.getElementById("field-name").value;
    let about = document.getElementById("field-about").value;
    let imageurl = document.getElementById("field-image").value;

    if (name != "" &&
        about != "" &&
        imageurl != "") {

        // Adds artists to list.
        saveArtist(name, about, imageurl);
        document.querySelector('#add-div').remove();
    }
}

/**
 * Adds the artist to the html page and calls the saveArtists() function.
 * @param {*} name 
 * @param {*} about 
 * @param {*} imageurl 
 */
function addArtistToUI(name, about, imageurl) {

    let card = document.createElement("div");
    card.setAttribute("class", "flex-item hover");

    let image = document.createElement("img");
    image.setAttribute("src", imageurl);

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
    console.log(card);
}

/**
 * Deletes node from JSON and reloads.
 * @param {*} child 
 */
function deleteNode(child) {
    var parent = child.parentNode;
    var imageurl = parent.children[0].getAttributeNode("src").value;
    var name = parent.children[1].children[0].textContent;
    var about = parent.children[1].children[2].textContent;

    var a = { "name": name, "about": about, "imageurl": imageurl };

    try {
        let url = 'https://mdandayaartistapp.herokuapp.com/deleteartist';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(a)
        })
            .then((res) => {
                console.log(res);
                loadArtists();
            });

    } catch (error) {
        console.log('error in saveArtist()');
    }
}
