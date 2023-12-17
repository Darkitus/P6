let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = e.target.getAttribute("href")
    ? document.querySelector(e.target.getAttribute("href"))
    : document.querySelector(e.target.closest("a").getAttribute("href"));
  target.style.display = null; // On affiche la modal //
  target.removeAttribute("aria-hidden"); // On rend la modal accessible aux lecteurs d'écran //
  target.setAttribute("aria-modal", "true");
  modal = target; // On stocke la cible dans la variable modal //
  modal.addEventListener("click", closeModal); // On ajoute un événement click sur la modal //
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal); // On ajoute un événement click sur le bouton de fermeture //
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return; // Si la modal n'est pas ouverte, on ne fait rien //
  e.preventDefault(); // On annule le comportement par défaut du lien //
  modal.style.display = "none"; // On cache la modal //
  modal.setAttribute("aria-hidden", true); // On rend inaccessible la modal aux lecteurs d'écran //
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal); // On supprime l'événement click sur la modal //
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation(); // On empêche la propagation de l'événement click sur la modal //
};

// On récupère tous les liens qui ouvrent la modal //
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal); // On boucle sur les liens pour leur ajouter un événement click //
});
