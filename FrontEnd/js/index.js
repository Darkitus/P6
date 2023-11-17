import { addWorks } from "./function.js";
// Recup API works //
const works = fetch("http://localhost:5678/api/works").then((works) =>
  works.json()
);
// Affichage de la gallerie //
works.then((works) => {
  addWorks(works);
});

// Pour verifier la reception de trucs (ne pas oublier de supprimer) //
console.log(works);
console.log(addWorks);
