var Reservation = {
    minutes: 20, // minutes compteur
    secondes: 00, // secondes compteur
    minutesElt: null, // élément minutes qui permettra le décompte
    secondesElt: null, // élément secondes qui permettra le décompte
    reservation: document.getElementById("reservation"),                  //
    nonReserve: document.getElementById("non-reserve"),                   // récupération des éléments du DOM
    infoReserve: document.getElementById("info-reserve"),                 //  
    annulationReserve: document.getElementById("annulation-reservation"), //
    lancementCompteur: null, // permettra l'initialisation ou la fin du timer


    // première méthode d'attribution des minutes et secondes, ceci permet d'intégrer le temps dans notre sessionStorage
    attributionCompteurSessionStorageUn: function () {

        // attribution des secondes au sessionStorage
        sessionStorage.secondes = this.secondes;

        // attribution des minutes au sessionStorage
        sessionStorage.minutes = this.minutes;
    },


    // deuxième méthode d'attribution des minutes et secondes, renvoie les données du sessionStorage dans nos éléments
    attributionCompteurSessionStorageDeux: function () {

        // attribution des minutes sessionStorage à notre élément minutes
        this.minutesElt = sessionStorage.minutes;

        // attribution des secondes sessionStorage à notre élément secondes
        this.secondesElt = sessionStorage.secondes;
    },


    // méthode récupérant le nom et prénom pour l'afficher dans notre réservation
    reservationAfficher: function () {

        // efface le sessionStorage au cas où une nouvelle réservation se crée
        sessionStorage.clear();

        // attribution du nom et prénom de la personne dans le sessionStorage
        sessionStorage.nom = document.getElementById("nom").value;
        sessionStorage.prenom = document.getElementById("prenom").value;

        // attribution du nom et prénom de la personne dans le localStorage pour réutilisation des données
        localStorage.nom = document.getElementById("nom").value;
        localStorage.prenom = document.getElementById("prenom").value;

        // envoi du nom de la station dans le sessionStorage
        sessionStorage.station = document.getElementById("nom-adresse").textContent;

        // affichage dans le footer
        this.reservation.style.display = "flex";
        this.nonReserve.style.display = "none";
        this.infoReserve.textContent = "Vélo réservé à la station " + sessionStorage.station + " par " + sessionStorage.prenom + " " + sessionStorage.nom;
    },

    // attribution d'une règle pour le décompte
    regleDecompte: function () {

        // si minutes supérieures ou égales à 0 ET secondes supérieurs à 0
        if ((this.minutesElt >= 0) && (this.secondesElt > 0)) {

            this.secondesElt--;

            sessionStorage.secondes = this.secondesElt

            sessionStorage.minutes = this.minutesElt

            // si minutes strictement supérieures à 0 ET secondes inférieures ou égales à 0
        } else if ((this.minutesElt > 0) && (this.secondesElt <= 0)) {

            this.secondesElt = 59;

            this.minutesElt--;

            sessionStorage.secondes = this.secondesElt

            sessionStorage.minutes = this.minutesElt

            // si minutes et secondes égales à 0
        } else if ((this.minutesElt == 0) && (this.secondesElt == 0)) {

            // arrêt du compteur automatique
            clearInterval(continuationCompteur);

            // arrêt du compteur évènement
            clearInterval(this.lancementCompteur);

            // suppression du sessionStorage
            sessionStorage.clear();

            // affichage du message d'annulation
            this.reservation.style.display = "none";
            this.annulationReserve.style.display = "block";

            // affiche le message de demande de réservation après 1.5s
            setTimeout(function () {
                Reservation.annulationReserve.style.display = "none";
                Reservation.nonReserve.style.display = "block";
            }, 1500);
        }

    },


    // règle permettant d'afficher un zéro devant nos valeurs textuelles
    integrationDecompte: function () {

        // rajoute un 0 devant les minutes si minutes inférieures à 10
        if (this.minutesElt < 10) {
            document.getElementById("timer1").innerHTML = "Temps restant: " + "0" + sessionStorage.getItem("minutes") + " :";
        } else {
            document.getElementById("timer1").innerHTML = "Temps restant: " + sessionStorage.getItem("minutes") + " :";
        }

        // rajoute un 0 devant les secondes si secondes inférieures à 10
        if (this.secondesElt < 10) {
            document.getElementById("timer2").innerHTML = "0" + sessionStorage.getItem("secondes");
        } else {
            document.getElementById("timer2").innerHTML = sessionStorage.getItem("secondes");
        }

        // appel de la méthode regleDecompmte
        this.regleDecompte();
    },


    // méthode permettant l'annulation de la réservation
    annulerReservation: function () {

        // suppression du sessionStorage
        sessionStorage.clear();

        this.reservation.style.display = "none";
        this.nonReserve.style.display = "block";

        // arrêt des compteurs
        clearInterval(continuationCompteur);
        clearInterval(this.lancementCompteur);
    },


    // méthode permettant le lancement du compteur
    lancementDuCompteur: function () {

        // appel de l'affichage de la réservation dans le footer
        this.reservationAfficher();

        // suppréssion des minutes et secondes si une réservation avait déjà été demandé
        sessionStorage.removeItem("secondes");
        sessionStorage.removeItem("minutes");

        // suppressions des compteurs SI présents
        clearInterval(continuationCompteur);
        clearInterval(this.lancementCompteur);

        // attributions des minutes et secondes
        this.attributionCompteurSessionStorageUn();
        this.attributionCompteurSessionStorageDeux()

        // lancement du compteur 
        this.lancementCompteur = setInterval("Reservation.integrationDecompte()", 1000);

        // appel singulier pour immédiatement faire apparaitre le nouveau timer
        this.integrationDecompte();
    },


    // méthode permettant de garder le status de la réservation en cas de refresh de page
    refreshPage: function () {

        // effectue l'affichage de la réservation
        Reservation.reservation.style.display = "flex";
        Reservation.nonReserve.style.display = "none";
        Reservation.infoReserve.textContent = "Vélo réservé à la station " + sessionStorage.station + " par " + sessionStorage.prenom + " " + sessionStorage.nom;

        // attribue les données sessionStorage dans minutesElt et secondesElt pour le fonctionnement du timer
        Reservation.attributionCompteurSessionStorageDeux();

        // appel de la règle du timer
        Reservation.integrationDecompte();
    }
};

