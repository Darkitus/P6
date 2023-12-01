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
  addFilters(works);
});

// Création des "works" dans le HTML //
function addWorks(works) {
  works.forEach((work) => {
    const galleryDiv = document.querySelector(".gallery");
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    galleryDiv.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    imgElement.src = work.imageUrl;
    figcaptionElement.innerText = work.title;
  });
}

// Suppression de tout les "works" affiché //
function eraseWorks() {
  const figureRemoveAll = document.querySelector(".gallery");
  figureRemoveAll.innerHTML = "";
}

// Création des boutons filtres //
function addFilters(works) {
  const uniqueCategories = [];
  uniqueCategories.push({ id: 0, name: "Tous" });
  works.forEach((work) => {
    const existingCategories = uniqueCategories.filter(
      (category) => category.id === work.category.id
    );
    if (existingCategories.length === 0) {
      uniqueCategories.push(work.category);
    }
  });
  console.log(uniqueCategories); // Pour verifier la bonne reception des catégories //

  const filtersDiv = document.querySelector(".filters");
  // Creation d'une boucle créant d'autant de boutons que de catégories //
  uniqueCategories.forEach((category) => {
    const buttonFilter = document.createElement("button");
    filtersDiv.appendChild(buttonFilter);
    buttonFilter.id = category.id; // Ajout d'un "id" aux boutons selon l'id celui de la catégorie //
    buttonFilter.innerText = category.name; // Ajout d'un nom aux boutons selon celui de la catégorie //
    const categoryId = category.id;

    buttonFilter.addEventListener("click", () => {
      uniqueCategories.forEach((filterResult) => {
        if (categoryId === filterResult.id) {
          eraseWorks();
          const categoryIsDefault = categoryId === 0;
          let filteredWorks = [];
          if (categoryIsDefault) {
            filteredWorks = works;
          } else {
            filteredWorks = works.filter(
              (work) => work.category.id === categoryId
            );
          }
          addWorks(filteredWorks);
        }
      });
    });
  });
}
