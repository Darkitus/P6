// Recuperation des API "works" et "categories" //
const works = fetch("http://localhost:5678/api/works").then(
  (works) => works.json() // Transformation des données en JSON //
);
const categories = fetch("http://localhost:5678/api/categories").then(
  (categories) => categories.json() // Transformation des données en JSON //
);

// Affichage de la galerie //
works.then((works) => {
  addWorks(works);
  addFilters(works);
});

// Création des "works" dans le HTML //
function addWorks(works) {
  works.forEach((work) => {
    const galleryDiv = document.querySelector(".gallery"); // Selection de la div "gallery" //
    const figureElement = document.createElement("figure"); // Création d'une figure //
    const imgElement = document.createElement("img"); // Création d'une image //
    const figcaptionElement = document.createElement("figcaption"); // Création d'un figcaption //
    galleryDiv.appendChild(figureElement); // Ajout de la figure dans la div "gallery" //
    figureElement.appendChild(imgElement); // Ajout de l'image dans la figure //
    figureElement.appendChild(figcaptionElement); // Ajout du figcaption dans la figure //
    imgElement.src = work.imageUrl; // Ajout de l'url de l'image //
    figcaptionElement.innerText = work.title; // Ajout du titre de l'image //
  });
}

// Suppression de tout les "works" affiché //
function eraseWorks() {
  const figureRemoveAll = document.querySelector(".gallery"); // Selection de la div "gallery" //
  figureRemoveAll.innerHTML = ""; // Suppression de tout les elements HTML de la div "gallery" //
}

// Création des boutons filtres //
function addFilters(works) {
  const uniqueCategories = []; // Creation d'un tableau vide //
  uniqueCategories.push({ id: 0, name: "Tous" }); // Ajout d'une categorie "Tous" //
  works.forEach((work) => {
    const existingCategories = uniqueCategories.filter(
      (category) => category.id === work.category.id
    );
    if (existingCategories.length === 0) {
      uniqueCategories.push(work.category);
    }
  });
  console.log(uniqueCategories); // Pour verifier la bonne reception des catégories //

  const filtersDiv = document.querySelector(".filters"); // Selection de la div "filters" //
  // Creation d'une boucle créant d'autant de boutons que de catégories //
  uniqueCategories.forEach((category) => {
    const buttonFilter = document.createElement("button"); // Création d'un bouton //
    filtersDiv.appendChild(buttonFilter); // Ajout du bouton dans la div "filters" //
    buttonFilter.id = category.id; // Ajout d'un id aux boutons selon celui de la catégorie //
    buttonFilter.innerText = category.name; // Ajout du nom de la catégorie dans le bouton //
    const buttonsClassName = category.name
      .toLowerCase()
      .replace(/ /g, "")
      .replace(/&/, "-"); // Convertit en minuscules, supprime les espaces et remplace le & par un tiret //
    buttonFilter.classList.add(buttonsClassName); // Ajout de la classe au bouton //
    const buttonTous = document.querySelector(".tous"); // Selection du bouton "Tous" //
    buttonTous.classList.add("active"); // Ajout de la classe "active" au bouton "Tous" //
    const categoryId = category.id; // Recuperation de l'id de la catégorie //

    buttonFilter.addEventListener("click", () => {
      const allFiltersButtons = document.querySelectorAll(".filters button"); // Selection de tout les boutons //
      allFiltersButtons.forEach((button) => {
        button.classList.remove("active"); // Suppression de la classe "active" //
      });
      uniqueCategories.forEach((filterResult) => {
        if (categoryId === filterResult.id) {
          eraseWorks(); // Suppression de tout les "works" affiché //
          const categoryIsDefault = categoryId === 0; // Verification si la catégorie est "Tous" //
          let filteredWorks = []; // Creation d'un tableau vide //
          if (categoryIsDefault) {
            filteredWorks = works; // Si la catégorie est "Tous" on affiche tout les "works" //
            buttonFilter.classList.add("active"); // Ajout de la classe "active" au bouton "Tous" //
          } else {
            filteredWorks = works.filter(
              (work) => work.category.id === categoryId // Sinon on affiche les "works" selon la catégorie //
            );
            buttonFilter.classList.add("active"); // Ajout de la classe "active" au bouton de la catégorie selectionné //
          }
          addWorks(filteredWorks);
        }
      });
    });
  });
}
