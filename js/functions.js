function changeActive(that) {
  let parent = that.parentElement,
    current = parent.querySelector(".active");
  current.classList.remove("active");
  that.classList.add("active");
}

function changeNavActive(that) {
  let parent = that.parentElement.parentElement;
  current = parent.querySelector(".active");
  current.classList.remove("active");
  that.classList.add("active");
}

function indicator(that) {
  changeActive(that);
  let active = Array.from(indicators).findIndex((item) => item.classList.contains("active"));
  currentCarousel = active;
  changeCarousel();
}

function changeCarousel() {
  carousels.forEach(function (carousel) {
    carousel.style.zIndex = 0;
    carousel.classList.remove("active");
  });
  indicators.forEach(function (indicator) {
    indicator.classList.remove("active");
  });

  indicators[currentCarousel].classList.add("active");
  carousels[currentCarousel].style.zIndex = 2;
  carousels[currentCarousel].classList.add("active");
}

function changeMenuType(that) {
  let type = that.dataset.type;
  MenuSection.dataset.type = type;
}

function changeMenuContent() {
  let type = MenuSection.dataset.type,
    currentArray = window[type];

  let content = `<div class="middle-line"></div>`;

  currentArray.forEach(function (item) {
    content += `
            <div class="col-md-6 part" data-id="${item.id}">
                <div class="item">
                    <div class="row">
                        <div class="col-3 justify-content-center align-items-center d-flex">
                            <div class="img">
                                <img src="./images/${item.images[0]}" alt="Menu" class="img-fluid">
                                <i class="fa-regular fa-square-plus plus" onclick="showMenuPopup(this)"></i>
                            </div>
                        </div>

                        <div class="col-9">
                            <div class="content">
                                <div class="head">
                                    <h3>${item.name}</h3>
                                    <div class="line"></div>
                                    <div class="price">$${item.price}</div>
                                </div>

                                <p class="mb-0">${item.miniDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  menuContent.innerHTML = content;

  let items = Array.from(menuContent.querySelectorAll(".part")),
    newOrder = [...items.filter((item, index) => index % 2 === 0), ...items.filter((item, index) => index % 2 !== 0)];

  newOrder.forEach(function (item, index) {
    item.style.setProperty("--delay", `${500 + index * 200}ms`);
    item.classList.add("show");
  });
}

function closeMenuPopup() {
  MenuPopup.classList.remove("active");
  setTimeout(function () {
    MenuPopup.classList.add("d-none");
  }, 800);
}

function stopPropagation(event) {
  event.stopPropagation();
}

function showMenuPopup(that) {
  let type = MenuSection.dataset.type,
    currentArray = window[type],
    currentId = that.closest(".part").dataset.id,
    currentObject = currentArray.find(function (item) {
      return item.id == currentId;
    });

  MenuPopup.innerHTML = `
    <div class="content position-relative part" onclick="stopPropagation(event)" data-id="${currentObject.id}">
        <i class="fa-regular fa-circle-xmark close" onclick="closeMenuPopup()"></i>
        <div class="top-content">
          <h6>SPECIAL SELECTION</h6>
          <div class="img mb-2">
            <img src="./images/separator.svg" alt="seperator" class="img-fluid" />
          </div>
        </div>

        <h2 class="h1 display-1 my-4 mb-3">${currentObject.name}</h2>

        <div class="image position-relative mb-4">
          <img src="./images/${currentObject.images[0]}" class="img-fluid" alt="Menu" />
          <div class="price">$${currentObject.price}</div>
          <button class="prev" onclick="changeMenuPopupContent(this , 'prev')" data-id="${currentObject.id}" ><i class="fa-solid fa-chevron-left"></i></button>
          <button class="next" onclick="changeMenuPopupContent(this , 'next')" data-id="${currentObject.id}" ><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <p class="mb-0">${currentObject.description}</p>
      </div>
    `;

  MenuPopup.classList.remove("d-none");
  setTimeout(function () {
    MenuPopup.classList.add("active");
  }, 1);
}

function changeMenuPopupContent(that, increment) {
  let type = MenuSection.dataset.type,
    currentArray = window[type],
    currentId = Number(that.dataset.id);

  let currentIndex = currentArray.findIndex(function (item) {
    return item.id == currentId;
  });

  if (increment == "prev") {
    currentIndex--;
  }

  if (increment == "next") {
    currentIndex++;
  }

  if (currentIndex >= currentArray.length) {
    currentIndex = 0;
  }

  if (currentIndex < 0) {
    currentIndex = currentArray.length - 1;
  }

  let currentObject = currentArray[currentIndex];

  MenuPopup.innerHTML = `
    <div class="content position-relative part" onclick="stopPropagation(event)" data-id="${currentObject.id}">
        <i class="fa-regular fa-circle-xmark close" onclick="closeMenuPopup()"></i>
        <div class="top-content">
          <h6>SPECIAL SELECTION</h6>
          <div class="img mb-2">
            <img src="./images/separator.svg" alt="seperator" class="img-fluid" />
          </div>
        </div>

        <h2 class="h1 display-1 my-4 mb-3">${currentObject.name}</h2>

        <div class="image position-relative mb-4">
          <img src="./images/${currentObject.images[0]}" class="img-fluid" alt="Menu" />
          <div class="price">$${currentObject.price}</div>
          <button class="prev" onclick="changeMenuPopupContent(this , 'prev')" data-id="${currentObject.id}" ><i class="fa-solid fa-chevron-left"></i></button>
          <button class="next" onclick="changeMenuPopupContent(this , 'next')" data-id="${currentObject.id}" ><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <p class="mb-0">${currentObject.description}</p>
      </div>
    `;
}

function goToMenu(that) {
  let type = that.dataset.type;
  let sameMenu = MenuSection.querySelector(`.menu-links li[data-type="${type}"] `);
  sameMenu.click();
}