// évènement permettant l'annulation de la réservation
document.getElementById("annuler-reserve").addEventListener("click", function () {
    Reservation.annulerReservation();
});


// affiche l'état initial du footer sans réservation
Reservation.reservation.style.display = "none";
Reservation.nonReserve.style.display = "block";


// si une réservation est présente lors du refresh de la page
if (sessionStorage.getItem("secondes")) {

    // appel de l'affichage et attribution des données pour la réservation
    Reservation.refreshPage();

    // reprise du timer
    var continuationCompteur = setInterval("Reservation.integrationDecompte()", 1000);
} else {

    // si un réservation n'est pas présente, affichage du message de demande de réservation
    Reservation.reservation.style.display = "none";
    Reservation.nonReserve.style.display = "block";
};


// évènement permettant de finaliser la réservation et d'initialiser le timer
document.getElementById("boutonValider").addEventListener("click", function (e) {

    // si notre canvas de signature correspond au second (caché) qui est vide
    if (Canvas.canvas.toDataURL() == document.getElementById('blank').toDataURL())

        // message d'alerte
        alert("Veuillez entrer votre signature");

    // si pas
    else {

        // cache le canvas
        document.getElementById("canvas").style.display = "none";

        document.getElementById("annulation-reservation").style.display = "none";

        // cache les informations concernants la stations réservée dans "Détails de la station"
        document.getElementById("information-station").style.display = "none";

        // affiche les indications à faire pour réserver dans "Détails de la station"
        document.getElementById("indication").style.display = "block";

        // permet de réinitialiser les champs nom et prénom après réservation
        setTimeout(function () {
            document.querySelector("form").children[1].value = "";
            document.querySelector("form").children[3].value = "";
        }, 1000);

        // réinitialise le dessin dans le canvas
        Canvas.clearCanvas();

        // la réservation s'effectue
        Reservation.lancementDuCompteur();
    }
});