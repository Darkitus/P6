const form = document.getElementById("form"); // Recuperation du "form" //

// Creation d'un EventListener au clic sur le bouton submit du "form" //
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Annulation de l'evenement par defaut du bouton submit //

  const email = document.getElementById("email").value; // Recuperation des valeurs des inputs du "form" //
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
      const token = data.token; // Recuperation du token dans la reponse de l'API //
      localStorage.setItem("authToken", token); // Stockage du token dans le LocalStorage //
      if (token) {
        window.location.href = "/"; // Si le token existe, redirection vers l'Index //
      } else {
        document.getElementById("error").style.opacity = "1"; // Si le token n'existe pas, affichage d'un message d'erreur //
      }
    });
  // .catch((error) => {                           J'ai vu sur differents codes ce genre de chose, j'ai pas encore compris son utilité
  //   console.error("Texte : ", error);           A en croire le nom, ça "attrape" une erreur, mais j'en sais pas plus car rien ne se passe quand incorrect
  // });                                           Besoin de se renseigner plus sur ça
});
