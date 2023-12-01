// const form = {
//   email: document.querySelector("#email"),
//   password: document.querySelector("#password"),
// };

const form = document.getElementById("form");
// Creation d'un EventListener au clic sur le bouton submit du "form" //
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Envoi de POST vers l'API //
  fetch("http://localhost:5678/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const token = data.token;
      localStorage.setItem("authToken", token); // Stockage du token dans le LocalStorage //
      if (token) {
        alert("Ouééé"); // A supprimer pour plus de fluidité //
        window.location.href = "/"; // Redirection vers l'Index si reussite //
      } else {
        alert("Erreur dans l’identifiant ou le mot de passe"); // Message d'erreur en cas d'echec //
      }
    });
  // .catch((error) => {                           J'ai vu sur differents codes ce genre de chose, j'ai pas encore compris son utilité
  //   console.error("Texte : ", error);           A en croire le nom, ça "attrape" une erreur, mais j'en sais pas plus car rien ne se passe quand incorrect
  // });                                           Besoin de se renseigner plus sur ça
});
