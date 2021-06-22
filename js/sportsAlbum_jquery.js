// handle button onclick actions
const url_sports = "https://gist.githubusercontent.com/ooyebade/35bd9e20924a25fdaa1363bc96ce4bfe/raw/4d665167568c19069db79d97667865f2db64ae6c/sports.json";
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

            // after data is appended,
            // start this to listen for clicks on polaroids
            checkClicks();
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
    let container_album = $('<div/>', { class: 'container_album', id: 'sport-album' });

    sports.forEach(sport => {
        sport = sport.sport;

        for (let i = 1; i <= sport["num"]; i++) {

            let polaroid = $('<div/>', { class: 'polaroid', id: `plr-${sport["id"]}0${i}` });
            let figure = $('<figure/>');
            let film_wrapper = $('<div/>', { class: 'film_wrapper' });
            let figcaption = $('<figcaption/>', { class: 'caption' });

            $(film_wrapper).append(
                $('<img>', {
                    id: `img-${sport["id"]}0${i}`,
                    src: `${sport["url"]}`,
                    alt: sport["alt"]
                })
            );

            $(figcaption).append(`<p>${sport["caption"]}</p>`);

            $(figure).append(film_wrapper);
            $(figure).append(figcaption);

            $(polaroid).append(figure);
            $(container_album).append(polaroid);
        }

    });

    $("#photos").append(container_album);
};


function checkClicks() {

    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modalImg");
    let captionText = document.getElementById("caption");

    $("#sport-album").on("click", ".polaroid", function (event) {

        let img = this.querySelector("img");
        let figcaption_p = this.querySelector("figcaption p");

        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerHTML = figcaption_p.innerHTML;

    });

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

};