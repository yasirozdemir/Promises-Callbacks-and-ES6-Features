const getImages = (keyQuery) => {
  fetch(`https://api.pexels.com/v1/search?query=${keyQuery}`, {
    method: "get",
    headers: {
      Authorization: "563492ad6f9170000100000196002ce464f24d7abd1cc59dfd9323a2",
    },
  })
    .then((rawImages) => rawImages.json())
    .then((jsonImages) => {
      let data = jsonImages.photos;
      if (keyQuery !== "forest") {
        renderImages(data);
        urlMapping(data);
        getIMGFromSpecificAuthor(data);
      } else {
        renderForestCarousel(data);
      }
    })
    .catch((error) => console.error(error.message));
};

const renderForestCarousel = (imageArray) => {
  let forestImagesNode = document.querySelectorAll(
    "#forest-images-carousel .forest-images"
  );
  for (let i = 0; i < forestImagesNode.length; i++) {
    forestImagesNode[i].setAttribute("src", imageArray[i].src.original);
  }
};

let containerForImages = document.getElementById("images-goes-here");
let cardImagesNode = document.querySelectorAll(".card-img-top");
const renderImages = (imageArray) => {
  containerForImages.innerHTML = "";
  for (image of imageArray) {
    containerForImages.innerHTML += `
            <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <img class="card-img-top w-100" src="${image.src.original}" />
                <div class="card-body p-2">
                  <div
                    class="d-flex flex-column justify-content-between align-items-center"
                  >
                    <div class="btn-group mx-auto">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#imageModal"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        View Full Size
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">${image.id}</small>
                  </div>
                </div>
              </div>
            </div>`;
  }
  hideImageCard();
  showImageModal();
};

const showImageModal = () => {
  let viewFullSizesNode = document.querySelectorAll(
    ".btn-group button:nth-of-type(1)"
  );
  let imageModal = document.querySelector("#imageModal .modal-body");
  imageModal.innerHTML = "";

  for (viewFullSize of viewFullSizesNode) {
    viewFullSize.addEventListener("click", (eventData) => {
      let imgToBeShowed = eventData.target.closest(".card").firstElementChild;
      imageModal.innerHTML = `<img class="w-100" src="${imgToBeShowed.getAttribute(
        "src"
      )}" alt="">`;
    });
  }
};

const hideImageCard = () => {
  let hideButtonsNode = document.querySelectorAll(
    ".btn-group button:nth-of-type(2)"
  );
  for (hideButton of hideButtonsNode) {
    hideButton.addEventListener("click", (eventData) => {
      let imgToBeHided = eventData.target.closest(".card").firstElementChild;
      imgToBeHided.classList.toggle("d-none");
      if (imgToBeHided.classList.contains("d-none")) {
        eventData.target.innerHTML = "Show";
      } else {
        eventData.target.innerHTML = "Hide";
      }
    });
  }
};

let searchInput = document.getElementById("search-text");
const searchNewImages = () => {
  if (searchInput.value != "") {
    getImages(`${searchInput.value.toLowerCase()}`);
    searchInput.value = "";
  } else alert("Please insert a keyword to search!");
};

window.onload = () => {
  getImages("forest");

  searchInput.addEventListener("keyup", (eventData) => {
    if (eventData.key === "Enter") searchNewImages();
    else return;
  });
  searchInput.value = "";
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
