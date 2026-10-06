import { heroes } from "./heroes.js";

if (window.location.pathname.endsWith("heroes.html")) {

    const heroSections = document.querySelector("#hero-sections");
    const searchInput = document.querySelector("#hero-search");
    const attributeFilter = document.querySelector("#attribute-filter");
    const complexityFilter = document.querySelector("#complexity-filter");

    const roleChecks = document.querySelectorAll(".role-check");
    const attackTypeChecks = document.querySelectorAll(".attack-type-check");
    const clearRolesButton = document.querySelector("#clear-roles");


    const attributes = [
        "Strength",
        "Agility",
        "Intelligence",
        "Universal"
    ];

    const attributeImages = {
        Strength: "heroes/web-ui/strength.png",
        Agility: "heroes/web-ui/agility.png",
        Intelligence: "heroes/web-ui/intelligence.png",
        Universal: "heroes/web-ui/universal.png"
    };


    function renderHeroes(heroList) {

        heroSections.innerHTML = "";

        attributes.forEach(function(attribute) {

            const section = document.createElement("section");
            section.classList.add("hero-section");

            section.innerHTML = `
                <h3 class="attribute-title">
                    <img src="${attributeImages[attribute]}" alt="${attribute}">
                    <span>${attribute}</span>
                </h3>

                <div class="hero-gallery"></div>
            `;

            const gallery = section.querySelector(".hero-gallery");

            heroList.forEach(function(hero) {

                if (hero.attribute === attribute) {

                    const card = document.createElement("article");
                    card.classList.add("hero-card");

                    card.innerHTML = `
                        <img src="${hero.image}" alt="${hero.name}">
                        <div class="hero-caption">${hero.name}</div>
                    `;

                    gallery.appendChild(card);
                }
            });

            heroSections.appendChild(section);
        });
    }


    // Search
    searchInput.addEventListener("input", filterHeroes);

    // Attribute
    attributeFilter.addEventListener("change", filterHeroes);

    // Complexity
    complexityFilter.addEventListener("change", filterHeroes);


    // Roles
    roleChecks.forEach(function(checkbox) {
        checkbox.addEventListener("change", filterHeroes);
    });


    // Attack Type
    attackTypeChecks.forEach(function(radio) {
        radio.addEventListener("change", filterHeroes);
    });


    // Clear selected roles
    clearRolesButton.addEventListener("click", function() {

        roleChecks.forEach(function(checkbox) {
            checkbox.checked = false;
        });

        filterHeroes();
    });


    // Initial render
    renderHeroes(heroes);


    function filterHeroes() {

        const searchText = searchInput.value.toLowerCase();
        const selectedAttribute = attributeFilter.value;
        const selectedComplexity = complexityFilter.value;


        // Get selected roles
        const selectedRoles = Array.from(roleChecks)
            .filter(function(checkbox) {
                return checkbox.checked;
            })
            .map(function(checkbox) {
                return checkbox.value;
            });


        // Get selected attack type
        const selectedAttackTypes = Array.from(attackTypeChecks)
            .filter(function(checkbox) {
                return checkbox.checked;
            })
            .map(function(checkbox) {
                return checkbox.value;
            });


        const filteredHeroes = heroes.filter(function(hero) {


            // Search
            const matchesSearch =
                hero.name.toLowerCase().includes(searchText);


            // Attribute
            const matchesAttribute =
                selectedAttribute === "All" ||
                hero.attribute === selectedAttribute;


            // Complexity
            const matchesComplexity =
                selectedComplexity === "All" ||
                hero.complexity === Number(selectedComplexity);


            // Attack Type
            const matchesAttackType =
                selectedAttackTypes.length === 0 ||
                selectedAttackTypes.every(function(attackType) {
                    return hero.attackType.includes(attackType);
                });


            // Roles
            const matchesRoles =
                selectedRoles.length === 0 ||
                selectedRoles.every(function(role) {
                    return hero.roles.includes(role);
                });


            return matchesSearch &&
                   matchesAttribute &&
                   matchesComplexity &&
                   matchesAttackType &&
                   matchesRoles;
        });


        renderHeroes(filteredHeroes);
    }
}

if (window.location.pathname.endsWith("index.html")) {
    const form = document.querySelector("#contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form for contact submitted");
        alert("Thank you for your message! We will get back to you soon.");
    });
}

const itemButtons = document.querySelectorAll(".item-button");
const closeButtons = document.querySelectorAll(".close-item");

itemButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        document.querySelectorAll(".item-card.details-open")
            .forEach(function (card) {
                card.classList.remove("details-open");
            });

        const card = button.closest(".item-card");
        card.classList.add("details-open");
    });
}); 


closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        const card = button.closest(".item-card");
        card.classList.remove("details-open");

    });

});
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const query = searchInput.value.trim();

        if (query === "") {
            return;
        }

        const found = window.find(query);

        if (!found) {
            alert("Nothing found");
        }
    });

}