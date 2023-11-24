import { addFilters, addWorks } from "./function.js";

// Recuperation des API "works" et "categories" //
const works = fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);
const categories = fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json()
);

// Affichage de la galerie //
works.then((works) => {
  addWorks(works);
});

// Affichage des filtres //
categories.then((categories) => {
  addFilters(categories);
});

// Pour verifier la reception de trucs (ne pas oublier de supprimer) //
console.log(works);
console.log(addWorks);
console.log(categories);
console.log(addFilters);
