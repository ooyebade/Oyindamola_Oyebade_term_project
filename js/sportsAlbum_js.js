// handle button onclick actions
const url_sports = "https://gist.githubusercontent.com/ooyebade/35bd9e20924a25fdaa1363bc96ce4bfe/raw/8f05415a4930dc8c21f987cb6536525bacaff96f/sports.json";
makeRequest(url_sports);

// takes url, creates XMLHttpRequest to fetch data
function makeRequest(url_sports) {

    let xmlhttp = new XMLHttpRequest();

    if (!xmlhttp) {
        alert("Cannot create an XMLHTTP instance");
        return false;
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let dataObj = JSON.parse(this.responseText);
            let sports = dataObj.sports;
            appendData(sports);
        }
    };
    xmlhttp.open("GET", url_sports, true);
    xmlhttp.send();
}

// append data fetched in table format
function appendData(data) {

    // data passed in
    const sports = data;

    // create album
    let container_album = document.createElement('div');
    container_album.setAttribute("class", "container_album");
    container_album.setAttribute("id", "sports-album");

    sports.forEach(sport => {
        sport = sport.sport;

        for (let i = 1; i <= sport["num"]; i++) {

            let polaroid = document.createElement('div');
            polaroid.setAttribute("class", "polaroid");
            polaroid.setAttribute("id", `plr-${sport["id"]}0${i}`);

            let figure = document.createElement('figure');

            let film_wrapper = document.createElement('div');
            film_wrapper.setAttribute("class", "film_wrapper");

            let img = document.createElement('img');
            img.setAttribute("id", `img-${sport["id"]}0${i}`);
            img.setAttribute("src", `${sport["url"]}`);
            img.setAttribute("alt", sport["alt"]);

            film_wrapper.appendChild(img);

            let figcaption = document.createElement('figcaption');
            figcaption.setAttribute("class", "caption");

            let p = document.createElement('p');
            let node = document.createTextNode(sport["caption"]);
            p.appendChild(node);

            figcaption.appendChild(p);

            figure.appendChild(film_wrapper);
            figure.appendChild(figcaption);

            polaroid.appendChild(figure);
            container_album.appendChild(polaroid);
        }

    });

    document.getElementById("photos").appendChild(container_album);
};
