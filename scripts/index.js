document.addEventListener("DOMContentLoaded", function () {
  // Menu Hamburger
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-menu").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  // Search
  const btnSearch = document.querySelector(".header__button-search");
  const barSearch = document.querySelector(".header_bar-search");
  btnSearch.addEventListener("mouseenter", () => {
    btnSearch.classList.toggle("active");
    barSearch.classList.toggle("active");
  });

  document.querySelectorAll(".header_bar-search").forEach((n) =>
  n.addEventListener("mouseenter", () => {
    btnSearch.classList.remove("active");
    barSearch.classList.remove("active");
  })
);

  //  Cards Project

  let grid = document.querySelector(".projects-container");
  let filterInput = document.getElementById("filterInput");
  const buttonFilter = document.querySelectorAll(".filter-option");

  fetch("../database/projects.json")
    .then((res) => res.json())
    .then((json) => {
      for (let value of json) {
        addElement(grid, value);
      }
    });

  function addElement(appendIn, value) {
    let div = document.createElement("div");
    div.className = "projects-card";

    let { image, title, category } = value;

    div.innerHTML = `
    <div class="project-card">
    <img src="${image}" alt="${title}" />
    <!-- Hover card -->
    <div class="hover-card">
      <div>
        <h1 class="item-title">${title}</h1>
      </div>
      <div>
        <div class="hr"></div>
      </div>
      <div>
        <p class="item-category">${category}</p>
      </div>
    </div>
  </div>
  `;

    appendIn.appendChild(div);
  }

  // Filter search
  filterInput.addEventListener("keyup", filterProducts);

  function filterProducts() {
    let filterValue = filterInput.value.toUpperCase();
    let item = grid.querySelectorAll(".projects-card");

    for (let i = 0; i < item.length; i++) {
      let span = item[i].querySelector(".item-title");
      if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
        item[i].style.display = "initial";
      } else {
        item[i].style.display = "none";
      }
    }
  }

  // Button filters
  buttonFilter.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.filter;
      let item = grid.querySelectorAll(".projects-card");

      for (let i = 0; i < item.length; i++) {
        let span = item[i].querySelector(".item-category");
        if (span.innerHTML.indexOf(category) > -1) {
          item[i].style.display = "initial";
        } else {
          item[i].style.display = "none";
        }
      }
    });
  });

  //  Enter disabled
  document.querySelectorAll("input[type=text]").forEach((node) =>
    node.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        e.preventDefault();
      }
    })
  );
});
