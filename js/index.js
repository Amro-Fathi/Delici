let carousels = document.querySelectorAll("#Home .SC-carousel-item"),
  nextButton = document.querySelector("#Home .next"),
  prevButton = document.querySelector("#Home .prev"),
  currentCarousel = 0,
  indicators = document.querySelectorAll("#Home .indicators ul li"),
  navbar = document.querySelector("nav.navbar"),
  navbarButton = document.querySelector("nav.navbar .navbar-button"),
  sideBar = document.querySelector("#Sidebar"),
  closeSidebar = sideBar.querySelector(".close"),
  bookPopupOpen = document.querySelector("#Home .book-icon"),
  bookPopup = document.querySelector("#BookPopup"),
  bookPopupClose = bookPopup.querySelector(".close"),
  lastScrollY = window.scrollY,
  MenuSection = document.querySelector("#Menu"),
  menuLinks = MenuSection.querySelectorAll(".menu-links li:not(.square)"),
  menuContent = MenuSection.querySelector(".menu-parts"),
  MenuPopup = document.querySelector("#MenuPopup");

changeMenuContent();

bookPopupOpen.addEventListener("click", function () {
  bookPopup.classList.remove("d-none");
  setTimeout(function () {
    bookPopup.classList.add("active");
  }, 1);
});

bookPopup.addEventListener("click", function () {
  bookPopup.classList.remove("active");
  setTimeout(function () {
    bookPopup.classList.add("d-none");
  }, 800);
});

bookPopup.firstElementChild.addEventListener("click", function (e) {
  e.stopPropagation();
});

bookPopupClose.addEventListener("click", function () {
  bookPopup.classList.remove("active");
  setTimeout(function () {
    bookPopup.classList.add("d-none");
  }, 800);
});

nextButton.addEventListener("click", function () {
  currentCarousel++;
  if (currentCarousel == carousels.length) {
    currentCarousel = 0;
  }
  changeCarousel();
});

prevButton.addEventListener("click", function () {
  currentCarousel--;
  if (currentCarousel == -1) {
    currentCarousel = carousels.length - 1;
  }

  changeCarousel();
});
navbarButton.addEventListener("click", function () {
  sideBar.classList.remove("d-none");
  setTimeout(function () {
    sideBar.classList.add("active");
  }, 1);
});
sideBar.addEventListener("click", function () {
  sideBar.classList.remove("active");
  setTimeout(function () {
    sideBar.classList.add("d-none");
  }, 800);
});
sideBar.firstElementChild.addEventListener("click", function (e) {
  e.stopPropagation();
});

closeSidebar.addEventListener("click", function () {
  sideBar.classList.remove("active");
  setTimeout(function () {
    sideBar.classList.add("d-none");
  }, 800);
});

window.addEventListener("scroll", function () {
  if (window.scrollY > lastScrollY) {
    navbar.classList.add("scrolled");
  } else if (window.scrollY < lastScrollY) {
    navbar.classList.remove("scrolled");
  }
  lastScrollY = window.scrollY;
  let sections = document.querySelectorAll("#Home, section[id]");
  let links = document.querySelectorAll(".js-selecting-navbar-active");
  sections.forEach(function (section) {
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
      links.forEach(function (link) {
        link.classList.remove("active");
        link.closest("li").classList.remove("active");
      });
      let activeLinks = document.querySelectorAll(`.js-selecting-navbar-active[href="#${section.id}"]`);
      activeLinks.forEach(function (link) {
        link.classList.add("active");
        link.closest("li").classList.add("active");
      });
    }
  });
});

MenuPopup.addEventListener("click", function () {
  MenuPopup.classList.remove("active");
  setTimeout(function () {
    MenuPopup.classList.add("d-none");
  }, 800);
});
