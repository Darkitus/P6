export function addWorks(works) {
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

function addDefaultFilter(categories) {
  categories.unshift({ id: 0, name: "Tous" });
}

export function addFilters(categories) {
  addDefaultFilter(categories);
  const filtersDiv = document.querySelector(".filters");
  categories.forEach((category) => {
    // createButton(category) //
    const buttonFilter = document.createElement("button");
    filtersDiv.appendChild(buttonFilter);
    buttonFilter.id = category.id;
    buttonFilter.innerText = category.name;
    // const categoryId = category.id;
    // buttonFilter.addEventListener("click", () => {
    //   if (categoryId === 0) {
    //     console.log("Veni Vidi Vici");
    //   }
    //   if (categoryId === 1) {
    //     console.log("Pouet");
    //   }
    // });
    // if (category.id === 0) {
    //   // buttonFilter.classList.add("selected");
    // }
  });
  listenerButtons();
}

function listenerButtons() {
  let buttons = document.querySelectorAll(".filtres button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
      let categoryId = event.target.id;
      filtrerWorks(categoryId);
      //Modification des boutons de filtre au clic//
      let buttonActive = buttons[i];
      buttonActive.classList.add("selected");
      let buttonsArray = Array.prototype.slice.call(buttons);
      let buttonInactive = buttonsArray.filter(
        (buttonsArray) => buttonsArray !== buttons[i]
      );
      buttonInactive.forEach((buttons) => {
        buttons.classList.remove("selected");
      });
    });
  }
}
//fonction pour filtrer les projets//
function filtrerWorks(categoryId) {
  let work = fetch("http://localhost:5678/api/works").then((work) =>
    work.json()
  );
  work.then((work) => {
    let workFiltre = work.filter((work) => work.categoryId == categoryId);
    document.querySelector(".gallery").innerHTML = "";
    if (categoryId === "reset") {
      afficherWorks(work);
    } else {
      afficherWorks(workFiltre);
    }
  });
}

// function addButtonListener(buttonListener) {
//   const buttonsFilter = document.querySelectorAll(".filters button");
//   const categories = fetch("http://localhost:5678/api/categories").then(
//     (categories) => categories.json()
//   );
//   buttonsFilter.addEventListener("click", () => {
//     const filterTest = works.filter(function (works) {
//       return categories.id;
//     });
//   });
// }

// function Test (test2) {
//   const buttonsFilter = document.querySelectorAll(".filters button");
//   buttonsFilter.addEventListener("click")

// }
