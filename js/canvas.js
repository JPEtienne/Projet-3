// objet canvas
var Canvas = {
    mqTablet: window.matchMedia("(max-width: 1110px)"),
    mqPhone: window.matchMedia("(max-width: 810px)"),
    canvas: document.getElementById("signature"),
    mouse: false, // affiche le statut de la souris
    ctx: null, // attribut le contexte de l'utilisation du canvas

    // Vérifie la résolution de l'écran et adapte la taille du canvas
    canvasSize: function () {
        if (this.mqPhone.matches) {
            this.canvas.width = 500
            this.canvas.height = 300
        } else if (this.mqTablet.matches) {
            this.canvas.width = 500
            this.canvas.height = 300
        } else {
            this.canvas.width = 300
            this.canvas.height = 150
        }
    },

    // méthode récupérant les coordonnées du pointage
    getMousePos: function (canvas, event) {

        // renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    },


    // méthode permettant de dessiner dans le canvas
    draw: function (canvas, posX, posY) {

        // attribution du contexte du canvas
        this.ctx = this.canvas.getContext("2d");

        if (this.mouse === true) {
            // permet d'assigner le point du tracé
            this.ctx.lineTo(posX, posY);

            // définit la largeur du tracé
            this.ctx.lineWidth = 2;

            // crée le contour du chemin
            this.ctx.stroke();

            // change l'apparence du curseur sur le canvas
            canvas.style.cursor = "pointer";
        }
    },


    // méthode permettant de récupérer le status de la souris
    statusSouris: function(status){
        this.mouse = status
    },


    // méthode permettant d'éffacer le dessin du canvas
    clearCanvas: function() {
        if (this.ctx){
            // permet d'effacer à partir du coin haut gauche du canvas sur toute sa taille
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
            // permet de créer un nouveau chemin 
            this.ctx.beginPath();
        }
    },

    convertTouchEvent : function(e) {
        var touch, e_type;
        touch = e.targetTouches[0];
        e.preventDefault();
        switch (e.type) {
            case 'touchstart':
                // vérifie que le doigt est sur l'écran
                if (e.targetTouches.length != 1) {
                    return;
                }
                touch = e.targetTouches[0];
                e_type = 'mousedown';
                break;
            case 'touchmove':
                // vérifie que le doigt est sur l'écran
                if (e.targetTouches.length != 1) {
                    return;
                }
                touch = e.targetTouches[0];
                e_type = 'mousemove';
                break;
            case 'touchend':
                // vérifie que le doigt est enlevé de l'écran
                if (e.changedTouches.length != 1) {
                    return;
                }
                touch = e.changedTouches[0];
                e_type = 'mouseup';
                break;
            default:
                return;
        }

        // crée un évènement de type MouseEvent
        var mouse_e = document.createEvent("MouseEvents");

        // l'objet doit ensuite être initialisé
        mouse_e.initMouseEvent(
            e_type, // type de l'événement
            true,
            true,
            window, // vue de l'événement
            0, // le nombre de clics de souris
            touch.screenX, // coordonnée X de l'écran
            touch.screenY, // coordonnée Y de l'écran
            touch.clientX, // coordonnée X du client
            touch.clientY, // coordonnée Y du client
            e.ctrlKey, // vérifie si la touche contrôle a été appuyée
            e.altKey, // vérifie si la touche alt a été appuyée
            e.shiftKey, // vérifie si la touche majuscule a été appuyée
            e.metaKey, // vérifie si la touche meta a été appuyée
            0, // notre bouton de souris
            null // notre cible
        );
        
        // renvoie de notre évènement 
        this.dispatchEvent(mouse_e);
    }
};

// Vérifie au chargement de la page la résolution en largeur de l'écran
Canvas.canvasSize();

// event qui attribut le statut de la souris lors de l'appui
Canvas.canvas.addEventListener("mousedown", function () {
    Canvas.statusSouris(true);
});


// event qui attribut le statut de la souris lors du relachement
Canvas.canvas.addEventListener("mouseup", function () {
    Canvas.statusSouris(false);
});


// event permettant de dessiner au mouvement de la souris
Canvas.canvas.addEventListener("mousemove", function (e) {
    var mousePos = Canvas.getMousePos(canvas, e);
    Canvas.draw(Canvas.canvas, mousePos.x, mousePos.y);
});


// appel des méthodes pour la conversion des écrans taciles
Canvas.canvas.addEventListener("touchstart", Canvas.convertTouchEvent);
Canvas.canvas.addEventListener("touchmove", Canvas.convertTouchEvent);
Canvas.canvas.addEventListener("touchend", Canvas.convertTouchEvent);


// affiche le canvas après la validation du formulaire
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    // si station fermé
    if (document.getElementById("info-adresse").children[0].textContent === "[FERME]") {
        // message d'alerte
        alert("Station fermée, choisissez une autre station");

    // si aucun velo
    } else if (parseInt(document.getElementById("nbvelo").textContent) === 0) {

        // message d'alerte
        alert("Pas de vélos disponibles");

    // si ouvert
    } else if (document.getElementById("info-adresse").children[0].textContent === "[OUVERT]"){

        // affichage du canvas
        document.querySelector("form").style.display = "none";
        document.getElementById("canvas").style.display = "flex";
    }   
});


// event permettant d'effacer le contenu du canvas
document.getElementById("boutonEffacer").addEventListener("click", function() {
    Canvas.clearCanvas();
});



