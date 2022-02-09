"use strict";

/********************************
 * VARIABLES
 *******************************/
let game = new Object();

/********************************
 * FONCTIONS
 *******************************/
/**
 * Renvoie un nombre entier aléatoire compris entre les arguments min et max inclus.
 * @param {number} min
 * @param {number} max
 */
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pioche au hasard le coupable, l'arme et la salle du meurtre
 * Injecte les réponses possibles dans les select prévues à cet effet dans le HTML
 */
function computeGuilty() {
  //boucle sur les différentes propriétés de l'objet datas : chaque propriété contient un tableau
  for (let prop in datas) {
    /**
     * Tire les cartes coupables
     */
    game[prop] = datas[prop][getRandomInteger(0, datas[prop].length - 1)];

    /**
     * Injection HTML
     */
    for (let option of datas[prop]) {
      document
        .querySelector("#" + prop)
        .insertAdjacentHTML(
          "beforeend",
          `<option value="${option}">${option}</option>`
        );
    }
  }
}

/**
 * Constrcution d'un tableau qui contient le résultat
 * @param {HTMLElement} tr
 * @param {HTMLElement} trResult
 */
function createTableResult(tr, trResult) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Coupable</th>
      <th>Arme</th>
      <th>Pièce</th>
    </tr>
  `;
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  tbody.appendChild(tr);
  tbody.appendChild(trResult);
  table.appendChild(tbody);
  return table;
}

/**
 * Gestion de la soumission de l'accusation et affichage des résultats
 */
function submitAccusation() {
  let selects = document.querySelectorAll("select");
  let result = true;
  game.accusation = new Object();
  let accusation = document.createElement("tr");
  let accusationResult = document.createElement("tr");
  for (let select of selects) {
    game.accusation[select.id] = select.value;
    result = result && select.value == game[select.id];

    //ligne qui affiche le choix de l'utilisateur
    var tdAccusation = document.createElement("td");
    var tdAccusationText = document.createTextNode(select.value);
    tdAccusation.appendChild(tdAccusationText);
    accusation.appendChild(tdAccusation);

    //ligne qui affiche le résultat du choix
    let tdAccusationResult = document.createElement("td");
    let tdAccusationResultText = document.createTextNode(
      select.value == game[select.id] ? "✅" : "❌"
    );
    tdAccusationResult.appendChild(tdAccusationResultText);
    accusationResult.appendChild(tdAccusationResult);
  }
  let table = createTableResult(accusation, accusationResult);

  /**
   * Injection HTML du résultat
   */
  let section = document.createElement("section");
  let sentence = document.createElement("p");
  sentence.innerHTML = `Vous accusez <b>${
    game.accusation.suspects
  }</b> d'avoir tué le Docteur LENOIR avec la/le <b>${game.accusation.weapons.toLowerCase()}</b> dans la/le <b>${game.accusation.rooms.toLowerCase()}</b>.`;
  section.appendChild(sentence);
  section.appendChild(table);
  document.body.insertAdjacentElement("beforeend", section);
  document.body.insertAdjacentHTML(
    "beforeend",
    result
      ? "<h3>Et vous avez vu juste ! BRAVO !</h3>"
      : `<h3>Et c'est raté !</h3><p>C'est <b>${
          game.suspects
        }</b> qui a tué le Docteur LENOIR avec la/le <b>${game.weapons.toLowerCase()}</b> dans la/le <b>${game.rooms.toLowerCase()}</b>.</p>`
  );
  document.querySelector("form").remove();
}

/********************************
 * CODE PRINCIPAL
 *******************************/
document.addEventListener("DOMContentLoaded", function () {
  computeGuilty();
  console.log(game);

  document
    .querySelector("#accusation")
    .addEventListener("click", submitAccusation);
});
