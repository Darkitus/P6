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
  addWorksModal(works);
});

categories.then((categories) => {
  loadCategories(categories);
});

// Création des "works" dans le HTML //
function addWorks(works) {
  if (!Array.isArray(works)) {
    works = [works];
  }
  works.forEach((work) => {
    const galleryDiv = document.querySelector(".gallery"); // Selection de la div "gallery" //
    const figureElement = document.createElement("figure"); // Création d'une figure //
    const imgElement = document.createElement("img"); // Création d'une image //
    const figcaptionElement = document.createElement("figcaption"); // Création d'un figcaption //
    galleryDiv.appendChild(figureElement); // Ajout de la figure dans la div "gallery" //
    work.galleryElement = figureElement; // Stockez une référence à l'élément de la galerie dans l'objet work //
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

// Affichage des "works" dans la modal //
function addWorksModal(works) {
  if (!Array.isArray(works)) {
    works = [works];
  }
  works.forEach((work) => {
    const workModal = document.querySelector(".work-modal"); // Selection de la div "work-modal" //
    const workModalDiv = document.createElement("div"); // Création d'une div //
    const workModalImg = document.createElement("img"); // Création d'une image //
    const workModalIcon = document.createElement("i"); // Création d'une icone //
    workModalImg.src = work.imageUrl; // Ajout de l'url de l'image //
    workModalImg.alt = work.title; // Ajout du titre de l'image //
    workModalIcon.classList.add("fa-solid", "fa-trash-can"); // Ajout des classes à l'icone //
    workModal.appendChild(workModalDiv); // Ajout de la div dans la div "work-modal" //
    workModalDiv.append(workModalImg, workModalIcon); // Ajout de l'image et de l'icone dans la div "work-modal" //

    // Suppression d'un "work" au click sur la poubelle //
    workModalIcon.addEventListener("click", () => {
      workModalDiv.remove(); // Suppression de l'élément parent de l'icône de suppression
      work.galleryElement.remove(); // Suppression de l'élément correspondant de la galerie
      fetch(`http://localhost:5678/api/works/${work.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        works = works.filter((workToDelete) => workToDelete.id !== work.id);
      });
    });
  });
}

// Affichage des catégories dans le formulaire d'ajout de "work" //
async function loadCategories(categories) {
  const formCategory = document.getElementById("categorySelect"); // Selection de la div "categorySelect" //
  formCategory.innerHTML = ""; // Suppression de tout les elements HTML de la div "categorySelect" //

  const defaultOption = document.createElement("option"); // Création d'une option //
  defaultOption.value = ""; // Ajout de l'id de la catégorie //
  formCategory.appendChild(defaultOption); // Ajout des catégories dans le formulaire //

  categories.forEach((category) => {
    const option = document.createElement("option"); // Création d'une option //
    option.value = category.id; // Ajout de l'id de la catégorie //
    option.textContent = category.name; // Ajout du nom de la catégorie //
    formCategory.appendChild(option); // Ajout des catégories dans le formulaire //
  });
}

// Conversion de l'image en base64 //
function readImage(file, callback) {
  const reader = new FileReader(); // Creation d'un objet FileReader //

  reader.addEventListener("load", () => {
    callback(reader.result);
  });

  reader.readAsDataURL(file); // Conversion de l'image en base64 //
}

const form = document.forms.namedItem("form-upload"); // Selection du formulaire //
const photoInput = document.getElementById("photo-file-input"); // Selection de l'input de l'image //
const photoPreview = document.getElementById("photo-preview"); // Selection de l'element de l'image //
const inputsBox = document.querySelector(".form-inputs-box"); // Selection de la div contenant les inputs //
const formSubmitButton = document.getElementById("modal-form-submit"); // Selection du bouton d'envoi du formulaire //
const allFormInputs = form.querySelectorAll("input, select"); // Sélectionne tous les champs du formulaire //

// Vérification du formulaire //
function checkForm() {
  let isFormFilled = true; // Définit la variable à true //
  allFormInputs.forEach((input) => {
    if (!input.value) {
      isFormFilled = false; // Si un champ n'est pas rempli, on passe la variable à false //
    }
  });

  if (isFormFilled) {
    formSubmitButton.style.backgroundColor = "#1D6154"; // Change la couleur du bouton si le formulaire est rempli //
  } else {
    formSubmitButton.style.backgroundColor = ""; // Réinitialise la couleur du bouton //
  }
}

allFormInputs.forEach((input) => {
  input.addEventListener("input", checkForm); // Ajoute un événement input sur chaque champ du formulaire //
});

// Affiche la prévisualisation de l'image //
photoInput.addEventListener("change", () => {
  const imageSelected = photoInput.files[0]; // Recuperation de l'image //
  if (imageSelected) {
    readImage(imageSelected, (dataString) => {
      photoPreview.src = dataString; // Ajout de l'image //
      photoPreview.style.display = "block"; // Fait apparaitre l'element de l'image //
      inputsBox.style.display = "none"; // Cache la div contenant les inputs //
    });
  }
});

// Envoi du formulaire //
form.addEventListener("submit", (e) => {
  e.preventDefault(); // On annule le comportement par défaut du formulaire //
  submitForm();
});

// Envoi des données du formulaire //
function submitForm() {
  const formData = new FormData(); // Creation d'un objet FormData //
  const imageSelected = photoInput.files[0]; // Recuperation de l'image //
  const titleSelected = form.elements.namedItem("formTitle").value; // Recuperation de la valeur du titre //
  const categorySelected = document.getElementById("categorySelect").value; // Recuperation de la valeur de la catégorie //

  if (imageSelected) {
    formData.append("image", imageSelected); // Ajout de l'image //
    formData.append("title", titleSelected); // Ajout du titre //
    formData.append("category", parseInt(categorySelected, 10)); // Ajout de la catégorie //
    console.log(imageSelected, titleSelected, categorySelected); // Pour verifier la bonne reception des données //

    // Envoi des données //
    submitFormData(formData).then((newWork) => {
      addWorks(newWork);
      addWorksModal(newWork);
    });
  }
}

function submitFormData(formData) {
  return fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((newWork) => {
      form.reset(); // Réinitialisation du formulaire après l'envoi //
      photoPreview.style.display = "none"; // Réinitialisation de la prévisualisation de l'image //
      inputsBox.style.display = "flex"; // Réinitialisation de la div contenant les inputs //
      return newWork; // Retourne les données du nouveau "work" //
    });
}
