let currentModal = null;

const openModal = function (event) {
  event.preventDefault();
  const targetSelector = event.target.getAttribute("href")
    ? document.querySelector(event.target.getAttribute("href"))
    : document.querySelector(event.target.closest("a").getAttribute("href"));
  if (targetSelector) {
    targetSelector.style.display = null; // On affiche la modal //
    targetSelector.removeAttribute("aria-hidden"); // On rend la modal accessible aux lecteurs d'écran //
    targetSelector.setAttribute("aria-modal", "true");
    if (currentModal) {
      closeModal(event); // Si une modal est déjà affichée, on la ferme //
    }
    currentModal = targetSelector; // On stocke la cible dans la variable modal //
    currentModal.addEventListener("click", closeModal); // On ajoute un événement click sur la modal //
    currentModal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal); // On ajoute un événement click sur le bouton de fermeture //
    currentModal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
  }
};

const closeModal = function (event) {
  if (currentModal === null) return;
  event.preventDefault(); // On annule le comportement par défaut du lien //
  currentModal.style.display = "none"; // On cache la modal //
  currentModal.setAttribute("aria-hidden", true); // On rend inaccessible la modal aux lecteurs d'écran //
  currentModal.removeAttribute("aria-modal");
  currentModal.removeEventListener("click", closeModal); // On supprime l'événement click sur la modal //
  currentModal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  currentModal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  resetModal(); // On réinitialise la seconde modal //
  currentModal = null;
};

const stopPropagation = function (event) {
  event.stopPropagation(); // On empêche la propagation de l'événement click sur la modal //
};

// On récupère tous les liens qui ouvrent la modal //
document.querySelectorAll(".js-modal").forEach((modalLink) => {
  modalLink.addEventListener("click", openModal); // On boucle sur les liens pour leur ajouter un événement click //
});

// Fonction de reset de la seconde modal //
function resetModal() {
  const secondModalForm = document.forms.namedItem("form-upload"); // On récupère le formulaire de la modal d'ajout de photo //
  const secondModalImgPreview = document.querySelector("#photo-preview"); // On récupère l'élément img de la modal d'ajout de photo //
  secondModalForm.reset(); // Réinitialisation du formulaire après l'envoi //
  secondModalImgPreview.src = ""; // Réinitialisation de la preview img //
  photoPreview.style.display = "none"; // On cache la preview //
  inputsBox.style.display = "flex"; // Réinitialisation de la div contenant les inputs //
}

// On récupère la flèche de retour de la seconde modal //
document
  .querySelector(".modal-photo-return")
  .addEventListener("click", function (event) {
    closeModal(event);
    const modalOpenEvent = {
      preventDefault: () => {},
      target: {
        getAttribute: () => "#modal-project",
        closest: () => null,
      },
    };
    openModal(modalOpenEvent);
  });
