const getImages = (keyQuery) => {
  if (keyQuery !== "forest-carousel") {
    fetch(`https://api.pexels.com/v1/search?query=${keyQuery}`, {
      method: "get",
      headers: {
        Authorization:
          "563492ad6f9170000100000196002ce464f24d7abd1cc59dfd9323a2",
      },
    })
      .then((rawImages) => rawImages.json())
      .then((jsonImages) => {
        renderImages(jsonImages.photos);
        urlMapping(jsonImages.photos);
        getIMGFromSpecificAuthor(jsonImages.photos);
      })
      .catch((error) => alert(error.message));
  } else {
    fetch(`https://api.pexels.com/v1/search?query=forest`, {
      method: "get",
      headers: {
        Authorization:
          "563492ad6f9170000100000196002ce464f24d7abd1cc59dfd9323a2",
      },
    })
      .then((rawImages) => rawImages.json())
      .then((jsonImages) => {
        renderForestCarousel(jsonImages.photos);
      })
      .catch((error) => alert(error.message));
  }
};

const renderForestCarousel = (imageArray) => {
  let forestImagesNode = document.querySelectorAll(
    "#forest-images-carousel .forest-images"
  );
  for (let i = 0; i < forestImagesNode.length; i++) {
    forestImagesNode[i].setAttribute("src", imageArray[i].src.original);
  }
};

let cardImagesNode = document.querySelectorAll(".card-img-top");
const renderImages = (imageArray) => {
  let photoIDNode = document.querySelectorAll(".photo-ID");

  for (let i = 0; i < cardImagesNode.length; i++) {
    cardImagesNode[i].setAttribute("src", `${imageArray[i].src.original}`);
    photoIDNode[i].innerText = imageArray[i].id;
  }
};

let showButtonsNode = document.querySelectorAll(
  ".btn-group button:nth-of-type(1)"
);
for (showButton of showButtonsNode) {
  showButton.addEventListener("click", (eventData) => {
    let imgToBeShowed = eventData.target.closest(".card").firstElementChild;
    imgToBeShowed.classList.remove("d-none");
    imgToBeShowed.classList.add("d-block");
  });
}

const hideImageCard = () => {
  let hideButtonsNode = document.querySelectorAll(
    ".btn-group button:nth-of-type(2)"
  );
  for (hideButton of hideButtonsNode) {
    hideButton.addEventListener("click", (eventData) => {
      let imgToBeHided = eventData.target.closest(".card").firstElementChild;
      imgToBeHided.classList.remove("d-block");
      imgToBeHided.classList.add("d-none");
    });
  }
};

// ex 11
let desiredURLs = [];
const getURLs = (data) => {
  desiredURLs.push({
    PhotoURL: data.url,
    photographerURL: data.photographer_url,
  });
  return desiredURLs;
};

const urlMapping = (dataArray) => {
  dataArray.map(getURLs);
};

// ex 12
let imagesFromPixabay = [];
const getIMGFromSpecificAuthor = (dataArray) => {
  imagesFromPixabay = dataArray.filter(
    (item) => item.photographer === "Pixabay"
  );
};

const searchNewImages = () => {
  let searchInput = document.getElementById("search-text");
  if (searchInput.value != "") getImages(`${searchInput.value}`);
  else alert("Please insert a keyword to search!");
};

window.onload = () => {
  hideImageCard();
  getImages("forest-carousel");
};
