// objet du slider
const Diapo = {
  mqPhone: window.matchMedia("(max-width: 810px)"),
  slide: document.getElementsByClassName("slide"), // on selectionne notre élément du DOM
  info: document.getElementsByClassName("utilisation"),
  pause: document.getElementById("stop"),
  start: document.getElementById("start"),
  index: -1, // attribution de notre propriété qui permettra le défilement des différentes images

  // méthode permettant le bon fonctionnement du slider
  slider: function () {

    // ajout +1 à l'index
    Diapo.index++;

    // si l'index est égal à la taille de l'ensemble de nos éléménts
    if (Diapo.index === Diapo.slide.length) {

      // l'index vaut alors 0
      Diapo.index = 0;
    }

    // integration d'une boucle for
    for (i = 0; i < Diapo.slide.length; i++) {

      // si l'index vaut la variable i
      if (Diapo.index === i) {

        // l'élément du DOM portant la valeur de i sera affiché
        Diapo.slide[i].style.display = "flex";
        Diapo.info[i].style.display = "flex";
      } else { // en cas contraire les autres éléments seront cachés
        Diapo.slide[i].style.display = "none";
        Diapo.info[i].style.display = "none";
      }
    }

  },


  // méthode permettant d'afficher le prochain élément du dom
  droite: function () {

    this.slide[this.index].style.display = "none";
    this.info[this.index].style.display = "none";

    if (this.index === 4) {

      this.index = 0;

      this.slide[this.index].style.display = "flex";
      this.info[this.index].style.display = "flex";

    } else {

      this.index++;

      this.slide[this.index].style.display = "flex";
      this.info[this.index].style.display = "flex";

    }
  },


  // méthode permettant d'afficher l'élément du dom précédent
  gauche: function () {

    this.slide[this.index].style.display = "none";
    this.info[this.index].style.display = "none";

    if (this.index === 0) {

      this.index = 4;

      this.slide[this.index].style.display = "flex";
      this.info[this.index].style.display = "flex";

    } else {

      this.index--;

      this.slide[this.index].style.display = "flex";
      this.info[this.index].style.display = "flex";
    }
  },

  // empêche le défilement horinztonal de la page lors de l'appui sur les flèches direcctionnelles gauche et droite
  annulationScrollingHorizontal: function (e) {
    if ([37, 39].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    };
  }
};


// appel de notre méthode slider à l'affichage de notre page web pour l'initialisation
Diapo.slider();

// appel toutes les 5 secondes de la méthode slider
var intervalId = setInterval(Diapo.slider, 5000);

// event permettant le défilement des différents éléments du slider avec les flèches du clavier
document.addEventListener("keydown", function (e) {

  // si la touche du clavier "flèche directionnelle gauche" est appuyée
  if (e.keyCode === 37) {

    // appel de la méthode gauche
    Diapo.gauche();

    // si la touche du clavier "directionnelle droite" est appuyée
  } else if (e.keyCode === 39) {

    // appel de la méthode droite
    Diapo.droite();
  }
});

// évite le scrolling horizontal avec le clavier
window.addEventListener("keydown", function (e) {
  Diapo.annulationScrollingHorizontal(e);
});

// lors d'un clic sur la flèche de gauche
document.getElementById("fleche-gauche").addEventListener("click", function () {
  Diapo.gauche();
  clearInterval(intervalId);
  console.log(intervalId);
  Diapo.pause.style.color = "#F64E4E";

});

// lors d'un clic sur la flèche de droite
document.getElementById("fleche-droite").addEventListener("click", function () {
  Diapo.droite();
  clearInterval(intervalId);
  Diapo.pause.style.color = "#F64E4E";
})

// lors d'un clic sur le bouton stop, arrêt du slider
document.getElementById("stop").addEventListener("click", function () {
  clearInterval(intervalId);
  Diapo.pause.style.color = "#F64E4E";
});

// lors d'un clic sur le bouton start, reprise du slider
document.getElementById("start").addEventListener("click", function () {
  clearInterval(intervalId);
  intervalId = setInterval(Diapo.slider, 5000);
  Diapo.start.style.color = "#F64E4E";
  if (Diapo.mqPhone.matches) {
    setTimeout(function(){ Diapo.start.style.color = "#242424"; }, 200);
    Diapo.pause.style.color = "#242424";
  } else {
    setTimeout(function(){ Diapo.start.style.color = "white"; }, 200);
    Diapo.pause.style.color = "white";
  }
})
