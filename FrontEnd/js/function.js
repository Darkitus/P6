export function addWorks(works) {
  for (let i = 0; i < works.length; i++) {
    const galleryDiv = document.querySelector(".gallery");
    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    const figcaptionElement = document.createElement("figcaption");
    galleryDiv.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    imgElement.src = works[i].imageUrl;
    figcaptionElement.innerText = works[i].title;
  }
}
