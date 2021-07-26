// function Ajax 
function ajaxGet(url, callback) {

    // création d'une requête HTTP
    var req = new XMLHttpRequest();

    // requête HTTP get asynchrone
    req.open("GET", url);
    
    // losque la requête a chargé
    req.addEventListener("load", function () {

        // si le code du status se trouve entre 200 et 400
        if (req.status >= 200 && req.status < 400) {

            // appel du callback
            callback(req.responseText);
        } else {
            // si pas alors message d'erreur dans la console 
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    // si la requête n'a pas pu charger 
    req.addEventListener("error", function () {

        // envoi d'un message d'erreur dans la console
        console.error("Erreur réseau avec l'URL " + url);
    });

    // envoi de la requête
    req.send(null);
}

