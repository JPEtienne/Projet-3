// objet Carte, map google, marqueurs, event
var Carte = {
    lyon: { lat: 45.75, lng: 4.85 }, // latttitude longitude de la carte
    iconStatus: "img/vert.png", // icône de base marqueur
    tableauMarqueur: [], // sert à insérer les coordonnées des différents marqueurs
    jcDecaux: "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c8f49b92a626dac196c909de6728b340d53cd6ae", // Api des données stations vélo
    mcOptions: { // sert à modifier l'apparence des icones pour le markerClusterer
        gridSize: 70, // permet de gérer le nombre de marqueurs regroupés
        styles: [ // change l'apparence et la taille de notre icône
            {
                textColor: 'white',
                url: 'img/cluster2.png',
                height: 50,
                width: 50,
                textSize: 15
            }
        ],
        maxZoom: 14 // permet de définir jusqu'à quel moment du zoom de la carte les marqueurs sont affichés
    },


    // méthode d'insertion de notre carte google
    initMap: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: this.lyon,
            zoom: 14,
            styles: [
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#d3d3d3"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "color": "#808080"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#b3b3b3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d7d7d7"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ebebeb"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a7a7a7"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#efefef"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#696969"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#737373"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d6d6d6"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {},
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                }
            ]
        });
    },


    // méthode d'initialisation des marqueurs
    initMarqueur: function (positionStation, number, statusStation, nbVelo) {
        this.statusMarqueur(statusStation, nbVelo)
        marqueur = new google.maps.Marker({
            map: map,
            icon: this.iconStatus, // attribution de l'icône
            position: positionStation,
            stationNumber: number
        });
        this.tableauMarqueur.push(marqueur); // insère les coordonnées dans notre tableau pour le markerClusterer

    },


    // méthode permettant l'affichage des informations de la station ciblée
    displayInfoStation: function (adresse, place, veloDispo, status) {
        document.querySelector("form").style.display = "flex";
        document.getElementById("information-station").style.display = "block";
        document.getElementById("indication").style.display = "none";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("nom-adresse").innerHTML = adresse;
        if (status === "OPEN") {
            document.getElementById("info-adresse").children[0].innerHTML = "[OUVERT]"
            document.getElementById("info-adresse").children[0].style.color = "#43ba92";
        } else if (status === "CLOSED") {
            document.getElementById("info-adresse").children[0].innerHTML = "[FERME]"
            document.getElementById("info-adresse").children[0].style.color = "#e23939";
        };
        document.getElementById("info-adresse").children[1].innerHTML = place + " places";
        document.getElementById("info-adresse").children[2].innerHTML = "<span id='nbvelo'>" + veloDispo + "</span>" + " vélos disponibles";
    },


    // methode qui permet d'attribuer un marqueur selon le status de la station
    statusMarqueur: function (statusStation, nbVelo) {

        if (statusStation === "OPEN") { // si ouvert
            return this.iconStatus = "img/vert.png"; //marqueur vert
        } else if (statusStation === "CLOSED") { // si fermé
            return this.iconStatus = "img/rouge.png"; // marqueur rouge
        }
    },


    // méthode qui permet de regrouper les marqueurs 
    marqueursRegroupement: function () {

        clusterer = new MarkerClusterer(map, this.tableauMarqueur, // récupération des coordonnées des marqueurs avec notre tableau tableauMarqueur

            this.mcOptions) // attribution du style de notre marqueur de regroupement avec mcOptions
    },
}


// appel de la fonction Ajax 
ajaxGet(Carte.jcDecaux, function (response) {

    // conversion des données JSON en Objet
    var lieux = JSON.parse(response);

    // pour chaques stations présentes
    lieux.forEach(function (a, index) {

        // intégration des données dans nos marqueurs ainsi que nos events
        Carte.initMarqueur(a.position, a.number, a.status, a.available_bikes);

        // integration du status des stations pour la couleur de nos marqueurs
        Carte.statusMarqueur(a.status, a.available_bikes);

        // ajout d'un évènement clic sur nos marqueurs
        google.maps.event.addListener(marqueur, "click", function () {

            // Affichage et intégration des données de la station séléctionnée
            Carte.displayInfoStation(a.address, a.bike_stands, a.available_bikes, a.status);
        });
    });
    // integration du markerClusterer
    Carte.marqueursRegroupement();
});



