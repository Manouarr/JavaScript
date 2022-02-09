"use strict"; // Mode strict du JavaScript

// Déclaration de quatre variables.
let column;
let multiplyTable;
let row;
let size;
let htmlTable;

// Demande la taille maximum de la table des multiplications.
size = parseInt(window.prompt("Taille de la table de multiplications ?"));

/*

 avec création d'un tableau à 2 dimensions


// Initialisation de la table des multiplications.
multiplyTable = new Array();

// Construction de la table des multiplications de 1 jusqu'à la variable size.
for (row = 1; row <= size; row++) {
  // Pour chaque nouvelle ligne il faut créer un nouveau tableau.
  multiplyTable[row] = new Array();

  for (column = 1; column <= size; column++) {
    // Stockage du résultat du calcul dans la table des multiplications.
    multiplyTable[row][column] = row * column;
  }
}
*/

// Création en HTML de la table des multiplications.
htmlTable = "<table><tbody>";

for (row = 1; row <= size; row++) {
  // Création de la ligne HTML.
  htmlTable += "<tr>";

  for (column = 1; column <= size; column++) {
    // Si les deux nombres multipliés sont les mêmes...
    if (row == column) {
      // ...Alors on créé une cellule HTML à laquelle on applique une classe CSS.
      htmlTable += '<td class="same-number">';
    } else {
      // ...Sinon on créé simplement une cellule HTML.
      htmlTable += "<td>";
    }

    // Écriture dans la cellule HTML du résultat contenu dans la table des multiplications.
    htmlTable += row * column;

    // Fermeture de la cellule HTML.
    htmlTable += "</td>";

    //avec une condition ternaire
    // htmlTable += `<td class="${row == column ? "same-number" : ""}">${
    //   row * column
    // }</td>`;
  }

  // Fermeture de la ligne HTML.
  htmlTable += "</tr>";
}

// Fermeture du tableau HTML.
htmlTable += "</tbody></table>";

// Injection dans le HTML
document.querySelector("#content").innerHTML = htmlTable;
