"use strict"; // Mode strict du JavaScript

// Déclaration de trois variables.
let computer;
let player;
let random;

// Récupération du choix du joueur.
player = window.prompt("Que choisissez-vous : pierre, feuille ou ciseau ?");

// Conversion du choix du joueur en minuscules.
player = player.toLowerCase();

// Récupération d'un nombre aléatoire entre 0 inclu et 1 exclu.
random = Math.random();

if (random < 1 / 3) {
  // Entre 0.00 et ~0.33 : l'ordinateur sélectionne la pierre
  computer = "pierre";
} else if (random < 2 / 3) {
  // Entre ~0.33 et ~0.66 : l'ordinateur sélectionne la feuille
  computer = "feuille";
} // Au-delà de ~0.66 : l'ordinateur sélectionne le ciseau
else {
  computer = "ciseau";
}

let phrase;

if (computer == player) {
  phrase = "<p>Vous avez choisi la même chose : égalité !</p>";
} else {
  // Le joueur et l'ordinateur n'ont pas choisi la même chose, la bataille commence !

  switch (computer) {
    case "ciseau":
      if (player == "pierre") {
        phrase = "<p>La pierre écrase le ciseau : vous gagnez !</p>";
      } // player == 'feuille'
      else {
        phrase = "<p>La feuille est découpée par le ciseau : vous perdez !</p>";
      }
      break;

    case "feuille":
      if (player == "pierre") {
        phrase =
          "<p>La pierre est enveloppée par la feuille : vous perdez !</p>";
      } // player == 'ciseau'
      else {
        phrase = "<p>Le ciseau découpe la feuille : vous gagnez !</p>";
      }
      break;

    case "pierre":
      if (player == "feuille") {
        phrase = "<p>La feuille enveloppe la pierre : vous gagnez !</p>";
      } // player == 'ciseau'
      else {
        phrase = "<p>Le ciseau est écrasé par la pierre : vous perdez !</p>";
      }
      break;
  }
}

document.querySelector("#content").innerHTML = `
    <ul>
        <li>
            <img src="img/${player}.png">
            <p>Vous</p>
        </li>
        <li>
            <img src="img/${computer}.png">
            <p>L'ordinateur</p>
        </li>
    </ul>
    <p>${phrase}</p>
`;
