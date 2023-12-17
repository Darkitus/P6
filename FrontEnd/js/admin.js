const token = localStorage.getItem("authToken");
const logout = document.querySelector(".login");
const bannerEdit = document.getElementById("modal-banner");
const removeFilterBar = document.querySelector(".filters");
const modalButton = document.querySelector(".modal-button");
const myProjects = document.querySelector(".js-projects");
const projetEdit = document.querySelector(".modal-projects_edit");

if (token) {
  bannerEdit.style.display = "flex";
  projetEdit.style.display = "flex";
  removeFilterBar.style.display = "none";
  modalButton.style.display = "flex";
  logout.innerHTML = "logout";
  myProjects.style.paddingBottom = "79px";

  logout.addEventListener("click", () => {
    localStorage.removeItem("authToken");
    window.location.href = "./pages/login.html";
  });
}
